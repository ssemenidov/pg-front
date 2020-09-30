import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import InnerForm from './TabPanel/TabPanelLocation';
import { getCurrentLocation, resetCurrentLocation } from '../../../store/actions/locationActions';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { LeftBar } from '../../../styles/styles';

const Location = (props) => {
  const [showSearchBtn, setSearchBtn] = React.useState(false);
  const handleTabSelected = (index) => {
    if (index === 1) {
      setSearchBtn(true);
    } else setSearchBtn(false);
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
      </LeftBar>
      <InnerForm selectedTab={handleTabSelected} locationID={props.match.params.id} />
      <style>{`
        .left-bar {
          margin: 0 2vw 0 0;
        }
      `}</style>
    </div>
  );
};

export default Location;
