import React, { useContext } from 'react';
import { locationContext } from '../../../../../containers/Base/Location/Location';
import { Input} from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { DatePicker } from 'antd';

export const GroundAct = (props) => {
  const [item, setItem] = useContext(locationContext);
  return (
    <Medium>
      <BlockTitle>Акт на землю</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '49%' }}>
            <InputTitle>Номер</InputTitle>
            <Input
        
              value={item.areaAct ? item.areaAct :""}
              onChange={(e) => {setItem({...item, areaAct:e.target.value})}}
              size={'large'}
            />
          </div>
          <div style={{ width: '49%' }}>
            <InputTitle>Дата</InputTitle>
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default GroundAct;
