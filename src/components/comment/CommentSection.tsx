'use client';
import { AUTH } from '@/constants/auth.constant';
import { COMMENT_SOCKET_EVENTS } from '@/constants/socket.constant';
import { createComment, deleteComment, getCommentsByIdPost, updateComment } from '@/services/comment.service';
import { getSocket } from '@/utils/socket/socket';
import { cookie } from '@/utils/universal-cookie';
import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const socket = getSocket();

  const currentUserId = Cookies.get(AUTH.USER_ID) || '';

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);

    const data = { content, postId };
    await createComment(data);
    setContent('');
    setLoading(false);
    // Không cần gọi lại API ở đây — sẽ nhận realtime tự động
  };

  const getDataCommentsByIdPost = async () => {
    const comments = await getCommentsByIdPost(postId)
    setComments(comments);
  }

  useEffect(() => {
    getDataCommentsByIdPost();

    const newEvent = `${COMMENT_SOCKET_EVENTS.NEW}:${postId}`;
    const updateEvent = `${COMMENT_SOCKET_EVENTS.UPDATED}:${postId}`;
    const deleteEvent = `${COMMENT_SOCKET_EVENTS.DELETED}:${postId}`;

    socket.on(newEvent, (newComment: any) => {
      setComments((prev) => [newComment, ...prev]);
    });

    socket.on(updateEvent, (updated: any) => {
      setComments((prev) =>
        prev.map((c: any) => (c.id === updated.id ? { ...c, content: updated.content } : c))
      );
    });

    socket.on(deleteEvent, (deleted: any) => {
      setComments((prev) => prev.filter((c: any) => c.id !== deleted.id));
    });

    return () => {
      socket.off(newEvent);
      socket.off(updateEvent);
      socket.off(deleteEvent);
    };
  }, [postId]);

  const handleEdit = async (commentId: string, oldContent: string) => {
    const newContent = prompt('Nhập nội dung mới:', oldContent);
    if (!newContent || newContent === oldContent) return;

    try {
      await updateComment(commentId, { content: newContent });
      // Không cần cập nhật local state — đã có WebSocket làm
    } catch (err) {
      alert('Không thể cập nhật bình luận');
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Bạn có chắc muốn xoá bình luận này?')) return;

    try {
      await deleteComment(commentId);
      // Không cần cập nhật local state — đã có WebSocket làm
    } catch (err) {
      alert('Không thể xoá bình luận');
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Bình luận</h2>

      <div className="space-y-2">
        <TextArea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập bình luận..."
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSubmit}
          loading={loading}
        >
          Gửi bình luận
        </Button>
      </div>

      <div className="space-y-4">
        {comments.map((cmt: any) => (
          <div key={cmt.id} className="border-b pb-2">
            <p className="text-sm font-medium">{cmt.author.name}</p>
            <p className="text-gray-700">{cmt.content}</p>
            <p className="text-xs text-gray-400">{new Date(cmt.createdAt).toLocaleString('vi-VN')}</p>
            {cmt.author.id === currentUserId && (
              <div className="space-x-2 mt-1">
                <Button size="small" onClick={() => handleEdit(cmt.id, cmt.content)}>Sửa</Button>
                <Button size="small" danger onClick={() => handleDelete(cmt.id)}>Xoá</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
