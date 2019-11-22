'use strict';
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


angular
  .module('openshiftOnlineExtensions', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {

      var system_status_elem = $('<a href="http://status.openshift.com/" target="_blank" class="nav-item-iconic system-status project-action-btn">');
      var system_status_elem_mobile = $('<div row flex class="navbar-flex-btn system-status-mobile">');

      $.getJSON("https://cru1zzz3.github.io/openshift-customization/json/data.json", function (data) {
        var items = [];
        var len = items.keys(obj).length;
        $.each(data, function (key, val) {
          items.push("<li id='" + key + "'>" + val + "</li>");
        });

        var featureStr = len + ' feature';
        if (len !== 1) {
          featureStr += "s";
        }
        $('<span title="System Status" class="fa status-icon pficon-warning-triangle-o"></span>').appendTo(system_status_elem);
        $('<span class="status-issue">' + featureStr + '</span>').appendTo(system_status_elem);

        system_status_elem_mobile.append(system_status_elem.clone());

        // only add the extension if there is something to show so we
        // do not generate empty nodes if no issues
        extensionRegistry
          .add('nav-system-status', function () {
            return [{
              type: 'dom',
              node: system_status_elem
            }];
          });

        extensionRegistry
          .add('nav-system-status-mobile', function () {
            return [{
              type: 'dom',
              node: system_status_elem_mobile
            }];
          });
      });

      extensionRegistry
        .add('nav-help-dropdown', function () {
          return [
            {
              type: 'dom',
              node: '<li><a href="https://bugzilla.redhat.com/enter_bug.cgi?product=OpenShift%20Online" target="_blank">Report a Bug</a></li>'
            }, {
              type: 'dom',
              node: '<li><a href="https://stackoverflow.com/tags/openshift" target="_blank">Stack Overflow</a></li>'
            }, {
              type: 'dom',
              node: '<li class="divider"></li>'
            }, {
              type: 'dom',
              node: '<li><a href="http://status.openshift.com/" target="_blank">System Status</a></li>'
            }
          ];
        });

    }
  ]);

pluginLoader.addModule('openshiftOnlineExtensions');

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
