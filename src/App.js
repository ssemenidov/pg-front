import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { BrowserRouter, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import './App.css';
import 'antd/dist/antd.css';
import './assets/fonts/sf-ui-display-cufonfonts-webfont/style.css';

import Partners from './containers/Base/Partners/Partners';
import OutdoorFurniture from './containers/Base/OutdoorFurniture/OudoorFurniture';
import Header from './components/Header/Header';
import UserForm from './components/Header/UserMenu/UserMenu';
import Construction from './containers/Base/Construction/Construction';
import Locations from './containers/Base/Locations/Locations';
import Location from './containers/Base/Location/Location';
import PartnerGeneralInfo from './containers/Base/Partners/TabPanelForm/PartnerGeneralInfo';
import Agreements from './containers/Base/Documents/Agreements/Agreements';

import Design from './containers/Installations/Design/Design';

import BatchPlacement from './containers/Sales/BatchPlacement/BatchPlacement';
import AdvertisingParties from './containers/Sales/AdvertisingParties/AdvertisingParties';
import Project_card from './containers/Sales/Project_card/Project_card';
import Application from './containers/Sales/Application/Application';
import Com_projects from './containers/Sales/Com_projects/Com_projects';
import Invoice from './containers/Sales/Invoice/Invoice';
import Estimate from './containers/Sales/Estimate/Estimate';
import Summary from './containers/Sales/Summary/Summary';
import Projects from './containers/Installations/Projects/Projects';
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
        <Link to="/base/outdoor_furniture">Уличная мебель</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/base/construction">Конструкции</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/base/partners">Контрагенты</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/base/locations">Список местоположений</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/base/outdoor_furniture">Список проектов</Link>
      </Menu.Item>
    </Menu.ItemGroup>
  </Menu>
);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout.Header className="header">
          <div style={{ width: '300px' }}>
            <img src={require('./img/partners/logo.svg')} alt="" />
          </div>
          <div className="links">
            <Dropdown overlay={salesMenu}>
              <Link to="/sales">Продажи</Link>
            </Dropdown>
            <Link to="/installations/design">Монтажи</Link>
            <Dropdown overlay={baseMenu}>
              <Link to="/base">Базы</Link>
            </Dropdown>
            <Link to="/installations/design">Отчеты</Link>
            <Link to="/installations/design">Администрация</Link>
          </div>
          <div style={{ width: '300px' }}>
            <UserForm
              name="Алексей"
              surname="Иванов"
              position="Администратор"
              avatar="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
            />
          </div>
        </Layout.Header>
        <Switch>
          <Route path="/sales/batch_placement" component={BatchPlacement} />
          <Route path="/sales/advertising_parties" component={AdvertisingParties} />
          <Route path="/sales/project_card" component={Project_card} />
          <Route path="/sales/application" component={Application} />
          <Route path="/sales/com_projects" component={Com_projects} />
          <Route path="/sales/invoice" component={Invoice} />
          <Route path="/sales/estimate" component={Estimate} />
          <Route path="/sales/summary" component={Summary} />
          <Route path="/installations/design" component={Design} />
          <Route path="/installations/projects" component={Projects} />
          <Route path="/base/partners" exact component={Partners} />
          <Route path="/base/partners/info/:id?" exact component={PartnerGeneralInfo} />
          <Route path="/base/construction/:id?" exact component={Construction} />
          <Route path="/base/outdoor_furniture" exact component={OutdoorFurniture} />
          <Route path="/base/locations" exact component={Locations} />
          <Route path="/base/locations/location/:id?" exact component={Location} />
          <Route path="/base/documents/agreements" exact component={Agreements} />
        </Switch>
      </BrowserRouter>
      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          padding: 0 45px;
          font-size: 14px;
          background: #fff;
          box-shadow: 0 1px 2px 0 #92b6e8, inset 0 -3px 0 0 #e7eef8;
          z-index: 1;
        }
        .links a {
          padding: 29px 25px;
          color: #003360;
          font-weight: 600;
        }
        .links a:hover {
          color: #D42D11;
          border-bottom: 3px solid #D42D11;
        }
      `}</style>
    </>
  );
};

export default App;
