import { Modal } from 'antd';
import Styled from 'styled-components';
import { RiErrorWarningFill } from 'react-icons/ri';

import { Button } from 'components/atoms';

const StyledModal = Styled(Modal)`
    &.warning-modal{
      .ant-modal-content{
        border-top: 15px solid ${({ theme }) => theme.colors.warning.default};
      }
    }
    .ant-modal-body{
        svg{
          font-size: 24px;
          padding:1px;
          color: ${({ theme }) => theme.colors.warning.default};
        }
    }
    .ant-modal-footer {
        .ant-btn{
          width: 100%;
        }
    }
    .info{
        margin:0px;
        margin-top:-5px;
        font-weight: 500;
        font-size:  ${({ theme }) => theme.text.size.body.text.small};
        line-height: 20px;
        color:${({ theme }) => theme.colors.text.t7};
    }

`;
interface WarningModalProps {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  width?: string | number;
  btnText?: string;
  info?: string;
}

const WarningModal = (props: WarningModalProps) => {
  const { isModalOpen, info, onOk, onCancel, width, btnText } = props;

  return (
    <StyledModal
      className='warning-modal'
      width={width ?? 438}
      centered
      visible={isModalOpen}
      footer={[
        <Button
          variant='warning'
          key='submit'
          className='capitalize btn'
          size='large'
          onClick={onOk}
        >
          <span className='text-white'>{btnText}</span>
        </Button>,
      ]}
      onCancel={onCancel}
      closable={false}
    >
      <div className='flex'>
        <RiErrorWarningFill className='warning-icon mr-2' />
        <div className='info'>{info}</div>
      </div>
    </StyledModal>
  );
};

export default WarningModal;
