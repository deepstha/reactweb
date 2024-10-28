import { Modal } from 'antd';
import styled from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';

import { Button, Icon } from 'components/atoms';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 10px 16px 16px;

    .ant-modal-footer {
      .ant-btn {
        width: 100%;
      }
    }
    .ant-modal-close {
      right: 0;
    }
    p {
      margin: 14px 0 0px;
      font-size: ${({ theme }) => theme.text.size.body.text.small};
      line-height: 20px;
      color: #6e6681;
    }
  }
`;

interface InfoModalProps {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  width?: string | number;
  btnText?: string;
  info?: string;
  icon?: string;
  title?: string;
  closable?: boolean;
}

const InfoModal = (props: InfoModalProps) => {
  const { isModalOpen, info, onOk, onCancel, width, btnText, icon, closable, title } = props;

  return (
    <StyledModal
      className='info-modal'
      width={width ?? 438}
      centered
      visible={isModalOpen}
      footer={[
        <Button key='submit' variant='info' className=' capitalize btn' size='large' onClick={onOk}>
          {btnText ?? 'Ok'}
        </Button>,
      ]}
      onCancel={onCancel}
      closable={closable ?? false}
      closeIcon={
        <span className='inline-block text-center'>
          <RiCloseLine />
        </span>
      }
    >
      <Icon name={icon ?? 'customer-support'} />
      {title && (
        <h5 className='text-center text-xl text-gray-700 leading-7 font-bold mb-2'>{title}</h5>
      )}
      <p className='info'>{info}</p>
    </StyledModal>
  );
};

export default InfoModal;
