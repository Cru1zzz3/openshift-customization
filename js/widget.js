'use strict';

angular
  .module('openshiftOnlineExtensions', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {
      $.getJSON("https://cru1zzz3.github.io/openshift-customization/json/data.json", function (data) {
        var featureCount = Object.keys(data).length; // amount of features
                

        function feature_status(features) {
          var feature = '';
          $.each(data, function (key, val) {
            feature.concat('<li class="ng-scope">' + key + ':' + val + '</li>');
          });
          return features;   // The function returns the product of p1 and p2
        }

        var featureStr = featureCount + ' feature';
        if (featureCount !== 1) {
          featureStr += "s";
        }

        extensionRegistry
          .add('nav-widget-dropdown', function () {
            return [{
              type: 'dom',
              node: feature_status
            }];
          });

        var system_status_elem = $('<li class="dropdown" uib-dropdown="" style="padding-top: 20px">' +
          '<a id="widget-dropdown" uib-dropdown-toggle="" class="nav-item-iconic dropdown-toggle" href="" aria-haspopup="true" aria-expanded="false">' +
            '<span title="System Status" class="fa object fa-tachometer"></span>' + // dashboard icon
            '<span>'+ featureStr + '</span>' +                                      // print amount of features
            '<span class="sr-only">Status dashboard</span>' +                       // hover comment
            '<span class="caret" aria-hidden="true"></span>' +                      // arrow icon
          '</a>' +                                                                  
            '<ul uib-dropdown-menu="" aria-labelledby="widget-dropdown" extension-point="" extension-name="nav-widget-dropdown"' +
              'extension-types="dom html" class="ng-isolate-scope dropdown-menu">' + // dropdown menu
                          
            '</ul>' +
          '</li>'
        );

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

