import { format } from 'date-fns';

import { getDateInYearsMonthDay } from 'components/utils/datetime';
import { Icon, Tooltip } from 'components/atoms';
import { privilegeListSupport, usePrivilegeSupport } from 'hooks/usePrivilegeSupport';

import TicketStatus from './TicketStatus';
import NumberPurchaseStatus from './NumberPurchaseStatus';
import * as S from '../common/StylesTableColumns';
import { TrialMark } from '../common/TrialMark';
import { MoreOptions } from './more-options/MoreOptions';

export function useColumn() {
  const [hasArchiveNumberAccess] = usePrivilegeSupport(
    'support',
    'number_purchase',
    privilegeListSupport.support.number_purchase.archive_number,
  );
  const columns = [
    {
      title: 'Ticket status',
      render: ({ node }: any) => {
        const { ticketNumber, ticketStatus, closeAt } = node;
        return (
          <TicketStatus
            ticketNumber={ticketNumber}
            ticketStatus={ticketStatus}
            closedDate={closeAt && getDateInYearsMonthDay(closeAt)}
          />
        );
      },
    },
    {
      title: 'TICKET NUMBER',
      render: ({ node }: any) => {
        const { ticketNumber } = node;
        return (
          <S.NumberContainer>
            <S.Text>{ticketNumber}</S.Text>
          </S.NumberContainer>
        );
      },
    },
    {
      title: 'Requested Date',
      render: ({ node }: any) => {
        const formattedDate = node?.createdAt && format(new Date(node?.createdAt), 'LLL do, yyyy');
        return <S.Text>{formattedDate ?? 'N/a'}</S.Text>;
      },
    },
    {
      title: 'Requested By',
      render: ({ node }: any) => {
        const fullname = `${node?.firstName} ${node?.lastName}`;
        return (
          <Tooltip title={fullname.length > 22 ? fullname : ''}>
            <S.Text className='truncate max-w-200'>{fullname}</S.Text>
          </Tooltip>
        );
      },
    },
    {
      title: 'Workspace',
      render: ({ node }: any) => (
        <div>
          <S.Text>{node?.workspaceName}</S.Text>
        </div>
      ),
    },
    {
      title: 'Plan',
      render: ({ node }: any) => (
        <S.PlanColumn>
          <S.Text>{node?.planName}</S.Text>
          {node?.planName.toLowerCase() === 'enterprise' && <Icon name='crown-three' />}
          <TrialMark title='Paid' className='mx-2.5 trial--paid' />
        </S.PlanColumn>
      ),
    },
    {
      title: 'Purchase Status',
      render: ({ node }: any) => <NumberPurchaseStatus data={node} />,
    },
    {
      title: '',
      render: ({ node }: any) => {
        const { ticketStatus, status, purchaseStatus } = node;
        const isTicketClosed = ticketStatus === 'Closed';
        const isNumberArchived = status === 'Archived';
        const statusRequested = purchaseStatus === 'Requested';
        return (
          !isTicketClosed &&
          !isNumberArchived &&
          statusRequested && (
            <div className='ml-auto cursor-pointer more'>
              {hasArchiveNumberAccess && <MoreOptions data={node} />}
            </div>
          )
        );
      },
    },
  ];

  return columns;
}
