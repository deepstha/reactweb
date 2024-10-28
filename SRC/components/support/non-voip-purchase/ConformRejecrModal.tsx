import { Bin } from 'components/atoms/vectors';
import { ActionsModal } from 'components/organisms';

interface Iprops {
  visibleConfirmRejectModal: boolean;
  toggleVisibleConfirmRejectModal: () => void;
}

export default function ConfirmRejectModal({
  visibleConfirmRejectModal,
  toggleVisibleConfirmRejectModal,
}: Iprops) {
  const handleRejection = () => {
    console.log('rejection confirmed');
  };
  return (
    <>
      <ActionsModal
        onOk={handleRejection}
        isModalOpen={visibleConfirmRejectModal}
        onCancel={toggleVisibleConfirmRejectModal}
        onModalCancel={toggleVisibleConfirmRejectModal}
        title='Confirm Rejection'
        info='Are you sure you want to reject the purchase status'
        btnText='Delete'
        action='delete'
        icon={<Bin />}
      />
    </>
  );
}
