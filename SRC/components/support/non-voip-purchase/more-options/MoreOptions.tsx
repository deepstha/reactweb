import { useState } from 'react';
import { Menu } from 'antd';
import { RiMoreFill } from 'react-icons/ri';

import AssignNumberForm from './AssignNumberForm';

import { MoreOptionsPopover } from '../../common/StylesMoreOptions';

interface MoreOptionsProps {
  data: any;
}

export function MoreOptions({ data }: MoreOptionsProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [visibleAssignModal, setVisibleAssignModal] = useState(false);
  const toggleAssignNumberModal = () => setVisibleAssignModal(prevState => !prevState);
  const handleDropdownVisibility = (value: boolean) => {
    setDropdownVisible(value);
  };
  const executeAction = (action: string) => {
    const actions: any = {
      assignNumber: toggleAssignNumberModal,
    };
    return actions[action];
  };

  const onOptionClicked = ({ key }: any) => {
    setDropdownVisible(false);
    executeAction?.(key)?.();
  };

  const options = (
    <Menu className='w-51.75' onClick={onOptionClicked}>
      <Menu.Item key='assignNumber'>Assign Number</Menu.Item>
    </Menu>
  );
  return (
    <>
      <MoreOptionsPopover
        placement='rightTop'
        visible={dropdownVisible}
        onVisibleChange={handleDropdownVisibility}
        content={options}
        trigger='click'
        overlayClassName='more-options'
        getPopupContainer={trigger => trigger?.parentNode?.parentNode?.parentNode as HTMLElement}
      >
        <div>
          <RiMoreFill />
        </div>
      </MoreOptionsPopover>

      {visibleAssignModal && (
        <AssignNumberForm
          toggleAssignNumberModal={toggleAssignNumberModal}
          visibleAssignModal={visibleAssignModal}
          data={data}
        />
      )}
    </>
  );
}
