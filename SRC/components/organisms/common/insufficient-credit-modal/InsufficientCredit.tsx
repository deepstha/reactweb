import { useState } from 'react';
import { EditFieldModal } from 'components/organisms';

import { DollarSack } from 'components/atoms/vectors';
import { InsufficientCreditVector } from 'components/atoms/icon/bulk-sms';
import CreditForm from 'components/pages/settings/credit/form/CreditForm';
import { usePurchaseHandler } from 'components/pages/settings/credit/hooks/usePurchaseHandler';

export const InsufficientCredit = ({ isVisible, toggleVisible, disableTrigger }: any) => {
  const [processing, setProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle: any = () => setIsOpen((prev: any) => !prev);

  const [visibleCreditModal, setVisibleCreditModal] = useState(() => false);
  const toggleCreditModal = () => setVisibleCreditModal(prevState => !prevState);

  const { onPurchase, restricted } = usePurchaseHandler({
    onModalCancel: toggleCreditModal,
    setProcessing,
  });
  const onPurchaseCredit = () => {
    if (disableTrigger) {
      toggleVisible();
    } else {
      toggle();
    }

    toggleCreditModal();
  };

  return (
    <>
      {!disableTrigger && (
        <button className='text-info font-medium' type='button' onClick={toggleCreditModal}>
          Purchase credit
        </button>
      )}
      <EditFieldModal
        buttonText='Purchase Credit'
        isModalOpen={isOpen || isVisible}
        buttonTextCancel='Cancel'
        onOk={onPurchaseCredit}
        onCancel={disableTrigger ? toggleVisible : toggle}
        vector={<InsufficientCreditVector />}
        title='Insufficient Credit'
        subTitle='Please ensure that you have enough credit in your account to run this campaign.'
      />
      {visibleCreditModal && (
        <EditFieldModal
          vector={<DollarSack />}
          title='Purchase Credits'
          subTitle='Buy credit to make best out of Krispcall'
          buttonText='Make Payment'
          isModalOpen={visibleCreditModal}
          formId='purchase-credit-form'
          onCancel={toggleCreditModal}
          loading={restricted || processing}
          maskClosable={!(restricted || processing)}
        >
          <CreditForm onSubmit={onPurchase} />
        </EditFieldModal>
      )}
    </>
  );
};
