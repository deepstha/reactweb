import styled from 'styled-components';
import { Menu, Dropdown } from 'antd';

export const DropdownWrapper = styled(Dropdown)`
  .ant-dropdown {
    width: 85.25%;
    padding: 0;
    background: transparent;
    box-shadow: 0px 5px 50px rgb(0 0 0 / 10%);
    border-radius: 15px;
  }
  + div > p {
    margin-bottom: 20px !important;
  }
  &.dialer-dropdown {
    width: 100%;
    .ant-dropdown {
      padding: 0;
      left: -1px !important;
      top: auto !important;
      bottom: -525px !important; // widget height
      width: 320px;
      border-radius: 12px;
      overflow-y: hidden;
      border: 1px solid #e7e6eb;
    }
  }
`;

export const MenuWrapper = styled(Menu)`
  border: none !important;
  background: transparent;
  overflow: auto;
  max-height: 252px;
  width: 100%;
  .ant-menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    &.ant-menu-item-selected {
      background: #f5f2f8 !important;
    }
    &:not(:last-child),
    & {
      margin: 0;
    }
  }
`;
