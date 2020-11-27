import React, {useState} from 'react';
import styled from 'styled-components';
import { DatePicker, Form } from 'antd';
import date from '../../../img/left-bar/filter/date.svg';
import { SubmitButton } from '../../../components/Styles/ButtonStyles';
import { SlidingBottomPanel } from '../../../components/SlidingBottomPanel/SlidingBottomPanel';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import { SliderCellColRaw, SliderRow } from '../../../components/SlidingBottomPanel/PanelComponents';
import { gql, useMutation } from '@apollo/client';


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
    margin-top: 2.5rem;
    margin-left: 2rem;
    fontWeight: bold;
`;

const RESERVATION_PACKAGE_CREATOR = gql`
mutation ( $input: CreateReservationPackageInput!) {
  createReservationPackage(input: $input) {

    reservationPackage {
      id
      dateTo
      dateFrom
      reservationType {
        title
      }
    }
  }
}
`

export function ReservationSlider({sliderState, data, reserveCode}) { //
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

  let colSteps = {xl: 2, lg: 4, md: 6};
  // const [filter, setFilter] = useContext(batchContext);



  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [project, setProject] = useState();

  const [reservationPackageCreator, mutationResult] = useMutation(RESERVATION_PACKAGE_CREATOR);

  const onFinFunc = (values) => {
    let reqObj = {};
    console.log('[dateFrom] ', dateFrom);
    console.log('[dateTo] ', dateTo);
    console.log('[projectName] ', project);

    reqObj = {
      'dateFrom': dateFrom,
      'dateTo': dateTo,
      'package': project[0],
      'project': project[1],
      "reservationType": "VlJlc2VydmF0aW9uVHlwZU5vZGU6Mw=="
    };
    console.log('[reqObj]', reqObj)
    reservationPackageCreator({ variables: {"input":  reqObj} });
    // setFilter(null);
  }
  return (
    <SlidingBottomPanel title={`Быстрая бронь ${sliderState.title[0]}`}
                        onClose={sliderState.closeAdd}
                        classNameSuffix={'loca'}
                        sliderClass="advertising-part-slider"
    >
      <CRUDForm  onFinish={onFinFunc} >
        <SliderRow>
          <SliderCellColRaw {...{xxl: 4, xl: 4, xs: 5}}>

            <ReservationSilderFormItem >
              <p className="formItem-title">Дата начала</p>
              <InputIcon img={date} alt="date icon" />
              <DatePicker
                dropdownClassName="topCenter"
                className="date-picker"
                suffixIcon={<DateStateText>Ок</DateStateText>}
                size={'large'}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                onChange={(e) => {
                  let stringDate = e.toString();
                  let ndate = new Date(stringDate);
                  let stringifyNdate = ndate.getFullYear() + '-' + ( ndate.getMonth() >= 9 ?  ndate.getMonth() + 1 : '0' + (ndate.getMonth() + 1)) + '-' + ( ndate.getDate() > 9 ?  ndate.getDate()  : '0' + (ndate.getDate())) + 'T22:00:00+00:00'
                  console.log(stringifyNdate);
                  setDateFrom(stringifyNdate);

                }}
              />
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 4, xl: 4, xs: 5}}>
            <ReservationSilderFormItem >
              <p className="formItem-title">Дата оканчания</p>
              <InputIcon img={date} alt="date icon" />
              <DatePicker
                className="date-picker"
                suffixIcon={<DateStateText>Ок</DateStateText>}
                size={'large'}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                onChange={(e) => {
                  let stringDate = e.toString();
                  let ndate = new Date(stringDate);

                }}
              />
            </ReservationSilderFormItem>
          </SliderCellColRaw>

          <SliderCellColRaw {...{xxl: 2, xs: 1}}>
            {/* <BtnGroup> */}
            <ReservationSliderSubmitButton type="primary" htmlType="submit" onClick={() => {}}>
              Редактировать
            </ReservationSliderSubmitButton>
          </SliderCellColRaw>
        </SliderRow>
      </CRUDForm>
    </SlidingBottomPanel>
  )
}



