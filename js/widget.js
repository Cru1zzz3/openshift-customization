'use strict';

angular
  .module('openshiftOnlineExtensions', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {

      var system_status_elem = $('<a href="https://cru1zzz3.github.io/openshift-customization/json/data.json" target="_blank" class="nav-item-iconic system-status project-action-btn">');
      
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
      });
    }
  ]);

pluginLoader.addModule('openshiftOnlineExtensions');
