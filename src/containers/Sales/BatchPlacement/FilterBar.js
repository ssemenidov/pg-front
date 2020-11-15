import React, { useState,useContext } from 'react';
import { batchContext } from './BatchPlacement';
import { useQuery, gql, useMutation } from '@apollo/client';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, Checkbox, DatePicker,Form } from 'antd';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import anchorIcon from '../../../img/input/anchor.svg';
import cityIcon from '../../../img/input/city.svg';
import districtIcon from '../../../img/input/district.svg';
import postIcon from '../../../img/input/post.svg';
const CITY_T = gql`
    {
      searchCity {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
const DISTRICT_T = gql`
{
  searchDistrict {
    edges {
      node {
        id
        title
      }
    }
  }
}
`;
  const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(batchContext);
  const onFinish = (values) => {
    setFilter(values);

    console.log('values ', values);
  };

  const onReset = () => {
    form.resetFields();
  };
  const city = useQuery(CITY_T).data;
  const district = useQuery(DISTRICT_T).data;
  return (
    <FilterMenu
      onKeyDown={(e) => {
        e.key === 'Enter' && alert('Фильтр');
      }}>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
        <Collapse expandIconPosition={'right'}>
          <StyledPanel header="По дате" key="1">
          <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>

          </StyledPanel>
          <StyledPanel header="Статус брони" key="2">
            <Checkbox defaultChecked>
              <div className="dot-1"></div>
              <span>Свободно</span>
            </Checkbox>
            <br />
            <Checkbox defaultChecked>
              <div className="dot-2"></div>
              Забронировано
            </Checkbox>
            <br />
            <Checkbox defaultChecked>
              <div className="dot-3"></div>
              Утверждено
            </Checkbox>
            <br />
            <Checkbox defaultChecked>
              <div className="dot-4"></div>
              Продано
            </Checkbox>
            <br />
            <Checkbox defaultChecked>
              <div className="dot-4"></div>
              Недоступно
            </Checkbox>
            <br />
            <Checkbox defaultChecked>
              <div className="dot-4"></div>
              Все
            </Checkbox>
          </StyledPanel>
          <StyledPanel header="По городу" key="3">
            <Form.Item name="city">
              <StyledSelect
                showSearch placeholder={<><img src={cityIcon} /><span>Город</span> </>} size={'large'}>
                {city && city.searchCity.edges.map((item)=>
                  <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                    <img src={cityIcon} />
                    <span>{item.node.title}</span>
                  </StyledSelect.Option>
                )}
              </StyledSelect>
            </Form.Item>
            <Form.Item name="district">
              <StyledSelect placeholder={<><img src={districtIcon} /><span>Район</span> </>} size={'large'}>
              {district && district.searchDistrict.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                    <img src={districtIcon} />
                  <span>{item.node.title}</span>
                  </StyledSelect.Option>
             )}
              </StyledSelect>
            </Form.Item>
          </StyledPanel>

          <StyledPanel header="По параметрам" key="4">
            <Form.Item name="package">
              <StyledSelect  placeholder={<><img src={anchorIcon} /> <span>Пакет</span> </>} size={'large'}>
                <StyledSelect.Option value="case 1"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
                <StyledSelect.Option value="case 2"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="sale_manager">
              <StyledSelect  placeholder={<><img src={anchorIcon} /> <span>Менеджер по продажам</span> </>} size={'large'}>
                <StyledSelect.Option value="case 1"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
                <StyledSelect.Option value="case 2"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="back_manager">
              <StyledSelect placeholder={<><img src={anchorIcon} /> <span>Менеджер бэк-офиса</span> </>} size={'large'}>
                <StyledSelect.Option value="case 1"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
                <StyledSelect.Option value="case 2"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="brand">
              <StyledSelect  placeholder={<><img src={anchorIcon} /> <span>Бренд</span> </>} size={'large'}>
                <StyledSelect.Option value="case 1"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
                <StyledSelect.Option value="case 2"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton htmlType="submit">Поиск</SubmitButton>
          <ResetButton onClick={onReset}>Очистить</ResetButton>
        </BtnGroup>
      </Form>
      <style>
        {`
        .ant-collapse-content{
           background-color: #f5f7fa !important;
        }
        `}
      </style>
    </FilterMenu>
  );
};

export default FilterBar;
