import { Modal } from 'antd';
import styled from 'styled-components';

import { Button } from 'components/atoms';

const StyledModal = styled(Modal)`
  z-index: 99999;
  .ant-modal-content {
    padding: 32px 24px;
  }
  .ant-modal-body {
    form > div {
      margin-bottom: 24px;
    }
  }
  .ant-input {
    margin-top: 0;
    line-height: 16px;
    font-family: 'Heebo', 'sans-serif';
    font-weight: 400;
    color: #3d3358;
    padding: 14px 16px;
    border: 1px solid #d7cce4;
  }
  .ant-btn {
    border: none;
    width: 100%;
    min-width: 160px;
    &.btn--cancel {
      background: #f3f2f4;
      color: #6e6681;
    }
    &.btn--ok {
      background: #4c9610;
    }
    &.btn--ok--primary {
      background: #390179;
    }
    :disabled {
      background-color: #e7e6eb;
      span {
        color: #857f96;
      }
    }
  }

  &.select-numbers {
    .header--sub_title {
      margin-bottom: 20px;
    }
  }

  &.set-yourself-online {
    .header--sub_title {
      margin-bottom: 24px;
    }
    .ant-modal-footer {
      margin-top: 24px;
    }
  }
  &.add-external-number {
    .btn--cancel {
      min-width: 180px;
    }
    .btn--ok {
      min-width: 204px;
      &.ant-btn-loading {
        span {
          color: #6e6681;
        }
      }
    }
  }
  // For Choose One Free Number Modal
  &.choose-one-free-number {
    .ant-modal-body {
      .flex {
        img {
          margin-bottom: 20px;
        }
        &.gap-4 {
          flex-direction: column;
          @media (min-width: 768px) {
            flex-direction: row;
          }
        }
      }
      .ant-btn {
        &:first-child {
          order: 1;
          @media (min-width: 768px) {
            order: 0;
            min-width: 120px;
            width: 35%;
          }
        }
      }
    }
  }
  &.front-crm-api-key-modal {
    .ant-btn {
      &.btn--cancel--front {
        background: #f5f2f8;
        color: #390179;
        width: 152px;
      }
      &.btn--ok--front {
        background: #1a63f4;
        color: #fff;
        width: 300px;
      }
      &.btn--ok--front a {
        color: #fff;
      }
    }
  }
`;

interface EditFieldModalProps {
  isModalOpen: boolean;
  onOk?: () => void;
  onCancel: (...args: unknown[]) => unknown;
  formId?: string;
  width?: string | number;
  title?: string | React.ReactElement;
  subTitle?: string | React.ReactElement;
  buttonText?: string;
  buttonTextCancel?: string;
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  maskClosable?: boolean;
  disableSubmitButton?: boolean;
  vector?: any;
  flagUrl?: string;
}

const EditFieldModal = (props: EditFieldModalProps) => {
  const {
    onOk,
    isModalOpen,
    onCancel,
    formId,
    width,
    title,
    subTitle,
    flagUrl,
    buttonText,
    buttonTextCancel,
    children,
    className,
    loading,
    maskClosable,
    vector,
    disableSubmitButton,
  } = props;

  return (
    <StyledModal
      className={className}
      width={width ?? 448}
      centered
      destroyOnClose
      visible={isModalOpen}
      closable={false}
      onCancel={onCancel}
      maskClosable={maskClosable}
      footer={null}
    >
      {title && (
        <div className='flex flex-col items-center mb-10'>
          {flagUrl && (
            <div className='mb-2 flex items-center justify-center bg-primary-50 rounded-full w-12 h-12 p-2.5'>
              <img className='w-fit' src={flagUrl} alt='flag' />
            </div>
          )}
          {vector && <div className='mt-2 mb-6'>{vector}</div>}
          {title && (
            <h5
              data-cy='editname-modal-title'
              className='text-xl text-gray-700 font-bold leading-snug-2 break-all'
            >
              {title}
            </h5>
          )}
          {subTitle && (
            <p className='text-15 mt-2 text-gray font-normal text-center leading-normal max-w-340'>
              {subTitle}
            </p>
          )}
        </div>
      )}
      {children}
      <div className='flex gap-4'>
        {buttonTextCancel && (
          <Button
            data-cy='editname-modal-cancel-button'
            key='back'
            type='link'
            className='btn btn--cancel'
            size='large'
            onClick={onCancel}
          >
            {buttonTextCancel}
          </Button>
        )}
        {buttonText && (
          <Button
            data-cy='editname-modal-submit-button'
            key='submit'
            form={formId}
            className={`capitalize btn ${
              !buttonTextCancel ? 'w-full btn--ok--primary' : ' btn--ok'
            } `}
            size='large'
            htmlType='submit'
            onClick={onOk}
            loading={loading}
            disabled={loading || disableSubmitButton}
          >
            <span className='text-white text-sm font-semibold leading-4'>{buttonText}</span>
          </Button>
        )}
      </div>
    </StyledModal>
  );
};

export default EditFieldModal;
