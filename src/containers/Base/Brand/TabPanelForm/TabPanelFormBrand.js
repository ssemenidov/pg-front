import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Button, Checkbox, Dropdown, Input, Menu, Divider } from 'antd';

import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { BlockTitle, Column, InputTitle, JobTitle, Medium } from '../../../../components/Styles/StyledBlocks';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import {
  Chip, DesignList, DesignListItem, DropdownBtn1,
  StyledButton, HeaderWrapper, HeaderTitleWrapper,
  StyledInput, StyledSelect
} from '../../../../components/Styles/DesignList/styles';
import useDebounce from '../../../../containers/Administration/components/useDebounce';

import searchInputIcon from "../../../../img/header-bar/search-icon.svg";
import printerIcon from "../../../../img/header-bar/printer.svg";
import exportIcon from "../../../../img/header-bar/export.svg";
import settingsIcon from "../../../../img/header-bar/settings.svg";
import chipIcon from "../../../../img/chip-icon.svg";
import owner from "../../../../img/input/owner.svg";
import suitcase from "../../../../img/input/suitcase.svg";
import deleteIcon from "../../../../img/outdoor_furniture/red_can.svg";
import collapseDown from "../../../../img/icon_dropdown_select.svg";
import hyperlink from "../../../../img/hyperlink.svg";
import designIcon from "../../../../img/brand/design-icon.png";

import { constructBrand } from '../Brand';

let settingmenu = (
  <Menu>
    <Menu.Item>
      <Checkbox>1 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>2 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>3 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>4 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>5 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>6 menu item</Checkbox>
    </Menu.Item>
  </Menu>
);
let tempDropdownList = (
  <Menu>
    <Menu.Item>
      1 menu item
    </Menu.Item>
    <Menu.Item>
      2 menu item
    </Menu.Item>
    <Menu.Item>
      3 menu item
    </Menu.Item>
    <Menu.Item>
      4 menu item
    </Menu.Item>
    <Menu.Item>
      5 menu item
    </Menu.Item>
    <Menu.Item>
      6 menu item
    </Menu.Item>
  </Menu>
);

const DESIGN_LIST = gql`
  query searchDesign {
    searchDesign {
      edges {
        node {
          id
          img
          isCurrent
          startedAt
          title
        }
      }
    }
  }
`;
const DELETE_DESIGN = gql`
  mutation deleteDesign($id: ID!) {
    deleteDesign(id: $id) {
      found
    }
  }
`;

const WORKING_SECTOR_LIST = gql`
 query searchWorkingSector {
  searchWorkingSector {
    edges {
      node {
        id
        title
      }
    }
  }
 }
`;
const SEARCH_PARTNER = gql`
  query searchPartner($title_Icontains: String) {
      searchPartner(title_Icontains: $title_Icontains) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
`;
const SAVE_BRAND = gql`
  mutation updateBrand(
      $id: ID!
      $title: String
      $workingSector: ID
      $partner: [ID]
    ) {
      updateBrand(
        id: $id
        input: {
          title: $title
          workingSector: $workingSector
          partner: $partner
        }
      ) {
        brand {
          id
        }
      }
    }
`;

