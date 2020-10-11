import React, { useEffect, useState,createContext } from 'react';
import { useDispatch } from 'react-redux';
import InnerForm from './TabPanel/TabPanelLocation';
import { getCurrentLocation, resetCurrentLocation } from '../../../store/actions/locationActions';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { LeftBar } from '../../../styles/styles';

export const locationContext = createContext();
const Location = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [item, setItem] = useState({state:"state"});
  console.log(id);
  const [showSearchBtn, setSearchBtn] = React.useState(false);
  const handleTabSelected = (index) => {
    if (index === 1) {
      setSearchBtn(true);
    } else setSearchBtn(false);
  };

  return (
    <locationContext.Provider value={ id }>
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
      </LeftBar>
      <InnerForm selectedTab={handleTabSelected}  />
      <style>{`
        .left-bar {
          margin: 0 2vw 0 0;
        }
      `}</style>
    </div>
    </locationContext.Provider>
  );

};

export default Location;
