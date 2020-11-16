import React, { useState } from 'react';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledSelect,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import DistrictPaint from './Districts'
import FormatPaint from './Formats'
import SidePaint from './Sides'
import { gql, useQuery } from '@apollo/client';
import { Select, Collapse, Checkbox, DatePicker } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
const { Option } = Select;
const { Panel } = Collapse;
const SEARCHCITY = gql`
  query searchCity {
      searchCity {
        edges {
          node {
            id,
            title,
          }
        }
      }

  }
`;
const SEARCHFAMILYCONSTRUCTION = gql`
  query searchFamilyConstruction {
      searchFamilyConstruction {
        edges {
          node {
            id,
            title,
          }
        }
      }

  }
`;
const SEARCHSIDESIZE = gql`
  query searchSideSize {
    searchSideSize{
      sideSize {
        edges {
          node {
            id,
            size
          }
        }
      }
    }
  }
`;


const FilterBar = () => {
    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [family, setFamily] = useState();
    const [format, setFormat] = useState();
    const [side, setSide] = useState();
    const [size, setSize] = useState();

    const cityes = useQuery(SEARCHCITY).data,
          familyes = useQuery(SEARCHFAMILYCONSTRUCTION).data,
          sizes = useQuery(SEARCHSIDESIZE).data
  const handleChangeCity = value => {
    setCity(value)
    setDistrict(undefined)
  };
  const handleFamiliys = value => {
    setFamily(value)
    setFormat(undefined)
    setSide(undefined)
  };
  const handleFormat = value => {
    setFormat(value)
    setSide(undefined)
    console.log(family)
    console.log(value)
  };
  const handleSide = value => {
    setSide(value)
  };
  
  const handleDistrict = value => {
    setDistrict(value)
  };
  const handleSize = value => {
    setSize(value)
  };


  return (
    <FilterMenu
      onKeyDown={(e) => {
        e.key === 'Enter' && alert('Фильтр');
      }}>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Collapse expandIconPosition={'right'}>
        <StyledPanel header="По дате" key="1">
          <DatePicker placeholder="2020-01-01" style={{ width: '100%' }} />
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
            <div className="dot-5"></div>
            Недоступно
          </Checkbox>
          <br />
          <Checkbox defaultChecked>
            <div className="dot-4"></div>
            Все
          </Checkbox>
        </StyledPanel>
        <StyledPanel header="По городу" key="3">
          <StyledSelect defaultValue="Выберите город" size={'large'} onChange={handleChangeCity}>
            {
              cityes ? 
              cityes.searchCity.edges.map(x =>
                <Option key={x.node.id} value={x.node.id}>{x.node.title}</Option>    
              )
              : ''
            }
          </StyledSelect>
          <DistrictPaint onSelect={e => handleDistrict(e)} id={city} />
          
        </StyledPanel>

        <StyledPanel header="По параметрам" key="4">
          <StyledSelect defaultValue="Семейство конструкции" size={'large'} onChange={handleFamiliys}>
            {
              familyes ? 
              familyes.searchFamilyConstruction.edges.map(x =>
                <Option value={x.node.id}>{x.node.title}</Option>    
              )
              : ''
            }
          </StyledSelect>
          <FormatPaint onSelect={e => handleFormat(e)} id={family} />
          <SidePaint onSelect={e => handleSide(e)} id={family} format={format} />
       
          <Checkbox defaultChecked>Освещение</Checkbox>
        </StyledPanel>
        <StyledPanel header="Размер" key="5">
          <StyledSelect defaultValue="Размер" size={'large'} onChange={handleSize}>
            {
              sizes ? 
              sizes.searchSideSize.sideSize.edges.map(x =>
                <Option value={x.node.id}>{x.node.size}</Option>    
              )
              : ''
            }
          </StyledSelect>

        </StyledPanel>
      </Collapse>
      <BtnGroup>
        <SubmitButton onClick={() => alert('Фильтр')}>Поиск</SubmitButton>
        <ResetButton>Очистить</ResetButton>
      </BtnGroup>
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
