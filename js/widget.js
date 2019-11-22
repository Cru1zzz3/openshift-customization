'use strict';

angular
  .module('openshiftOnlineExtensions', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {




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

        var system_status_elem = $('<li class="dropdown" uib-dropdown="" style="padding-top: 20px">' +
          '<a id="widget-dropdown" uib-dropdown-toggle="" class="nav-item-iconic dropdown-toggle" href="" aria-haspopup="true" aria-expanded="false">' +
            '<span title="System Status" class="fa object fa-tachometer"></span>' + // dashboard icon
            '<span class="sr-only">Status dashboard</span>' + // hover comment
            '<span class="caret" aria-hidden="true"></span>' +
          '</a>' + // arrow icon
          '<ul uib-dropdown-menu="" aria-labelledby="help-dropdown" extension-point="" extension-name="nav-help-dropdown"' +
            'extension-types="dom html" class="ng-isolate-scope dropdown-menu">' + // dropdown menu
              '<li class="ng-scope">' + feature_status + '</li>' +
          '</ul>' +
          '</li>'
        );

        //$('<span title="System Status" class="fa status-icon pficon-warning-triangle-o"></span>').appendTo(system_status_elem);
        //$('<span class="status-issue">' + featureStr + '</span>').appendTo(system_status_elem);
        //feature_status.appendTo(system_status_elem);

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

