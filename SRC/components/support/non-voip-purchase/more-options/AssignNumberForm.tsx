import { yupResolver } from '@hookform/resolvers/yup';
import { ReactElement } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { EditFieldModal } from 'components/organisms';
import { Input, PhoneInput } from 'components/molecules/fields';
import { isValidPhoneNumber } from 'components/utils/phone-lib';

import { useAction } from '../useActions';

interface AssignNumberFormProps {
  toggleAssignNumberModal: () => void;
  visibleAssignModal: boolean;
  data: any;
}

interface AssignNumberFormInputs {
  phoneNumber: string;
  numberId: string;
  iccid: string;
  pin: string;
  puk: string;
  secret: string;
}
export default function AssignNumberForm({
  toggleAssignNumberModal,
  visibleAssignModal,
  data,
}: AssignNumberFormProps): ReactElement {
  const schema = yup.object().shape({
    phoneNumber: yup.string().required('This is required'),
    numberId: yup.string().required('This is required'),
    iccid: yup.string().required('This is required'),
    secret: yup.string().required('This is required'),
  });

  const { assignNonVoipNumbers, loadingAssignNumber } = useAction({ toggleAssignNumberModal });
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<AssignNumberFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
      numberId: '',
      iccid: '',
      pin: '',
      puk: '',
      secret: '',
    },
  });

  const formSubmit = async (val: any) => {
    const isValid = isValidPhoneNumber(`+${val.phoneNumber}`);
    if (!isValid) {
      if (setError) {
        setError('phoneNumber', {
          type: 'manual',
          message: 'Invalid Phone Number',
        });
      }
      return;
    }
    const payloads = {
      ...val,
      phoneNumber: `+${val.phoneNumber}`,
      ticketNumber: data?.ticketNumber,
      memberId: data?.memberId,
      workspaceId: data?.workspaceId,
    };
    await assignNonVoipNumbers(payloads);
  };

  return (
    <>
      <EditFieldModal
        buttonText='Submit'
        isModalOpen={visibleAssignModal}
        formId='assign-non-voip-form'
        onCancel={toggleAssignNumberModal}
        loading={loadingAssignNumber}
      >
        <form
          className='assign-non-voip-form items-center'
          id='assign-non-voip-form'
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className='w-85 m-auto'>
            <div className='flex flex-col mb-10 mt-7.5 text-center'>
              <h5 className='text-xl text-gray-700 font-bold leading-snug'>
                Assign Non Voip Number
              </h5>
              <p>{data?.workspaceName}</p>
            </div>
          </div>
          <div>
            <div className='mb-6'>
              <PhoneInput
                name='phoneNumber'
                id='phoneNumber'
                control={control}
                label='Phone Number'
                errors={errors}
              />
            </div>
            <div className='mb-6'>
              <Input
                className='cy-numberId'
                name='numberId'
                id='numberId'
                control={control}
                label='Number Id'
                errors={errors}
              />
            </div>
            <div className='flex gap-4 mb-6'>
              <Input
                className='cy-iccid'
                name='iccid'
                id='iccid'
                control={control}
                label='iccid'
                errors={errors}
              />
              <Input
                className='cy-pin'
                name='pin'
                id='pin'
                control={control}
                label='Pin'
                errors={errors}
              />
            </div>
            <div className='flex gap-4 mb-8'>
              <Input
                className='cy-puk'
                name='puk'
                id='puk'
                control={control}
                label='Puk'
                errors={errors}
              />
              <Input
                className='cy-secret'
                name='secret'
                id='secret'
                control={control}
                label='Secret'
                errors={errors}
              />
            </div>
          </div>
        </form>
      </EditFieldModal>
    </>
  );
}
