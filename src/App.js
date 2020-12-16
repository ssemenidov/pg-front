import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import locale from 'antd/es/locale/ru_RU';
import './App.css';
import 'antd/dist/antd.css';
import Header from './components/Header/Header';

import { routes } from './routes';

const App = () => {
  let routesArr = [];
  for (let [keyTop, routeTop] of Object.entries(routes)) {
    for (let [keyValue, routeValue] of Object.entries(routeTop)) {
      routesArr.push(
        <Route key={keyTop + keyValue} path={routeValue.path} exact component={routeValue.component} />
      )
    }
  }
  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <Header />
<<<<<<< HEAD
        <Switch>{routesArr}</Switch>
=======
        <Switch>
          <Route path="/" exact component={Main} />

          <Route path="/sales" exact component={MainSales} />
          <Route path="/sales/batch_placement" component={BatchPlacement} />
          <Route path="/sales/advertising_parties" component={AdvertisingParties} />
          <Route path="/sales/project_new" component={Project_new} exact />
          <Route path="/sales/project_new/:id" component={Project_new} exact />
          <Route path="/sales/project_card/:id" component={Project_card} exact />
          <Route path="/sales/project_card/:id/estimate" component={Estimate} exact />
          <Route path="/sales/application/:appId" component={Application} exact />
          <Route path="/sales/application/:appId/estimate" component={Estimate} exact />
          <Route path="/sales/com_projects" component={Com_projects} />
          <Route path="/sales/invoice" component={Invoice} />
          <Route path="/sales/summary/:id" component={Summary} />

          <Route path="/base" exact component={MainBase} />
          <Route path="/base/outdoor_furniture" exact component={OutdoorFurniture} />
          <Route path="/base/brands" exact component={Brands} />
          <Route path="/base/partners" exact component={Partners} />
          <Route path="/base/partners/partner/:id?" exact component={Partner} />
          <Route path="/base/partners/partner/:id?/brands" exact component={Brands} />
          <Route path="/base/partners/partner/:id?/advertisers" exact component={Partners} />
          <Route path="/base/partner/brand/:id?" exact component={Brand} />
          <Route path="/base/construction/:id?" exact component={Construction} />
          <Route path="/base/locations" exact component={Locations} />
          <Route path="/base/locations/location/:id?" exact component={Location} />
          <Route path="/base/locations/location/:id?/add_outdoor_furniture" exact component={OutdoorFurniture} />
          <Route path="/base/documents/agreements" exact component={Agreements} />
          <Route path="/base/documents/agreement/:id?" exact component={Agreement} />
          <Route path="/base/documents/application_base" exact component={ApplicationsBase} />
          <Route path="/base/documents/application/:id?" exact component={ApplicationBase} />
          <Route path="/base/crews" exact component={Crews} />
          <Route path="/base/crews/:id?" exact component={Crews} />
          <Route path="/base/crews/:id?/add_outdoor_furniture" exact component={()=><OutdoorFurniture isCrew={true}/> }  />

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
          {adminRoutes.test_image && <Route path={adminRoutes.test_image.to} component={TestImageUpload} />}
        </Switch>
>>>>>>> 300eb7bc3bb5a0157e78f9d07f81799c9ca6c9bc
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
