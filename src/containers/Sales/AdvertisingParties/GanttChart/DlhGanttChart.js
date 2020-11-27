/* eslint-disable */
import { createPopover } from '../tabPopover';
import 'bootstrap'

let ToolTip = undefined;
let DatePicker = undefined;
let DateTimePicker = undefined;
let MultiSelectorComboBox = undefined;
let Pert = undefined;
let getBooleanNode = undefined;

export const GanttChartView = function() {
  var daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    I = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    X = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ba = new Date(2592E5), la = new Date(3155762592E5),
    ganttChartViewInit = function(chartView, c, d, b) {
      if (typeof chartView.ownerDocument.createElementNS === 'undefined' || typeof chartView.ownerDocument.addEventListener === 'undefined') alert('The required HTML5 features are not supported by the application host. Some features will be unavailable. Consider upgrading.');
      else {
        var scales;
        chartView.isInitializing = true;
        typeof chartView.settings !== 'undefined' && typeof chartView.settings.toggleButtonAreaWidth !== 'undefined' && delete chartView.settings.toggleButtonAreaWidth;
        if (typeof chartView.items !== 'undefined') for (b = 0; b < chartView.items.length; b++) delete chartView.items[b].successors;
        typeof d !== 'object' && (d = {});
        ganttChartViewInitItems(c, d);
        O(d, c, chartView);
        initializeInterface(chartView, c, d);
        b = d.columns;
        scales = d.scales;
        tc(b, chartView, d);
        ma(c, chartView);
        ca(c, d, chartView);
        if (typeof d.visibilityFilter !== 'undefined') {
          uc(c, d.visibilityFilter);
          for (var e = 0, g = 0; g < c.length; g++) {
            var ganttChartRoot = c[g];
            if (typeof ganttChartRoot.ganttChartItems !== 'undefined') {
              if (!ganttChartRoot.isHidden) ganttChartRoot.scheduleChartVisibilityIndex = e++;
              for (var ganttChartHeader = 0; ganttChartHeader < ganttChartRoot.ganttChartItems.length; ganttChartHeader++) {
                var n = ganttChartRoot.ganttChartItems[ganttChartHeader];
                if (ganttChartRoot.isHidden) n.isHidden = true;
                n.displayRowIndex = ganttChartRoot.scheduleChartVisibilityIndex;
              }
            }
          }
        }
        var l = P(chartView, c, d), ownerDocument = chartView.ownerDocument, e = ownerDocument.createElement('div');
        e.classList.add('gantt-root-root')
        // e.setAttribute('style', 'font-family: Arial; font-size: small; overflow: auto');
        g = ownerDocument.createElement('div');
        typeof d.containerClass !== 'undefined' && g.setAttribute('class', d.containerClass);
        typeof d.containerStyle !== 'undefined' && g.setAttribute('style', d.containerStyle);
        e.appendChild(g);
        ganttChartRoot = ownerDocument.createElement('div');
        ganttChartRoot.classList.add('gantt-chart-root')
        // ganttChartRoot.setAttribute('style', 'border: solid 1px ' + d.border + '; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; overflow: auto');
        g.appendChild(ganttChartRoot);
        var ganttChartLeftPanel = ownerDocument.createElement('div');
        ganttChartLeftPanel.classList.add('gantt-chart-left-panel')
        ganttChartLeftPanel.setAttribute('style', 'overflow: auto; float: left; border-right: solid 1px ' + d.border + '; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: ' + d.gridWidth);
        d.isGridVisible && ganttChartRoot.appendChild(ganttChartLeftPanel);
        var ganttChartRightPanel = ownerDocument.createElement('div');
        ganttChartRightPanel.classList.add('gantt-chart-right-bar');
        ganttChartRightPanel.setAttribute('style', 'overflow: auto; float: right; width: ' + d.chartWidth);
        ganttChartRoot.appendChild(ganttChartRightPanel);
        var barsChartContainer = ownerDocument.createElement('div');
        barsChartContainer.setAttribute('style',
          'position: relative; opacity: 0; left: 0px; width: ' + d.splitterWidth + 'px; height: 0px; background: ' +
          d.splitterBackground + '; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: e-resize; -ms-touch-action: pinch-zoom; touch-action: auto'
        );
        barsChartContainer.addEventListener('mouseover', function() {
          barsChartContainer.style.opacity = 1;
          barsChartContainer.isWaiting !== 'undefined' && delete barsChartContainer.isWaiting;
        }, true);
        barsChartContainer.addEventListener('mouseout', function() {
          if (typeof barsChartContainer.isWaiting === 'undefined') {
            barsChartContainer.isWaiting = true;
            setTimeout(function() {
              if (typeof barsChartContainer.isWaiting !== 'undefined') {
                delete barsChartContainer.isWaiting;
                if (typeof barsChartContainer.x === 'undefined') barsChartContainer.style.opacity =
                  0;
              }
            }, 1E3);
          }
        }, true);
        barsChartContainer.addEventListener('mousedown', function(a) {
          if (a.button == 0) {
            barsChartContainer.style.opacity = 1;
            barsChartContainer.x = a.clientX;
            barsChartContainer.gridWidth = ganttChartLeftPanel.offsetWidth;
          }
        }, true);
        ownerDocument.addEventListener('mousemove', function(c) {
          if (typeof barsChartContainer.x !== 'undefined' && !(chartView.offsetWidth <= 0)) {
            var c = barsChartContainer.gridWidth + (c.clientX - barsChartContainer.x), b = chartView.offsetWidth - c - 3, f = Math.max(1, d.minGridWidth),
              m = Math.max(1, d.minChartWidth);
            if (c < f) {
              b = b - (f - c);
              c = f;
            } else if (b < m) {
              c = c - (m - b);
              b = m;
            }
            c < 1 && (c = 1);
            b < 1 && (b = 1);
            typeof ganttChartLeftPanel.percent !== 'undefined' && delete ganttChartLeftPanel.percent;
            c = Math.floor(c * 1E6 / chartView.offsetWidth) /
              1E4;
            ganttChartLeftPanel.style.width = c + '%';
            ganttChartRightPanel.style.width = 100 - c + '%';
            d.gridWidth = ganttChartLeftPanel.offsetWidth + 'px';
            d.chartWidth = ganttChartRightPanel.offsetWidth + 'px';
            Ba(barsChartContainer, ganttChartLeftPanel, d);
            typeof d.splitterPositionChangeHandler !== 'undefined' && setTimeout(function() {
              d.splitterPositionChangeHandler(ganttChartLeftPanel.offsetWidth, ganttChartRightPanel.offsetWidth);
            }, 0);
          }
        }, true);
        ownerDocument.addEventListener('mouseup', function() {
          if (typeof barsChartContainer.x !== 'undefined') {
            delete barsChartContainer.x;
            barsChartContainer.style.opacity = 0;
          }
          if (ToolTip && d.useUpdatingToolTips) {
            let toolTip = chartView.toolTip;
            if (toolTip) {
              toolTip.hide();
            }
          }

        }, true);
        d.isGridVisible && d.isSplitterEnabled && ganttChartRoot.appendChild(barsChartContainer);
        g = ownerDocument.createElement('div');
        g.setAttribute('style', 'float: right; background: ' + d.headerBackground + '; width: 0px; height: ' + d.headerHeight + 'px');
        ganttChartLeftPanel.appendChild(g);
        ganttChartRoot = ownerDocument.createElement('div');
        ganttChartRoot.classList.add('gantt-chart-left-panel-header')
        ganttChartRoot.setAttribute('style', 'overflow: hidden; background: ' + d.headerBackground + '; border-bottom: solid 1px ' + d.border + '; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; height: ' + d.headerHeight + 'px');
        ganttChartLeftPanel.appendChild(ganttChartRoot);
        ganttChartHeader = ownerDocument.createElement('div');
        ganttChartHeader.setAttribute('style', 'float: right; background: ' +
          d.headerBackground + '; width: 0px; height: ' + d.headerHeight + 'px');
        ganttChartRightPanel.appendChild(ganttChartHeader);
        n = ownerDocument.createElement('div');
        n.setAttribute('style', 'overflow: hidden; background: ' + d.headerBackground + '; border-bottom: solid 1px ' + d.border + '; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; height: ' + d.headerHeight + 'px');
        n.classList.add('gantt-chart-right-panel-header')
        ganttChartRightPanel.appendChild(n);
        var q = ownerDocument.createElement('div');
        q.setAttribute('style', 'overflow-x: ' + (typeof d.isExport === 'undefined' || !d.isExport ? 'scroll' : 'hidden') + '; overflow-y: ' +
          (typeof d.isExport === 'undefined' || !d.isExport ? 'auto' : 'hidden') + '; height: ' + l);
        ganttChartLeftPanel.appendChild(q);
        var M = ownerDocument.createElement('div');
        M.setAttribute('style', 'overflow-x: ' + (typeof d.isExport === 'undefined' || !d.isExport ? 'scroll' : 'hidden') + '; overflow-y: ' + (typeof d.isExport === 'undefined' || !d.isExport ? 'auto' : 'hidden') + '; height: ' + l);
        ganttChartRightPanel.appendChild(M);
        var l = db(b), j = ownerDocument.createElement('div');
        j.setAttribute('style', 'background: ' + d.headerBackground + '; border-bottom: solid 1px ' + d.border + '; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: ' +
          l + 'px; overflow: hidden; height: ' + d.headerHeight + 'px');
        ganttChartRoot.appendChild(j);
        var k = ownerDocument.createElement('div');
        k.setAttribute('style', 'float: left; width: ' + l + 'px; overflow: auto' + (d.horizontalGridLines ? '; border-bottom: 1px solid ' + d.horizontalGridLines + '; margin-bottom: -1px; ; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box' : ''));
        q.appendChild(k);
        if (typeof d.extraSpaceHeight !== 'undefined') {
          var o = ownerDocument.createElement('div');
          o.setAttribute('style', 'overflow: hidden; width: ' +
            l + 'px; height: ' + d.extraSpaceHeight + 'px');
          q.appendChild(o);
        }
        var t = calculateBarX(d.timelineFinish, d), p = ownerDocument.createElement('div');
        p.setAttribute('style', 'background: ' + d.headerBackground + '; border-bottom: solid 1px ' + d.border + '; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: ' + t + 'px; height: ' + d.headerHeight + 'px');
        n.appendChild(p);
        var w = ownerDocument.createElement('div');
        w.setAttribute('style', 'float: left; overflow: hidden; width: ' + t + 'px; height: 0px');
        M.appendChild(w);
        var x = ownerDocument.createElementNS('http://www.w3.org/2000/svg',
          'svg');
        x.setAttribute('style', 'width: ' + t + 'px; height: 0px');
        l = d.styleDefinitionTemplate(chartView);
        x.appendChild(l);
        x.chartAreaDefinitions = l;
        l = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'g');
        x.appendChild(l);
        w.chartAreaAlternativeRows = l;
        l = function() {
          setTimeout(function() {
            try {
              var a = w.chartArea, c = a.chartAreaDefinitions;
              a.removeChild(c);
              a.childNodes.length > 0 ? a.insertBefore(c, a.childNodes[0]) : a.appendChild(c);
            } catch (b) {
            }
          }, 0);
        };
        x.addEventListener('mousedown', l, true);
        ownerDocument.addEventListener('mouseup', l, true);
        chartView.resetChartAreaDefinitions =
          l;
        w.appendChild(x);
        w.chartArea = x;
        if (typeof d.extraSpaceHeight !== 'undefined') {
          l = ownerDocument.createElement('div');
          l.setAttribute('style', 'overflow: hidden; width: ' + t + 'px; height: ' + d.extraSpaceHeight + 'px');
          M.appendChild(l);
          M.chartExtraSpace = l;
        }
        var r, A, y;
        setTimeout(function() {
          r = chartView.offsetWidth;
          A = chartView.offsetHeight;
          y = ganttChartRightPanel.offsetHeight;
        }, 0);
        typeof chartView.splitterUpdateTimer !== 'undefined' && clearInterval(chartView.splitterUpdateTimer);
        chartView.splitterUpdateTimer = setInterval(function() {
          try {
            if (typeof barsChartContainer.x === 'undefined' && !(chartView.offsetWidth <= 0)) {
              var c =
                chartView.offsetWidth, b = ganttChartRightPanel.offsetHeight, f = window.screen.deviceXDPI;
              if (c != r || f != window.screen.deviceXDPI) {
                var m = typeof ganttChartLeftPanel.percent !== 'undefined' ? ganttChartLeftPanel.percent * c : ganttChartLeftPanel.offsetWidth, h = ganttChartRightPanel.offsetWidth,
                  e = Math.max(1, d.minGridWidth), n = Math.max(1, d.minChartWidth);
                if (m < e) {
                  h = h - (e - m);
                  m = e;
                } else if (h < n) {
                  m = m - (n - h);
                  h = n;
                }
                m < 1 && (m = 1);
                h < 1 && (h = 1);
                var l = Math.floor(m * 1E6 / c) / 1E4;
                ganttChartLeftPanel.percent = l / 100;
                ganttChartLeftPanel.style.width = l + '%';
                ganttChartRightPanel.style.width = 100 - l + '%';
                d.gridWidth = ganttChartLeftPanel.offsetWidth + 'px';
                d.chartWidth = ganttChartRightPanel.offsetWidth + 'px';
                Ba(barsChartContainer, ganttChartLeftPanel, d);
                if (typeof d.splitterPositionChangeHandler !== 'undefined') {
                  var g =
                    ganttChartLeftPanel.offsetWidth, s = ganttChartRightPanel.offsetWidth;
                  g > 0 && s > 0 && setTimeout(function() {
                    d.splitterPositionChangeHandler(g, s);
                  }, 0);
                }
                r = c;
                A = b;
              } else if (b != y) {
                Ba(barsChartContainer, ganttChartLeftPanel, d);
                y = b;
              }
            }
          } catch (q) {
            try {
              clearInterval(chartView.splitterUpdateTimer);
            } catch (M) {
            }
          }
        }, 100);
        typeof chartView.heightUpdateTimer !== 'undefined' && clearInterval(chartView.heightUpdateTimer);
        chartView.heightUpdateTimer = setInterval(function() {
          try {
            if (!(chartView.clientHeight <= 0)) {
              var b = chartView.clientHeight;
              if (b != A) {
                var f = P(chartView, c, d);
                q.style.height = f;
                M.style.height = f;
                Ba(barsChartContainer, ganttChartLeftPanel, d);
                if (M.style.height != 'auto') w.availableHeight = M.clientHeight;
                ta(w, ua(c, d));
                va(c, M, d);
                A = b;
              }
            }
          } catch (m) {
            try {
              clearInterval(chartView.heightUpdateTimer);
            } catch (h) {
            }
          }
        }, 100);
        var z = function(a, b, f, m, h, e) {
          var n;
          if (d.mouseHandler || d.mouseMoveHandler && e == 'mousemove' || d.mouseDownHandler && e == 'mousedown' || (d.clickHandler || d.itemClickHandler || d.chartClickHandler || d.chartItemClickHandler) && e == 'click' || (d.doubleClickHandler || d.itemDoubleClickHandler || d.chartDoubleClickHandler || d.chartItemDoubleClickHandler) && e == 'dblclick') {
            var l = a.which;
            !l && a.button && (a.button & 1 ? l = 1 : a.button & 4 ? l = 2 : a.button &
              2 && (l = 3));
            n = h.getBoundingClientRect();
            var g = ownerDocument.body, v = ownerDocument.documentElement,
              h = n.left + (window.pageXOffset || v.scrollLeft || g.scrollLeft) - (v.clientLeft || g.clientLeft || 0);
            n = Math.round(n.top + (window.pageYOffset || v.scrollTop || g.scrollTop) - (v.clientTop || g.clientTop || 0));
            var h = Math.round(h), h = a.pageX - h, v = a.pageY - n, q = n = 0, u, C;
            if (f) for (g = 0; g < c.length; g++) {
              q = c[g];
              if (q.isVisible && !(typeof q.isHidden !== 'undefined' && q.isHidden)) {
                q = q.itemTop + d.itemHeight;
                if (v <= q) {
                  u = c[g];
                  break;
                }
              }
            } else if (b) {
              for (var M = d.scales, k = 0, j, g = 0; g <
              M.length; g++) {
                j = M[g];
                (typeof j.isHeaderVisible === 'undefined' || j.isHeaderVisible) && k++;
              }
              var p = d.headerHeight;
              k > 0 && (p = d.headerHeight / k);
              for (g = 0; g < M.length; g++) {
                j = M[g];
                if (typeof j.isHeaderVisible === 'undefined' || j.isHeaderVisible) {
                  k = p;
                  if (typeof j.headerHeight !== 'undefined') k = j.headerHeight;
                  q = q + k;
                  if (v <= q) {
                    u = j;
                    break;
                  }
                }
              }
            }
            if (b) C = Ca(h, d); else {
              v = d.columns;
              for (g = 0; g < v.length; g++) {
                q = v[g];
                n = n + (q.width ? q.width : 0);
                if (h <= n) {
                  C = q;
                  break;
                }
              }
            }
            d.mouseHandler && d.mouseHandler(e, f, b, u, C, l, m, a);
            d.mouseMoveHandler && e == 'mousemove' &&
            d.mouseMoveHandler(f, b, u, C);
            d.mouseDownHandler && e == 'mousedown' && d.mouseDownHandler(f, b, u, C, l);
            d.clickHandler && e == 'click' && d.clickHandler(f, b, u, C);
            d.doubleClickHandler && e == 'dblclick' && d.doubleClickHandler(f, b, u, C);
            d.itemClickHandler && (e == 'click' && f && u) && d.itemClickHandler(b, u, C);
            d.itemDoubleClickHandler && (e == 'dblclick' && f && u) && d.itemDoubleClickHandler(b, u, C);
            d.chartClickHandler && (e == 'click' && b) && d.chartClickHandler(f, u, C);
            d.chartDoubleClickHandler && (e == 'dblclick' && b) && d.chartDoubleClickHandler(f, u,
              C);
            d.chartItemClickHandler && (e == 'click' && f && b) && d.chartItemClickHandler(u, C);
            d.chartItemDoubleClickHandler && (e == 'dblclick' && f && b) && d.chartItemDoubleClickHandler(u, C);
          }
        };
        j.addEventListener('mousemove', function(a) {
          z(a, false, false, 0, j, 'mousemove');
        });
        j.addEventListener('mousedown', function(a) {
          z(a, false, false, 1, j, 'mousedown');
        });
        j.addEventListener('click', function(a) {
          z(a, false, false, 1, j, 'click');
        });
        j.addEventListener('dblclick', function(a) {
          z(a, false, false, 2, j, 'dblclick');
        });
        k.addEventListener('mousemove',
          function(a) {
            z(a, false, true, 0, k, 'mousemove');
          });
        k.addEventListener('mousedown', function(a) {
          z(a, false, true, 1, k, 'mousedown');
        });
        k.addEventListener('click', function(a) {
          z(a, false, true, 1, k, 'click');
        });
        k.addEventListener('dblclick', function(a) {
          z(a, false, true, 2, k, 'dblclick');
        });
        p.addEventListener('mousemove', function(a) {
          z(a, true, false, 0, p, 'mousemove');
        });
        p.addEventListener('mousedown', function(a) {
          z(a, true, false, 1, p, 'mousedown');
        });
        p.addEventListener('click', function(a) {
          z(a, true, false, 1, p, 'click');
        });
        p.addEventListener('dblclick',
          function(a) {
            z(a, true, false, 2, p, 'dblclick');
          });
        w.addEventListener('mousemove', function(a) {
          z(a, true, true, 0, w, 'mousemove');
        });
        w.addEventListener('mousedown', function(a) {
          z(a, true, true, 1, w, 'mousedown');
        });
        w.addEventListener('click', function(a) {
          z(a, true, true, 1, w, 'click');
        });
        w.addEventListener('dblclick', function(a) {
          z(a, true, true, 2, w, 'dblclick');
        });
        k.container = q;
        w.container = M;
        j.container = ganttChartRoot;
        p.container = n;
        chartView.gridContainer = ganttChartLeftPanel;
        chartView.chartContainer = ganttChartRightPanel;
        chartView.gridContent = k;
        chartView.chartContent = w;
        chartView.gridContentContainer = q;
        chartView.chartContentContainer =
          M;
        chartView.gridHeader = j;
        chartView.chartHeader = p;
        chartView.gridHeaderContainer = ganttChartRoot;
        chartView.chartHeaderContainer = n;
        chartView.splitter = barsChartContainer;
        M.isInitializing = true;
        l = J(c, d);
        vc(chartView, e);
        if (M.style.height != 'auto') w.availableHeight = M.clientHeight;
        wc(j, b, d);
        eb(p, x, scales, d);
        xc(k, w, x, c, b, l, d);
        Ba(barsChartContainer, ganttChartLeftPanel, d);
        M.isInitializing = false;
        va(c, M, d);
        M.scrollLeft = calculateBarX(d.displayedTime, d);
        if (n.scrollLeft != M.scrollLeft) n.scrollLeft = M.scrollLeft;
        yc(chartView, q, ganttChartLeftPanel, ganttChartRoot, g, k, M, n, ganttChartRightPanel, ganttChartHeader, w, barsChartContainer, c, d);
        var B = false, D = function(a, b) {
          typeof b === 'undefined' && (b = 0);
          if (d.hourWidth != a) {
            B = true;
            var f = M.scrollLeft,
              m = b, h = d.hourWidth;
            d.hourWidth = a;
            typeof d.hourWidthChangeHandler !== 'undefined' && setTimeout(function() {
              d.hourWidthChangeHandler(d.hourWidth);
            }, 0);
            t = calculateBarX(d.timelineFinish, d);
            p.style.width = t + 'px';
            w.style.width = t + 'px';
            x.style.width = t + 'px';
            if (typeof M.chartExtraSpace !== 'undefined') M.chartExtraSpace.style.width = t + 'px';
            var e;
            for (e = p.childNodes.length; e-- > 0;) p.removeChild(p.childNodes[e]);
            var n = [];
            for (e = x.childNodes.length; e-- > 1;) {
              var l = x.childNodes[e];
              if (l != w.chartAreaAlternativeRows) {
                l.tag != 'Scale-Highlighting' &&
                (l.tag != 'Scale-Highlighting-CurrentTime' && l.tag != 'Scale-Separator' && l.tag != 'Scale-Separator-CurrentTime') && n.push(l);
                x.removeChild(l);
              }
            }
            eb(p, x, d.scales, d);
            for (e = 0; e < c.length; e++) {
              l = c[e];
              (!d.isVirtualizing || typeof l.isVirtuallyVisible !== 'undefined' && l.isVirtuallyVisible) && fa(l.chartItem, l, d);
            }
            for (e = n.length; e-- > 0;) x.appendChild(n[e]);
            ta(w, ua(c, d));
            M.scrollLeft = m * (a / h) - (m - f);
            setTimeout(function() {
              B = false;
            }, 200);
          }
        };
        chartView.setHourWidth = D;
        if (typeof d.isMouseWheelZoomEnabled === 'undefined' || d.isMouseWheelZoomEnabled) {
          b =
            function(b) {
              b.preventDefault();
              b.stopPropagation();
              if (!B) {
                var c = typeof b.wheelDelta !== 'undefined' ? b.wheelDelta >= 0 ? 1 : -1 : typeof b.detail !== 'undefined' ? -b.detail >= 0 ? 1 : -1 : 0,
                  d = chartView.settings, f = d.hourWidth,
                  m = typeof d.isMouseWheelZoomEnabledMinHourWidth !== 'undefined' ? d.isMouseWheelZoomEnabledMinHourWidth : 1;
                if (c < 0) f = f / (1.2 * -c); else if (c > 0) {
                  f = f * 1.2 * c;
                  c = typeof d.isMouseWheelZoomEnabledMaxHourWidth !== 'undefined' ? d.isMouseWheelZoomEnabledMaxHourWidth : 20;
                  f > c && (f = c);
                }
                f < m && (f = m);
                D(f, b.offsetX);
              }
            };
          x.addEventListener('mousewheel',
            b, false);
          x.addEventListener('DOMMouseScroll', b, false);
        }
        chartView.isInitializing = false;
        chartView.isInitialized = true;
        return chartView;
      }
    }, ganttChartViewRefresh = function(a) {
      ganttChartViewInit(a, a.items, a.settings, a.license);
    }, $ = function(a) {
      if (typeof a.dateTimePickerType === 'undefined') a.dateTimePickerType = 'text';
      if (typeof a.useDatePicker === 'undefined') a.useDatePicker = true;
      if (typeof a.useTimePicker === 'undefined') a.useTimePicker = true;
      if (typeof a.useResourceSelector === 'undefined') a.useResourceSelector = true;
      if (typeof a.useUpdatingToolTips === 'undefined') a.useUpdatingToolTips = true;
      if (typeof a.dateFormatter === 'undefined') a.dateFormatter = U;
      if (typeof a.dateTimeFormatter === 'undefined') a.dateTimeFormatter = ja;
      if (typeof a.dateTimeParser === 'undefined') a.dateTimeParser = r;
      if (typeof a.itemPropertyChangeHandler === 'undefined') a.itemPropertyChangeHandler = function() {
      };
      if (typeof a.target === 'undefined') a.target = 'Standard';
      if (typeof a.theme === 'undefined') a.theme = 'Modern';
      if (typeof a.isGridVisible === 'undefined') switch (a.target) {
        default:
          a.isGridVisible = true;
          break;
        case 'Phone':
          a.isGridVisible =
            false;
      }
      if (typeof a.interaction === 'undefined') a.interaction = a.target != 'Phone' ? 'Standard' : 'TouchEnabled';
      if (typeof a.isSplitterEnabled === 'undefined') a.isSplitterEnabled = true;
      if (typeof a.isReadOnly === 'undefined') a.isReadOnly = false;
      if (typeof a.isGridReadOnly === 'undefined') a.isGridReadOnly = false;
      if (typeof a.isChartReadOnly === 'undefined') a.isChartReadOnly = false;
      if (typeof a.isContentReadOnly === 'undefined') a.isContentReadOnly = false;
      if (typeof a.isAssignmentsContentReadOnly === 'undefined') a.isAssignmentsContentReadOnly =
        false;
      if (typeof a.isIndividualItemNonworkingTimeHighlighted === 'undefined') a.isIndividualItemNonworkingTimeHighlighted = false;
      if (typeof a.areTaskInterruptionsHighlighted === 'undefined') a.areTaskInterruptionsHighlighted = false;
      if (typeof a.areTaskDependencyConstraintsEnabled === 'undefined') a.areTaskDependencyConstraintsEnabled = false;
      if (typeof a.selectionMode === 'undefined') a.selectionMode = 'Focus';
      if (typeof a.isVirtualizing === 'undefined') a.isVirtualizing = true;
    }, O = function(a, c, d) {
      $(a);
      if (typeof a.gridWidth ===
        'undefined') a.gridWidth = '35%';
      if (typeof a.chartWidth === 'undefined') a.chartWidth = a.isGridVisible ? '65%' : '100%';
      if (typeof a.minGridWidth === 'undefined') a.minGridWidth = 32;
      if (typeof a.minColumnWidth === 'undefined') a.minColumnWidth = 32;
      if (typeof a.minChartWidth === 'undefined') a.minChartWidth = 36;
      if (typeof a.border === 'undefined') switch (a.theme) {
        default:
          a.border = '#D3DFF0';
          break;
        case 'ModernBordered':
        case 'Aero':
          a.border = '#9a9a9a';
      }
      if (typeof a.splitterWidth === 'undefined') a.splitterWidth = 4;
      if (typeof a.splitterBackground ===
        'undefined') a.splitterBackground = a.border;
      if (typeof a.indentationLevelWidth === 'undefined') a.indentationLevelWidth = 16;
      if (typeof a.itemHeight === 'undefined') a.itemHeight = 21;
      if (typeof a.headerBackground === 'undefined') a.headerBackground = '#f4f4f4';
      if (typeof a.headerHeight === 'undefined') a.headerHeight = 42;
      if (typeof a.columns === 'undefined') a.columns = o(c, a);
      if (typeof a.toggleButtonStyle === 'undefined' && a.toggleButtonClass == null) a.toggleButtonStyle = 'fill: Gray';
      if (typeof a.toggleButtonHoveringStyle === 'undefined' &&
        a.toggleButtonHoveringClass == null) a.toggleButtonHoveringStyle = 'fill: Black';
      if (typeof a.collapsedToggleButtonTemplate === 'undefined') a.collapsedToggleButtonTemplate = zb(d, a);
      if (typeof a.expandedToggleButtonTemplate === 'undefined') a.expandedToggleButtonTemplate = Ab(d, a);
      if (typeof a.gridLines !== 'undefined') {
        if (typeof a.horizontalGridLines === 'undefined') a.horizontalGridLines = a.gridLines;
        if (typeof a.verticalGridLines === 'undefined') a.verticalGridLines = a.gridLines;
        if (typeof a.horizontalChartLines === 'undefined') a.horizontalChartLines =
          a.gridLines;
      }
      if (typeof a.itemStyle === 'undefined' && typeof a.horizontalGridLines !== 'undefined') {
        a.itemStyle = 'border-top: solid 1px ' + a.horizontalGridLines + '; margin-top: -1px; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box';
        if (typeof a.cellStyle === 'undefined') a.cellStyle = typeof a.verticalGridLines !== 'undefined' ? 'border-right: solid 1px ' + a.verticalGridLines + '; height: ' + a.itemHeight + 'px; padding-top: 2px; padding-left: 2px' : 'height: ' + a.itemHeight + 'px; padding-top: 2px';
      }
      if (typeof a.cellStyle ===
        'undefined' && typeof a.verticalGridLines !== 'undefined') a.cellStyle = 'border-right: solid 1px ' + a.verticalGridLines + '; height: ' + a.itemHeight + 'px; padding-top: 3px; padding-left: 2px';
      if (typeof a.selectedItemStyle === 'undefined' && a.selectedItemClass == null) switch (a.theme) {
        default:
          a.selectedItemStyle = typeof a.horizontalGridLines !== 'undefined' || typeof a.verticalGridLines === 'undefined' ? 'background-color: #f4f4f4; border-top: solid 1px ' + (typeof a.horizontalGridLines !== 'undefined' ? a.horizontalGridLines : 'White') +
            '; margin-top: -1px; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box' : 'background-color: #f4f4f4';
          break;
        case 'Aero':
          a.selectedItemStyle = typeof a.horizontalGridLines !== 'undefined' || typeof a.verticalGridLines === 'undefined' ? 'background-color: LightBlue; border-top: solid 1px ' + (typeof a.horizontalGridLines !== 'undefined' ? a.horizontalGridLines : 'White') + '; margin-top: -1px; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box' : 'background-color: LightBlue';
      }
      if (typeof a.summaryItemStyle ===
        'undefined' && a.summaryItemClass == null) a.summaryItemStyle = 'font-weight: bold';
      if (typeof a.daysOfWeek === 'undefined') a.daysOfWeek = daysOfWeek;
      if (typeof a.months === 'undefined') a.months = I;
      if (typeof a.weekStartDay === 'undefined') a.weekStartDay = 0;
      if (typeof a.currentTime === 'undefined') a.currentTime = new Date; else if (typeof a.currentTime === 'string') try {
        a.currentTime = new Date(a.currentTime);
      } catch (b) {
        a.currentTime = new Date(parseInt(a.currentTime));
      }
      if (typeof a.displayedTime === 'string') try {
        a.displayedTime = new Date(a.displayedTime);
      } catch (f) {
        a.displayedTime =
          new Date(parseInt(a.displayedTime));
      }
      if (typeof a.timelineStart === 'string') try {
        a.timelineStart = new Date(a.timelineStart);
      } catch (e) {
        a.timelineStart = new Date(parseInt(a.timelineStart));
      }
      if (typeof a.timelineFinish === 'string') try {
        a.timelineFinish = new Date(a.timelineFinish);
      } catch (g) {
        a.timelineFinish = new Date(parseInt(a.timelineFinish));
      }
      if (typeof a.isRelativeToTimezone === 'undefined' || a.isRelativeToTimezone) {
        a.currentTime = new Date(a.currentTime.valueOf() - a.currentTime.getTimezoneOffset() * 6E4);
        if (typeof a.displayedTime !==
          'undefined') a.displayedTime = new Date(a.displayedTime.valueOf() - a.displayedTime.getTimezoneOffset() * 6E4);
        if (typeof a.timelineStart !== 'undefined') a.timelineStart = new Date(a.timelineStart.valueOf() - a.timelineStart.getTimezoneOffset() * 6E4);
        if (typeof a.timelineFinish !== 'undefined') a.timelineFinish = new Date(a.timelineFinish.valueOf() - a.timelineFinish.getTimezoneOffset() * 6E4);
        if (typeof a.scales !== 'undefined') for (c = 0; c < a.scales.length; c++) {
          var m = a.scales[c];
          if (typeof m.intervals !== 'undefined') for (var h = 0; h <
          m.intervals.length; h++) {
            var n = m.intervals[h];
            if (typeof n.start !== 'undefined') n.start = new Date(n.start.valueOf() - n.start.getTimezoneOffset() * 6E4);
            if (typeof n.finish !== 'undefined') n.finish = new Date(n.finish.valueOf() - n.finish.getTimezoneOffset() * 6E4);
          }
        }
        a.isRelativeToTimezone = false;
      }
      if (typeof a.schedule !== 'undefined' && a.schedule != null) {
        if (a.schedule != a.previousSchedule || a.schedule.workingWeekStart != a.previousSchedule.workingWeekStart) a.workingWeekStart = a.schedule.workingWeekStart;
        if (a.schedule != a.previousSchedule ||
          a.schedule.workingWeekFinish != a.previousSchedule.workingWeekFinish) a.workingWeekFinish = a.schedule.workingWeekFinish;
        if (a.schedule != a.previousSchedule || a.schedule.workingDayStart != a.previousSchedule.workingDayStart) a.visibleDayStart = a.schedule.workingDayStart;
        if (a.schedule != a.previousSchedule || a.schedule.workingDayFinish != a.previousSchedule.workingDayFinish) a.visibleDayFinish = a.schedule.workingDayFinish;
        if (a.schedule != a.previousSchedule || a.schedule.specialNonworkingDays != a.previousSchedule.specialNonworkingDays) a.specialNonworkingDays =
          a.schedule.specialNonworkingDays;
      }
      a.timelineStart = typeof a.timelineStart === 'undefined' ? new Date(wa(a.currentTime, a.weekStartDay).valueOf() - 6048E5) : wa(a.timelineStart, a.weekStartDay);
      a.timelineFinish = typeof a.timelineFinish === 'undefined' ? new Date(wa(a.currentTime, a.weekStartDay).valueOf() + 320544E5) : fb(a.timelineFinish, a.weekStartDay);
      if (!a.isExport && typeof a.specialNonworkingDays !== 'undefined') for (c = 0; c < a.specialNonworkingDays.length; c++) a.specialNonworkingDays[c] = Y(new Date(a.specialNonworkingDays[c].valueOf() -
        (a.specialNonworkingDays[c].getTimezoneOffset() < 0 ? a.specialNonworkingDays[c].getTimezoneOffset() : 0) * 6E4));
      if (!a.isExport && typeof a.resourceSchedules !== 'undefined') for (m = 0; m < a.resourceSchedules.length; m++) {
        h = a.resourceSchedules[m].value;
        if (typeof h.specialNonworkingDays !== 'undefined') for (c = 0; c < h.specialNonworkingDays.length; c++) h.specialNonworkingDays[c] = Y(new Date(h.specialNonworkingDays[c].valueOf() - (h.specialNonworkingDays[c].getTimezoneOffset() < 0 ? h.specialNonworkingDays[c].getTimezoneOffset() :
          0) * 6E4));
      }
      if (typeof a.scales === 'undefined') a.scales = Bb(a);
      if (typeof a.updateScale === 'undefined') a.updateScale = 9E5;
      if (typeof a.hourWidth === 'undefined') a.hourWidth = 2.5;
      if (typeof a.displayedTime === 'undefined') {
        a.displayedTime = a.currentTime;
        setTimeout(function() {
          var b = d.chartContentContainer.scrollLeft - a.hourWidth * 12;
          if (d.chartContentContainer.scrollLeft - b < d.chartContentContainer.clientWidth / 3) d.chartContentContainer.scrollLeft = Math.max(0, b);
        }, 0);
      }
      a.previousSchedule = a.schedule;
      if (typeof a.visibleDayStart ===
        'undefined') a.visibleDayStart = 288E5;
      if (typeof a.visibleDayFinish === 'undefined') a.visibleDayFinish = 576E5;
      if (a.visibleDayStart >= a.visibleDayFinish) {
        a.visibleWeekStart = 0;
        a.visibleWeekFinish = 864E5;
      }
      if (typeof a.visibleWeekStart === 'undefined') a.visibleWeekStart = 0;
      if (typeof a.visibleWeekFinish === 'undefined') a.visibleWeekFinish = 6;
      if (a.visibleWeekStart > a.visibleWeekFinish) if (a.visibleWeekStart == a.visibleWeekFinish + 1) {
        a.visibleWeekStart = 0;
        a.visibleWeekFinish = 6;
      } else a.visibleWeekFinish = a.visibleWeekStart;
      if (typeof a.workingWeekStart ===
        'undefined') a.workingWeekStart = 1;
      if (typeof a.workingWeekFinish === 'undefined') a.workingWeekFinish = 5;
      if (a.workingWeekStart > a.workingWeekFinish) if (a.workingWeekStart == a.workingWeekFinish + 1) {
        a.workingWeekStart = 0;
        a.workingWeekFinish = 6;
      } else a.workingWeekFinish = a.workingWeekStart;
      a.workingDayStart = a.visibleDayStart;
      a.workingDayFinish = a.visibleDayFinish;
      if (typeof a.barMargin === 'undefined') a.barMargin = a.itemHeight / 4;
      if (typeof a.barHeight === 'undefined') a.barHeight = a.itemHeight - a.barMargin * 2;
      if (typeof a.barCornerRadius ===
        'undefined') switch (a.theme) {
        default:
          a.barCornerRadius = 0;
          break;
        case 'Aero':
          a.barCornerRadius = 3;
      }
      if (typeof a.completedBarMargin === 'undefined') a.completedBarMargin = a.barHeight / 2.5;
      if (typeof a.completedBarHeight === 'undefined') a.completedBarHeight = a.barHeight - a.completedBarMargin * 2;
      if (typeof completedBarCornerRadius === 'undefined') a.completedBarCornerRadius = 0;
      if (typeof a.styleDefinitionTemplate === 'undefined') a.styleDefinitionTemplate = Cb(d, a);
      if (typeof a.standardBarStyle === 'undefined' && a.standardBarClass ==
        null) switch (a.theme) {
        default:
          a.standardBarStyle = 'fill: #8abbed; fill-opacity: 0.8; stroke: #8abbed; stroke-width: 0.65px';
          break;
        case 'ModernBordered':
          a.standardBarStyle = 'fill: #8abbed; fill-opacity: 0.8; stroke: Blue; stroke-width: 0.65px';
          break;
        case 'Aero':
          a.standardBarStyle = 'fill: url(#BlueGradient); fill-opacity: 0.8; stroke: Blue';
      }
      if (typeof a.standardCompletedBarStyle === 'undefined' && a.standardCompletedBarClass == null) switch (a.theme) {
        default:
          a.standardCompletedBarStyle = 'fill: #3b87d9; stroke: #3b87d9; stroke-width: 0.65px';
          break;
        case 'Aero':
          a.standardCompletedBarStyle = 'fill: #808080; stroke: #202020; stroke-width: 0.65px';
      }
      if (typeof a.summaryBarStyle === 'undefined' && a.summaryBarClass == null) switch (a.theme) {
        default:
          a.summaryBarStyle = 'fill: #607080; stroke: #607080; stroke-width: 0.65px';
          break;
        case 'ModernBordered':
          a.summaryBarStyle = 'fill: #607080; stroke: #202020; stroke-width: 0.65px';
          break;
        case 'Aero':
          a.summaryBarStyle = 'fill: url(#BlackGradient); stroke: Black';
      }
      if (typeof a.collapsedSummaryLineStyle === 'undefined' && a.collapsedSummaryLineClass ==
        null) a.collapsedSummaryLineStyle = 'stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2 2';
      if (typeof a.milestoneBarStyle === 'undefined' && a.milestoneBarClass == null) switch (a.theme) {
        default:
          a.milestoneBarStyle = 'fill: #607080; stroke: #607080; stroke-width: 0.65px';
          break;
        case 'ModernBordered':
          a.milestoneBarStyle = 'fill: #607080; stroke: #202020; stroke-width: 0.65px';
          break;
        case 'Aero':
          a.milestoneBarStyle = 'fill: url(#BlackGradient); stroke: Black';
      }
      if (typeof a.baselineBarStyle === 'undefined' && a.baselineBarClass ==
        null) switch (a.theme) {
        default:
          a.baselineBarStyle = 'fill: none; stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2, 2';
          break;
        case 'Aero':
          a.baselineBarStyle = 'fill: none; stroke: Blue; stroke-dasharray: 2, 2';
      }
      if (typeof a.dependencyPointerStyle === 'undefined' && a.dependencyPointerClass == null) switch (a.theme) {
        default:
          a.dependencyPointerStyle = 'fill: #3b87d9; stroke: #3b87d9; stroke-width: 0.65px';
          break;
        case 'Aero':
          a.dependencyPointerStyle = 'fill: Blue; stroke: Blue';
      }
      if (typeof a.dependencyLineStyle ===
        'undefined' && a.dependencyLineClass == null) switch (a.theme) {
        default:
          a.dependencyLineStyle = 'stroke: #3b87d9; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)';
          break;
        case 'Aero':
          a.dependencyLineStyle = 'stroke: Blue; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)';
      }
      if (typeof a.dependencyLineZoneStyle === 'undefined' && a.dependencyLineZoneClass == null) a.dependencyLineZoneStyle = 'stroke: White; stroke-opacity: 0; stroke-width: 4px; fill: none';
      if (typeof a.temporaryDependencyLineStyle ===
        'undefined' && a.temporaryDependencyLineClass == null) switch (a.theme) {
        default:
          a.temporaryDependencyLineStyle = 'stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2, 2; fill: none; marker-end: url(#ArrowMarker)';
          break;
        case 'Aero':
          a.temporaryDependencyLineStyle = 'stroke: Blue; stroke-width: 0.65px; stroke-dasharray: 2, 2; fill: none; marker-end: url(#ArrowMarker)';
      }
      if (typeof a.assignmentsStyle === 'undefined' && a.assignmentsClass == null) a.assignmentsStyle = 'stroke-width: 0.25px; font-size: x-small';
      if (typeof a.standardTaskTemplate ===
        'undefined') a.standardTaskTemplate = StandardTaskTemplateFactory();
      if (typeof a.summaryTaskTemplate === 'undefined') a.summaryTaskTemplate = Eb();
      if (typeof a.milestoneTaskTemplate === 'undefined') a.milestoneTaskTemplate = Fb();
      if (typeof a.horizontalChartLines !== 'undefined') {
        var l = a.internalPreTaskTemplate;
        a.internalPreTaskTemplate = function(b) {
          if (typeof b.scheduleChartItem !== 'undefined') return typeof l !== 'undefined' ? l(b) : null;
          var c = b.ganttChartView.ownerDocument, d = c.createElementNS('http://www.w3.org/2000/svg', 'g');
          typeof l !== 'undefined' &&
          d.appendChild(l(b));
          var f = c.createElementNS('http://www.w3.org/2000/svg', 'line');
          f.setAttribute('x1', 0);
          f.setAttribute('y1', -0.5);
          f.setAttribute('x2', calculateBarX(a.timelineFinish, a));
          f.setAttribute('y2', -0.5);
          f.setAttribute('style', 'stroke: ' + a.horizontalChartLines + '; stroke-width: 0.5px');
          d.appendChild(f);
          if (b.index == b.ganttChartView.items.length - 1) {
            f = c.createElementNS('http://www.w3.org/2000/svg', 'line');
            f.setAttribute('x1', 0);
            f.setAttribute('y1', a.itemHeight + 0.5);
            f.setAttribute('x2', calculateBarX(a.timelineFinish, a));
            f.setAttribute('y2', a.itemHeight + 0.5);
            f.setAttribute('style', 'stroke: ' + a.horizontalChartLines + '; stroke-width: 0.5px');
            d.appendChild(f);
          }
          return d;
        };
      }
      if (typeof a.isTaskToolTipVisible === 'undefined') switch (a.target) {
        default:
          a.isTaskToolTipVisible = true;
          break;
        case 'Phone':
          a.isTaskToolTipVisible = false;
      }
      if (typeof a.itemTemplate === 'undefined') a.itemTemplate = CreateTitleNode(a);
      if (typeof a.areTaskAssignmentsVisible === 'undefined') a.areTaskAssignmentsVisible = true;
      if (typeof a.assignmentsTemplate === 'undefined') a.assignmentsTemplate =
        Hb();
      if (typeof a.isTaskCompletedEffortVisible === 'undefined') a.isTaskCompletedEffortVisible = true;
      if (typeof a.areTaskDependenciesVisible === 'undefined') a.areTaskDependenciesVisible = true;
      if (typeof a.dependencyLineTemplate === 'undefined') a.dependencyLineTemplate = Ib();
      if (typeof a.isDependencyToolTipVisible === 'undefined') a.isDependencyToolTipVisible = a.isTaskToolTipVisible;
      if (typeof a.predecessorItemTemplate === 'undefined') a.predecessorItemTemplate = Jb(a);
      if (typeof a.isDraggingTaskStartEndsEnabled === 'undefined') a.isDraggingTaskStartEndsEnabled =
        true;
      if (typeof a.areTaskDependencyConstraintsEnabledWhileDragging === 'undefined') a.areTaskDependencyConstraintsEnabledWhileDragging = false;
      if (typeof a.isTaskStartReadOnly === 'undefined') a.isTaskStartReadOnly = false;
      if (typeof a.isTaskEffortReadOnly === 'undefined') a.isTaskEffortReadOnly = false;
      if (typeof a.isTaskCompletionReadOnly === 'undefined') a.isTaskCompletionReadOnly = false;
      if (typeof a.areTaskPredecessorsReadOnly === 'undefined') a.areTaskPredecessorsReadOnly = false;
      if (typeof a.isBaselineVisible === 'undefined') a.isBaselineVisible =
        true;
      var s = null;
      if (a.isIndividualItemNonworkingTimeHighlighted || a.areTaskInterruptionsHighlighted) for (c = 0; c < a.scales.length; c++) if (a.scales[c].scaleType == 'NonworkingTime') {
        s = a.scales[c];
        break;
      }
      if (s != null && a.isIndividualItemNonworkingTimeHighlighted) {
        var u = a.internalPreTaskTemplate;
        a.internalPreTaskTemplate = function(b) {
          if (typeof b.scheduleChartItem !== 'undefined') return typeof u !== 'undefined' ? u(b) : null;
          var c;
          c = D(b);
          if (typeof c === 'undefined') c = null; else {
            var d = [], f, m;
            f = gb(a.timelineStart, typeof c.workingWeekStart !==
            'undefined' ? c.workingWeekFinish : a.workingWeekFinish);
            for (m = hb(f, typeof c.workingWeekFinish !== 'undefined' ? c.workingWeekStart : a.workingWeekStart); f < a.timelineFinish; f = twoWeekDateOfsset(f), m = twoWeekDateOfsset(m)) d.push({
              start: f,
              finish: m,
            });
            if (typeof c.specialNonworkingDays !== 'undefined') for (var e = 0; e < c.specialNonworkingDays.length; e++) {
              f = c.specialNonworkingDays[e];
              m = aa(f);
              d.push({ start: f, finish: m });
            }
            c = d;
          }
          if (c == null || c.length == 0) return typeof u !== 'undefined' ? u(b) : null;
          d = b.ganttChartView.ownerDocument;
          f = d.createElementNS('http://www.w3.org/2000/svg',
            'g');
          for (m = 0; m < c.length; m++) {
            var e = c[m], h = e.finish, e = calculateBarX(e.start, a), h = calculateBarX(h, a) - e;
            if (!(h <= 0)) {
              var n = d.createElementNS('http://www.w3.org/2000/svg', 'rect');
              n.setAttribute('x', e - 1);
              n.setAttribute('y', 0);
              n.setAttribute('width', h);
              n.setAttribute('height', a.itemHeight);
              n.setAttribute('class', s.highlightingClass);
              n.setAttribute('style', s.highlightingStyle);
              f.appendChild(n);
            }
          }
          typeof u !== 'undefined' && f.appendChild(u(b));
          return f;
        };
      }
      if (s != null && a.areTaskInterruptionsHighlighted) {
        var v = a.internalExtraTaskTemplate;
        a.internalExtraTaskTemplate = function(b) {
          if (typeof b.scheduleChartItem !== 'undefined') return typeof v !== 'undefined' ? v(b) : null;
          var c;
          if (b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled) || b.isMilestone) c = null; else {
            var d = D(b);
            c = [];
            var f, m;
            f = gb(Y(b.start), typeof d !== 'undefined' && typeof d.workingWeekStart !== 'undefined' ? d.workingWeekFinish : a.workingWeekFinish);
            for (m = hb(f, typeof d !== 'undefined' && typeof d.workingWeekFinish !== 'undefined' ? d.workingWeekStart : a.workingWeekStart); f < b.finish; f =
              twoWeekDateOfsset(f), m = twoWeekDateOfsset(m)) c.push({ start: f >= b.start ? f : b.start, finish: m <= b.finish ? m : b.finish });
            d = typeof d !== 'undefined' && typeof d.specialNonworkingDays !== 'undefined' ? d.specialNonworkingDays : a.specialNonworkingDays;
            if (typeof d !== 'undefined') for (var e = 0; e < d.length; e++) {
              f = d[e];
              m = aa(f);
              f >= b.start && m <= b.finish && c.push({ start: f, finish: m });
            }
          }
          if (c == null || c.length == 0) return typeof v !== 'undefined' ? v(b) : null;
          f = b.ganttChartView.ownerDocument;
          m = f.createElementNS('http://www.w3.org/2000/svg', 'g');
          for (d = 0; d < c.length; d++) {
            var e =
              c[d], h = e.finish, e = calculateBarX(e.start, a), h = calculateBarX(h, a) - e;
            if (!(h <= 0)) {
              var n = f.createElementNS('http://www.w3.org/2000/svg', 'rect');
              n.setAttribute('x', e - 1);
              n.setAttribute('y', a.barMargin);
              n.setAttribute('width', h);
              n.setAttribute('height', a.barHeight);
              n.setAttribute('class', s.highlightingClass);
              n.setAttribute('style', s.highlightingStyle);
              m.appendChild(n);
            }
          }
          typeof v !== 'undefined' && m.appendChild(v(b));
          return m;
        };
      }
    }, ganttChartViewInitItems = function(a, c) {
      for (var d = 0; d < a.length; d++) {
        var b = a[d];
        if (typeof b === 'string') {
          b = { content: b };
          a[d] = b;
        }
        if (typeof b.indentation ===
          'string') b.indentation = parseInt(b.indentation);
        if (typeof b.isExpanded === 'string') b.isExpanded = b.isExpanded.toLowerCase() == 'true';
        if (typeof b.start === 'string') {
          try {
            b.start = new Date(b.start);
          } catch (f) {
            b.start = new Date(parseInt(b.start));
          }
          if (typeof c.isRelativeToTimezone === 'undefined' || c.isRelativeToTimezone) b.start = new Date(b.start.valueOf() + b.start.getTimezoneOffset() * 6E4);
          b.preferredStart = b.start;
        }
        if (typeof b.finish === 'string') {
          try {
            b.finish = new Date(b.finish);
          } catch (e) {
            b.finish = new Date(parseInt(b.finish));
          }
          if (typeof c.isRelativeToTimezone ===
            'undefined' || c.isRelativeToTimezone) b.finish = new Date(b.finish.valueOf() + b.finish.getTimezoneOffset() * 6E4);
        }
        if (typeof b.completedFinish === 'string') {
          try {
            b.completedFinish = new Date(b.completedFinish);
          } catch (g) {
            b.completedFinish = new Date(parseInt(b.completedFinish));
          }
          if (typeof c.isRelativeToTimezone === 'undefined' || c.isRelativeToTimezone) b.completedFinish = new Date(b.completedFinish.valueOf() + b.completedFinish.getTimezoneOffset() * 6E4);
        }
        if (typeof b.isMilestone === 'string') b.isMilestone = b.isMilestone.toLowerCase() ==
          'true';
        if (typeof b.baselineStart === 'string') {
          try {
            b.baselineStart = new Date(b.baselineStart);
          } catch (m) {
            b.baselineStart = new Date(parseInt(b.baselineStart));
          }
          if (typeof c.isRelativeToTimezone === 'undefined' || c.isRelativeToTimezone) b.baselineStart = new Date(b.baselineStart.valueOf() + b.baselineStart.getTimezoneOffset() * 6E4);
        }
        if (typeof b.baselineFinish === 'string') {
          try {
            b.baselineFinish = new Date(b.baselineFinish);
          } catch (h) {
            b.baselineFinish = new Date(parseInt(b.baselineFinish));
          }
          if (typeof c.isRelativeToTimezone === 'undefined' ||
            c.isRelativeToTimezone) b.baselineFinish = new Date(b.baselineFinish.valueOf() + b.baselineFinish.getTimezoneOffset() * 6E4);
        }
        if (typeof b.minStart === 'string') {
          try {
            b.minStart = new Date(b.minStart);
          } catch (n) {
            b.minStart = new Date(parseInt(b.minStart));
          }
          if (typeof c.isRelativeToTimezone === 'undefined' || c.isRelativeToTimezone) b.minStart = new Date(b.minStart.valueOf() + b.minStart.getTimezoneOffset() * 6E4);
        }
        if (typeof b.maxStart === 'string') {
          try {
            b.maxStart = new Date(b.maxStart);
          } catch (l) {
            b.maxStart = new Date(parseInt(b.maxStart));
          }
          if (typeof c.isRelativeToTimezone ===
            'undefined' || c.isRelativeToTimezone) b.maxStart = new Date(b.maxStart.valueOf() + b.maxStart.getTimezoneOffset() * 6E4);
        }
        if (typeof b.minFinish === 'string') {
          try {
            b.minFinish = new Date(b.minFinish);
          } catch (s) {
            b.minFinish = new Date(parseInt(b.minFinish));
          }
          if (typeof c.isRelativeToTimezone === 'undefined' || c.isRelativeToTimezone) b.minFinish = new Date(b.minFinish.valueOf() + b.minFinish.getTimezoneOffset() * 6E4);
        }
        if (typeof b.maxFinish === 'string') {
          try {
            b.maxFinish = new Date(b.maxFinish);
          } catch (u) {
            b.maxFinish = new Date(parseInt(b.maxFinish));
          }
          if (typeof c.isRelativeToTimezone ===
            'undefined' || c.isRelativeToTimezone) b.maxFinish = new Date(b.maxFinish.valueOf() + b.maxFinish.getTimezoneOffset() * 6E4);
        }
        if (typeof b.predecessors !== 'undefined') {
          if (typeof b.predecessors === 'string') b.predecessors = b.predecessors.split(',');
          for (var v = 0; v < b.predecessors.length; v++) {
            var C = b.predecessors[v];
            if (typeof C === 'string') {
              C = { item: C };
              b.predecessors[v] = C;
            }
            if (typeof C.item === 'string') {
              var q = parseInt(C.item) - 1;
              C.item = q >= 0 && q < a.length ? a[q] : null;
            }
            if (typeof C.lag === 'string') C.lag = parseFloat(C.lag);
          }
        }
        if (typeof b.schedule !==
          'undefined' && typeof b.schedule.specialNonworkingDays !== 'undefined') for (v = 0; v < b.schedule.specialNonworkingDays.length; v++) b.schedule.specialNonworkingDays[v] = Y(new Date(b.schedule.specialNonworkingDays[v].valueOf() - b.schedule.specialNonworkingDays[v].getTimezoneOffset() * 6E4));
        typeof b.wasGridItemContentLoaded !== 'undefined' && delete b.wasGridItemContentLoaded;
      }
    }, P = function(a, c, d) {
      var b;
      if (a.isContentHeightInitialized && a.isContentHeightAuto) b = c.length > 0 ? 'auto' : d.itemHeight + 'px'; else {
        var f = a.clientHeight -
          d.headerHeight - 2;
        f < 0 && (f = 0);
        b = f + 'px';
        if (f < d.itemHeight) {
          if (!a.isContentHeightInitialized) a.isContentHeightAuto = true;
          b = c.length > 0 ? 'auto' : d.itemHeight + 'px';
        }
        a.isContentHeightInitialized = true;
      }
      return b;
    }, J = function(a, c) {
      if (typeof c.toggleButtonAreaWidth !== 'undefined') return c.toggleButtonAreaWidth;
      var d = 0;
      if (c.isGridVisible) for (var b = 0; b < a.length; b++) if (a[b].indentation > 0) {
        d = 16;
        break;
      }
      return c.toggleButtonAreaWidth = d;
    }, wrapDateFmtValue = function(a, c) {
      var d = a.createElement('span');
      d.innerHTML = c;
      return d;
    }, W = function(a, c) {
      return c ==
      true ? a.createTextNode('\u2713') : a.createTextNode('');
    }, U = function(a) {
      var c = a.getFullYear(), d = a.getMonth() + 1;
      d < 10 && (d = '0' + d);
      a = a.getDate();
      a < 10 && (a = '0' + a);
      return d + '/' + a + '/' + c;
    }, ja = function(a) {
      var c = U(a), d = a.getHours();
      d < 10 && (d = '0' + d.toString());
      a = a.getMinutes();
      a < 10 && (a = '0' + a.toString());
      return c + ' ' + d + ':' + a;
    }, K = function(a) {
      return new Date(a.valueOf() + a.getTimezoneOffset() * 6E4);
    }, r = function(a) {
      var c = new Date;
      if (a == null || a == '') return c;
      var d, b, f, e;
      f = a.indexOf(' ');
      if (f >= 0) {
        d = a.substr(0, f);
        e = a.substr(f +
          1);
      } else {
        d = a;
        e = '0';
      }
      f = d.indexOf('/');
      if (f >= 0) {
        for (a = d.substr(0, f); a.length > 0 && a.substr(0, 1) == "0";) a = a.substr(1);
        a = parseInt(a) - 1;
        d = d.substr(f + 1);
        f = d.indexOf('/');
        if (f >= 0) {
          b = d.substr(0, f);
          for (f = d.substr(f + 1); f.length > 0 && f.substr(0, 1) == "0";) f = f.substr(1);
          d = parseInt(f);
        } else {
          b = d;
          d = c.getFullYear();
        }
        for (; b.length > 0 && b.substr(0, 1) == "0";) b = b.substr(1);
        b = parseInt(b);
      } else {
        for (; d.length > 0 && d.substr(0, 1) == "0";) d = d.substr(1);
        b = parseInt(d);
        a = c.getMonth();
        d = c.getFullYear();
      }
      var g;
      f = e.indexOf(':');
      if (f >= 0) {
        g = e.substr(0,
          f);
        e = e.substr(f + 1);
      } else {
        g = e;
        e = '0';
      }
      for (; g.length > 1 && g.substr(0, 1) == "0";) g = g.substr(1);
      for (f = parseInt(g); e.length > 1 && e.substr(0, 1) == "0";) e = e.substr(1);
      e = parseInt(e);
      return isNaN(d) || isNaN(a) || isNaN(b) || d <= 0 || a < 0 || a >= 12 || b < 1 || b > X[a] + (a != 1 || !(d % 400 == 0 || (d % 100 == 0 ? 0 : d % 4 == 0)) ? 0 : 1) ? isNaN(f) || isNaN(e) || f < 0 || f >= 24 || e < 0 || e >= 60 ? c : new Date(c.getFullYear(), c.getMonth(), c.getDate(), f, e, 0, 0) : isNaN(f) || isNaN(e) || f < 0 || f >= 24 || e < 0 || e >= 60 ? new Date(d, a, b, 0, 0, 0, 0) : new Date(d, a, b, f, e, 0, 0);
    }, k = function(a) {
      return new Date(a.valueOf() -
        a.getTimezoneOffset() * 6E4);
    }, j = function(a, c) {
      var d = a.ownerDocument, b = d.createElementNS('http://www.w3.org/2000/svg', 'svg');
      b.setAttribute('style', 'width: 12px; height: 12px');
      b.setAttribute('focusable', 'false');
      d = d.createElementNS('http://www.w3.org/2000/svg', 'rect');
      d.setAttribute('id', 'PART_Border');
      d.setAttribute('width', '12');
      d.setAttribute('height', '12');
      d.setAttribute('style', 'fill: White; fill-opacity: 0');
      b.appendChild(d);
      a.setAttribute('id', 'PART_Button');
      typeof c.toggleButtonClass !== 'undefined' &&
      a.setAttribute('class', c.toggleButtonClass);
      typeof c.toggleButtonStyle !== 'undefined' && a.setAttribute('style', c.toggleButtonStyle);
      b.appendChild(a);
      return b;
    }, o = function(a, c) {
      typeof c !== 'object' && (c = {});
      $(c);
      var d = [{ header: '', width: 32, isSelection: true }, {
        header: 'Task',
        width: 140,
        isTreeView: true,
      }, { header: 'Start', width: 140 }, { header: 'Finish', width: 140 }, {
        header: 'Milestone',
        width: 80,
      }, { header: 'Completed', width: 80 }, { header: 'Assignments', width: 200 }];
      d[0].cellTemplate = p(c, d[0], a);
      d[1].cellTemplate = A(c, d[1], a);
      d[1].exportCellTemplate = A(c, d[1], a, false);
      d[2].cellTemplate = B(c, d[2]);
      d[2].exportCellTemplate = B(c, d[2], false);
      d[3].cellTemplate = Kb(c, d[3]);
      d[3].exportCellTemplate = Kb(c, d[3], false);
      d[4].cellTemplate = Lb(c, d[4]);
      d[4].exportCellTemplate = Lb(c, d[4], false);
      d[5].cellTemplate = Mb(c, d[5]);
      d[5].exportCellTemplate = Mb(c, d[5], false);
      d[6].cellTemplate = Nb(c, d[6]);
      d[6].exportCellTemplate = Nb(c, d[6], false);
      c.selectionMode != 'Single' && (c.selectionMode != 'Extended' && c.selectionMode != 'ExtendedFocus') && d.splice(0, 1);
      return d;
    },
    p = function(a, c, d) {
      return function(b) {
        return !c.isReadOnly ? t(b, a, d) : W(b.ganttChartView.ownerDocument, b.isSelected);
      };
    }, t = function(a, c) {
      var d = a.ganttChartView.ownerDocument, b;
      if (typeof a.selectionInput === 'undefined') {
        b = d.createElement('input');
        a.selectionInput = b;
        b.type = 'checkbox';
        b.setAttribute('style', 'margin: 0px');
      } else b = a.selectionInput;
      if (a.isSelected) {
        b.setAttribute('checked', 'checked');
        if (!b.checked) b.checked = true;
      } else if (b.checked) b.checked = false;
      var f = function() {
        b.checked ? w(a, true, c.selectionMode) :
          w(a, false, c.selectionMode);
      };
      typeof b.changeEventListener !== 'undefined' && b.removeEventListener('change', b.changeEventListener, true);
      b.addEventListener('change', f, true);
      b.changeEventListener = f;
      d = function(a) {
        if (a.keyCode == 13) {
          a.preventDefault();
          a.stopPropagation();
          f(a);
        }
      };
      typeof b.keyPressEventListener !== 'undefined' && b.removeEventListener('keypress', b.keyPressEventListener, true);
      b.addEventListener('keypress', d, true);
      b.keyPressEventListener = d;
      return b;
    }, w = function(a, c, d) {
      a.isSelected = c;
      y(a, 'isSelected',
        true, true);
      Ob(a);
      if (typeof a.ganttChartView !== 'undefined') {
        a.ganttChartView.selectedItem = a;
        if (d != 'Extended' && d != 'ExtendedFocus') a.ganttChartView.selectedItems = [a];
        var b;
        if (d != 'Extended' && d != 'ExtendedFocus') for (b = 0; b < a.ganttChartView.items.length; b++) {
          c = a.ganttChartView.items[b];
          if (c != a && c.isSelected) {
            c.isSelected = false;
            y(c, 'isSelected', false, true);
            Ob(c);
          }
        }
      }
      if (typeof a.ganttChartView !== 'undefined' && (d == 'Extended' || d == 'ExtendedFocus')) {
        d = [];
        for (b = 0; b < a.ganttChartView.items.length; b++) {
          c = a.ganttChartView.items[b];
          c.isSelected && d.push(c);
        }
        a.ganttChartView.selectedItems = d;
      }
    }, x = function(a, c) {
      if (typeof a.ganttChartView !== 'undefined') a.ganttChartView.currentItem = a;
      if (c.selectionMode == 'Focus' || c.selectionMode == 'ExtendedFocus') {
        if (typeof a.scheduleChartItem !== 'undefined') a = a.scheduleChartItem;
        a.isSelected || w(a, true, c.selectionMode);
      }
    }, A = function(a, c, d, b) {
      var f = function(a) {
        return wrapDateFmtValue(a.ganttChartView.ownerDocument, a.content);
      };
      return (typeof b === 'undefined' || b) && !a.isReadOnly && !a.isGridReadOnly && !a.isContentReadOnly ? function(b) {
        return !c.isReadOnly &&
        (typeof b.isReadOnly === 'undefined' || !b.isReadOnly) ? z(b, Math.max(0, c.width - b.indentation * b.ganttChartView.settings.indentationLevelWidth - b.ganttChartView.settings.toggleButtonAreaWidth - 16), a) : f(b);
      } : f;
    }, z = function(a, c, d) {
      var b = a.ganttChartView.ownerDocument, f;
      if (typeof a.contentInput === 'undefined') {
        f = b.createElement('input');
        a.contentInput = f;
        f.type = 'text';
        f.addEventListener('focus', function() {
          x(a, d);
        }, false);
        var e = function() {
          a.content = f.value;
          y(a, 'content', true, true);
          na(a);
        };
        typeof f.changeEventListener !==
        'undefined' && f.removeEventListener('change', f.changeEventListener, true);
        f.addEventListener('change', e, true);
        f.changeEventListener = e;
        b = function(a) {
          if (a.keyCode == 13) {
            a.preventDefault();
            a.stopPropagation();
            e(a);
          }
        };
        typeof f.keyPressEventListener !== 'undefined' && f.removeEventListener('keypress', f.keyPressEventListener, true);
        f.addEventListener('keypress', b, true);
        f.keyPressEventListener = b;
        f.addEventListener('focus', function() {
          f.style.backgroundColor = 'White';
        }, false);
        f.addEventListener('blur', function() {
          f.style.backgroundColor =
            'Transparent';
        }, false);
      } else f = a.contentInput;
      f.value = a.content;
      b = '';
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) b = '; font-weight: bold';
      f.setAttribute('style', 'background-color: Transparent; width: ' + c + 'px; border-width: 0px; padding: 0px' + b);
      return f;
    }, B = function(a, c, d) {
      var b = function(b) {
        return typeof b.start === 'undefined' || typeof b.isSummaryEnabled !== 'undefined' && !b.isSummaryEnabled && typeof b.isBarVisible !== 'undefined' && !b.isBarVisible ? b.ganttChartView.ownerDocument.createTextNode('') :
          b.ganttChartView.ownerDocument.createTextNode(a.dateTimeFormatter(K(b.start)));
      };
      return (typeof d === 'undefined' || d) && !a.isReadOnly && !a.isGridReadOnly ? function(d) {
        return !c.isReadOnly && (typeof d.isReadOnly === 'undefined' || !d.isReadOnly) && !(typeof d.isSummaryEnabled !== 'undefined' && !d.isSummaryEnabled && typeof d.isBarVisible !== 'undefined' && !d.isBarVisible) ? zc(d, Math.max(0, c.width - 16), a) : b(d);
      } : b;
    }, zc = function(a, c, d) {
      var b = a.ganttChartView.ownerDocument, f;
      if (typeof a.startInput === 'undefined') {
        f = b.createElement('input');
        a.startInput = f;
        try {
          f.type = d.dateTimePickerType;
        } catch (e) {
          f.type = 'text';
        }
        f.addEventListener('focus', function() {
          x(a, d);
        }, false);
        f.addEventListener('focus', function() {
          f.style.backgroundColor = 'White';
        }, false);
        f.addEventListener('blur', function() {
          f.style.backgroundColor = 'Transparent';
        }, false);
      } else f = a.startInput;
      if (typeof a.start !== 'undefined') f.value = d.dateTimeFormatter(K(a.start));
      DatePicker && (d.dateTimePickerType == 'text' && d.useDatePicker) && f.addEventListener('focus', function() {
        if (!a.isWaitingToRefreshGridItem) {
          var c =
            (d.useTimePicker && DateTimePicker ? DateTimePicker : DatePicker).get(f);
          if (!c || !c.isOpen) {
            var m = 0, e = 0;
            try {
              m = f.selectionStart;
              e = f.selectionEnd;
            } catch (g) {
            }
            c = (d.useTimePicker && DateTimePicker ? DateTimePicker : DatePicker).initialize(f, void 0, {
              inputStyle: null,
              isDropDownButtonVisible: false,
              defaultTimeOfDay: d.workingDayStart,
              dateTimeFormatter: d.dateTimeFormatter,
              dateTimeParser: d.dateTimeParser,
              popupStyle: 'margin-top: 1px; background-color: White; border: 1px solid ' +
                d.border,
              disabledDateSelector: Pb(d),
              disabledTimeSelector: Ac(d),
              calendarSelectorLevels: d.calendarSelectorLevels,
              months: d.months,
              daysOfWeek: F(d.daysOfWeek),
            }, 'DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.');
            c.openDropDown();
            setTimeout(function() {
              try {
                f.selectionStart = m;
                f.selectionEnd = e;
              } catch (a) {
              }
            }, 100);
            navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null ? setTimeout(function() {
                try {
                  f.focus();
                } catch (a) {
                }
              }, 100) :
              b.createEvent && setTimeout(function() {
                var a = b.createEvent('MouseEvents');
                a.initEvent('blur', true, false);
                f.dispatchEvent(a);
              });
          }
        }
      }, true);
      var g = '';
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) g = '; font-weight: bold';
      f.setAttribute('style', 'background-color: Transparent; width: ' + c + 'px; border-width: 0px; padding: 0px' + g);
      a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled) ? f.setAttribute('disabled', 'true') : f.removeAttribute('disabled');
      var m = function() {
        if (!a.hasChildren ||
          !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
          var b = a.completedFinish > a.start, c, m;
          if (d.isTaskEffortPreservedWhenStartChangesInGrid) {
            c = da(a, d);
            m = ya(a, d);
          }
          a.start = Q(k(d.dateTimeParser(f.value)), d, true, a.isMilestone, D(a));
          a.preferredStart = a.start;
          if (a.isMilestone) a.finish = a.start;
          y(a, 'start', true, true);
          if (a.finish < a.start) {
            a.finish = a.start;
            y(a, 'finish', false, true);
          }
          if (a.completedFinish < a.start || !b) {
            a.completedFinish = a.start;
            y(a, 'completedFinish', false, true);
          } else if (a.completedFinish >
            a.finish) {
            a.completedFinish = a.finish;
            y(a, 'completedFinish', false, true);
          }
          if (typeof a.completedInput !== 'undefined') {
            b = a.completedInput;
            typeof b.changeEventListener !== 'undefined' && b.removeEventListener('change', b.changeEventListener, true);
            delete a.completedInput;
          }
          if (d.isTaskEffortPreservedWhenStartChangesInGrid) {
            Ta(a, c, d);
            Ua(a, m, d);
          }
        }
        Z(a);
      };
      typeof f.changeEventListener !== 'undefined' && f.removeEventListener('change', f.changeEventListener, true);
      f.addEventListener('change', m, true);
      f.changeEventListener = m;
      c =
        function(a) {
          if (a.keyCode == 13) {
            a.preventDefault();
            a.stopPropagation();
            m(a);
          }
        };
      typeof f.keyPressEventListener !== 'undefined' && f.removeEventListener('keypress', f.keyPressEventListener, true);
      f.addEventListener('keypress', c, true);
      f.keyPressEventListener = c;
      return f;
    }, Kb = function(a, c, d) {
      var b = function(b) {
        return typeof b.finish === 'undefined' || typeof b.isMilestone !== 'undefined' && b.isMilestone == true && typeof b.start !== 'undefined' && b.finish.valueOf() == b.start.valueOf() || typeof b.isSummaryEnabled !== 'undefined' &&
        !b.isSummaryEnabled && typeof b.isBarVisible !== 'undefined' && !b.isBarVisible ? b.ganttChartView.ownerDocument.createTextNode('') : b.ganttChartView.ownerDocument.createTextNode(a.dateTimeFormatter(K(b.finish)));
      };
      return (typeof d === 'undefined' || d) && !a.isReadOnly && !a.isGridReadOnly ? function(d) {
        return !c.isReadOnly && (typeof d.isReadOnly === 'undefined' || !d.isReadOnly) && !(typeof d.isSummaryEnabled !== 'undefined' && !d.isSummaryEnabled && typeof d.isBarVisible !== 'undefined' && !d.isBarVisible) ? Bc(d, Math.max(0, c.width - 16),
          a) : b(d);
      } : b;
    }, Bc = function(a, c, d) {
      var b = a.ganttChartView.ownerDocument, f;
      if (typeof a.finishInput === 'undefined') {
        f = b.createElement('input');
        a.finishInput = f;
        try {
          f.type = d.dateTimePickerType;
        } catch (e) {
          f.type = 'text';
        }
        f.addEventListener('focus', function() {
          x(a, d);
        }, false);
        f.addEventListener('focus', function() {
          f.style.backgroundColor = 'White';
        }, false);
        f.addEventListener('blur', function() {
          f.style.backgroundColor = 'Transparent';
        }, false);
      } else f = a.finishInput;
      if (typeof a.finish !== 'undefined') f.value = d.dateTimeFormatter(K(a.finish));
      DatePicker && (d.dateTimePickerType == 'text' && d.useDatePicker) && f.addEventListener('focus', function() {
        if (!a.isWaitingToRefreshGridItem) {
          var c = (d.useTimePicker && DateTimePicker ? DateTimePicker : DatePicker).get(f);
          if (!c || !c.isOpen) {
            var m = 0, e = 0;
            try {
              m = f.selectionStart;
              e = f.selectionEnd;
            } catch (h) {
            }
            c = (d.useTimePicker && DateTimePicker ? DateTimePicker : DatePicker).initialize(f, void 0, {
              inputStyle: null,
              isDropDownButtonVisible: false,
              defaultTimeOfDay: d.workingDayFinish,
              dateTimeFormatter: d.dateTimeFormatter,
              dateTimeParser: d.dateTimeParser,
              popupStyle: 'margin-top: 1px; background-color: White; border: 1px solid ' + d.border,
              disabledDateSelector: Pb(d),
              disabledTimeSelector: E(d, a),
              calendarSelectorLevels: d.calendarSelectorLevels,
              months: d.months,
              daysOfWeek: F(d.daysOfWeek),
            }, 'init warning');
            c.openDropDown();
            setTimeout(function() {
              try {
                f.selectionStart = m;
                f.selectionEnd = e;
              } catch (a) {
              }
            }, 100);
            navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null ? setTimeout(function() {
              try {
                f.focus();
              } catch (a) {
              }
            }, 100) : b.createEvent && setTimeout(function() {
              var a = b.createEvent('MouseEvents');
              a.initEvent('blur', true, false);
              f.dispatchEvent(a);
            });
          }
        }
      }, true);
      var g = '';
      typeof a.isMilestone !== 'undefined' && a.isMilestone == true && (g = '; visibility: hidden');
      var m = '';
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' ||
        a.isSummaryEnabled)) m = '; font-weight: bold';
      f.setAttribute('style', 'background-color: Transparent; width: ' + c + 'px; border-width: 0px; padding: 0px' + g + m);
      a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled) ? f.setAttribute('disabled', 'true') : f.removeAttribute('disabled');
      var h = function() {
        if (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
          var b = k(d.dateTimeParser(f.value));
          f.value.length > 0 && (f.value.indexOf(' ') < 0 && ia(b) == 0) && (b = aa(b));
          a.finish =
            Q(b, d, a.isMilestone, true, D(a));
          if (a.finish < a.start) a.finish = a.start;
          y(a, 'finish', true, true);
          if (a.completedFinish < a.start) {
            a.completedFinish = a.start;
            y(a, 'completedFinish', false, true);
          } else if (a.completedFinish > a.finish) {
            a.completedFinish = a.finish;
            y(a, 'completedFinish', false, true);
          }
          if (typeof a.completedInput !== 'undefined') {
            b = a.completedInput;
            typeof b.changeEventListener !== 'undefined' && b.removeEventListener('change', b.changeEventListener, true);
            delete a.completedInput;
          }
        }
        Z(a);
      };
      typeof f.changeEventListener !==
      'undefined' && f.removeEventListener('change', f.changeEventListener, true);
      f.addEventListener('change', h, true);
      f.changeEventListener = h;
      c = function(a) {
        if (a.keyCode == 13) {
          a.preventDefault();
          a.stopPropagation();
          h(a);
        }
      };
      typeof f.keyPressEventListener !== 'undefined' && f.removeEventListener('keypress', f.keyPressEventListener, true);
      f.addEventListener('keypress', c, true);
      f.keyPressEventListener = c;
      return f;
    }, Pb = function(a) {
      return function(c) {
        if (c.getDay() < a.workingWeekStart || c.getDay() > a.workingWeekFinish) return true;
        c = k(c).valueOf();
        if (a.specialNonworkingDays) for (var d = 0; d < a.specialNonworkingDays.length; d++) if (c == a.specialNonworkingDays[d].valueOf()) return true;
        return false;
      };
    }, Ac = function(a) {
      return function(c) {
        return c < a.visibleDayStart || c >= a.visibleDayFinish;
      };
    }, E = function(a, c) {
      return function(d) {
        return (Y(c.start) < Y(c.finish) ? d <= a.visibleDayStart : d < a.visibleDayStart) || d > a.visibleDayFinish;
      };
    }, F = function(a) {
      if (a) {
        for (var c = [], d = 0; d < a.length; d++) {
          var b = a[d], b = b.length > 0 ? b[0].toUpperCase() + (b.length > 1 ? b[1] : '') : '';
          c.push(b);
        }
        return c;
      }
    },
    Lb = function(a, c, d) {
      var b = function(a) {
        return typeof a.isMilestone === 'undefined' || typeof a.isSummaryEnabled !== 'undefined' && !a.isSummaryEnabled && typeof a.isBarVisible !== 'undefined' && !a.isBarVisible ? a.ganttChartView.ownerDocument.createTextNode('') : W(a.ganttChartView.ownerDocument, a.isMilestone);
      };
      return (typeof d === 'undefined' || d) && !a.isReadOnly && !a.isGridReadOnly ? function(d) {
        return !c.isReadOnly && (typeof d.isReadOnly === 'undefined' || !d.isReadOnly) && !(typeof d.isSummaryEnabled !== 'undefined' && !d.isSummaryEnabled &&
          typeof d.isBarVisible !== 'undefined' && !d.isBarVisible) ? T(d, a) : b(d);
      } : b;
    }, T = function(a, c) {
      var d = a.ganttChartView.ownerDocument, b;
      if (typeof a.milestoneInput === 'undefined') {
        b = d.createElement('input');
        a.milestoneInput = b;
        b.type = 'checkbox';
        b.setAttribute('style', 'margin: 0px; margin-left: 2px; margin-right: 2px');
        b.addEventListener('focus', function() {
          x(a, c);
        }, false);
      } else b = a.milestoneInput;
      (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) && typeof a.isMilestone !== 'undefined' &&
      a.isMilestone ? b.setAttribute('checked', true) : b.removeAttribute('checked');
      if (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
        var f = function() {
          if (b.checked) {
            a.isMilestone = true;
            y(a, 'isMilestone', true, true);
            if (a.finish > a.start) {
              a.finish = a.start;
              y(a, 'finish', false, true);
            }
            if (a.completedFinish > a.start) {
              a.completedFinish = a.start;
              y(a, 'completedFinish', false, true);
            }
          } else {
            a.isMilestone = false;
            y(a, 'isMilestone', true, true);
          }
          Z(a);
        };
        typeof b.changeEventListener !== 'undefined' && b.removeEventListener('change',
          b.changeEventListener, true);
        b.addEventListener('change', f, true);
        b.changeEventListener = f;
        d = function(a) {
          if (a.keyCode == 13) {
            a.preventDefault();
            a.stopPropagation();
            f(a);
          }
        };
        typeof b.keyPressEventListener !== 'undefined' && b.removeEventListener('keypress', b.keyPressEventListener, true);
        b.addEventListener('keypress', d, true);
        b.keyPressEventListener = d;
      } else b.setAttribute('style', 'visibility: hidden');
      return b;
    }, Nb = function(a, c, d) {
      var b = function(a) {
        return typeof a.assignmentsContent === 'undefined' || typeof a.isSummaryEnabled !==
        'undefined' && !a.isSummaryEnabled && typeof a.isBarVisible !== 'undefined' && !a.isBarVisible ? a.ganttChartView.ownerDocument.createTextNode('') : wrapDateFmtValue(a.ganttChartView.ownerDocument, a.assignmentsContent);
      };
      return (typeof d === 'undefined' || d) && !a.isReadOnly && !a.isGridReadOnly && !a.isAssignmentsContentReadOnly ? function(d) {
        return !c.isReadOnly && (typeof d.isReadOnly === 'undefined' || !d.isReadOnly) && !(typeof d.isSummaryEnabled !== 'undefined' && !d.isSummaryEnabled && typeof d.isBarVisible !== 'undefined' && !d.isBarVisible) ? Cc(d,
          Math.max(0, c.width - 16), a) : b(d);
      } : b;
    }, Cc = function(a, c, d) {
      var b = a.ganttChartView, f = b.ownerDocument, e;
      if (typeof a.assignmentsContentInput === 'undefined') {
        e = f.createElement('input');
        a.assignmentsContentInput = e;
        e.type = 'text';
        e.addEventListener('focus', function() {
          x(a, d);
        }, false);
        var g = function() {
          a.assignmentsContent = e.value;
          y(a, 'assignmentsContent', true, true);
          if (!a.hasChildren && a.hasFixedEffort) {
            a.fixedEffort = da(a, d);
            a.fixedEffortAssignments = ga(a);
          }
          oa(a);
          var b = null;
          MultiSelectorComboBox && (b = MultiSelectorComboBox.get(e));
          if (b != null && b.availableChoices.length > 0) var c = setInterval(function() {
            if (!b.isOpen && f.activeElement != a.assignmentsContentInput) {
              clearInterval(c);
              Z(a);
            }
          }, 100); else Z(a);
        };
        typeof e.changeEventListener !== 'undefined' && e.removeEventListener('change', e.changeEventListener, true);
        e.addEventListener('change', function(a) {
          e.dontAutoFocus = true;
          g(a);
        }, true);
        e.changeEventListener = g;
        var m = function(a) {
          if (a.keyCode == 13) {
            a.preventDefault();
            a.stopPropagation();
            typeof e.dontAutoFocus !==
            'undefined' && delete e.dontAutoFocus;
            g(a);
          }
        };
        typeof e.keyPressEventListener !== 'undefined' && e.removeEventListener('keypress', e.keyPressEventListener, true);
        e.addEventListener('keypress', m, true);
        e.keyPressEventListener = m;
        e.addEventListener('focus', function() {
          e.style.backgroundColor = 'White';
        }, false);
        e.addEventListener('blur', function() {
          e.style.backgroundColor = 'Transparent';
        }, false);
      } else e = a.assignmentsContentInput;
      if (typeof a.assignmentsContent !== 'undefined') e.value = a.assignmentsContent;
      MultiSelectorComboBox &&
      d.useResourceSelector && e.addEventListener('focus', function() {
        if (!a.isWaitingToRefreshGridItem) {
          var c = MultiSelectorComboBox.get(e);
          if (!c || !c.isOpen && c.availableChoices.length > 0) {
            c = d.assignableResources;
            if (typeof c === 'undefined') {
              c = Ha(b.items);
              d.assignableResources = c;
            }
            var m = 0, l = 0;
            try {
              m = e.selectionStart;
              l = e.selectionEnd;
            } catch (g) {
            }
            c = MultiSelectorComboBox.initialize(e, c, void 0, {
              inputStyle: null,
              autoAppendAvailableChoices: d.autoAppendAssignableResources,
              isDropDownButtonVisible: false,
              popupStyle: 'margin-top: 1px; background-color: White; color: Black; border: 1px solid ' + d.border + '; font-size: small; max-height: 188px; overflow-y: auto',
            }, 'init warn');
            c.openDropDown();
            setTimeout(function() {
              try {
                e.selectionStart = m;
                e.selectionEnd = l;
              } catch (a) {
              }
            }, 100);
            navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null ? setTimeout(function() {
                try {
                  e.focus();
                } catch (a) {
                }
              },
              100) : f.createEvent && setTimeout(function() {
              var a = f.createEvent('MouseEvents');
              a.initEvent('blur', true, false);
              e.dispatchEvent(a);
            });
          }
        }
      }, true);
      m = '';
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) m = '; font-weight: bold';
      e.setAttribute('style', 'background-color: Transparent; width: ' + c + 'px; border-width: 0px; padding: 0px' + m);
      return e;
    }, Mb = function(a, c, d) {
      var b = function(a) {
        return typeof a.start === 'undefined' || typeof a.finish === 'undefined' || a.finish.valueOf() == a.start.valueOf() ||
        typeof a.isSummaryEnabled !== 'undefined' && !a.isSummaryEnabled && typeof a.isBarVisible !== 'undefined' && !a.isBarVisible ? a.ganttChartView.ownerDocument.createTextNode('') : W(a.ganttChartView.ownerDocument, a.ganttChartView.isItemCompleted(a));
      };
      return (typeof d === 'undefined' || d) && !a.isReadOnly && !a.isGridReadOnly ? function(d) {
        return !c.isReadOnly && (typeof d.isReadOnly === 'undefined' || !d.isReadOnly) && (!d.hasChildren || !(typeof d.isSummaryEnabled === 'undefined' || d.isSummaryEnabled)) && !(typeof d.isSummaryEnabled !==
          'undefined' && !d.isSummaryEnabled && typeof d.isBarVisible !== 'undefined' && !d.isBarVisible) ? Dc(d, a) : b(d);
      } : b;
    }, Dc = function(a, c) {
      var d = a.ganttChartView.ownerDocument, b;
      if (typeof a.completedInput === 'undefined') {
        b = d.createElement('input');
        a.completedInput = b;
        b.type = 'checkbox';
        b.setAttribute('style', 'margin: 0px; margin-left: 2px; margin-right: 2px');
        b.addEventListener('focus', function() {
          x(a, c);
        }, false);
      } else b = a.completedInput;
      a.isSetAsCompleted || (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) &&
      a.completedFinish >= a.finish && a.finish > a.start && (typeof a.isMilestone === 'undefined' || !a.isMilestone) ? b.setAttribute('checked', true) : b.removeAttribute('checked');
      a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled) && b.setAttribute('style', 'visibility: hidden');
      var f = function() {
        if (b.checked) {
          if (a.completedFinish < a.finish) {
            a.completedFinish = a.finish;
            y(a, 'completedFinish', true, true);
          }
          if (a.isMilestone || a.finish.valueOf() <= a.start.valueOf()) a.isSetAsCompleted = true;
        } else {
          if (a.completedFinish >
            a.start) {
            a.completedFinish = a.start;
            y(a, 'completedFinish', true, true);
          }
          if (a.isMilestone || a.finish.valueOf() <= a.start.valueOf()) a.isSetAsCompleted = false;
        }
        Z(a);
      };
      typeof b.changeEventListener !== 'undefined' && b.removeEventListener('change', b.changeEventListener, true);
      b.addEventListener('change', f, true);
      b.changeEventListener = f;
      d = function(a) {
        if (a.keyCode == 13) {
          a.preventDefault();
          a.stopPropagation();
          f(a);
        }
      };
      typeof b.keyPressEventListener !== 'undefined' && b.removeEventListener('keypress', b.keyPressEventListener, true);
      b.addEventListener('keypress', d, true);
      b.keyPressEventListener = d;
      return b;
    }, db = function(a) {
      for (var c = 0, d = 0; d < a.length; d++) c = c + a[d].width;
      return c;
    }, tc = function(a, c, d) {
      for (var b = J(c.items, d), f = 0; f < a.length; f++) {
        var e = a[f];
        e.ganttChartView = c;
        if (typeof e.width === 'undefined') e.width = 100;
        if (typeof e.minWidth === 'undefined') e.minWidth = Math.min(e.width, d.minColumnWidth + (e.isTreeView ? b : 0));
        if (typeof e.maxWidth === 'undefined') e.maxWidth = d.maxColumnWidth;
        if (typeof e.cellTemplate === 'undefined') e.cellTemplate = function(a) {
          return wrapDateFmtValue(a.ganttChartView.ownerDocument,
            a.content);
        };
        if (d.verticalGridLines) {
          if (e.minWidth < 4) e.minWidth = 4;
          if (e.width < e.minWidth) e.width = e.minWidth;
        }
      }
    }, wc = function(a, c, d) {
      var b = a.ownerDocument, f = b.createElement('div');
      typeof d.columnHeaderClass !== 'undefined' && f.setAttribute('class', d.columnHeaderClass);
      typeof d.columnHeaderStyle !== 'undefined' && f.setAttribute('style', d.columnHeaderStyle);
      for (var e = 0; e < c.length; e++) f.appendChild(Ec(b, c[e], d));
      a.appendChild(f);
    }, Ec = function(a, c, d) {
      var b = a.createElement('div');
      b.setAttribute('style', 'overflow-y: hidden; vertical-align: middle; display: table-cell; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; height: ' +
        d.headerHeight + 'px');
      var f = a.createElement('div'), e = c.width >= 4 ? 2 : c.width / 2;
      f.setAttribute('style', 'padding-left: ' + e + 'px; padding-right: ' + e + 'px; overflow-x: hidden; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: ' + c.width + 'px');
      e = a.createElement('div');
      typeof c.headerClass !== 'undefined' && e.setAttribute('class', c.headerClass);
      typeof c.headerStyle !== 'undefined' && e.setAttribute('style', c.headerStyle);
      e.appendChild(wrapDateFmtValue(a, c.header));
      f.appendChild(e);
      b.appendChild(f);
      if (c.width >= 1 && (typeof d.allowUserToResizeColumns === 'undefined' || d.allowUserToResizeColumns) && (typeof c.allowUserToResize === 'undefined' || c.allowUserToResize)) {
        b.isGripperVisible = false;
        var g = c.ganttChartView, m = function(a) {
          b.isGripperVisible = a;
          b.style.cursor = a ? 'e-resize' : 'default';
          b.style.borderRight = a ? 'solid 1px ' + d.border : d.verticalGridLines ? 'solid 1px ' + d.verticalGridLines : '';
          f.style.width = c.width - (b.style.borderRight ? 1 : 0) + 'px';
        };
        d.verticalGridLines && m();
        var h = d.splitterWidth;
        b.addEventListener('mouseover',
          function(a) {
            if (!GanttChartView.isGripperDragging && !(b.isGripperDragging || typeof a.offsetX === 'undefined' && a.currentTarget != b)) m((typeof a.offsetX !== 'undefined' ? a.offsetX : a.layerX - a.currentTarget.offsetLeft) >= c.width - h);
          }, true);
        b.addEventListener('mousemove', function(a) {
          if (!GanttChartView.isGripperDragging && !(b.isGripperDragging || typeof a.offsetX === 'undefined' && a.currentTarget != b)) m((typeof a.offsetX !== 'undefined' ? a.offsetX : a.layerX - a.currentTarget.offsetLeft) >= c.width -
            h);
        }, true);
        f.addEventListener('mouseover', function(a) {
          !GanttChartView.isGripperDragging && (!b.isGripperDragging && !(typeof a.offsetX !== 'undefined' || a.currentTarget != f)) && m(a.layerX - a.currentTarget.offsetLeft >= c.width - h);
        }, false);
        f.addEventListener('mousemove', function(a) {
          !GanttChartView.isGripperDragging && (!b.isGripperDragging && !(typeof a.offsetX !== 'undefined' || a.currentTarget != f)) && m(a.layerX - a.currentTarget.offsetLeft >= c.width - h);
        }, false);
        b.addEventListener('mousedown',
          function(a) {
            if (!(a.button != 0 || !b.isGripperVisible || GanttChartView.isGripperDragging)) {
              GanttChartView.isGripperDragging = true;
              b.isGripperDragging = true;
              b.initialGripperDraggingX = a.clientX;
              b.initialColumnWidth = c.width;
            }
          }, true);
        a.addEventListener('mousemove', function(a) {
          if (b.isGripperDragging) {
            c.width = Math.max(c.minWidth, b.initialColumnWidth + (a.clientX - b.initialGripperDraggingX));
            if (typeof c.maxWidth !== 'undefined' && c.width > c.maxWidth) c.width = c.maxWidth;
            f.style.width = c.width -
              1 + 'px';
            typeof d.columnWidthChangeHandler !== 'undefined' && setTimeout(function() {
              d.columnWidthChangeHandler(c, c.width);
            }, 0);
            if (!g.isWaitingToRefreshColumns) {
              g.isWaitingToRefreshColumns = true;
              setTimeout(function() {
                var a = db(d.columns);
                g.gridHeader.style.width = a + 'px';
                g.gridContent.style.width = a + 'px';
                delete g.isWaitingToRefreshColumns;
                g.refreshGridItems();
              }, 0);
            }
          }
        }, true);
        a.addEventListener('mouseup', function() {
          if (b.isGripperDragging) {
            delete b.isGripperDragging;
            delete b.initialGripperDraggingX;
            delete b.initialColumnWidth;
            m(false);
            delete GanttChartView.isGripperDragging;
          }
        }, true);
        b.addEventListener('mouseout', function() {
          b.isGripperDragging || m(false);
        }, false);
      }
      return b;
    }, ma = function(a, c) {
      for (var d = -1, b = null, f = null, e = [], g = 0; g < a.length; g++) {
        var m = a[g];
        if (typeof m.scheduleChartItem === 'undefined') {
          if (typeof m.isSelected === 'undefined') m.isSelected = false;
          if (m.isSelected) {
            f == null && (f = m);
            e.push(m);
          }
          if (typeof m.indentation === 'undefined') m.indentation = 0;
          if (g == 0 && m.indentation != 0) {
            m.indentation = 0;
            y(m, 'indentation',
              false, true);
          }
          if (typeof m.isExpanded === 'undefined') m.isExpanded = true;
          if (b != null) {
            var h = b.indentation + 1;
            if (m.indentation > h) {
              m.indentation = h;
              y(m, 'indentation', false, true);
            }
            b.hasChildren = m.indentation > b.indentation;
            if (b.hasChildren && typeof b.isMilestone !== 'undefined' && b.isMilestone) {
              b.isMilestone = false;
              y(b, 'isMilestone', false, true);
            }
          }
        }
        m.isVisible = d < 0 || m.indentation <= d;
        if (typeof m.scheduleChartItem === 'undefined') {
          if (m.isVisible && !m.isExpanded) d = m.indentation;
          m.isExpanded && m.indentation == d && (d = -1);
          b = m;
        }
      }
      if (b !=
        null) b.hasChildren = false;
      c.selectedItem = f;
      c.selectedItems = e;
    }, ca = function(a, c, d) {
      d.isTimingInformationInitialized = false;
      d.isBasicTimingInformationInitialized = false;
      var b = Y(c.currentTime), f = [], e, g, m;
      for (g = 0; g < a.length; g++) {
        e = a[g];
        e.index = g;
        var h = null;
        for (f.length > 0 && (h = f[f.length - 1]); h != null && e.indentation <= h.indentation;) {
          f.pop();
          h = f[f.length - 1];
        }
        e.parent = h;
        e.children = [];
        h != null && h.children.push(e);
        if (!e.hasChildren || !(typeof e.isSummaryEnabled === 'undefined' || e.isSummaryEnabled)) {
          m = e.start;
          var n = e.finish,
            l = e.completedFinish;
          if (typeof e.start === 'undefined') {
            e.start = b;
            e.preferredStart = e.start;
          }
          if (typeof e.finish === 'undefined') e.finish = typeof e.isMilestone === 'undefined' || !e.isMilestone ? aa(b) : e.start;
          if (typeof e.isSetAsCompleted === 'undefined') e.isSetAsCompleted = typeof e.completedFinish !== 'undefined' && e.completedFinish.valueOf() == e.finish.valueOf();
          if (typeof e.completedFinish === 'undefined') e.completedFinish = e.start;
          if (typeof e.isRelativeToTimezone === 'undefined' || e.isRelativeToTimezone) {
            e.start = new Date(e.start.valueOf() -
              e.start.getTimezoneOffset() * 6E4);
            e.ftart = e.start;
            e.finish = new Date(e.finish.valueOf() - e.finish.getTimezoneOffset() * 6E4);
            e.completedFinish = typeof e.completedFinish === 'number' ? R(e.start, e.completedFinish * N(e.start, e.finish, c, D(e)), c, D(e)) : new Date(e.completedFinish.valueOf() - e.completedFinish.getTimezoneOffset() * 6E4);
            if (typeof e.baselineStart !== 'undefined') e.baselineStart = new Date(e.baselineStart.valueOf() - e.baselineStart.getTimezoneOffset() * 6E4);
            if (typeof e.baselineFinish !== 'undefined') e.baselineFinish =
              new Date(e.baselineFinish.valueOf() - e.baselineFinish.getTimezoneOffset() * 6E4);
            if (typeof e.minStart !== 'undefined') e.minStart = new Date(e.minStart.valueOf() - e.minStart.getTimezoneOffset() * 6E4);
            if (typeof e.maxStart !== 'undefined') e.maxStart = new Date(e.maxStart.valueOf() - e.maxStart.getTimezoneOffset() * 6E4);
            if (typeof e.minFinish !== 'undefined') e.minFinish = new Date(e.minFinish.valueOf() - e.minFinish.getTimezoneOffset() * 6E4);
            if (typeof e.maxFinish !== 'undefined') e.maxFinish = new Date(e.maxFinish.valueOf() - e.maxFinish.getTimezoneOffset() *
              6E4);
            e.isRelativeToTimezone = false;
          } else if (typeof e.completedFinish === 'number') e.completedFinish = R(e.start, e.completedFinish * N(e.start, e.finish, c, D(e)), c, D(e));
          if (typeof e.minStart !== 'undefined' && e.start < e.minStart) e.start = e.minStart; else if (typeof e.maxStart !== 'undefined' && e.start > e.maxStart) e.start = e.maxStart;
          if (typeof e.maxFinish !== 'undefined' && e.finish > e.maxFinish) e.finish = e.maxFinish; else if (typeof e.minFinish !== 'undefined' && e.finish < e.minFinish) e.finish = e.minFinish;
          if (e.finish < e.start) e.finish =
            e.start;
          if (e.completedFinish < e.start) e.completedFinish = e.start; else if (e.completedFinish > e.finish) e.completedFinish = e.finish;
          if (typeof e.loadChartItem === 'undefined') e.start = Q(e.start, c, true, typeof e.isMilestone !== 'undefined' && e.isMilestone, D(e));
          typeof e.dependsOf !== 'undefined' && delete e.dependsOf;
          e.preferredStart = e.start;
          if (typeof e.loadChartItem === 'undefined') {
            e.finish = Q(e.finish, c, typeof e.isMilestone !== 'undefined' && e.isMilestone, true, D(e));
            e.completedFinish = Q(e.completedFinish, c, typeof e.isMilestone !==
              'undefined' && e.isMilestone, true, D(e));
          }
          if (e.finish < e.start) e.finish = e.start;
          if (typeof e.isMilestone === 'undefined') e.isMilestone = !(e.hasChildren && (typeof e.isSummaryEnabled === 'undefined' || e.isSummaryEnabled)) && e.finish.valueOf() == e.start.valueOf();
          if (e.completedFinish < e.start) e.completedFinish = e.start;
          if (e.completedFinish > e.finish) e.completedFinish = e.finish;
          if (typeof e.isSetAsCompleted !== 'undefined' && (!e.isMilestone || e.completedFinish.valueOf() < e.finish.valueOf())) e.isSetAsCompleted = false;
          (typeof m ===
            'undefined' || e.start.valueOf() != m.valueOf()) && y(e, 'start', false, true);
          (typeof n === 'undefined' || e.finish.valueOf() != n.valueOf()) && y(e, 'finish', false, true);
          (typeof l === 'undefined' || e.completedFinish.valueOf() != l.valueOf()) && y(e, 'completedFinish', false, true);
        }
        for (m = 0; m < f.length; m++) {
          n = f[m];
          if (typeof n.isSummaryEnabled === 'undefined' || n.isSummaryEnabled) {
            if (typeof n.start === 'undefined' || n.start > e.start) {
              n.start = e.start;
              y(n, 'start', false, true);
            }
            if (typeof n.finish === 'undefined' || n.finish < e.finish) {
              n.finish =
                e.finish;
              y(n, 'finish', false, true);
            }
            if (typeof n.completedFinish === 'undefined' || n.completedFinish.valueOf() != n.start.valueOf()) {
              n.completedFinish = n.start;
              y(n, 'completedFinish', false, true);
            }
          }
        }
        (h == null || e.indentation > h.indentation) && f.push(e);
      }
      d.isBasicTimingInformationInitialized = true;
      for (g = a.length; g-- > 0;) {
        e = a[g];
        e.hasChildren && (typeof e.isSummaryEnabled === 'undefined' || e.isSummaryEnabled) && Va(e);
      }
      if (c.areTaskDependencyConstraintsEnabled) for (g = 0; g < a.length; g++) {
        e = a[g];
        typeof e.predecessors !== 'undefined' &&
        (e.predecessors != null && e.predecessors.length > 0) && Ia(e, a, c, d);
      }
      for (g = 0; g < a.length; g++) {
        e = a[g];
        if (!e.hasChildren && e.hasFixedEffort) {
          e.fixedEffort = da(e, c);
          e.fixedEffortAssignments = ga(e);
        }
      }
      d.isTimingInformationInitialized = true;
    }, Va = function(a, c) {
      if (!(a.children.length <= 0 || typeof a.isSummaryEnabled !== 'undefined' && !a.isSummaryEnabled)) {
        typeof c === 'undefined' && (c = true);
        var d = a.start, b = a.finish, f = a.completedFinish;
        delete a.start;
        delete a.finish;
        delete a.completedFinish;
        for (var e = 0; e <= 1; e++) {
          for (var g = 0; g < a.children.length; g++) {
            var m =
              a.children[g];
            if (!(typeof m.isParentSummarizationEnabled !== 'undefined' && !m.isParentSummarizationEnabled && e < 1)) {
              if (typeof a.start === 'undefined' || a.start > m.start) a.start = m.start;
              if (typeof a.finish === 'undefined' || a.finish < m.finish) a.finish = m.finish;
            }
          }
          if (typeof a.start !== 'undefined' && typeof a.finish !== 'undefined') break;
        }
        a.completedFinish = a.start;
        (typeof d === 'undefined' || a.start.valueOf() != d.valueOf()) && y(a, 'start', false, c);
        (typeof b === 'undefined' || a.finish.valueOf() != b.valueOf()) && y(a, 'finish', false, c);
        (typeof f === 'undefined' || a.completedFinish.valueOf() != f.valueOf()) && y(a, 'completedFinish', false, c);
      }
    }, jb = function(a, c) {
      return a == c || ib(a, c) || ib(c, a);
    }, ib = function(a, c) {
      var d = a.parent;
      return d == null ? false : (typeof d.isSummaryEnabled === 'undefined' || d.isSummaryEnabled) && d == c ? true : ib(d, c);
    }, Da = function(a, c) {
      if (typeof a.predecessors === 'undefined') return false;
      for (var d = 0; d < a.predecessors.length; d++) if (a.predecessors[d].item == c) return true;
      return false;
    }, Y = function(a) {
      return new Date(Math.floor(a.valueOf() /
        864E5) * 864E5);
    }, ia = function(a) {
      return a.valueOf() - Y(a).valueOf();
    }, ka = function(a) {
      a = Math.floor((a.valueOf() - 2592E5) / 864E5) % 7;
      a < 0 && (a = a + 7);
      return a;
    }, wa = function(a, c) {
      Y(a);
      return new Date(Math.floor((a.valueOf() - 2592E5) / 6048E5) * 6048E5 + 2592E5 + c * 864E5);
    }, fb = function(a, c) {
      var d = wa(a, c);
      return Math.abs(d.valueOf() - a.valueOf()) <= 36E5 ? d : new Date(d.valueOf() + 6048E5);
    }, Wa = function(a) {
      return a.hourWidth * (a.visibleDayFinish - a.visibleDayStart) / 36E5;
    }, calculateBarX = function(a, c) {
      var d = Wa(c), b = Wa(c) * (c.visibleWeekFinish - c.visibleWeekStart +
        1), f = wa(a, c.weekStartDay),
        f = Math.floor((f - c.timelineStart) / 6048E5) * b - Math.max(0, c.weekStartDay - c.visibleWeekStart) * d,
        b = ka(a),
        f = b <= c.visibleWeekStart ? f + 0 : b > c.visibleWeekFinish ? f + (c.visibleWeekFinish - c.visibleWeekStart + 1) * d : f + (b - c.visibleWeekStart) * d,
        d = ia(a);
      b >= c.visibleWeekStart && b <= c.visibleWeekFinish && (f = d <= c.visibleDayStart ? f + 0 : d >= c.visibleDayFinish ? f + (c.visibleDayFinish - c.visibleDayStart) / 36E5 * c.hourWidth : f + (d - c.visibleDayStart) / 36E5 * c.hourWidth);
      return f;
    }, Ca = function(a, c) {
      for (var d = c.timelineStart.valueOf(),
             b = Wa(c), f = Wa(c) * (c.visibleWeekFinish - c.visibleWeekStart + 1); a > f;) {
        d = d + 6048E5;
        a = a - f;
      }
      for (d = d + Math.max(0, c.visibleWeekStart - c.weekStartDay) * 864E5; a > b;) {
        d = d + 864E5;
        a = a - b;
      }
      d = d + c.visibleDayStart;
      d = d + a / c.hourWidth * 36E5;
      return new Date(d);
    }, Bb = function(a) {
      switch (a.theme) {
        default:
          return [{
            scaleType: 'NonworkingTime',
            isHeaderVisible: false,
            isHighlightingVisible: true,
            highlightingStyle: 'stroke-width: 0; fill: #f4f4f4; fill-opacity: 0.65',
          }, { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 2.25px' }, {
            scaleType: 'Days',
            headerTextFormat: 'DayOfWeekAbbreviation', headerStyle: 'padding: 2.25px',
          }, {
            scaleType: 'CurrentTime',
            isHeaderVisible: false,
            isSeparatorVisible: true,
            separatorStyle: 'stroke: #8bbf8a; stroke-width: 0.5px',
          }];
        case 'ModernBordered':
          return [{
            scaleType: 'NonworkingTime',
            isHeaderVisible: false,
            isHighlightingVisible: true,
            highlightingStyle: 'stroke-width: 0; fill: #f4f4f4; fill-opacity: 0.65',
          }, {
            scaleType: 'Weeks',
            headerTextFormat: 'Date',
            headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White',
            isSeparatorVisible: true,
            separatorStyle: 'stroke: #D3DFF0; stroke-width: 0.5px',
          }, {
            scaleType: 'Days',
            headerTextFormat: 'DayOfWeekAbbreviation',
            headerStyle: 'padding: 2.25px; border-right: solid 1px White',
          }, {
            scaleType: 'CurrentTime',
            isHeaderVisible: false,
            isSeparatorVisible: true,
            separatorStyle: 'stroke: #8bbf8a; stroke-width: 1px',
          }];
        case 'Aero':
          return [{
            scaleType: 'NonworkingTime',
            isHeaderVisible: false,
            isHighlightingVisible: true,
            highlightingStyle: 'stroke-width: 0; fill: #f4f4f4; fill-opacity: 0.65',
          }, {
            scaleType: 'Weeks',
            headerTextFormat: 'Date',
            headerStyle: 'padding: 2.25px; border-right: solid 1px #D3DFF0; border-bottom: solid 1px #D3DFF0',
            isSeparatorVisible: true,
            separatorStyle: 'stroke: #FFFFFF; stroke-width: 0.5px',
          }, {
            scaleType: 'Days',
            headerTextFormat: 'DayOfWeekAbbreviation',
            headerStyle: 'padding: 2.25px; border-right: solid 1px #D3DFF0',
          }, {
            scaleType: 'CurrentTime',
            isHeaderVisible: false,
            isSeparatorVisible: true,
            separatorStyle: 'stroke: Black; stroke-width: 1px',
          }];
      }
    }, pa = function(a, c) {
      return new Date(Math.floor((a - 2592E5).valueOf() /
        c.updateScale) * c.updateScale + 2592E5);
    }, eb = function(a, c, d, b, f) {
      typeof f === 'undefined' && (f = false);
      var e = a.ownerDocument, g = 0, m, h;
      for (m = 0; m < d.length; m++) {
        h = d[m];
        (typeof h.isHeaderVisible === 'undefined' || h.isHeaderVisible) && g++;
      }
      var n = b.headerHeight;
      g > 0 && (n = b.headerHeight / g);
      for (m = 0; m < d.length; m++) {
        h = d[m];
        if (!f || !(h.scaleType != 'CurrentTime' && h.scaleType != 'FutureTime')) {
          g = Fc(h, b);
          if (typeof g !== 'undefined') {
            g.length == 0 && g.push({ start: b.timelineStart, finish: b.timelineFinish });
            var l = n;
            if (typeof h.headerHeight !==
              'undefined') l = h.headerHeight;
            for (var s = b.timelineStart, u = 0; u < g.length; u++) {
              var v = g[u], C = v.start, q = v.finish;
              if (h.scaleType != 'CurrentTime' && h.scaleType != 'FutureTime' && h.scaleType != 'NonworkingTime') {
                if (C > s && (typeof h.isHeaderVisible === 'undefined' || h.isHeaderVisible)) C = s;
                C < s && (C = s);
                if (C < b.timelineStart) C = b.timelineStart;
                if (q > b.timelineFinish) q = b.timelineFinish;
                q < C && (q = C);
                if (u == g.length - 1 && q < b.timelineFinish && (typeof h.isHeaderVisible === 'undefined' || h.isHeaderVisible)) q = b.timelineFinish;
                s = q;
              }
              var j = calculateBarX(C,
                b), k = calculateBarX(q, b), p = k - j;
              if (!(p <= 0)) {
                if (typeof h.isHeaderVisible === 'undefined' || h.isHeaderVisible) {
                  var o = getDateFmtValue(h, v, b), t = e.createElement('div');
                  t.setAttribute('style', 'float: left; overflow: hidden; width: ' + p + 'px; height: ' + l + 'px');
                  var w = e.createElement('div');
                  w.setAttribute('class', h.headerClass);
                  w.setAttribute('style', h.headerStyle);
                  var wrappedDate = wrapDateFmtValue(e, o);
                  w.appendChild(wrappedDate);
                  if (h.headerTextFormat == 'DayOfWeek') {
                    if (o == 'Сб' || o == 'Вс') {
                      w.classList.add('gantt-wrapped-days-of-week-head-weekends')
                    } else {
                      w.classList.add('gantt-wrapped-days-of-week-head')
                    }
                  }
                  else {
                    w.classList.add('gantt-wrapped-period-head')
                  }
                  t.appendChild(w);
                  a.appendChild(t);
                }
                v.start = C;
                v.finish = q;
                v = false;
                if (typeof h.isHighlightingVisible !== 'undefined') v = h.isHighlightingVisible;
                if (v) {
                  v = e.createElementNS('http://www.w3.org/2000/svg',
                    'rect');
                  v.setAttribute('x', j - 1);
                  v.setAttribute('y', 0);
                  v.setAttribute('width', p);
                  v.setAttribute('height', 0);
                  v.setAttribute('class', h.highlightingClass);
                  v.setAttribute('style', h.highlightingStyle);
                  v.tag = 'Scale-Highlighting' + (h.scaleType != 'CurrentTime' && h.scaleType != 'FutureTime' ? '' : '-CurrentTime');
                  c.appendChild(v);
                }
                j = false;
                if (typeof h.isSeparatorVisible !== 'undefined') j = h.isSeparatorVisible;
                if (j) {
                  j = e.createElementNS('http://www.w3.org/2000/svg', 'line');
                  j.setAttribute('x1', k - 0.75);
                  j.setAttribute('y1', 0);
                  j.setAttribute('x2', k - 0.75);
                  j.setAttribute('y2', 0);
                  j.setAttribute('class', h.separatorClass);
                  j.setAttribute('style', h.separatorStyle);
                  j.tag = 'Scale-Separator' + (h.scaleType != 'CurrentTime' && h.scaleType != 'FutureTime' ? '' : '-CurrentTime');
                  c.appendChild(j);
                }
              }
            }
          }
        }
      }
    }, Fc = function(a, c) {
      var d = 'Custom', b, f;
      if (typeof a.scaleType !== 'undefined') d = a.scaleType;
      switch (d) {
        case 'CurrentTime':
          return [{ start: c.timelineStart, finish: c.currentTime }];
        case 'FutureTime':
          return [{ start: c.currentTime, finish: c.timelineFinish }];
        case 'Years':
          d =
            [];
          b = new Date(c.timelineStart.valueOf());
          f = b.getTimezoneOffset();
          b.setMonth(0, 1);
          var e = b.getTimezoneOffset();
          for (b = new Date(b.valueOf() - (e - f) * 6E4 - (e > 0 ? 864E5 : 0)); f = Hc(b), b < c.timelineFinish; b = f) d.push({
            start: b,
            finish: f,
          });
          return d;
        case 'Months':
          d = [];
          b = new Date(c.timelineStart.valueOf());
          f = b.getTimezoneOffset();
          b.setDate(1);
          e = b.getTimezoneOffset();
          for (b = new Date(b.valueOf() - (e - f) * 6E4 - (e > 0 ? 864E5 : 0)); f = Ic(b), b < c.timelineFinish; b = f) d.push({
            start: b,
            finish: f,
          });
          return d;
        case 'Weeks':
          d = [];
          b = c.timelineStart;
          f = c.weekStartDay;
          for (e = c.visibleWeekStart; ka(b) != f;) b = Ja(b);
          for (; ka(b) < e;) b = aa(b);
          for (b = new Date(b.valueOf()); f = twoWeekDateOfsset(b), b < c.timelineFinish; b = f) d.push({ start: b, finish: f });
          return d;
        case 'Days':
          d = [];
          for (b = c.timelineStart; f = aa(b), b < c.timelineFinish; b = f) d.push({ start: b, finish: f });
          return d;
        case 'Hours':
          d = [];
          for (b = new Date(Y(c.timelineStart).valueOf() + c.visibleDayStart); f = Jc(new Date(b.valueOf() + 36E5), c.visibleDayFinish, c.visibleDayStart), b < c.timelineFinish; b = f) d.push({
            start: b,
            finish: f,
          });
          return d;
        case 'NonworkingTime':
          d =
            [];
          b = gb(c.timelineStart, c.workingWeekFinish);
          for (f = hb(b, c.workingWeekStart); b < c.timelineFinish; b = twoWeekDateOfsset(b), f = twoWeekDateOfsset(f)) d.push({ start: b, finish: f });
          if (typeof c.specialNonworkingDays !== 'undefined') for (e = 0; e < c.specialNonworkingDays.length; e++) {
            b = c.specialNonworkingDays[e];
            f = aa(b);
            d.push({ start: b, finish: f });
          }
          return d;
        default:
          return a.intervals;
      }
    }, Jc = function(a, c, d) {
      if (ia(a) > c) {
        a = aa(a);
        return new Date(Y(a).valueOf() + d);
      }
      return new Date(a.valueOf());
    }, aa = function(a) {
      return new Date(a.valueOf() + 864E5);
    }, Ja = function(a) {
      return new Date(a.valueOf() -
        864E5);
    }, twoWeekDateOfsset = function(a) {
      return new Date(a.valueOf() + 6048E5*2);
    }, Ic = function(a) {
      var c = a.getTimezoneOffset(), a = new Date(a.valueOf() + (c > 0 ? 864E5 : 0)), d = a.getMonth() + 1;
      if (d >= 12) {
        d = 0;
        a.setFullYear(a.getFullYear() + 1);
      }
      a.setMonth(d, 1);
      d = a.getTimezoneOffset();
      return new Date(a.valueOf() - (d - c) * 6E4 - (d > 0 ? 864E5 : 0));
    }, Hc = function(a) {
      var c = a.getTimezoneOffset(), a = new Date(a.valueOf() + (c > 0 ? 864E5 : 0));
      a.setFullYear(a.getFullYear() + 1);
      a.setMonth(0, 1);
      var d = a.getTimezoneOffset();
      return new Date(a.valueOf() - (d - c) * 6E4 - (d > 0 ? 864E5 :
        0));
    }, Qb = function(a, c) {
      if (typeof c === 'undefined') return false;
      for (var d = a.valueOf(), b = 0; b < c.length; b++) if (c[b].valueOf() == d) return true;
      return false;
    }, gb = function(a, c) {
      for (; ka(a) != c;) a = Ja(a);
      return aa(a);
    }, hb = function(a, c) {
      for (; ka(a) != c;) a = aa(a);
      return new Date(a.valueOf());
    }, getDateFmtValue = function(a, c, d) {
      var configDateFmt = 'Date';
      if (typeof a.headerTextFormat !== 'undefined') configDateFmt = a.headerTextFormat;
      a = c.start;
      if (a < d.timelineStart) a = d.timelineStart;
      if (typeof configDateFmt === 'function') return configDateFmt(a);
      switch (configDateFmt) {
        case 'Localized':
          return a.toLocaleString();
        case 'DateTime':
          return d.dateTimeFormatter(K(a));
        case 'Date':
          return d.dateFormatter(K(a));
        case 'Hour':
          a = new Date(a.valueOf() + a.getTimezoneOffset() * 6E4);
          return (a.getHours() < 10 ? '0' : '') + a.getHours();
        case 'DayOfWeek':
          return d.daysOfWeek[ka(a)];
        case 'DayOfWeekAbbreviation':
          c = d.daysOfWeek[ka(a)];
          return c.length > 0 ? c[0].toUpperCase() + c[1] : '';
        case 'Day':
          a = new Date(a.valueOf() + a.getTimezoneOffset() * 6E4);
          return (a.getDate() < 10 ? '0' : '') + a.getDate();
        case 'Month':
          return d.months[(new Date(a.valueOf() + (a.getTimezoneOffset() +
            720) * 6E4)).getMonth()];
        case 'MonthAbbreviation':
          c = d.months[(new Date(a.valueOf() + (a.getTimezoneOffset() + 720) * 6E4)).getMonth()];
          return c.length <= 0 ? '' : c[0].toUpperCase() + (c.length > 1 ? c.substr(1, Math.min(3, c.length) - 1) : '');
        case 'Year':
          return (new Date(a.valueOf() + (a.getTimezoneOffset() + 720) * 6E4)).getFullYear();
        case 'MonthYear':
          return d.months[(new Date(a.valueOf() + (a.getTimezoneOffset() + 720) * 6E4)).getMonth()] + ' ' + (new Date(a.valueOf() + (a.getTimezoneOffset() + 720) * 6E4)).getFullYear();
        default:
          return c.headerText ?
            c.headerText : a.toString();
      }
    }, xc = function(a, c, d, b, f, e, g) {
      for (var m = 0, h = 0; h < b.length; h++) {
        var n = b[h];
        g.isGridVisible && typeof n.displayRowIndex === 'undefined' && a.appendChild(Rb(n, b, f, c, e, g));
        var l = m;
        typeof n.displayRowIndex !== 'undefined' && (l = n.displayRowIndex * g.itemHeight);
        d.appendChild(kb(n, l, g));
        n.isVisible && !(typeof n.isHidden !== 'undefined' && n.isHidden) && (m = Math.max(m, l + g.itemHeight));
        n.itemTop = l;
      }
      ta(c, m);
      setTimeout(function() {
        Ka(b, c, g);
      }, 0);
    }, ua = function(a, c) {
      for (var d = 0, b = 0, f = -1, e = 0; e < a.length; e++) {
        var g =
          a[e];
        if ((typeof g.scheduleChartItem === 'undefined' || g.scheduleChartItem == g) && g.isVisible && !(typeof g.isHidden !== 'undefined' && g.isHidden)) if (typeof g.displayRowIndex === 'undefined' && b > f) {
          d = d + c.itemHeight;
          f = b++;
        } else {
          d = Math.max(d, g.itemTop + c.itemHeight);
          f = g.displayRowIndex;
        }
      }
      return d;
    }, za = function(a, c, d) {
      if (a.isPart) return za(a.ganttChartItem, c, d);
      var b;
      if (typeof a.displayRowIndex !== 'undefined') {
        b = a.displayRowIndex * d.itemHeight;
        return a.itemTop = b;
      }
      for (var f = b = 0; f < c.length; f++) {
        var e = c[f];
        if (e == a) break;
        e.isVisible &&
        (!(typeof e.isHidden !== 'undefined' && e.isHidden) && typeof e.displayRowIndex === 'undefined') && (b = b + d.itemHeight);
      }
      return a.itemTop = b;
    }, Ka = function(a, c, d) {
      if (!(typeof d.alternativeItemClass === 'undefined' && typeof d.alternativeItemStyle === 'undefined' && typeof d.alternativeChartItemClass === 'undefined' && typeof d.alternativeChartItemStyle === 'undefined')) {
        var b = c.chartAreaAlternativeRows, f, e = 0, g = false;
        b.count = e;
        for (f = 0; f < a.length; f++) {
          var m = a[f];
          if (m.isVisible && typeof m.alternativeContentContainer !== 'undefined') {
            var h =
              m.alternativeContentContainer;
            if (e % 2 == 1) {
              typeof d.alternativeItemClass !== 'undefined' && h.setAttribute('class', d.alternativeItemClass);
              typeof d.alternativeItemStyle !== 'undefined' && h.setAttribute('style', d.alternativeItemStyle);
              if (typeof d.alternativeChartItemClass !== 'undefined' || typeof d.alternativeChartItemStyle !== 'undefined') if (!d.isVirtualizing || m.isVirtuallyVisible || !g) {
                g = true;
                if (typeof b.count === 'undefined' || e > b.count) {
                  m = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                  m.setAttribute('x',
                    0);
                  m.setAttribute('y', e * d.itemHeight);
                  m.setAttribute('width', c.clientWidth);
                  m.setAttribute('height', d.itemHeight);
                  typeof d.alternativeChartItemClass !== 'undefined' && m.setAttribute('class', d.alternativeChartItemClass);
                  typeof d.alternativeChartItemStyle !== 'undefined' && m.setAttribute('style', d.alternativeChartItemStyle);
                  m.index = e;
                  b.appendChild(m);
                }
              }
              b.count = e;
            } else {
              h.setAttribute('class', '');
              h.setAttribute('style', '');
            }
            e++;
          }
        }
        for (f = b.childNodes.length; f-- > 0;) {
          a = b.childNodes[f];
          a.index > b.count && b.removeChild(a);
        }
      }
    },
    Rb = function(a, c, d, b, f, e) {
      var g = a.ganttChartView.ownerDocument, m = g.createElement('div');
      typeof e.itemClass !== 'undefined' && m.setAttribute('class', e.itemClass);
      typeof e.itemStyle !== 'undefined' && m.setAttribute('style', e.itemStyle);
      m.classList.add('description-row-root');
      var h = g.createElement('div');
      a.alternativeContentContainer = h;
      var n = g.createElement('div');
      try {
        n.addEventListener('mousedown', function(b) {
          b.target != a.selectionInput && x(a, e);
        }, false);
        n.addEventListener('mouseup', function(b) {
          b.target != a.selectionInput && x(a, e);
        }, false);
      } catch (l) {
      }
      if (a.isSelected) {
        typeof e.selectedItemClass !==
        'undefined' && n.setAttribute('class', e.selectedItemClass);
        typeof e.selectedItemStyle !== 'undefined' && n.setAttribute('style', e.selectedItemStyle);
      }
      var s = g.createElement('div');
      typeof a['class'] !== 'undefined' && s.setAttribute('class', a['class']);
      typeof a.style !== 'undefined' && s.setAttribute('style', a.style);
      var u = g.createElement('div');
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
        typeof e.summaryItemClass !== 'undefined' && u.setAttribute('class', e.summaryItemClass);
        typeof e.summaryItemStyle !==
        'undefined' && u.setAttribute('style', e.summaryItemStyle);
      } else if (a.isMilestone) {
        typeof e.milestoneItemClass !== 'undefined' && u.setAttribute('class', e.milestoneItemClass);
        typeof e.milestoneItemStyle !== 'undefined' && u.setAttribute('style', e.milestoneItemStyle);
      } else {
        typeof e.standardItemClass !== 'undefined' && u.setAttribute('class', e.standardItemClass);
        typeof e.standardItemStyle !== 'undefined' && u.setAttribute('style', e.standardItemStyle);
      }
      g = g.createElement('div');
      a.gridItem = g;
      a.gridItemContent = u;
      a.gridItemSelectionContainer =
        n;
      var v = e.itemHeight;
      if (!a.isVisible || typeof a.isHidden !== 'undefined' && a.isHidden) v = 0;
      g.setAttribute('style', 'overflow: hidden; height: ' + v + 'px');
      Aa(g, a, c, d, b, f, e);
      u.appendChild(g);
      s.appendChild(u);
      n.appendChild(s);
      h.appendChild(n);
      m.appendChild(h);
      a.gridItemContainer = m;
      (typeof e.isGridRowClickTimeScrollingEnabled === 'undefined' || e.isGridRowClickTimeScrollingEnabled) && m.addEventListener('mouseup', function() {
        var c;
        if (typeof a.ganttChartItems === 'undefined') c = a.start; else {
          c = null;
          for (var d = 0; d < a.ganttChartItems.length; d++) if (c ==
            null || a.ganttChartItems[d].start < c) c = a.ganttChartItems[d].start;
          c = c == null ? a.start : c;
        }
        c = calculateBarX(c, e);
        d = c - e.hourWidth * 8;
        c - d >= b.container.clientWidth / 2.5 && (d = c);
        b.container.scrollLeft = Math.max(0, d);
      }, true);
      return m;
    }, Aa = function(a, c, d, b, f, e, g) {
      var m = c.ganttChartView.ownerDocument;
      if (!g.isVirtualizing || typeof c.isVirtuallyVisible !== 'undefined' && c.isVirtuallyVisible) {
        var h = function() {
          if (typeof c.gridItemSelectionContainer !== 'undefined') {
            var h = c.gridItemSelectionContainer;
            typeof g.selectedItemClass !== 'undefined' &&
            h.setAttribute('class', c.isSelected ? g.selectedItemClass : null);
            typeof g.selectedItemStyle !== 'undefined' && h.setAttribute('style', c.isSelected ? g.selectedItemStyle : null);
          }
          if (typeof c.gridItemContent !== 'undefined') {
            h = c.gridItemContent;
            h.setAttribute('class', '');
            h.setAttribute('style', '');
            if (c.hasChildren && (typeof c.isSummaryEnabled === 'undefined' || c.isSummaryEnabled)) {
              typeof g.summaryItemClass !== 'undefined' && h.setAttribute('class', g.summaryItemClass);
              typeof g.summaryItemStyle !== 'undefined' && h.setAttribute('style',
                g.summaryItemStyle);
            } else if (c.isMilestone) {
              typeof g.milestoneItemClass !== 'undefined' && h.setAttribute('class', g.milestoneItemClass);
              typeof g.milestoneItemStyle !== 'undefined' && h.setAttribute('style', g.milestoneItemStyle);
            } else {
              typeof g.standardItemClass !== 'undefined' && h.setAttribute('class', g.standardItemClass);
              typeof g.standardItemStyle !== 'undefined' && h.setAttribute('style', g.standardItemStyle);
            }
          }
          var h = [], l = null;
          try {
            l = m.activeElement;
          } catch (s) {
          }
          for (; l != null && l != c.gridItem;) {
            h.push(l);
            l = l.parentNode;
          }
          for (var u =
            -1, l = a.childNodes.length; l-- > 0;) if (h.indexOf(a.childNodes[l]) >= 0) {
            u = l;
            break;
          }
          for (l = a.childNodes.length; l-- > 0;) a.removeChild(a.childNodes[l]);
          for (l = 0; l < b.length; l++) a.appendChild(Sb(c, d, b[l], f, e, g));
          typeof c.ganttChartView.draggingItem === 'undefined' && u >= 0 && setTimeout(function() {
            try {
              for (var b = a.childNodes[u]; b.nodeName != "input" && b.nodeName != "textarea" && b.nodeName != "label" && b.nodeName != "select" && b.nodeName != "button" && b.childNodes.length > 0;) b = b.childNodes[0];
              b && b.dontAutoFocus ? delete b.dontAutoFocus :
                setTimeout(function() {
                  try {
                    b.focus();
                  } catch (a) {
                  }
                }, 0);
            } catch (c) {
            }
          }, 0);
        };
        if (c.wasGridItemContentLoaded) setTimeout(h, 0); else {
          h();
          c.wasGridItemContentLoaded = true;
        }
      }
    }, La = function(a) {
      if (typeof a.isWaitingToRefreshGridItem === 'undefined') {
        a.isWaitingToRefreshGridItem = true;
        setTimeout(function() {
            typeof a.gridItem !== 'undefined' && Aa(a.gridItem, a, a.ganttChartView.items, a.ganttChartView.settings.columns, a.ganttChartView.chartContent, a.ganttChartView.settings.toggleButtonAreaWidth, a.ganttChartView.settings);
            delete a.isWaitingToRefreshGridItem;
          },
          0);
      }
    }, Kc = function(a, c, d, b, f, e, g) {
      var m = c.ganttChartView.ownerDocument;
      (!g.isVirtualizing || typeof c.isVirtuallyVisible !== 'undefined' && c.isVirtuallyVisible) && setTimeout(function() {
        if (typeof c.gridItemSelectionContainer !== 'undefined') {
          var h = c.gridItemSelectionContainer;
          typeof g.selectedItemClass !== 'undefined' && h.setAttribute('class', c.isSelected ? g.selectedItemClass : null);
          typeof g.selectedItemStyle !== 'undefined' && h.setAttribute('style', c.isSelected ? g.selectedItemStyle : null);
        }
        var h = [], n = null;
        try {
          n = m.activeElement;
        } catch (l) {
        }
        for (; n !=
               null && n != c.gridItem;) {
          h.push(n);
          n = n.parentNode;
        }
        for (var s = -1, n = a.childNodes.length; n-- > 0;) if (a.childNodes[n].isSelection && h.indexOf(a.childNodes[n]) >= 0) {
          s = n;
          break;
        }
        for (n = a.childNodes.length; n-- > 0;) a.childNodes[n].isSelection && a.removeChild(a.childNodes[n]);
        for (n = 0; n < b.length; n++) b[n].isSelection && n < a.childNodes.length && a.insertBefore(Sb(c, d, b[n], f, e, g), a.childNodes[n]);
        typeof c.ganttChartView.draggingItem === 'undefined' && s >= 0 && setTimeout(function() {
          try {
            for (var b = a.childNodes[s]; b.nodeName != "input" &&
            b.nodeName != "textarea" && b.nodeName != "label" && b.nodeName != "select" && b.nodeName != "button" && b.childNodes.length > 0;) b = b.childNodes[0];
            b && b.dontAutoFocus ? delete b.dontAutoFocus : setTimeout(function() {
              try {
                b.focus();
              } catch (a) {
              }
            }, 0);
          } catch (c) {
          }
        }, 0);
      }, 0);
    }, Ob = function(a) {
      typeof a.gridItem !== 'undefined' && Kc(a.gridItem, a, a.ganttChartView.items, a.ganttChartView.settings.columns, a.ganttChartView.chartContent, a.ganttChartView.settings.toggleButtonAreaWidth, a.ganttChartView.settings);
    }, Sb = function(a, c, d, b, f, e) {
      var g =
        a.ganttChartView.ownerDocument, m = g.createElement('div'), h = 0;
      d.isTreeView == true && (h = e.indentationLevelWidth * a.indentation);
      m.classList.add('gantt-description-item')
      m.setAttribute('style', 'overflow: hidden; vertical-align: middle; display: table-cell; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: ' + d.width + 'px; height: ' + e.itemHeight + 'px; padding-left: ' + h + 'px');
      var n = g.createElement('div');
      typeof d.cellClass !== 'undefined' ? n.setAttribute('class', d.cellClass) : typeof e.cellClass !==
        'undefined' && n.setAttribute('class', e.cellClass);
      typeof d.cellStyle !== 'undefined' ? n.setAttribute('style', d.cellStyle) : typeof e.cellStyle !== 'undefined' && n.setAttribute('style', e.cellStyle);
      var l = g.createElement('div');
      l.setAttribute('style', 'white-space: nowrap; overflow: hidden; margin: 0px; padding: 0px; width: ' + (d.width - h - 16) + 'px');
      if (d.isTreeView == true) {
        h = g.createElement('div');
        h.setAttribute('style', 'display: inline-block; width: ' + f + 'px');
        if (a.hasChildren) {
          f = g.createElement('div');
          f.setAttribute('style',
            'cursor: default; padding-left: 1px; font-size: 12px; display: inline-block');
          g = e.collapsedToggleButtonTemplate;
          if (a.isExpanded) g = e.expandedToggleButtonTemplate;
          g = g();
          f.appendChild(g);
          Tb(f, a, c, g, b, null, null, e);
          h.appendChild(f);
        }
        l.appendChild(h);
      }
      a = d.cellTemplate(a);
      l.appendChild(a);
      n.appendChild(l);
      m.appendChild(n);
      m.isSelection = d.isSelection;
      return m;
    }, zb = function(a, c) {
      return function() {
        var d = a.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        d.setAttribute('points', '3.5,2.5 3.5,11.5 10.5,6.5');
        return j(d, c);
      };
    }, Ab = function(a, c) {
      return function() {
        var d = a.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        d.setAttribute('points', '2.5,3.5 11.5,3.5 6.5,10.5');
        return j(d, c);
      };
    }, Tb = function(a, c, d, b, f, e, g, m) {
      if (typeof e === 'undefined' || e == null) e = b.querySelector('#PART_Button');
      e != null && Ub(e, e, m);
      if (typeof g === 'undefined' || g == null) g = b.querySelector('#PART_Border');
      g != null && Ub(g, e, m);
      d = { toggleButton: a, item: c, items: d, content: b, chartContent: f, settings: m };
      if (e != null) {
        e.tag = d;
        (typeof m.isExport ===
          'undefined' || !m.isExport) && e.addEventListener('mouseup', lb, true);
      }
      if (g != null) {
        g.tag = d;
        (typeof m.isExport === 'undefined' || !m.isExport) && g.addEventListener('mouseup', lb, true);
      }
      a.tag = d;
      e == null && (g == null && (typeof m.isExport === 'undefined' || !m.isExport)) && a.addEventListener('mouseup', lb, true);
      b.addEventListener('keypress', function(a) {
        if (a.keyCode == 32) {
          a.preventDefault();
          a.stopPropagation();
          ha(c, !c.isExpanded, true);
        }
      }, true);
      c.toggleButton = a;
    }, Ub = function(a, c, d) {
      if (!(typeof d.isExport !== 'undefined' && d.isExport)) {
        a.addEventListener('mouseover',
          function() {
            typeof d.toggleButtonHoveringClass !== 'undefined' && c.setAttribute('class', d.toggleButtonHoveringClass);
            typeof d.toggleButtonHoveringStyle !== 'undefined' && c.setAttribute('style', d.toggleButtonHoveringStyle);
          }, true);
        a.addEventListener('mouseout', function() {
          c.setAttribute('class', d.toggleButtonClass);
          c.setAttribute('style', d.toggleButtonStyle);
        }, true);
      }
    }, lb = function(a) {
      a.stopPropagation();
      a = a.target.tag.item;
      ha(a, !a.isExpanded, true);
    }, ha = function(a, c, d, b) {
      if (a.isExpanded != c) {
        a.isExpanded = c;
        (typeof b ===
          'undefined' || b) && y(a, 'isExpanded', d, true);
        Vb(a);
      }
    }, Vb = function(a, c) {
      if (typeof a.toggleButton === 'undefined') (typeof c === 'undefined' || c) && setTimeout(function() {
        Vb(a, false);
      }, 0); else {
        var d = a.toggleButton, b = d.tag, f = b.settings, e = f.expandedToggleButtonTemplate,
          g = f.collapsedToggleButtonTemplate;
        a.isExpanded && (g = e);
        var e = g(), g = e.querySelector('#PART_Button'), m = e.querySelector('#PART_Border');
        d.replaceChild(e, b.content);
        b.content = e;
        var h = b.items, b = b.chartContent;
        Tb(d, a, h, e, b, g, m, f);
        a.isVisible && !(typeof a.isHidden !==
          'undefined' && a.isHidden) && Lc(h, a, b, f);
        oa(a);
        Ka(h, b, f);
        d = a.scheduleChartView;
        if (typeof d !== 'undefined') for (f = a.scheduleChartIndex; f < d.scheduleChartItems.length; f++) {
          b = d.scheduleChartItems[f];
          if (typeof b.ganttChartItems !== 'undefined') for (e = 0; e < b.ganttChartItems.length; e++) {
            g = b.ganttChartItems[e];
            g.displayRowIndex = b.itemTop / d.settings.itemHeight;
            d.refreshChartItem(g);
          }
        }
      }
    }, Lc = function(a, c, d, b) {
      var f = -1, e = false, g = false, m = false, h = 0, n, l, s, u = [];
      for (l = 0; l < a.length; l++) {
        s = a[l];
        if (s == c) {
          e = s.isExpanded;
          f = s.indentation;
        } else s.indentation <=
        f && (m = true);
        var v = s.chartItem;
        if (g && !m) {
          if (e) {
            n = true;
            for (var C = s.parent; C != null;) {
              if (!C.isVisible || !C.isExpanded) {
                n = false;
                break;
              }
              C = C.parent;
            }
          } else n = false;
          if (s.isVisible != n) {
            s.isVisible = e;
            y(s, 'isVisible', false, true);
            n = b.itemHeight;
            if (!s.isVisible || typeof s.isHidden !== 'undefined' && s.isHidden) n = 0;
            if (typeof s.gridItem !== 'undefined') s.gridItem.style.height = n + 'px';
            n = 'visible';
            if (!s.isVisible || typeof s.isHidden !== 'undefined' && s.isHidden) n = 'hidden';
            v.setAttribute('style', 'visibility: ' + n);
          }
        }
        if (typeof s.displayRowIndex ===
          'undefined') {
          v.setAttribute('transform', 'translate(0, ' + h + ')');
          Ea(s, h);
        }
        s == c && (g = true);
        n = b.itemHeight;
        if (!s.isVisible || typeof s.isHidden !== 'undefined' && s.isHidden) n = 0;
        if (s.itemTop != h) s.itemTop = h;
        typeof s.displayRowIndex === 'undefined' && (h = h + n);
        if (s.predecessors && s.predecessors.length > 0 && u.indexOf(s) < 0) {
          u.push(s);
          for (v = 0; v < s.predecessors.length; v++) {
            n = s.predecessors[v].item;
            u.indexOf(n) < 0 && u.push(n);
          }
        }
      }
      ta(d, h);
      qa(a, c);
      if (b.areTaskDependenciesVisible) for (l = 0; l < u.length; l++) qa(a, u[l]);
      va(a, d.container,
        b);
    }, Ea = function(a, c) {
      typeof a.parts === 'undefined' || a.parts.length <= 0 || setTimeout(function() {
        for (var d = 0; d < a.parts.length; d++) {
          var b = a.parts[d];
          b.itemTop = c;
          if (typeof b.chartItem !== 'undefined') {
            b.chartItem.setAttribute('transform', 'translate(0, ' + c + ')');
            b.chartItem.style.visibility = a.chartItem.style.visibility;
            if (typeof b.isInternallyHidden !== 'undefined') {
              delete b.isInternallyHidden;
              b.chartItem.style.display = 'inline';
            }
          }
        }
      }, 0);
    }, ta = function(a, c) {
      if (c < a.availableHeight) c = a.availableHeight;
      a.style.height =
        c + 'px';
      var d = a.chartArea;
      d.style.height = c + 'px';
      for (var b = 0; b < d.childNodes.length; b++) {
        var f = d.childNodes[b];
        if (typeof f.tag !== 'undefined') switch (f.tag) {
          case 'Scale-Highlighting':
          case 'Scale-Highlighting-CurrentTime':
            f.setAttribute('height', c);
            break;
          case 'Scale-Separator':
          case 'Scale-Separator-CurrentTime':
            f.setAttribute('y2', c);
        }
      }
    }, qa = function(a, c) {
      var d = [], b, f, e, g;
      if (typeof c.successors === 'undefined') {
        c.successors = [];
        for (f = 0; f < a.length; f++) {
          b = a[f];
          if (!(b == c || typeof b.predecessors === 'undefined' || b.predecessors.length ==
            0)) for (e = 0; e < b.predecessors.length; e++) if (b.predecessors[e].item == c) {
            c.successors.push(b);
            break;
          }
        }
      }
      for (f = 0; f < c.successors.length; f++) {
        var m = c.successors[f];
        if (typeof m.predecessors !== 'undefined' && m.predecessors.length > 0) for (e = 0; e < m.predecessors.length; e++) {
          var h = m.predecessors[e].item;
          if (typeof h !== 'undefined') {
            b = true;
            for (g = 0; g < d; g++) if (h == d[g]) {
              b = false;
              break;
            }
            if (b) {
              fa(h.chartItem, h, h.ganttChartView.settings);
              d.push(h);
            }
          }
        }
        if (typeof m.predecessors !== 'undefined' && m.predecessors.length > 0) {
          b = true;
          for (g =
                 0; g < d; g++) if (typeof m !== 'undefined' && m == d[g]) {
            b = false;
            break;
          }
          if (b) {
            fa(m.chartItem, m, m.ganttChartView.settings);
            d.push(m);
          }
        }
      }
    }, kb = function(a, c, d) {
      var b = a.ganttChartView.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'g');
      a.chartItem = b;
      var f = 'visible';
      if (!a.isVisible || typeof a.isHidden !== 'undefined' && a.isHidden) f = 'hidden';
      b.setAttribute('style', 'visibility: ' + f + '; -ms-touch-action: pinch-zoom; touch-action: pinch-zoom');
      b.setAttribute('transform', 'translate(0, ' + c + ')');
      if (typeof a.isInternallyHidden !==
        'undefined' && a.isInternallyHidden) b.style.display = 'none';
      Ea(a, c);
      fa(b, a, d);
      try {
        b.addEventListener('mousedown', function() {
          x(a, d);
        }, false);
        b.addEventListener('mouseup', function() {
          x(a, d);
        }, false);
      } catch (e) {
      }
      return b;
    }, fa = function(a, c, d) {
      for (var b = a.childNodes.length; b-- > 0;) a.removeChild(a.childNodes[b]);
      if (!(d.isVirtualizing && (typeof c.isVirtuallyVisible === 'undefined' || !c.isVirtuallyVisible) || typeof c.isBarVisible !== 'undefined' && !c.isBarVisible)) {
        b = d.standardTaskTemplate;
        if (typeof c.standardTaskTemplate !==
          'undefined') b = c.standardTaskTemplate;
        if (c.hasChildren && (typeof c.isSummaryEnabled === 'undefined' || c.isSummaryEnabled)) {
          b = d.summaryTaskTemplate;
          if (typeof c.summaryTaskTemplate !== 'undefined') b = c.summaryTaskTemplate;
        } else if (c.isMilestone) {
          b = d.milestoneTaskTemplate;
          if (typeof c.milestoneTaskTemplate !== 'undefined') b = c.milestoneTaskTemplate;
        }
        if (typeof c.taskTemplate !== 'undefined') b = c.taskTemplate;
        if (typeof d.internalPreTaskTemplate !== 'undefined') {
          var f = d.internalPreTaskTemplate(c);
          f != null && a.appendChild(f);
        }
        b =
          b(c);
        b.addEventListener('contextmenu', function(a) {
          typeof d.itemContextMenuHandler !== 'undefined' ? d.itemContextMenuHandler(a, c) : a.preventDefault();
        }, false);
        a.appendChild(b);
        if (typeof d.internalExtraTaskTemplate !== 'undefined') {
          f = d.internalExtraTaskTemplate(c);
          f != null && a.appendChild(f);
        }
        if (typeof d.extraTaskTemplate !== 'undefined') {
          f = d.extraTaskTemplate(c);
          f != null && a.appendChild(f);
        }
        if (d.areTaskAssignmentsVisible) {
          f = d.assignmentsTemplate(c);
          b.appendChild(f);
        }
        if (d.isTaskToolTipVisible) {
          f = d.itemTemplate;
          if (typeof c.template !== 'undefined') f = c.template;
          b.appendChild(f(c));
        }
        if (d.areTaskDependenciesVisible && typeof c.predecessors !== 'undefined') for (b = 0; b < c.predecessors.length; b++) {
          f = c.predecessors[b];
          if (!((typeof c.ganttChartView === 'undefined' || c.ganttChartView.items.indexOf(f.item)) < 0 || !f.item.isVisible || typeof f.item.isHidden !== 'undefined' && f.item.isHidden || typeof f.item.isBarVisible !== 'undefined' && !f.item.isBarVisible)) {
            var e = d.dependencyLineTemplate(c, f);
            e.predecessorIndex = b;
            (function() {
              e.addEventListener('click', function(a) {
                d.dependencyLineClickHandler &&
                d.dependencyLineClickHandler(c.predecessors[this.predecessorIndex], c, a);
              });
              e.addEventListener('dblclick', function(a) {
                d.dependencyLineDoubleClickHandler && d.dependencyLineDoubleClickHandler(c.predecessors[this.predecessorIndex], c, a);
              });
            })(f);
            typeof d.predecessorItemContextMenuHandler !== 'undefined' ? e.addEventListener('contextmenu', function(a) {
              d.predecessorItemContextMenuHandler(a, c.predecessors[this.predecessorIndex], c);
            }) : !d.isReadOnly && (!d.isChartReadOnly && !d.areTaskPredecessorsReadOnly && (typeof c.isReadOnly ===
              'undefined' || !c.isReadOnly)) && e.addEventListener('contextmenu', function(a) {
              if (window.confirm('Are you sure you want to remove the predecessor?')) {
                for (var b = [], f = 0; f < c.predecessors.length; f++) if (f != this.predecessorIndex) {
                  var e = c.predecessors[f];
                  delete e.item.successors;
                  b.push(e);
                }
                c.predecessors = b;
                y(c, 'predecessors', true, true);
                fa(c.chartItem, c, d);
                qa(c.ganttChartView.items, c);
              }
              a.preventDefault();
            }, false);
            a.appendChild(e);
            if (d.isDependencyToolTipVisible) {
              var g = d.predecessorItemTemplate;
              if (typeof f.template !== 'undefined') g =
                f.template;
              e.appendChild(g(c, f));
            }
          }
        }
      }
    }, Na = function(a) {
      for (var c = 0; c < a.length; c++) Ma(a[c]);
    }, oa = function(a) {
      if ((!a.ganttChartView.settings.isVirtualizing || typeof a.isVirtuallyVisible !== 'undefined' && a.isVirtuallyVisible) && typeof a.isWaitingToRefreshChartItem === 'undefined') {
        a.isWaitingToRefreshChartItem = true;
        setTimeout(function() {
            fa(a.chartItem, a, a.ganttChartView.settings);
            var c = za(a, a.ganttChartView.items, a.ganttChartView.settings);
            a.chartItem.setAttribute('transform', 'translate(0, ' + c + ')');
            Ea(a, c);
            delete a.isWaitingToRefreshChartItem;
          },
          0);
      }
    }, na = function(a) {
      if (!a.ganttChartView.settings.isVirtualizing || typeof a.isVirtuallyVisible !== 'undefined' && a.isVirtuallyVisible) if (typeof a.isWaitingToRefreshGridItem !== 'undefined' || typeof a.isWaitingToRefreshChartItem !== 'undefined') {
        typeof a.isWaitingToRefreshGridItem === 'undefined' && La(a);
        typeof a.isWaitingToRefreshChartItem === 'undefined' && oa(a);
      } else {
        a.isWaitingToRefreshGridItem = true;
        a.isWaitingToRefreshChartItem = true;
        setTimeout(function() {
          typeof a.gridItem !== 'undefined' && Aa(a.gridItem, a, a.ganttChartView.items,
            a.ganttChartView.settings.columns, a.ganttChartView.chartContent, a.ganttChartView.settings.toggleButtonAreaWidth, a.ganttChartView.settings);
          fa(a.chartItem, a, a.ganttChartView.settings);
          var c = za(a, a.ganttChartView.items, a.ganttChartView.settings);
          a.chartItem.setAttribute('transform', 'translate(0, ' + c + ')');
          Ea(a, c);
          delete a.isWaitingToRefreshGridItem;
          delete a.isWaitingToRefreshChartItem;
        }, 0);
      }
    }, ra = function(a) {
      if ((!a.ganttChartView.settings.isVirtualizing || typeof a.isVirtuallyVisible !== 'undefined' && a.isVirtuallyVisible) &&
        typeof a.isWaitingToRefreshPredecessorItems === 'undefined') {
        a.isWaitingToRefreshPredecessorItems = true;
        setTimeout(function() {
          qa(a.ganttChartView.items, a);
          delete a.isWaitingToRefreshPredecessorItems;
        }, 0);
      }
    }, Ma = function(a) {
      if (!a.ganttChartView.settings.isVirtualizing || typeof a.isVirtuallyVisible !== 'undefined' && a.isVirtuallyVisible) if (typeof a.isWaitingToRefreshGridItem !== 'undefined' || typeof a.isWaitingToRefreshChartItem !== 'undefined' || typeof a.isWaitingToRefreshPredecessorItems !== 'undefined') {
        typeof a.isWaitingToRefreshGridItem ===
        'undefined' && La(a);
        typeof a.isWaitingToRefreshChartItem === 'undefined' && oa(a);
        typeof a.isWaitingToRefreshPredecessorItems === 'undefined' && ra(a);
      } else {
        a.isWaitingToRefreshGridItem = true;
        a.isWaitingToRefreshChartItem = true;
        a.isWaitingToRefreshPredecessorItems = true;
        setTimeout(function() {
          typeof a.gridItem !== 'undefined' && Aa(a.gridItem, a, a.ganttChartView.items, a.ganttChartView.settings.columns, a.ganttChartView.chartContent, a.ganttChartView.settings.toggleButtonAreaWidth, a.ganttChartView.settings);
          fa(a.chartItem,
            a, a.ganttChartView.settings);
          var c = za(a, a.ganttChartView.items, a.ganttChartView.settings);
          a.chartItem.setAttribute('transform', 'translate(0, ' + c + ')');
          Ea(a, c);
          qa(a.ganttChartView.items, a);
          delete a.isWaitingToRefreshGridItem;
          delete a.isWaitingToRefreshChartItem;
          delete a.isWaitingToRefreshPredecessorItems;
        }, 0);
      }
    }, Z = function(a) {
      Ma(a);
      for (a = a.parent; a != null;) {
        Va(a);
        Ma(a);
        a = a.parent;
      }
    }, Oa = function(a, c, d, b) {
      ganttChartViewInitItems(c, b);
      ma(c, d);
      ca(c, b, d);
      d = a.index - 1;
      d >= 0 && Z(c[d]);
      Z(a);
      d = a.index + 1;
      d < c.length && Z(c[d]);
    }, Xa = function(a,
                     c) {
      var d = c.toggleButtonAreaWidth;
      delete c.toggleButtonAreaWidth;
      J(a, c);
      return c.toggleButtonAreaWidth != d;
    }, Wb = function(a, c, d, b, f) {
      c.ganttChartView = d;
      for (c.isVirtuallyVisible = true; a > 0 && b[a - 1].isPart;) a--;
      for (var e = 0; e < b.length; e++) if (b[e].parts && b[e].parts.indexOf(c) >= 0) {
        c.isPart = true;
        c.ganttChartItem = b[e];
        break;
      }
      var g = a < b.length ? b[a] : null;
      if (g == null || g.isPart) {
        g = a > 0 ? b[a - 1] : null;
        g = g != null ? g.indentation + 1 : 0;
        if (c.indentation > g) c.indentation = g;
      } else if (typeof c.indentation === 'undefined' || c.indentation < g.indentation -
        1 || c.indentation > g.indentation) c.indentation = g.indentation;
      ganttChartViewInitItems([c], f);
      b.splice(a, 0, c);
      ma(b, d);
      if (typeof c.parts !== 'undefined') {
        if (typeof c.isGroup === 'undefined') {
          c.isGroup = true;
          c.isSummaryEnabled = false;
        }
        ganttChartViewInitItems(c.parts, f);
        if (c.isGroup || typeof c.isBarVisible === 'undefined') c.isBarVisible = false;
        for (e = 0; e < c.parts.length; e++) {
          var m = c.parts[e];
          m.ganttChartView = c.ganttChartView;
          m.ganttChartItem = c;
          m.isPart = true;
          m.isVirtuallyVisible = true;
          if (c.isGroup || typeof m.indentation === 'undefined') m.indentation = 0;
          if (c.isGroup ||
            typeof m.displayRowIndex === 'undefined') m.displayRowIndex = -1;
          m.isInternallyHidden = true;
          b.indexOf(m) >= 0 || b.splice(b.length, 0, m);
        }
      }
      ca(b, f, d);
      var h;
      if (f.isGridVisible && !c.isPart && typeof c.displayRowIndex === 'undefined') {
        e = null;
        if (a < b.length - 1) {
          g = b[a + 1];
          if (!g.isPart) {
            h = g.itemTop;
            if (typeof g.gridItemContainer !== 'undefined') e = g.gridItemContainer;
          }
        }
        d.gridContent.insertBefore(Rb(c, b, f.columns, d.chartContent, f.toggleButtonAreaWidth, f), e);
      }
      typeof h === 'undefined' && (h = ua(b, f) - f.itemHeight);
      g = h;
      typeof c.displayRowIndex !==
      'undefined' && (g = c.displayRowIndex * f.itemHeight);
      var n = d.chartContent.chartArea;
      n.appendChild(kb(c, g, f));
      c.isVisible && !(typeof c.isHidden !== 'undefined' && c.isHidden) && (h = Math.max(h, g + f.itemHeight));
      c.itemTop = g;
      if (typeof c.parts !== 'undefined') for (e = 0; e < c.parts.length; e++) {
        m = c.parts[e];
        n.appendChild(kb(m, g, f));
      }
      if (typeof c.displayRowIndex === 'undefined') for (e = a + 1; e < b.length; e++) {
        m = b[e];
        g = h;
        typeof m.displayRowIndex !== 'undefined' && (g = m.displayRowIndex * f.itemHeight);
        m.isVisible && !(typeof m.isHidden !== 'undefined' &&
          m.isHidden) && (h = Math.max(h, g + f.itemHeight));
        m.itemTop = g;
        oa(m);
        qa(b, m);
      }
      for (e = a + 1; e < b.length; e++) La(b[e]);
      if (d.isContentHeightInitialized && d.isContentHeightAuto) {
        a = P(d, b, f);
        d.gridContentContainer.style.height = a;
        d.chartContentContainer.style.height = a;
      }
      ta(d.chartContent, ua(b, f));
      Ka(b, d.chartContent, f);
      Xa(b, f) && Na(b);
      Oa(c, b, d, f);
      va(b, d.chartContentContainer, f);
    }, Xb = function(a, c, d, b) {
      if (typeof a.parts !== 'undefined') for (var f = 0; f < a.parts.length; f++) Xb(a.parts[f], c, d, b);
      var f = a.index, e = null, g = false;
      if (f > 0) {
        for (e =
               d[f - 1]; e.parent != null;) e = e.parent;
        g = e.isExpanded;
        a.hasChildren && ha(e, a.isExpanded, false, true);
        e.indentation >= a.indentation && (e = null);
      } else d[0].isExpanded || ha(d[0], true, false, true);
      var m = f + 1 < d.length ? d[f + 1] : null;
      m != null && (!m.isExpanded && m.indentation > a.indentation) && ha(m, true, false, true);
      var h = m != null ? m.indentation : null, n, l, s;
      for (l = 0; l < c.items.length; l++) {
        n = c.items[l];
        if (n.predecessors != null) for (s = n.predecessors.length; s-- > 0;) if (n.predecessors[s].item == a) {
          n.predecessors.splice(s, 1);
          y(n, 'predecessors',
            false, true);
          na(n);
          ra(n);
        }
      }
      var u = a.itemTop;
      d.splice(f, 1);
      ma(d, c);
      ca(d, b, c);
      b.isGridVisible && typeof a.displayRowIndex === 'undefined' && typeof a.gridItemContainer !== 'undefined' && c.gridContent.removeChild(a.gridItemContainer);
      l = c.chartContent.chartArea;
      typeof a.chartItem !== 'undefined' && l.removeChild(a.chartItem);
      m = f < d.length ? d[f] : null;
      if (m != null && m.indentation < h) {
        y(m, 'indentation', false, true);
        m.predecessors = [];
        y(m, 'predecessors', false, true);
        for (l = 0; l < d.length; l++) {
          n = d[l];
          if (!(n == m || typeof n.predecessors ===
            'undefined' || n.predecessors.length == 0)) for (s = 0; s < n.predecessors.length; s++) if (n.predecessors[s].item == m) {
            n.predecessors.splice(s--, 1);
            y(n, 'predecessors', false, true);
            na(n);
            ra(n);
          }
        }
      }
      e != null && ha(e, g, false, true);
      for (l = f; l < d.length; l++) {
        a = d[l];
        let actualItemTop = u;
        typeof a.displayRowIndex !== 'undefined' && (actualItemTop = a.displayRowIndex * b.itemHeight);
        a.isVisible && !(typeof a.isHidden !== 'undefined' && a.isHidden) && (u = Math.max(u, actualItemTop + b.itemHeight));
        a.itemTop = actualItemTop;
        na(a);
      }
      ta(c.chartContent, ua(d, b));
      Ka(d, c.chartContent, b);
      Xa(d, b) && Na(d);
      f >= d.length && (f = d.length - 1);
      if (f >= 0) {
        for (l = 0; l < f; l++) oa(d[l]);
        Oa(d[f], d, c, b);
      }
      va(d, c.chartContentContainer, b);
    }, Cb = function(a, c) {
      return function(d) {
        typeof d === 'undefined' && (d = a);
        var b = d.ownerDocument, d = b.createElementNS('http://www.w3.org/2000/svg', 'defs'),
          f = b.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        f.setAttribute('id', 'BlueGradient');
        f.setAttribute('x1', '0%');
        f.setAttribute('y1', '0%');
        f.setAttribute('x2', '0%');
        f.setAttribute('y2', '100%');
        var e = b.createElementNS('http://www.w3.org/2000/svg', 'stop');
        e.setAttribute('offset', '0%');
        e.setAttribute('style', 'stop-color: White');
        var g = b.createElementNS('http://www.w3.org/2000/svg', 'stop');
        g.setAttribute('offset', '25%');
        g.setAttribute('style', 'stop-color: LightBlue');
        var m = b.createElementNS('http://www.w3.org/2000/svg', 'stop');
        m.setAttribute('offset', '100%');
        m.setAttribute('style', 'stop-color: Blue');
        f.appendChild(e);
        f.appendChild(g);
        f.appendChild(m);
        d.appendChild(f);
        f = b.createElementNS('http://www.w3.org/2000/svg',
          'linearGradient');
        f.setAttribute('id', 'BlackGradient');
        f.setAttribute('x1', '0%');
        f.setAttribute('y1', '0%');
        f.setAttribute('x2', '0%');
        f.setAttribute('y2', '100%');
        e = b.createElementNS('http://www.w3.org/2000/svg', 'stop');
        e.setAttribute('offset', '0%');
        e.setAttribute('style', 'stop-color: Black');
        g = b.createElementNS('http://www.w3.org/2000/svg', 'stop');
        g.setAttribute('offset', '10%');
        g.setAttribute('style', 'stop-color: White');
        m = b.createElementNS('http://www.w3.org/2000/svg', 'stop');
        m.setAttribute('offset',
          '20%');
        m.setAttribute('style', 'stop-color: Gray');
        var h = b.createElementNS('http://www.w3.org/2000/svg', 'stop');
        h.setAttribute('offset', '60%');
        h.setAttribute('style', 'stop-color: Black');
        f.appendChild(e);
        f.appendChild(g);
        f.appendChild(m);
        f.appendChild(h);
        d.appendChild(f);
        f = b.createElementNS('http://www.w3.org/2000/svg', 'marker');
        f.setAttribute('id', 'ArrowMarker');
        f.setAttribute('viewBox', '0 0 10 10');
        f.setAttribute('refX', '0');
        f.setAttribute('refY', '5');
        f.setAttribute('markerUnits', 'strokeWidth');
        f.setAttribute('markerWidth', '5');
        f.setAttribute('markerHeight', '4');
        f.setAttribute('orient', 'auto');
        b = b.createElementNS('http://www.w3.org/2000/svg', 'path');
        switch (c.theme) {
          default:
            b.setAttribute('fill', '#3b87d9');
            break;
          case 'Aero':
            b.setAttribute('fill', 'Blue');
        }
        b.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        f.appendChild(b);
        d.appendChild(f);
        return d;
      };
    }, CreateTitleNode = function(a) {
      return function(c) {
        var d = c.ganttChartView, b = c.ganttChartView.ownerDocument,
          f = b.createElementNS('http://www.w3.org/2000/svg', 'title');
        f.appendChild(wrapDateFmtValue(b,
          c.content));
        if (typeof a.areToolTipsSimplified === 'undefined' || !a.areToolTipsSimplified) if (typeof c.loadChartView === 'undefined') {
          if (typeof c.scheduleChartView === 'undefined' && c.parent) {
            f.appendChild(b.createTextNode('\n'));
            f.appendChild(b.createTextNode('Parent: ' + c.parent.content));
          }
          if (typeof c.scheduleChartView !== 'undefined' && c.scheduleChartItem) {
            f.appendChild(b.createTextNode('\n'));
            f.appendChild(b.createTextNode('Row: ' + c.scheduleChartItem.content));
          }
          if (c.hasChildren) {
            f.appendChild(b.createTextNode('\n'));
            f.appendChild(b.createTextNode('Children: ' + c.children.length));
          }
          f.appendChild(b.createTextNode('\n'));
          f.appendChild(b.createTextNode((!c.isMilestone ? 'Start: ' : '') + a.dateTimeFormatter(K(c.start))));
          if (!c.isMilestone) {
            f.appendChild(b.createTextNode('\n'));
            f.appendChild(b.createTextNode('Finish: ' + a.dateTimeFormatter(K(c.finish))));
          }
          if (a.areTaskAssignmentsVisible && c.assignmentsContent) {
            f.appendChild(b.createTextNode('\n'));
            f.appendChild(b.createTextNode('Assignments: ' + c.assignmentsContent));
          }
          if (!c.isMilestone) {
            f.appendChild(b.createTextNode('\n'));
            f.appendChild(b.createTextNode('Effort: ' + d.getItemTotalEffort(c) / 36E5 + 'h'));
            if (a.isTaskCompletedEffortVisible) {
              d = d.getItemCompletion(c);
              if (!isNaN(d)) {
                f.appendChild(b.createTextNode('\n'));
                f.appendChild(b.createTextNode('Completed: ' + Math.round(d * 1E4) / 100 + '%'));
              }
            }
          }
          if (a.areTaskDependenciesVisible && c.predecessors && c.predecessors.length > 0) {
            f.appendChild(b.createTextNode('\n'));
            for (var d = '', e = 0; e < c.predecessors.length; e++) {
              var g = c.predecessors[e];
              if (g.item) {
                d.length > 0 && (d = d + ', ');
                d = d + g.item.content;
                g.dependencyType &&
                (d = d + (' (' + Yb(g.dependencyType) + ')'));
              }
            }
            f.appendChild(b.createTextNode('Predecessors: ' + d));
          }
        } else if (!isNaN(c.units)) {
          f.appendChild(b.createTextNode('\n'));
          f.appendChild(b.createTextNode('Allocation: ' + Math.round(c.units * 1E4) / 100 + '%'));
        }
        return f;
      };
    }, Hb = function(a) {
      return function(c) {
        var d = c.ganttChartView, b = typeof a !== 'undefined' ? a : d.settings, d = d.ownerDocument,
          f = d.createElementNS('http://www.w3.org/2000/svg', 'text'), e = calculateBarX(c.finish, b);
        if (c.isMilestone || c.hasChildren && (typeof c.isSummaryEnabled === 'undefined' ||
          c.isSummaryEnabled)) e = e + b.barHeight / 2;
        f.setAttribute('x', e + 7);
        f.setAttribute('y', b.barMargin + b.barHeight - 1);
        c = b.target != 'Phone' ? c.assignmentsContent : c.content;
        typeof c === 'undefined' && (c = '');
        f.appendChild(d.createTextNode(c));
        typeof b.assignmentsClass !== 'undefined' ? f.setAttribute('class', b.assignmentsClass) : typeof b.assignmentsStyle !== 'undefined' && f.setAttribute('style', b.assignmentsStyle);
        return f;
      };
    }, mb = function(a) {
      var c = a.ganttChartView.ownerDocument;
      if (typeof a.chartItemArea === 'undefined') a.chartItemArea =
        c.createElementNS('http://www.w3.org/2000/svg', 'g');
      for (c = a.chartItemArea.childNodes.length; c-- > 0;) a.chartItemArea.removeChild(a.chartItemArea.childNodes[c]);
      return a.chartItemArea;
    }, StandardTaskTemplateFactory = function(a, c, d) {
      return function(taskItem) {
        var ganttChartView = typeof c !== 'undefined' ? c : taskItem.ganttChartView;
        var settings = typeof d !== 'undefined' ? d : ganttChartView.settings;
        var g = typeof a !== 'undefined' ? a : ganttChartView.items;
        var ownerDocument = ganttChartView.ownerDocument;
        var paneRoot = mb(taskItem);
        /* рисование штриховой линии */
        if (settings.isBaselineVisible && typeof taskItem.baselineStart !== 'undefined' && typeof taskItem.baselineFinish !== 'undefined') {
          var n = calculateBarX(taskItem.baselineStart, settings);
          var l = Math.max(calculateBarX(taskItem.baselineFinish, settings), n + 4);
          var s = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'rect');
          s.setAttribute('x', n);
          s.setAttribute('y', settings.barMargin / 2);
          s.setAttribute('width', Math.max(0, l - n - 1));
          s.setAttribute('height', settings.barHeight);
          s.setAttribute('rx', settings.barCornerRadius);
          s.setAttribute('ry', settings.barCornerRadius);
          n = settings.baselineBarClass;
          if (typeof taskItem.baselineBarClass !== 'undefined')
            n = taskItem.baselineBarClass;
          if (typeof n !== 'undefined')
            s.setAttribute('class', n);
          else {
            n = settings.baselineBarStyle;
            if (typeof taskItem.baselineBarStyle !== 'undefined')
              n = taskItem.baselineBarStyle;
            typeof n !== 'undefined' && s.setAttribute('style', n);
          }
          paneRoot.appendChild(s);
        }
        var barXstart = calculateBarX(taskItem.start, settings);
        var barXend = Math.max(calculateBarX(taskItem.finish, settings), barXstart + 4);
        var l = calculateBarX(taskItem.completedFinish, settings);
        let barStyle;
        let barWidth = Math.max(0, barXend - barXstart - 1);

        /* рисование линии-бара */
        let drawBarLine = () => {
          let standardBarSvg = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'rect');
          let barWidth = Math.max(0, barXend - barXstart - 1);
          standardBarSvg.setAttribute('x', barXstart);
          standardBarSvg.setAttribute('y', settings.barMargin);
          standardBarSvg.setAttribute('width', barWidth);
          standardBarSvg.setAttribute('height', settings.barHeight);
          standardBarSvg.setAttribute('rx', settings.barCornerRadius);
          standardBarSvg.setAttribute('ry', settings.barCornerRadius);
          let barStyle = settings.standardBarClass;
          if (typeof taskItem.standardBarClass !== 'undefined')
            barStyle = taskItem.standardBarClass;
          if (typeof taskItem.barClass !== 'undefined')
            barStyle = taskItem.barClass;
          if (typeof barStyle !== 'undefined')
            standardBarSvg.setAttribute('class', barStyle);
          else {
            barStyle = settings.standardBarStyle;
            if (typeof taskItem.standardBarStyle !== 'undefined') barStyle = taskItem.standardBarStyle;
            if (typeof taskItem.barStyle !== 'undefined') barStyle = taskItem.barStyle;
            typeof barStyle !== 'undefined' && standardBarSvg.setAttribute('style', barStyle);
          }
          return standardBarSvg;
        }
        let standardBarSvg;
        standardBarSvg = drawBarLine();
        paneRoot.appendChild(standardBarSvg);
        createPopover(paneRoot, taskItem);

        if (taskItem.setDomNode) {
          taskItem.setDomNode(paneRoot, {
              x: barXstart,
              y: settings.barMargin,
              width: barWidth,
              height: settings.barHeight,
              rx: settings.barCornerRadius,
              ry: settings.barCornerRadius,
            }
          );
          // if (standardBarSvg)
          //   paneRoot.appendChild(standardBarSvg);
        }


        /* рисование текстовой надписи */
        var textBarTitle;
        if (typeof taskItem.textValue !== 'undefined') {
            textBarTitle = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'text');
            textBarTitle.setAttribute('x', barXstart + 10);
            textBarTitle.setAttribute('y', settings.barMargin + 18);
            textBarTitle.textContent = taskItem.textValue;
            textBarTitle.className.baseVal = 'gantt-svg-title';
            paneRoot.appendChild(textBarTitle);
        }

        /* рисование внутренней линии бара */
        if (settings.isTaskCompletedEffortVisible) {
          standardBarSvg = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'rect');
          standardBarSvg.setAttribute('x', barXstart);
          standardBarSvg.setAttribute('y', settings.barMargin + settings.completedBarMargin);
          standardBarSvg.setAttribute('width', Math.max(0, l - barXstart - 1));
          standardBarSvg.setAttribute('height',
            settings.completedBarHeight);
          standardBarSvg.setAttribute('rx', settings.completedBarCornerRadius);
          standardBarSvg.setAttribute('ry', settings.completedBarCornerRadius);
          barStyle = settings.standardCompletedBarClass;
          if (typeof taskItem.standardCompletedBarClass !== 'undefined') barStyle = taskItem.standardCompletedBarClass;
          if (typeof taskItem.completedBarClass !== 'undefined') barStyle = taskItem.completedBarClass;
          if (typeof barStyle !== 'undefined') standardBarSvg.setAttribute('class', barStyle); else {
            barStyle = settings.standardCompletedBarStyle;
            if (typeof taskItem.standardCompletedBarStyle !== 'undefined') barStyle = taskItem.standardCompletedBarStyle;
            if (typeof taskItem.completedBarStyle !== 'undefined') barStyle =
              taskItem.completedBarStyle;
            typeof barStyle !== 'undefined' && standardBarSvg.setAttribute('style', barStyle);
          }
          paneRoot.appendChild(standardBarSvg);
        }

        if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof taskItem.isReadOnly === 'undefined' || !taskItem.isReadOnly) && (typeof taskItem.isBarReadOnly === 'undefined' || !taskItem.isBarReadOnly)) {
          standardBarSvg = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'rect');
          standardBarSvg.setAttribute('x', barXstart);
          standardBarSvg.setAttribute('y', settings.barMargin);
          standardBarSvg.setAttribute('width', Math.max(0, barXend - barXstart - 1));
          standardBarSvg.setAttribute('height', settings.barHeight);
          standardBarSvg.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: move');
          settings.isTaskStartReadOnly ||
          paneRoot.appendChild(standardBarSvg);
          barStyle = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'rect');
          barStyle.setAttribute('x', barXstart - 4);
          barStyle.setAttribute('y', settings.barMargin);
          barStyle.setAttribute('width', 4);
          barStyle.setAttribute('height', settings.barHeight);
          barStyle.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: e-resize');
          settings.isDraggingTaskStartEndsEnabled && (!settings.isTaskStartReadOnly && settings.interaction != 'TouchEnabled') && paneRoot.appendChild(barStyle);
          var C = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'rect');
          C.setAttribute('x', barXend - 4);
          C.setAttribute('y', settings.barMargin);
          C.setAttribute('width',
            8);
          C.setAttribute('height', settings.barHeight);
          C.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: e-resize');
          !settings.isTaskEffortReadOnly && settings.interaction != 'TouchEnabled' && paneRoot.appendChild(C);
          var q = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'rect');
          q.setAttribute('x', l - 2);
          q.setAttribute('y', settings.barMargin);
          q.setAttribute('width', 6);
          q.setAttribute('height', settings.barHeight);
          q.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: e-resize');
          // if (!settings.isTaskCompletionReadOnly && settings.isTaskCompletedEffortVisible &&
          //   settings.interaction != 'TouchEnabled') {
          //   paneRoot.appendChild(q);
          //   var j = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'title'),
          //     k = typeof settings.areToolTipsSimplified === 'undefined' || !settings.areToolTipsSimplified ? ganttChartView.getItemCompletion(taskItem) : NaN;
          //   j.appendChild(wrapDateFmtValue(ownerDocument, !isNaN(k) ? Math.round(k * 1E4) / 100 + '%' : ''));
          //   q.appendChild(j);
          // }
          setupDraggingEvents(standardBarSvg, barStyle, C, q, taskItem, barXstart, barXend, l, g, ganttChartView, settings);
          if (settings.areTaskDependenciesVisible && !settings.areTaskPredecessorsReadOnly && !taskItem.isPart) {
            l = null;
            if (typeof settings.allowCreatingStartDependencies === 'undefined' || settings.allowCreatingStartDependencies) {
              l = ownerDocument.createElementNS('http://www.w3.org/2000/svg',
                'circle');
              l.setAttribute('cx', barXstart);
              l.setAttribute('cy', settings.barMargin + settings.barHeight / 2);
              l.setAttribute('r', settings.barHeight / 4);
              l.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
              paneRoot.appendChild(l);
            }
            ownerDocument = ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'circle');
            ownerDocument.setAttribute('cx', barXend - 2);
            ownerDocument.setAttribute('cy', settings.barMargin + settings.barHeight / 2);
            ownerDocument.setAttribute('r', settings.barHeight / 4);
            ownerDocument.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
            paneRoot.appendChild(ownerDocument);
            Ya(ownerDocument, l, paneRoot, taskItem, settings.barMargin + settings.barHeight / 2, barXend - 2, barXstart, g,
              ganttChartView, settings);
          }
        }
        return paneRoot;
      };
    }, Eb = function(a, c, d) {
      return function(b) {
        var f = typeof c !== 'undefined' ? c : b.ganttChartView, e = typeof d !== 'undefined' ? d : f.settings,
          g = typeof a !== 'undefined' ? a : f.items, m = f.ownerDocument, h = mb(b), n = calculateBarX(b.start, e),
          l = calculateBarX(b.finish, e), s = e.barHeight * 2.15 / 3, u = m.createElementNS('http://www.w3.org/2000/svg', 'rect');
        u.setAttribute('x', n);
        u.setAttribute('y', e.barMargin);
        u.setAttribute('width', Math.max(0, l - n - 1));
        u.setAttribute('height', s);
        var v = e.summaryBarClass;
        if (typeof b.summaryBarClass !== 'undefined') v =
          b.summaryBarClass;
        if (typeof b.barClass !== 'undefined') v = b.barClass;
        if (typeof v !== 'undefined') u.setAttribute('class', v); else {
          var C = e.summaryBarStyle;
          if (typeof b.summaryBarStyle !== 'undefined') C = b.summaryBarStyle;
          if (typeof b.barStyle !== 'undefined') C = b.barStyle;
          typeof C !== 'undefined' && u.setAttribute('style', C);
        }
        h.appendChild(u);
        if (!b.isExpanded) {
          u = m.createElementNS('http://www.w3.org/2000/svg', 'line');
          u.setAttribute('x1', n);
          u.setAttribute('y1', e.barMargin + s + 2.5);
          u.setAttribute('x2', l - 1);
          u.setAttribute('y2',
            e.barMargin + s + 2.5);
          var q = e.collapsedSummaryLineClass;
          if (typeof b.collapsedSummaryLineClass !== 'undefined') q = b.collapsedSummaryLineClass;
          if (typeof q !== 'undefined') u.setAttribute('class', q); else {
            q = e.collapsedSummaryLineStyle;
            if (typeof b.collapsedSummaryLineStyle !== 'undefined') q = b.collapsedSummaryLineStyle;
            typeof q !== 'undefined' && u.setAttribute('style', q);
          }
          h.appendChild(u);
        }
        var q = m.createElementNS('http://www.w3.org/2000/svg', 'polygon'), u = e.barMargin - 0.25, j = s + 1.5,
          k = e.barHeight * 3 / 4, p = e.barHeight / 4, s = n - 1 -
          e.barHeight / 3;
        q.setAttribute('points', s + ',' + u + ' ' + s + ',' + (u + j) + ' ' + (s + k / 2) + ',' + (u + j + p) + ' ' + (s + k) + ',' + (u + j) + ' ' + (s + k) + ',' + u);
        typeof v !== 'undefined' && q.setAttribute('class', v);
        typeof C !== 'undefined' && q.setAttribute('style', C);
        h.appendChild(q);
        q = m.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        s = l + e.barHeight / 3;
        q.setAttribute('points', s + ',' + u + ' ' + s + ',' + (u + j) + ' ' + (s - k / 2) + ',' + (u + j + p) + ' ' + (s - k) + ',' + (u + j) + ' ' + (s - k) + ',' + u);
        typeof v !== 'undefined' && q.setAttribute('class', v);
        typeof C !== 'undefined' &&
        q.setAttribute('style', C);
        h.appendChild(q);
        if (!e.isReadOnly && !e.isChartReadOnly && (typeof b.isReadOnly === 'undefined' || !b.isReadOnly) && (typeof b.isBarReadOnly === 'undefined' || !b.isBarReadOnly) && e.areTaskDependenciesVisible && !e.areTaskPredecessorsReadOnly && !b.isPart) {
          v = null;
          if (typeof e.allowCreatingStartDependencies === 'undefined' || e.allowCreatingStartDependencies) {
            v = m.createElementNS('http://www.w3.org/2000/svg', 'circle');
            v.setAttribute('cx', n - 0.5);
            v.setAttribute('cy', e.barMargin + e.barHeight / 2);
            v.setAttribute('r',
              e.barHeight / 4);
            v.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
            h.appendChild(v);
          }
          m = m.createElementNS('http://www.w3.org/2000/svg', 'circle');
          m.setAttribute('cx', l - 0.5);
          m.setAttribute('cy', e.barMargin + e.barHeight / 2);
          m.setAttribute('r', 2.5);
          m.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
          h.appendChild(m);
          Ya(m, v, h, b, e.barMargin + e.barHeight / 2, l - 1.5, n, g, f, e);
        }
        return h;
      };
    }, Fb = function(a, c, d) {
      return function(b) {
        var f = typeof c !== 'undefined' ? c : b.ganttChartView, e =
            typeof d !== 'undefined' ? d : f.settings, g = typeof a !== 'undefined' ? a : f.items, m = f.ownerDocument,
          h = mb(b);
        if (e.isBaselineVisible && typeof b.baselineStart !== 'undefined') {
          var n = calculateBarX(b.baselineStart, e), l = m.createElementNS('http://www.w3.org/2000/svg', 'polygon'),
            s = e.barMargin - 1, u = e.barHeight + 1;
          l.setAttribute('points', n + ',' + s + ' ' + (n - u / 2) + ',' + (s + u / 2) + ' ' + n + ',' + (s + u) + ' ' + (n + u / 2) + ',' + (s + u / 2));
          n = e.baselineBarClass;
          if (typeof b.baselineBarClass !== 'undefined') n = b.baselineBarClass;
          if (typeof n !== 'undefined') l.setAttribute('class',
            n); else {
            var v = e.baselineBarStyle;
            if (typeof b.baselineBarStyle !== 'undefined') v = b.baselineBarStyle;
          }
          l.setAttribute('style', v);
          h.appendChild(l);
        }
        l = calculateBarX(b.start, e);
        v = m.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        l = l - 1;
        s = e.barMargin;
        n = e.barHeight + 1;
        v.setAttribute('points', l + ',' + s + ' ' + (l - n / 2) + ',' + (s + n / 2) + ' ' + l + ',' + (s + n) + ' ' + (l + n / 2) + ',' + (s + n / 2));
        s = e.milestoneBarClass;
        if (typeof b.milestoneBarClass !== 'undefined') s = b.milestoneBarClass;
        if (typeof b.barClass !== 'undefined') s = b.barClass;
        if (typeof s !== 'undefined') v.setAttribute('class',
          s); else {
          s = e.milestoneBarStyle;
          if (typeof b.milestoneBarStyle !== 'undefined') s = b.milestoneBarStyle;
          if (typeof b.barStyle !== 'undefined') s = b.barStyle;
          typeof s !== 'undefined' && v.setAttribute('style', s);
        }
        h.appendChild(v);
        if (!e.isReadOnly && !e.isChartReadOnly && (typeof b.isReadOnly === 'undefined' || !b.isReadOnly) && (typeof b.isBarReadOnly === 'undefined' || !b.isBarReadOnly)) {
          v = m.createElementNS('http://www.w3.org/2000/svg', 'rect');
          v.setAttribute('x', l - n / 2);
          v.setAttribute('y', e.barMargin);
          v.setAttribute('width', n);
          v.setAttribute('height',
            n);
          v.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: move');
          h.appendChild(v);
          setupDraggingEvents(v, null, null, null, b, l, l, l, g, f, e);
          if (e.areTaskDependenciesVisible && !e.areTaskPredecessorsReadOnly && !b.isPart) {
            m = m.createElementNS('http://www.w3.org/2000/svg', 'circle');
            m.setAttribute('cx', l);
            m.setAttribute('cy', e.barMargin + e.barHeight / 2);
            m.setAttribute('r', e.barHeight / 4);
            m.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
            h.appendChild(m);
            Ya(m, null, h, b, e.barMargin + e.barHeight / 2, l, l, g, f, e);
          }
        }
        return h;
      };
    },
    Ib = function(a, c) {
      return function(d, b) {
        var f = d.ganttChartView, e = typeof c !== 'undefined' ? c : f.settings,
          g = typeof a !== 'undefined' ? a : f.items, m = f.ownerDocument,
          f = m.createElementNS('http://www.w3.org/2000/svg', 'g'), h;
        h = za(b.item, g, e);
        var n = za(d, g, e), g = 'M ', l, s, u = e.itemHeight, v = u / 2, C = u / 3.5, q = 2, j = false, k;
        if (h == n && (typeof b.dependencyType === 'undefined' || b.dependencyType == 'FinishStart' || b.dependencyType == 'FS' || b.dependencyType == 'StartFinish' || b.dependencyType == 'SF')) {
          if (typeof b.dependencyType === 'undefined' ||
            b.dependencyType == 'FinishStart' || b.dependencyType == 'FS') {
            l = calculateBarX(b.item.finish, e);
            s = calculateBarX(d.start, e);
          } else {
            l = calculateBarX(b.item.start, e);
            s = calculateBarX(d.finish, e);
          }
          h = h - n + 0.5;
          g = g + (l + ' ' + (h + v) + ' L ' + (s + (s > l ? -1 : 1) * (u / 5 - 1)) + ' ' + (h + v));
        } else {
          if (typeof b.dependencyType !== 'undefined' && (b.dependencyType == 'StartStart' || b.dependencyType == 'SS' || b.dependencyType == 'StartFinish' || b.dependencyType == 'SF')) {
            l = calculateBarX(b.item.start, e);
            b.item.hasChildren && (typeof b.item.isSummaryEnabled === 'undefined' || b.item.isSummaryEnabled) ? l = l - (e.barHeight / 3 + 0.25) : b.item.isMilestone &&
              (l = l - u / 4);
            s = l - C;
          } else {
            l = calculateBarX(b.item.finish, e) - 1;
            if (b.item.hasChildren && (typeof b.item.isSummaryEnabled === 'undefined' || b.item.isSummaryEnabled)) l = l + (e.barHeight / 3 + 0.25); else if (b.item.isMilestone) l = l + u / 4; else {
              k = calculateBarX(b.item.start, e) + 4 - 1;
              l < k && (l = k);
            }
            s = l + C;
          }
          h = h - n + 0.5;
          g = g + (l + ' ' + (h + v) + ' L ' + s + ' ' + (h + v));
          if (typeof b.dependencyType !== 'undefined' && (b.dependencyType == 'FinishFinish' || b.dependencyType == 'FF' || b.dependencyType == 'StartFinish' || b.dependencyType == 'SF')) {
            l = calculateBarX(d.finish, e) - 1;
            if (typeof b.dependencyType !== 'undefined' &&
              (b.dependencyType == 'FinishFinish' || b.dependencyType == 'FF')) {
              j = true;
              if (d.hasChildren && (typeof d.isSummaryEnabled === 'undefined' || d.isSummaryEnabled)) l = l + (e.barHeight / 3 + 1); else if (d.isMilestone) l = l + (u / 4 + 1); else {
                k = calculateBarX(d.start, e) + 4 - 1;
                l < k && (l = k);
              }
              n = l + C;
            } else if (d.isMilestone) n = l; else {
              k = calculateBarX(d.start, e) + 4;
              l < k && (l = k);
              n = l - 2.5;
            }
          } else {
            l = calculateBarX(d.start, e);
            if (typeof b.dependencyType !== 'undefined' && (b.dependencyType == 'StartStart' || b.dependencyType == 'SS')) {
              j = true;
              d.hasChildren && (typeof d.isSummaryEnabled === 'undefined' || d.isSummaryEnabled) ?
                l = l - (e.barHeight / 3 + 1) : d.isMilestone && (l = l - (u / 4 + 1));
              n = l - C;
            } else if (d.isMilestone) n = l - 1; else {
              n = l + 1.5;
              k = calculateBarX(d.finish, e);
              n < s && (k - s > C * 2 && d.start >= b.item.finish) && (n = s);
            }
          }
          if (typeof b.dependencyType !== 'undefined' && (b.dependencyType == 'StartStart' || b.dependencyType == 'SS' || b.dependencyType == 'StartFinish' || b.dependencyType == 'SF')) {
            if (n > s) {
              h = h - C / 6;
              h = h <= 0 ? h + v : h - v;
              g = g + (' ' + s + ' ' + (h + v));
            }
          } else if (n < s) {
            h = h - C / 6;
            h = h <= 0 ? h + v : h - v;
            g = g + (' ' + s + ' ' + (h + v));
          }
          g = g + (' ' + n + ' ' + (h + v));
          h = j ? v + 0.5 : h <= 0 ? e.barMargin - 1 - q : u - e.barMargin + 1 + q;
          if (j) {
            n > l - q && (q = -q);
            l = l - q;
          }
          g = g + (' ' + n + ' ' + h);
          j && (g = g + (' ' + l + ' ' + h));
        }
        h = g;
        g = m.createElementNS('http://www.w3.org/2000/svg', 'path');
        g.setAttribute('d', h);
        typeof e.dependencyLineZoneClass !== 'undefined' && g.setAttribute('class', e.dependencyLineZoneClass);
        typeof e.dependencyLineZoneStyle !== 'undefined' && g.setAttribute('style', e.dependencyLineZoneStyle);
        f.appendChild(g);
        m = m.createElementNS('http://www.w3.org/2000/svg', 'path');
        m.setAttribute('d', h);
        h = e.dependencyLineClass;
        if (typeof b.dependencyLineClass !== 'undefined') h =
          b.dependencyLineClass;
        if (typeof h !== 'undefined') m.setAttribute('class', h); else {
          e = e.dependencyLineStyle;
          if (typeof b.dependencyLineStyle !== 'undefined') e = b.dependencyLineStyle;
          typeof e !== 'undefined' && m.setAttribute('style', e);
        }
        f.appendChild(m);
        return f;
      };
    }, Jb = function(a) {
      return function(c, d) {
        var b = c.ganttChartView.ownerDocument, f = b.createElementNS('http://www.w3.org/2000/svg', 'title');
        f.appendChild(wrapDateFmtValue(b, d.item.content + ' - ' + c.content));
        if (typeof a.areToolTipsSimplified === 'undefined' || !a.areToolTipsSimplified) {
          if (d.dependencyType) {
            f.appendChild(b.createTextNode('\n'));
            f.appendChild(wrapDateFmtValue(b, 'Type: ' + Yb(d.dependencyType)));
          }
          if (d.lag) {
            f.appendChild(b.createTextNode('\n'));
            f.appendChild(wrapDateFmtValue(b, 'Lag: ' + d.lag / 36E5 + 'h'));
          }
        }
        return f;
      };
    }, Yb = function(a) {
      switch (a) {
        case 'StartStart':
        case 'SS':
          return 'SS';
        case 'FinishFinish':
        case 'FF':
          return 'FF';
        case 'StartFinish':
        case 'SF':
          return 'SF';
        default:
          return 'FS';
      }
    }, y = function(a, c, d, b) {
      if (typeof a.ganttChartView !== 'undefined') {
        var f = a.ganttChartView, e = f.settings;
        if (c == 'start' || c == 'minStart' || c == 'maxStart') {
          if (typeof a.minStart !== 'undefined' && a.start <
            a.minStart) {
            a.start = a.minStart;
            if (typeof a.loadChartItem === 'undefined') a.start = Q(a.start, e, true, typeof a.isMilestone !== 'undefined' && a.isMilestone, D(a));
            if (d) a.preferredStart = a.start;
          } else if (typeof a.maxStart !== 'undefined' && a.start > a.maxStart) {
            a.start = a.maxStart;
            if (typeof a.loadChartItem === 'undefined') a.start = Q(a.start, e, true, typeof a.isMilestone !== 'undefined' && a.isMilestone, D(a));
            if (d) a.preferredStart = a.start;
          }
          if (a.finish < a.start) {
            a.finish = a.start;
            y(a, 'finish', false, true);
          }
          if (a.completedFinish < a.start) {
            a.completedFinish =
              a.start;
            y(a, 'completedFinish', false, true);
          } else if (a.completedFinish > a.finish) {
            a.completedFinish = a.finish;
            y(a, 'completedFinish', false, true);
          }
        } else if (c == 'finish' || c == 'minFinish' || c == 'maxFinish') {
          if (typeof a.maxFinish !== 'undefined' && a.finish > a.maxFinish) {
            a.finish = a.maxFinish;
            if (typeof a.loadChartItem === 'undefined') a.finish = Q(a.finish, e, typeof a.isMilestone !== 'undefined' && a.isMilestone, true, D(a));
          } else if (typeof a.minFinish !== 'undefined' && a.finish < a.minFinish) {
            a.finish = a.minFinish;
            if (typeof a.loadChartItem ===
              'undefined') a.finish = Q(a.finish, e, typeof a.isMilestone !== 'undefined' && a.isMilestone, true, D(a));
          }
          if (a.finish < a.start) {
            a.finish = a.start;
            y(a, 'finish', false, true);
          }
          if (a.completedFinish < a.start) {
            a.completedFinish = a.start;
            y(a, 'completedFinish', false, true);
          } else if (a.completedFinish > a.finish) {
            a.completedFinish = a.finish;
            y(a, 'completedFinish', false, true);
          }
        }
        if (f.isTimingInformationInitialized) {
          var g = f.items, m, h;
          if (c == 'indentation' || c == 'predecessors') for (m = 0; m < g.length; m++) {
            h = g[m];
            typeof h.dependsOf !== 'undefined' &&
            delete h.dependsOf;
          }
          if ((c == 'predecessors' || c == 'start' || c == 'finish') && typeof a.isDuringPropertyChangeTaskDependencyConstraintsEnsuring === 'undefined' && e.areTaskDependencyConstraintsEnabled && (e.areTaskDependencyConstraintsEnabledWhileDragging || typeof f.isDuringTimeDragOperation === 'undefined')) {
            a.isDuringPropertyChangeTaskDependencyConstraintsEnsuring = true;
            for (h = a.parent; h != null;) {
              typeof h.predecessors !== 'undefined' && h.predecessors.length > 0 && Ia(h, g, e, f);
              h = h.parent;
            }
            h = a;
            for (typeof h.predecessors !== 'undefined' &&
                 h.predecessors.length > 0 ? Ia(h, g, e, f) : ob(h, e); h != null;) {
              if (typeof h.successors === 'undefined') {
                h.successors = [];
                for (m = 0; m < g.length; m++) {
                  var n = g[m];
                  if (!(n == h || typeof n.predecessors === 'undefined' || n.predecessors.length == 0)) for (var l = 0; l < n.predecessors.length; l++) if (n.predecessors[l].item == h) {
                    h.successors.push(n);
                    break;
                  }
                }
              }
              for (m = 0; m < h.successors.length; m++) Ia(h.successors[m], g, e, f);
              h = h.parent;
            }
            delete a.isDuringPropertyChangeTaskDependencyConstraintsEnsuring;
          }
          a.isPart && a.ganttChartItem && y(a.ganttChartItem, 'parts',
            false, true);
        }
        if (a.isSetAsCompleted && (c == 'start' || c == 'finish' || c == 'completedFinish')) a.isSetAsCompleted = false;
        if ((c == 'start' || c == 'finish') && !a.hasChildren && a.hasFixedEffort && typeof a.fixedEffort !== 'undefined') {
          g = f.getItemEffort(a) / a.fixedEffort;
          h = '';
          for (m = 0; m < a.fixedEffortAssignments.length; m++) {
            n = a.fixedEffortAssignments[m];
            h.length > 0 && (h = h + ', ');
            l = Math.floor(n.value / g * 1E6) / 1E6;
            h = h + (n.key + (l != 1 ? ' [' + l * 100 + '%]' : ''));
          }
          f.setItemAssignmentsContent(a, h);
        }
        e.itemPropertyChangeHandler(a, c, d, b);
        c == 'isExpanded' ?
          typeof a.ganttChartView !== 'undefined' && typeof a.ganttChartView.settings.itemExpansionChangeHandler !== 'undefined' && a.ganttChartView.settings.itemExpansionChangeHandler(a, a.isExpanded) : c == 'isSelected' && typeof a.ganttChartView !== 'undefined' && typeof a.ganttChartView.settings.itemSelectionChangeHandler !== 'undefined' && a.ganttChartView.settings.itemSelectionChangeHandler(a, a.isSelected, d);
        typeof a.scheduleChartView !== 'undefined' && c == 'content' && a.scheduleChartView.refreshScheduleChartItem(a);
      }
    }, ob = function(a,
                     c) {
      if (typeof a.isAwaitingPreferredStartUpdates === 'undefined') if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) for (var d = 0; d < a.children.length; d++) ob(a.children[d], c); else if (typeof a.preferredStart !== 'undefined' && a.preferredStart < a.start) {
        a.isAwaitingPreferredStartUpdates = true;
        let effort = N(a.start, a.finish, c, D(a));
        let completedEffort = N(a.start, a.completedFinish, c, D(a));
        a.start = a.preferredStart;
        a.finish = R(a.start, effort, c, D(a));
        a.completedFinish = R(a.start, completedEffort, c, D(a));
        y(a, 'start', false, false);
        y(a, 'finish', false, false);
        y(a, 'completedFinish', false, false);
        setTimeout(function() {
          y(a, 'start', false, true);
          y(a, 'finish', false, true);
          y(a, 'completedFinish', false, true);
          Z(a);
          delete a.isAwaitingPreferredStartUpdates;
        }, 1);
      }
    }, Ia = function(a, c, d, b) {
      if (b.isBasicTimingInformationInitialized && (typeof a.areDependencyConstraintsEnabled === 'undefined' || a.areDependencyConstraintsEnabled)) {
        ob(a, d);
        for (var f = [], e, g = false, b = 0; b < a.predecessors.length; b++) {
          e = a.predecessors[b];
          if (typeof e.item ===
            'undefined' || c.indexOf(e.item) < 0 || Pa(e.item, a)) {
            d.invalidPredecessorDetectionHandler && d.invalidPredecessorDetectionHandler(e, a, e.item);
            g = true;
          } else f.push(e);
        }
        a.predecessors = f;
        if (g) {
          y(a, 'predecessors', false, true);
          typeof a.ganttChartView !== 'undefined' && Ma(a);
        }
        for (b = 0; b < a.predecessors.length; b++) {
          e = a.predecessors[b];
          Zb(a, e, c, d);
        }
      }
    }, Zb = function(a, c, d, b) {
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) for (var f = 0; f < a.children.length; f++) Zb(a.children[f], c, d, b); else if (!(typeof b.areDependencyConstraintsAppliedOnMilestones !==
        'undefined' && !b.areDependencyConstraintsAppliedOnMilestones && a.isMilestone || typeof b.areDependencyConstraintsAppliedOnStartedTasks !== 'undefined' && !b.areDependencyConstraintsAppliedOnStartedTasks && Fa(a))) {
        var e = c.item, g, d = false;
        if (typeof c.dependencyType === 'undefined' || c.dependencyType == '' || c.dependencyType == 'FinishStart' || c.dependencyType == 'FS') {
          e = e.finish;
          typeof c.lag !== 'undefined' && c.lag != 0 && (e = R(e, c.lag, b, D(a)));
          if (a.start < e) {
            if (!a.isMilestone && (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' ||
              a.isSummaryEnabled))) {
              f = N(a.start, a.finish, b, D(a));
              g = N(a.start, a.completedFinish, b, D(a));
            }
            if (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
              a.start = Q(pa(e, b), b, true, a.isMilestone, D(a));
              y(a, 'start', false, true);
              if (a.isMilestone) {
                a.finish = a.start;
                y(a, 'finish', false, true);
                a.completedFinish = a.start;
              } else {
                a.finish = R(a.start, f, b, D(a));
                y(a, 'finish', false, true);
                a.completedFinish = R(a.start, g, b, D(a));
              }
              y(a, 'completedFinish', false, true);
              d = true;
            }
          }
        } else if (c.dependencyType == 'StartStart' ||
          c.dependencyType == 'SS') {
          e = e.start;
          typeof c.lag !== 'undefined' && c.lag != 0 && (e = R(e, c.lag, b, D(a)));
          if (a.start < e) {
            if (!a.isMilestone && (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled))) {
              f = N(a.start, a.finish, b, D(a));
              g = N(a.start, a.completedFinish, b, D(a));
            }
            if (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
              a.start = Q(pa(e, b), b, true, a.isMilestone, D(a));
              y(a, 'start', false, true);
              if (a.isMilestone) {
                a.finish = a.start;
                y(a, 'finish', false, true);
                a.completedFinish =
                  a.start;
              } else {
                a.finish = R(a.start, f, b, D(a));
                y(a, 'finish', false, true);
                a.completedFinish = R(a.start, g, b, D(a));
              }
              y(a, 'completedFinish', false, true);
              d = true;
            }
          }
        } else if (c.dependencyType == 'FinishFinish' || c.dependencyType == 'FF') {
          e = e.finish;
          typeof c.lag !== 'undefined' && c.lag != 0 && (e = R(e, c.lag, b, D(a)));
          if (a.finish > e && (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled))) {
            a.finish = Q(pa(e, b), b, a.isMilestone, true, D(a));
            if (a.finish < a.start) a.finish = a.start;
            y(a, 'finish', false, true);
            if (a.isMilestone) {
              if (a.completedFinish !=
                a.start) {
                a.completedFinish = a.start;
                y(a, 'completedFinish', false, true);
              }
            } else if (a.completedFinish > a.finish) {
              a.completedFinish = a.finish;
              y(a, 'completedFinish', false, true);
            }
            d = true;
          }
        } else if (c.dependencyType == 'StartFinish' || c.dependencyType == 'SF') {
          e = e.start;
          typeof c.lag !== 'undefined' && c.lag != 0 && (e = R(e, c.lag, b, D(a)));
          if (a.finish > e && (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled))) {
            a.finish = Q(pa(e, b), b, a.isMilestone, true, D(a));
            if (a.finish < a.start) a.finish = a.start;
            y(a, 'finish',
              false, true);
            if (a.isMilestone) {
              if (a.completedFinish != a.start) {
                a.completedFinish = a.start;
                y(a, 'completedFinish', false, true);
              }
            } else if (a.completedFinish > a.finish) {
              a.completedFinish = a.finish;
              y(a, 'completedFinish', false, true);
            }
            d = true;
          }
        }
        if (d && !(typeof a.ganttChartView === 'undefined' || typeof a.isAwaitingEnsureItemDependencyConstraintsUpdates !== 'undefined')) if (typeof a.ganttChartView !== 'undefined' && !a.ganttChartView.isTimingInformationInitialized) Z(a); else {
          a.isAwaitingEnsureItemDependencyConstraintsUpdates = true;
          setTimeout(function() {
            Z(a);
            delete a.isAwaitingEnsureItemDependencyConstraintsUpdates;
          }, 0);
        }
      }
    }, Pa = function(a, c) {
      if (typeof a.dependsOf !== 'undefined' && typeof a.dependsOf[a] !== 'undefined') return a.dependsOf[c];
      try {
        if (a == c) return true;
        var d = $b(a);
        if (d.indexOf(c) >= 0) return true;
        var b = $b(c);
        if (b.indexOf(a) >= 0) return true;
        var f = pb(a), e, g;
        for (e = 0; e < f.length; e++) {
          g = f[e];
          if (g == c || g == a || d.indexOf(g) >= 0 || b.indexOf(g) >= 0 || Pa(g, c)) return true;
        }
        for (f = 0; f < d.length; f++) {
          var m = pb(d[f]);
          for (e = 0; e < m.length; e++) {
            g = m[e];
            if (g ==
              c || g == a || d.indexOf(g) >= 0 || b.indexOf(g) >= 0 || Pa(g, c)) return true;
          }
        }
        var h = a.children;
        for (e = 0; e < h.length; e++) {
          var n = h[e];
          if (typeof n.predecessors !== 'undefined' && n.predecessors.length > 0 && Pa(n, c)) return true;
        }
      } finally {
        if (typeof a.dependsOf === 'undefined') a.dependsOf = {};
        a.dependsOf[c] = true;
      }
      return a.dependsOf[c] = false;
    }, $b = function(a) {
      for (var c = []; typeof a.parent !== "undefined" && a.parent != null;) {
        (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled) && c.push(a.parent);
        a = a.parent;
      }
      return c;
    }, pb = function(a) {
      var c =
        [];
      if (typeof a.predecessors !== 'undefined' && a.predecessors != null) for (var d = 0; d < a.predecessors.length; d++) typeof a.predecessors[d].item !== 'undefined' && c.push(a.predecessors[d].item);
      return c;
    }, uc = function(a, c) {
      for (var d = 0; d < a.length; d++) {
        var b = a[d], f = c == null || c(b);
        b.isHidden = !f;
        if (f) for (b = b.parent; b != null;) {
          b.isHidden = false;
          b = b.parent;
        }
      }
    }, ac = function(a, c, d) {
      return Q(a, c, true, true, d);
    }, sa = function(a, c, d) {
      return Q(a, c, true, false, d);
    }, Q = function(a, c, d, b, f) {
      var e = typeof f !== 'undefined' && typeof f.workingDayStart !==
        'undefined' ? f.workingDayStart : c.visibleDayStart,
        g = typeof f !== 'undefined' && typeof f.workingDayFinish !== 'undefined' ? f.workingDayFinish : c.visibleDayFinish,
        m = typeof f !== 'undefined' && typeof f.workingWeekStart !== 'undefined' ? f.workingWeekStart : c.workingWeekStart,
        h = typeof f !== 'undefined' && typeof f.workingWeekFinish !== 'undefined' ? f.workingWeekFinish : c.workingWeekFinish,
        c = typeof f !== 'undefined' && typeof f.specialNonworkingDays !== 'undefined' ? f.specialNonworkingDays : c.specialNonworkingDays,
        f = Y(a), a = ia(a);
      if (a <
        e || !d && a == e) if (d) a = e; else {
        f = Ja(f);
        a = g;
      }
      if (a > g || !b && a == g) if (b) a = g; else {
        f = aa(f);
        a = e;
      }
      for (b = ka(f); b < m || b > h || Qb(f, c);) {
        if (d) {
          b++;
          f = aa(f);
          a = e;
        } else {
          b--;
          f = Ja(f);
          a = g;
        }
        for (; b < 0;) b = b + 7;
        for (; b >= 7;) b = b - 7;
      }
      return new Date(f.valueOf() + a);
    }, N = function(a, c, d, b) {
      if (c.valueOf() < a.valueOf()) return -N(c, a, d, b);
      if (c.valueOf() == a.valueOf()) return 0;
      var f = typeof b !== 'undefined' && typeof b.workingDayStart !== 'undefined' ? b.workingDayStart : d.visibleDayStart,
        e = typeof b !== 'undefined' && typeof b.workingDayFinish !== 'undefined' ? b.workingDayFinish :
          d.visibleDayFinish,
        g = typeof b !== 'undefined' && typeof b.workingWeekStart !== 'undefined' ? b.workingWeekStart : d.workingWeekStart,
        m = typeof b !== 'undefined' && typeof b.workingWeekFinish !== 'undefined' ? b.workingWeekFinish : d.workingWeekFinish,
        b = typeof b !== 'undefined' && typeof b.specialNonworkingDays !== 'undefined' ? b.specialNonworkingDays : d.specialNonworkingDays,
        d = 0, h = Y(a), a = ia(a);
      if (a < f) a = f; else if (a >= e) {
        h = aa(h);
        a = f;
      }
      for (var n = Y(c); h < n;) {
        var l = ka(h);
        l >= g && (l <= m && !Qb(h, b)) && (d = d + (e - a));
        h = aa(h);
        a = f;
      }
      c = ia(c);
      c < f ? c = f :
        c > e && (c = e);
      c > a && (d = d + (c - a));
      return d;
    }, R = function(a, c, d, b) {
      if (c < 0) return Qa(-c, a, d, b);
      a = Q(a, d, true, false, b);
      if (c == 0) return a;
      var f = typeof b !== 'undefined' && typeof b.workingDayStart !== 'undefined' ? b.workingDayStart : d.visibleDayStart,
        e = typeof b !== 'undefined' && typeof b.workingDayFinish !== 'undefined' ? b.workingDayFinish : d.visibleDayFinish,
        g = ia(a);
      if (g + c < e) return new Date(a.valueOf() + c);
      g = e - g;
      a = new Date(a.valueOf() + g);
      for (c = c - g; c > 0;) {
        a = ia(a) > 0 ? Q(aa(Y(a)), d, true, false, b) : Q(Y(a), d, true, false, b);
        if (f + c < e) return new Date(a.valueOf() +
          c);
        g = e - f;
        a = new Date(a.valueOf() + g);
        c = c - g;
      }
      return new Date(a.valueOf());
    }, Qa = function(a, c, d, b) {
      if (a < 0) return R(c, -a, d, b);
      c = Q(c, d, false, true, b);
      if (a == 0) return c;
      var f = typeof b !== 'undefined' && typeof b.workingDayStart !== 'undefined' ? b.workingDayStart : d.visibleDayStart,
        e = typeof b !== 'undefined' && typeof b.workingDayFinish !== 'undefined' ? b.workingDayFinish : d.visibleDayFinish,
        g = ia(c);
      if (g - a > f) return new Date(c.valueOf() - a);
      g = g - f;
      c = new Date(c.valueOf() - g);
      for (a = a - g; a > 0;) {
        c = ia(c) < 864E5 ? Q(Y(c), d, false, true, b) : Q(Ja(Y(c)),
          d, false, true, b);
        if (e - a > f) return new Date(c.valueOf() - a);
        g = e - f;
        c = new Date(c.valueOf() - g);
        a = a - g;
      }
      return new Date(c.valueOf());
    }, Za = function(a, c, d, b, f) {
      return N(a, c, b, f) / N(a, d, b, f);
    }, bc = function(a, c, d, b, f) {
      return R(a, c * N(a, d, b, f), b, f);
    }, Ra = function(a) {
      for (var c = 0, a = ga(a), d = 0; d < a.length; d++) c = c + a[d].value;
      c == 0 && (c = 1);
      return c;
    }, qb = function(a) {
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
        for (var c = 0, a = a.children, d = 0; d < a.length; d++) c = c + qb(a[d]);
        return c;
      }
      return a.ganttChartView.getItemEffort(a) *
        Ra(a);
    }, rb = function(a) {
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
        for (var c = 0, a = a.children, d = 0; d < a.length; d++) c = c + rb(a[d]);
        return c;
      }
      return a.ganttChartView.getItemCompletedEffort(a) * Ra(a);
    }, D = function(a) {
      if (a.schedule) return a.schedule;
      if (a.scheduleChartItem) return a.scheduleChartItem.schedule;
      var c = ga(a);
      if (c) {
        for (var d = -Infinity, b, f = 0; f < c.length; f++) {
          var e = c[f];
          if (e.value > d) {
            b = e.key;
            d = e.value;
          }
        }
        if ((a = a.ganttChartView) && a.settings && a.settings.resourceSchedules) {
          b =
            indexOfKey(a.settings.resourceSchedules, b);
          return b < 0 || !a.settings.resourceSchedules[b] ? void 0 : a.settings.resourceSchedules[b].value;
        }
      }
    }, setupDraggingEvents = function(a, c, d, b, f, e, g, m, h, n, l) {
      var s;
      a.addEventListener('mousedown', function(b) {
        if (b.button == 0) {
          n.isDuringTimeDragOperation = true;
          n.draggingItem = f;
          n.dragType = 'Start';
          n.style.cursor = a.style.cursor;
          n.draggingInitialX = b.clientX;
          n.draggingInitialStartPosition = e;
          n.draggingInitialFinishPosition = g;
          n.draggingInitialCompletedFinishPosition = m;
          b.preventDefault();
          if (ToolTip &&
            l.useUpdatingToolTips) {
            (s = ToolTip.get(a)) || (s = ToolTip.initialize(void 0, a, {
              duration: NaN,
              containerStyle: 'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid ' + l.border + '; background-color: White; color: Black; font-family: Arial; font-size: 12px; padding: 4px; margin-top: 1px',
            }, 'init warn'));
            s.setContent(l.dateTimeFormatter(K(f.start)) + ' \u2013 ' + l.dateTimeFormatter(K(f.finish)));
            s.show();
            s.originalX = s.x;
            n.toolTip = s;
          }
        }
      }, true);
      c != null && c.addEventListener('mousedown', function(b) {
        if (b.button == 0) {
          n.isDuringTimeDragOperation = true;
          n.draggingItem = f;
          n.dragType = 'StartOnly';
          n.style.cursor = a.style.cursor;
          n.draggingInitialX = b.clientX;
          n.draggingInitialStartPosition = e;
          b.preventDefault();
          if (ToolTip && l.useUpdatingToolTips) {
            (s = ToolTip.get(c)) || (s = ToolTip.initialize(void 0,
              c, {
                duration: NaN,
                containerStyle: 'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid ' + l.border + '; background-color: White; color: Black; font-family: Arial; font-size: 12px; padding: 4px; margin-top: 1px',
              }, 'init warn'));
            s.setContent(l.dateTimeFormatter(K(f.start)) + ' \u2013');
            s.show();
            s.setHorizontalPosition(s.x +
              4);
            s.originalX = s.x;
            n.toolTip = s;
          }
        }
      }, true);
      d != null && d.addEventListener('mousedown', function(a) {
        if (a.button == 0) {
          n.isDuringTimeDragOperation = true;
          n.draggingItem = f;
          n.dragType = 'Finish';
          n.style.cursor = d.style.cursor;
          n.draggingInitialX = a.clientX;
          n.draggingInitialFinishPosition = g;
          a.preventDefault();
          if (ToolTip && l.useUpdatingToolTips) {
            (s = ToolTip.get(d)) || (s = ToolTip.initialize(void 0, d, {
              duration: NaN,
              containerStyle: 'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid ' +
                l.border + '; background-color: White; color: Black; font-family: Arial; font-size: 12px; padding: 4px; margin-top: 1px',
            }, 'init warning'));
            s.setContent('\u2013 ' + l.dateTimeFormatter(K(f.finish)));
            s.show();
            s.setHorizontalPosition(s.x - s.contentContainer.clientWidth);
            s.originalX = s.x;
            n.toolTip = s;
          }
        }
      }, true);
      b != null && b.addEventListener('mousedown', function(a) {
        if (a.button == 0) {
          n.isDuringTimeDragOperation =
            true;
          n.draggingItem = f;
          n.dragType = 'CompletedFinish';
          n.style.cursor = b.style.cursor;
          n.draggingInitialX = a.clientX;
          n.draggingInitialCompletedFinishPosition = m;
          a.preventDefault();
          if (ToolTip && l.useUpdatingToolTips) {
            (s = ToolTip.get(b)) || (s = ToolTip.initialize(void 0, b, {
                duration: NaN,
                containerStyle: 'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid ' + l.border + '; background-color: White; color: Black; font-family: Arial; font-size: 12px; padding: 4px; margin-top: 1px',
              },
              'init warning'));
            a = Za(f.start, f.completedFinish, f.finish, l, D(f));
            if (!isNaN(a)) {
              s.setContent(Math.round(a * 1E4) / 100 + '%');
              s.show();
              s.setHorizontalPosition(s.x + 2);
              s.originalX = s.x;
              n.toolTip = s;
            }
          }
        }
      }, true);
      if (typeof n.draggableItems === 'undefined') n.draggableItems = [];
      for (var u = false, v = 0; v < n.draggableItems.length; v++) if (n.draggableItems[v] == f) {
        u = true;
        break;
      }
      if (!u) {
        n.addEventListener('mousemove',
          function(a) {
            if (!(typeof n.draggingItem === 'undefined' || n.draggingItem != f || n.dragType != 'Start' && n.dragType != 'StartOnly' && n.dragType != 'Finish' && n.dragType != 'CompletedFinish')) {
              var b = a.clientX - n.draggingInitialX;
              cc(a.clientX, n);
              delete n.draggingItem;
              n.draggingInitialStartPosition + b < 0 && (b = -n.draggingInitialStartPosition);
              if (n.dragType == 'Start' || n.dragType == 'StartOnly') {
                var c;
                n.dragType != 'StartOnly' && (c = N(f.start, f.finish, l, D(f)));
                a = N(f.start, f.completedFinish, l, D(f));
                b = Q(pa(Ca(n.draggingInitialStartPosition +
                  b, l), l), l, true, f.isMilestone, D(f));
                if (n.dragType == 'StartOnly' && b > f.finish) b = f.finish;
                f.start = b;
                f.preferredStart = f.start;
                y(f, 'start', true, false);
                if (n.dragType != 'StartOnly') {
                  if (f.isMilestone) {
                    f.finish = f.start;
                    y(f, 'finish', false, false);
                    f.completedFinish = f.start;
                  } else {
                    f.finish = R(f.start, c, l, D(f));
                    y(f, 'finish', false, false);
                    f.completedFinish = R(f.start, a, l, D(f));
                  }
                  y(f, 'completedFinish', false, false);
                  if (ToolTip && l.useUpdatingToolTips) {
                    s = n.toolTip;
                    s.setContent(l.dateTimeFormatter(K(f.start)) +
                      ' \u2013 ' + l.dateTimeFormatter(K(f.finish)));
                    s.setHorizontalPosition(s.originalX + (calculateBarX(f.start, l) - n.draggingInitialStartPosition));
                  }
                } else {
                  if (f.finish < f.start) {
                    f.finish = f.start;
                    y(f, 'finish', false, false);
                  }
                  if (f.completedFinish < f.start || a <= 0) {
                    f.completedFinish = f.start;
                    y(f, 'completedFinish', false, false);
                  }
                  if (ToolTip && l.useUpdatingToolTips) {
                    s = n.toolTip;
                    s.setContent(l.dateTimeFormatter(K(f.start)) + ' \u2013');
                    s.setHorizontalPosition(s.originalX + (calculateBarX(f.start, l) - n.draggingInitialStartPosition));
                  }
                }
                Sa(f,
                  h, n.chartContent, l);
              } else if (n.dragType == 'Finish') {
                c = Q(pa(Ca(n.draggingInitialFinishPosition + b, l), l), l, f.isMilestone, true, D(f));
                if (c < f.start) c = f.start;
                if (c.valueOf() != f.finish.valueOf()) {
                  f.finish = c;
                  y(f, 'finish', true, false);
                }
                if (f.completedFinish > c) {
                  f.completedFinish = c;
                  y(f, 'completedFinish', false, false);
                }
                if (ToolTip && l.useUpdatingToolTips) {
                  s = n.toolTip;
                  s.setContent('\u2013 ' + l.dateTimeFormatter(K(f.finish)));
                  s.setHorizontalPosition(s.originalX + (calculateBarX(f.finish, l) - n.draggingInitialFinishPosition));
                }
                Sa(f,
                  h, n.chartContent, l);
              } else if (n.dragType == 'CompletedFinish') {
                c = Q(pa(Ca(n.draggingInitialCompletedFinishPosition + b, l), l), l, f.isMilestone, true, D(f));
                if (c < f.start) c = f.start;
                if (c > f.finish) c = f.finish;
                if (c.valueOf() != f.completedFinish.valueOf()) {
                  f.completedFinish = c;
                  y(f, 'completedFinish', true, false);
                }
                if (ToolTip && l.useUpdatingToolTips) {
                  s = n.toolTip;
                  c = Za(f.start, f.completedFinish, f.finish, l, D(f));
                  if (!isNaN(c)) {
                    s.setContent(Math.round(c * 1E4) / 100 + '%');
                    s.setHorizontalPosition(s.originalX + (calculateBarX(f.completedFinish,
                      l) - n.draggingInitialCompletedFinishPosition));
                  }
                }
                Sa(f, h, n.chartContent, l);
              }
              n.draggingItem = f;
              n.draggingPerformed = true;
            }
          }, true);
        document.addEventListener('mouseup', function(a) {
          if (!(a.button != 0 || typeof n.draggingItem === 'undefined' || n.draggingItem != f || n.dragType != 'Start' && n.dragType != 'StartOnly' && n.dragType != 'Finish' && n.dragType != 'CompletedFinish')) {
            delete n.isDuringTimeDragOperation;
            a = n.draggingItem;
            n.style.cursor = 'default';
            if (n.draggingPerformed) {
              if (n.dragType == 'Start' || n.dragType == 'StartOnly') {
                y(a, 'start',
                  true, true);
                y(a, 'finish', false, true);
                y(a, 'completedFinish', false, true);
              } else if (n.dragType == 'Finish') {
                y(a, 'finish', true, true);
                y(a, 'completedFinish', false, true);
              } else n.dragType == 'CompletedFinish' && y(a, 'completedFinish', true, true);
              delete n.draggingPerformed;
            }
            delete n.draggingItem;
          }
        }, true);
        n.draggableItems.push(f);
      }
    }, Ya = function(a, c, d, b, f, e, g, m, h, n) {
      var l = b.ganttChartView.ownerDocument;
      a.addEventListener('mousedown', function(c) {
        if (c.button == 0) {
          delete h.cancelDrag;
          h.draggingItem = b;
          h.dragType = 'Dependency';
          h.dragDependencyType = 'Finish';
          h.style.cursor = a.style.cursor;
          h.draggingInitialX = c.clientX;
          h.draggingInitialY = c.clientY;
          h.draggingInitialRightPosition = e;
          h.draggingInitialTopPosition = f;
          h.draggingInitialFinishPosition = e;
          h.draggingInitialThumbPosition = f;
          c.preventDefault();
          if (ToolTip && n.useUpdatingToolTips) {
            let toolTip = ToolTip.get(a) || ToolTip.initialize(void 0, a, {
              duration: NaN,
              containerStyle: 'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid ' +
                n.border + '; background-color: White; color: Black; font-family: Arial; font-size: 12px; padding: 4px; margin-top: 1px',
            }, 'init warning');
            toolTip.setContent(b.content + ' \u2013');
            toolTip.show();
            toolTip.setPosition(toolTip.x + 16, toolTip.y - 8);
            toolTip.originalX = toolTip.x;
            toolTip.originalY = toolTip.y;
            h.toolTip = toolTip;
          }
        }
      }, true);
      c != null && c.addEventListener('mousedown', function(d) {
        if (d.button ==
          0) {
          delete h.cancelDrag;
          h.draggingItem = b;
          h.dragType = 'Dependency';
          h.dragDependencyType = 'Start';
          h.style.cursor = a.style.cursor;
          h.draggingInitialX = d.clientX;
          h.draggingInitialY = d.clientY;
          h.draggingInitialRightPosition = g;
          h.draggingInitialTopPosition = f;
          h.draggingInitialFinishPosition = g;
          h.draggingInitialThumbPosition = f;
          d.preventDefault();
          if (ToolTip && n.useUpdatingToolTips) {
            let toolTip = ToolTip.get(c) || ToolTip.initialize(void 0, c, {
              duration: NaN,
              containerStyle: 'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid ' +
                n.border + '; background-color: White; color: Black; font-family: Arial; font-size: 12px; padding: 4px; margin-top: 1px',
            }, 'init warning');
            toolTip.setContent(b.content + ' \u2013');
            toolTip.show();
            toolTip.setPosition(toolTip.x + 16, toolTip.y - 8);
            toolTip.originalX = toolTip.x;
            toolTip.originalY = toolTip.y;
            h.toolTip = toolTip;
          }
        }
      }, true);
      a.addEventListener('mouseover', function() {
        if (typeof h.temporaryHoveringThumb !==
          'undefined') {
          var b = h.temporaryHoveringThumb;
          delete h.temporaryHoveringThumb;
          if (typeof b.originalStyle === 'undefined') return;
          b.setAttribute('style', b.originalStyle);
          delete b.originalStyle;
        }
        if (typeof h.temporaryDependencyLine === 'undefined') {
          a.mouseOver = true;
          h.temporaryHoveringThumb = a;
          a.originalStyle = a.getAttribute('style');
          typeof n.dependencyPointerClass !== 'undefined' && a.setAttribute('class', n.dependencyPointerClass);
          typeof n.dependencyPointerStyle !== 'undefined' && a.setAttribute('style', n.dependencyPointerStyle);
          a.style.cursor = 'pointer';
        }
      }, true);
      c != null && c.addEventListener('mouseover', function() {
        if (typeof h.temporaryHoveringThumb !== 'undefined') {
          var a = h.temporaryHoveringThumb;
          delete h.temporaryHoveringThumb;
          if (typeof a.originalStyle === 'undefined') return;
          a.setAttribute('style', a.originalStyle);
          delete a.originalStyle;
        }
        if (typeof h.temporaryDependencyLine === 'undefined') {
          c.mouseOver = true;
          h.temporaryHoveringThumb = c;
          c.originalStyle = c.getAttribute('style');
          typeof n.dependencyPointerClass !== 'undefined' && c.setAttribute('class',
            n.dependencyPointerClass);
          typeof n.dependencyPointerStyle !== 'undefined' && c.setAttribute('style', n.dependencyPointerStyle);
          c.style.cursor = 'pointer';
        }
      }, true);
      a.addEventListener('mouseout', function() {
        delete a.mouseOver;
        setTimeout(function() {
          if (!(typeof a.originalStyle === 'undefined' || a.mouseOver)) {
            a.setAttribute('style', a.originalStyle);
            delete a.originalStyle;
          }
        }, 2E3);
      }, true);
      if (c != null) {
        delete c.mouseOver;
        c.addEventListener('mouseout', function() {
          setTimeout(function() {
            if (!(typeof c.originalStyle === 'undefined' ||
              c.mouseOver)) {
              c.setAttribute('style', c.originalStyle);
              delete c.originalStyle;
            }
          }, 2E3);
        }, true);
      }
      if (typeof h.draggableDependencyItems === 'undefined') h.draggableDependencyItems = [];
      for (var s = false, u = 0; u < h.draggableDependencyItems.length; u++) if (h.draggableDependencyItems[u] == b) {
        s = true;
        break;
      }
      if (!s) {
        h.addEventListener('mousemove', function(a) {
          if (!(typeof h.draggingItem === 'undefined' || h.draggingItem != b || h.dragType != 'Dependency')) {
            var c = a.clientX - h.draggingInitialX, f = a.clientY - h.draggingInitialY;
            cc(a.clientX, h);
            dc(a.clientY, h);
            delete h.draggingItem;
            h.draggingInitialFinishPosition + c < 0 && (c = -h.draggingInitialFinishPosition);
            if (typeof h.temporaryDependencyLine !== 'undefined') {
              try {
                d.removeChild(h.temporaryDependencyLine);
              } catch (e) {
              }
              delete h.temporaryDependencyLine;
            }
            if (h.cancelDrag) {
              delete h.cancelDrag;
              delete h.draggingItem;
              h.style.cursor = 'default';
            } else {
              a = l.createElementNS('http://www.w3.org/2000/svg', 'line');
              a.setAttribute('x1', h.draggingInitialRightPosition);
              a.setAttribute('y1', h.draggingInitialTopPosition);
              a.setAttribute('x2',
                h.draggingInitialFinishPosition + c);
              a.setAttribute('y2', h.draggingInitialThumbPosition + f);
              typeof n.temporaryDependencyLineClass !== 'undefined' && a.setAttribute('class', n.temporaryDependencyLineClass);
              typeof n.temporaryDependencyLineStyle !== 'undefined' && a.setAttribute('style', n.temporaryDependencyLineStyle);
              h.temporaryDependencyLine = a;
              d.appendChild(a);
              h.draggingItem = b;
              if (ToolTip && n.useUpdatingToolTips) {
                let toolTip = h.toolTip;
                for (var g = Math.floor((b.itemTop + h.draggingInitialThumbPosition + f) /
                  n.itemHeight), a = null, s = 0, u = 0; u < m.length; u++) {
                  var j = m[u];
                  if (j.isVisible && !(typeof j.isHidden !== 'undefined' && j.isHidden) && typeof j.displayRowIndex === 'undefined') {
                    if (s == g) {
                      a = j;
                      break;
                    }
                    s++;
                  }
                }
                g = 'Start';
                if (a != null) {
                  s = h.draggingInitialFinishPosition + c;
                  u = calculateBarX(a.start, n);
                  j = calculateBarX(a.finish, n);
                  if (a.isMilestone || a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
                    u = u - n.itemHeight / 2;
                    j = j + n.itemHeight / 2;
                  }
                  j < u + 4 && (j = u + 4);
                  if (s < u || s > j || jb(a, b) || Da(a, b) || Da(b, a)) a = null;
                  if (a != null && (typeof n.allowCreatingToFinishDependencies ===
                    'undefined' || n.allowCreatingToFinishDependencies) && !a.isMilestone && s > u + (j - u) * 3 / 4) g = 'Finish';
                }
                toolTip.setContent(b.content + ' \u2013' + (a != null ? ' ' + a.content + (g != 'Finish' ? '' : ' \u2022') : ''));
                toolTip.setPosition(toolTip.originalX + c, toolTip.originalY + f);
              }
            }
          }
        }, true);
        l.addEventListener('mouseup', function(a) {
          if (!(a.button != 0 || typeof h.draggingItem === 'undefined' || h.draggingItem != b || h.dragType != 'Dependency')) {
            if (typeof h.temporaryDependencyLine !== 'undefined') {
              try {
                d.removeChild(h.temporaryDependencyLine);
              } catch (c) {
              }
              delete h.temporaryDependencyLine;
            }
            for (var f =
              Math.floor((b.itemTop + h.draggingInitialThumbPosition + (a.clientY - h.draggingInitialY)) / n.itemHeight), e = null, l = 0, g = 0; g < m.length; g++) {
              var s = m[g];
              if (s.isVisible && !(typeof s.isHidden !== 'undefined' && s.isHidden) && typeof s.displayRowIndex === 'undefined') {
                if (l == f) {
                  e = s;
                  break;
                }
                l++;
              }
            }
            if (e != null) {
              a = h.draggingInitialFinishPosition + (a.clientX - h.draggingInitialX);
              f = calculateBarX(e.start, n);
              l = calculateBarX(e.finish, n);
              if (e.isMilestone || e.hasChildren && (typeof e.isSummaryEnabled === 'undefined' || e.isSummaryEnabled)) {
                f = f - n.itemHeight / 2;
                l = l + n.itemHeight /
                  2;
              }
              l < f + 4 && (l = f + 4);
              if (a >= f && a <= l && !jb(e, b) && !Da(e, b) && !Da(b, e)) {
                a = e == null || typeof n.allowCreatingToFinishDependencies !== 'undefined' && !n.allowCreatingToFinishDependencies || e.isMilestone || a <= f + (l - f) * 3 / 4 ? 'Start' : 'Finish';
                delete b.successors;
                if (typeof e.predecessors === 'undefined') e.predecessors = [];
                f = { item: b };
                if (h.dragDependencyType != 'Start') {
                  if (a == 'Finish') f.dependencyType = 'FF';
                } else f.dependencyType = a != 'Finish' ? 'SS' : 'SF';
                e.predecessors.push(f);
                y(e, 'predecessors', true, true);
                if (e.start < b.finish && !n.areTaskDependencyConstraintsEnabled &&
                  !n.areTaskDependencyConstraintsDisabledWhenDropping) {
                  var u, j;
                  if (!e.isMilestone && (!e.hasChildren || !(typeof e.isSummaryEnabled === 'undefined' || e.isSummaryEnabled))) {
                    u = N(e.start, e.finish, n, D(e));
                    j = N(e.start, e.completedFinish, n, D(e));
                  }
                  if ((!e.hasChildren || !(typeof e.isSummaryEnabled === 'undefined' || e.isSummaryEnabled)) && a == 'Start') {
                    e.start = Q(pa(h.dragDependencyType != 'Start' ? b.finish : b.start, n), n, true, e.isMilestone, D(b));
                    y(e, 'start', false, true);
                    if (e.isMilestone) {
                      e.finish = e.start;
                      y(e, 'finish', false, true);
                      e.completedFinish =
                        e.start;
                    } else {
                      e.finish = R(e.start, u, n, D(e));
                      y(e, 'finish', false, true);
                      e.completedFinish = R(e.start, j, n, D(e));
                    }
                    y(e, 'completedFinish', false, true);
                  }
                }
                Sa(e, m, h.chartContent, n);
                Sa(b, m, h.chartContent, n);
              }
            }
            delete h.draggingItem;
            h.style.cursor = 'default';
          }
        }, true);
        h.draggableDependencyItems.push(b);
      }
    }, cc = function(a, c) {
      if (typeof c.draggingItem !== 'undefined') {
        var d = c, b = 0;
        if (d.offsetParent) {
          do {
            b = b + d.offsetLeft;
            d = d.offsetParent;
          } while (d);
        }
        a = a - b;
        if (a < c.gridContentContainer.offsetWidth + 24) {
          d = c.chartContentContainer.scrollLeft;
          c.chartContentContainer.scrollLeft = c.chartContentContainer.scrollLeft - 20;
          d = d - c.chartContentContainer.scrollLeft;
          if (typeof c.draggingInitialStartPosition !== 'undefined') c.draggingInitialStartPosition = c.draggingInitialStartPosition - d;
          if (typeof c.draggingInitialFinishPosition !== 'undefined') c.draggingInitialFinishPosition = c.draggingInitialFinishPosition - d;
          if (typeof c.draggingInitialCompletedFinishPosition !== 'undefined') c.draggingInitialCompletedFinishPosition = c.draggingInitialCompletedFinishPosition - d;
        } else if (a >=
          c.gridContentContainer.offsetWidth + c.chartContentContainer.clientWidth - 24) {
          d = c.chartContentContainer.scrollLeft;
          c.chartContentContainer.scrollLeft = c.chartContentContainer.scrollLeft + 20;
          d = c.chartContentContainer.scrollLeft - d;
          if (typeof c.draggingInitialStartPosition !== 'undefined') c.draggingInitialStartPosition = c.draggingInitialStartPosition + d;
          if (typeof c.draggingInitialFinishPosition !== 'undefined') c.draggingInitialFinishPosition = c.draggingInitialFinishPosition + d;
          if (typeof c.draggingInitialCompletedFinishPosition !==
            'undefined') c.draggingInitialCompletedFinishPosition = c.draggingInitialCompletedFinishPosition + d;
        }
      }
    }, Mc = function(a) {
      var c = 0;
      if (a.offsetParent) {
        do {
          c = c + a.offsetTop;
          a = a.offsetParent;
        } while (a);
      }
      return c;
    }, dc = function(a, c) {
      if (typeof c.draggingItem !== 'undefined') {
        var a = a - Mc(c), d, b;
        if (a < c.chartHeaderContainer.clientHeight + 24) {
          d = c.chartContentContainer.scrollTop;
          c.chartContentContainer.scrollTop = c.chartContentContainer.scrollTop - 20;
          if (typeof c.isDuringVerticalScrolling === 'undefined') {
            c.isDuringVerticalScrolling =
              true;
            setTimeout(function() {
              b = d - c.chartContentContainer.scrollTop;
              c.draggingInitialThumbPosition = c.draggingInitialThumbPosition - b;
              delete c.isDuringVerticalScrolling;
            }, 0);
          }
        } else if (a >= c.chartHeaderContainer.clientHeight + c.chartContentContainer.clientHeight - 24) {
          d = c.chartContentContainer.scrollTop;
          c.chartContentContainer.scrollTop = c.chartContentContainer.scrollTop + 20;
          if (typeof c.isDuringVerticalScrolling === 'undefined') {
            c.isDuringVerticalScrolling = true;
            setTimeout(function() {
              b = c.chartContentContainer.scrollTop -
                d;
              c.draggingInitialThumbPosition = c.draggingInitialThumbPosition + b;
              delete c.isDuringVerticalScrolling;
            }, 0);
          }
        }
      }
    }, Sa = function(a, c, d, b) {
      fa(a.chartItem, a, b);
      qa(c, a);
      setTimeout(function() {
        if (typeof a.gridItem !== 'undefined') {
          if (typeof a.completedInput !== 'undefined') {
            var f = a.completedInput;
            typeof f.changeEventListener !== 'undefined' && f.removeEventListener('change', f.changeEventListener, true);
            delete a.completedInput;
          }
          Aa(a.gridItem, a, c, b.columns, d, b.toggleButtonAreaWidth, b);
        }
        for (f = a.parent; f != null;) {
          Va(f, false);
          a = f;
          fa(a.chartItem, a, b);
          qa(c, a);
          typeof a.gridItem !== 'undefined' && Aa(a.gridItem, a, c, b.columns, d, b.toggleButtonAreaWidth, b);
          f = a.parent;
        }
      }, 0);
    }, ec = function(a) {
      var c = a.itemTop - a.ganttChartView.chartContentContainer.scrollTop;
      if (c < 0) a.ganttChartView.chartContentContainer.scrollTop = a.itemTop; else if (c > a.ganttChartView.chartContentContainer.clientHeight - a.ganttChartView.settings.itemHeight) a.ganttChartView.chartContentContainer.scrollTop = a.itemTop - (a.ganttChartView.chartContentContainer.clientHeight - a.ganttChartView.settings.itemHeight);
    },
    yc = function(a, c, d, b, f, e, g, m, h, n, l, s, u, v) {
      var j, q;
      c.addEventListener('scroll', function() {
        if (g.scrollTop != c.scrollTop && !q) {
          j = true;
          setTimeout(function() {
            g.scrollTop = c.scrollTop;
            setTimeout(function() {
              j = false;
            }, 100);
          }, 200);
        }
        if (b.scrollLeft != c.scrollLeft) b.scrollLeft = c.scrollLeft;
      }, true);
      $a(c, d, f, v);
      typeof a.updateGridHeaderTimer !== 'undefined' && clearInterval(a.updateGridHeaderTimer);
      a.updateGridHeaderTimer = setInterval(function() {
          try {
            $a(c, d, f, v);
          } catch (b) {
            try {
              clearInterval(a.updateGridHeaderTimer);
            } catch (m) {
            }
          }
        },
        100);
      g.addEventListener('scroll', function() {
        if (c.scrollTop != g.scrollTop && !j) {
          q = true;
          setTimeout(function() {
            c.scrollTop = g.scrollTop;
            setTimeout(function() {
              q = false;
            }, 100);
          }, 200);
        }
        if (m.scrollLeft != g.scrollLeft) m.scrollLeft = g.scrollLeft;
        va(u, g, v);
        Ka(u, l, v);
        v.displayedTime = Ca(g.scrollLeft, v);
        (typeof a.isDuringScrollToDateTime === 'undefined' || !a.isDuringScrollToDateTime) && typeof v.displayedTimeChangeHandler !== 'undefined' && setTimeout(function() {
          v.displayedTimeChangeHandler(v.displayedTime);
        }, 0);
        typeof a.isDuringScrollToDateTime !==
        'undefined' && delete a.isDuringScrollToDateTime;
      }, true);
      setTimeout(function() {
        if (m.scrollLeft != g.scrollLeft) m.scrollLeft = g.scrollLeft;
        va(u, g, v);
      }, 1);
      $a(g, h, n, v);
      typeof a.updateChartHeaderTimer !== 'undefined' && clearInterval(a.updateChartHeaderTimer);
      a.updateChartHeaderTimer = setInterval(function() {
        try {
          $a(g, h, n, v);
        } catch (b) {
          try {
            clearInterval(a.updateChartHeaderTimer);
          } catch (c) {
          }
        }
      }, 100);
      window.addEventListener('mousewheel', function() {
        try {
          a.cancelDrag = true;
        } catch (b) {
        }
      }, true);
    }, $a = function(a, c, d, b) {
      setTimeout(function() {
        try {
          var f =
            c.clientWidth - a.clientWidth;
          f < 0 && (f = 0);
          var e = f + 'px';
          if (d.style.width != e) {
            d.style.width = e;
            if (f > 0) {
              d.style.boxSizing = 'border-box';
              d.style.MozBoxSizing = 'border-box';
              d.style.border = 'solid 1px ' + b.border;
              d.style.borderTop = 'none';
              d.style.borderRight = 'none';
            } else {
              d.style.border = '';
              d.style.borderTop = '';
              d.style.borderRight = '';
              d.style.boxSizing = '';
              d.style.MozBoxSizing = '';
            }
          }
        } catch (g) {
        }
      }, 0);
    }, Ba = function(a, c, d) {
      if (d.isSplitterEnabled) {
        a.style.height = c.clientHeight + 'px';
        a.style.left = Math.max(0, c.offsetWidth - 1) + 'px';
      }
    },
    va = function(a, c, d) {
      if (!(typeof c.isInitializing !== 'undefined' && c.isInitializing) && d.isVirtualizing) for (var b = c.scrollTop - d.itemHeight, c = b + c.clientHeight + 2 * d.itemHeight, f = 0; f < a.length; f++) {
        var e = a[f];
        if (!e.isPart) if (typeof e.isVirtuallyVisible === 'undefined' && (typeof e.isVisible === 'undefined' || e.isVisible) && !(typeof e.isHidden !== 'undefined' && e.isHidden) && typeof e.itemTop !== 'undefined' && e.itemTop >= b && e.itemTop < c) {
          e.isVirtuallyVisible = true;
          y(e, 'isVirtuallyVisible', false, true);
          typeof e.gridItem !== 'undefined' &&
          Aa(e.gridItem, e, a, d.columns, e.ganttChartView.chartContent, d.toggleButtonAreaWidth, d);
          fa(e.chartItem, e, d);
          e.chartItem.setAttribute('transform', 'translate(0, ' + e.itemTop + ')');
          Ea(e, e.itemTop);
        } else typeof e.isVirtuallyVisible !== 'undefined' && ((typeof e.isVisible === 'undefined' || e.isVisible) && !(typeof e.isHidden !== 'undefined' && e.isHidden) && typeof e.itemTop !== 'undefined' && (e.itemTop < b || e.itemTop >= c)) && delete e.isVirtuallyVisible;
      }
    }, vc = function(a, c) {
      for (var d = a.childNodes.length; d-- > 0;) a.removeChild(a.childNodes[d]);
      a.appendChild(c);
    }, sb = function(a, c, d, b) {
      var f = b.indexOf(a);
      if (!(f < 0 || c < 0 || c == f || c >= b.length)) {
        b.splice(f, 1);
        b.splice(c, 0, a);
        fc(b);
        ganttChartViewRefresh(d);
        typeof d.settings.itemMoveHandler !== 'undefined' && d.settings.itemMoveHandler(a, f, c);
      }
    }, ab = function(a, c, d, b, f) {
      if (!(a < 0 || d < 0 || d == a || d > f.length - c)) {
        var e = [], g;
        for (g = a; g < a + c; g++) e.push(f[g]);
        f.splice(a, c);
        for (g = 0; g < e.length; g++) f.splice(d + g, 0, e[g]);
        fc(f);
        ganttChartViewRefresh(b);
        if (typeof b.settings.itemMoveHandler !== 'undefined') for (g = 0; g < e.length; g++) b.settings.itemMoveHandler(e[g], a + g, d +
          g);
      }
    }, fc = function(a) {
      for (var c = 0, d = 0; d < a.length; d++) {
        var b = a[d];
        if (b.indentation > c) {
          b.indentation = c;
          y(b, 'indentation', false, true);
        }
        c = b.indentation + 1;
      }
    }, Nc = function(a, c, d, b, f, e, g, m, h, n) {
      a.addEventListener('mousedown', function(d) {
        if (d.button == 0) {
          delete b.cancelDrag;
          b.draggingItem = c;
          b.dragType = 'Ordering';
          b.style.cursor = a.style.cursor;
          b.draggingInitialY = d.clientY;
          b.draggingInitialThumbPosition = 0;
          b.resetChartAreaDefinitions();
          d.preventDefault();
        }
      }, true);
      if (typeof b.draggableOrderingItems === 'undefined') b.draggableOrderingItems =
        [];
      for (var l = false, s = 0; s < b.draggableOrderingItems.length; s++) if (b.draggableOrderingItems[s] == c) {
        l = true;
        break;
      }
      if (!l) {
        b.addEventListener('mousemove', function(a) {
          if (!(typeof b.draggingItem === 'undefined' || b.draggingItem != c || b.dragType != 'Ordering')) {
            if (typeof b.temporaryHoveredGridItemSelectionContainer !== 'undefined') {
              b.temporaryHoveredGridItemSelectionContainer.setAttribute('class', b.temporaryHoveredGridItemClass);
              b.temporaryHoveredGridItemSelectionContainer.setAttribute('style', b.temporaryHoveredGridItemStyle);
              delete b.temporaryHoveredGridItemSelectionContainer;
              delete b.temporaryHoveredGridItemClass;
              delete b.temporaryHoveredGridItemStyle;
            }
            var l = a.clientY - b.draggingInitialY;
            dc(a.clientY, b);
            delete b.draggingItem;
            if (b.cancelDrag) {
              x(c, f);
              delete b.cancelDrag;
              delete b.draggingItem;
              b.style.cursor = 'default';
            } else {
              for (var a = Math.floor((c.itemTop + b.draggingInitialThumbPosition + l) / f.itemHeight), l = null, s = 0, q = 0; q < d.length; q++) {
                var j = d[q];
                if (j.isVisible && !(typeof j.isHidden !== 'undefined' && j.isHidden) && typeof j.displayRowIndex ===
                  'undefined') {
                  if (s == a) {
                    l = j;
                    break;
                  }
                  s++;
                }
              }
              if (l != null && l != c && l.gridItemSelectionContainer != null) {
                b.temporaryHoveredGridItemSelectionContainer = l.gridItemSelectionContainer;
                b.temporaryHoveredGridItemClass = l.gridItemSelectionContainer.getAttribute('class');
                b.temporaryHoveredGridItemStyle = l.gridItemSelectionContainer.getAttribute('style');
                typeof e === 'undefined' || e(a, l) ? typeof g !== 'undefined' ? l.gridItemSelectionContainer.setAttribute('class', g) : typeof m !== 'undefined' && l.gridItemSelectionContainer.setAttribute('style',
                  m) : typeof h !== 'undefined' ? l.gridItemSelectionContainer.setAttribute('class', h) : typeof n !== 'undefined' && l.gridItemSelectionContainer.setAttribute('style', n);
              }
              b.draggingItem = c;
            }
          }
        }, true);
        document.addEventListener('mouseup', function(a) {
          if (!(a.button != 0 || typeof b.draggingItem === 'undefined' || b.draggingItem != c || b.dragType != 'Ordering')) {
            if (typeof b.temporaryHoveredGridItemSelectionContainer !== 'undefined') {
              b.temporaryHoveredGridItemSelectionContainer.setAttribute('class', b.temporaryHoveredGridItemClass);
              b.temporaryHoveredGridItemSelectionContainer.setAttribute('style',
                b.temporaryHoveredGridItemStyle);
              delete b.temporaryHoveredGridItemSelectionContainer;
              delete b.temporaryHoveredGridItemClass;
              delete b.temporaryHoveredGridItemStyle;
            }
            for (var a = Math.floor((c.itemTop + b.draggingInitialThumbPosition + (a.clientY - b.draggingInitialY)) / f.itemHeight), m = null, h = 0, n = 0; n < d.length; n++) {
              var l = d[n];
              if (l.isVisible && !(typeof l.isHidden !== 'undefined' && l.isHidden) && typeof l.displayRowIndex === 'undefined') {
                if (h == a) {
                  m = l;
                  break;
                }
                h++;
              }
            }
            m != null && (typeof e === 'undefined' || e(a, m)) && b.moveItemHierarchy(b.draggingItem,
              m.index);
            setTimeout(function() {
              x(c, f);
              ec(c);
            }, 0);
            b.resetChartAreaDefinitions();
            delete b.draggingItem;
            b.style.cursor = 'default';
          }
        }, true);
        b.draggableOrderingItems.push(c);
      }
    }, Oc = function(a, c) {
      for (var d in c) d.indexOf('custom') != 0 && d.indexOf('description') != 0 || typeof a[d] === 'undefined' && (a[d] = c[d]);
    }, gc = function(a, c, d, b, f, e, g, m, h, n, l, s, u, v, j, q) {
      var k, p = [], o;
      if (typeof b !== 'undefined') for (k = 0; k < b.length; k++) {
        o = q.columns[b[k]];
        p.push({
          isTreeView: o.isTreeView,
          header: o.header,
          width: o.width,
          headerClass: o.headerClass,
          headerStyle: o.headerStyle,
          cellClass: o.cellClass,
          cellStyle: o.cellStyle,
          cellTemplate: typeof o.exportCellTemplate !== 'undefined' ? o.exportCellTemplate : o.cellTemplate,
        });
      } else for (k = 0; k < q.columns.length; k++) {
        o = q.columns[k];
        o.isSelection || p.push({
          isTreeView: o.isTreeView,
          header: o.header,
          width: o.width,
          headerClass: o.headerClass,
          headerStyle: o.headerStyle,
          cellClass: o.cellClass,
          cellStyle: o.cellStyle,
          cellTemplate: typeof o.exportCellTemplate !== 'undefined' ? o.exportCellTemplate : o.cellTemplate,
        });
      }
      if (typeof d === 'undefined') d =
        q.isGridVisible;
      k = d ? db(p) + 1 : 0;
      if (typeof f !== 'undefined') {
        if (typeof g === 'undefined' || !g) f = new Date(f.valueOf() - f.getTimezoneOffset() * 6E4);
      } else f = q.timelineStart;
      if (typeof e !== 'undefined') {
        if (typeof g === 'undefined' || !g) e = new Date(e.valueOf() - e.getTimezoneOffset() * 6E4);
      } else e = q.timelineFinish;
      f = {
        isExport: true,
        isReadOnly: true,
        selectionMode: 'None',
        isVirtualizing: false,
        isGridVisible: d,
        isSplitterEnabled: false,
        gridWidth: k + 'px',
        columns: p,
        allowUserToResizeColumns: false,
        isGridRowClickTimeScrollingEnabled: false,
        isMouseWheelZoomEnabled: false,
        timelineStart: f,
        timelineFinish: e,
        hourWidth: typeof m !== 'undefined' ? m : q.hourWidth,
        displayedTime: typeof f !== 'undefined' ? f : q.timelineStart,
        currentTime: q.currentTime,
        isTaskToolTipVisible: false,
        isDependencyToolTipVisible: false,
        containerClass: q.containerClass,
        containerStyle: q.containerStyle,
        border: q.border,
        theme: q.theme,
        headerBackground: q.headerBackground,
        headerHeight: q.headerHeight,
        itemHeight: q.itemHeight,
        itemClass: q.itemClass,
        itemStyle: q.itemStyle,
        standardItemClass: q.standardItemClass,
        summaryItemClass: q.summaryItemClass,
        milestoneItemClass: q.milestoneItemClass,
        standardItemStyle: q.standardItemStyle,
        summaryItemStyle: q.summaryItemStyle,
        milestoneItemStyle: q.milestoneItemStyle,
        indentationLevelWidth: q.indentationLevelWidth,
        toggleButtonClass: q.toggleButtonClass,
        toggleButtonStyle: q.toggleButtonStyle,
        scales: [],
        visibleWeekStart: q.visibleWeekStart,
        visibleWeekFinish: q.visibleWeekFinish,
        workingWeekStart: q.workingWeekStart,
        workingWeekFinish: q.workingWeekFinish,
        visibleDayStart: q.visibleDayStart,
        visibleDayFinish: q.visibleDayFinish,
        specialNonworkingDays: q.specialNonworkingDays,
        barMargin: q.barMargin,
        barHeight: q.barHeight,
        barCornerRadius: q.barCornerRadius,
        completedBarMargin: q.completedBarMargin,
        completedBarHeight: q.completedBarHeight,
        completedBarCornerRadius: q.completedBarCornerRadius,
        standardBarClass: q.standardBarClass,
        summaryBarClass: q.summaryBarClass,
        milestoneBarClass: q.milestoneBarClass,
        standardBarStyle: q.standardBarStyle,
        summaryBarStyle: q.summaryBarStyle,
        milestoneBarStyle: q.milestoneBarStyle,
        standardCompletedBarClass: q.standardCompletedBarClass,
        standardCompletedBarStyle: q.standardCompletedBarStyle,
        dependencyLineClass: q.dependencyLineClass,
        dependencyLineStyle: q.dependencyLineStyle,
        assignmentsClass: q.assignmentsClass,
        assignmentsStyle: q.assignmentsStyle,
        areTaskAssignmentsVisible: q.areTaskAssignmentsVisible,
        isTaskCompletedEffortVisible: q.isTaskCompletedEffortVisible,
        areTaskDependenciesVisible: q.areTaskDependenciesVisible,
        areDependencyConstraintsAppliedOnStartedTasks: q.areDependencyConstraintsAppliedOnMilestones,
        areDependencyConstraintsAppliedOnMilestones: q.areDependencyConstraintsAppliedOnMilestones,
        isBaselineVisible: q.isBaselineVisible,
        alternativeItemClass: q.alternativeItemClass,
        alternativeChartItemClass: q.alternativeChartItemClass,
        alternativeItemStyle: q.alternativeItemStyle,
        alternativeChartItemStyle: q.alternativeChartItemStyle,
        gridLines: q.gridLines,
        horizontalGridLines: q.horizontalGridLines,
        verticalGridLines: q.verticalGridLines,
        horizontalChartLines: q.horizontalChartLines,
        isIndividualItemNonworkingTimeHighlighted: q.isIndividualItemNonworkingTimeHighlighted,
        areTaskInterruptionsHighlighted: q.areTaskInterruptionsHighlighted,
        isBaselineVisible: q.isBaselineVisible,
        taskInitiationCost: q.taskInitiationCost,
        defaultResourceUsageCost: q.defaultResourceUsageCost,
        specificResourceUsageCosts: q.specificResourceUsageCosts,
        defaultResourceHourCost: q.defaultResourceHourCost,
        specificResourceHourCosts: q.specificResourceHourCosts,
        target: q.target,
        months: q.months,
        daysOfWeek: q.daysOfWeek,
        weekStartDay: q.weekStartDay,
        dateFormatter: q.dateFormatter,
        dateTimeFormatter: q.dateTimeFormatter,
        isRelativeToTimezone: q.isRelativeToTimezone,
        standardTaskTemplate: q.standardTaskTemplate,
        summaryTaskTemplate: q.summaryTaskTemplate,
        milestoneTaskTemplate: q.milestoneTaskTemplate,
        assignmentsTemplate: q.assignmentsTemplate,
        dependencyLineTemplate: q.dependencyLineTemplate,
        styleDefinitionTemplate: q.styleDefinitionTemplate,
      };
      f.timelineStart = wa(f.timelineStart, f.weekStartDay);
      f.timelineFinish = fb(f.timelineFinish, f.weekStartDay);
      e = calculateBarX(f.timelineFinish, f);
      f.chartWidth = e + 'px';
      var t = k + e + 2 + (d ? 1 : 0);
      for (k = 0; k < q.scales.length; k++) {
        d =
          q.scales[k];
        f.scales.push({
          scaleType: d.scaleType,
          isHeaderVisible: d.isHeaderVisible,
          headerHeight: d.headerHeight,
          headerTextFormat: d.headerTextFormat,
          headerClass: d.headerClass,
          headerStyle: d.headerStyle,
          isHighlightingVisible: d.isHighlightingVisible,
          highlightingClass: d.highlightingClass,
          highlightingStyle: d.highlightingStyle,
          isSeparatorVisible: d.isSeparatorVisible,
          separatorClass: d.separatorClass,
          separatorStyle: d.separatorStyle,
        });
      }
      var w, x, r = false;
      if (l != null && typeof l.createElement !== 'undefined') w = l; else {
        if (l !=
          null && typeof l.focus !== 'undefined') x = l; else {
          x = window.open('', l != null ? l : '_blank', typeof s !== 'undefined' && s && (typeof v === 'undefined' || v) ? 'width=320,height=100,location=no,menubar=no,toolbar=no,status=no,scrollbars=yes' : '');
          r = true;
        }
        w = x.document;
        try {
          var A = document.head.getElementsByTagName('link');
          for (k = 0; k < A.length; k++) {
            var y = A[k], z = w.adoptNode(y.cloneNode(true));
            z.href = y.href;
            w.head.appendChild(z);
          }
        } catch (B) {
        }
      }
      w.title = typeof a !== 'undefined' ? a : 'Exported chart' + (typeof s !== 'undefined' && s ? ' (printable)' :
        '');
      typeof h === 'undefined' && (h = 0);
      typeof n === 'undefined' && (n = j.length - 1);
      a = [];
      for (k = A = 0; k < j.length; k++) {
        l = j[k];
        if (!(typeof l.displayRowIndex !== 'undefined' && (l.displayRowIndex < h || l.displayRowIndex > n) || typeof l.displayRowIndex === 'undefined' && (A++ < h || A > n + 1))) {
          q = {
            content: l.content,
            indentation: l.indentation,
            start: l.start,
            finish: l.finish,
            completedFinish: l.completedFinish,
            isMilestone: l.isMilestone,
            schedule: D(l),
            assignmentsContent: l.assignmentsContent,
            baselineStart: l.baselineStart,
            baselineFinish: l.baselineFinish,
            isBarVisible: l.isBarVisible,
            isRelativeToTimezone: l.isRelativeToTimezone,
            'class': l['class'],
            style: l.style,
            barClass: l.barClass,
            standardBarClass: l.standardBarClass,
            completedStandardBarClass: l.completedStandardBarClass,
            summaryBarClass: l.summaryBarClass,
            milestoneBarClass: l.milestoneBarClass,
            baselineBarClass: l.baselineBarClass,
            barStyle: l.barStyle,
            standardBarStyle: l.standardBarStyle,
            completedStandardBarStyle: l.completedStandardBarStyle,
            summaryBarStyle: l.summaryBarStyle,
            milestoneBarStyle: l.milestoneBarStyle,
            baselineBarStyle: l.baselineBarStyle,
            isSummaryEnabled: l.isSummaryEnabled,
            isParentSummarizationEnabled: l.isParentSummarizationEnabled,
            isHidden: l.isHidden,
            isExported: true,
            tag: l,
          };
          if (typeof l.displayRowIndex !== 'undefined') q.displayRowIndex = l.displayRowIndex - h;
          Oc(q, l);
          a.push(q);
          l.exportItem = q;
        }
      }
      for (k = 0; k < j.length; k++) {
        l = j[k];
        if (!(typeof l.displayRowIndex !== 'undefined' && (l.displayRowIndex < h || l.displayRowIndex > n))) {
          q = l.exportItem;
          if (typeof l.predecessors !== 'undefined') {
            q.predecessors = [];
            for (A = 0; A < l.predecessors.length; A++) {
              y =
                l.predecessors[A];
              typeof y.item.displayRowIndex !== 'undefined' && (y.item.displayRowIndex < h || y.item.displayRowIndex > n) || q.predecessors.push({
                item: y.item.exportItem,
                dependencyType: y.dependencyType,
                lag: y.lag,
                dependencyLineClass: y.dependencyLineClass,
                dependencyLineStyle: y.dependencyLineStyle,
              });
            }
          }
        }
      }
      var E = w.createElement('p');
      E.innerHTML = typeof c !== 'undefined' ? c : '';
      w.body.appendChild(E);
      var F = w.createElement('div');
      F.setAttribute('style', 'width: ' + t + 'px');
      try {
        GanttChartView.initialize(F, a, f, 'init warning');
      } catch (G) {
      }
      setTimeout(function() {
        r && w.body.setAttribute('style', 'margin: 0px');
        var a = w.createElement('div');
        a.appendChild(F);
        w.body.replaceChild(a, E);
        if (u) {
          a.setAttribute('style', 'width: ' + F.offsetHeight + 'px; height: ' + t + 'px; overflow: hidden');
          a = Math.round((F.offsetWidth - F.offsetHeight) / 2);
          F.setAttribute('style', 'width: ' + t + 'px; transform: rotate(90deg) translateX(' +
            a + 'px) translateY(' + a + 'px); -webkit-transform: rotate(90deg) translateX(' + a + 'px) translateY(' + a + 'px)');
        }
        w.close();
        if (typeof x !== void 0) {
          x.focus();
          if (typeof s !== 'undefined' && s) {
            x.print();
            (typeof v === 'undefined' || v) && x.close();
          }
        }
      }, 0);
    }, hc = function(a) {
      var c = la;
      if (typeof a === 'undefined') return c;
      for (var d = 0; d < a.length; d++) {
        var b = a[d];
        if ((!b.hasChildren || !(typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled)) && b.start < c) c = b.start;
      }
      return new Date(c.valueOf());
    }, tb = function(a) {
      var c = ba;
      if (typeof a ===
        'undefined') return c;
      for (var d = 0; d < a.length; d++) {
        var b = a[d];
        if (!b.hasChildren || !(typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled)) if (typeof b.isMilestone === 'undefined' || !b.isMilestone) {
          if (b.finish > c) c = b.finish;
        } else if (b.start > c) c = b.start;
      }
      return new Date(c.valueOf());
    }, ic = function(a, c) {
      for (var d = 0, b = 0; b < a.length; b++) {
        var f = a[b];
        f.parent == null && (d = d + da(f, c));
      }
      return d;
    }, jc = function(a, c) {
      for (var d = 0, b = 0; b < a.length; b++) {
        var f = a[b];
        f.parent == null && (d = d + ya(f, c));
      }
      return d;
    }, kc = function(a, c) {
      for (var d =
        [], b = 0; b < c.length; b++) {
        var f = c[b];
        if (!(f == a || typeof f.predecessors === 'undefined' || f.predecessors.length == 0)) for (var e = 0; e < f.predecessors.length; e++) if (f.predecessors[e].item == a) {
          d.push(f);
          break;
        }
      }
      return d;
    }, bb = function(a, c) {
      for (var d = [], b = kc(a, c), f = 0; f < b.length; f++) {
        var e = b[f];
        if (!(typeof e.predecessors === 'undefined' || e.predecessors.length == 0)) for (var g = 0; g < e.predecessors.length; g++) e.predecessors[g].item == a && d.push({
          successor: e,
          predecessor: e.predecessors[g],
        });
      }
      return d;
    }, cb = function(a, c, d, b, f) {
      typeof c ===
      'undefined' && (c = 0);
      f = f ? f : tb(d);
      if (a.finish >= f) return true;
      var e;
      if (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
        var g = a.successorPredecessors ? a.successorPredecessors : bb(a, d);
        for (e = 0; e < g.length; e++) {
          var m = g[e].successor, h = g[e].predecessor;
          if (((typeof h.dependencyType === 'undefined' || h.dependencyType == '' || h.dependencyType == 'FinishStart' || h.dependencyType == 'FS') && N(a.finish, m.start, b, D(a)) <= (h.lag ? h.lag : 0) + c || (h.dependencyType == 'StartStart' || h.dependencyType == 'SS') &&
            N(a.start, m.start, b, D(a)) <= (h.lag ? h.lag : 0) + c) && cb(m, c, d, b, f)) return true;
        }
      } else {
        a = a.children;
        for (e = 0; e < a.length; e++) if (cb(a[e], c, d, b, f)) return true;
      }
      return false;
    }, Pc = function(a, c, d, b) {
      if (typeof c !== 'undefined') {
        c = a.getNetworkDiagramItems(b);
        a = a.ownerDocument.createElement('div');
        if (Pert) {
          Pert.NetworkDiagramView.initialize(a, c);
        }
        return a.getCriticalItems().map(function(a) {
          return a.tag;
        });
      }
    }, ub = function(a, c, d) {
      for (var b = 0; b < a.length; b++) {
        var f = a[b];
        (!f.hasChildren || !(typeof f.isSummaryEnabled ===
          'undefined' || f.isSummaryEnabled)) && (typeof f.predecessors !== 'undefined' && f.predecessors != null && f.predecessors.length > 0) && Ia(f, a, c, d);
      }
    }, lc = function(a, c, d, b) {
      var c = new Date(c.valueOf() - c.getTimezoneOffset() * 6E4), c = sa(c, b, D(a)), d = da(a, b), f = ya(a, b);
      vb(a, c);
      Ta(a, d, b);
      Ua(a, f, b);
      Z(a);
    }, mc = function(a, c) {
      for (var d = 0, b = ga(a), f = 0; f < b.length; f++) {
        var e = b[f], g = e.key, m;
        typeof c.specificResourceUsageCosts !== 'undefined' && (m = indexOfKey(c.specificResourceUsageCosts, g)) >= 0 ? d = d + c.specificResourceUsageCosts[m].value * e.value :
          typeof c.defaultResourceUsageCost !== 'undefined' && (d = d + c.defaultResourceUsageCost * e.value);
        if (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
          var h = da(a, c) / 36E5;
          typeof c.specificResourceHourCosts !== 'undefined' && (m = indexOfKey(c.specificResourceHourCosts, g)) >= 0 ? d = d + c.specificResourceHourCosts[m].value * h * e.value : typeof c.defaultResourceHourCost !== 'undefined' && (d = d + c.defaultResourceHourCost * h * e.value);
        }
      }
      return d;
    }, xb = function(a, c) {
      var d = typeof c.taskInitiationCost !== 'undefined' ?
        c.taskInitiationCost : 0, d = d + mc(a, c);
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) for (var b = 0; b < a.children.length; b++) d = d + wb(a.children[b], c);
      return d;
    }, wb = function(a, c) {
      return (typeof a.executionCost !== 'undefined' ? a.executionCost : 0) + xb(a, c);
    }, nc = function(a, c, d, b, f, e, g) {
      if (typeof d !== 'undefined') {
        typeof a === 'undefined' && (a = false);
        typeof c === 'undefined' && (c = new Date);
        typeof e === 'undefined' && (e = false);
        typeof g === 'undefined' && (g = false);
        ub(d, b, f);
        var f = [], m = [], h, n, l, s = [];
        for (n = 0; n < d.length; n++) {
          h = d[n];
          if (!h.hasChildren || !(typeof h.isSummaryEnabled === 'undefined' || h.isSummaryEnabled)) {
            if (g) {
              l = false;
              for (var u = h; u != null;) {
                if (typeof u.predecessors !== 'undefined' && u.predecessors.length > 0) {
                  l = true;
                  break;
                }
                u = u.parent;
              }
              if (!l) continue;
            }
            f.push({ key: h, value: Qc(h) });
            var u = !e ? ga(h) : [], v = [];
            for (l = 0; l < u.length; l++) {
              var j = u[l];
              j.value > 0 && v.push(j);
            }
            m.push({ key: h, value: v });
            s.push(h);
          }
        }
        d = [];
        for (e = f.length; e > 0;) {
          g = [];
          for (n = 0; n < f.length; n++) {
            h = f[n].key;
            l = true;
            u = f[n].value;
            for (v = 0; v < u.length; v++) {
              j =
                u[v];
              if (indexOfKey(f, j) >= 0 && g.indexOf(j) < 0) {
                l = false;
                break;
              }
            }
            if (l) {
              v = h;
              l = c;
              u = b;
              if (typeof v.minStart !== 'undefined' && l < v.minStart) l = v.minStart;
              if (a || !Fa(v)) for (; v != null;) {
                if (typeof v.predecessors !== 'undefined') for (j = 0; j < v.predecessors.length; j++) {
                  var q = v.predecessors[j];
                  if (typeof q !== 'undefined') {
                    var k = q.dependencyType;
                    typeof k === 'undefined' && (k = 'FinishStart');
                    switch (k) {
                      case '':
                      case 'FinishStart':
                      case 'FS':
                        q = R(q.item.finish, typeof q.lag === 'undefined' ? 0 : q.lag, u, D(q.item));
                        q > l && (l = q);
                        break;
                      case 'StartStart':
                      case 'SS':
                        q =
                          R(q.item.start, typeof q.lag === 'undefined' ? 0 : q.lag, u, D(q.item));
                        q > l && (l = q);
                    }
                  }
                }
                for (v = v.parent; v != null && typeof v.isSummaryEnabled !== "undefined" && !v.isSummaryEnabled;) v = v.parent;
              }
              u = l;
              l = indexOfKey(m, h);
              var v = m[l].value, o;
              for (l = 0; l < v.length; l++) {
                o = v[l].key;
                j = v[l].value;
                k = indexOfKey(d, o);
                if (k >= 0) {
                  q = 1;
                  if (typeof b.resourceQuantities !== 'undefined') {
                    var p = indexOfKey(b.resourceQuantities, o);
                    if (p >= 0) q = b.resourceQuantities[p].value;
                  }
                  let previousAllocations = d[k].value;
                  for (k = 0; k < previousAllocations.length; k++) {
                    o = previousAllocations[k].key;
                    if (!(o + j <= q)) {
                      p = previousAllocations[k].value;
                      p > u && (u = p);
                    }
                  }
                }
              }
              if ((a || !Fa(h)) && (u = sa(u, b, D(h))) != h.start) {
                l = da(h, b);
                j = ya(h, b);
                vb(h, u);
                Ta(h, l, b);
                Ua(h, j, b);
              }
              q = h.finish;
              for (l = 0; l < v.length; l++) {
                o = v[l].key;
                j = v[l].value;
                k = indexOfKey(d, o);
                if (k < 0) {
                  p = [];
                  d.push({ key: o, value: p });
                } else p = d[k].value;
                for (var w = [{ key: j, value: q }], t, x, r, k = 0; k < p.length; k++) {
                  o = p[k].key;
                  var A = p[k].value;
                  if (A > u) {
                    x = o + j;
                    r = A < q ? A : q;
                    t = indexOfKey(w, x);
                    if (t < 0) w.push({ key: x, value: r }); else if (r > w[x]) w[t].value = r;
                    A < q ? w.push({ key: o + j, value: A }) : w.push({
                      key: o +
                        j, value: q,
                    });
                  }
                }
                for (j = 0; j < w.length; j++) {
                  x = w[j].key;
                  r = w[j].value;
                  t = indexOfKey(p, x);
                  if (t < 0) p.push({ key: x, value: r }); else if (r > p[t].value) p[t].value = r;
                }
              }
              g.push(h);
            }
          }
          for (n = 0; n < g.length; n++) f.splice(f.indexOf(g[n]), 1);
          if (f.length == e) break;
          e = f.length;
        }
        for (n = 0; n < s.length; n++) {
          h = s[n];
          y(h, 'start', true, true);
          y(h, 'finish', true, true);
          y(h, 'completedFinish', true, true);
          Z(h);
        }
      }
    }, Qc = function(a) {
      for (var c = [], a = pb(a), d = 0; d < a.length; d++) oc(a[d], c);
      return c;
    }, oc = function(a, c) {
      if (!a.hasChildren || !(typeof a.isSummaryEnabled === 'undefined' ||
        a.isSummaryEnabled)) c.indexOf(a) < 0 && c.push(a); else for (var d = 0; d < a.children.length; d++) oc(a.children[d], c);
    }, Fa = function(a) {
      return !a.isMilestone && a.completedFinish > a.start;
    }, da = function(a, c) {
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
        for (var d = 0, b = a.children, f = 0; f < b.length; f++) d = d + da(b[f], c);
        return d;
      }
      return N(a.start, a.finish, c, D(a));
    }, ya = function(a, c) {
      if (a.hasChildren && (typeof a.isSummaryEnabled === 'undefined' || a.isSummaryEnabled)) {
        for (var d = 0, b = a.children, f = 0; f <
        b.length; f++) d = d + ya(b[f], c);
        return d;
      }
      return N(a.start, a.completedFinish, c, D(a));
    }, Ta = function(a, c, d) {
      c = R(a.start, c, d, D(a));
      a.finish = c;
      y(a, 'finish', false, false);
      pc(a, false);
    }, Ua = function(a, c, d) {
      a.completedFinish = R(a.start, c, d, D(a));
      y(a, 'completedFinish', false, false);
    }, vb = function(a, c) {
      a.start = c;
      a.preferredStart = c;
      y(a, 'start', false, false);
      pc(a, false);
    }, pc = function(a, c) {
      for (var d = a.parent; d != null;) {
        Va(d, c);
        a = d;
        d = a.parent;
      }
    }, qc = function(a, c, d) {
      typeof d === 'undefined' && (d = false);
      var b = a.parent, f = a.index;
      if (b ==
        null) {
        for (b = 0; f-- > 0;) {
          a = c[f];
          a.indentation == 0 && b++;
        }
        return b + (!d ? 1 : 0);
      }
      return qc(b, c) + '.' + (b.children.indexOf(a) + (!d ? 1 : 0));
    }, ga = function(a) {
      var c;
      a = a.assignmentsContent;
      if (typeof a === 'undefined') c = []; else {
        for (var a = a.split(','), d = [], b = 0; b < a.length; b++) {
          var f = trim(a[b]), e = 1, g = f.indexOf('['), m = f.lastIndexOf(']');
          if (g >= 0 && m >= 0) {
            m = trim(f.substr(g + 1, m - g - 1));
            f = trim(f.substr(0, g));
            g = m.indexOf('%');
            g >= 0 && (m = trim(m.substr(0, g)));
            try {
              c = parseFloat(m);
              e = c / 100;
            } catch (h) {
              e = 1;
            }
          }
          if (!(f.length <= 0)) {
            g = indexOfKey(d, f);
            g < 0 ? d.push({ key: f, value: e }) : d[g].value = d[g].value + e;
          }
        }
        c = d;
      }
      return c;
    }, rc = function(a) {
      for (var c = [], a = ga(a), d = 0; d < a.length; d++) c.push(a[d].key);
      return c;
    }, Ga = function(a, c) {
      if (typeof c === 'undefined') return [];
      for (var d = [], b = 0; b < c.length; b++) {
        var f = c[b];
        if (!f.hasChildren || !(typeof f.isSummaryEnabled === 'undefined' || f.isSummaryEnabled)) for (var e = ga(f), g = 0; g < e.length; g++) {
          var m = e[g];
          if (m.key == a) {
            d.push({ key: f, value: m.value });
            break;
          }
        }
      }
      return d;
    }, Ha = function(a) {
      if (typeof a === 'undefined') return [];
      for (var c = [], d = 0; d <
      a.length; d++) {
        var b = a[d];
        if (!b.hasChildren || !(typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled)) for (var b = rc(b), f = 0; f < b.length; f++) {
          var e = b[f];
          c.indexOf(e) < 0 && c.push(e);
        }
      }
      return c;
    }
  let _getAllocation = function(a, c) {
    for (var d = [], b = Ga(a, c), f = 0; f < b.length; f++) {
      var e = b[f], g = e.key;
      if (!g.hasChildren || !(typeof g.isSummaryEnabled === 'undefined' || g.isSummaryEnabled)) for (g = [{
        start: g.start,
        finish: g.finish,
      }]; g.length > 0;) {
        var m = dequeue(g);
        if (!(m.finish <= m.start)) if (d.length == 0) d.push({ key: m, value: e.value }); else {
          hc(c);
          for (var h = false, n = 0; n < d.length; n++) {
            var l = d[n].key, s = d[n].value;
            if (!(m.start >= l.finish)) if (m.finish <= l.start) {
              for (h = 0; h <= n; h++) if (d[h].key.start >= m.start) {
                d.splice(h, 0, { key: m, value: e.value });
                break;
              }
              h = true;
              break;
            } else if (m.start <= l.start && m.finish >= l.finish) {
              d[n].value = s + e.value;
              m.start < l.start && g.push({ start: m.start, finish: l.start });
              m.finish > l.finish && g.push({ start: l.finish, finish: m.finish });
              h = true;
              break;
            } else if (m.start >= l.start && m.finish <= l.finish) {
              d.splice(n, 1);
              m.start > l.start && d.splice(n++, 0, {
                key: {
                  start: l.start,
                  finish: m.start,
                }, value: s,
              });
              d.splice(n++, 0, { key: m, value: s + e.value });
              m.finish < l.finish && d.splice(n++, 0, { key: { start: m.finish, finish: l.finish }, value: s });
              h = true;
              break;
            } else if (m.start >= l.start && m.finish >= l.finish) {
              d.splice(n, 1);
              m.start > l.start && d.splice(n++, 0, { key: { start: l.start, finish: m.start }, value: s });
              d.splice(n++, 0, { key: { start: m.start, finish: l.finish }, value: s + e.value });
              m.finish > l.finish && g.push({ start: l.finish, finish: m.finish });
              h = true;
              break;
            } else if (m.start <= l.start && m.finish <= l.finish) {
              d.splice(n, 1);
              m.start < l.start && g.push({ start: m.start, finish: l.start });
              d.splice(n++, 0, { key: { start: l.start, finish: m.finish }, value: s + e.value });
              m.finish < l.finish && d.splice(n++, 0, { key: { start: m.finish, finish: l.finish }, value: s });
              h = true;
              break;
            }
          }
          h || d.push({ key: m, value: e.value });
        }
      }
    }
    return d;
  }
  let yb = function(a, c, d) {
    for (var b = 0; b < a.length; b++) {
      var f = a[b];
      if (f.key == c) {
        f = f.value;
        if (f.indexOf(d) >= 0) return true;
        for (var e = 0; e < f.length; e++) if (yb(a, f[e], d)) return true;
      }
    }
  };
  let getContent = function(a) {
    return a.content;
  };
  let getContentPath = function(a) {
    var c =
      getContent(a);
    return a.parent == null ? c : c + ' (' + getContentPath(a.parent) + ')';
  };
  let isParent = function(a, c) {
    return a == c ? true : a.parent == null ? false : isParent(a.parent, c);
  };
  let copyCommonSettings = function(a, c) {
    if (typeof a !== 'undefined') {
      a.target = c.target;
      a.theme = c.theme;
      a.border = c.border;
      a.containerClass = c.containerClass;
      a.containerStyle = c.containerStyle;
      a.isGridVisible = c.isGridVisible;
      a.gridWidth = c.gridWidth;
      a.chartWidth = c.chartWidth;
      a.isSplitterEnabled = c.isSplitterEnabled;
      a.splitterWidth = c.splitterWidth;
      a.splitterBackground =
        c.splitterBackground;
      a.minGridWidth = c.minGridWidth;
      a.minChartWidth = c.minChartWidth;
      a.headerBackground = c.headerBackground;
      a.headerHeight = c.headerHeight;
      a.indentationLevelWidth = c.indentationLevelWidth;
      a.gridLines = c.gridLines;
      a.horizontalGridLines = c.horizontalGridLines;
      a.verticalGridLines = c.verticalGridLines;
      a.horizontalChartLines = c.horizontalChartLines;
      a.displayedTime = c.displayedTime;
      a.currentTime = c.currentTime;
      a.timelineStart = c.timelineStart;
      a.timelineFinish = c.timelineFinish;
      a.scales = c.scales;
      a.updateScale =
        c.updateScale;
      a.hourWidth = c.hourWidth;
      a.workingWeekStart = c.workingWeekStart;
      a.workingWeekFinish = c.workingWeekFinish;
      a.visibleDayStart = c.visibleDayStart;
      a.visibleDayFinish = c.visibleDayFinish;
      a.visibleWeekStart = c.visibleWeekStart;
      a.visibleWeekFinish = c.visibleWeekFinish;
      a.specialNonworkingDays = c.specialNonworkingDays;
      a.months = c.months;
      a.daysOfWeek = c.daysOfWeek;
      a.weekStartDay = c.weekStartDay;
      a.dateFormatter = c.dateFormatter;
      a.dateTimeFormatter = c.dateTimeFormatter;
      a.dateTimeParser = c.dateTimeParser;
      a.isRelativeToTimezone =
        c.isRelativeToTimezone;
    }
  };
  let trim = function(a) {
    return a.replace(/^\s*/, '').replace(/\s*$/, '');
  };
  let indexOfKey = function(a, c) {
    for (var d = 0; d < a.length; d++) if (a[d].key == c) return d;
    return -1;
  };
  let dequeue = function(a) {
    var c = a[0];
    a.splice(0, 1);
    return c;
  };
  let convertToLocalTimezone = function(a) {
    return typeof a !== 'undefined' ? new Date(a.valueOf() + a.getTimezoneOffset() * 6E4) : a;
  };
  let convertToUTC = function(a) {
    return typeof a !== 'undefined' ? new Date(a.valueOf() - a.getTimezoneOffset() * 6E4) : a;
  };
  let initializeInterface = function(ChartView, c, d) {
    var b;
    for (b =
           0; b < c.length; b++) c[b].ganttChartView = ChartView;
    for (b = 0; b < c.length; b++) {
      var f = c[b];
      if (typeof f.parts !== 'undefined') {
        if (typeof f.isGroup === 'undefined') {
          f.isGroup = true;
          f.isSummaryEnabled = false;
        }
        ganttChartViewInitItems(f.parts, d);
        if (f.isGroup || typeof f.isBarVisible === 'undefined') f.isBarVisible = false;
        for (var e = 0; e < f.parts.length; e++) {
          var g = f.parts[e];
          g.ganttChartView = f.ganttChartView;
          g.ganttChartItem = f;
          g.isPart = true;
          g.isVirtuallyVisible = true;
          if (f.isGroup || typeof g.indentation === 'undefined') g.indentation = 0;
          if (f.isGroup || typeof g.displayRowIndex ===
            'undefined') g.displayRowIndex = -1;
          g.isInternallyHidden = true;
          c.indexOf(g) >= 0 || c.splice(c.length, 0, g);
        }
      }
    }
    ChartView.items = c;
    ChartView.settings = d;
    ChartView.refresh = function() {
      ganttChartViewRefresh(ChartView);
    };
    ChartView.refreshItems = function() {
      Na(c);
    };
    ChartView.refreshGridItems = function() {
      for (var a = 0; a < c.length; a++) La(c[a]);
    };
    ChartView.refreshChartItems = function() {
      for (var a = 0; a < c.length; a++) oa(c[a]);
    };
    ChartView.refreshGridItem = La;
    ChartView.refreshChartItem = oa;
    ChartView.refreshItem = na;
    ChartView.refreshPredecessorItems = ra;
    ChartView.refreshItemGraph = Ma;
    ChartView.refreshItemPath = Z;
    ChartView.refreshItemNeighbourhood = function(b) {
      Oa(b, c, ChartView, d);
    };
    ChartView.refreshCurrentTimeLine = function() {
      var b = ChartView.chartHeader, e = ChartView.chartContent, f = e.chartArea, l, g = [];
      for (l = f.childNodes.length; l-- > 1;) {
        var j = f.childNodes[l];
        j.tag != 'Scale-Highlighting-CurrentTime' && j.tag != 'Scale-Separator-CurrentTime' && g.push(j);
        f.removeChild(j);
      }
      eb(b, f, d.scales, d, true);
      for (l = g.length; l-- > 0;) f.appendChild(g[l]);
      ta(e, ua(c, d));
    };
    ChartView.setCurrentTime = function(b) {
      d.currentTime = b;
      ChartView.refreshCurrentTimeLine();
    };
    ChartView.updateCurrentTime = function() {
      var b = new Date, b = new Date(b.valueOf() - b.getTimezoneOffset() *
        6E4);
      ChartView.setCurrentTime(b);
    };
    ChartView.getCurrentItem = function() {
      return ChartView.currentItem;
    };
    ChartView.getSelectedItem = function() {
      return ChartView.selectedItem;
    };
    ChartView.getSelectedItems = function() {
      return ChartView.selectedItems;
    };
    ChartView.selectItem = function(a) {
      w(a, true, d.selectionMode);
    };
    ChartView.unselectItem = function(a) {
      w(a, false, d.selectionMode);
    };
    ChartView.expandItem = function(a) {
      ha(a, true, true);
    };
    ChartView.collapseItem = function(a) {
      ha(a, false, true);
    };
    ChartView.scrollToItem = ec;
    ChartView.scrollToBottom = function() {
      ChartView.chartContentContainer.scrollTop = ChartView.chartContent.clientHeight;
    };
    ChartView.scrollToDateTime =
      function(b) {
        ChartView.isDuringScrollToDateTime = true;
        ChartView.chartContentContainer.scrollLeft = calculateBarX(b, ChartView.settings);
      };
    ChartView.increaseTimelinePage = function(b) {
      d.timelineStart = new Date(d.timelineStart.valueOf() + b);
      d.timelineFinish = new Date(d.timelineFinish.valueOf() + b);
      ganttChartViewRefresh(ChartView);
    };
    ChartView.decreaseTimelinePage = function(b) {
      d.timelineStart = new Date(d.timelineStart.valueOf() - b);
      d.timelineFinish = new Date(d.timelineFinish.valueOf() - b);
      ganttChartViewRefresh(ChartView);
    };
    ChartView.setSplitterPosition = function(b) {
      var c = ChartView.gridContainer, e = ChartView.chartContainer, f = ChartView.splitter, b = Math.floor(b *
        1E6 / ChartView.offsetWidth) / 1E4;
      typeof c.percent !== 'undefined' && delete c.percent;
      c.style.width = b + '%';
      e.style.width = 100 - b + '%';
      Ba(f, c, d);
    };
    ChartView.getChartPosition = function(a) {
      return calculateBarX(a, d);
    };
    ChartView.getChartWidth = function() {
      return calculateBarX(d.timelineFinish, d);
    };
    ChartView.getDateTime = function(a) {
      return Ca(a, d);
    };
    ChartView.getWorkingTime = function(a) {
      return ac(a, d);
    };
    ChartView.getStartWorkingTime = function(a) {
      return sa(a, d);
    };
    ChartView.getFinishWorkingTime = function(a) {
      return Q(a, d, false, true, void 0);
    };
    ChartView.getEffort = function(a, b) {
      return N(a, b, d);
    };
    ChartView.getFinish = function(a,
                           b) {
      return R(a, b, d);
    };
    ChartView.getStart = function(a, b) {
      return Qa(a, b, d);
    };
    ChartView.getCompletion = function(a, b, c) {
      return Za(a, b, c, d);
    };
    ChartView.getCompletedFinish = function(a, b, c) {
      return bc(a, b, c, d);
    };
    ChartView.getItemsHeight = function() {
      return ua(c, d);
    };
    ChartView.getItemTop = function(a) {
      return za(a, c, d);
    };
    ChartView.onItemPropertyChanged = y;
    ChartView.initializeTaskDraggingThumbs = function(b, c, d, e, f, g, j, k) {
      setupDraggingEvents(b, c, d, e, f, g, j, k, ChartView.items, ChartView, ChartView.settings);
    };
    ChartView.initializeDependencyDraggingThumbs = function(b, c, d, e, f, g, j) {
      Ya(b, c, d, e, f, g, j, ChartView.items, ChartView, ChartView.settings);
    };
    ChartView.insertItem = function(b,
                            e) {
      Wb(b, e, ChartView, c, d);
    };
    ChartView.addItem = function(b) {
      ChartView.insertItem(c.length, b);
    };
    ChartView.insertItems = function(b, c) {
      for (var d = 0; d < c.length; d++) ChartView.insertItem(b++, c[d]);
    };
    ChartView.addItems = function(b) {
      for (var c = 0; c < b.length; c++) ChartView.addItem(b[c]);
    };
    ChartView.removeItem = function(b) {
      Xb(b, ChartView, c, d);
    };
    ChartView.removeItems = function(b) {
      for (var c = 0; c < b.length; c++) ChartView.removeItem(b[c]);
    };
    ChartView.increaseItemIndentation = function(b) {
      var e = b.index > 0 ? ChartView.items[b.index - 1] : null;
      if (!(e == null || b.indentation > e.indentation)) {
        ha(b, true, false, true);
        b.indentation++;
        y(b, 'indentation',
          true, true);
        if (b.predecessors && b.predecessors.length > 0) {
          for (var f = false, l = 0; l < b.predecessors.length; l++) if (b.predecessors[l].item == e && b.indentation > e.indentation) {
            b.predecessors.splice(l--, 1);
            f = true;
          }
          f && y(b, 'predecessors', false, true);
        }
        for (f = 0; f < c.length; f++) {
          l = c[f];
          if (!(l != e || typeof l.predecessors === 'undefined' || l.predecessors.length == 0)) for (var g = 0; g < l.predecessors.length; g++) if (l.predecessors[g].item == b && e.indentation > l.predecessors[g].item.indentation) {
            l.predecessors.splice(g--, 1);
            y(l, 'predecessors',
              false, true);
            na(l);
            ra(l);
          }
        }
        Xa(c, d) && Na(c);
        for (Oa(b, c, ChartView, d); b != null;) {
          b.isExpanded || ha(b, true, false);
          b = b.parent;
        }
      }
    };
    ChartView.decreaseItemIndentation = function(b) {
      var e = b.index < ChartView.items.length - 1 ? ChartView.items[b.index + 1] : null;
      if (!(b.indentation <= 0 || e != null && b.indentation < e.indentation)) {
        b.indentation--;
        y(b, 'indentation', true, true);
        if (e && b.predecessors && b.predecessors.length > 0) {
          for (var f = false, l = 0; l < b.predecessors.length; l++) if (b.predecessors[l].item == e && b.indentation == e.indentation) {
            b.predecessors.splice(l--, 1);
            f = true;
          }
          f &&
          y(b, 'predecessors', false, true);
        }
        for (f = 0; f < c.length; f++) {
          l = c[f];
          if (!(l != e || typeof l.predecessors === 'undefined' || l.predecessors.length == 0)) for (var g = 0; g < l.predecessors.length; g++) if (l.predecessors[g].item == b && e.indentation == l.predecessors[g].item.indentation) {
            l.predecessors.splice(g--, 1);
            y(l, 'predecessors', false, true);
            na(l);
            ra(l);
          }
        }
        Xa(c, d) && Na(c);
        for (Oa(b, c, ChartView, d); b != null;) {
          b.isExpanded || ha(b, true, false);
          b = b.parent;
        }
      }
    };
    ChartView.setItemContent = function(a, b) {
      a.content = b;
      y(a, 'content', true, true);
    };
    ChartView.setItemStart = function(a,
                              b) {
      a.start = sa(b, d, D(a));
      a.preferredStart = a.start;
      y(a, 'start', true, true);
      if (a.completedFinish < a.start) {
        a.completedFinish = a.start;
        y(a, 'completedFinish', false, true);
      }
    };
    ChartView.setItemFinish = function(a, b) {
      var c;
      c = D(a);
      c = Q(b, d, false, true, c);
      a.finish = c;
      y(a, 'finish', true, true);
      if (a.completedFinish > a.finish) {
        a.completedFinish = a.finish;
        y(a, 'completedFinish', false, true);
      }
    };
    ChartView.setItemIsMilestone = function(a, b) {
      a.isMilestone = b;
      y(a, 'isMilestone', true, true);
    };
    ChartView.getItemEffort = function(a) {
      return da(a, d);
    };
    ChartView.setItemEffort = function(a,
                               b) {
      a.finish = R(a.start, b, d, D(a));
      y(a, 'finish', true, true);
      if (a.completedFinish > a.finish) {
        a.completedFinish = a.finish;
        y(a, 'completedFinish', false, true);
      }
    };
    ChartView.getItemTotalEffort = function(a) {
      return qb(a);
    };
    ChartView.setItemTotalEffort = function(a, b) {
      a.ganttChartView.setItemEffort(a, b / Ra(a));
    };
    ChartView.setItemHasFixedEffort = function(a, b) {
      a.hasFixedEffort = b;
      if (!a.hasChildren && a.hasFixedEffort) {
        a.fixedEffort = da(a, d);
        a.fixedEffortAssignments = ga(a);
      }
    };
    ChartView.getItemDuration = function(a) {
      return N(a.start, a.finish, d, D(a));
    };
    ChartView.setItemDuration =
      ChartView.setItemEffort;
    ChartView.getItemCompletedEffort = function(a) {
      return ya(a, d);
    };
    ChartView.setItemCompletedEffort = function(a, b) {
      a.completedFinish = R(a.start, b, d, D(a));
      if (a.completedFinish > a.finish) a.completedFinish = a.finish;
      y(a, 'completedFinish', true, true);
    };
    ChartView.getItemTotalCompletedEffort = function(a) {
      return rb(a);
    };
    ChartView.setItemTotalCompletedEffort = function(a, b) {
      a.ganttChartView.setItemCompletedEffort(a, b / Ra(a));
    };
    ChartView.getItemCompletion = function(b) {
      return ChartView.getItemCompletedEffort(b) / ChartView.getItemEffort(b);
    };
    ChartView.setItemCompletion = function(b,
                                   c) {
      ChartView.setItemCompletedEffort(b, c * ChartView.getItemEffort(b));
    };
    ChartView.isItemCompleted = function(b) {
      return ChartView.getItemCompletion(b) >= 1 || (b.isMilestone || b.finish.valueOf() <= b.start.valueOf()) && typeof b.isSetAsCompleted !== 'undefined' && b.isSetAsCompleted;
    };
    ChartView.setItemAsCompleted = function(b) {
      if (b.isMilestone || b.finish.valueOf() <= b.start.valueOf()) b.isSetAsCompleted = true;
      ChartView.setItemCompletion(b, 1);
    };
    ChartView.hasItemStarted = function(a) {
      return Fa(a);
    };
    ChartView.setItemAsNotStarted = function(b) {
      if (b.isMilestone || b.finish.valueOf() <= b.start.valueOf()) b.isSetAsCompleted =
        false;
      ChartView.setItemCompletion(b, 0);
    };
    ChartView.isItemOnSchedule = function(a) {
      var b = new Date, b = new Date(b.valueOf() - b.getTimezoneOffset() * 6E4);
      return a.completedFinish >= b;
    };
    ChartView.setItemAssignmentsContent = function(a, b) {
      a.assignmentsContent = b;
      y(a, 'assignmentsContent', true, true);
    };
    ChartView.getItemPredecessorsString = function(a, b) {
      var d = b;
      typeof d === 'undefined' && (d = false);
      var e = '';
      if (!(typeof a.predecessors === 'undefined' || a.predecessors.length == 0)) for (var f = 0; f < a.predecessors.length; f++) {
        var g = a.predecessors[f], j = c.indexOf(g.item);
        if (!(j < 0)) {
          e.length > 0 && (e = e + ', ');
          e = e + (j + (!d ? 1 : 0));
          if (typeof g.dependencyType !== 'undefined' && g.dependencyType != '' && g.dependencyType != 'FinishStart' && g.dependencyType != 'FS') if (g.dependencyType == 'StartStart' || g.dependencyType == 'SS') e = e + 'SS'; else if (g.dependencyType == 'FinishFinish' || g.dependencyType == 'FF') e = e + 'FF'; else if (g.dependencyType == 'StartFinish' || g.dependencyType == 'SF') e = e + 'SF';
          if (typeof g.lag !== 'undefined' && g.lag != 0) {
            g.lag > 0 && (e = e + '+');
            e = e + g.lag / 36E5;
          }
        }
      }
      return e;
    };
    ChartView.setItemPredecessorsString = function(a,
                                           b, d) {
      typeof d === 'undefined' && (d = false);
      var e = [];
      a.predecessors = e;
      for (var b = b.split(','), f = 0; f < b.length; f++) {
        var g = trim(b[f]);
        if (!(g.length <= 0)) {
          for (var j = 0; j < g.length && g.charCodeAt(j) >= 48 && g.charCodeAt(j) <= 57;) j++;
          var k = g.substr(0, j), k = parseInt(k) - (!d ? 1 : 0);
          if (!isNaN(k) && !(k < 0 || k >= c.length)) {
            k = c[k];
            if (!jb(a, k) && !Da(a, k) && !Da(k, a)) {
              var g = g.substr(j), j = g.indexOf('+'), q = g.indexOf('-'), o = j >= 0 ? j : q >= 0 ? q : -1, q = 0;
              if (o >= 0) {
                var p = parseFloat(g.substr(o + 1));
                isNaN(p) || (q = p * (j >= 0 ? 1 : -1) * 36E5);
              }
              g = (o < 0 ? g : g.substr(0,
                o)).toUpperCase();
              e.push({ item: k, dependencyType: g, lag: q });
            }
          }
        }
      }
      for (d = 0; d < c.length; d++) delete c[d].successors;
      y(a, 'predecessors', true, true);
    };
    ChartView.getItemIndexString = function(a, b) {
      typeof b === 'undefined' && (b = false);
      return typeof a.index !== 'undefined' ? (a.index + (!b ? 1 : 0)).toString() : '';
    };
    ChartView.getItemWbsIndexString = function(a, b) {
      return qc(a, c, b).toString();
    };
    ChartView.moveRange = function(b, d, e) {
      ab(b, d, e, ChartView, c);
    };
    ChartView.moveItem = function(b, d) {
      sb(b, d, ChartView, c);
    };
    ChartView.moveItemUp = function(b) {
      var d = c.indexOf(b);
      d <= 0 || sb(b, d - 1, ChartView, c);
    };
    ChartView.moveItemDown =
      function(b) {
        var d = c.indexOf(b);
        d < 0 || d >= c.length - 1 || sb(b, d + 1, ChartView, c);
      };
    ChartView.moveItemHierarchy = function(b, d) {
      for (var e = c.indexOf(b), f = e + 1; f < c.length; f++) if (c[f].indentation <= b.indentation) break;
      ab(e, f - e, d, ChartView, c);
    };
    ChartView.moveItemHierarchyUp = function(b) {
      for (var d = c.indexOf(b), e = d + 1; e < c.length; e++) if (c[e].indentation <= b.indentation) break;
      for (var f = d; f-- > 0;) {
        if (c[f].indentation < b.indentation) return;
        if (c[f].indentation == b.indentation) break;
      }
      ab(d, e - d, f, ChartView, c);
    };
    ChartView.moveItemHierarchyDown = function(b) {
      for (var d = c.indexOf(b), e =
        d + 1; e < c.length; e++) if (c[e].indentation <= b.indentation) break;
      for (var e = e - d, f = d + e; f++ < c.length - 1;) if (c[f].indentation <= b.indentation) break;
      c[f - 1].indentation < b.indentation || ab(d, e, f - e, ChartView, c);
    };
    ChartView.exportContent = function(a, b) {
      typeof a === 'undefined' && (a = {});
      gc(a.title, a.preparingMessage, a.isGridVisible, a.columnIndexes, a.timelineStart, a.timelineFinish, a.isRelativeToTimezone, a.hourWidth, a.startRowIndex, a.endRowIndex, b, false, a.rotate, false, c, d);
    };
    ChartView.print = function(a) {
      typeof a === 'undefined' && (a = {});
      gc(a.title, a.preparingMessage,
        a.isGridVisible, a.columnIndexes, a.timelineStart, a.timelineFinish, a.isRelativeToTimezone, a.hourWidth, a.startRowIndex, a.endRowIndex, null, true, a.rotate, a.autoClose, c, d);
    };
    ChartView.getRootItems = function() {
      for (var a = [], b = 0; b < c.length; b++) {
        var d = c[b];
        d.parent == null && a.push(d);
      }
      return a;
    };
    ChartView.getLeafItems = function() {
      for (var a = [], b = 0; b < c.length; b++) {
        var d = c[b];
        d.parent != null && a.push(d);
      }
      return a;
    };
    ChartView.getSummaryItems = function() {
      for (var a = [], b = 0; b < c.length; b++) {
        var d = c[b];
        d.hasChildren && a.push(d);
      }
      return a;
    };
    ChartView.getProjectStart =
      function() {
        return hc(c);
      };
    ChartView.getProjectFinish = function() {
      return tb(c);
    };
    ChartView.getProjectEffort = function() {
      return ic(c, d);
    };
    ChartView.getProjectTotalEffort = function() {
      for (var a = 0, b = 0; b < c.length; b++) {
        var d = c[b];
        d.parent == null && (a = a + qb(d));
      }
      return a;
    };
    ChartView.getProjectCompletedEffort = function() {
      return jc(c, d);
    };
    ChartView.getProjectTotalCompletedEffort = function() {
      for (var a = 0, b = 0; b < c.length; b++) {
        var d = c[b];
        d.parent == null && (a = a + rb(d));
      }
      return a;
    };
    ChartView.getProjectCompletion = function() {
      return jc(c, d) / ic(c, d);
    };
    ChartView.isItemCritical = function(a, b) {
      return cb(a,
        b, c, d);
    };
    ChartView.getCriticalItems = function(a) {
      typeof a === 'undefined' && (a = 0);
      if (typeof c === 'undefined') a = void 0; else {
        for (var b = tb(c), e = 0; e < c.length; e++) {
          var f = c[e];
          f.successorPredecessors = bb(f, c);
        }
        for (var g = [], e = 0; e < c.length; e++) {
          f = c[e];
          (!f.hasChildren || !(typeof f.isSummaryEnabled === 'undefined' || f.isSummaryEnabled)) && cb(f, a, c, d, b) && g.push(f);
        }
        for (e = 0; e < c.length; e++) {
          f = c[e];
          delete f.successorPredecessors;
        }
        a = g;
      }
      return a;
    };
    ChartView.getPertCriticalItems = function(b) {
      return Pc(ChartView, c, d, b);
    };
    ChartView.ensureDependencyConstraints = function() {
      ub(c,
        d, ChartView);
    };
    ChartView.setupBaseline = function() {
      for (var a = 0; a < c.length; a++) {
        var b = c[a];
        if (!b.hasChildren || !(typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled)) {
          b.baselineStart = b.start;
          b.isMilestone ? delete b.baselineFinish : b.baselineFinish = b.finish;
        } else {
          delete b.baselineFinish;
          delete b.baselineStart;
        }
        na(b);
      }
    };
    ChartView.rescheduleItemToStart = function(a, b) {
      lc(a, b, c, d);
    };
    ChartView.rescheduleItemToFinish = function(a, b) {
      var c = b, c = new Date(c.valueOf() - c.getTimezoneOffset() * 6E4), e = da(a, d), f = ya(a, d),
        c = Qa(e, c, d, D(a)), c = sa(c, d, D(a));
      vb(a, c);
      Ta(a, e, d);
      Ua(a, f, d);
      Z(a);
    };
    ChartView.splitRemainingWork = function(b, e, f) {
      if (typeof c === 'undefined' || b.hasChildren || b.isMilestone || !Fa(b) || !b.isMilestone && b.completedFinish >= b.finish) b = null; else {
        var l = c.indexOf(b);
        if (l < 0) b = null; else {
          e = {
            content: typeof e === 'undefined' ? b.content : b.content + e,
            indentation: b.indentation,
            isExpanded: b.isExpanded,
            start: b.completedFinish,
            finish: b.finish,
            assignmentsContent: b.assignmentsContent,
            isReadOnly: b.isReadOnly,
            isHidden: b.isHidden,
            isBarVisible: b.isBarVisible,
            isBarReadOnly: b.isBarReadOnly,
            isSummaryEnabled: b.isSummaryEnabled,
            isParentSummarizationEnabled: b.isParentSummarizationEnabled,
            displayRowIndex: b.displayRowIndex,
            'class': b['class'],
            style: b.style,
            barClass: b.barClass,
            standardBarClass: b.standardBarClass,
            summaryBarClass: b.summaryBarClass,
            milestoneBarClass: b.milestoneBarClass,
            baselineBarClass: b.baselineBarClass,
            barStyle: b.barStyle,
            standardBarStyle: b.standardBarStyle,
            summaryBarStyle: b.summaryBarStyle,
            milestoneBarStyle: b.milestoneBarStyle,
            baselineBarStyle: b.baselineBarStyle,
            taskTemplate: b.taskTemplate,
            template: b.template,
            tag: b.tag,
          };
          if (typeof f !== 'undefined') b.content = b.content + f;
          b.finish = b.completedFinish;
          Wb(l + 1, e, ChartView, c, d);
          f = bb(b, c);
          for (l = 0; l < f.length; l++) {
            var g = f[l].predecessor;
            if (typeof g.dependencyType === 'undefined' || g.dependencyType == '' || g.dependencyType == 'FinishStart' || g.dependencyType == 'FS' || g.dependencyType == 'FinishFinish' || g.dependencyType == 'FF') g.item = e;
          }
          e.predecessors = [{ item: b }];
          ra(b);
          ra(e);
          b = e;
        }
      }
      return b;
    };
    ChartView.optimizeWork = function(b, e, f, l) {
      var g;
      typeof b === 'undefined' && (b = false);
      typeof e ===
      'undefined' && (e = false);
      typeof f === 'undefined' && (f = new Date);
      if (l) nc(e, f, c, d, ChartView, true, b); else {
        f = new Date(f.valueOf() + f.getTimezoneOffset() * 6E4);
        g = [];
        for (l = 0; l < c.length; l++) {
          var j = c[l];
          if (!j.hasChildren || !(typeof j.isSummaryEnabled === 'undefined' || j.isSummaryEnabled)) if (!(j.start <= f || !e && Fa(j))) {
            if (b) {
              for (var k = false, o = j; o != null;) {
                if (typeof o.predecessors !== 'undefined' && o.predecessors.length > 0) {
                  k = true;
                  break;
                }
                o = o.parent;
              }
              if (!k) continue;
            }
            lc(j, f, c, d);
            g.push(j);
          }
        }
        ub(c, d, ChartView);
        for (l = 0; l < g.length; l++) {
          b = g[l];
          y(b, 'start',
            true, true);
          y(b, 'finish', true, true);
          y(b, 'completedFinish', true, true);
          Z(b);
        }
        g = void 0;
      }
      return g;
    };
    ChartView.levelAllocations = function(b) {
      if (!b) b = ChartView.items;
      b.length || (b = [b]);
      for (var c = 0; c < b.length; c++) {
        var d = b[c], e, f = '', g = ga(d);
        if (g && g.length > 0) {
          var j = 0;
          for (e = 0; e < g.length; e++) j = j + g[e].value;
          if (j > 0) {
            for (e = 0; e < g.length; e++) {
              f.length > 0 && (f = f + ', ');
              f = f + (g[e].key + (g.length > 1 ? ' [' + Math.round(g[e].value / j * 1E4) / 100 + '%]' : ''));
            }
            d.assignmentsContent = f;
            y(d, 'assignmentsContent', false, true);
            Z(d);
          }
        }
      }
    };
    ChartView.levelResources = function(b,
                                e) {
      return nc(b, e, c, d, ChartView);
    };
    ChartView.getItemSuccessors = function(a) {
      return kc(a, c);
    };
    ChartView.getItemSuccessorPredecessorItems = function(a) {
      return bb(a, c);
    };
    ChartView.getItemAllocationUnits = Ra;
    ChartView.getItemAssignments = ga;
    ChartView.getItemAssignedResources = rc;
    ChartView.getResourceAssignments = function(a) {
      return Ga(a, c);
    };
    ChartView.getResourceAssignedItems = function(a) {
      for (var b = [], a = Ga(a, c), d = 0; d < a.length; d++) b.push(a[d].key);
      return b;
    };
    ChartView.getAssignedResources = function() {
      return Ha(c);
    };
    ChartView.getItemAssignmentsCost = function(a) {
      return mc(a, d);
    };
    ChartView.getItemExtraCost = function(a) {
      return xb(a,
        d);
    };
    ChartView.getItemCost = function(a) {
      return wb(a, d);
    };
    ChartView.setItemCost = function(a, b) {
      a.executionCost = b - xb(a, d);
      y(a, 'executionCost', true, true);
    };
    ChartView.getResourceCost = function(a, resource) {
      for (var b = 0, a = Ga(a, c), e = 0; e < a.length; e++) {
        var f = a[e], g;
        typeof d.specificResourceUsageCosts !== 'undefined' && (
          g = indexOfKey(d.specificResourceUsageCosts, resource)) >= 0
          ? b = b + d.specificResourceUsageCosts[g].value * f.value
          : typeof d.defaultResourceUsageCost !== 'undefined' && (b = b + d.defaultResourceUsageCost * f.value);
        var j = f.key;
        if (!j.hasChildren || !(typeof j.isSummaryEnabled ===
          'undefined' || j.isSummaryEnabled)) {
          j = da(j, d) / 36E5;
          typeof d.specificResourceHourCosts !== 'undefined' && (g = indexOfKey(d.specificResourceHourCosts, resource)) >= 0 ? b = b + d.specificResourceHourCosts[g].value * j * f.value : typeof d.defaultResourceHourCost !== 'undefined' && (b = b + d.defaultResourceHourCost * j * f.value);
        }
      }
      return b;
    };
    ChartView.getProjectCost = function() {
      for (var a = 0, b = 0; b < c.length; b++) {
        var e = c[b];
        e.parent == null && (a = a + wb(e, d));
      }
      return a;
    };
    ChartView.getScheduleChartItems = function(a) {
      var b = [], a = typeof a !== 'undefined' ? typeof a === 'array' ?
        a : [a] : typeof d.assignableResources !== 'undefined' ? d.assignableResources : [], e, f = Ha(c), g;
      for (g = 0; g < f.length; g++) {
        e = f[g];
        a.indexOf(e) < 0 && a.push(e);
      }
      for (g = 0; g < a.length; g++) {
        e = a[g];
        f = { tag: e, content: e, ganttChartItems: [] };
        e = Ga(e, c);
        for (var j = 0; j < e.length; j++) {
          var k = e[j], o = k.key, k = {
            tag: o,
            content: o.content,
            start: o.start,
            finish: o.finish,
            completedFinish: o.completedFinish,
            isMilestone: o.isMilestone,
            schedule: D(o),
            assignmentsContent: k.value != 1 ? Math.round(k.value * 1E4) / 100 + '%' : '',
            minStart: o.minStart,
            maxStart: o.maxStart,
            minFinish: o.minFinish,
            maxFinish: o.maxFinish,
            isHidden: o.isHidden,
            isBarVisible: o.isBarVisible,
            isBarReadOnly: o.isBarReadOnly,
            isReadOnly: o.isReadOnly,
            isRelativeToTimezone: o.isRelativeToTimezone,
          };
          f.ganttChartItems.push(k);
        }
        b.push(f);
      }
      return b;
    };
    ChartView.getAllocations = function(a) {
      return _getAllocation(a, c);
    };
    ChartView.getLoadChartItems = function(a) {
      var b = [];
      typeof a === 'undefined' ? a = Ha(c) : typeof a !== 'array' && (a = [a]);
      for (var e = 0; e < a.length; e++) {
        for (var f = a[e], g = { tag: f, content: f, ganttChartItems: [] }, j = _getAllocation(f, c), k = 0; k < j.length; k++) {
          var o = j[k],
            q = 1;
          if (typeof d.resourceQuantities !== 'undefined') {
            var p = indexOfKey(d.resourceQuantities, f);
            if (p >= 0) q = d.resourceQuantities[p].value;
          }
          p = d.maxLoadChartDisplayedResourceQuantity;
          typeof p === 'undefined' && (p = 100);
          q > p && (q = p);
          g.ganttChartItems.push({
            start: o.key.start,
            finish: o.key.finish,
            units: o.value / q,
            content: Math.round(o.value * 1E4) / 100 + '%',
            isRelativeToTimezone: false,
          });
        }
        b.push(g);
      }
      return b;
    };
    ChartView.getFilteredGanttChartItems = function(a) {
      for (var a = [a], b = [], d = 0; d < a.length; d++) {
        var e = a[d], f = [];
        if (typeof a === 'undefined') a =
          Ha(c); else if (typeof a !== 'array') var g = Ga(e, c);
        for (e = 0; e < g.length; e++) {
          var j = g[e].key;
          if ((!j.hasChildren || !(typeof j.isSummaryEnabled === 'undefined' || j.isSummaryEnabled)) && !(b.indexOf(j) >= 0)) {
            f.push({
              tag: j,
              content: j.content,
              start: j.start,
              finish: j.finish,
              completedFinish: j.completedFinish,
              isMilestone: j.isMilestone,
              assignmentsContent: a.length > 1 ? j.assignmentsContent : g[e].value != 1 ? Math.round(g[e].value * 1E4) / 100 + '%' : '',
              minStart: j.minStart,
              maxStart: j.maxStart,
              minFinish: j.minFinish,
              maxFinish: j.maxFinish,
              isHidden: j.isHidden,
              isBarVisible: j.isBarVisible,
              isBarReadOnly: j.isBarReadOnly,
              isReadOnly: true,
              isRelativeToTimezone: j.isRelativeToTimezone,
            });
            b.push(j);
          }
        }
      }
      return f;
    };
    ChartView.copyCommonSettings = function(a) {
      copyCommonSettings(a, d);
    };
    ChartView.getPertChartItems = function(a, b, e, f, g, j) {
      var k = a, o = b, q = e, p = g, e = j;
      if (typeof k === 'undefined' || k < 0) k = Number.MAX_VALUE;
      typeof o === 'undefined' && (o = 'Start');
      typeof q === 'undefined' && (q = 'Finish');
      typeof p === 'undefined' && (p = ' completed');
      typeof e === 'undefined' && (e = ' starting');
      for (var w = new Date((new Date(1E4,
        0, 1)).valueOf() - 1), j = [], t, x, r, A, y, g = [], a = 0; a < c.length; a++) {
        b = c[a];
        b.indentation <= k && (!b.hasChildren || !(typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled || typeof b.isBarVisible !== 'undefined' && !b.isBarVisible) || b.indentation == k) && g.push({
          key: b,
          value: [],
        });
      }
      for (a = 0; a < g.length; a++) {
        var b = g[a].key, z = [b];
        if (b.indentation == k && b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled || typeof b.isBarVisible !== 'undefined' && !b.isBarVisible)) for (t = 0; t < c.length; t++) {
          x = c[t];
          isParent(x,
            b) && z.push(x);
        }
        A = g[a].value;
        for (t = 0; t < z.length; t++) for (var B = z[t]; B != null;) {
          if (typeof B.predecessors !== 'undefined') for (r = 0; r < B.predecessors.length; r++) if (!(typeof B.predecessors[r].item === 'undefined' || typeof B.predecessors[r].dependencyType !== 'undefined' && B.predecessors[r].dependencyType != '' && B.predecessors[r].dependencyType != 'FinishStart' && B.predecessors[r].dependencyType != 'FS')) {
            for (x = y = B.predecessors[r].item; x != null && indexOfKey(g, x) < 0;) x = x.parent;
            if (x != b) {
              var E = [];
              if (x != null) E.push(x); else for (var F =
                0; F < g.length; F++) {
                x = g[F].key;
                isParent(x, y) && E.push(x);
              }
              for (y = 0; y < E.length; y++) {
                x = E[y];
                A.indexOf(x) < 0 && (k < Number.MAX_VALUE && yb(g, x, b) || A.push(x));
              }
            }
          }
          B = B.parent;
        }
      }
      k = 0;
      r = t = null;
      for (a = 0; a < c.length; a++) {
        b = c[a];
        if (t == null || b.start < t) t = b.start;
        if (r == null || b.finish > r) r = b.finish;
      }
      t == null && (t = w);
      o = { content: o, displayedText: (k++).toString(), displayedRowIndex: 0, displayedColumnIndex: 0 };
      j.push(o);
      z = [o];
      w = [];
      for (a = 0; a < g.length; a++) g[a].value.length == 0 && w.push(g[a].key);
      if (w.length > 0) {
        z = [];
        for (a = 0; a < w.length; a++) {
          b = w[a];
          r = o;
          A = (k++).toString();
          if (b.start > t) {
            r = { content: b.content != null ? b.content.toString() + e : null, displayedText: A, predecessors: [] };
            j.push(r);
            r.predecessors.push({ item: o, content: f, isEffortVirtual: true });
          }
          A = { content: b.content + p, displayedText: A + (r != o ? '\'' : ''), predecessors: [], tag: b };
          z.push(A);
          j.push(A);
          A.predecessors.push({
            item: r,
            content: getContentPath(b),
            displayedText: b.content != null ? b.content.toString() : null,
            effort: N(b.start, b.finish, d, D(b)),
            tag: b,
          });
        }
        do {
          B = [];
          for (a = 0; a < z.length; a++) B.push(z[a]);
          b = false;
          for (a =
                 0; a < z.length; a++) {
            w = z[a];
            A = w.tag;
            E = [];
            for (t = 0; t < g.length; t++) g[t].value.indexOf(A) >= 0 && E.push(g[t].key);
            if (E.length > 0) {
              B.splice(B.indexOf(w), 1);
              for (t = 0; t < E.length; t++) {
                b = E[t];
                A = null;
                for (r = 0; r < j.length; r++) if (j[r].tag == b) {
                  A = j[r];
                  break;
                }
                if (A == null) {
                  A = { content: b.content + p, displayedText: (k++).toString(), predecessors: [], tag: b };
                  B.push(A);
                  j.push(A);
                }
                A.predecessors.push({
                  item: w,
                  content: getContentPath(b),
                  displayedText: b.content != null ? b.content.toString() : null,
                  effort: N(b.start, b.finish, d, D(b)),
                  tag: b,
                });
              }
              b = true;
            }
          }
          z =
            B;
        } while (b);
      }
      b = { content: q, displayedText: (k++).toString(), predecessors: [], displayedRowIndex: 0 };
      j.push(b);
      b = b.predecessors;
      for (a = 0; a < z.length; a++) b.push({ item: z[a] });
      for (t = 0; t < g.length; t++) {
        b = g[t].key;
        w = null;
        for (r = 0; r < j.length; r++) if (j[r].tag == b) {
          w = j[r];
          break;
        }
        if (w != null) {
          a = [];
          if (typeof w.predecessors !== 'undefined') for (r = 0; r < w.predecessors.length; r++) w.predecessors[r].tag == b && a.push(w.predecessors[r]);
          if (a.length > 1) {
            p = {
              content: b.content != null ? b.content.toString() + e : null,
              displayedText: w.displayedText,
              predecessors: [],
            };
            j.splice(j.indexOf(w), 0, p);
            k = p.predecessors;
            for (r = 0; r < a.length; r++) {
              q = a[r];
              w.predecessors.splice(w.predecessors.indexOf(q), 1);
              k.push({ item: q.item, content: f, isEffortVirtual: true });
            }
            w.predecessors.push({
              item: p,
              content: getContentPath(b),
              displayedText: b.content != null ? b.content.toString() : null,
              effort: N(b.start, b.finish, d, D(b)),
              tag: b,
            });
            w.displayedText = w.displayedText + '\'';
          } else if (a.length == 1) {
            q = a[0];
            a = q.item.tag;
            if (a != null && b.start > sa(a.finish, d)) {
              r = {
                content: b.content != null ? b.content.toString() + e : null, displayedText: w.displayedText,
                predecessors: [],
              };
              j.splice(j.indexOf(w), 0, r);
              r.predecessors.push({ item: q.item, content: f, isEffortVirtual: true });
              w.predecessors.splice(0, w.predecessors.length);
              w.predecessors.push({
                item: r,
                content: getContentPath(b),
                displayedText: b.content != null ? b.content.toString() : null,
                effort: N(b.start, b.finish, d, D(b)),
                tag: b,
              });
              w.displayedText = w.displayedText + '\'';
            }
          }
        }
      }
      for (a = 0; a < g.length; a++) if (g[a].key.isMilestone) {
        b = g[a].key;
        w = null;
        for (r = 0; r < j.length; r++) if (j[r].tag == b) {
          w = j[r];
          break;
        }
        if (w != null && typeof w.predecessors !==
          'undefined' && w.predecessors.length == 1) {
          q = w.predecessors[0];
          if (q.item != o && q.tag == b) {
            w.predecessors.splice(0, 1);
            A = q.item;
            for (r = 0; r < A.predecessors.length; r++) {
              f = A.predecessors[r];
              q.item.predecessors.splice(q.item.predecessors.indexOf(f), 1);
              w.predecessors.push(f);
            }
            w.content = b.content != null ? b.content.toString() : null;
            w.displayedText = w.displayedText.replace('\'', '');
            j.splice(j.indexOf(A), 1);
          }
        }
      }
      return j;
    };
    ChartView.getNetworkDiagramItems = function(a, b, e) {
      var f = a, g = b, j = e;
      if (typeof f === 'undefined' || f < 0) f = Number.MAX_VALUE;
      typeof g === 'undefined' && (g = 'Start');
      typeof j === 'undefined' && (j = 'Finish');
      var e = new Date(1900, 0, 1), b = new Date((new Date(1E4, 0, 1)).valueOf() - 1), a = [], k, o, q, w, p, t, x, r,
        A = [];
      for (k = 0; k < c.length; k++) {
        o = c[k];
        o.indentation <= f && (!o.hasChildren || !(typeof o.isSummaryEnabled === 'undefined' || o.isSummaryEnabled || typeof o.isBarVisible !== 'undefined' && !o.isBarVisible) || o.indentation == f) && A.push({
          key: o,
          value: [],
        });
      }
      for (k = 0; k < A.length; k++) {
        o = A[k].key;
        t = [o];
        if (o.indentation == f && o.hasChildren && (typeof o.isSummaryEnabled ===
          'undefined' || o.isSummaryEnabled || typeof o.isBarVisible !== 'undefined' && !o.isBarVisible)) for (q = 0; q < c.length; q++) {
          w = c[q];
          isParent(w, o) && t.push(w);
        }
        x = A[k].value;
        for (q = 0; q < t.length; q++) for (var y = t[q]; y != null;) {
          if (typeof y.predecessors !== 'undefined') for (p = 0; p < y.predecessors.length; p++) if (!(typeof y.predecessors[p].item === 'undefined' || typeof y.predecessors[p].dependencyType !== 'undefined' && y.predecessors[p].dependencyType != '' && y.predecessors[p].dependencyType != 'FinishStart' && y.predecessors[p].dependencyType !=
            'FS')) {
            for (w = r = y.predecessors[p].item; w != null && indexOfKey(A, w) < 0;) w = w.parent;
            if (w != o) {
              var z = [];
              if (w != null) z.push(w); else for (var B = 0; B < A.length; B++) {
                w = A[B].key;
                isParent(w, r) && z.push(w);
              }
              for (r = 0; r < z.length; r++) {
                w = z[r];
                x.indexOf(w) < 0 && (f < Number.MAX_VALUE && yb(A, w, o) || x.push(w));
              }
            }
          }
          y = y.parent;
        }
      }
      r = q = null;
      for (k = 0; k < c.length; k++) {
        o = c[k];
        if (q == null || o.start < q) q = o.start;
        if (r == null || o.finish > r) r = o.finish;
      }
      q == null && (q = b);
      r == null && (r = e);
      g = {
        content: g, displayedText: g, earlyStart: q, earlyFinish: q, lateStart: b, lateFinish: b,
        isMilestone: true, effort: 0, displayedRowIndex: 0, displayedColumnIndex: 0,
      };
      a.push(g);
      f = [g];
      q = [];
      for (k = 0; k < A.length; k++) A[k].value.length == 0 && q.push(A[k].key);
      if (q.length > 0) {
        f = [];
        for (k = 0; k < q.length; k++) {
          o = q[k];
          p = {
            content: getContentPath(o),
            displayedText: getContent(o),
            earlyStart: e,
            earlyFinish: e,
            lateStart: b,
            lateFinish: b,
            effort: N(o.start, o.finish, d, D(o)),
            isMilestone: o.isMilestone,
            predecessors: [],
            tag: o,
          };
          f.push(p);
          a.push(p);
          p.earlyStart = sa(g.earlyFinish, d);
          p.earlyFinish = R(p.earlyStart, p.effort, d);
          p.predecessors.push({
            item: g,
            tag: o,
          });
        }
        do {
          y = [];
          for (k = 0; k < f.length; k++) y.push(f[k]);
          p = false;
          for (k = 0; k < f.length; k++) {
            t = f[k];
            o = t.tag;
            z = [];
            for (q = 0; q < A.length; q++) A[q].value.indexOf(o) >= 0 && z.push(A[q].key);
            if (z.length > 0) {
              y.splice(y.indexOf(t), 1);
              for (q = 0; q < z.length; q++) {
                o = z[q];
                x = null;
                for (p = 0; p < a.length; p++) if (a[p].tag == o) {
                  x = a[p];
                  break;
                }
                if (x == null) {
                  x = {
                    content: getContentPath(o),
                    displayedText: getContent(o),
                    earlyStart: e,
                    earlyFinish: e,
                    lateStart: b,
                    lateFinish: b,
                    effort: N(o.start, o.finish, d, D(o)),
                    isMilestone: o.isMilestone,
                    predecessors: [],
                    tag: o,
                  };
                  y.push(x);
                  a.push(x);
                }
                p = sa(t.earlyFinish, d);
                if (p > x.earlyStart) {
                  x.earlyStart = p;
                  x.earlyFinish = R(x.earlyStart, x.effort, d);
                }
                x.predecessors.push({ item: t, tag: o });
              }
              p = true;
            }
          }
          f = y;
        } while (p);
      }
      j = {
        content: j,
        displayedText: j,
        earlyStart: e,
        earlyFinish: e,
        lateStart: r,
        lateFinish: r,
        isMilestone: true,
        effort: 0,
        predecessors: [],
        displayedRowIndex: 0,
      };
      a.push(j);
      q = j.predecessors;
      for (k = 0; k < f.length; k++) {
        A = f[k];
        p = A.earlyFinish;
        if (p > j.earlyStart) {
          j.earlyStart = p;
          j.earlyFinish = j.earlyStart;
        }
        q.push({ item: A });
      }
      for (f = [j]; f.length > 0;) {
        A = [];
        for (k =
               0; k < f.length; k++) {
          t = f[k];
          if (typeof t.predecessors !== 'undefined') for (q = 0; q < t.predecessors.length; q++) {
            r = t.predecessors[q];
            x = r.item;
            A.push(x);
            o = t.lateStart;
            if (o < x.lateFinish) {
              x.lateFinish = x.effort > 0 ? Q(o, d, false, true, void 0) : o;
              x.lateStart = Qa(x.effort, x.lateFinish, d);
            }
          }
        }
        f = A;
      }
      if (a.length > 2) for (k = 0; k < a.length; k++) {
        o = a[k];
        o.slack = N(o.earlyStart, o.lateStart, d);
      } else {
        g.earlyStart = e;
        g.earlyFinish = e;
        g.lateStart = e;
        g.lateFinish = e;
        j.earlyStart = b;
        j.earlyFinish = b;
        j.lateStart = b;
        j.lateFinish = b;
      }
      for (k = 0; k < a.length; k++) a[k].isRelativeToTimezone =
        false;
      return a;
    };
    ChartView.getOutputDate = convertToLocalTimezone;
    ChartView.getInputDate = convertToUTC;
    ChartView.itemDependsOf = function(a, b) {
      return Pa(a, b);
    };
  };
  return {
    initialize: ganttChartViewInit,
    initializeItems: ganttChartViewInitItems,
    refresh: ganttChartViewRefresh,
    getDefaultColumns: o,
    getDefaultCollapsedToggleButtonTemplate: zb,
    getDefaultExpandedToggleButtonTemplate: Ab,
    getDefaultScales: Bb,
    getDefaultStyleDefinitionTemplate: Cb,
    getDefaultStandardTaskTemplate: StandardTaskTemplateFactory,
    getDefaultSummaryTaskTemplate: Eb,
    getDefaultMilestoneTaskTemplate: Fb,
    getDefaultItemTemplate: CreateTitleNode,
    getDefaultAssignmentsTemplate: Hb,
    getDefaultDependencyLineTemplate: Ib,
    getDefaultPredecessorItemTemplate: Jb,
    initializeTaskDraggingThumbs: function(a, c, d, b, f, e, g, m) {
      f.ganttChartView.initializeTaskDraggingThumbs(a, c, d, b, f, e, g, m);
    },
    initializeDependencyDraggingThumb: function(a, c, d, b, f) {
      d.ganttChartView.initializeDependencyDraggingThumb(a, c, d, b, f);
    },
    getWorkingTime: ac,
    getEffort: N,
    getFinish: R,
    getStart: Qa,
    getCompletion: Za,
    getCompletedFinish: bc,
    getWeekStart: function(a, c) {
      return wa(a, c);
    },
    getWeekFinish: fb,
    defaultDateTimeFormatter: function(a) {
      return ja(K(a));
    },
    defaultDateFormatter: function(a) {
      return U(K(a));
    },
    defaultDateTimeParser: function(a) {
      return k(r(a));
    },
    textColumnTemplateBase: function(a, c, d) {
      c = c();
      if (typeof c === 'undefined' || typeof d !== 'undefined' && !d()) c = '';
      return a.createTextNode(c);
    },
    textInputColumnTemplateBase: function(a, c, d, b, f, e, g) {
      var m = a.createElement('input');
      m.setAttribute('type', 'text');
      a = d();
      typeof a === 'undefined' && (a = '');
      m.setAttribute('value', a);
      a = '';
      typeof e !== 'undefined' && !e() && (a = '; display: none');
      e = '';
      typeof g !== 'undefined' && g() && (e =
        '; font-weight: bold');
      m.setAttribute('style', 'background-color: Transparent; width: ' + c + 'px; border-width: 0px; padding: 0px' + a + e);
      typeof f !== 'undefined' && !f() && m.setAttribute('disabled', 'true');
      m.addEventListener('change', function() {
        b(m.value);
      }, true);
      m.addEventListener('keypress', function(a) {
        if (a.keyCode == 13) {
          a.preventDefault();
          a.stopPropagation();
          b(m.value);
        }
      }, true);
      m.addEventListener('focus', function() {
        m.style.backgroundColor = 'White';
      }, true);
      m.addEventListener('blur', function() {
        m.style.backgroundColor =
          'Transparent';
      }, true);
      return m;
    },
    optionSelectColumnTemplateBase: function(a, c, d, b, f, e, g, m) {
      var h = a.createElement('select'), n = function(b, c) {
        var d = a.createElement('option');
        d.appendChild(a.createTextNode(b));
        b == c && d.setAttribute('selected', true);
        h.appendChild(d);
      }, b = b();
      typeof b === 'undefined' && (b = '');
      n('', b);
      for (var d = d(), l = 0; l < d.length; l++) n(d[l], b);
      n = '';
      typeof g !== 'undefined' && !g() && (n = '; display: none');
      g = '';
      typeof m !== 'undefined' && m() && (g = '; font-weight: bold');
      h.setAttribute('style', 'background-color: Transparent; width: ' +
        c + 'px; border-width: 0px; padding: 0px' + n + g);
      typeof e !== 'undefined' && !e() && h.setAttribute('disabled', 'true');
      h.addEventListener('change', function() {
        f(h.value);
      }, true);
      h.addEventListener('keypress', function(a) {
        if (a.keyCode == 13) {
          a.preventDefault();
          a.stopPropagation();
          f(h.value);
        }
      }, true);
      h.addEventListener('focus', function() {
        h.style.backgroundColor = 'White';
      }, true);
      h.addEventListener('blur', function() {
        h.style.backgroundColor = 'Transparent';
      }, true);
      return h;
    },
    numberInputColumnTemplateBase: function(a, c, d, b, f, e, g) {
      return GanttChartView.textInputColumnTemplateBase(a, c, function() {
        var a = d();
        return !isNaN(a) ? a : '';
      }, function(a) {
        a = parseFloat(a);
        isNaN(a) && (a = 0);
        b(a);
      }, f, e, g);
    },
    percentInputColumnTemplateBase: function(a, c, d, b, f, e, g) {
      return GanttChartView.numberInputColumnTemplateBase(a, c, d, function(a) {
        a < 0 && (a = 0);
        a > 100 && (a = 100);
        b(a);
      }, f, e, g);
    },
    timeSpanInputColumnTemplateBase: function(a, c, d, b, f, e, g, m) {
      typeof f === 'undefined' && (f = 1);
      return GanttChartView.numberInputColumnTemplateBase(a,
        c, function() {
          var a = d() / (36E5 * f);
          return Math.round(a * 100) / 100;
        }, function(a) {
          a = parseFloat(a);
          a < 0 && (a = 0);
          b(a * 36E5 * f);
        }, e, g, m);
    },
    datePickerInputColumnTemplateBase: function(a, c, d, b, f, e, g, m, h, n, l, j, k) {
      l || (l = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
      var o = j, p = k;
      if (!j) j = GanttChartView.defaultDateTimeFormatter;
      if (!k) k = GanttChartView.defaultDateTimeParser;
      var q = a.createElement('input');
      q.setAttribute('type', 'text');
      d = d();
      typeof d === 'undefined' ? d = '' : d != null && (d = j(d));
      q.setAttribute('value',
        d);
      DatePicker && q.addEventListener('focus', function() {
        var b = DatePicker.get(q);
        if (!b || !b.isOpen) {
          var c = 0, d = 0;
          try {
            c = q.selectionStart;
            d = q.selectionEnd;
          } catch (e) {
          }
          b = DatePicker.initialize(q, void 0, {
            inputStyle: null,
            defaultTimeOfDay: m,
            isDropDownButtonVisible: false,
            popupStyle: 'margin-top: 1px; background-color: White; border: 1px solid #D3DFF0',
            calendarSelectorLevels: h,
            months: n,
            daysOfWeek: F(l),
            dateTimeFormatter: o,
            dateTimeParser: p,
          }, 'init warning');
          b.openDropDown();
          setTimeout(function() {
            try {
              q.selectionStart = c;
              q.selectionEnd = d;
            } catch (a) {
            }
          }, 100);
          navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null ? setTimeout(function() {
            try {
              q.focus();
            } catch (a) {
            }
          }, 100) : a.createEvent && setTimeout(function() {
            var b = a.createEvent('MouseEvents');
            b.initEvent('blur', true, false);
            q.dispatchEvent(b);
          });
        }
      }, true);
      j = '';
      typeof e !== 'undefined' && !e() && (j = '; display: none');
      e = '';
      typeof g !== 'undefined' && g() && (e = '; font-weight: bold');
      q.setAttribute('style', 'background-color: Transparent; width: ' +
        c + 'px; border-width: 0px; padding: 0px' + j + e);
      typeof f !== 'undefined' && !f() && q.setAttribute('disabled', 'true');
      var w = function() {
        var a = q.value, a = a != '' ? k(a) : null;
        b(a);
      };
      q.addEventListener('change', function() {
        w();
      }, true);
      q.addEventListener('keypress', function(a) {
        if (a.keyCode == 13) {
          a.preventDefault();
          a.stopPropagation();
          w();
        }
      }, true);
      q.addEventListener('focus', function() {
        q.style.backgroundColor = 'White';
      }, true);
      q.addEventListener('blur', function() {
        q.style.backgroundColor = 'Transparent';
      }, true);
      return q;
    },
    dateTimePickerInputColumnTemplateBase: function(a,
                                                    c, d, b, f, e, g, m, h, n, l, j, k) {
      l || (l = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
      var o = j, p = k;
      if (!j) j = GanttChartView.defaultDateTimeFormatter;
      if (!k) k = GanttChartView.defaultDateTimeParser;
      var q = a.createElement('input');
      q.setAttribute('type', 'text');
      d = d();
      typeof d === 'undefined' ? d = '' : d != null && (d = j(d));
      q.setAttribute('value', d);
      (DateTimePicker || DatePicker) && q.addEventListener('focus', function() {
        var b = (DateTimePicker ? DateTimePicker : DatePicker).get(q);
        if (!b || !b.isOpen) {
          var c = 0, d = 0;
          try {
            c = q.selectionStart;
            d = q.selectionEnd;
          } catch (e) {
          }
          b = (DateTimePicker ? DateTimePicker : DatePicker).initialize(q, void 0, {
            inputStyle: null,
            defaultTimeOfDay: m,
            isDropDownButtonVisible: false,
            popupStyle: 'margin-top: 1px; background-color: White; border: 1px solid #D3DFF0',
            calendarSelectorLevels: h,
            months: n,
            daysOfWeek: F(l),
            dateTimeFormatter: o,
            dateTimeParser: p,
          }, 'init warning');
          b.openDropDown();
          setTimeout(function() {
            try {
              q.selectionStart = c;
              q.selectionEnd = d;
            } catch (a) {
            }
          }, 100);
          navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null ? setTimeout(function() {
            try {
              q.focus();
            } catch (a) {
            }
          }, 100) : a.createEvent && setTimeout(function() {
            var b = a.createEvent('MouseEvents');
            b.initEvent('blur', true, false);
            q.dispatchEvent(b);
          });
        }
      }, true);
      j = '';
      typeof e !== 'undefined' && !e() && (j = '; display: none');
      e = '';
      typeof g !== 'undefined' && g() && (e = '; font-weight: bold');
      q.setAttribute('style', 'background-color: Transparent; width: ' +
        c + 'px; border-width: 0px; padding: 0px' + j + e);
      typeof f !== 'undefined' && !f() && q.setAttribute('disabled', 'true');
      var w = function() {
        var a = q.value, a = a != '' ? k(a) : null;
        b(a);
      };
      q.addEventListener('change', function() {
        w();
      }, true);
      q.addEventListener('keypress', function(a) {
        if (a.keyCode == 13) {
          a.preventDefault();
          a.stopPropagation();
          w();
        }
      }, true);
      q.addEventListener('focus', function() {
        q.style.backgroundColor = 'White';
      }, true);
      q.addEventListener('blur', function() {
        q.style.backgroundColor = 'Transparent';
      }, true);
      return q;
    },
    multiSelectorComboBoxInputColumnTemplateBase: function(a,
                                                           c, d, b, f, e, g, m) {
      var h = a.createElement('input');
      h.setAttribute('type', 'text');
      b = b();
      typeof b === 'undefined' && (b = '');
      h.setAttribute('value', b);
      MultiSelectorComboBox && h.addEventListener('focus', function() {
        var b = MultiSelectorComboBox.get(h);
        if (!b || !b.isOpen && b.availableChoices.length > 0) {
          var b = d(), c = 0, e = 0;
          try {
            c = h.selectionStart;
            e = h.selectionEnd;
          } catch (f) {
          }
          b = MultiSelectorComboBox.initialize(h, b, void 0, {
            inputStyle: null, autoAppendAvailableChoices: false, isDropDownButtonVisible: false,
            popupStyle: 'margin-top: 1px; background-color: White; border: 1px solid #D3DFF0; color: Black; font-size: small; max-height: 188px; overflow-y: auto',
          }, 'init warning');
          b.openDropDown();
          setTimeout(function() {
            try {
              h.selectionStart = c;
              h.selectionEnd = e;
            } catch (a) {
            }
          }, 100);
          navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null ? setTimeout(function() {
              try {
                h.focus();
              } catch (a) {
              }
            }, 100) :
            a.createEvent && setTimeout(function() {
              var b = a.createEvent('MouseEvents');
              b.initEvent('blur', true, false);
              h.dispatchEvent(b);
            });
        }
      }, true);
      b = '';
      typeof g !== 'undefined' && !g() && (b = '; display: none');
      g = '';
      typeof m !== 'undefined' && m() && (g = '; font-weight: bold');
      h.setAttribute('style', 'background-color: Transparent; width: ' + c + 'px; border-width: 0px; padding: 0px' + b + g);
      typeof e !== 'undefined' && !e() && h.setAttribute('disabled', 'true');
      h.addEventListener('change', function() {
        f(h.value);
      }, true);
      h.addEventListener('keypress',
        function(a) {
          if (a.keyCode == 13) {
            a.preventDefault();
            a.stopPropagation();
            f(h.value);
          }
        }, true);
      h.addEventListener('focus', function() {
        h.style.backgroundColor = 'White';
      }, true);
      h.addEventListener('blur', function() {
        h.style.backgroundColor = 'Transparent';
      }, true);
      return h;
    },
    dateTimeInputColumnTemplateBase: function(a, c, d, b, f, e, g) {
      return GanttChartView.textInputColumnTemplateBase(a, c, function() {
        var a = d();
        return a != null ? GanttChartView.defaultDateTimeFormatter(a) : '';
      }, function(a) {
        a = a !=
        '' ? GanttChartView.defaultDateTimeParser(a) : null;
        b(a);
      }, f, e, g);
    },
    getIndexColumnTemplate: function() {
      return function(a) {
        var c = a.ganttChartView;
        return GanttChartView.textColumnTemplateBase(c.ownerDocument, function() {
          return c.getItemIndexString(a);
        });
      };
    },
    getWbsColumnTemplate: function(a) {
      return function(c) {
        var d = c.ganttChartView;
        return GanttChartView.textColumnTemplateBase(d.ownerDocument, function() {
          return d.getItemWbsIndexString(c, a);
        });
      };
    },
    getEffortColumnTemplate: function(a,
                                      c, d) {
      typeof c === 'undefined' && (c = 1);
      return function(b) {
        var f = b.ganttChartView;
        return GanttChartView.timeSpanInputColumnTemplateBase(f.ownerDocument, a, function() {
          return f.getItemEffort(b);
        }, function(a) {
          f.setItemEffort(b, a);
          f.refreshItemPath(b);
        }, c, function() {
          return !(b.isReadOnly || d || typeof b.ganttChartView !== 'undefined' && typeof b.ganttChartView.settings !== 'undefined' && (b.ganttChartView.settings.isReadOnly || b.ganttChartView.settings.isGridReadOnly)) && !(b.hasChildren && (typeof b.isSummaryEnabled ===
            'undefined' || b.isSummaryEnabled));
        }, function() {
          return !(b.isMilestone || typeof b.isBarVisible !== 'undefined' && !b.isBarVisible);
        }, function() {
          return b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled);
        });
      };
    },
    getDurationColumnTemplate: function(a, c, d) {
      typeof c === 'undefined' && (c = 1);
      return function(b) {
        var f = b.ganttChartView;
        return GanttChartView.timeSpanInputColumnTemplateBase(f.ownerDocument, a, function() {
          return f.getItemDuration(b);
        }, function(a) {
          f.setItemDuration(b, a);
          f.refreshItemPath(b);
        }, c, function() {
          return !(b.isReadOnly || d || typeof b.ganttChartView !== 'undefined' && typeof b.ganttChartView.settings !== 'undefined' && (b.ganttChartView.settings.isReadOnly || b.ganttChartView.settings.isGridReadOnly)) && !(b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled));
        }, function() {
          return !(b.isMilestone || typeof b.isBarVisible !== 'undefined' && !b.isBarVisible);
        }, function() {
          return b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled);
        });
      };
    },
    getTotalEffortColumnTemplate: function(a,
                                           c, d) {
      typeof c === 'undefined' && (c = 1);
      return function(b) {
        var f = b.ganttChartView;
        return GanttChartView.timeSpanInputColumnTemplateBase(f.ownerDocument, a, function() {
          return f.getItemTotalEffort(b);
        }, function(a) {
          f.setItemTotalEffort(b, a);
          f.refreshItemPath(b);
        }, c, function() {
          return !(b.isReadOnly || d || typeof b.ganttChartView !== 'undefined' && typeof b.ganttChartView.settings !== 'undefined' && (b.ganttChartView.settings.isReadOnly || b.ganttChartView.settings.isGridReadOnly)) && !(b.hasChildren && (typeof b.isSummaryEnabled ===
            'undefined' || b.isSummaryEnabled));
        }, function() {
          return !(b.isMilestone || typeof b.isBarVisible !== 'undefined' && !b.isBarVisible);
        }, function() {
          return b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled);
        });
      };
    },
    getCompletedEffortColumnTemplate: function(a, c, d) {
      typeof c === 'undefined' && (c = 1);
      return function(b) {
        var f = b.ganttChartView;
        return GanttChartView.timeSpanInputColumnTemplateBase(f.ownerDocument, a, function() {
          return f.getItemCompletedEffort(b);
        }, function(a) {
          f.setItemCompletedEffort(b,
            a);
          f.refreshItemPath(b);
        }, c, function() {
          return !(b.isReadOnly || d || typeof b.ganttChartView !== 'undefined' && typeof b.ganttChartView.settings !== 'undefined' && (b.ganttChartView.settings.isReadOnly || b.ganttChartView.settings.isGridReadOnly)) && !(b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled));
        }, function() {
          return !(b.isMilestone || typeof b.isBarVisible !== 'undefined' && !b.isBarVisible);
        }, function() {
          return b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled);
        });
      };
    },
    getTotalCompletedEffortColumnTemplate: function(a, c, d) {
      typeof c === 'undefined' && (c = 1);
      return function(b) {
        var f = b.ganttChartView;
        return GanttChartView.timeSpanInputColumnTemplateBase(f.ownerDocument, a, function() {
          return f.getItemTotalCompletedEffort(b);
        }, function(a) {
          f.setItemTotalCompletedEffort(b, a);
          f.refreshItemPath(b);
        }, c, function() {
          return !(b.isReadOnly || d || typeof b.ganttChartView !== 'undefined' && typeof b.ganttChartView.settings !== 'undefined' && (b.ganttChartView.settings.isReadOnly || b.ganttChartView.settings.isGridReadOnly)) &&
            !(b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled));
        }, function() {
          return !(b.isMilestone || typeof b.isBarVisible !== 'undefined' && !b.isBarVisible);
        }, function() {
          return b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled);
        });
      };
    },
    getCompletionColumnTemplate: function(a, c) {
      return function(d) {
        var b = d.ganttChartView;
        return GanttChartView.percentInputColumnTemplateBase(b.ownerDocument, a, function() {
          var a = b.getItemCompletion(d) * 100;
          return Math.round(a *
            100) / 100;
        }, function(a) {
          if (typeof d.gridItem !== 'undefined' && typeof d.completedInput !== 'undefined') {
            var c = d.completedInput;
            typeof c.changeEventListener !== 'undefined' && c.removeEventListener('change', c.changeEventListener, true);
            delete d.completedInput;
          }
          a = parseFloat(a) / 100;
          b.setItemCompletion(d, a);
          b.refreshItemPath(d);
        }, function() {
          return !(d.isReadOnly || c || typeof d.ganttChartView !== 'undefined' && typeof d.ganttChartView.settings !== 'undefined' && (d.ganttChartView.settings.isReadOnly || d.ganttChartView.settings.isGridReadOnly)) &&
            !(d.hasChildren && (typeof d.isSummaryEnabled === 'undefined' || d.isSummaryEnabled));
        }, function() {
          return !(d.isMilestone || typeof d.isBarVisible !== 'undefined' && !d.isBarVisible);
        }, function() {
          return d.hasChildren && (typeof d.isSummaryEnabled === 'undefined' || d.isSummaryEnabled);
        });
      };
    },
    getCostColumnTemplate: function(a, c) {
      return function(d) {
        var b = d.ganttChartView;
        return GanttChartView.numberInputColumnTemplateBase(b.ownerDocument, a, function() {
          return b.getItemCost(d);
        }, function(a) {
          b.setItemCost(d, a);
          b.refreshItemPath(d);
        }, function() {
          return !(d.isReadOnly || c || typeof d.ganttChartView !== 'undefined' && typeof d.ganttChartView.settings !== 'undefined' && (d.ganttChartView.settings.isReadOnly || d.ganttChartView.settings.isGridReadOnly));
        }, void 0, function() {
          return d.hasChildren && (typeof d.isSummaryEnabled === 'undefined' || d.isSummaryEnabled);
        });
      };
    },
    getPredecessorsColumnTemplate: function(a, c, d) {
      return function(b) {
        var f = b.ganttChartView;
        return GanttChartView.textInputColumnTemplateBase(f.ownerDocument,
          a, function() {
            return f.getItemPredecessorsString(b, d);
          }, function(a) {
            f.setItemPredecessorsString(b, a, d);
            f.refreshItemGraph(b);
          }, function() {
            return !(b.isReadOnly || c || typeof b.ganttChartView !== 'undefined' && typeof b.ganttChartView.settings !== 'undefined' && (b.ganttChartView.settings.isReadOnly || b.ganttChartView.settings.isGridReadOnly));
          }, function() {
            return !(typeof b.isBarVisible !== 'undefined' && !b.isBarVisible);
          }, function() {
            return b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled);
          });
      };
    },
    getAssignmentSelectorColumnTemplate: function(a, c, d) {
      return function(b) {
        var f = b.ganttChartView;
        return GanttChartView.optionSelectColumnTemplateBase(f.ownerDocument, a, function() {
          return typeof c === 'array' ? c : c(b);
        }, function() {
          return b.assignmentsContent;
        }, function(a) {
          b.assignmentsContent = a;
          f.onItemPropertyChanged(b, 'assignmentsContent', true, true);
          f.refreshItem(b);
        }, function() {
          return !(b.isReadOnly || d || typeof b.ganttChartView !== 'undefined' && typeof b.ganttChartView.settings !== 'undefined' &&
            (b.ganttChartView.settings.isReadOnly || b.ganttChartView.settings.isGridReadOnly));
        }, function() {
          return !(typeof b.isBarVisible !== 'undefined' && !b.isBarVisible);
        }, function() {
          return b.hasChildren && (typeof b.isSummaryEnabled === 'undefined' || b.isSummaryEnabled);
        });
      };
    },
    getBaselineStartColumnTemplate: function(a, c, d, b, f, e, g, m) {
      typeof c === 'undefined' && (c = true);
      typeof d === 'undefined' && (d = true);
      return function(h) {
        var j = h.ganttChartView;
        return (c ? d ? GanttChartView.dateTimePickerInputColumnTemplateBase :
          GanttChartView.datePickerInputColumnTemplateBase : GanttChartView.dateTimeInputColumnTemplateBase)(j.ownerDocument, a, function() {
            return h.baselineStart;
          }, function(a) {
            a != null ? h.baselineStart = a : delete h.baselineStart;
            j.onItemPropertyChanged(h, 'baselineStart', true, true);
            j.refreshItem(h);
          }, function() {
            return !(h.isReadOnly || m || typeof h.ganttChartView !== 'undefined' && typeof h.ganttChartView.settings !== 'undefined' && (h.ganttChartView.settings.isReadOnly || h.ganttChartView.settings.isGridReadOnly));
          },
          function() {
            return !(typeof h.isBarVisible !== 'undefined' && !h.isBarVisible);
          }, function() {
            return h.hasChildren && (typeof h.isSummaryEnabled === 'undefined' || h.isSummaryEnabled);
          }, b, f, e, g);
      };
    },
    getBaselineFinishColumnTemplate: function(a, c, d, b, f, e, g, j) {
      typeof c === 'undefined' && (c = true);
      typeof d === 'undefined' && (d = true);
      return function(h) {
        var n = h.ganttChartView;
        return (c ? d ? GanttChartView.dateTimePickerInputColumnTemplateBase : GanttChartView.datePickerInputColumnTemplateBase : GanttChartView.dateTimeInputColumnTemplateBase)(n.ownerDocument,
          a, function() {
            return h.baselineFinish;
          }, function(a) {
            a != null ? h.baselineFinish = a : delete h.baselineFinish;
            n.onItemPropertyChanged(h, 'baselineFinish', true, true);
            n.refreshItem(h);
          }, function() {
            return !(h.isReadOnly || j || typeof h.ganttChartView !== 'undefined' && typeof h.ganttChartView.settings !== 'undefined' && (h.ganttChartView.settings.isReadOnly || h.ganttChartView.settings.isGridReadOnly));
          }, function() {
            return !(h.isMilestone || typeof h.isBarVisible !== 'undefined' && !h.isBarVisible);
          }, function() {
            return h.hasChildren &&
              (typeof h.isSummaryEnabled === 'undefined' || h.isSummaryEnabled);
          }, b ? b : 864E5, f, e, g);
      };
    },
    getMinStartColumnTemplate: function(a, c, d, b, f, e, g, j) {
      typeof c === 'undefined' && (c = true);
      typeof d === 'undefined' && (d = true);
      return function(h) {
        var n = h.ganttChartView;
        return (c ? d ? GanttChartView.dateTimePickerInputColumnTemplateBase : GanttChartView.datePickerInputColumnTemplateBase : GanttChartView.dateTimeInputColumnTemplateBase)(n.ownerDocument, a, function() {
            return h.minStart;
          },
          function(a) {
            a != null ? h.minStart = a : delete h.minStart;
            n.onItemPropertyChanged(h, 'minStart', true, true);
            n.refreshItem(h);
          }, function() {
            return !(h.isReadOnly || j || typeof h.ganttChartView !== 'undefined' && typeof h.ganttChartView.settings !== 'undefined' && (h.ganttChartView.settings.isReadOnly || h.ganttChartView.settings.isGridReadOnly)) && !(h.hasChildren && (typeof h.isSummaryEnabled === 'undefined' || h.isSummaryEnabled));
          }, function() {
            return !(typeof h.isBarVisible !== 'undefined' && !h.isBarVisible);
          }, function() {
            return h.hasChildren &&
              (typeof h.isSummaryEnabled === 'undefined' || h.isSummaryEnabled);
          }, b, f, e, g);
      };
    },
    getMaxStartColumnTemplate: function(a, c, d, b, f, e, g, j) {
      typeof c === 'undefined' && (c = true);
      typeof d === 'undefined' && (d = true);
      return function(h) {
        var n = h.ganttChartView;
        return (c ? d ? GanttChartView.dateTimePickerInputColumnTemplateBase : GanttChartView.datePickerInputColumnTemplateBase : GanttChartView.dateTimeInputColumnTemplateBase)(n.ownerDocument, a, function() {
          return h.maxStart;
        }, function(a) {
          a !=
          null ? h.maxStart = a : delete h.maxStart;
          n.onItemPropertyChanged(h, 'maxStart', true, true);
          n.refreshItem(h);
        }, function() {
          return !(h.isReadOnly || j || typeof h.ganttChartView !== 'undefined' && typeof h.ganttChartView.settings !== 'undefined' && (h.ganttChartView.settings.isReadOnly || h.ganttChartView.settings.isGridReadOnly)) && !(h.hasChildren && (typeof h.isSummaryEnabled === 'undefined' || h.isSummaryEnabled));
        }, function() {
          return !(typeof h.isBarVisible !== 'undefined' && !h.isBarVisible);
        }, function() {
          return h.hasChildren && (typeof h.isSummaryEnabled ===
            'undefined' || h.isSummaryEnabled);
        }, b ? b : 864E5, f, e, g);
      };
    },
    getMinFinishColumnTemplate: function(a, c, d, b, f, e, g, j) {
      typeof c === 'undefined' && (c = true);
      typeof d === 'undefined' && (d = true);
      return function(h) {
        var n = h.ganttChartView;
        return (c ? d ? GanttChartView.dateTimePickerInputColumnTemplateBase : GanttChartView.datePickerInputColumnTemplateBase : GanttChartView.dateTimeInputColumnTemplateBase)(n.ownerDocument, a, function() {
          return h.minFinish;
        }, function(a) {
          a != null ? h.minFinish =
            a : delete h.minFinish;
          n.onItemPropertyChanged(h, 'minFinish', true, true);
          n.refreshItem(h);
        }, function() {
          return !(h.isReadOnly || j || typeof h.ganttChartView !== 'undefined' && typeof h.ganttChartView.settings !== 'undefined' && (h.ganttChartView.settings.isReadOnly || h.ganttChartView.settings.isGridReadOnly)) && !(h.hasChildren && (typeof h.isSummaryEnabled === 'undefined' || h.isSummaryEnabled));
        }, function() {
          return !(h.isMilestone || typeof h.isBarVisible !== 'undefined' && !h.isBarVisible);
        }, function() {
          return h.hasChildren && (typeof h.isSummaryEnabled ===
            'undefined' || h.isSummaryEnabled);
        }, b, f, e, g);
      };
    },
    getMaxFinishColumnTemplate: function(a, c, d, b, f, e, g, j) {
      typeof c === 'undefined' && (c = true);
      typeof d === 'undefined' && (d = true);
      return function(h) {
        var n = h.ganttChartView;
        return (c ? d ? GanttChartView.dateTimePickerInputColumnTemplateBase : GanttChartView.datePickerInputColumnTemplateBase : GanttChartView.dateTimeInputColumnTemplateBase)(n.ownerDocument, a, function() {
          return h.maxFinish;
        }, function(a) {
          a != null ? h.maxFinish = a :
            delete h.maxFinish;
          n.onItemPropertyChanged(h, 'maxFinish', true, true);
          n.refreshItem(h);
        }, function() {
          return !(h.isReadOnly || j || typeof h.ganttChartView !== 'undefined' && typeof h.ganttChartView.settings !== 'undefined' && (h.ganttChartView.settings.isReadOnly || h.ganttChartView.settings.isGridReadOnly)) && !(h.hasChildren && (typeof h.isSummaryEnabled === 'undefined' || h.isSummaryEnabled));
        }, function() {
          return !(h.isMilestone || typeof h.isBarVisible !== 'undefined' && !h.isBarVisible);
        }, function() {
          return h.hasChildren && (typeof h.isSummaryEnabled ===
            'undefined' || h.isSummaryEnabled);
        }, b ? b : 864E5, f, e, g);
      };
    },
    getIconColumnTemplate: function(a, c, d, b, f, e, g, j, h) {
      if (typeof a === 'string') var n = a, a = function() {
        return n;
      };
      typeof b === 'undefined' || b == false ? b = function() {
        return false;
      } : b == true && (b = function() {
        return true;
      });
      return function(l) {
        var n = l.ganttChartView, k = n.ownerDocument.createElement('img');
        k.setAttribute('src', a(l));
        typeof c !== 'undefined' && k.setAttribute('class', c);
        typeof d !== 'undefined' && k.setAttribute('style', d);
        if (!n.settings.isReadOnly && !n.settings.isGridReadOnly &&
          b(l)) {
          k.style.cursor = 'move';
          Nc(k, l, n.items, n, n.settings, f, e, g, j, h);
        }
        return k;
      };
    },
    getOutputDate: convertToLocalTimezone,
    getInputDate: convertToUTC,
  };
}();

export const ScheduleChartView = function() {
  var ScheduleChartViewConstructor = function(rootDomNode, items, copiedSettings) {
      rootDomNode.isScheduleChartInitializing = true;
      let p = items;
      items = [];
      let t;
      let w = t = 0;
      let x = 0;
      for (; x < p.length; x++) {
        var A = p[x];
        if (!(typeof A.scheduleChartItem !== 'undefined' && A.scheduleChartItem != A)) {
          A.scheduleChartIndex = t++;
          if (!A.isHidden) A.scheduleChartVisibilityIndex =
            w++;
          A.isBarVisible = false;
          items.push(A);
          if (typeof A.ganttChartItems !== 'undefined') for (var z = 0; z < A.ganttChartItems.length; z++) {
            var B = A.ganttChartItems[z];
            B.scheduleChartItem = A;
            if (A.isHidden) B.isHidden = true;
            B.displayRowIndex = A.scheduleChartVisibilityIndex;
            B.indentation = A.indentation;
            items.push(B);
          }
        }
      }
      typeof copiedSettings !== 'object' && (copiedSettings = {});
      GanttChartView.initializeItems(items, copiedSettings);
      t = copiedSettings;
      w = items;
      X(t);
      if (typeof t.gridWidth === 'undefined') t.gridWidth = '15%';
      if (typeof t.chartWidth === 'undefined') t.chartWidth = t.isGridVisible ?
        '85%' : '100%';
      if (typeof t.columns === 'undefined') t.columns = ba(w, t);
      if (typeof t.areTaskDependenciesVisible === 'undefined') t.areTaskDependenciesVisible = false;
      if (typeof t.isBaselineVisible === 'undefined') t.isBaselineVisible = false;
      if (typeof t.areAssignmentsReadOnly === 'undefined') t.areAssignmentsReadOnly = false;
      if (typeof t.assignmentThumbStyle === 'undefined') switch (t.theme) {
        default:
          t.assignmentThumbStyle = 'fill: none; stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2, 2';
          break;
        case 'Aero':
          t.assignmentThumbStyle =
            'fill: none; stroke: Blue; stroke-dasharray: 2, 2';
      }
      if (typeof t.temporaryAssignmentThumbStyle === 'undefined') switch (t.theme) {
        default:
          t.temporaryAssignmentThumbStyle = 'fill: none; stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2, 2';
          break;
        case 'Aero':
          t.temporaryAssignmentThumbStyle = 'fill: none; stroke: Blue; stroke-width: 0.65px; stroke-dasharray: 2, 2';
      }
      if (typeof t.assignmentThumbTemplate === 'undefined') t.assignmentThumbTemplate = P(w, rootDomNode, t);
      t.internalExtraTaskTemplate = t.assignmentThumbTemplate;
      K(rootDomNode, items, p, copiedSettings);
      GanttChartView.initialize(rootDomNode, items, copiedSettings, 'init warnings');
      r(rootDomNode, items);
      rootDomNode.isScheduleChartInitializing = false;
      rootDomNode.isScheduleChartInitialized = true;
      return rootDomNode;
    }, refreshScheduleChartView = function(k) {
      ScheduleChartViewConstructor(k, k.scheduleChartItems, k.settings, k.license);
    }, X = function(k) {
      if (typeof k.useUpdatingToolTips === 'undefined') k.useUpdatingToolTips = true;
      if (typeof k.target === 'undefined') k.target = 'Standard';
      if (typeof k.theme ===
        'undefined') k.theme = 'Modern';
      if (typeof k.isGridVisible === 'undefined') switch (k.target) {
        default:
          k.isGridVisible = true;
          break;
        case 'Phone':
          k.isGridVisible = false;
      }
      if (typeof k.interaction === 'undefined') k.interaction = k.target != 'Phone' ? 'Standard' : 'TouchEnabled';
      if (typeof k.isReadOnly === 'undefined') k.isReadOnly = false;
      if (typeof k.isGridReadOnly === 'undefined') k.isGridReadOnly = false;
      if (typeof k.isContentReadOnly === 'undefined') k.isContentReadOnly = false;
      if (typeof k.selectionMode === 'undefined') k.selectionMode = 'Focus';
      if (typeof k.isVirtualizing === 'undefined') k.isVirtualizing = true;
      if (k.target == 'Phone' && typeof k.areTaskAssignmentsVisible === 'undefined') k.areTaskAssignmentsVisible = false;
    }, ba = function(k, j) {
      typeof j !== 'object' && (j = {});
      X(j);
      var headerArr = [
        { header: '', width: 40, isSelection: true },
        // {
        //   header: 'Код', width: 120, isTreeView: true
        // }
      ];
      headerArr[0].cellTemplate = returnFirstCheckBox(j, headerArr[0], k);
      // headerArr[1].cellTemplate = O(j, headerArr[1], k);
      // headerArr[1].exportCellTemplate = O(j, headerArr[1], k, false);
      j.selectionMode != 'Single' && (j.selectionMode != 'Extended' && j.selectionMode != 'ExtendedFocus') &&
      headerArr.splice(0, 1);
      return headerArr;
    }, returnFirstCheckBox = function(k, j) {
      return function(k) {
        return !j.isReadOnly ? createFirstCheckBox(k) : (getBooleanNode && getBooleanNode(k.ganttChartView.ownerDocument, k.isSelected));
      };
    }, createFirstCheckBox = function(k) {
      var j = k.ganttChartView.ownerDocument, checkBoxInput;
      var containerChkbox;
      if (typeof k.selectionInput === 'undefined') {
        containerChkbox = j.createElement('div');
        checkBoxInput = j.createElement('input');
        var labelChkbox = j.createElement('label');
        labelChkbox.classList.add('gantt-checkbox-2-label');
        labelChkbox.appendChild(checkBoxInput);
        var chkboxSpan = j.createElement('span');
        labelChkbox.appendChild(chkboxSpan);
        k.selectionInputContainer = containerChkbox;
        k.selectionInput = checkBoxInput;
        checkBoxInput.classList.add('gantt-checkbox-2');
        checkBoxInput.type = 'checkbox';
        containerChkbox.appendChild(labelChkbox);
        containerChkbox.classList.add('gantt-checkbox-2-label-container');
        /* o.setAttribute('style', 'margin: 0px'); */
      } else {
        checkBoxInput = k.selectionInput;
        containerChkbox = k.selectionInputContainer;
      }
      if (k.isSelected) {
        checkBoxInput.setAttribute('checked', 'checked');
        if (!checkBoxInput.checked) checkBoxInput.checked = true;
      } else if (checkBoxInput.checked) checkBoxInput.checked = false;
      var p = function() {
        console.log('checkBoxInput.checked', checkBoxInput.checked);
        checkBoxInput.checked ?
          S(k) : typeof k.scheduleChartView !== 'undefined' && k.scheduleChartView.unselectItem(k);
      };
      typeof checkBoxInput.changeEventListener !== 'undefined' && checkBoxInput.removeEventListener('change', checkBoxInput.changeEventListener, true);
      checkBoxInput.addEventListener('change', p, true);
      checkBoxInput.changeEventListener = p;
      j = function(j) {
        if (j.keyCode == 13) {
          j.preventDefault();
          j.stopPropagation();
          p(j);
        }
      };
      typeof checkBoxInput.keyPressEventListener !== 'undefined' && checkBoxInput.removeEventListener('keypress', checkBoxInput.keyPressEventListener, true);
      checkBoxInput.addEventListener('keypress', j, true);
      checkBoxInput.keyPressEventListener = j;
      return containerChkbox;
    },
    S = function(k) {
      typeof k.scheduleChartView !== 'undefined' && k.scheduleChartView.selectItem(k);
    }, $ = function(k, j) {
      if (typeof k.scheduleChartView !== 'undefined') k.scheduleChartView.currentItem = k;
      (j.selectionMode == 'Focus' || j.selectionMode == 'ExtendedFocus') && !k.isSelected && S(k);
    }, O = function(k, j, o, p) {
      var t = function(j) {
        var k = j.content, j = j.ganttChartView.ownerDocument.createElement('span');
        j.innerHTML = k;
        return j;
      };
      return (typeof p === 'undefined' || p) && !k.isReadOnly && !k.isGridReadOnly && !k.isContentReadOnly ? function(o) {
        return !j.isReadOnly &&
        (typeof o.isReadOnly === 'undefined' || !o.isReadOnly) ? V(o, Math.max(0, j.width - o.indentation * o.ganttChartView.settings.indentationLevelWidth - o.ganttChartView.settings.toggleButtonAreaWidth - 16), k) : t(o);
      } : t;
    }, V = function(k, j, o) {
      var p = k.ganttChartView.ownerDocument, t;
      if (typeof k.contentInput === 'undefined') {
        t = p.createElement('input');
        k.contentInput = t;
        t.type = 'text';
        t.addEventListener('focus', function() {
          $(k, o);
        }, false);
        var w = function() {
          k.content = t.value;
          k.scheduleChartView.onItemPropertyChanged(k, 'content', true,
            true);
          k.scheduleChartView.refreshItem(k);
        };
        typeof t.changeEventListener !== 'undefined' && t.removeEventListener('change', t.changeEventListener, true);
        t.addEventListener('change', w, true);
        t.changeEventListener = w;
        p = function(j) {
          if (j.keyCode == 13) {
            j.preventDefault();
            j.stopPropagation();
            w(j);
          }
        };
        typeof t.keyPressEventListener !== 'undefined' && t.removeEventListener('keypress', t.keyPressEventListener, true);
        t.addEventListener('keypress', p, true);
        t.keyPressEventListener = p;
        t.addEventListener('focus', function() {
          t.style.backgroundColor =
            'White';
        }, false);
        t.addEventListener('blur', function() {
          t.style.backgroundColor = 'Transparent';
        }, false);
      } else t = k.contentInput;
      t.value = k.content;
      p = '';
      if (k.hasChildren && (typeof k.isSummaryEnabled === 'undefined' || k.isSummaryEnabled)) p = '; font-weight: bold';
      t.setAttribute('style', 'background-color: Transparent; width: ' + j + 'px; border-width: 0px; padding: 0px' + p);
      return t;
    }, P = function(k, j, o) {
      return function(p) {
        var t = p.ganttChartView.ownerDocument, w = t.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (!o.isReadOnly &&
          !o.isChartReadOnly && (typeof p.isReadOnly === 'undefined' || !p.isReadOnly) && !o.areAssignmentsReadOnly) {
          var x = j.getChartPosition(p.start, o), r = Math.max(j.getChartPosition(p.finish, o), x + 4),
            z = t.createElementNS('http://www.w3.org/2000/svg', 'line');
          z.setAttribute('x1', x);
          z.setAttribute('y1', o.barMargin + o.barHeight + 2);
          z.setAttribute('x2', r - 1);
          z.setAttribute('y2', o.barMargin + o.barHeight + 2);
          var B = o.assignmentThumbClass;
          typeof B !== 'undefined' && z.setAttribute('class', B);
          z.setAttribute('style', o.assignmentThumbStyle);
          z.style.visibility = 'hidden';
          w.appendChild(z);
          t = t.createElementNS('http://www.w3.org/2000/svg', 'rect');
          t.setAttribute('x', x);
          t.setAttribute('y', o.barMargin + o.barHeight - 2);
          t.setAttribute('width', Math.max(0, r - x - 1));
          t.setAttribute('height', 7);
          t.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: move');
          t.addEventListener('mouseover', function() {
            if (typeof j.draggingItem === 'undefined') z.style.visibility = 'visible';
          }, true);
          t.addEventListener('mouseout', function() {
            z.style.visibility = 'hidden';
          }, true);
          w.appendChild(t);
          G(t, w, p, x, r, k, j, o);
        }
        return w;
      };
    }, J = function(k) {
      var j = k.scheduleChartView;
      k.itemTop = k.scheduleChartVisibilityIndex * j.settings.itemHeight;
      j.refreshGridItem(k);
      if (typeof k.ganttChartItems !== 'undefined') for (var o = 0; o < k.ganttChartItems.length; o++) {
        var p = k.ganttChartItems[o];
        p.itemTop = k.itemTop;
        j.refreshChartItem(p);
      }
    }, G = function(k, j, o, p, t, w, x, r) {
      var z = o.ganttChartView.ownerDocument;
      k.addEventListener('mousedown', function(w) {
        if (w.button == 0) {
          delete x.cancelDrag;
          x.draggingItem = o;
          x.dragType = 'Assignment';
          x.style.cursor = k.style.cursor;
          x.draggingInitialY = w.clientY;
          x.draggingInitialThumbPosition = r.barMargin;
          w.preventDefault();
          j.itemLeft = p;
          j.itemRight = t;
          o.assignmentThumb = j;
          if (ToolTip && r.useUpdatingToolTips) {
            let toolTip = ToolTip.get(k) || ToolTip.initialize(void 0, k, {
                duration: NaN,
                containerStyle: 'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid ' + r.border + '; background-color: White; color: Black; font-family: Arial; font-size: 12px; padding: 4px; margin-top: 1px',
              },
              'init warnings');
            toolTip.setContent(o.content + ' \u2013');
            toolTip.show();
            toolTip.setPosition(toolTip.x + (t - p) + 4, toolTip.y - r.itemHeight - 1);
            toolTip.originalY = toolTip.y;
            x.toolTip = toolTip;
          }
        }
      }, true);
      if (typeof x.draggableAssignmentItems === 'undefined') x.draggableAssignmentItems = [];
      for (var B = false, G = 0; G < x.draggableAssignmentItems.length; G++) if (x.draggableAssignmentItems[G] == o) {
        B = true;
        break;
      }
      if (!B) {
        x.addEventListener('mousemove',
          function(k) {
            if (!(typeof x.draggingItem === 'undefined' || x.draggingItem != o || x.dragType != 'Assignment')) {
              var B = Math.ceil((k.clientY - x.draggingInitialY) / r.itemHeight) * r.itemHeight;
              U(k.clientY, x);
              delete x.draggingItem;
              j = o.assignmentThumb;
              p = j.itemLeft;
              t = j.itemRight;
              if (typeof x.temporaryAssignmentThumb !== 'undefined') {
                try {
                  j.removeChild(x.temporaryAssignmentThumb);
                } catch (G) {
                }
                delete x.temporaryAssignmentThumb;
              }
              if (x.cancelDrag) {
                delete x.cancelDrag;
                delete x.draggingItem;
                x.style.cursor = 'default';
              } else {
                if (r.temporaryAssignmentThumbTemplate) k =
                  r.temporaryAssignmentThumbTemplate(x, p, x.draggingInitialThumbPosition + B, Math.max(4, t - p - 1), r.barHeight); else {
                  k = z.createElementNS('http://www.w3.org/2000/svg', 'rect');
                  k.setAttribute('x', p);
                  k.setAttribute('y', x.draggingInitialThumbPosition + B);
                  k.setAttribute('width', Math.max(4, t - p - 1));
                  k.setAttribute('height', r.barHeight);
                  typeof r.temporaryAssignmentThumbClass !== 'undefined' && k.setAttribute('class', r.temporaryAssignmentThumbClass);
                  k.setAttribute('style', r.temporaryAssignmentThumbStyle);
                }
                x.temporaryAssignmentThumb =
                  k;
                j.appendChild(k);
                x.draggingItem = o;
                if (ToolTip && r.useUpdatingToolTips) {
                  let toolTip = x.toolTip;
                  var k = Math.floor((o.itemTop + x.draggingInitialThumbPosition + B) / r.itemHeight), J = null, E = 0, F;
                  for (F = 0; F < w.length; F++) {
                    var I = w[F];
                    if (I.isVisible && !(typeof I.isHidden !== 'undefined' && I.isHidden) && typeof I.displayRowIndex === 'undefined') {
                      if (E == k) {
                        I.hasChildren || (J = I);
                        break;
                      }
                      E++;
                    }
                  }
                  toolTip.setContent(o.content + ' \u2013' + (J != null ? ' ' + J.content : ''));
                  toolTip.setVerticalPosition(Math.max(W(x) + x.chartHeaderContainer.clientHeight,
                    toolTip.originalY + B));
                  if (typeof toolTip.originalX === 'undefined') toolTip.originalX = toolTip.x;
                  toolTip.setHorizontalPosition(toolTip.originalX);
                }
              }
            }
          }, true);
        z.addEventListener('mouseup', function(k) {
          if (!(k.button != 0 || typeof x.draggingItem === 'undefined' || x.draggingItem != o || x.dragType != 'Assignment')) {
            j = o.assignmentThumb;
            if (typeof x.temporaryAssignmentThumb !== 'undefined') {
              try {
                j.removeChild(x.temporaryAssignmentThumb);
              } catch (p) {
              }
              delete x.temporaryAssignmentThumb;
            }
            var k = Math.ceil((k.clientY - x.draggingInitialY) /
              r.itemHeight) * r.itemHeight,
              k = Math.floor((o.itemTop + x.draggingInitialThumbPosition + k) / r.itemHeight), t = null, z = 0, B;
            for (B = 0; B < w.length; B++) {
              var F = w[B];
              if (F.isVisible && !(typeof F.isHidden !== 'undefined' && F.isHidden) && typeof F.displayRowIndex === 'undefined') {
                if (z == k) {
                  F.hasChildren || (t = F);
                  break;
                }
                z++;
              }
            }
            if (t != null) {
              var z = o.scheduleChartItem, F = z.ganttChartItems, G = [];
              for (B = 0; B < F.length; B++) F[B] != o && G.push(F[B]);
              z.ganttChartItems = G;
              x.onItemPropertyChanged(z, 'ganttChartItems', false, true);
              if (typeof t.ganttChartItems ===
                'undefined') t.ganttChartItems = [];
              t.ganttChartItems.push(o);
              x.onItemPropertyChanged(t, 'ganttChartItems', true, true);
              o.scheduleChartItem = t;
              x.onItemPropertyChanged(o, 'scheduleChartItem', true, true);
              o.displayRowIndex = k;
              o.isVirtuallyVisible = true;
              x.refreshChartItem(o);
              $(t, r);
            }
            delete x.draggingItem;
            x.style.cursor = 'default';
          }
        }, true);
        x.draggableAssignmentItems.push(o);
      }
    }, W = function(k) {
      var j = 0;
      if (k.offsetParent) {
        do {
          j = j + k.offsetTop;
          k = k.offsetParent;
        } while (k);
      }
      return j;
    }, U = function(k, j) {
      if (typeof j.draggingItem !== 'undefined') {
        var k =
          k - W(j), o, p;
        if (k < j.chartHeaderContainer.clientHeight + 24) {
          o = j.chartContentContainer.scrollTop;
          j.chartContentContainer.scrollTop = j.chartContentContainer.scrollTop - 20;
          if (typeof j.isDuringVerticalScrolling === 'undefined') {
            j.isDuringVerticalScrolling = true;
            setTimeout(function() {
              p = o - j.chartContentContainer.scrollTop;
              j.draggingInitialThumbPosition = j.draggingInitialThumbPosition - p;
              delete j.isDuringVerticalScrolling;
            }, 0);
          }
        } else if (k >= j.chartHeaderContainer.clientHeight + j.chartContentContainer.clientHeight - 24) {
          o =
            j.chartContentContainer.scrollTop;
          j.chartContentContainer.scrollTop = j.chartContentContainer.scrollTop + 20;
          if (typeof j.isDuringVerticalScrolling === 'undefined') {
            j.isDuringVerticalScrolling = true;
            setTimeout(function() {
              p = j.chartContentContainer.scrollTop - o;
              j.draggingInitialThumbPosition = j.draggingInitialThumbPosition + p;
              delete j.isDuringVerticalScrolling;
            }, 0);
          }
        }
      }
    }, ja = function(k, j, o, p) {
      var t = p.indexOf(k);
      if (!(t < 0 || j < 0 || j == t || j >= p.length)) {
        p.splice(t, 1);
        p.splice(j, 0, k);
        refreshScheduleChartView(o);
        typeof o.settings.itemMoveHandler !==
        'undefined' && o.settings.itemMoveHandler(k, t, j);
      }
    }, K = function(k, j, o, p) {
      for (var t = 0; t < j.length; t++) j[t].scheduleChartView = k;
      k.scheduleChartItems = o;
      k.settings = p;
      k.refreshScheduleChartItem = J;
      k.initializeAssignmentDraggingThumb = function(j, o, p, t, r) {
        G(j, o, p, t, r, k.items, k, k.settings);
      };
      k.insertScheduleChartItem = function(p, t) {
        var r = p;
        t.scheduleChartView = k;
        t.isVirtuallyVisible = true;
        t.scheduleChartIndex = r;
        var z = 0, B;
        for (B = 0; B < r; B++) o[B].isHidden || z++;
        t.scheduleChartVisibilityIndex = z;
        t.isBarVisible = false;
        r = r < o.length ?
          o[r].index : j.length;
        o.splice(t.scheduleChartIndex, 0, t);
        k.insertItem(r++, t);
        if (typeof t.ganttChartItems !== 'undefined') for (B = 0; B < t.ganttChartItems.length; B++) {
          z = t.ganttChartItems[B];
          z.scheduleChartView = k;
          z.scheduleChartItem = t;
          z.isHidden = t.isHidden;
          z.displayRowIndex = t.scheduleChartVisibilityIndex;
          z.indentation = t.indentation;
          k.insertItem(r++, z);
        }
        for (B = t.scheduleChartIndex + 1; B < o.length; B++) {
          r = o[B];
          r.scheduleChartIndex = B;
          typeof r.scheduleChartVisibilityIndex !== 'undefined' && r.scheduleChartVisibilityIndex++;
          if (typeof r.ganttChartItems !== 'undefined') for (z = 0; z < r.ganttChartItems.length; z++) r.ganttChartItems[z].displayRowIndex = r.scheduleChartVisibilityIndex;
          J(r);
        }
      };
      k.addScheduleChartItem = function(j) {
        k.insertScheduleChartItem(o.length, j);
      };
      k.insertScheduleChartItems = function(j, o) {
        for (var p = 0; p < o.length; p++) k.insertScheduleChartItem(j++, o[p]);
      };
      k.addScheduleChartItems = function(j) {
        for (var o = 0; o < j.length; o++) k.addScheduleChartItem(j[o]);
      };
      k.removeScheduleChartItem = function(j) {
        if (typeof j.ganttChartItems !== 'undefined') for (var p =
          0; p < j.ganttChartItems.length; p++) k.removeItem(j.ganttChartItems[p]);
        o.splice(j.scheduleChartIndex, 1);
        for (p = j.scheduleChartIndex; p < o.length; p++) {
          var t = o[p];
          t.scheduleChartIndex = p;
          typeof t.scheduleChartVisibilityIndex !== 'undefined' && t.scheduleChartVisibilityIndex--;
          if (typeof t.ganttChartItems !== 'undefined') for (var r = 0; r < t.ganttChartItems.length; r++) t.ganttChartItems[r].displayRowIndex = t.scheduleChartVisibilityIndex;
          J(t);
        }
        k.removeItem(j);
      };
      k.removeScheduleChartItems = function(j) {
        for (var o = 0; o < j.length; o++) k.removeScheduleChartItem(j[o]);
      };
      k.moveScheduleChartRange = function(j, p, t) {
        if (!(j < 0 || t < 0 || t == j || t > o.length - p)) {
          var r = [], B;
          for (B = j; B < j + p; B++) r.push(o[B]);
          o.splice(j, p);
          for (B = 0; B < r.length; B++) o.splice(t + B, 0, r[B]);
          refreshScheduleChartView(k);
          if (typeof k.settings.itemMoveHandler !== 'undefined') for (B = 0; B < r.length; B++) k.settings.itemMoveHandler(r[B], j + B, t + B);
        }
      };
      k.moveScheduleChartItem = function(j, p) {
        ja(j, p, k, o);
      };
      k.moveScheduleChartItemUp = function(j) {
        var p = o.indexOf(j);
        p <= 0 || ja(j, p - 1, k, o);
      };
      k.moveScheduleChartItemDown = function(j) {
        var p = o.indexOf(j);
        p < 0 || p >= o.length -
        1 || ja(j, p + 1, k, o);
      };
    }, r = function(k, j) {
      k.items = j;
      k.refresh = function() {
        refreshScheduleChartView(k);
      };
    };
  return {
    initialize: ScheduleChartViewConstructor,
    refresh: refreshScheduleChartView,
    getDefaultColumns: ba,
    getDefaultScales: GanttChartView.getDefaultScales,
    getDefaultStyleDefinitionTemplate: GanttChartView.getDefaultStyleDefinitionTemplate,
    getDefaultStandardTaskTemplate: GanttChartView.getDefaultStandardTaskTemplate,
    getDefaultMilestoneTaskTemplate: GanttChartView.getDefaultMilestoneTaskTemplate,
    getDefaultItemTemplate: GanttChartView.getDefaultItemTemplate,
    getDefaultAssignmentsTemplate: GanttChartView.getDefaultAssignmentsTemplate,
    initializeTaskDraggingThumbs: GanttChartView.initializeTaskDraggingThumbs,
    initializeDependencyDraggingThumb: GanttChartView.initializeDependencyDraggingThumb,
    initializeAssignmentDraggingThumb: function(k, j, o, p, t) {
      o.scheduleChartView.initializeAssignmentDraggingThumb(k, j, o, p, t);
    },
    getWorkingTime: GanttChartView.getWorkingTime,
    getEffort: GanttChartView.getEffort,
    getFinish: GanttChartView.getFinish,
    getStart: GanttChartView.getStart,
    getCompletion: GanttChartView.getCompletion,
    getCompletedFinish: GanttChartView.getCompletedFinish,
    textColumnTemplateBase: GanttChartView.textColumnTemplateBase,
    textInputColumnTemplateBase: GanttChartView.textInputColumnTemplateBase,
    getOutputDate: GanttChartView.getOutputDate,
    getInputDate: GanttChartView.getInputDate,
  };
}();


export const LoadChartView = function() {
  var L = function(r, k, j, o) {
      var p;
      r.isLoadChartInitializing = true;
      for (var o = k, k = [], t = p = 0; t < o.length; t++) {
        var w = o[t];
        if (typeof w.isExported !== 'undefined' && w.isExported) k.push(w); else if (!(typeof w.loadChartItem !== 'undefined' && w.loadChartItem != w)) {
          w.loadChartIndex = w.scheduleChartIndex =
            p++;
          w.isBarVisible = false;
          k.push(w);
          if (typeof w.ganttChartItems !== 'undefined') for (var x = 0; x < w.ganttChartItems.length; x++) {
            var A = w.ganttChartItems[x];
            A.loadChartItem = A.scheduleChartItem = w;
            A.displayRowIndex = w.loadChartIndex;
            k.push(A);
          }
        }
      }
      typeof j !== 'object' && (j = {});
      GanttChartView.initializeItems(k, j);
      p = j;
      t = k;
      X(p);
      if (typeof p.gridWidth === 'undefined') p.gridWidth = '15%';
      if (typeof p.chartWidth === 'undefined') p.chartWidth = p.isGridVisible ? '85%' : '100%';
      if (typeof p.columns === 'undefined') p.columns =
        ba(t, p);
      if (typeof p.normalAllocationBarStyle === 'undefined' && p.normalAllocationBarClass == null) switch (p.theme) {
        default:
          p.normalAllocationBarStyle = 'fill: Blue; fill-opacity: 0.8; stroke: Blue; stroke-width: 0.65px';
          break;
        case 'Aero':
          p.normalAllocationBarStyle = 'fill: Blue; stroke: Blue';
      }
      if (typeof p.underAllocationBarStyle === 'undefined' && p.underAllocationBarClass == null) switch (p.theme) {
        default:
          p.underAllocationBarStyle = 'fill: Blue; fill-opacity: 0.8; stroke: Blue; stroke-width: 0.65px';
          break;
        case 'Aero':
          p.underAllocationBarStyle =
            'fill: Blue; stroke: Blue';
      }
      if (typeof p.overAllocationBarStyle === 'undefined' && p.overAllocationBarClass == null) switch (p.theme) {
        default:
          p.overAllocationBarStyle = 'fill: Red; fill-opacity: 0.8; stroke: Red; stroke-width: 0.65px';
          break;
        case 'Aero':
          p.overAllocationBarStyle = 'fill: Red; stroke: Red';
      }
      if (typeof p.maxDisplayedUnits === 'undefined') p.maxDisplayedUnits = 1.5;
      if (typeof p.allocationTemplate === 'undefined') p.allocationTemplate = J();
      p.standardTaskTemplate = p.allocationTemplate;
      p.milestoneTaskTemplate = p.allocationTemplate;
      p.areTaskDependenciesVisible = false;
      p.isBaselineVisible = false;
      p.isTaskCompletedEffortVisible = false;
      p.areTaskAssignmentsVisible = false;
      ja(r, k, o, j);
      GanttChartView.initialize(r, k, j, 'init warning');
      K(r, k, j);
      r.isLoadChartInitializing = false;
      r.isLoadChartInitialized = true;
      return r;
    }, I = function(r) {
      L(r, r.loadChartItems, r.settings, r.license);
    }, X = function(r) {
      if (typeof r.target ===
        'undefined') r.target = 'Standard';
      if (typeof r.theme === 'undefined') r.theme = 'Modern';
      if (typeof r.isGridVisible === 'undefined') switch (r.target) {
        default:
          r.isGridVisible = true;
          break;
        case 'Phone':
          r.isGridVisible = false;
      }
      if (typeof r.isReadOnly === 'undefined') r.isReadOnly = true;
      if (typeof r.selectionMode === 'undefined') r.selectionMode = 'Focus';
      if (typeof r.isVirtualizing === 'undefined') r.isVirtualizing = true;
    }, ba = function(r, k) {
      typeof k !== 'object' && (k = {});
      X(k);
      var headerArr = [{ header: '', width: 32, isSelection: true }, {
        header: 'Resource',
        width: 100,
      }];
      headerArr[0].cellTemplate = la(k, headerArr[0], r);
      headerArr[1].cellTemplate = $(k, headerArr[1]);
      headerArr[1].exportCellTemplate = $(k, headerArr[1], false);
      k.selectionMode != 'Single' && (k.selectionMode != 'Extended' && k.selectionMode != 'ExtendedFocus') && headerArr.splice(0, 1);
      return headerArr;
    }, la = function(r, k) {
      return function(j) {
        return !k.isReadOnly ? ea(j) : (getBooleanNode && getBooleanNode(j.ganttChartView.ownerDocument, j.isSelected));
      };
    }, ea = function(r) {
      var k = r.ganttChartView.ownerDocument, j;
      if (typeof r.selectionInput === 'undefined') {
        j = k.createElement('input');
        r.selectionInput = j;
        j.type = 'checkbox';
        j.setAttribute('style', 'margin: 0px');
      } else j = r.selectionInput;
      if (r.isSelected) {
        j.setAttribute('checked', 'checked');
        if (!j.checked) j.checked = true;
      } else if (j.checked) j.checked = false;
      var o = function() {
        j.checked ? S(r) : typeof r.loadChartView !== 'undefined' && r.loadChartView.unselectItem(r);
      };
      typeof j.changeEventListener !== 'undefined' && j.removeEventListener('change', j.changeEventListener, true);
      j.addEventListener('change', o, true);
      j.changeEventListener = o;
      k = function(j) {
        if (j.keyCode == 13) {
          j.preventDefault();
          j.stopPropagation();
          o(j);
        }
      };
      typeof j.keyPressEventListener !== 'undefined' && j.removeEventListener('keypress', j.keyPressEventListener, true);
      j.addEventListener('keypress', k, true);
      j.keyPressEventListener = k;
      return j;
    }, S = function(r) {
      typeof r.loadChartView !== 'undefined' && r.loadChartView.selectItem(r);
    }, $ = function(r, k, j) {
      var o = function(j) {
        var k = j.content, j = j.ganttChartView.ownerDocument.createElement('span');
        j.innerHTML = k;
        return j;
      };
      return (typeof j === 'undefined' || j) && !r.isReadOnly && !r.isGridReadOnly && !r.isContentReadOnly ? function(j) {
        return !k.isReadOnly &&
        (typeof j.isReadOnly === 'undefined' || !j.isReadOnly) ? O(j, Math.max(0, k.width - 2), r) : o(j);
      } : o;
    }, O = function(r, k, j) {
      var o = r.ganttChartView.ownerDocument, p;
      if (typeof r.contentInput === 'undefined') {
        p = o.createElement('input');
        r.contentInput = p;
        p.type = 'text';
        p.addEventListener('focus', function() {
          if (typeof r.loadChartView !== 'undefined') r.loadChartView.currentItem = r;
          (j.selectionMode == 'Focus' || j.selectionMode == 'ExtendedFocus') && !r.isSelected && S(r);
        }, false);
        var t = function() {
          r.content = p.value;
          r.loadChartView.onItemPropertyChanged(r,
            'content', true, true);
          r.loadChartView.refreshItem(r);
        };
        typeof p.changeEventListener !== 'undefined' && p.removeEventListener('change', p.changeEventListener, true);
        p.addEventListener('change', t, true);
        p.changeEventListener = t;
        o = function(j) {
          if (j.keyCode == 13) {
            j.preventDefault();
            j.stopPropagation();
            t(j);
          }
        };
        typeof p.keyPressEventListener !== 'undefined' && p.removeEventListener('keypress', p.keyPressEventListener, true);
        p.addEventListener('keypress', o, true);
        p.keyPressEventListener = o;
        p.addEventListener('focus', function() {
          p.style.backgroundColor =
            'White';
        }, false);
        p.addEventListener('blur', function() {
          p.style.backgroundColor = 'Transparent';
        }, false);
      } else p = r.contentInput;
      p.value = r.content;
      p.setAttribute('style', 'background-color: Transparent; width: ' + k + 'px; border-width: 0px; padding: 0px');
      return p;
    }, V = function(r) {
      for (var k = 0, j = 0; j < r.length; j++) k = k + r[j].width;
      return k;
    }, P = function(r) {
      var k = r.loadChartView;
      k.refreshGridItem(r);
      if (typeof r.ganttChartItems !== 'undefined') for (var j = 0; j < r.ganttChartItems.length; j++) k.refreshChartItem(r.ganttChartItems[j]);
    },
    J = function(r, k, j) {
      return function(o) {
        var p = typeof k !== 'undefined' ? k : o.loadChartView, t = typeof j !== 'undefined' ? j : p.settings,
          r = p.ownerDocument, x;
        x = p.ownerDocument;
        if (typeof o.chartItemArea === 'undefined') o.chartItemArea = x.createElementNS('http://www.w3.org/2000/svg', 'g');
        for (x = o.chartItemArea.childNodes.length; x-- > 0;) o.chartItemArea.removeChild(o.chartItemArea.childNodes[x]);
        x = o.chartItemArea;
        var A = p.getChartPosition(o.start, t), p = Math.max(p.getChartPosition(o.finish, t), A + 4),
          r = r.createElementNS('http://www.w3.org/2000/svg',
            'rect'), z = typeof o.units !== 'undefined' ? o.units : 1,
          B = Math.min(z, t.maxDisplayedUnits) / t.maxDisplayedUnits * t.barHeight;
        r.setAttribute('x', A);
        r.setAttribute('y', t.barMargin + (t.barHeight - B));
        r.setAttribute('width', Math.max(0, p - A - 1));
        r.setAttribute('height', B);
        A = z == 1 ? t.normalAllocationBarClass : z < 1 ? t.underAllocationBarClass : t.overAllocationBarClass;
        if (typeof o.allocationBarClass !== 'undefined') A = o.allocationBarClass;
        if (typeof A !== 'undefined') r.setAttribute('class', A); else {
          t = z == 1 ? t.normalAllocationBarStyle :
            z < 1 ? t.underAllocationBarStyle : t.overAllocationBarStyle;
          if (typeof o.allocationBarStyle !== 'undefined') t = o.allocationBarStyle;
          typeof t !== 'undefined' && r.setAttribute('style', t);
        }
        x.appendChild(r);
        return x;
      };
    }, G = function(r, k, j, o) {
      var p = o.indexOf(r);
      if (!(p < 0 || k < 0 || k == p || k >= o.length)) {
        o.splice(p, 1);
        o.splice(k, 0, r);
        I(j);
        typeof j.settings.itemMoveHandler !== 'undefined' && j.settings.itemMoveHandler(r, p, k);
      }
    }, W = function(r, k) {
      for (var j in k) j.indexOf('custom') != 0 && j.indexOf('description') != 0 || typeof r[j] === 'undefined' &&
      (r[j] = k[j]);
    }, U = function(r, k, j, o, p, t, w, x, A, z, B, G, J, I, K, O, E) {
      var F, P = [], T;
      if (typeof o !== 'undefined') for (F = 0; F < o.length; F++) {
        T = E.columns[o[F]];
        P.push({
          header: T.header,
          width: T.width,
          headerClass: T.headerClass,
          headerStyle: T.headerStyle,
          cellClass: T.cellClass,
          cellStyle: T.cellStyle,
          cellTemplate: typeof T.exportCellTemplate !== 'undefined' ? T.exportCellTemplate : T.cellTemplate,
        });
      } else for (F = 0; F < E.columns.length; F++) {
        T = E.columns[F];
        T.isSelection || P.push({
          header: T.header,
          width: T.width,
          headerClass: T.headerClass,
          headerStyle: T.headerStyle,
          cellClass: T.cellClass,
          cellStyle: T.cellStyle,
          cellTemplate: typeof T.exportCellTemplate !== 'undefined' ? T.exportCellTemplate : T.cellTemplate,
        });
      }
      if (typeof j === 'undefined') j = E.isGridVisible;
      F = j ? V(P) + 1 : 0;
      if (typeof p !== 'undefined') {
        if (typeof w === 'undefined' || !w) p = new Date(p.valueOf() - p.getTimezoneOffset() * 6E4);
      } else p = E.timelineStart;
      if (typeof t !== 'undefined') {
        if (typeof w === 'undefined' || !w) t = new Date(t.valueOf() - t.getTimezoneOffset() * 6E4);
      } else t = E.timelineFinish;
      p = {
        isExport: true,
        isReadOnly: true,
        selectionMode: 'None',
        isVirtualizing: false,
        isGridVisible: j,
        isSplitterEnabled: false,
        gridWidth: F + 'px',
        columns: P,
        allowUserToResizeColumns: false,
        isGridRowClickTimeScrollingEnabled: false,
        isMouseWheelZoomEnabled: false,
        timelineStart: p,
        timelineFinish: t,
        hourWidth: typeof x !== 'undefined' ? x : E.hourWidth,
        displayedTime: typeof p !== 'undefined' ? p : E.timelineStart,
        currentTime: E.currentTime,
        isTaskToolTipVisible: false,
        isDependencyToolTipVisible: false,
        areTaskDependenciesVisible: false,
        isBaselineVisible: false,
        isTaskCompletedEffortVisible: false,
        areTaskAssignmentsVisible: false,
        containerClass: E.containerClass,
        containerStyle: E.containerStyle,
        border: E.border,
        theme: E.theme,
        headerBackground: E.headerBackground,
        headerHeight: E.headerHeight,
        itemHeight: E.itemHeight,
        itemClass: E.itemClass,
        itemStyle: E.itemStyle,
        scales: [],
        visibleWeekStart: E.visibleWeekStart,
        visibleWeekFinish: E.visibleWeekFinish,
        workingWeekStart: E.workingWeekStart,
        workingWeekFinish: E.workingWeekFinish,
        visibleDayStart: E.visibleDayStart,
        visibleDayFinish: E.visibleDayFinish,
        specialNonworkingDays: E.specialNonworkingDays,
        barMargin: E.barMargin,
        barHeight: E.barHeight,
        normalAllocationBarClass: E.normalAllocationBarClass,
        underAllocationBarClass: E.underAllocationBarClass,
        overAllocationBarClass: E.overAllocationBarClass,
        normalAllocationBarStyle: E.normalAllocationBarStyle,
        underAllocationBarStyle: E.underAllocationBarStyle,
        overAllocationBarStyle: E.overAllocationBarStyle,
        alternativeItemClass: E.alternativeItemClass,
        alternativeChartItemClass: E.alternativeChartItemClass,
        alternativeItemStyle: E.alternativeItemStyle,
        alternativeChartItemStyle: E.alternativeChartItemStyle,
        gridLines: E.gridLines,
        horizontalGridLines: E.horizontalGridLines,
        verticalGridLines: E.verticalGridLines,
        horizontalChartLines: E.horizontalChartLines,
        target: E.target,
        months: E.months,
        daysOfWeek: E.daysOfWeek,
        weekStartDay: E.weekStartDay,
        dateFormatter: E.dateFormatter,
        dateTimeFormatter: E.dateTimeFormatter,
        isRelativeToTimezone: E.isRelativeToTimezone,
        allocationTemplate: E.allocationTemplate,
      };
      p.timelineStart = GanttChartView.getWeekStart(p.timelineStart, p.weekStartDay);
      p.timelineFinish = GanttChartView.getWeekFinish(p.timelineFinish,
        p.weekStartDay);
      K = K.getChartPosition(p.timelineFinish, p) - K.getChartPosition(p.timelineStart, p);
      p.chartWidth = K + 'px';
      var U = F + K + 2 + (j ? 1 : 0);
      for (F = 0; F < E.scales.length; F++) {
        j = E.scales[F];
        p.scales.push({
          scaleType: j.scaleType,
          isHeaderVisible: j.isHeaderVisible,
          headerHeight: j.headerHeight,
          headerTextFormat: j.headerTextFormat,
          headerClass: j.headerClass,
          headerStyle: j.headerStyle,
          isHighlightingVisible: j.isHighlightingVisible,
          highlightingClass: j.highlightingClass,
          highlightingStyle: j.highlightingStyle,
          isSeparatorVisible: j.isSeparatorVisible,
          separatorClass: j.separatorClass,
          separatorStyle: j.separatorStyle,
        });
      }
      var L, S, $ = false;
      if (B != null && typeof B.createElement !== 'undefined') L = B; else {
        if (B != null && typeof B.focus !== 'undefined') S = B; else {
          S = window.open('', B != null ? B : '_blank', typeof G !== 'undefined' && G && (typeof I === 'undefined' || I) ? 'width=320,height=100,location=no,menubar=no,toolbar=no,status=no,scrollbars=yes' : '');
          $ = true;
        }
        L = S.document;
        try {
          var X = document.head.getElementsByTagName('link');
          for (F = 0; F < X.length; F++) {
            var ba = X[F], ea = L.adoptNode(ba.cloneNode(true));
            ea.href = ba.href;
            L.head.appendChild(ea);
          }
        } catch (ja) {
        }
      }
      L.title = typeof r !== 'undefined' ? r : 'Exported chart' + (typeof G !== 'undefined' && G ? ' (printable)' : '');
      typeof A === 'undefined' && (A = 0);
      typeof z === 'undefined' && (z = O.length - 1);
      r = [];
      for (F = X = 0; F < O.length; F++) {
        B = O[F];
        if (!(typeof B.displayRowIndex !== 'undefined' && (B.displayRowIndex < A || B.displayRowIndex > z) || typeof B.displayRowIndex === 'undefined' && (X++ < A || X > z + 1))) {
          E = {
            content: B.content,
            start: B.start,
            finish: B.finish,
            units: B.units,
            isBarVisible: B.isBarVisible,
            isRelativeToTimezone: B.isRelativeToTimezone,
            'class': B['class'],
            style: B.style,
            barClass: B.barClass,
            barStyle: B.barStyle,
            isSummaryEnabled: B.isSummaryEnabled,
            isParentSummarizationEnabled: B.isParentSummarizationEnabled,
            isHidden: B.isHidden,
            isExported: true,
            tag: B,
          };
          if (typeof B.displayRowIndex !== 'undefined') E.displayRowIndex = B.displayRowIndex - A;
          W(E, B);
          r.push(E);
          B.exportItem = E;
        }
      }
      var ma = L.createElement('p');
      ma.innerHTML = typeof k !== 'undefined' ? k : '';
      L.body.appendChild(ma);
      var ca = L.createElement('div');
      ca.setAttribute('style', 'width: ' + U + 'px');
      try {
        LoadChartView.initialize(ca, r, p, 'init warning');
      } catch (la) {
      }
      setTimeout(function() {
        $ && L.body.setAttribute('style', 'margin: 0px');
        var j = L.createElement('div');
        j.appendChild(ca);
        L.body.replaceChild(j, ma);
        if (J) {
          j.setAttribute('style', 'width: ' + ca.offsetHeight + 'px; height: ' + U + 'px; overflow: hidden');
          j = Math.round((ca.offsetWidth - ca.offsetHeight) / 2);
          ca.setAttribute('style', 'width: ' + U + 'px; transform: rotate(90deg) translateX(' +
            j + 'px) translateY(' + j + 'px); -webkit-transform: rotate(90deg) translateX(' + j + 'px) translateY(' + j + 'px)');
        }
        L.close();
        if (typeof S !== void 0) {
          S.focus();
          if (typeof G !== 'undefined' && G) {
            S.print();
            (typeof I === 'undefined' || I) && S.close();
          }
        }
      }, 0);
    }, ja = function(r, k, j, o) {
      for (var p = 0; p < k.length; p++) k[p].loadChartView = k[p].scheduleChartView = r;
      r.loadChartItems = r.scheduleChartItems = j;
      r.settings = o;
      r.refreshLoadChartItem = P;
      r.insertLoadChartItem = function(o, p) {
        var x = o;
        p.loadChartView = p.scheduleChartView = r;
        p.isVirtuallyVisible =
          true;
        p.loadChartIndex = p.scheduleChartIndex = x;
        p.isBarVisible = false;
        x = x < j.length ? j[x].index : k.length;
        j.splice(p.loadChartIndex, 0, p);
        r.insertItem(x++, p);
        if (typeof p.ganttChartItems !== 'undefined') for (var A = 0; A < p.ganttChartItems.length; A++) {
          var z = p.ganttChartItems[A];
          z.loadChartView = z.scheduleChartView = r;
          z.loadChartItem = z.scheduleChartItem = p;
          z.displayRowIndex = p.loadChartIndex;
          r.insertItem(x++, z);
        }
        for (x = p.loadChartIndex + 1; x < j.length; x++) {
          A = j[x];
          A.loadChartIndex = A.scheduleChartIndex = x;
          if (typeof A.ganttChartItems !==
            'undefined') for (z = 0; z < A.ganttChartItems.length; z++) A.ganttChartItems[z].displayRowIndex = A.loadChartIndex;
          P(A);
        }
      };
      r.addLoadChartItem = function(k) {
        r.insertLoadChartItem(j.length, k);
      };
      r.insertLoadChartItems = function(j, k) {
        for (var o = 0; o < k.length; o++) r.insertLoadChartItem(j++, k[o]);
      };
      r.addLoadChartItems = function(j) {
        for (var k = 0; k < j.length; k++) r.addLoadChartItem(j[k]);
      };
      r.removeLoadChartItem = function(k) {
        if (typeof k.ganttChartItems !== 'undefined') for (var o = 0; o < k.ganttChartItems.length; o++) r.removeItem(k.ganttChartItems[o]);
        r.removeItem(k);
        j.splice(k.loadChartIndex, 1);
        for (k = k.loadChartIndex; k < j.length; k++) {
          o = j[k];
          o.loadChartIndex = o.scheduleChartIndex = k;
          if (typeof o.ganttChartItems !== 'undefined') for (var p = 0; p < o.ganttChartItems.length; p++) o.ganttChartItems[p].displayRowIndex = o.loadChartIndex;
          P(o);
        }
      };
      r.removeLoadChartItems = function(j) {
        for (var k = 0; k < j.length; k++) r.removeLoadChartItem(j[k]);
      };
      r.moveLoadChartRange = function(k, o, p) {
        if (!(k < 0 || p < 0 || p == k || p > j.length - o)) {
          var A = [], z;
          for (z = k; z < k + o; z++) A.push(j[z]);
          j.splice(k, o);
          for (z =
                 0; z < A.length; z++) j.splice(p + z, 0, A[z]);
          I(r);
          if (typeof r.settings.itemMoveHandler !== 'undefined') for (z = 0; z < A.length; z++) r.settings.itemMoveHandler(A[z], k + z, p + z);
        }
      };
      r.moveLoadChartItem = function(k, o) {
        G(k, o, r, j);
      };
      r.moveLoadChartItemUp = function(k) {
        var o = j.indexOf(k);
        o <= 0 || G(k, o - 1, r, j);
      };
      r.moveLoadChartItemDown = function(k) {
        var o = j.indexOf(k);
        o < 0 || o >= j.length - 1 || G(k, o + 1, r, j);
      };
    }, K = function(r, k, j) {
      r.items = k;
      r.refresh = function() {
        I(r);
      };
      r.exportContent = function(o, p) {
        typeof o === 'undefined' && (o = {});
        U(o.title, o.preparingMessage,
          o.isGridVisible, o.columnIndexes, o.timelineStart, o.timelineFinish, o.isRelativeToTimezone, o.hourWidth, o.startRowIndex, o.endRowIndex, p, false, o.rotate, false, r, k, j);
      };
      r.print = function(o) {
        typeof o === 'undefined' && (o = {});
        U(o.title, o.preparingMessage, o.isGridVisible, o.columnIndexes, o.timelineStart, o.timelineFinish, o.isRelativeToTimezone, o.hourWidth, o.startRowIndex, o.endRowIndex, null, true, o.rotate, o.autoClose, r, k, j);
      };
    };
  return {
    initialize: L,
    refresh: I,
    getDefaultColumns: ba,
    getDefaultScales: GanttChartView.getDefaultScales,
    getDefaultAllocationTemplate: J,
    getDefaultItemTemplate: GanttChartView.getDefaultItemTemplate,
    getWorkingTime: GanttChartView.getWorkingTime,
    textColumnTemplateBase: GanttChartView.textColumnTemplateBase,
    textInputColumnTemplateBase: GanttChartView.textInputColumnTemplateBase,
    getOutputDate: GanttChartView.getOutputDate,
    getInputDate: GanttChartView.getInputDate,
  };
}();
