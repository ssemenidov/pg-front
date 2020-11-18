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
import '../../../components/SlidingBottomPanel/style.scss'
import './styles_adv_part.scss'
import { BottomSlider } from './BottomSlider';
import { GanttChartAdvertisingSides } from './GanttChartAdvertisingSides'


import { SlidingBottomPanel } from '../../../components/SlidingBottomPanel/SlidingBottomPanel';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import { SliderCellColRaw, SliderFormItem, SliderGrid } from '../../../components/SlidingBottomPanel/PanelComponents';
import { RowMargin1st } from '../../Administration/components/Styled';
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import { AdminTopLayout } from '../../Administration/AdminTopLayout/AdminTopLayout';






const AdvertisingPartPanel = (props) => {
  const [showCard, setShowCard] = useState(true);
  const [form] = Form.useForm();

  const [filter, setFilter] = useState({});

  const onFinish = (values) => {
    console.log(values);
    setFilter(values);
  };
  return (
    <>
      <div className="outdoor-table-bar">
        <GanttChartAdvertisingSides/>
      </div>
    </>
  );
};

export default AdvertisingPartPanel;
