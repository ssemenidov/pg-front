import React, { useState, useEffect, useRef, useLayoutEffect, useCallback, useContext } from 'react';
import './styles_adv_part.scss';
import { adverContext } from './AdvertisingParties';
import { ScheduleChartView } from './GanttChart/DlhGanttChart';
import { createPopover } from './tabPopover';

export const ScheduleChartView1 = function ({ style, items, settings, change, columns, setGanttUpdater }) {
  let [state, setState] = useState([]);
  let [ganttUpdaterIsSetted, setGanttUpdaterIsSetted] = useState(false);

  useEffect(() => {
    if (!ganttUpdaterIsSetted) {
      setGanttUpdater(setState);
      setGanttUpdaterIsSetted(true);
    }
  }, [ganttUpdaterIsSetted]);

  let ref = useRef(null);

  if (!ref) ref = React.createRef();
  let changeHandler = settings.itemPropertyChangeHandler;
  let dl_columns = ScheduleChartView.getDefaultColumns(items, settings);
  let copied_settings = { ...settings };
  if (columns) {
    for (let col of columns) {
      dl_columns.push(col);
    }
    copied_settings.columns = dl_columns;
  }

  useEffect(function () {
    if (ref.current) {
      ScheduleChartView.initialize(ref.current, items, copied_settings);
      if (change) {
        settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
          if (changeHandler) changeHandler(item, propertyName, isDirect, isFinal);
          change(item, propertyName, isDirect, isFinal);
        };
      }
    }
  });

  return <div ref={ref} style={style}></div>;
};

export const ganttColumns = [
  {
    header: 'Код',
    width: 180,
    cellTemplate: (item) => item.scheduleChartView.ownerDocument.createTextNode(item.code),
  },
  {
    header: 'Формат',
    width: 200,
    cellTemplate: (item) => item.scheduleChartView.ownerDocument.createTextNode(item.format),
  },
  {
    header: 'Город',
    width: 900,
    cellTemplate: (item) => item.scheduleChartView.ownerDocument.createTextNode(item.city),
  },
];

//
export const ganttSettings = (year, month) => ({
  // currentTime: new Date(year, month, 2, 12, 0, 0),
  // Optionally, initialize custom theme and templates (themes.js, templates.js).
  // initializeGanttChartTheme(settings, theme);
  // initializeGanttChartTemplates(settings, theme);
  // Set up continuous schedule (24/7).
  workingWeekStart: 0, // Sunday
  workingWeekFinish: 6, // Saturday
  visibleDayStart: 0, // 00:00
  visibleDayFinish: 24 * 60 * 60 * 1000, // 24:00
  timelineStart: new Date(2020, 4, 1),
  timelineEnd: new Date(2020, 7, 31),
  displayedTime: new Date(2020, 4, 11),
  currentTime: new Date(2020, 4, 11),
  // Set appropriate zoom level as 24 hours are diplayed per day.
  hourWidth: 2.5,
  barCornerRadius: 6,
  daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  weekStartDay: 1, // Monday
  headerHeight: 26 * 2,
  barHeight: 25,
  barMargin: 10,
  itemHeight: 40,
  isRelativeToTimezone: true,
  horizontalGridLines: '#D3DFF0',
  isBaselineVisible: false,
  isTaskCompletedEffortVisible: false,
  selectionMode: 'ExtendedFocus',
  headerBackground: '#FFFFFF',
  isGridVisible: true,
  gridWidth: '20%',
  chartWidth: '80%',
  itemTemplate: (item) => createPopover(item),
  isTaskToolTipVisible: false,
  // interaction: 'TouchEnabled',
  scales: [
    {
      scaleType: 'NonworkingTime',
      isHeaderVisible: false,
      isHighlightingVisible: true,
      highlightingStyle: 'stroke-width: 0; fill: #f8f8f8',
    },
    {
      scaleType: 'Weeks',
      headerStyle: 'padding: 2.25px; border-right: solid 1px #D3DFF0;',
      // headerStyle: 'padding: 2.25px; border-right: solid 1px #c8bfe7; border-bottom: solid 1px #c8bfe7',
      headerTextFormat: (item) => {
        const MONTHS = [
          'января',
          'февраля',
          'марта',
          'апреля',
          'мая',
          'июня',
          'июля',
          'августа',
          'сентября',
          'октября',
          'ноября',
          'декабря',
        ];
        let nextDate = new Date(item);
        nextDate.setDate(item.getDate() + 14);
        let monthFirst = MONTHS[item.getMonth()];
        let monthNext = MONTHS[nextDate.getMonth()];
        let monthDayFirst = item.toLocaleString('ru-RU', { day: 'numeric' });
        let monthDayNext = nextDate.toLocaleString('ru-RU', { day: 'numeric' });
        return `${monthDayFirst} ${monthFirst} ${item.getFullYear()} – ${monthDayNext} ${monthNext} ${nextDate.getFullYear()}`;
      },
    },
    {
      scaleType: 'Days',
      headerTextFormat: 'DayOfWeek',
      headerStyle: 'padding: 2.25px; border-right: solid 1px #D3DFF0',
    },
    {
      scaleType: 'CurrentTime',
      isHeaderVisible: false,
      isSeparatorVisible: true,
      separatorStyle: 'stroke: #8bbf8a; stroke-width: 0.5px',
    },
  ],
});
