'use strict';



angular
  .module('openshiftOnlineExtensions', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {

      var system_status_elem = $('<a href="https://cru1zzz3.github.io/openshift-customization/json/data.json" target="_blank" class="nav-item-iconic system-status project-action-btn">');
      //var system_status_elem_mobile = $('<div row flex class="navbar-flex-btn system-status-mobile">');

      $.getJSON("https://cru1zzz3.github.io/openshift-customization/json/data.json", function (data) {
        var featureCount = Object.keys(data).length;
        var items = [];
        $.each(data, function (key, val) {
          items.push("<li id='" + key + "'>" + val + "</li>");
        });

        var featureStr = featureCount + ' feature';
        if (featureCount !== 1) {
          featureStr += "s";
        }
        $('<span title="System Status" class="fa status-icon pficon-warning-triangle-o"></span>').appendTo(system_status_elem);
        $('<span class="status-issue">' + featureStr + '</span>').appendTo(system_status_elem);


        extensionRegistry
          .add('nav-system-status-mobile', function () {
            return [{
              type: 'dom',
              node: system_status_elem_mobile
            }];
          });

        //system_status_elem_mobile.append(system_status_elem.clone());

        // only add the extension if there is something to show so we
        // do not generate empty nodes if no issues

      });
      var widget_dropdown = $('<a id="widget-dropdown" class="nav-item-iconic dropdown-toggle" uib-dropdown-toggle=""><span class="sr-only">Help</span></a>')

      var feature_status = $('<span class="feature-status">' + Object.keys(data) + ':' + Object.values(data) + '</span>');

      extensionRegistry
        .add('nav-system-status', function () {
          return [{
            type: 'dom',
            node: system_status_elem
          }, {
            type: 'dom',
            node: widget_dropdown
          }, {
            type: 'dom',
            node: feature_status
          }];
        });

    }
  ]);

pluginLoader.addModule('openshiftOnlineExtensions');

/*
angular
  .module('mysystemstatusbadgeextension', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {
      // Replace http://status.example.com/ with your domain
      var system_status_elem = $('<a href="http://status.example.com/"' +
        'target="_blank" class="nav-item-iconic system-status"><span title="' +
        'System Status" class="fa status-icon pficon-warning-triangle-o">' +
        '</span></a>');

      // Add the extension point to the registry so the badge appears
      // To disable the badge, comment this block out
      extensionRegistry
        .add('nav-system-status', function () {
          return [{
            type: 'dom',
            node: system_status_elem
          }];
        });
    }
  ]);

hawtioPluginLoader.addModule('mysystemstatusbadgeextension');
*/

/*
angular
  .module('openshiftMonitoringWidget', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function(extensionRegistry) {
      extensionRegistry
        .add('nav-help-dropdown', function() {
          return [
            {
              type: 'dom',
              node: '<li><a href="http://www.example.com/report" target="_blank">Report a Bug</a></li>'
            }, {
              type: 'dom',
              node: '<li class="divider"></li>'  // If you want a horizontal divider to appear in the menu
            }, {
              type: 'dom',
              node: '<li><a href="http://www.example.com/status" target="_blank">System Status</a></li>'
            }
          ];
        });
    }
  ]);

pluginLoader.addModule('openshiftMonitoringWidget');
*/