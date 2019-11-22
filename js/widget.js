'use strict';

angular
  .module('openshiftOnlineExtensions', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {

      var system_status_elem = $('<li class="dropdown" uib-dropdown="" style="">' + 
      + '<a uib-dropdown-toggle="" class="nav-item-iconic dropdown-toggle" id="help-dropdown" href="" aria-haspopup="true" aria-expanded="false">' + '</li>');
      
      $.getJSON("https://cru1zzz3.github.io/openshift-customization/json/data.json", function (data) {
        var featureCount = Object.keys(data).length;
        var items = [];
        $.each(data, function (key, val) {
          items.push("<li id='" + key + "'>" + val + "</li>");
        });

        var feature_status = $('<span class="feature-status">' + Object.keys(data) + ':' + Object.values(data) + '</span>');

        var featureStr = featureCount + ' feature';
        if (featureCount !== 1) {
          featureStr += "s";
        }
        $('<span title="System Status" class="fa status-icon pficon-warning-triangle-o"></span>').appendTo(system_status_elem);
        $('<span class="status-issue">' + featureStr + '</span>').appendTo(system_status_elem);
        feature_status.appendTo(system_status_elem);

        //var widget_dropdown = $('<a id="widget-dropdown" class="nav-item-iconic dropdown-toggle" uib-dropdown-toggle=""><span class="sr-only">Help</span></a>')
        //widget_dropdown.appendTo(system_status_elem);
        
        extensionRegistry
        .add('nav-system-status', function () {
          return [{
            type: 'dom',
            node: system_status_elem
          }];
        });
      });
    }
  ]);

pluginLoader.addModule('openshiftOnlineExtensions');

