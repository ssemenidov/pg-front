import React from 'react';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import DatePicker from '../../../../Inputs/DatePicker';
import Multiline from '../../../../Inputs/Multiline';
import { getConstructionProps } from '../../../../../store/actions/constructionActions';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import input_city from '../../../../../img/input_city.svg';

export default function Intro() {
  const current = useSelector((state) => state.construction.currentConstruction);
  const dispatch = useDispatch();
  return (
    <Medium>
      <BlockTitle>Общая информация</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Город</InputTitle>
            {/* <InputAnchor
              value={current.city || ''}
              placeholder="Город"
              onChange={(e) => dispatch(getConstructionProps('city', e.target.value))}
            /> */}
            <Select
              defaultValue={
                <>
                  <img src={input_city} />
                  <span>Город</span>
                </>
              }
              suffixIcon={null}
              className="ant-select">
              <Select.Option value="Option1">Выбор 1</Select.Option>
              <Select.Option value="Option2">Выбор 2</Select.Option>
            </Select>
          </div>
          <div style={{ width: '35%' }}>
            <InputTitle>Район</InputTitle>
            {/* <InputAnchor
              value={current.district || ''}
              placeholder="Район"
              onChange={(e) => dispatch(getConstructionProps('district', e.target.value))}
            /> */}
            <Select
              defaultValue={
                <>
                  <img src={input_city} />
                  <span>Район</span>
                </>
              }
              suffixIcon={null}
              className="ant-select">
              <Select.Option value="Option1">Выбор 1</Select.Option>
              <Select.Option value="Option2">Выбор 2</Select.Option>
            </Select>
          </div>
          <div style={{ width: '22%' }}>
            <InputTitle>Почтовый индекс</InputTitle>
            {/* <InputAnchor
              value={current.postalCode || ''}
              placeholder="Индекс"
              onChange={(e) => dispatch(getConstructionProps('postalCode', e.target.value))}
            /> */}
            <Select
              defaultValue={
                <>
                  <img src={input_city} />
                  <span>Индекс</span>
                </>
              }
              className="ant-select">
              <Select.Option value="Option1">Выбор 1</Select.Option>
              <Select.Option value="Option2">Выбор 2</Select.Option>
            </Select>
          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Владелец</InputTitle>
            {/*<InputAnchor
              value={current.owner || ''}
              placeholder="Владелец"
              onChange={(e) => dispatch(getConstructionProps('owner', e.target.value))}
            /> */}
            <Select
              defaultValue={
                <>
                  <img src={input_city} />
                  <span>Владелец</span>
                </>
              }
              className="ant-select">
              <Select.Option value="Option1">Выбор 1</Select.Option>
              <Select.Option value="Option2">Выбор 2</Select.Option>
            </Select>
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Маркетинговый адрес</InputTitle>
            <InputAnchor
              value={current.marketingAddress || ''}
              placeholder="Маркетинговый адрес"
              onChange={(e) => dispatch(getConstructionProps('marketingAddress', e.target.value))}
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Дата создания</InputTitle>
            <DatePicker
              value={current.dateOfCreation || new Date()}
              onChange={(e) => {
                dispatch(getConstructionProps('dateOfCreation', e.toString()));
              }}
            />
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Комментарий</InputTitle>
            <Multiline
              value={current.generalComment || ''}
              onChange={(e) => dispatch(getConstructionProps('generalComment', e.target.value))}
            />
          </div>
        </Row>
      </BlockBody>
      <style>{`
        .ant-select {
          display: flex;
          align-items: center;
        }
        .ant-select > div {
          height: 40px !important;
        }
        // .ant-select > span {
        //   display: none;
        // }
        .ant-select > div > span {
          display: flex;
          align-items: center;
        }
      `}</style>
    </Medium>
  );
}
