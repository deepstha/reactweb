import React from 'react';
import { useTranslation } from 'react-i18next';
import { RiCloseCircleFill } from 'react-icons/ri';

import { Button } from 'components/atoms';
import { StyledModal } from '../Styles';

interface ActionModalProps {
  isModalOpen: boolean;
  onModalCancel: () => void;
  onOk: () => void;
  onCancel: () => void;
  width?: string | number;
  btnText?: string;
  btnIcon?: React.ReactElement;
  cancelBtnText?: string;
  info?: string | React.ReactElement;
  icon?: React.Component | string | React.ReactElement;
  title?: string | React.ReactElement;
  action?: string;
  type?: string;
  closable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  image?: string;
  children?: React.ReactNode;
  className?: string;
  maskClosable?: boolean;
}

const ActionModal = (props: ActionModalProps) => {
  const { t } = useTranslation();
  const {
    isModalOpen,
    onModalCancel,
    action,
    title,
    info,
    onOk,
    onCancel,
    width,
    btnText,
    btnIcon,
    cancelBtnText,
    type,
    closable,
    image,
    loading,
    disabled,
    children,
    className,
    icon,
    maskClosable = true,
  } = props;

  const handleCancel = (e: any) => {
    e.stopPropagation();
    onCancel();
  };
  const handleModalCancel = (e: any) => {
    e.stopPropagation();
    onModalCancel();
  };
  const handleOk = (e: any) => {
    e.stopPropagation();
    onOk();
  };
  const getIconBgColor = (actionType: string | undefined) => {
    const colors: Record<string, string> = {
      default: 'bg-primary-50',
      delete: 'bg-error-200',
    };
    return colors[actionType ?? 'default'];
  };
  const iconBg = getIconBgColor(action);
  return (
    <StyledModal
      data-cy='delete-modal'
      className={`${type !== 'primary' && 'delete-modal'} ${image && 'has-head-img'} ${className}`}
      width={width ?? 348}
      centered
      visible={isModalOpen}
      maskClosable={maskClosable}
      footer={[
        <Button
          data-cy='cancel-btn'
          variant='light-gray'
          key='back'
          type='link'
          size='large'
          className='btn cancel'
          onClick={handleCancel}
        >
          {cancelBtnText ?? t('common.action.cancel', 'Cancel')}
        </Button>,
        <Button
          data-cy='submit-btn'
          key='submit'
          type='primary'
          className='capitalize btn ok'
          danger={['block', 'delete'].some(el => action?.toLowerCase().includes(el))}
          size='large'
          loading={loading}
          disabled={loading || disabled}
          onClick={handleOk}
          icon={btnIcon}
        >
          {btnText ?? `Yes, ${action} All`}
        </Button>,
      ]}
      onCancel={handleModalCancel}
      closeIcon={<RiCloseCircleFill />}
      closable={closable ?? false}
    >
      {icon && (
        <div
          className={`${iconBg} h-16 w-16 flex items-center justify-center rounded-20 mx-auto mb-6`}
        >
          {icon}
        </div>
      )}
      {image && <img src={image} className='avatar' alt='pop up' />}
      <h5 className='text-center text-xl text-gray-700 leading-7 font-bold mb-2'>
        {title || `Confirm ${action}`}
      </h5>
      <p className='text-15 leading-5.75 text-gray text-center'>{info}</p>
      {children}
    </StyledModal>
  );
};

export default ActionModal;
