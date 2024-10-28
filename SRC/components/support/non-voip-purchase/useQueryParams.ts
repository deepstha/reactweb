/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeVar } from '@apollo/client';
import { produce } from 'immer';

// Create the initial value
export const LIMIT = 10;
const initialParams = {
  after: null,
  filter: null,
  first: LIMIT,
  search: null,
};

// Create the Query var and initialize it with the initial value
export const queryParamVars: any = makeVar(initialParams);

// expose the operations done on the state
export function useQVars(qVars: any) {
  const setSearch = (text: any) => {
    const qvars = qVars();
    const updatedQvars: any = produce(qvars, (draft: any) => {
      draft.search = text;
    });
    qVars(updatedQvars);
  };

  const setFilters = (filters: any) => {
    const qvars = qVars();
    const updatedQvars: any = produce(qvars, (draft: any) => {
      draft.filters = filters;
    });
    qVars(updatedQvars);
  };
  return {
    setSearch,
    setFilters,
  };
}
