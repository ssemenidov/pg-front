import React, { useState } from 'react';
import './styles_adv_part.scss'

// import DlhSoft from './DlhSoft/Controls';
// import 'DlhSoft.GanttChartHyperLibrary/DlhSoft.Data.HTML.Controls.js';
// import 'DlhSoft.GanttChartHyperLibrary/DlhSoft.ProjectData.GanttChart.HTML.Controls.Extras.js';

// import { ScheduleChartView } from 'DlhSoft.GanttChartHyperLibrary/DlhSoft.ProjectData.GanttChart.React.Components';
for (let urlValue of [
  '/DlhSoft.ProjectData.GanttChart.HTML.Controls.js',
  '/DlhSoft.Data.HTML.Controls.js',
]) {
  let script = document.createElement('script');
  script.src = urlValue;
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);
}

export const ScheduleChartView = React.forwardRef(function({style, children, items, settings, license, change, columns}, ref) {
  if (!ref) ref = React.createRef();
  let element = <div ref={ref} style={style}>{children}</div>;
  let changeHandler = settings.itemPropertyChangeHandler;
  let interval = setInterval(function() {
    if (window.DlhSoft && window.DlhSoft.Controls && window.DlhSoft.Controls.ScheduleChartView
      && window.DlhSoft.Controls.ScheduleChartView.initialize) {
      let dl_columns = window.DlhSoft.Controls.ScheduleChartView.getDefaultColumns(items, settings);
      let copied_settings = {...settings};
      if (columns) {
        for (let col of columns) {
          dl_columns.push(col);
        }
        copied_settings.columns = dl_columns;
      }
      window.DlhSoft.Controls.ScheduleChartView.initialize(ref.current, items, copied_settings, license);
      clearInterval(interval)
    }
  });
  setTimeout(function() {
    if (change) {
      settings.itemPropertyChangeHandler = function(item, propertyName, isDirect, isFinal) {
        if (changeHandler)
          changeHandler(item, propertyName, isDirect, isFinal);
        change(item, propertyName, isDirect, isFinal);
      }
    }
  })
  return element;
});


export const ganttColumns = [
  {
    header: 'Код',
    width: 100,
    cellTemplate: item => item.scheduleChartView.ownerDocument.createTextNode(item.code),
  },
  {
    header: 'Формат',
    width: 120,
    cellTemplate: item => item.scheduleChartView.ownerDocument.createTextNode(item.format),
  },
  {
    header: 'Город',
    width: 100,
    cellTemplate: item => item.scheduleChartView.ownerDocument.createTextNode(item.city),
  },
];

export const ganttSettings = (year, month) => ({
  currentTime: new Date(year, month, 2, 12, 0, 0),
  // Optionally, initialize custom theme and templates (themes.js, templates.js).
  // initializeGanttChartTheme(settings, theme);
  // initializeGanttChartTemplates(settings, theme);
  // Set up continuous schedule (24/7).
  workingWeekStart: 0, // Sunday
  workingWeekFinish: 6, // Saturday
  visibleDayStart: 0, // 00:00
  visibleDayFinish: 24 * 60 * 60 * 1000, // 24:00
  // Set appropriate zoom level as 24 hours are diplayed per day.
  hourWidth: 2.5,
  barCornerRadius: 12,
  daysOfWeek: [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
  weekStartDay:  1, // Monday
  headerHeight: 26 * 2,
  barHeight: 25,
  barMargin: 10,
  itemHeight: 40,
  isRelativeToTimezone: true,
  horizontalGridLines: '#D3DFF0',
  selectionMode: 'ExtendedFocus',
  headerBackground: '#FFFFFF',
  scales: [
    {
      scaleType: 'NonworkingTime',
      isHeaderVisible: false,
      isHighlightingVisible: true,
      highlightingStyle: 'stroke-width: 0; fill: #f8f8f8'
    },
    // {
    //   scaleType: 'Months',
    //   headerTextFormat: 'Month',
    //   headerStyle: 'padding: 2.25px; border-right: solid 1px #c8bfe7; border-bottom: solid 1px #c8bfe7',
    //   isSeparatorVisible: true,
    //   separatorStyle: 'stroke: #c8bfe7',
    //   headerHeight: '2rem',
    // },
    {
      scaleType: 'Weeks',
      headerTextFormat: 'Localized',
      headerStyle: 'padding: 2.25px; border-right: solid 1px #c8bfe7; border-bottom: solid 1px #c8bfe7',
    },
    {
      scaleType: 'Days',
      headerTextFormat: 'DayOfWeek',
      headerStyle: 'padding: 2.25px; border-right: solid 1px #c8bfe7',
    },
    {
      scaleType: 'CurrentTime',
      isHeaderVisible: false,
      isSeparatorVisible: true,
      separatorStyle: 'stroke: #8bbf8a; stroke-width: 0.5px',
    }
  ]
});
