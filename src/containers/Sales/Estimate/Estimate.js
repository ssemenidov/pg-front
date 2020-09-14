import React, { useState } from 'react';
import { LeftBar, StyledButton } from '../../../styles/styles';
import PanelDesign from './PanelEstimate';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../Base/Partners/LeftBar/SearchBtn';
import FilterBar from '../../Base/OutdoorFurniture/OutdoorFurnitureList/FilterBar/FilterBar';
import AddBtn from '../../Base/Partners/LeftBar/AddBtn';

const Estimate = () => {
  const [block, setBlock] = useState(0);

  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/estimate', value: 'Смета' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
        <AddBtn text="Добавить расход"></AddBtn>
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
            <JobTitle>Смета - CocaCola</JobTitle>
          </div>
          <ButtonGroup>
            {block === 0 ? (
              <>
                <StyledButton backgroundColor="#008556">Добавить расход</StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
              </>
            ) : (
              <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
            )}
          </ButtonGroup>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="project-info">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Аренда</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Аренда по прайсу:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>99 999 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>99 999 тг.</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>10%</span>
                </div>

                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Аренда на клиента:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>9 999 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Скидка на аренду на клиента:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>5%</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '4% 0', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Доп. работы</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Монтаж:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>83 782.47 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Печать:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>73 639.76 тг.</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '4% 0', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Доп. расходы</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Согласование эскизов:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>71 841.67 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Доп. печать:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>10 399.84 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Доп. монтаж:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>14 892.96 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Размещение в регионах:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>81 964.85 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Оформление брендированных конструкций:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>45 649.72 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Дополнительный фотоотчет:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>36 406.35 тг.</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '4% 0', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Агентская комиссия</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Процент АК:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>5 %</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Сумма АК:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>30 000 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Сумма за вычетом АК:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>150 000 тг.</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '4% 0', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Налоги</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Налог:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>79 597.85 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Скидка на налог:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>10%</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Налога после скидки:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>81 872.03 тг.</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '4% 0', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>НОН РТС</h3>
              </div>
              <div style={{ borderBottom: '1px solid #d3dff0' }}>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Наружная реклама Актау:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>35 000 тг.</span>
                </div>
                <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Радио Алматы:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>20 000 тг.</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '4% 0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ margin: '4% 0', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>ИТОГО</span>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>1 124 888 тг..</span>
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
            color: #1A1A1A;
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

export default Estimate;
