import { Dropdown, Menu, message } from 'antd';
import { RiArrowDownSLine } from 'react-icons/ri';

import { ActionsModal } from 'components/organisms';
import { useState } from 'react';
import { Bin } from 'components/atoms/vectors';
import * as S from '../common/StylesTableColumns';
import { useAction } from './useActions';
import ConfirmRejectModal from './ConformRejecrModal';

export default function NumberPurchaseStatus({ data }: any) {
  const [visibleConfirmRejectModal, setVisibleConfirmRejectModal] = useState(false);
  const toggleVisibleConfirmRejectModal = setVisibleConfirmRejectModal(prev => !prev);
  const {
    purchaseStatus: nonVoipNumberPurchaseStatus,
    ticketNumber,
    ticketStatus,
    workspaceId,
    memberId,
  } = data || {};
  const { changeNonVoipPurchaseStatus } = useAction();

  const handleNonVoipNumberPurchaseStatus = async (status: any) => {
    console.log('status', status);
    if (ticketStatus === 'Closed') {
      message.warning({
        content: 'Ticket has been Closed.',
      });
      return;
    }
    if (status === nonVoipNumberPurchaseStatus) {
      return;
    }
    if (status === 'Rejection') {
      setVisibleConfirmRejectModal(true);
      const handleRejection = () => {
        console.log('handle rejection');
      };
      await changeNonVoipPurchaseStatus(status, ticketNumber, memberId, workspaceId);
      return;
    }
    await changeNonVoipPurchaseStatus(status, ticketNumber, memberId, workspaceId);
  };

  const numberProcessStatusMenu = (
    <S.TicketStatusMenu onClick={({ key }) => handleNonVoipNumberPurchaseStatus(key)}>
      <Menu.Item
        key='Pending'
        className={`${nonVoipNumberPurchaseStatus === 'Pending' ? 'menu-item__active' : ''}`}
      >
        Pending
      </Menu.Item>
      <Menu.Item
        key='Requested'
        className={`${nonVoipNumberPurchaseStatus === 'Requested' ? 'menu-item__active' : ''}`}
      >
        Requested
      </Menu.Item>
      <Menu.Item
        key='Rejected'
        className={`${nonVoipNumberPurchaseStatus === 'Rejected' ? 'menu-item__active' : ''}`}
      >
        Rejected
      </Menu.Item>
    </S.TicketStatusMenu>
  );
  let className = '';

  if (nonVoipNumberPurchaseStatus === 'Approved') className = 'purchase-approved';
  if (nonVoipNumberPurchaseStatus === 'Pending') className = 'verification-pending';
  if (nonVoipNumberPurchaseStatus === 'Rejected') className = 'payment-rejected';
  if (nonVoipNumberPurchaseStatus === 'Requested') className = 'purchase-pending';

  return (
    <>
      {nonVoipNumberPurchaseStatus === 'Approved' && ticketStatus.toLowerCase() === 'closed' ? (
        <S.TicketStatus className='closed'>
          Approved <span className='pr-1' />
        </S.TicketStatus>
      ) : (
        <Dropdown
          overlay={numberProcessStatusMenu}
          trigger={['click']}
          getPopupContainer={trigger => trigger?.parentNode?.parentNode as HTMLElement}
        >
          <S.Status className={className}>
            {nonVoipNumberPurchaseStatus}
            <RiArrowDownSLine />
          </S.Status>
        </Dropdown>
      )}

      {/* <ConfirmRejectModal
        visibleConfirmRejectModal={visibleConfirmRejectModal}
        toggleVisibleConfirmRejectModal={toggleVisibleConfirmRejectModal}
      /> */}
    </>
  );
}
