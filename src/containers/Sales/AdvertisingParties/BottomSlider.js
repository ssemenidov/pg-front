import React from 'react';
import styled from 'styled-components';
import { Card, Checkbox, DatePicker, Form, Input } from 'antd';
import { ReactComponent as CloseIcon } from '../../../img/sales/closeIcon.svg';
import date from '../../../img/left-bar/filter/date.svg';
import inputIcon from '../../../img/sales/projectNameInput.svg';
import { SubmitButton } from '../../../components/Styles/ButtonStyles';
import { SlidingBottomPanel } from '../../../components/SlidingBottomPanel/SlidingBottomPanel';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import { SliderCellColRaw } from '../../../components/SlidingBottomPanel/PanelComponents';
import { RowMargin1st } from '../../Administration/components/Styled';



const InputIconSpanSyled = styled.span`
    position: absolute;
    transform: translate(55% ,30%);
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

const checkBoxOptions = [
  { label: 'Брендирование', value: 'branding' },
  { label: 'Дизайн', value: 'design' },
];

// Ок
const DateStateText = styled.p`
    color: #2C5DE5;
    fontSize: 14px;
    fontWeight: bold;
    margin: 0;
`;

const ReservationSilderFormItem = styled(Form.Item)`
    display: flex;
    flexDirection: column;
    maxWidth: 300px;
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
    margin-top: 2.3rem;
    margin-left: 2rem;
    fontWeight: bold;
`;

export function ReservationSlider({sliderState}) {
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
  let initialValues = {}
  let colSteps = {xl: 2, lg: 4, md: 6};

  return (
    <SlidingBottomPanel title={`Быстрая бронь ${sliderState.title[0]}`}
                        onClose={sliderState.closeAdd}
                        classNameSuffix={'loca'}
                        sliderClass="advertising-part-slider"
    >
      <CRUDForm initialValues={initialValues}>
        <RowMargin1st>
          <SliderCellColRaw {...{xxl: 10}}>
            <ReservationSilderFormItem name="startDate">
              <p className="formItem-title">Дата начала</p>
              <InputIcon img={date} alt="date icon" />
              <DatePicker
                className="date-picker"
                suffixIcon={<DateStateText>Ок</DateStateText>}
                size={'large'}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
              />
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 3}}>
            <ReservationSilderFormItem name="endDate">
              <p className="formItem-title">Дата оканчания</p>
              <InputIcon img={date} alt="date icon" />
              <DatePicker
                className="date-picker"
                suffixIcon={<DateStateText>Ок</DateStateText>}
                size={'large'}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
              />
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 3}}>
            <ReservationSilderFormItem name="projectName">
              <p className="formItem-title">Проект</p>
              <InputIcon img={inputIcon} alt="input icon" />
              <Input size="large" placeholder="Название проекта" className="projectName-input" />
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 2}}>
            <ReservationSilderCheckboxesFormItem name="additional">
              <p className="formItem-title">Дополнительно</p>
              <Checkbox.Group options={checkBoxOptions} defaultValue={['branding', 'design']} />
            </ReservationSilderCheckboxesFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 2}}>
            {/* <BtnGroup> */}
            <ReservationSliderSubmitButton type="primary" htmlType="submit" onClick={() => {}}>
              Забронировать
            </ReservationSliderSubmitButton>
          </SliderCellColRaw>
        </RowMargin1st>
      </CRUDForm>
    </SlidingBottomPanel>
  )
}



