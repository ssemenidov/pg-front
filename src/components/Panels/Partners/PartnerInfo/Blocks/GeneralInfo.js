import React, { useContext } from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';

import InputAnchor from '../../../../Inputs/InputAnchor';
import Multiline from '../../../../Inputs/Multiline';
import SelectAnchor from '../../../../Inputs/SelectAnchor';
import { BlockBody, Medium, Row, Column, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
export default function GeneralInfo() {
  const [item, setItem] = useContext(partnerContext);
  return (
    <Medium style={{ height: '100%' }}>
      <BlockTitle>Общая информация</BlockTitle>
      <BlockBody>
        <form action="" >
          <Row>
            <Column style={{ width: '45%' }}>
              <Row style={{ padding: '0' }}>
                <div style={{ width: '100%' }}>
                  <InputTitle>Наименование контрагента</InputTitle>
                  <InputAnchor
                  
                    placeholder="Контрагент"
                  
                  />
                </div>
              </Row>
              <Row style={{ paddingBottom: '0' }}>
                <div style={{ width: '100%' }}>
                  <InputTitle>Сектор деятельности</InputTitle>
                  <InputAnchor

                    placeholder="Производство напитков"
                  
                    
                  />
                </div>
              </Row>
            </Column>
            <Column style={{ width: '45%', marginBottom: 'auto' }}>
              <InputTitle>Комментарий</InputTitle>
              <Multiline
                style={{ width: '100%' }}
              
                inputProps={{ maxLength: 450, rows: 186, cols: 10 }}
          
              />
              {/* <div style={{ width: "100%" }}>
                    <InputTitle>Бренд</InputTitle>
                    <InputAnchor
                      value={Object.keys(state).length !== 0 ? state.brand : ""}
                      placeholder="Бренд"
                      onChange={(e) =>
                        dispatch(sendContragentValues("brand", e.target.value))
                      }
                    />
                  </div> */}
            </Column>
          </Row>

          <Row>
            <Column style={{ width: '45%' }}>
              <div style={{ width: '100%' }}>
                <InputTitle>Тип контрагента</InputTitle>
                <SelectAnchor

                
                  placeholder="Тип контрагента"
                  options={[
                    { label: 'Рекламодатель', value: 'Рекламодатель' },
                    {
                      label: 'Рекламное агентство',
                      value: 'Рекламное агентство',
                    },
                    { label: 'Поставщик', value: 'Поставщик' },
                  ]}
                />
              </div>
            </Column>
            <Column style={{ width: '45%' }}>
              <div style={{ width: '100%' }}>
                <InputTitle>Тип клиента</InputTitle>
                <InputAnchor
             
                  placeholder="Тип клиента"
                />
              </div>
            </Column>
          </Row>
          <Row>
            <Column style={{ width: '45%', marginBottom: '21px' }}>
              <div style={{ width: '100%' }}>
                <InputTitle>БИН компании</InputTitle>
                <InputAnchor
            
                  placeholder="Тип клиента"
                />
              </div>
            </Column>
          </Row>
        </form>
      </BlockBody>
    </Medium>
  );
}
