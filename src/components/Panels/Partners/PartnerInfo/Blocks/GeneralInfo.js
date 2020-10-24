import React, { useContext } from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';
import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../../styles/styles';


import { BlockBody, Medium, Row, Column, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import anchorIcon from '../../../../../img/input/anchor.svg';
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
                  <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.title ? item.title : ''}
              onChange={(e) => setItem({ ...item, title: e.target.value })}></StyledInput>
                </div>
              </Row>
              <Row style={{ paddingBottom: '0' }}>
                <div style={{ width: '100%' }}>
                  <InputTitle>Сектор деятельности</InputTitle>
                  <StyledSelect
                    defaultValue={item.workingSector && item.workingSector.id }
                    onChange={(value) => setItem({ ...item, workingSector: { ...item.workingSector, id: value } })}>
                    <StyledSelect.Option value="V29ya2luZ1NlY3Rvck5vZGU6MQ==">Сектор1</StyledSelect.Option>
                  </StyledSelect>
                </div>
              </Row>
            </Column>
            <Column style={{ width: '45%', marginBottom: 'auto' }}>
              <InputTitle>Комментарий</InputTitle>
              <StyledInput.TextArea rows={2}
              value={item.comment ? item.comment :""}
              onChange={(e) => {setItem({...item, comment:e.target.value})}}
              size={'large'}
            />
            </Column>
          </Row>

          <Row>
            <Column style={{ width: '45%' }}>
              <div style={{ width: '100%' }}>
                <InputTitle>Тип контрагента</InputTitle>
                <StyledSelect
                    defaultValue={item.partnerType && item.partnerType.id }
                    onChange={(value) => setItem({ ...item, partnerType: { ...item.partnerType, id: value } })}
                >
                    <StyledSelect.Option value="UGFydG5lclR5cGVOb2RlOjE=">Тип1</StyledSelect.Option>
                  </StyledSelect>

              </div>
            </Column>
            <Column style={{ width: '45%' }}>
              <div style={{ width: '100%' }}>
                <InputTitle>Тип клиента</InputTitle>
                <StyledSelect
                    defaultValue={item.clientType && item.clientType.id }
                    onChange={(value) => setItem({ ...item, clientType: { ...item.clientType, id: value } })}>
                    <StyledSelect.Option value="Q2xpZW50VHlwZU5vZGU6MQ==">Тип1</StyledSelect.Option>
                  </StyledSelect>
              </div>
            </Column>
          </Row>
          <Row>
            <Column style={{ width: '45%', marginBottom: '21px' }}>
              <div style={{ width: '100%' }}>
                <InputTitle>БИН компании</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.binNumber ? item.binNumber : ''}
              onChange={(e) => setItem({ ...item, binNumber: e.target.value })}></StyledInput>
              </div>
            </Column>
          </Row>
        </form>
      </BlockBody>
    </Medium>
  );
}
