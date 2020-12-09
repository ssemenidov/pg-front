import React, { useContext, useEffect, useState } from 'react';
import { adverContext } from './AdvertisingParties';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import {
  FilterMenu280,
  SearchTitle,
  FilterText,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Collapse, Checkbox, DatePicker,Form } from 'antd';
import { StyledSelect } from '../../../components/Styles/DesignList/styles';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import anchorIcon from '../../../img/input/anchor.svg';
import cityIcon from '../../../img/input/city.svg';
import districtIcon from '../../../img/input/district.svg';
import phoneIcon from '../../../img/input/phone.svg';
import constructionIcon from '../../../img/input/construction.svg';
import arrowsIcon from '../../../img/input/arrows.svg';
import styled from 'styled-components';
import './styles_adv_part.scss'
import useDebounce from '../../Administration/components/useDebounce';

const { RangePicker } = DatePicker;

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
const FAMILY_T = gql`
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
const FORMAT_T = gql`
  query searchFormat($id: ID) {
    searchFormat(model_Underfamily_Family_Id: $id) {
        edges {
          node {
            id,
            title,
          }
        }
      }

  }
`;
const SIDE_T = gql`
  query searchSide($id: ID, $format: ID) {
    searchSide(format_Model_Underfamily_Family_Id: $id, format_Id: $format) {
        edges {
          node {
            id,
            title
          }
        }
      }

  }
`;
const SIZE_T = gql`
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

const SEARCH_PARTNER = gql`
  query searchPartner($title_Icontains: String) {
    searchPartner(isNonrtsOwner: true, title_Icontains: $title_Icontains) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

const StyledFormItemCheckbox = styled(Form.Item)`
    margin: 0;
    padding: 0;
