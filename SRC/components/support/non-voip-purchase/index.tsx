import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';

import uuid from 'components/utils/uuid';
import { Pagination } from 'components/molecules';
import NoPurchaseImg from 'assets/icons/no_purchase-req.svg';

import { useColumn } from './useColumn';
import { useFetchData } from './useFetchData';

import { NoSupportData } from '../common/NoSupportData';
import * as S from '../common/Styles';
import { Header } from '../common/Header';
import { useTableProperties } from '../common/useTableProperties';
import { queryParamVars, useQVars } from './useQueryParams';

export default function NonvVoipPurchaseSupport() {
  const { tableBodyHeight, padding } = useTableProperties({ hasDateFilter: true });
  const { t } = useTranslation();
  const columns = useColumn();
  const {
    data,
    hasNextPage,
    hasPreviousPage,
    onNext,
    onPrev,
    loading,
    handleDateFilter,
    handleSearch,
    handleStatusFilter,
    handleTicketStatusFilter,
    qParams,
    refetch,
  } = useFetchData();
  const { setFilters } = useQVars(queryParamVars);
  useEffect(() => {
    setFilters(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    data.length <= 0 &&
    loading &&
    qParams.search === null &&
    qParams.filter === null &&
    qParams.filters === null
  ) {
    return (
      <NoSupportData
        imageSrc={NoPurchaseImg}
        title='No Purchase Requests'
        info='No any purchase request tickets are made currently. Reload to see if there are any new tickets.'
        handler={() => refetch?.()}
      />
    );
  }

  return (
    <S.Wrapper padding={padding}>
      <div className='content'>
        <Header
          title='Non-Voip Number Purchase '
          description='Record of all the recent number purchase from Krispcall'
          placeholder='Search by ticket no., requested by and workspace'
          handleDateFilter={handleDateFilter}
          handleSearch={handleSearch}
          handleStatusFilter={handleStatusFilter}
          handleTicketStatusFilter={handleTicketStatusFilter}
          enableTableSearch
          enableTicketStatusFiltering
          enableNumberStatusFiltering
          enableNonVoipNumberStatusFiltering
          enableDateFilter
        />
        <S.TableWrapper className='numbers-table__purchase'>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record: any) => uuid()}
            loading={loading}
            pagination={false}
            scroll={{ x: 'max-content', y: tableBodyHeight }}
          />
          <Pagination
            next={onNext}
            prev={onPrev}
            disablePrev={!hasPreviousPage}
            disableNext={!hasNextPage}
          />
        </S.TableWrapper>
      </div>
    </S.Wrapper>
  );
}
