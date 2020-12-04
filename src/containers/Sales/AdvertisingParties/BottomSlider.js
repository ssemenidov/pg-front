import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Checkbox, DatePicker, Form } from 'antd';
import useDebounce from '../../Administration/components/useDebounce';
import date from '../../../img/left-bar/filter/date.svg';
import inputIcon from '../../../img/sales/projectNameInput.svg';
import { SubmitButton } from '../../../components/Styles/ButtonStyles';
import { SlidingBottomPanel } from '../../../components/SlidingBottomPanel/SlidingBottomPanel';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import { SliderCellColRaw, SliderRow } from '../../../components/SlidingBottomPanel/PanelComponents';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { StyledSelect } from '../../../components/Styles/DesignList/styles';

const InputIconSpanSyled = styled.span`
  position: absolute;
  transform: translate(55%, 30%);
  z-index: 99;
`;

const InputIcon = ({ img, alt }) => {
  return (
    <InputIconSpanSyled>
      <img src={img} alt={alt} />
    </InputIconSpanSyled>
  );
};

// TODO: Сделать подстановку количества броней крансым
// {/*<span*/}
// {/*  style={{*/}
// {/*    color: '#D42D11',*/}
// {/*    fontWeight: 'bold',*/}
// {/*  }}>*/}
// {/*    (24 шт.)*/}
// {/*  </span>*/}


// Ок
const DateStateText = styled.p`
  color: #2c5de5;
  fontsize: 14px;
  fontweight: bold;
  margin: 0;
`;

const ReservationSilderFormItem = styled(Form.Item)`
  display: flex;
  flexdirection: column;
  maxwidth: 300px;
  width: 100%;
`;

const ReservationSilderCheckboxesFormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column;
  max-width: 220px;
  width: 100%;
  min-width: 220px;
`;

const ReservationSliderSubmitButton = styled(SubmitButton)`
  margin-top: 2.5rem;
  margin-left: 2rem;
  fontweight: bold;
`;

export function ReservationSlider({ sliderState }) {
  // const addItem = (values) => {
  //   let parent = sliderState.caller.parent;
  //   let cb = (result) => sliderState.caller.showCRUDMessageAndRefetch(result, "Добавление");
  //   if (parent) {
  //     sliderState.caller.src.apiAdd({
  //       id: parent.selected.key,
  //       title: values.name
  //     }, cb)
  //   }
  //   else {
  //     sliderState.caller.src.apiAdd({ title: values.name }, cb)
  //   }
  // };
  const [projectSearchText, setProjectSearchText] = useState('');
  const [projectLoading, setProjectLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(projectSearchText, 500);
  const [projectData, setProjectData] = useState([]);
  const [projectValue, setProjectValue] = useState(undefined);
  const [resTypes, setResTypes] = useState([]);

  const PROJECTS_QUERY = gql`
    query searchProjects($title_Icontains: String) {
      searchProject(title_Icontains: $title_Icontains) {
        edges {
          node {
            title
            id
            agencyCommission {
              percent
              value
            }
            projectAttachments {
              edges {
                node {
                  id
                }
              }
            }
            additionalCostsNonrts {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  const RESERVATION_TYPE_QUERY = gql`
    {
      searchReservationType {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;

  const [getProject, { loading, data }] = useLazyQuery(PROJECTS_QUERY);
  const loadResTypes = useQuery(RESERVATION_TYPE_QUERY);
  const handleSearchProject = (value) => {
    setProjectSearchText(value);
  };
  const handleChangeProject = (value) => {
    setProjectValue(value);
  };

  if (loadResTypes.data && !resTypes.length) {
    setResTypes(loadResTypes.data.searchReservationType.edges);
  }

  useEffect(() => {
    getProject({
      variables: {
        title_Icontains: debouncedSearchTerm,
      },
    });
    setProjectLoading(loading);
  }, [debouncedSearchTerm, getProject, loading]);

  useMemo(() => {
    if (data && data.searchProject.edges) {
      setProjectData(data.searchProject.edges);
      setProjectLoading(loading);
    }
  }, [data, loading]);

  return (
    <SlidingBottomPanel
      title={`Быстрая бронь ${sliderState.title[0]}`}
      onClose={sliderState.closeAdd}
      classNameSuffix={'loca'}
      sliderClass="advertising-part-slider">
      <CRUDForm
        onFinish={(values) => {
          console.log(values);
        }}>
        <SliderRow>
          <SliderCellColRaw {...{ xxl: 8, xl: 10, xs: 10 }}>
            <div
              style={{
                display: 'flex',
              }}>
              <p
                className="formItem-title"
                style={{
                  width: '50%',
                }}>
                Дата начала
              </p>
              <p className="formItem-title">Дата оканчания</p>
            </div>
            <InputIcon img={date} alt="date icon" />
            <ReservationSilderFormItem name="startDate">
              <DatePicker.RangePicker
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                className="date-picker"
                suffixIcon={<DateStateText>Ок</DateStateText>}
                size={'large'}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
              />
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{ xxl: 4, xl: 4, xs: 7 }}>
            <p className="formItem-title">Проект</p>
            <InputIcon img={inputIcon} alt="input icon" />
            <ReservationSilderFormItem name="projectName">
              <StyledSelect
                showSearch
                showArrow={false}
                filterOption={false}
                size="large"
                // notFoundContent={null}
                className="projectSearchInput"
                placeholder="Название проекта"
                value={projectValue}
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                onSearch={handleSearchProject}
                onChange={handleChangeProject}
                loading={projectLoading}>
                {projectData &&
                  projectData.map(({ node }) => (
                    <StyledSelect.Option key={node.id} value={node.id}>
                      {node.title ? node.title : 'Нет названия'}
                    </StyledSelect.Option>
                  ))}
              </StyledSelect>
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{ xxl: 4, xl: 4, xs: 7 }}>
            <p className="formItem-title">Статус бронирования</p>
            <ReservationSilderFormItem name="reservationType">
              <StyledSelect
                filterOption={false}
                size="large"
                // notFoundContent={null}
                placeholder="Выберите статус бронирования"
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}>
                {resTypes.length &&
                  resTypes.map(({ node }) => (
                    <StyledSelect.Option key={node.id} value={node.id}>
                      {node.title ? node.title : 'Нет названия'}
                    </StyledSelect.Option>
                  ))}
              </StyledSelect>
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{ xxl: 2, xl: 3, xs: 3 }}>
            <p className="formItem-title">Дополнительно</p>
            <ReservationSilderCheckboxesFormItem name="additional">
              <Checkbox checked>Брендирование</Checkbox>
            </ReservationSilderCheckboxesFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{ xxl: 2, xs: 1 }}>
            <ReservationSliderSubmitButton type="primary">Забронировать</ReservationSliderSubmitButton>
          </SliderCellColRaw>
        </SliderRow>
      </CRUDForm>
      <style>
        {`
        .projectSearchInput input {
          padding-left: 23px !important;
        }
        .projectSearchInput .ant-select-selection-placeholder {
          padding-left: 23px !important;
        }

        .projectSearchInput .ant-select-selection-item {
          padding-left: 23px !important;
        }
        `}
      </style>
    </SlidingBottomPanel>
  );
}
