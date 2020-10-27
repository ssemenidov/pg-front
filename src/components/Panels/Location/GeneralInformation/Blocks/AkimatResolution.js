import React, { useContext } from 'react';
import { locationContext } from '../../../../../containers/Base/Location/Location';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { Input} from 'antd';
import { DatePicker } from 'antd';
import moment from "moment";

export const AkimatResolution = (props) => {
  const [item, setItem] = useContext(locationContext);

  function onChangeDatePicker(date) {
    const dateNow = date && date;

    if(dateNow) {
      setItem({...item, resolutionNumberDate: new Date(dateNow)});
    }
  }

  return (
    <Medium>
      <BlockTitle>Постановление от акимата</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '49%' }}>
            <InputTitle>Номер</InputTitle>
            <Input
              value={item.resolutionNumber ? item.resolutionNumber :""}
              onChange={(e) => {setItem({...item, resolutionNumber:e.target.value})}}
              size={'large'}
            />
          </div>
          <div style={{ width: '49%' }}>
            <InputTitle>Дата</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              format='DD/MM/YYYY'
              style={{ width: '100%' }}
              defaultValue={item.resolutionNumberDate ? moment(item.resolutionNumberDate) : ''}
              onChange={onChangeDatePicker}
            />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default AkimatResolution;
