import React, { useContext } from 'react';
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

const InnerForm = (props) => {
  const [item, setItem] = useContext(constructBrand);

  return (
    <form style={{ width: '100%' }}>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Бренд - CocaCola</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <StyledButton backgroundColor="#008556">
            Сохранить
          </StyledButton>
          <StyledButton backgroundColor="#2C5DE5">
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
                            defaultValue="CocaCola"
                          ></StyledInput>
                        </div>
                      </Row>
                    </Column>
                    <Column style={{ width: '45%', marginBottom: 'auto' }}>
                      <div style={{ width: '100%' }}>
                        <InputTitle>Сектор деятельности</InputTitle>
                        <StyledSelect
                          prefix={<img src={owner} />}
                          defaultValue="Безалкогольные напинки"
                        >
                          <StyledSelect.Option
                            value="Безалкогольные напинки"
                          >
                            Безалкогольные напинки
                          </StyledSelect.Option>
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
                          <StyledInput
                            prefix={<img src={owner} />}
                            defaultValue="Контрагент 4"
                          ></StyledInput>
                        </div>
                        <StyledButton backgroundColor="#008556">
                          Добавить
                        </StyledButton>
                      </div>
                      <div style={{ width: '80%', display: 'flex', flexWrap: 'wrap' }}>
                        <Chip >
                          <img src={chipIcon} alt="icon"/>
                          <span>Контрагент 1</span>
                        </Chip>
                        <Chip >
                          <img src={chipIcon} alt="icon"/>
                          <span>Контрагент 2</span>
                        </Chip>
                        <Chip >
                          <img src={chipIcon} alt="icon"/>
                          <span>Контрагент 3</span>
                        </Chip>
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
                <Dropdown
                  overlay={tempDropdownList}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <DropdownBtn1 className="dropdown-btn-1" style={{marginLeft: '17px'}}>
                    <img src={hyperlink} alt="dropdown logod" className="dropdown-btn-1__logo"/>
                    <h6 className="dropdown-btn-1__title">Архив дизайнов</h6>
                    <img src={collapseDown} className="dropdown-btn-1__arrow" alt=""/>
                  </DropdownBtn1>
                </Dropdown>
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
                <DesignListItem className="design-list__item current-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item archive-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item current-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item archive-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item current-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item archive-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item current-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item archive-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item current-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item archive-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item current-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
                <DesignListItem className="design-list__item archive-design">
                  <div className="design-list__item-b-image">
                    <img src={designIcon} alt="design icon" className="design-list__item-image"/>
                    <p className="design-list__item-label">
                      текущий дизайн
                    </p>
                  </div>
                  <h6 className="design-list__item-title">
                    <span>Название дизайна</span>
                  </h6>
                  <div className="design-list__item-footer">
                    <Checkbox>Выбрать</Checkbox>
                    <div className="design-list__item-btn-group">
                      <Button className="design-list__item-btn">
                        <img src={printerIcon} />
                      </Button>
                      <Button className="design-list__item-btn">
                        <img src={deleteIcon} />
                      </Button>
                    </div>
                  </div>
                </DesignListItem>
              </DesignList>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default InnerForm;
