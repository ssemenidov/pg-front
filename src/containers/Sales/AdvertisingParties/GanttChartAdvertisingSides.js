import React, { useEffect, useContext } from 'react';

import { ScheduleChartView1, ganttColumns, ganttSettings } from './StyledGanttChart';
import { gql, useQuery } from '@apollo/client';
import { LoadingAntd } from '../../../components/UI/Loader/Loader';
import { getConstructionSideCode } from '../../../components/Logic/constructionSideCode';
import { useHistory } from 'react-router';
import { adverContext } from './AdvertisingParties';

const SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION = gql`
  query SearchConstructionSideWithReservation(
    $dateFrom: DateTime
    $dateTo: DateTime
    $family: ID
    $format: String
    $side: String
    $size: String
    $statusConnection: Boolean
    $city: ID
    $district: ID
    $reservationType: String
  ) {
    searchConstructionSide(
      reservation_DateFrom_Gte: $dateFrom
      reservation_DateTo_Lte: $dateTo
      advertisingSide_Side_Format_Model_Underfamily_Family_Id: $family
      advertisingSide_Side_Format_Title_Icontains: $format
      advertisingSide_Side_Title_Icontains: $side
      advertisingSide_Side_Size_Icontains: $size
      construction_StatusConnection: $statusConnection
      construction_Location_Postcode_District_City_Id: $city
      construction_Location_Postcode_District_Id: $district
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
                  id
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

export function GanttChartAdvertisingSides({ filter, setGanttUpdater }) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  const history = useHistory();
  const [, , chartItems, setChartItems, , setRefetch, resCreated, setResCreated] = useContext(adverContext);

  // console.log(filter);
  let dstFilter = {};
  if (filter) dstFilter = filter.dstFilter;
  // console.log('compfilter', dstFilter);
  let searchQuery = useQuery(SEARCH_CONSTRUCTION_SIDE_WITH_RESERVATION, { variables: dstFilter });
  let loading = searchQuery.loading;
  let error = searchQuery.error;
  let data = searchQuery.data;
  let refetch = searchQuery.refetch;

  useEffect(() => {
    if (resCreated) {
      refetch().then(() => {
        setResCreated(false);
      });
    }
    console.log('setted');
  }, [resCreated]);

  // let data = null;

  let getBarClass = (barClass) => {
    // console.log(barClass);
    if (barClass === 'Свободно') return 'gantt-bar-status-free';
    if (barClass === 'Забронировано') return 'gantt-bar-status-reserved';
    if (barClass === 'Утверждено') return 'gantt-bar-status-approved';
    if (barClass === 'Продано') return 'gantt-bar-status-saled';
    if (barClass === 'unavailable') return 'gantt-bar-status-unavailable';

    return 'gantt-bar-status-reserved';
  };
  let getBarTitle = (barClass) => {
    if (barClass === 'Свободно') return 'cвободно';
    if (barClass === 'Забронировано') return 'забронировано';
    if (barClass === 'Утверждено') return 'утверждено';
    if (barClass === 'Продано') return 'продано';
    if (barClass === 'unavailable') return 'недоступно';
    return 'забронировано';
  };
  let mapDate = (item) => {
    let date = Date.parse(item);
    let ndate = new Date();
    ndate.setTime(date);
    return ndate;
  };

  useEffect(() => {
    // console.log(data);
    if (data && data.searchConstructionSide) {
      let scheduleChartItems = [];
      console.log(data.searchConstructionSide.edges.length)
      for (let item of data.searchConstructionSide.edges) {
        if (item.node.advertisingSide)
          scheduleChartItems.push({
            content: item.node.id,
            start: new Date(2020, 1, 1, 0, 0, 0),
            code: getConstructionSideCode(item.node),
            format: item.node.advertisingSide.side.format.title,
            city:
              item.node.construction &&
              item.node.construction.location &&
              item.node.construction.location.postcode.district.city.title,
            // isSelected - свойство сообщающее, выбран элемент или нет
            ganttChartItems:
              item.node.reservation &&
              item.node.reservation.edges.map((reservation) => ({
                content: reservation.node.id,
                start: mapDate(reservation.node.dateFrom),
                finish: mapDate(reservation.node.dateTo),
                barClass: getBarClass(reservation.node.reservationType.title),
                textValue:
                  reservation.node.project.brand.title + ' - ' + getBarTitle(reservation.node.reservationType.title),
                history: history,
              })),
          });
      }
      setChartItems(scheduleChartItems);
    }
  }, [data]);

  if (loading || resCreated) return <LoadingAntd />;

  if (error) return <h3>Error (:</h3>;

  // console.log('len', chartItems.length)

  return (
    <>
      {/*<Tab cond={'sold'}/>*/}
      <ScheduleChartView1
        items={chartItems}
        settings={ganttSettings(year, month)}
        columns={ganttColumns}
        setGanttUpdater={setGanttUpdater}
      />
    </>
  );
}
