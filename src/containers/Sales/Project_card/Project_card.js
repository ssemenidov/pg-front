import React, { useState } from 'react';
import { LeftBar, StyledButton } from '../../../styles/styles';
import PanelDesign from './PanelProject_card';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../Base/Partners/LeftBar/SearchBtn';
import FilterBar from '../../Base/OutdoorFurniture/OutdoorFurnitureList/FilterBar/FilterBar';
import EditBtn from '../../Base/Partners/LeftBar/EditBtn';
import PaperBtn from '../../Base/Partners/LeftBar/PaperBtn';
import PackageBtn from '../../Base/Partners/LeftBar/PackageBtn';
import BoxBtn from '../../Base/Partners/LeftBar/BoxBtn';
import CreateBtn from '../../Base/Partners/LeftBar/CreateBtn';
import { useHistory } from 'react-router';
const Project_card = () => {
  const history = useHistory();
  const [block, setBlock] = useState(0);

  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/project_card', value: 'Проекты' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
        <CreateBtn text="Добавить бронь" />
        <PackageBtn text="Добавить пакет" />
        <EditBtn text="Перейти в монтажи" />
        <PaperBtn text="Сводка проекта" />
        <BoxBtn text="Архив дизайнов" />
      </LeftBar>

      <div style={{ width: '100%', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '2vw 0',
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <TitleLogo />
            <JobTitle>Проект Coca-cola</JobTitle>
          </div>
          <ButtonGroup>
            {block === 0 && (
              <>
                <StyledButton
                  backgroundColor="#D42D11"
                  onClick={() => {
                    history.push('/sales/summary');
                  }}>
                  Формирование сводки проекта
                </StyledButton>
                <StyledButton
                  backgroundColor="#2C5DE5"
                  onClick={() => {
                    history.push('/sales/application');
                  }}>
                  Создать приложение
                </StyledButton>
                <StyledButton
                  backgroundColor="#2C5DE5"
                  onClick={() => {
                    history.push('/sales/estimate');
                  }}>
                  Смета проекта
                </StyledButton>
              </>
            )}
          </ButtonGroup>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="project-info">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>О Проекте</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Код проекта</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>#2020876153</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Дата создания</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>21.05.2020</span>
                </div>

                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Создатель</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>@username</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '4% 0', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Информация о бренде</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Бренд</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>CocaCola</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Сектор деятельности:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>
                    Безалкогольные напитки
                  </span>
                </div>
              </div>
            </div>
            <div style={{ margin: '4% 0', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Доп. инфо</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Рекламодатель</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>Агентство</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Рекламное агентство</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>-</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Брендинг</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>Да</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Агентская комиссия</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>10%</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Менеджер по Продажам</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>Иван Иванович Иванов</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '4% 0', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Коментарий к проекту</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>
                    Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение.{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <PanelDesign style={{ flex: '0 1 auto' }} setBlock={setBlock} />
        </div>
      </div>
      {/* {block === 0 ? null : <FilterBar />} */}
      <style>
        {`
          .left-bar {
            margin: 0 2vw 0 0;
          
          }
          .project-info {
            border-radius: 8px;
            border: 1px solid #d3dff0;
            height: 100%;
            padding: 1.5%;
            flex: 0 1 auto;
            margin: 0 2vw 0 0;
            max-width:422px;
              }
          .project-info p {
            margin: 0;
          }
          .project-info h3 {
            font-weight:700;
          }
        `}
      </style>
    </div>
  );
};

export default Project_card;
