import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import { ScheduleChartView1, ganttColumns, ganttSettings } from './StyledGanttChart'
import Tab from './Tab';
import { gql, useQuery } from '@apollo/client';
import { LoadingAntd } from '../../../components/UI/Loader/Loader';
import { TEST_DATA } from './testData';

const SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION = gql`
    query SearchConstructionSideWithReservation {
      searchConstructionSide {
        edges {
          node {
            id
            advertisingSide {
              side {
                format {
                  title
                }
              }
            }
            construction {
              location {
                postcode {
                  district {
                    city {
                      title
                    }
                  }
                }
              }
            }
            reservation {
              edges {
                node {
                  id
                  dateFrom
                  dateTo
                  reservationType {
                    title
                  }
                  project {
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


export function GanttChartAdvertisingSides(props) {
  /// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
  // Query string syntax: ?theme
  // Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
  let queryString = window.location.search;
  let theme = queryString ? queryString.substr(1) : null;
  // Retrieve and store the control element for reference purposes.
  let scheduleChartViewElement = document.querySelector('#scheduleChartView');
  let date = new Date(), year = date.getFullYear(), month = date.getMonth();
  let filter = {};

  // const { loading, error, data, refetch } = useQuery(SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION, { variables: filter });
  // if (loading)
  //   return <LoadingAntd/>
  // if (error)
  //   return <h3>Error (:</h3>
  let data = null;

  let getBarClass = (barClass) => {
    console.log(barClass)
    if (barClass == 'Свободно')
      return 'gantt-bar-status-reserved';
    if (barClass == 'Забронировано')
      return 'gantt-bar-status-reserved';
    if (barClass == 'Утверждено')
      return 'gantt-bar-status-approved';
    if (barClass == 'Продано')
      return 'gantt-bar-status-saled';
    if (barClass == 'unavailable')
      return 'gantt-bar-status-unavailable';

    return 'gantt-bar-status-reserved';
  }
  let getBarTitle = (barClass) => {
    if (barClass == 'Свободно')
      return 'забронировано';
    if (barClass == 'Забронировано')
      return 'забронировано';
    if (barClass == 'Утверждено')
      return 'утверждено';
    if (barClass == 'Продано')
      return 'продано';
    if (barClass == 'unavailable')
      return 'недоступно';
    return 'забронировано';
  }
  let mapDate = (item) => {
    let date = Date.parse(item);
    let ndate = new Date();
    ndate.setTime(date)
    return ndate;
  }
  data = TEST_DATA["data"];

  let scheduleChartItems = [];
  if (data !== null) {
    for (let item of data.searchConstructionSide.edges) {
      if (item.node.advertisingSide)
        scheduleChartItems.push({
          content: item.id,
          start: new Date(2020, 1, 1, 0, 0, 0),
          code: item.node.id,
          format: item.node.advertisingSide.side.format.title,
          city: item.node.construction && item.node.construction.location && item.node.construction.location.postcode.district.city.title,
          // isSelected - свойство сообщающее, выбран элемент или нет
          ganttChartItems: item.node.reservation && item.node.reservation.edges.map(
            (reservation) => ({
              content: reservation.node.id,
              start: mapDate(reservation.node.dateFrom),
              finish: mapDate(reservation.node.dateTo),
              barClass: getBarClass(reservation.node.reservationType.title),
              textValue: reservation.node.project.brand.title + ' - ' + getBarTitle(reservation.node.reservationType.title),
            })
          ),
        })
    }
  }

  return (
    <>
      {/*<Tab cond={'sold'}/>*/}
      <ScheduleChartView1 items={scheduleChartItems}
                          settings={ganttSettings(year, month)}
                          columns={ganttColumns}/>
    </>
  );
};


