import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserForm from './UserMenu/UserMenu';

const Header = () => {
  const salesMenu = (
    <Menu>
      <Menu.ItemGroup>
        <Menu.Item>
          <Link to="/sales/advertising_parties">Справочник рекламных сторон</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/sales/batch_placement">Пакетное размещение</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/sales/com_projects">Коммерческие проекты</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/sales/invoice">Счета</Link>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  const baseMenu = (
    <Menu>
      <Menu.ItemGroup>
        <Menu.Item>
          <Link to="/base/outdoor_furniture">Конструкции</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/base/locations">Список местоположений</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/base/partners">Контрагенты</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/base/documents/agreements">Документы</Link>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <StyledHeader>
      <StyledBlock>
        <img src={require('../../img/partners/logo.svg')} alt="" />
      </StyledBlock>
      <StyledList>
        <Dropdown overlay={salesMenu}>
          <Link to="/sales">Продажи</Link>
        </Dropdown>
        <Link to="/installations/design">Монтажи</Link>
        <Dropdown overlay={baseMenu}>
          <Link to="/base">Базы</Link>
        </Dropdown>
        <Link to="/installations/design">Отчеты</Link>
        <Link to="/installations/design">Администрация</Link>
      </StyledList>
      <StyledBlock>
        <UserForm
          name="Алексей"
          surname="Иванов"
          position="Администратор"
          avatar="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
        />
      </StyledBlock>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled(Layout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 45px;
  font-size: 14px;
  background: #fff;
  box-shadow: 0 1px 2px 0 #92b6e8, inset 0 -3px 0 0 #e7eef8;
  z-index: 1;
`;

const StyledList = styled.div`
  a {
    padding: 29px 25px;
    color: #003360;
    font-weight: 600;
  }
  a:hover {
    color: #D42D11;
    border-bottom: 3px solid #D42D11;
  }
`;

const StyledBlock = styled.div`
  width: 300px;
`;
