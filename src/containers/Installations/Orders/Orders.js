import React, { useState } from 'react';
import { LeftBar, StyledButton } from '../../../styles/styles';
import PanelDesign from './PanelOrders';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../Base/Partners/LeftBar/SearchBtn';
import CreateBtn from '../../Base/Partners/LeftBar/CreateBtn';
import PackageBtn from '../../Base/Partners/LeftBar/PackageBtn';
import EditBtn from '../../Base/Partners/LeftBar/EditBtn';
import BoxBtn from '../../Base/Partners/LeftBar/BoxBtn';
import PaperBtn from '../../Base/Partners/LeftBar/PaperBtn';
import FilterBar from './FilterBar';

const Orders = () => {
  const [block, setBlock] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  const links = [
    { id: '', value: 'Главная' },
    { id: 'installations', value: 'Монтажи' },
    { id: 'installations/orders', value: 'Выгрузка разнарядки' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div className="flex-margin">
        <LeftBar>
          <SearchBtn onClick={() => setCollapsed(!collapsed)} />
        </LeftBar>
        {collapsed && <FilterBar />}
      </div>

      <div style={{ width: '70vw', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '2vw 0',
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <TitleLogo />
            <JobTitle>Выгрузка разнарядки</JobTitle>
          </div>
          <ButtonGroup></ButtonGroup>
        </div>

        <div style={{ display: 'flex' }}>
          <PanelDesign style={{ flex: '0 1 auto' }} setBlock={setBlock} />
        </div>
      </div>
      {/* {block === 0 ? null : <FilterBar />} */}
      <style>
        {`
         .flex-margin {
            display: flex;
            margin: 0 2vw 0 0;
          }
          .left-bar {
            margin: 0 2vw 0 0;
          }
        
        `}
      </style>
    </div>
  );
};

export default Orders;
