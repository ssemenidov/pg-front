import React, { useCallback } from 'react';

import { ScheduleChartView1, ganttColumns, ganttSettings } from './StyledGanttChart';
import { gql, useQuery } from '@apollo/client';
import { LoadingAntd } from '../../../components/UI/Loader/Loader';

const SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION = gql`
query {
  searchPackage {
    edges {
      node {
        id
        title
        reservationPackages {
          edges {
            node {
              id
              dateFrom
              dateTo
              reservationType {
                title
              }
              project {
                title
                salesManager {
                  id
                  firstName
                  lastName
                }
                backOfficeManager {
                  id
                  firstName
                  lastName
                }
                brand {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
}
`;


export function PanelBatch({ filter, setRefetch, setGanttUpdater, sliderState }) {
  /// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
  // Query string syntax: ?theme
  // Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
  let queryString = window.location.search;
  let theme = queryString ? queryString.substr(1) : null;
  // Retrieve and store the control element for reference purposes.
  let scheduleChartViewElement = document.querySelector('#scheduleChartView');
  let date = new Date(), year = date.getFullYear(), month = date.getMonth();

  console.log('[filter]', filter)
  // let dstFilter = {};
  // if (filter)
  //   dstFilter = filter.dstFilter;

  // console.log('compfilter', dstFilter)

  const { loading, error, data, refetch } = useQuery(SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION);


  useCallback(() => {
    setRefetch(refetch);
  }, [refetch]);

  console.log('[DATA]', data)

  if (loading)
    return <LoadingAntd />
  if (error)
    return <h3>Error (:</h3>
  // let data = null;

  let getBarClass = (barClass) => {
    console.log(barClass)
    if (barClass === 'Свободно')
      return 'gantt-bar-status-reserved';
    if (barClass === 'Забронировано')
      return 'gantt-bar-status-reserved';
    if (barClass === 'Утверждено')
      return 'gantt-bar-status-approved';
    if (barClass === 'Продано')
      return 'gantt-bar-status-saled';
    if (barClass === 'unavailable')
      return 'gantt-bar-status-unavailable';

    return 'gantt-bar-status-reserved';
  }
  let getBarTitle = (barClass) => {
    if (barClass === 'Свободно')
      return 'свободно';
    if (barClass === 'Забронировано')
      return 'забронировано';
    if (barClass === 'Утверждено')
      return 'утверждено';
    if (barClass === 'Продано')
      return 'продано';
    if (barClass === 'unavailable')
      return 'недоступно';
    return 'забронировано';
  }
  let mapDate = (item) => {
    let date = Date.parse(item);
    let ndate = new Date();
    ndate.setTime(date)
    return ndate;
  }

  let scheduleChartItems = [];
  if (data !== null) {
    for (let item of data.searchPackage.edges) {
      // console.log(item);
      if (item.node.reservationPackages) {
        scheduleChartItems.push({
          content: item.node.id,
          start: new Date(2020, 1, 1, 0, 0, 0),
          code: item.node.title,
          // isSelected - свойство сообщающее, выбран элемент или нет
          ganttChartItems: item.node.reservationPackages && item.node.reservationPackages.edges.map(
            (reservation) => {
              return ({
                content: reservation.node.id,
                start: mapDate(reservation.node.dateFrom),
                finish: mapDate(reservation.node.dateTo),
                barClass: getBarClass(reservation.node.reservationType.title),
                textValue: reservation.node.project.brand.title + ' - ' + getBarTitle(reservation.node.reservationType.title),
                salesManager_Id: reservation.node.project.salesManager.id,
                backOfficeManager_Id: reservation.node.project.backOfficeManager.id,
                brandTitle: reservation.node.project.brand.title,
                package_Title: item.node.title
              })
            })
        })
      }
    }
  }




  // let filtredArr = scheduleChartItemsFiltred;
  if (filter) {
    for (let filterItem in filter) {
      // console.log('1', filter[filterItem])

      if (filter[filterItem]) {
        if(filterItem == "date") {
          for(let a = 0; a < scheduleChartItems.length; a++) {
            for(let i = 0; i < scheduleChartItems[a].ganttChartItems.length; i++) {
              let nDt = new Date(scheduleChartItems[a].ganttChartItems[i].start)
              let sDt = new Date([filterItem][0])
              console.log(sDt, nDt)
              // ident = filter[filterItem] == item.ganttChartItems[i].salesManager_Id ? ident : ident - 1;
              // if(filter[filterItem] !== scheduleChartItems[a].ganttChartItems[i][`${filterItem}`]) {
              //   scheduleChartItems[a].ganttChartItems.splice(i, 1);
              //   i--;
              // }
            }
          }
        } else {
          for(let a = 0; a < scheduleChartItems.length; a++) {
            for(let i = 0; i < scheduleChartItems[a].ganttChartItems.length; i++) {
              console.log(filter[filterItem], scheduleChartItems[a].ganttChartItems[i][`${filterItem}`])
              // ident = filter[filterItem] == item.ganttChartItems[i].salesManager_Id ? ident : ident - 1;
              if(filter[filterItem] !== scheduleChartItems[a].ganttChartItems[i][`${filterItem}`]) {
                scheduleChartItems[a].ganttChartItems.splice(i, 1);
                i--;
              }
            }
          }
        }

        // for (let q = 0; q < scheduleChartItemsFiltred.length; q++) {
        //   for (let w = 0; w < scheduleChartItemsFiltred[q].ganttChartItems.length; w++) {
        //     scheduleChartItemsFiltred[q].ganttChartItems[w][`${filterItem}`]
        //   }
        // }

        // filtredArr = scheduleChartItemsFiltred.filter((item, index) => {
        //   let ident = item.ganttChartItems.length;
        //   for(let i = 0; i < item.ganttChartItems.length; i++) {
        //     console.log(filter[filterItem], item.ganttChartItems[i].salesManager_Id)
        //     ident = filter[filterItem] == item.ganttChartItems[i].salesManager_Id ? ident : ident - 1;
        //     if(filter[filterItem] !== item.ganttChartItems[i].salesManager_Id) {
        //       item.ganttChartItems.splice(i, 1);
        //       i--;
        //     }
        //   }
        //   if(ident != 0) {
        //     return item
        //   }
        // })
      }
    }
  }

  let scheduleChartItemsFiltred = scheduleChartItems.filter(item => item.ganttChartItems.length > 0);
  console.log('[filtredArr]', scheduleChartItems)
  console.log('len', scheduleChartItemsFiltred)

  return (
    <>
      {/*<Tab cond={'sold'}/>*/}
      <ScheduleChartView1 items={scheduleChartItemsFiltred}
        settings={ganttSettings(year, month, sliderState)}
        columns={ganttColumns}
        setGanttUpdater={setGanttUpdater}
        sliderState={sliderState}
      />
    </>
  );
};


