import React, { useState } from 'react';

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

// let script2 = document.createElement('script');
// script2.src = 'https://z0rel.ddns.net/static/DlhSoft.Data.HTML.Controls.js';
// script2.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script2);
//
// let script3 = document.createElement('script');
// script3.src = 'https://z0rel.ddns.net/static/DlhSoft.ProjectData.GanttChart.HTML.Controls.Extras.js';
// script3.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script3);


let ScheduleChartView = React.forwardRef(function(props, ref) {
  let { initialized, setInitialized } = useState(false)
  if (!ref) ref = React.createRef();
  let element = <div ref={ref} style={props.style}>{props.children}</div>;
  let changeHandler = props.settings.itemPropertyChangeHandler;
  if (!initialized) {
    let interval = setInterval(function() {
      if (window.DlhSoft && window.DlhSoft.Controls && window.DlhSoft.Controls.ScheduleChartView
        && window.DlhSoft.Controls.ScheduleChartView.initialize) {
        clearInterval(interval)
        window.DlhSoft.Controls.ScheduleChartView.initialize(ref.current, props.items, props.settings, props.license);
      }
    });
  }
  else {
    setTimeout(function() {
      if (props.change) {
        props.settings.itemPropertyChangeHandler = function(item, propertyName, isDirect, isFinal) {
          if (changeHandler)
            changeHandler(item, propertyName, isDirect, isFinal);
          props.change(item, propertyName, isDirect, isFinal);
        }
      }
    })
  }
  return element;
});

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
          finish: new Date(year, month, 14, 16, 0, 0)
        }]
    },
    {
      content: 'Resource 3',
      start: new Date(),
      ganttChartItems: [{
        content: 'Task D (Resource 3)',
        start: new Date(year, month, 12, 12, 0, 0),
        finish: new Date(year, month, 14, 16, 0, 0)
      }]
    }];
  for (var i = 4; i <= 16; i++)
    scheduleChartItems.push({
      content: 'Resource ' + i, start: new Date(), ganttChartItems: [
        {
          content: 'Task X (Resource ' + i + ')',
          start: new Date(year, month, 2, 8, 0, 0),
          finish: new Date(year, month, 5, 16, 0, 0)
        },
        {
          content: 'Task Y (Resource ' + i + ')',
          start: new Date(year, month, 7, 8, 0, 0),
          finish: new Date(year, month, 8, 16, 0, 0)
        }]
    });

  let settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0)
  };
  // Optionally, initialize custom theme and templates (themes.js, templates.js).
  // initializeGanttChartTheme(settings, theme);
  // initializeGanttChartTemplates(settings, theme);
  // Set up continuous schedule (24/7).
  settings.workingWeekStart = 0; // Sunday
  settings.workingWeekFinish = 6; // Saturday
  settings.visibleDayStart = 0; // 00:00
  settings.visibleDayFinish = 24 * 60 * 60 * 1000; // 24:00
  // Set appropriate zoom level as 24 hours are diplayed per day.
  settings.hourWidth = 2.5;
  return <ScheduleChartView items={scheduleChartItems} settings={settings}></ScheduleChartView>;
};