const InnerForm = () => {
  const [item, setItem] = useContext(constructBrand);
  const [workingSectors, setWorkingSectors] = useState(null);

  const [designList, setDesignList] = useState(null);

  const [partnerValue, setPartnerValue] = useState(undefined);
  const [partnerData, setPartnerData] = useState([]);
  const [partnerSearchText, setPartnerSearchText] = useState('');
  const [partnerLoading, setPartnerLoading] = useState(false);

  const workingSectorResponse = useQuery(WORKING_SECTOR_LIST);
  const [saveDataBrand] = useMutation(SAVE_BRAND);
  const [getPartner, { loading, data }] = useLazyQuery(SEARCH_PARTNER);
  const designData = useQuery(DESIGN_LIST);
  const debouncedSearchTerm = useDebounce(partnerSearchText, 500);
  const [deleteDesign] = useMutation(DELETE_DESIGN);

  useMemo(() => {
    if(workingSectorResponse.data && workingSectorResponse.data.searchWorkingSector) {
      setWorkingSectors(workingSectorResponse.data.searchWorkingSector.edges)
    }
  }, [workingSectorResponse.data]);

  const handleSearchPartner = (value) => {
    setPartnerSearchText(value);
  };
  const handleChangePartner = (value) => {
    setPartnerValue(value);
  };

  useEffect(() => {
    getPartner({
      variables: {
        title_Icontains: debouncedSearchTerm
      }
    });
    setPartnerLoading(loading);
  }, [debouncedSearchTerm]);
  useMemo(() => {
    if(data && data.searchPartner.edges) {
      setPartnerData(data.searchPartner.edges);
      setPartnerLoading(loading);
    }
  }, [data]);

  useMemo(() => {
    const { data } = designData;
    const localDesignList = designData.data
      && designData.data.searchDesign
      && designData.data.searchDesign.edges.map(({ node }) => ({
      node: {
        ...node,
        isChecked: false
      }
    }));

    setDesignList(localDesignList);
  }, [designData.data]);

  const addPartnerToBrand = (e) => {
    e.preventDefault();

    if(partnerValue) {
      const localEdges = item.partner ? item.partner.edges : [];
      const partnerItem = partnerData.filter(item => item.node.id == partnerValue);

      if(localEdges.filter(item => item.node.id == partnerValue)[0]) {
        alert('Этот контрагент уже добавлен');
        return
      }

      localEdges.push({
        node: {
          id: partnerItem[0].node.id,
          title: partnerItem[0].node.title
        }
      });

      setItem({
        ...item,
        partner: {
          edges: localEdges
        }
      });
    }
  };
  const removePartnerFromBrand = (e, id) => {
    e.preventDefault();

    let localEdges = item.partner ? item.partner.edges : [];
    localEdges = localEdges.filter(item => item.node.id != id);

    setItem({
      ...item,
      partner: {
        edges: localEdges
      }
    });
  };
  const saveData = (e) => {
    e.preventDefault();

    if(!item.id) return;

    let partnerIdList = [];
    if(item.partner && item.partner.edges) {
      partnerIdList = item.partner.edges.map(item => item.node.id)
    }

    saveDataBrand({
      variables: {
        id: item.id && item.id,
        title: item.title && item.title,
        workingSector: item.workingSector && item.workingSector.id,
        partner: partnerIdList
      }
    });
  };

  const selectDesign = (index, isChecked) => {
    let localDesignList = designList;
    localDesignList[index].node.isChecked = isChecked.target.checked;

    setDesignList(localDesignList);
  };
  const deleteSide = (id) => {
    let localDesignList = designList.filter(({ node }) => node.id !== id);

    setDesignList(localDesignList);

    deleteDesign({ variables:{ id } });
  }

  return (
    <form style={{ width: '100%' }}>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Бренд - { item.title && item.title }</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <StyledButton
            backgroundColor="#008556"
            type="button"
            onClick={(e) => saveData(e)}
          >
            Сохранить
          </StyledButton>
          <StyledButton
            backgroundColor="#2C5DE5"
            type="button"
          >
            Выгрузить данные
          </StyledButton>
        </ButtonGroup>
      </HeaderWrapper>
      <div>
        <Grid fluid className="resetPadding" style={{ padding: 0 }}>
          <Row xs={12}>
            <Col xs={5}>
              <Medium>
                <BlockTitle>Редактирование информации</BlockTitle>
                <div className="block-edit-info" >
                  <Row>
                    <Column style={{ width: '45%', marginRight: '30px' }}>
                      <Row style={{ padding: '0' }}>
                        <div style={{ width: '100%' }}>
                          <InputTitle>Наименование</InputTitle>
                          <StyledInput
                            prefix={<img src={suitcase} />}
                            value={item.title ? item.title : ''}
                            onChange={(e) => {setItem({...item, title: e.target.value})}}
                          ></StyledInput>
                        </div>
                      </Row>
                    </Column>
                    <Column style={{ width: '45%', marginBottom: 'auto' }}>
                      <div style={{ width: '100%' }}>
                        <InputTitle>Сектор деятельности</InputTitle>
                        <StyledSelect
                          prefix={<img src={owner} />}
                          defaultValue={item.workingSector ? item.workingSector.id: ''}
                          loading={workingSectorResponse.loading}
                          onChange={(value) => setItem({
                            ...item,
                            workingSector: {
                              ...item.workingSector,
                              id: value
                            }
                          })}
                        >
                          {
                            workingSectors && workingSectors.map(({ node }) => (
                              <StyledSelect.Option
                                key={node.id}
                                value={node.id}
                              >
                                { node.title }
                              </StyledSelect.Option>
                            ))
                          }
                        </StyledSelect>
                      </div>
                    </Column>
                  </Row>
                  <Divider />
                  <Row style={{ paddingBottom: '15px' }}>
                    <Column style={{ width: '100%' }}>
                      <div style={{ width: '100%',  marginBottom: '5px', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div style={{ width: '80%' }}>
                          <InputTitle>Контрагенты</InputTitle>

                          <StyledSelect
                            showSearch
                            value={partnerValue}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={handleSearchPartner}
                            onChange={handleChangePartner}
                            notFoundContent={null}
                            loading={partnerLoading}
                          >
                            {
                              partnerData && partnerData.map(({ node }) => (
                                <StyledSelect.Option key={node.id} value={node.id}>
                                  { node.title ? node.title : 'Нет названия' }
                                </StyledSelect.Option>
                              ))
                            }
                          </StyledSelect>
                        </div>
                        <StyledButton
                          backgroundColor="#008556"
                          type="button"
                          onClick={addPartnerToBrand}
                        >
                          Добавить
                        </StyledButton>
                      </div>
                      <div style={{ width: '80%', display: 'flex', flexWrap: 'wrap' }}>
                        {
                          item.partner && item.partner.edges.map(({ node }) => (
                            <Chip key={node.id}>
                              <img
                                src={chipIcon}
                                alt="icon"
                                onClick={(e) => removePartnerFromBrand(e, node.id)}
                              />
                              <span>{ node.title }</span>
                            </Chip>
                          ))
                        }
                      </div>
                    </Column>
                  </Row>
                </div>
              </Medium>
              <style>
                {`
                  .block-edit-info .row {
                    margin: 0;
                    padding: 20px;
                  }
                  .block-edit-info .ant-divider-horizontal {
                    margin: 0;
                  }
                `}
              </style>
            </Col>
            <Col xs={7}>
              <div className="header-bar">
                <DropdownBtn1 className="dropdown-btn-1" style={{marginLeft: '17px'}}>
                  <img src={hyperlink} alt="dropdown logod" className="dropdown-btn-1__logo"/>
                  <h6 className="dropdown-btn-1__title">Архив дизайнов</h6>
                </DropdownBtn1>

                <div>
                  <Input
                    style={{ marginLeft: '20px' }}
                    placeholder="Быстрый поиск"
                    suffix="Найти"
                    prefix={<img src={searchInputIcon} />}
                  />
                  <Button style={{ marginLeft: '5px' }} className="header-btn">
                    <img src={printerIcon} />
                  </Button>
                  <Button
                    style={{ width: '180px', display: 'flex', justifyContent: 'space-between' }}
                    className="header-btn">
                    <img src={exportIcon} />
                    <span>Экспорт</span>
                  </Button>

                  <Dropdown
                    overlay={settingmenu}
                    className="header-btn"
                    trigger={['click']}
                    placement="bottomRight"
                  >
                    <Button style={{ marginLeft: '5px' }} className="header-btn">
                      <img src={settingsIcon} />
                    </Button>
                  </Dropdown>
                </div>
              </div>
              <style>
                {`.header-bar {
                display: flex;
                background: #E7EEF8;
                margin-bottom: 10px;
                border-radius: 4px;
                border: 1px solid #D3DFF0;
                height: 45px;
                padding: 5px;
                justify-content: space-between;
                align-items: center;
              }
              .header-bar > div {
                display: flex;
              }
              .header-bar > div > div {
                display: flex;
              }
              .header-btn {
                border: 1px solid #D3DFF0;
                margin-right: 5px;
                width: 32px;
                height: 32px;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .header-date-btn {
                display: flex;
                justify-content: space-between;
              }
              .header-date-btn span {
                color: #252525 !important;
              }
              .header-page-btn {
                background: #FF5800;
                display: flex;
                align-items: center;
                padding: 15px 30px;
              }
              .header-page-btn span {
                color: #fff !important;
                font-weight: 600;
              }
              `}
              </style>
              <DesignList className="design-list">
                {
                  designList && designList.map(({ node }, index) => (
                    <DesignListItem
                      key={node.id}
                      className={`design-list__item ${node.isCurrent ? 'current-design' : 'archive-design'}`}
                    >
                      <div className="design-list__item-b-image">
                        <img src={`/${node.img}`} alt="design icon" className="design-list__item-image"/>
                        <p className="design-list__item-label">
                          {
                            node.isCurrent
                            ? 'текущий дизайн'
                            : 'архив'
                          }
                        </p>
                      </div>
                      <h6 className="design-list__item-title">
                        <span>{ node.title }</span>
                      </h6>
                      <div className="design-list__item-footer">
                        <Checkbox
                          defaultValue={node.isChecked}
                          onChange={(e) => selectDesign(index, e)}
                        >
                          Выбрать
                        </Checkbox>
                        <div className="design-list__item-btn-group">
                          <Button className="design-list__item-btn">
                            <img src={printerIcon} />
                          </Button>
                          <Button
                            className="design-list__item-btn"
                            onClick={() => deleteSide(node.id)}
                          >
                            <img src={deleteIcon} />
                          </Button>
                        </div>
                      </div>
                    </DesignListItem>
                  ))
                }
              </DesignList>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default InnerForm;
