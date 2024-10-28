import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { ToastMessage } from 'components/atoms';
import cache from 'services/apollo/cache';
import { CHANGE_TICKET_STATUS } from 'graphql/support/purchase';
import {
  ASSIGN_NON_VOIP_NUMBERS,
  CHANGE_NON_VOIP_PURCHASE_STATUS,
} from 'graphql/support/purchase/mutation';

export function useAction(props?: any) {
  const { t } = useTranslation();
  const [change] = useMutation(CHANGE_TICKET_STATUS, {
    onCompleted: response => {
      const { error } = response.changePurchaseSupportTicketStatus;
      if (error === null) {
        ToastMessage({
          content: 'Ticket status changed.',
          type: 'success',
        });
        props?.setVisibleCloseModal?.(false);
        cache.modify({
          fields: {
            nonVoipNumbersRequests: () => {},
          },
        });
        return;
      }
      ToastMessage({ content: error.message, type: 'danger' });
    },
    onError: () => {
      ToastMessage({ content: t('error.unspecific', 'Something went wrong.'), type: 'danger' });
      props?.setVisibleCloseModal?.(false);
    },
  });

  const changeTicketStatus = async (ticketStatus: any, ticketNumber: any) => {
    await change({
      variables: {
        data: {
          ticketNumber,
          ticketStatus,
        },
      },
    });
  };

  const [changeStatus] = useMutation(CHANGE_NON_VOIP_PURCHASE_STATUS, {
    onCompleted: response => {
      const { error } = response.changeNonVoipRequestStatus;
      if (error === null) {
        ToastMessage({
          content: 'Purchase status changed.',
          type: 'success',
        });
        cache.modify({
          fields: {
            nonVoipNumbersRequests: () => {},
          },
        });
        return;
      }
      ToastMessage({ content: error.message, type: 'danger' });
    },
    onError: () =>
      ToastMessage({ content: t('error.unspecific', 'Something went wrong.'), type: 'danger' }),
  });
  const changeNonVoipPurchaseStatus = async (
    status: any,
    ticketNumber: any,
    memberId?: string,
    workspaceId?: string,
  ) => {
    await changeStatus({
      variables: {
        data: {
          ticketNumber,
          purchaseStatus: status,
          memberId,
          workspaceId,
        },
      },
    });
  };

  const [assignNonVoipNumbersNutation, { loading: loadingAssignNumber }] = useMutation(
    ASSIGN_NON_VOIP_NUMBERS,
    {
      onCompleted: response => {
        const { error } = response.assignNonVoipNumbers;
        if (error === null) {
          ToastMessage({
            content: 'Number Assigned Successfully.',
            type: 'success',
          });
          props?.toggleAssignNumberModal?.(false);
          cache.modify({
            fields: {
              nonVoipNumbersRequests: () => {},
            },
          });
          return;
        }
        ToastMessage({ content: error.message, type: 'danger' });
        props?.toggleAssignNumberModal?.(false);
      },
      onError: () => {
        ToastMessage({ content: t('error.unspecific', 'Something went wrong.'), type: 'danger' });
        setTimeout(() => {
          props?.setVisibleCloseModal?.(false);
        }, 1000);
      },
    },
  );
  const assignNonVoipNumbers = async (payload: any) => {
    await assignNonVoipNumbersNutation({
      variables: {
        data: payload,
      },
    });
  };
  return {
    changeTicketStatus,
    changeNonVoipPurchaseStatus,
    assignNonVoipNumbers,
    loadingAssignNumber,
  };
}
