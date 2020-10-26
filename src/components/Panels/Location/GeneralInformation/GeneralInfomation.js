import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router';

import EditInformation from './Blocks/EditInformation';
import Address from './Blocks/Address';
import { YMaps, Map, Placemark, ListBox } from 'react-yandex-maps';
import Contract from './Blocks/Contract';
import AkimatResolution from './Blocks/AkimatResolution';
import GroundAct from './Blocks/GroundAct';
import Construction from './Blocks/Construction';
import { locationContext } from "../../../../containers/Base/Location/Location";

const GeneralInformation = () => {
  const  [item, setItem] = useContext(locationContext);
  const history = useHistory();

  let newCoords;

  const { constructionSet } = item;

  const removeConstruction = (e, id) => {
    e.preventDefault();

    let edgesLocal = constructionSet.edges;

    edgesLocal = edgesLocal.filter(el => el.id == id);

    setItem({
      ...item,
      constructionSet: {
        edges: edgesLocal
      }
    })
  }
  const openConstruction = (e, id) => {
    e.preventDefault();

    history.push(`/base/construction/${id}`);
    history.go(0);
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 0 23%', margin: '1vw 1vw 1vw 0' }}>
        <EditInformation />
      </div>
      <div style={{ flex: '1 0 23%', margin: '1vw' }}>
        <Address />
      </div>
      <div style={{ flex: '1 0 48%', margin: '1vw 0 1vw 1vw' }}>
        <YMaps>
          <Map
            style={{ height: '100%' }}
            defaultState={{ center: [43.24230063395435, 76.90130050681198], zoom: 9 }}
          >
            <Placemark
              geometry={{
                type: 'Point',
                coordinates: [43.24230063395435, 76.90130050681198],
              }}
              options={{
                draggable: true,
              }}
              instanceRef={(ref) => {
                if (ref) {
                  ref.geometry.events.add('change', function (e) {
                    newCoords = e.get('newCoordinates');
                  });
                }
              }}
            />
          </Map>
        </YMaps>
      </div>

      {
        constructionSet && constructionSet.edges.length
        ? constructionSet.edges.map((construction) => (
            <div style={{ flex: '1 0 23%', margin: '1vw 1vw 1vw 0' }}>
              <Construction
                key={construction.id}
                remove={(e) => removeConstruction(e, construction.id)}
                open={(e) => openConstruction(e, construction.id)}
              />
            </div>
          ))
        : ''
      }

      <div style={{ flex: '1 0 23%', margin: '1vw 1vw 1vw 0' }}>
        <AkimatResolution />
      </div>
      <div style={{ flex: '1 0 23%', margin: '1vw 0 1vw 1vw' }}>
        <GroundAct />
      </div>
      <div style={{ flex: '1 0 100%', margin: '1vw 0' }}>
        <Contract />
      </div>
    </div>
  );
};

export default GeneralInformation;
