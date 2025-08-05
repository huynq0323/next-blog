import { getPost } from '@/services/post.service';
import React from 'react'
import PostTable from './components/PostTable';

async function Post() {
  const initialData = await getPost({ pageSize: 10 });
  return (
    <div className='layout-table'>
      <PostTable {...initialData} />
    </div>
  )
}

export default Post
