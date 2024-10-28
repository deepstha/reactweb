import { Modal } from 'antd';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .ant-modal-body {
    background: transparent;
  }
  .ant-modal-content {
    border-top: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    background: transparent;
  }
  img {
    width: fit-content;
    max-width: 720px;
    object-fit: cover;
  }
`;

interface ImagePreviewProps {
  isModalOpen: boolean;
  onCancel: (...args: unknown[]) => unknown;
  imageSource: string;
  className?: string;
}

const ImagePreview = (props: ImagePreviewProps) => {
  const { isModalOpen, onCancel, imageSource, className } = props;
  return (
    <StyledModal
      className={className}
      centered
      visible={isModalOpen}
      closable={false}
      onCancel={onCancel}
      footer={null}
    >
      <img alt='profile' src={imageSource} />
    </StyledModal>
  );
};

export default ImagePreview;
