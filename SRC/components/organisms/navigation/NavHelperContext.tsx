import { createContext } from 'react';

import { useNavHelper } from './workspace-detail-sidebar/useNavHelper';

export const NavHelperContext = createContext({});

export const NavHelperProvider = ({ children }: any) => {
  const { chatSubscriptionData, activeWorkspaceData, loadingActiveWorkspace } = useNavHelper();

  return (
    <NavHelperContext.Provider
      value={{
        chatSubscriptionData,
        activeWorkspaceData,
        loadingActiveWorkspace,
      }}
    >
      {children}
    </NavHelperContext.Provider>
  );
};
