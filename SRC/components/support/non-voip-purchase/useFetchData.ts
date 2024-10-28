import { useEffect, useMemo, useState } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';

import useDebounce from 'hooks/useDebounce';
import { NON_VOIP_NUMBER_REQUEST_SUPPORT } from 'graphql/support/purchase/query';
import { queryParamVars, LIMIT, useQVars } from './useQueryParams';

export function useFetchData() {
  const [loadData, { data: purchaseData, fetchMore, loading, refetch }] = useLazyQuery(
    NON_VOIP_NUMBER_REQUEST_SUPPORT,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
  const { setSearch, setFilters } = useQVars(queryParamVars);
  const WAIT_TIME_IN_MS = 500;
  const [searchedQuery, setSearchedQuery] = useState('');
  const debouncedQuery = useDebounce<string>(searchedQuery, WAIT_TIME_IN_MS);
  const qParams = useReactiveVar<any>(queryParamVars);
  useEffect(() => {
    if (loadData)
      loadData({
        variables: {
          params: qParams,
        },
      });
  }, [qParams, loadData]);

  const data = useMemo(() => purchaseData?.nonVoipNumbersRequests?.data?.edges ?? [], [
    purchaseData,
  ]);

  const hasData = data.length > 0;
  const hasPreviousPage = purchaseData?.nonVoipNumbersRequests?.data?.pageInfo.hasPreviousPage;
  const startCursor = purchaseData?.nonVoipNumbersRequests?.data?.pageInfo?.startCursor;
  const hasNextPage = purchaseData?.nonVoipNumbersRequests?.data?.pageInfo.hasNextPage;
  const endCursor = purchaseData?.nonVoipNumbersRequests?.data?.pageInfo?.endCursor;
  const onPrev = async () => {
    if (fetchMore && startCursor) {
      await fetchMore({
        variables: {
          params: {
            ...qParams,
            after: null,
            before: startCursor || null,
            first: null,
            last: LIMIT,
          },
        },
      });
    }
  };
  const onNext = async () => {
    if (fetchMore && endCursor) {
      await fetchMore({
        variables: {
          params: {
            ...qParams,
            after: endCursor || null,
            before: null,
            first: LIMIT,
            last: null,
          },
        },
      });
    }
  };

  const handleSearch = (evt: any) => {
    const term = evt?.target?.value;
    setSearchedQuery(term);
  };
  useEffect(() => {
    if (debouncedQuery) {
      setSearch({
        columns: ['ticketNumber', 'workspaceName', 'firstName', 'lastName', 'planName'],
        value: debouncedQuery,
      });
      return;
    }
    setSearch(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const handleStatusFilter = (e: any) => {
    const filterValue = e.target.value;
    const { filters } = qParams;

    const filterArr = filters ? filters[0] : [];
    if (!filterValue) {
      setFilters([{ ...filterArr, 'purchaseStatus.eq': undefined }]);
      return;
    }
    setFilters([{ ...filterArr, 'purchaseStatus.eq': filterValue }]);
  };

  const handleDateFilter = (date: any, dateString: any) => {
    const { filters } = qParams;
    const filterArr = filters ? filters[0] : [];
    if (!dateString) {
      setFilters([{ ...filterArr, 'createdAt.date_eq': undefined }]);
      return;
    }
    setFilters([{ ...filterArr, 'createdAt.date_eq': dateString }]);
  };

  const handleTicketStatusFilter = (e: any) => {
    const filterValue = e.target.value;
    const { filters } = qParams;
    const filterArr = filters ? filters[0] : [];
    if (!filterValue) {
      setFilters([{ ...filterArr, 'ticketStatus.eq': undefined }]);
      return;
    }
    setFilters([{ ...filterArr, 'ticketStatus.eq': filterValue }]);
  };
  return {
    data,
    refetch,
    hasData,
    hasPreviousPage,
    hasNextPage,
    loading,
    onPrev,
    qParams,
    onNext,
    handleDateFilter,
    handleSearch,
    handleStatusFilter,
    handleTicketStatusFilter,
  };
}
