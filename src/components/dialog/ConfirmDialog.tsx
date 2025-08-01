import { IConfirmDialogProps } from "@/types/commons";
import { Modal } from "antd";

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  title = 'Xác nhận hành động',
  content = 'Bạn có chắc chắn muốn tiếp tục?',
}) => {
  return (
    <Modal
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Đồng ý"
      cancelText="Hủy"
      centered
      className="custom-confirm-modal"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </Modal>
  );
};

export default ConfirmDialog;
