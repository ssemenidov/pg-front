import React, { useState } from 'react';

import { ScheduleChartView, ganttColumns, ganttSettings } from './StyledGanttChart'


export function GanttChartAdvertisingSides(props) {
  /// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
  // Query string syntax: ?theme
  // Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
  let queryString = window.location.search;
  let theme = queryString ? queryString.substr(1) : null;
  // Retrieve and store the control element for reference purposes.
  let scheduleChartViewElement = document.querySelector('#scheduleChartView');
  let date = new Date(), year = date.getFullYear(), month = date.getMonth();
  let scheduleChartItems = [
    {
      content: 'Resource 1',
      start: new Date(),
      ganttChartItems: [{
        content: 'Task A (Resource 1)',
        start: new Date(year, month, 2, 8, 0, 0),
        finish: new Date(year, month, 8, 16, 0, 0),
        completedFinish: new Date(year, month, 5, 16, 0, 0)
      }]
    },
    {
      content: 'Resource 2', start: new Date(), ganttChartItems: [
        {
          content: 'Task A (Resource 2)',
          start: new Date(year, month, 2, 8, 0, 0),
          finish: new Date(year, month, 8, 16, 0, 0),
          completedFinish: new Date(year, month, 5, 16, 0, 0),
          assignmentsContent: '50%'
        },
        {
          content: 'Task B (Resource 2)',
          start: new Date(year, month, 11, 8, 0, 0),
          finish: new Date(year, month, 12, 16, 0, 0),
          completedFinish: new Date(year, month, 12, 16, 0, 0)
        },
        {
          content: 'Task C (Resource 2)',
          start: new Date(year, month, 14, 8, 0, 0),
          finish: new Date(year, month, 14, 16, 0, 0),
          textValue: 'Olimp',
        }]
    },
    {
      content: 'Resource 3',
      start: new Date(),
      ganttChartItems: [{
        content: 'Task D (Resource 3)',
        start: new Date(year, month, 12, 12, 0, 0),
        finish: new Date(year, month, 14, 16, 0, 0),
        // barClass: 'gantt-bar-status-saled', // Продано
        // barClass: 'gantt-bar-status-approved', // Утверждено
        barClass: 'gantt-bar-status-reserved', // Забронировано
        textValue: 'CocaCola',
      }],
      // barClass: 'fill: #8abbed; fill-opacity: 0.8; stroke: #8abbed; stroke-width: 0.65px',
    }];
  for (var i = 4; i <= 16; i++)
    scheduleChartItems.push({
      content: 'Resource ' + i, start: new Date(), ganttChartItems: [
        {
          content: 'Task X (Resource ' + i + ')',
          start: new Date(year, month, 2, 8, 0, 0),
          finish: new Date(year, month, 5, 16, 0, 0),
          barClass: i % 2 ? 'gantt-bar-status-saled' : 'gantt-bar-status-approved', // Забронировано
        },
        {
          content: 'Task Y (Resource ' + i + ')',
          start: new Date(year, month, 7, 8, 0, 0),
          finish: new Date(year, month, 8, 16, 0, 0),
          barClass: i % 2 ? 'gantt-bar-status-reserved' : 'gantt-bar-status-unavailable', // Забронировано
        },
        ],
      code: `code ${i}`,
      format: `format ${i}`,
      city: `city ${i}`,
    });

  scheduleChartItems[1].description = 'Custom description';


  return <ScheduleChartView items={scheduleChartItems}
                            settings={ganttSettings(year, month)}
                            columns={ganttColumns}
  />;
};

