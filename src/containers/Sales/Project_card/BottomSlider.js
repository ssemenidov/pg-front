import React, {useState, useContext, useCallback} from 'react';
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
// import { batchContext } from './BatchPlacement';
import styled from 'styled-components';
import { Card, Checkbox, DatePicker, Form, Input } from 'antd';
import { ReactComponent as CloseIcon } from '../../../img/sales/closeIcon.svg';
import date from '../../../img/left-bar/filter/date.svg';
import inputIcon from '../../../img/sales/projectNameInput.svg';
import { SubmitButton } from '../../../components/Styles/ButtonStyles';
import { SlidingBottomPanel } from '../../../components/SlidingBottomPanel/SlidingBottomPanel';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import { SliderCellColRaw, SliderRow } from '../../../components/SlidingBottomPanel/PanelComponents';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';
import { gql, useQuery, useMutation } from '@apollo/client';
import {Row, Col} from 'antd'
import anchorIcon from '../../../img/input/anchor.svg';



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

const GET_RESERVATION_DATA = gql`
  query($id: ID) {
    searchReservation(id: $id) {
      edges {
        node {
          id
          dateTo
          dateFrom
          branding
        }
      }
    }
  }
`

const RESERVATION_PACKAGE_UPDATER = gql`
mutation ( $id: ID!, $input: UpdateReservationInput!) {
  updateReservation(id: $id, input: $input) {
    
    reservation {
      id
    }
  }
}
`

const GET_RESERVATIONS = gql`
  query {
    searchReservationType {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

export function ReservationSlider(props) {
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

 
  console.log(props)
  

  const [reservationPackageCreator, { data }] = useMutation(RESERVATION_PACKAGE_UPDATER);
  const reserveDataQuery = useQuery(GET_RESERVATION_DATA, {
    variables: {
      id: props.reserveCode
    }
  });
  const reservetionRes = useQuery(GET_RESERVATIONS);

  const resArr = reservetionRes.data ? reservetionRes.data.searchReservationType.edges : null;
  
  console.log('[dataReserve]', reserveDataQuery.data);

  let reserveQueryPath = reserveDataQuery.data ? reserveDataQuery.data.searchReservation.edges[0].node : null;
  let resDateFrom = reserveQueryPath ? new Date(reserveQueryPath.dateFrom) : null;
  let resDateTo = reserveQueryPath ? new Date(reserveQueryPath.dateTo) : null;

  let dateFromStr = resDateFrom ? resDateFrom.getFullYear() + '-' + (resDateFrom.getMonth() > 9 ? resDateFrom.getMonth() + 1 : '0' + (resDateFrom.getMonth() + 1)) + '-' + (resDateFrom.getDate() > 9 ?  resDateFrom.getDate()  : '0' + (resDateFrom.getDate())) : null;
  let dateToStr = resDateTo ? resDateTo.getFullYear() + '-' + (resDateTo.getMonth() + 1 > 9 ? resDateTo.getMonth() + 1 : '0' + (resDateTo.getMonth() + 1)) + '-' +  (resDateTo.getDate() > 9 ?  resDateTo.getDate()  : '0' + (resDateTo.getDate())) : null;

  const [dateFrom, setDateFrom] = useState(null); 
  const [dateTo, setDateTo] = useState(null);
  const [resType, setResType] = useState(); 
  console.log('[dateFrom] ', dateFrom);

  // let [endDate, setEndDate] = useState(); 
  const onFinFunc = (values) => {
    let reqObj = {};
    console.log('[dateFrom] ', dateFrom);
    // console.log('[dateTo] ', dateTo);
    // console.log('[projectName] ', project);
    // console.log(values)
    let fromDate = dateFrom ? new Date(dateFrom) : new Date(dateFromStr);
    let toDate = dateTo ? new Date(dateTo) : new Date(dateToStr);

    reqObj = {
      'dateFrom': fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1 > 9 ? fromDate.getMonth() + 1 : '0' + (fromDate.getMonth() + 1)) + '-' + (fromDate.getDate() > 9 ?  fromDate.getDate() - 1  : '0' + (fromDate.getDate() - 1)) + 'T22:00:00+00:00',
      'dateTo': toDate.getFullYear() + '-' + (toDate.getMonth() + 1 > 9 ? toDate.getMonth() + 1 : '0' + (toDate.getMonth() + 1)) + '-' + (toDate.getDate() > 9 ?  toDate.getDate() - 1 : '0' + (toDate.getDate() - 1)) + 'T22:00:00+00:00',
      'reservationType': resType
    };
    console.log('[reqObj]', reqObj)
    console.log('[props.reserveCode]', props.reserveCode)
    reservationPackageCreator({ variables: {
      "id": props.reserveCode,
      "input":  reqObj
    } });
    props.sliderState.closeAdd();
    // setFilter(null);
  }

  console.log('[reservetionRes.data]', reservetionRes.data)
  
  // dateFromStr && setDateFrom(dateFromStr);
  // dateToStr && setDateTo(dateToStr);
  return (
    <>
      {
        dateFromStr && dateToStr && <SlidingBottomPanel title={`Быстрая бронь ${props.sliderState.title[0]}`}
                        onClose={props.sliderState.closeAdd}
                        classNameSuffix={'loca'}
                        sliderClass="advertising-part-slider"
    >
      <CRUDForm  onFinish={onFinFunc} >
        <SliderRow>
          <div style={{display: 'none'}} >
            <SliderCellColRaw >
              <ReservationSilderFormItem name="reservCode" >
                <p>Код проекта</p>
                <Input defaultValue={reserveQueryPath.id} />
              </ReservationSilderFormItem>
                
            </SliderCellColRaw>
          </div>
          <SliderCellColRaw {...{xxl: 6, xl: 6, xs: 6}}>
          
            <ReservationSilderFormItem name="dateFrom" >
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
                  setDateFrom(stringDate)
                  
                }}
                defaultValue={dateToStr && moment(dateToStr ? dateFromStr : '2020-05-10', 'YYYY-MM-DD')}
              />
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 6, xl: 6, xs: 6}}>
            <ReservationSilderFormItem name="dateTo">
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
                  setDateTo(stringDate)
                }} 
                defaultValue={dateToStr && moment(dateToStr ? dateToStr : '2020-05-10', 'YYYY-MM-DD')}
              />
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 6, xl: 6, xs: 6}}>
            <ReservationSilderFormItem name="reservCode" >
            <p className="formItem-title">Статус брони</p>
              <StyledSelect  
                placeholder={<><img src={anchorIcon} /> <span>Статус брони</span> </>} 
                size={'large'} 
                onChange={e => {
                  console.log(e);
                  setResType(e)
                }}
              >
                {
                  resArr && resArr.map(item => {
                    return(
                      <StyledSelect.Option key={item.node.id} value={item.node.id}>
                        <span>{ item.node.title }</span>
                      </StyledSelect.Option>
                    )
                  })
                }
              </StyledSelect>
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          
          <SliderCellColRaw {...{xxl: 2, xs: 1}}>
            {/* <BtnGroup> */}
            <ReservationSliderSubmitButton type="primary" htmlType="submit" onClick={() => {}}>
              Сохранить
            </ReservationSliderSubmitButton>
          </SliderCellColRaw>
        </SliderRow>
      </CRUDForm>
    </SlidingBottomPanel>
  }
    </>
    
  )
}



