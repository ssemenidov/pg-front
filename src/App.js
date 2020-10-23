import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import locale from 'antd/es/locale/ru_RU';
import './App.css';
import 'antd/dist/antd.css';

import Main from './containers/Main/Main';
import MainBase from './containers/Base/Main/Main';
import MainAdministration from './containers/Administration/Main/Main';
import MainSales from './containers/Sales/Main/Main';
import MainInstall from './containers/Installations/Main/Main';

import Partners from './containers/Base/Partners/Partners';
import OutdoorFurniture from './containers/Base/OutdoorFurniture/OutdoorFurniture';

import Header from './components/Header/Header';
import Construction from './containers/Base/Construction/Construction';
import Locations from './containers/Base/Locations/Locations';
import Location from './containers/Base/Location/Location';
import Partner from './containers/Base/Partner/Partner';
import Agreements from './containers/Base/Documents/Agreements/Agreements';
import Agreement from './containers/Base/Documents/Agreement/Agreement';
import Application_base from './containers/Base/Documents/Application_base/Application_base';
import Crews from './containers/Base/Crews/Crews';

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


import Person from './containers/Administration/Person/Person';
import AdminOutdoorFurniture from './containers/Administration/AdminOutdoorFurniture/AdminOutdoorFurniture';
import AdminLocations from './containers/Administration/AdminLocations/AdminLocations'
import Packages from './containers/Administration/Packages/Packages'
import AdminCrews from './containers/Administration/AdminCrews/AdminCrews'
import Prices from './containers/Administration/Prices/Prices'
import TestImageUpload from './containers/Administration/Main/TestImageUpload'

import { adminRoutes } from './containers/Administration/Main/adminRoutes';

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
          <Route path="/base/partners/partner/:id?" exact component={Partner} />
          <Route path="/base/construction/:id?" exact component={Construction} />
          <Route path="/base/locations" exact component={Locations} />
          <Route path="/base/locations/location/:id?" exact component={Location} />
          <Route path="/base/documents/agreements" exact component={Agreements} />
          <Route path="/base/documents/agreement/:id?" exact component={Agreement} />
          <Route path="/base/documents/application_base" exact component={Application_base} />

          <Route path="/base/crews" component component={Crews} />

          <Route path="/installations/design" component={Design} />
          <Route path="/installations" exact component={MainInstall} />
          <Route path="/installations/projects" component={Projects} />
          <Route path="/installations/orders" component={Orders} />

          <Route path={adminRoutes.root.to} exact component={MainAdministration} />
          <Route path={adminRoutes.person.to} component={Person} />
          <Route path={adminRoutes.outdoor_furniture.to} component={AdminOutdoorFurniture} />
          <Route path={adminRoutes.locations.to} component={AdminLocations} />
          <Route path={adminRoutes.packages.to} component={Packages} />
          <Route path={adminRoutes.crews.to} component={AdminCrews} />
          <Route path={adminRoutes.prices.to} component={Prices} />
          <Route path={adminRoutes.test_image.to} component={TestImageUpload} />

        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
