import React, { useContext } from 'react';
import moment from 'moment';

import { DatePicker } from 'antd';
import { locationContext } from '../../../../../containers/Base/Location/Location';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';

import { StyledSelect,StyledInput } from '../../../../Styles/DesignList/styles';
import numberIcon from '../../../../../img/input/number.svg';

export const GroundAct = (props) => {
  const [item, setItem] = useContext(locationContext);

  function onChangeDatePicker(date) {
    const dateNow = date && date;

    if(dateNow) {
      setItem({...item, areaActDate: new Date(dateNow)});
    }
  }

  return (
    <Medium>
      <BlockTitle>Акт на землю</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '49%' }}>
            <InputTitle>Номер</InputTitle>
            <StyledInput
              prefix={<img src={numberIcon} />}
              value={item.areaAct ? item.areaAct :""}
              onChange={(e) => {setItem({...item, areaAct:e.target.value})}}
              size={'large'}
            />
          </div>
          <div style={{ width: '49%' }}>
            <InputTitle>Дата</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              style={{ width: '100%' }}
              defaultValue={item.areaActDate ? moment(item.areaActDate) : ''}
              onChange={onChangeDatePicker}
            />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default GroundAct;