`;

const FilterBar = ({refetch, ganttUpdater}) => {
  const [form] = Form.useForm();
  const {setFilter} = useContext(adverContext);


  const [partnerSearchText, setPartnerSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(partnerSearchText, 500);
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [partnerData, setPartnerData] = useState([]);
  const [partnerValue, setPartnerValue] = useState(undefined);

  const onFinish = (_values) => {
    let values = {..._values};
    let dstFilter = {}
    if (values && values.date && values.date.length === 2) {
      dstFilter.dateFrom = values.date[0].toDate()
      dstFilter.dateTo = values.date[1].toDate()
    }
    let anyNonfree = values.statusSaled || values.statusUnavailable || values.statusApproved || values.statusReserved;
    let onlyNonfree = !values.statusFree && !values.statusAll && (anyNonfree);
    if (onlyNonfree) {
      dstFilter.reservationType = [
        values.statusSaled && "Продано",
        values.statusUnavailable && "Недоступно",
        values.statusApproved && "Утверждено",
        values.statusReserved && "Забронировано"
      ].filter((v) => v)
      if (dstFilter.reservationType.length === 1)
        dstFilter.reservationType = dstFilter.reservationType[0];
      else if (dstFilter.reservationType.length > 1)
        dstFilter.reservationType = '(' + dstFilter.reservationType.join("|") + ')';
    }
    if (values.city)
      dstFilter.city = values.city
    if (values.family)
      dstFilter.family = values.family
    if (values.format)
      dstFilter.format = values.format
    if (values.side)
      dstFilter.side = values.side
    if (values.size)
      dstFilter.size = values.size
    if (values.statusConnection)
      dstFilter.statusConnection = values.statusConnection
    if (values.owner && values.owner != 'РТС')
      dstFilter.owner = values.owner

    values.dstFilter = dstFilter;
    setFilter(values);
    if (refetch)
      refetch();
    if (ganttUpdater)
      ganttUpdater(null);
    console.log('values ', values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const city = useQuery(CITY_T).data;
  const district = useQuery(DISTRICT_T).data;
  const family = useQuery(FAMILY_T).data;
  const format = useQuery(FORMAT_T).data;
  const size = useQuery(SIZE_T).data;
  const side = useQuery(SIDE_T).data;

  const [getPartner, { loading, data }] = useLazyQuery(SEARCH_PARTNER);

  useEffect(() => {
    getPartner({ variables: { title_Icontains: debouncedSearchTerm } });
    setPartnerLoading(loading);
  }, [debouncedSearchTerm, getPartner, loading]);

  useEffect(() => {
    if(data && data.searchPartner.edges) {
      let arr = [...data.searchPartner.edges];
      arr.sort((a,b) => a.node.title.localeCompare(b.node.title));
      setPartnerData([{ node: {title: "РТС", id: null}}, ...arr]);
      setPartnerLoading(loading);
    }
  }, [data, loading]);


  return (
    <FilterMenu280
      onKeyDown={(e) => {
        e.key === 'Enter' && alert('Фильтр');
      }}>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
      <Collapse expandIconPosition={'right'}>
        <StyledPanel header="По дате" key="1">
        <Form.Item name="date">
            <RangePicker placeholder={["Бронь С", "По"]} size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
        </Form.Item>
        </StyledPanel>
        <StyledPanel header="Статус брони" key="2">
          <StyledFormItemCheckbox name="statusFree" valuePropName="checked">
            <Checkbox defaultChecked>
              <div className="dot-1" style={{marginRight: ".8rem"}}></div>
              <span>Свободно</span>
            </Checkbox>
          </StyledFormItemCheckbox>
          <StyledFormItemCheckbox name="statusReserved" valuePropName="checked">
            <Checkbox defaultChecked>
              <div className="dot-2" style={{marginRight: ".8rem"}}></div>
              Забронировано
            </Checkbox>
          </StyledFormItemCheckbox>
          <StyledFormItemCheckbox name="statusApproved" valuePropName="checked">
            <Checkbox defaultChecked>
              <div className="dot-3" style={{marginRight: ".8rem"}}></div>
              Утверждено
            </Checkbox>
          </StyledFormItemCheckbox>
          <StyledFormItemCheckbox name="statusSaled" valuePropName="checked">
            <Checkbox defaultChecked>
              <div className="dot-4" style={{marginRight: ".8rem"}}></div>
              Продано
            </Checkbox>
          </StyledFormItemCheckbox>
          <StyledFormItemCheckbox name="statusUnavailable" valuePropName="checked">
            <Checkbox defaultChecked>
              <div className="dot-4 dot-unavailable" style={{marginRight: ".8rem"}}></div>
              Недоступно
            </Checkbox>
          </StyledFormItemCheckbox>
          <StyledFormItemCheckbox name="statusAll" valuePropName="checked">
            <Checkbox defaultChecked>
              <div className="dot-4 dot-all" style={{marginRight: ".8rem"}}></div>
              Все
            </Checkbox>
          </StyledFormItemCheckbox>
        </StyledPanel>
        <StyledPanel header="По городу" key="3">
        <Form.Item name="city">
          <StyledSelect
            showSearch placeholder={<><img src={cityIcon} alt={"Город"}/><span>Город</span> </>} size={'large'}>
            {city && city.searchCity.edges.map((item)=>
              <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                <img src={cityIcon} alt={item.node.title}/>
                <span>{item.node.title}</span>
              </StyledSelect.Option>
            )}
          </StyledSelect>
        </Form.Item>
        <Form.Item name="district">
          <StyledSelect placeholder={<><img src={districtIcon} alt={"Район"}/><span>Район</span> </>} size={'large'}>
          {district && district.searchDistrict.edges.map((item)=>
            <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                <img src={districtIcon} alt={item.node.title}/>
              <span>{item.node.title}</span>
              </StyledSelect.Option>
          )}
          </StyledSelect>
        </Form.Item>
        </StyledPanel>

        <StyledPanel header="По параметрам" key="4">
          <Form.Item name="family">
            <StyledSelect  placeholder={<><img src={ constructionIcon} alt={"Семейство"}/> <span>Семейство конструкции</span> </>} size={'large'}>
              {family && family.searchFamilyConstruction.edges.map((item)=>
              <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                <img src={anchorIcon} alt={item.node.title}/>
              <span>{item.node.title}</span>
              </StyledSelect.Option>
          )}
            </StyledSelect>
          </Form.Item>
          <Form.Item name="format">
            <StyledSelect  placeholder={<><img src={phoneIcon} alt={"Формат"}/> <span>Формат кострукции</span> </>} size={'large'}>
            {format && format.searchFormat.edges.filter((v, i, a) => a.findIndex(p => p.node.title === v.node.title) === i).map((item)=>
            <StyledSelect.Option key ={item.node.id} value={item.node.title}>
                <img src={anchorIcon} alt={item.node.title}/>
              <span>{item.node.title}</span>
              </StyledSelect.Option>
          )}
          </StyledSelect>
          </Form.Item>
          <Form.Item name="side">
            <StyledSelect  placeholder={<><img src={arrowsIcon} alt={"Сторона"}/> <span>Сторона кострукции</span> </>} size={'large'}>
              {side && side.searchSide.edges.filter((v, i, a) => a.findIndex(p => p.node.title === v.node.title) === i).map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.title}>
                  <img src={anchorIcon} alt={item.node.title}/>
                  <span>{item.node.title}</span>
                </StyledSelect.Option>
              )}
            </StyledSelect>
          </Form.Item>
          <Form.Item name="size">
            <StyledSelect
              placeholder={<><img src={arrowsIcon} alt={"Размер"}/> <span>Размер </span> </>} size={'large'}>
              {size && size.searchSideSize.sideSize.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.size}>
                  <img src={anchorIcon} alt={item.node.title}/>
                  <span>{item.node.size}</span>
                </StyledSelect.Option>
              )}
            </StyledSelect>
          </Form.Item>
          <Form.Item name={"owner"}>
            <StyledSelect
              placeholder={<><img src={arrowsIcon} alt={"Размер"}/> <span>Владелец </span> </>} size={'large'}>
              showSearch
              value={partnerValue}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={(value) => setPartnerSearchText(value)}
              onChange={(value) => setPartnerValue(value)}
              notFoundContent={null}
              loading={partnerLoading}
            >
              {
                partnerData && partnerData.map(({ node }) => (
                  <StyledSelect.Option key={node.id || "RTS"} value={node.title}>
                    { node.title ? node.title : 'Нет названия' }
                  </StyledSelect.Option>
                ))
              }
            </StyledSelect>
          </Form.Item>
          <StyledFormItemCheckbox name="statusConnection" valuePropName="checked">
            <Checkbox defaultChecked>Освещение</Checkbox>
          </StyledFormItemCheckbox>
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
    </FilterMenu280>
  );
};

export default FilterBar;
