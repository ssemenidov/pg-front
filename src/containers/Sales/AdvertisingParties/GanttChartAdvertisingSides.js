import React, { useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { ScheduleChartView1, ganttColumns, ganttSettings } from './StyledGanttChart'
import Tab from './Tab';
import { gql, useQuery } from '@apollo/client';
import { LoadingAntd } from '../../../components/UI/Loader/Loader';
import { useMediaQuery } from '@material-ui/core';

const SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION = gql`
  query SearchConstructionSideWithReservation(
    $dateFrom: DateTime,
    $dateTo: DateTime,
    $family: ID,
    $format: String,
    $side: String,
    $size: String,
    $statusConnection: Boolean,
    $city: ID,
    $district: ID,
    $reservationType: String,
  ) {
    searchConstructionSide(
      reservation_DateFrom_Gte: $dateFrom,
      reservation_DateTo_Lte: $dateTo,
      advertisingSide_Side_Format_Model_Underfamily_Family_Id: $family,
      advertisingSide_Side_Format_Title_Icontains: $format,
      advertisingSide_Side_Title_Icontains: $side,
      advertisingSide_Side_Size_Icontains: $size,
      construction_StatusConnection: $statusConnection,
      construction_Location_Postcode_District_City_Id: $city,
      construction_Location_Postcode_District_Id: $district,
      reservation_ReservationType_Title_Iregex: $reservationType
    ) {
      edges {
        node {
          id
          advertisingSide {
            code
            side {
              code
              format {
                code
                title
              }
            }
          }
          construction {
            statusConnection
            numInDistrict
            location {
              postcode {
                title
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
                  title
                  salesManager {
                    firstName
                    firstName
                  }
                  backOfficeManager {
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



export function GanttChartAdvertisingSides({filter, setRefetch, setGanttUpdater}) {
  /// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
  // Query string syntax: ?theme
  // Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
  let queryString = window.location.search;
  let theme = queryString ? queryString.substr(1) : null;
  // Retrieve and store the control element for reference purposes.
  let scheduleChartViewElement = document.querySelector('#scheduleChartView');
  let date = new Date(), year = date.getFullYear(), month = date.getMonth();

  console.log(filter)
  let dstFilter = {};
  if (filter)
    dstFilter = filter.dstFilter;

  console.log('compfilter', dstFilter)
  let searchQuery = useQuery(SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION, { variables: dstFilter });
  let loading = searchQuery.loading;
  let error = searchQuery.error;
  let data = searchQuery.data;
  let refetch = searchQuery.refetch;

  useCallback(() => {
    setRefetch(refetch);
  }, [refetch]);

  if (loading)
    return <LoadingAntd/>
  if (error) {
    let sqr = searchQuery;
    return <h3>Error (:</h3>
  }
  // let data = null;

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

  let getItemCode = (node) => (
    `${node.construction.location.postcode.title}.${node.construction.numInDistrict}.`
    + `${node.advertisingSide.side.format.code || '_'}.${node.advertisingSide.side.code || '_'}.${node.advertisingSide.code || '_'}`
  );


  let scheduleChartItems = [];
  if (data !== null) {
    for (let item of data.searchConstructionSide.edges) {
      if (item.node.advertisingSide)
        scheduleChartItems.push({
          content: item.id,
          start: new Date(2020, 1, 1, 0, 0, 0),
          code: getItemCode(item.node),
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
  console.log('len', scheduleChartItems.length)

  return (
    <>
      {/*<Tab cond={'sold'}/>*/}
      <ScheduleChartView1 items={scheduleChartItems}
                          settings={ganttSettings(year, month)}
                          columns={ganttColumns}
                          setGanttUpdater={setGanttUpdater}
      />
    </>
  );
};


