import { Dropdown, Menu } from 'antd';
import { useState } from 'react';
import { RiInformationLine } from 'react-icons/ri';
import warningIcon from 'assets/icons/close-ticket-warning.svg';

import { useAction } from './useActions';
import * as S from '../common/StylesTableColumns';
import { ToolTip, ActionModal } from '../components';

export default function TicketStatus({ ticketStatus, closeAt, ticketNumber }: any) {
  const [visibileCloseModal, setVisibleCloseModal] = useState(false);

  const toggleCloseModal = () => setVisibleCloseModal(!visibileCloseModal);

  const { changeTicketStatus } = useAction({ setVisibleCloseModal });
  const handleTicketstatusChange = async (status: any) => {
    if (status.toLowerCase() === 'closed') {
      setVisibleCloseModal(true);
    }

    if (status.toLowerCase() !== 'closed') {
      await changeTicketStatus(status, ticketNumber);
    }
  };

  const ticketStatusMenu = (
    <S.TicketStatusMenu onClick={({ key }) => handleTicketstatusChange(key)}>
      <Menu.Item
        key='Open'
        className={`${ticketStatus.toLowerCase() === 'open' && 'menu-item__active'}`}
      >
        Open
      </Menu.Item>
    </S.TicketStatusMenu>
  );

  return (
    <>
      {ticketStatus.toLowerCase() === 'closed' ? (
        <ToolTip title={`Closed on ${closeAt}`} placement='topLeft'>
          <S.TicketStatus className='closed'>
            Closed
            <RiInformationLine />
          </S.TicketStatus>
        </ToolTip>
      ) : (
        <Dropdown
          overlay={ticketStatusMenu}
          trigger={['click']}
          getPopupContainer={trigger => trigger?.parentNode?.parentNode as HTMLElement}
        >
          <S.TicketStatus
            className={ticketStatus.toLowerCase() === 'open' ? 'open' : 'in-progress'}
          >
            {ticketStatus.toLowerCase() === 'progress' ? 'In Progress' : ticketStatus}
          </S.TicketStatus>
        </Dropdown>
      )}
      {visibileCloseModal && (
        <ActionModal
          width={392}
          isModalOpen={visibileCloseModal}
          onCancel={toggleCloseModal}
          onModalCancel={toggleCloseModal}
          onOk={() => changeTicketStatus('Closed', ticketNumber)}
          title='Close this ticket?'
          info='Are you sure you want to close this ticket? This
        action cannot be undone.'
          btnText='Close Ticket'
          icon={warningIcon}
        />
      )}
    </>
  );
}
