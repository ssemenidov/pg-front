import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';
import { Card, Popover, DatePicker, Form, Input, Checkbox } from 'antd';
import tableFreeIcon from '../../../img/sales/table-free-icon.svg';
import tableSoldIcon from '../../../img/sales/table-sold-icon.svg';
import Tab from './Tab';
import { StyledButton } from '../../../components/Styles/DesignList/styles';

import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

// ICONS
import date from '../../../img/left-bar/filter/date.svg';
import inputIcon from '../../../img/sales/projectNameInput.svg';
import { ReactComponent as CloseIcon } from '../../../img/sales/closeIcon.svg';
import { useHistory } from 'react-router';
import './styles.scss'
import { BottomSlider } from './BottomSlider';
import { GanttChartAdvertisingSides } from './GanttChartAdvertisingSides'


const PanelDesign = (props) => {
  const [showCard, setShowCard] = useState(true);
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'код рекламной стороны',
      dataIndex: 'code',
      width: 200,
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 100,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
    },
    {
      title: (
        <>
          <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>2 марта - 8 марта</strong>
          <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
        </>
      ),
      dataIndex: 'timeline1',
      key: 'timeline',
    },
    {
      title: (
        <>
          <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>9 марта - 15 марта</strong>
          <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
        </>
      ),
      dataIndex: 'timeline2',
      key: 'timeline',
    },
    {
      title: (
        <>
          <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>16 марта - 22 марта</strong>
          <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
        </>
      ),
      dataIndex: 'timeline3',
      key: 'timeline',
    },
  ];

  const [filter, setFilter] = useState({});

  const onFinish = (values) => {
    console.log(values);
    setFilter(values);
  };

  return (
    <>
      <div className="outdoor-table-bar">

        <GanttChartAdvertisingSides/>

        {/*<Table style={{ width: '100%' }} columns={columns} data={data} link="/sales/project_card" />*/}
      </div>
      <BottomSlider props={showCard, setShowCard, onFinish, form}/>
    </>
  );
};

export default PanelDesign;
