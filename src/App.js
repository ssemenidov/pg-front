import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import locale from 'antd/es/locale/ru_RU';
import './App.css';
import 'antd/dist/antd.css';

import Main from './containers/Main/Main';
<<<<<<< HEAD
=======
import MainBase from './containers/Base/Main/Main';
import MainSales from './containers/Sales/Main/Main';
import MainInstall from './containers/Installations/Main/Main';
>>>>>>> ce94380bf0f0431b270030a453ef417744c5a209

import MainBase from './containers/Base/Main/Main';
import Partners from './containers/Base/Partners/Partners';
import OutdoorFurniture from './containers/Base/OutdoorFurniture/OudoorFurniture';
import Header from './components/Header/Header';
import Construction from './containers/Base/Construction/Construction';
import Locations from './containers/Base/Locations/Locations';
import Location from './containers/Base/Location/Location';
import PartnerGeneralInfo from './containers/Base/Partners/TabPanelForm/PartnerGeneralInfo';
import Agreements from './containers/Base/Documents/Agreements/Agreements';
import Agreement from './containers/Base/Documents/Agreement/Agreement';
import Crews from './containers/Base/Crews/Crews';

import MainSales from './containers/Sales/Main/Main';
import BatchPlacement from './containers/Sales/BatchPlacement/BatchPlacement';
import AdvertisingParties from './containers/Sales/AdvertisingParties/AdvertisingParties';
import Project_card from './containers/Sales/Project_card/Project_card';
import Project_new from './containers/Sales/Project_new/Project_new';
import Application from './containers/Sales/Application/Application';
import Com_projects from './containers/Sales/Com_projects/Com_projects';
import Invoice from './containers/Sales/Invoice/Invoice';
import Estimate from './containers/Sales/Estimate/Estimate';
import Summary from './containers/Sales/Summary/Summary';

import Projects from './containers/Installations/Projects/Projects';
import Orders from './containers/Installations/Orders/Orders';
import Design from './containers/Installations/Design/Design';

const App = () => {
  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />

          <Route path="/sales" exact component={MainSales} />
          <Route path="/sales/batch_placement" component={BatchPlacement} />
          <Route path="/sales/advertising_parties" component={AdvertisingParties} />
          <Route path="/sales/project_card" component={Project_card} />
          <Route path="/sales/project_new" component={Project_new} />
          <Route path="/sales/application" component={Application} />
          <Route path="/sales/com_projects" component={Com_projects} />
          <Route path="/sales/invoice" component={Invoice} />
          <Route path="/sales/estimate" component={Estimate} />
          <Route path="/sales/summary" component={Summary} />

          <Route path="/base" exact component={MainBase} />
          <Route path="/base/outdoor_furniture" exact component={OutdoorFurniture} />
          <Route path="/base/partners" exact component={Partners} />
          <Route path="/base/partners/info/:id?" exact component={PartnerGeneralInfo} />
          <Route path="/base/construction/:id?" exact component={Construction} />
          <Route path="/base/locations" exact component={Locations} />
          <Route path="/base/locations/location/:id?" exact component={Location} />
          <Route path="/base/documents/agreements" exact component={Agreements} />
<<<<<<< HEAD
          <Route path="/base/documents/agreement" exact component={Agreement} />
          <Route path="/base/crews" component component={Crews} />

          <Route path="/installations/design" component={Design} />
=======
          <Route path="/installations" exact component={MainInstall} />
>>>>>>> ce94380bf0f0431b270030a453ef417744c5a209
          <Route path="/installations/projects" component={Projects} />
          <Route path="/installations/orders" component={Orders} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
