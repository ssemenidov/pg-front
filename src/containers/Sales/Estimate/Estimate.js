import React, { useState } from 'react';
import { Input, Checkbox, Modal, Form, DatePicker, InputNumber, Select } from 'antd';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import AddBtn from '../../../components/LeftBar/AddBtn';
import styled from 'styled-components';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { useParams } from 'react-router-dom';

import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';

import PanelDesign from './PanelEstimate';
import SidebarInfo from '../../../components/SidebarInfo';

import { sidebarInfoData } from '../stubDataSource';
import { gql, useMutation, useQuery } from '@apollo/client';
// import Form from 'antd/lib/form/Form';

const Estimate = () => {
  const { id, appId } = useParams();
  const [block, setBlock] = useState(0);
  const [showAddCost, setShowAddCost] = useState(false);
  const [showAddNonRts, setShowAddNonRts] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [created, setCreated] = useState(false);
  const [cities, setCities] = useState({
    data: [],
    loaded: false,
  });
  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/estimate', value: 'Смета' },
  ];
  const { Option } = Select;
  const [AdditionalCostsForm] = Form.useForm();
  const [NonRtsForm] = Form.useForm();

  const CREATE_ADDITIONAL_COSTS = gql`
    mutation createAdditionalCost($input: CreateAdditionalCostsInput!) {
      createSalesAdditionalCost(input: $input) {
        additionalCosts {
          id
          title
          startPeriod
          endPeriod
          count
          discount
          price
          count
          city {
            title
          }
        }
      }
    }
  `;

  const CREATE_NON_RTS_COSTS = gql`
    mutation addNonRts($input: CreateEstimateNonRtsInput!) {
      createSalesNonrts(input: $input) {
        estimateNonRts {
          id
          title
          count
          incomingTax
          incomingRent
          incomingPrinting
          incomingInstallation
          incomingManufacturing
          summaClient
          city {
            title
          }
        }
      }
    }
  `;

  const [createAdditionalCost] = useMutation(CREATE_ADDITIONAL_COSTS);
  const [createNonRtsCost] = useMutation(CREATE_NON_RTS_COSTS);

  const CITIES_QUERY = gql`
    query {
      searchCity {
        edges {
          node {
            title
            id
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(CITIES_QUERY);

  if (data && !cities.loaded && (showAddNonRts || showAddCost || openEditModal)) {
    setCities({
      data: data.searchCity.edges.map((city) => {
        return {
          id: city.node.id,
          title: city.node.title,
        };
      }),
      loaded: true,
    });
  }

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
        <CreateBtn text="Добавить бронь" />
        <PackageBtn text="Добавить пакет" />
        <EditBtn text="Перейти в монтажи" />
        <PaperBtn text="Сводка проекта" />
        <BoxBtn text="Архив дизайнов" />

        {block !== 0 && (
          <AddBtn
            text="Добавить расход"
            onClick={() => {
              switch (block) {
                case 1:
                  setShowAddCost(true);
                  break;
                case 2:
                  setShowAddNonRts(true);
                  break;
                default:
                  console.log('error');
              }
            }}
          />
        )}
      </LeftBar>

      <div style={{ width: '100%', overflow: 'hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Смета - CocaCola</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            {block !== 0 && !appId ? (
              <>
                <StyledButton
                  backgroundColor="#008556"
                  onClick={() => {
                    switch (block) {
                      case 1:
                        setShowAddCost(true);
                        break;
                      case 2:
                        setShowAddNonRts(true);
                        break;
                      default:
                        console.log('error');
                    }
                  }}>
                  Добавить расход
                </StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
              </>
            ) : (
              <>
                <StyledButton backgroundColor="#008556"> Создать приложение </StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Добавить в приложение </StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
              </>
            )}
          </ButtonGroup>
        </HeaderWrapper>
        <div style={{ display: 'flex' }}>
          <InfoWrap>
            <ControlToolbar style={{ fontWeight: '600' }}>
              <span>Посчитать с НДС?</span>
              <Checkbox>Да</Checkbox>
            </ControlToolbar>
            <SidebarInfo data={sidebarInfoData} />
          </InfoWrap>
          <PanelDesign
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            setBlock={setBlock}
            created={created}
            setCreated={setCreated}
            cities={cities}
          />
        </div>
        <Modal
          width="350px"
          visible={showAddCost}
          onCancel={() => {
            setShowAddCost(false);
            AdditionalCostsForm.resetFields();
          }}
          title="Добавление расхода"
          centered={true}
          confirmLoading={confirmLoading}
          onOk={() => {
            AdditionalCostsForm.validateFields().then((values) => {
              setConfirmLoading(true);
              const price = values.price;
              const discount = Number(values.discount);
              const count = Number(values.count);
              const priceAfterDiscount = (Number(values.price) * (100 - Number(values.discount))) / 100;
              const summa = priceAfterDiscount * count;
              createAdditionalCost({
                variables: {
                  input: {
                    title: values.title,
                    count: values.count,
                    startPeriod: new Date(values.period[0]).toJSON(),
                    endPeriod: new Date(values.period[1]).toJSON(),
                    discount: discount,
                    price: price,
                    city: values.city,
                    project: id,
                    sumAfterDiscount: priceAfterDiscount,
                    summa: summa,
                  },
                },
              })
                .then((val) => {
                  setConfirmLoading(false);
                  setShowAddCost(false);
                  AdditionalCostsForm.resetFields();
                  setCreated(true);
                })
                .catch((err) => {
                  console.log(err);
                  setShowAddCost(false);
                  AdditionalCostsForm.resetFields();
                  setConfirmLoading(false);
                });
            });
          }}>
          <Form
            form={AdditionalCostsForm}
            onCancel={() => {
              AdditionalCostsForm.resetFields();
            }}>
            <Form.Item name="title" rules={[{ required: true, message: 'Пожалуйста, введите наименование услуги.' }]}>
              <Input size="large" placeholder="Наименование услуги" />
            </Form.Item>
            <Form.Item name="city" rules={[{ required: true, message: 'Пожалуйста, выберите город.' }]}>
              <Select size="large" placeholder="Город" loading={loading}>
                {cities.data.map((city) => {
                  return (
                    <Option key={city.id} value={city.id}>
                      {city.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="period" rules={[{ required: true, message: 'Пожалуйста, выберите период.' }]}>
              <DatePicker.RangePicker size="large" />
            </Form.Item>
            <Form.Item name="count" rules={[{ required: true, message: 'Пожалуйста, введите количество.' }]}>
              <InputNumber
                size="large"
                style={{
                  width: 301,
                }}
                min={1}
                placeholder="Количество"
              />
            </Form.Item>
            <Form.Item name="price" rules={[{ required: true, message: 'Пожалуйста, введите цену.' }]}>
              <InputNumber
                style={{
                  width: 301,
                }}
                precision={2}
                width="301px"
                size="large"
                placeholder="Цена"
              />
            </Form.Item>
            <Form.Item name="discount" rules={[{ required: true, message: 'Пожалуйста, введите скидку.' }]}>
              <InputNumber
                style={{
                  width: 301,
                }}
                width="301px"
                size="large"
                placeholder="Скидка"
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          width="350px"
          visible={showAddNonRts}
          onCancel={() => {
            setShowAddNonRts(false);
            NonRtsForm.resetFields();
          }}
          title="Добавление расхода"
          centered={true}
          confirmLoading={confirmLoading}
          onOk={() => {
            NonRtsForm.validateFields().then((values) => {
              setConfirmLoading(true);
              const summ = values.count * values.rent + values.tax + values.print + values.mount + values.addCosts;
              createNonRtsCost({
                variables: {
                  input: {
                    title: values.title,
                    count: values.count,
                    incomingTax: 45,
                    incomingRent: values.rent,
                    incomingPrinting: values.print,
                    incomingInstallation: values.mount,
                    incomingManufacturing: values.addCosts,
                    city: values.city,
                    project: id,
                    summaClient: summ,
                  },
                },
              })
                .then((val) => {
                  setConfirmLoading(false);
                  setShowAddNonRts(false);
                  NonRtsForm.resetFields();
                  setCreated(true);
                })
                .catch((err) => {
                  console.log(err);
                  setShowAddNonRts(false);
                  NonRtsForm.resetFields();
                  setConfirmLoading(false);
                });
            });
          }}>
          <Form
            form={NonRtsForm}
            onCancel={() => {
              NonRtsForm.resetFields();
            }}>
            <Form.Item name="title" rules={[{ required: true, message: 'Пожалуйста, введите тип.' }]}>
              <Input size="large" placeholder="Тип" />
            </Form.Item>
            <Form.Item name="city" rules={[{ required: true, message: 'Пожалуйста, выберите город.' }]}>
              <Select size="large" placeholder="Город" loading={loading}>
                {cities.data.map((city) => {
                  return (
                    <Option key={city.id} value={city.id}>
                      {city.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="count" rules={[{ required: true, message: 'Пожалуйста, введите количество.' }]}>
              <InputNumber
                size="large"
                style={{
                  width: 301,
                }}
                min={1}
                placeholder="Количество"
              />
            </Form.Item>
            <Form.Item name="rent" rules={[{ required: true, message: 'Пожалуйста, введите стоимость аренды.' }]}>
              <InputNumber
                style={{
                  width: 301,
                }}
                precision={2}
                width="301px"
                size="large"
                placeholder="Аренда"
              />
            </Form.Item>
            <Form.Item name="tax" rules={[{ required: true, message: 'Пожалуйста, введите налог.' }]}>
              <InputNumber
                style={{
                  width: 301,
                }}
                width="301px"
                size="large"
                placeholder="Налог"
              />
            </Form.Item>
            <Form.Item name="print" rules={[{ required: true, message: 'Пожалуйста, введите стоимсость печати.' }]}>
              <InputNumber
                style={{
                  width: 301,
                }}
                width="301px"
                size="large"
                placeholder="Печать"
              />
            </Form.Item>
            <Form.Item name="mount" rules={[{ required: true, message: 'Пожалуйста, введите стоимость монтажа.' }]}>
              <InputNumber
                style={{
                  width: 301,
                }}
                width="301px"
                size="large"
                placeholder="Монтаж"
              />
            </Form.Item>
            <Form.Item name="addCosts" rules={[{ required: true, message: 'Пожалуйста, введите доп. расходы.' }]}>
              <InputNumber
                style={{
                  width: 301,
                }}
                width="301px"
                size="large"
                placeholder="Доп. расходы"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <style>
        {`
          .left-bar {
            margin: 0 2vw 0 0;
          }
        `}
      </style>
    </div>
  );
};

export default Estimate;
const InfoWrap = styled.div`
  margin: 0 2vw 0 0;
`;
const InfoList = styled.ul`
  border-radius: 8px;
  border: 1px solid #d3dff0;
  height: 100%;
  padding: 4.5%;
  flex: 0 1 auto;
  margin: 0 2vw 0 0;
  max-width: 320px;
  box-sizing: border-box;
  width: 40vw;
`;
const InfoItem = styled.li`
  margin: 4% 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d3dff0;
`;
const InfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;
const InfoLine = styled.div`
  margin: 4% 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;
const InfoValue = styled.span`
  font-weight: 600;
  text-align: right;
`;
const InfoInput = styled(Input)`
  font-weight: 600;

  margin-left: auto;
  width: 150px;
`;
