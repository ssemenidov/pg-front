import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import locale from 'antd/es/locale/ru_RU';
import './App.css';
import 'antd/dist/antd.css';
import './assets/fonts/sf-ui-display-cufonfonts-webfont/style.css';

import Partners from './containers/Base/Partners/Partners';
import OutdoorFurniture from './containers/Base/OutdoorFurniture/OudoorFurniture';
import Header from './components/Header/Header';
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
<<<<<<< HEAD
=======
import Projects from './containers/Installations/Projects/Projects';
import Orders from './containers/Installations/Orders/Orders';
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

const installationsMenu = (
  <Menu>
    <Menu.ItemGroup>
      <Menu.Item>
        <Link to="/installations/projects">Список Проектов</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/installations/orders">Разнорядка</Link>
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
>>>>>>> 4ef4581073fc02be2e7f6745700aa41b06787b56

const App = () => {
  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter>
<<<<<<< HEAD
        <Header />
=======
        <Layout.Header className="header">
          <div style={{ width: '300px' }}>
            <img src={require('./img/partners/logo.svg')} alt="" />
          </div>
          <div className="links">
            <Dropdown overlay={salesMenu}>
              <Link to="/sales/advertising_parties">Продажи</Link>
            </Dropdown>
            <Dropdown overlay={installationsMenu}>
              <Link to="/installations/projects">Монтажи</Link>
            </Dropdown>

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
>>>>>>> 4ef4581073fc02be2e7f6745700aa41b06787b56
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
<<<<<<< HEAD

          <Route path="/base/outdoor_furniture" exact component={OutdoorFurniture} />
=======
          <Route path="/installations/projects" component={Projects} />
          <Route path="/installations/orders" component={Orders} />
>>>>>>> 4ef4581073fc02be2e7f6745700aa41b06787b56
          <Route path="/base/partners" exact component={Partners} />
          <Route path="/base/partners/info/:id?" exact component={PartnerGeneralInfo} />
          <Route path="/base/construction/:id?" exact component={Construction} />
          <Route path="/base/locations" exact component={Locations} />
          <Route path="/base/locations/location/:id?" exact component={Location} />
          <Route path="/base/documents/agreements" exact component={Agreements} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
