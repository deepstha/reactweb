import React from 'react';
import { useTranslation } from 'react-i18next';
import { RiCloseCircleFill } from 'react-icons/ri';

import { Button } from 'components/atoms';
import { StyledModal } from '../Styles';

interface PopupModalProps {
  isModalOpen: boolean;
  onModalCancel: () => void;
  title?: string | React.ReactElement;
  subTitle?: string | React.ReactElement;
  type?: string;
  closable?: boolean;
  image?: string;
  children?: React.ReactNode;
  className?: string;
  maskClosable?: boolean;
}
const PopupModal = (props: PopupModalProps) => {
  const { t } = useTranslation();
  const {
    isModalOpen,
    onModalCancel,
    type,
    title,
    subTitle,
    image,
    children,
    className,
    closable,
    maskClosable = true,
  } = props;

  const handleModalCancel = (e: any) => {
    e.stopPropagation();
    onModalCancel();
  };
  return (
    <StyledModal
      className={`${type !== 'primary' && 'delete-modal'} ${image && 'has-head-img'} ${className}`}
      width={768}
      style={{ left: '7px', margin: '-8px' }}
      bodyStyle={{
        minHeight: 'auto',
        maxHeight: 500,
        overflowY: 'scroll',
        marginRight: '4',
        position: 'relative',
      }}
      centered
      visible={isModalOpen}
      maskClosable={maskClosable}
      closeIcon={<RiCloseCircleFill />}
      closable={closable ?? false}
      onCancel={handleModalCancel}
      footer={null}
    >
      {title && (
        <div className='flex flex-col items-center mb-10'>
          {title && <h5 className='text-xl text-gray-700 font-bold leading-snug-2'>{title}</h5>}
          {subTitle && (
            <p className='text-15 mt-2 text-gray font-normal text-center leading-normal max-w-340'>
              {subTitle}
            </p>
          )}
        </div>
      )}
      {children}
    </StyledModal>
  );
};

export default PopupModal;
