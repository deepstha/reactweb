import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { Input, PasswordInput } from 'components/molecules/fields';

import { Button } from 'components/atoms';

import { StyledModal } from '../Styles';

interface Inputs {
  confirmationText?: string;
}
interface PasswordInputs {
  password?: string;
}

const passwordSchema = yup.object().shape({
  password: yup.string().required('Required'),
});
const inputSchema = yup.object().shape({
  confirmationText: yup.string(),
});

interface ActionsModalSecondaryProps {
  isModalOpen: boolean;
  onModalCancel?: () => void;
  onSubmit: (val: any) => void;
  width?: string | number;
  onOk?: () => void;
  title?: string | React.ReactElement;
  info?: string | React.ReactElement;
  vector?: any;
  btnText?: string;
  isPasswordProtected?: boolean;
  loading?: boolean;
  action?: string;
  btnIcon?: any;
  isDisabled?: boolean;
  confirmText?: string;
  confirmationLabel?: string;
}

const ActionModalSecondary = (props: ActionsModalSecondaryProps) => {
  const { t } = useTranslation();
  const {
    isModalOpen,
    onOk,
    onModalCancel,
    title,
    info,
    vector,
    width,
    btnText,
    btnIcon,
    onSubmit,
    isPasswordProtected = true,
    loading,
    action,
    confirmText,
    confirmationLabel,
    isDisabled = false,
  } = props;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PasswordInputs | Inputs>({
    resolver: yupResolver(isPasswordProtected ? passwordSchema : inputSchema),
    mode: 'onBlur',
    defaultValues: isPasswordProtected ? { password: '' } : { confirmationText: '' },
  });

  const [disabled, setDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (confirmText) return setDisabled(value !== confirmText);
    if (action === 'cancel') return setDisabled(value !== 'Cancel');
    return setDisabled(value !== 'Delete');
  };

  return (
    <StyledModal
      width={width ?? 448}
      destroyOnClose
      className='delete-modal'
      centered
      visible={isModalOpen}
      footer={null}
      onCancel={onModalCancel}
      closable={false}
    >
      <div className='flex flex-col items-center'>
        {vector && <div className='mb-6'>{vector}</div>}
        <h5 className='text-xl text-gray-700 font-bold leading-snug-2'>{title}</h5>
        <p className='text-15 text-gray font-normal text-center leading-normal'>{info}</p>
      </div>
      <div className='body-content'>
        <form id='critical-actions' onSubmit={handleSubmit(onSubmit)}>
          {isPasswordProtected && (
            <PasswordInput
              name='password'
              id='password'
              control={control}
              label={t('form.label.confirmPassword', 'Confirm Password')}
              errors={errors}
            />
          )}
          {!isPasswordProtected && (
            <Input
              name='confirmationText'
              id='confirmationText'
              onChange={handleInputChange}
              label={
                confirmationLabel ??
                (action === 'cancel' ? (
                  <>
                    {t('type', 'Type')} <b>Cancel</b>{' '}
                    {t('toConfirmCancellation', 'to confirm cancellation')}
                  </>
                ) : (
                  <>
                    {t('type', 'Type')} <b>Delete</b> {t('toConfirmDelete', 'to confirm deletion')}
                  </>
                ))
              }
              errors={errors}
            />
          )}
        </form>
        <div className='mt-6'>
          <Button
            type='primary'
            htmlType='submit'
            form='critical-actions'
            className={`capitalize w-full ${!isPasswordProtected && disabled && 'btn--disabled'}`}
            danger
            size='large'
            loading={loading}
            disabled={(!isPasswordProtected && disabled) || loading || isDisabled}
            onClick={onOk}
          >
            {btnIcon && <span>{btnIcon}</span>} {btnText}
          </Button>
        </div>
      </div>
    </StyledModal>
  );
};

export default ActionModalSecondary;
