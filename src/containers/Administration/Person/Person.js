import React, { useState, useContext, createContext, useMemo } from 'react';
import { useHistory } from 'react-router';
import { useQuery, gql, useMutation } from '@apollo/client';

import PanelPerson from './PanelPersons'
import { adminRoutesMap } from '../Main/adminRoutes';
import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout'
import SlidingBottomPanel from '../components/SlidingBottomPanel/SlidingBottomPanel'
import { PersonCRUDForm } from './PersonCRUDForm'
import '../Style/style.css'


function AddUserSlider({closeHandler}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <SlidingBottomPanel title="Добавить нового сотрудника" onClose={closeHandler}>
      <PersonCRUDForm actionText={"Добавить"} onFinish={onFinish}/>
    </SlidingBottomPanel>
  )
}


function EditUserSlider({closeHandler, initialValues}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <SlidingBottomPanel title="Редактировать данные сотрудника" onClose={closeHandler}>
      <PersonCRUDForm actionText={"Сохранить изменения"} onFinish={onFinish} initialValues={initialValues}/>
    </SlidingBottomPanel>
  )
}


function Person(props) {
  const history = useHistory();
  const [sliderAddShowed, setSliderAddShowed] = useState(false);
  const [sliderEditShowed, setSliderEditShowed] = useState(false);

  const [editedUserData, setEditedUserData] = useState({
    accessLevel: false,
    email: null,
    id: null,
    key: null,
    name: null,
    phone: null,
    position: null
  })

  const createAddUserSlider = ((event) => { setSliderAddShowed(true); });
  const closeAddUserSlider = ((event) => { setSliderAddShowed(false); });

  const createEditUserSlider = ((event, record) => {
    let newState = Object.fromEntries(Object.keys(editedUserData).map((key) => [key, record[key]]));
    setEditedUserData(newState);

    if (sliderAddShowed)
      return;

    setSliderEditShowed(true);
  });

  const closeEditUserSlider = ((event) => { setSliderEditShowed(false) });

  return (
    <AdminTopLayout
      activeRoute={adminRoutesMap.person}
      buttonName="Создать сотрудника"
      buttonClickHandler={createAddUserSlider}
    >
      {sliderAddShowed && <AddUserSlider closeHandler={closeAddUserSlider}/>}
      {(sliderEditShowed && !sliderAddShowed) && <EditUserSlider closeHandler={closeEditUserSlider}
                                                                 initialValues={editedUserData}/>}
      <PanelPerson style={{ flex: '0 1 auto' }} history={history} openEditSlider={createEditUserSlider}/>
    </AdminTopLayout>
  );
};


export default Person;
