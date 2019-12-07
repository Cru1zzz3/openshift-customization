'use strict';

angular
  .module('openshiftMonitoringWidget', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {

      $.getJSON("https://cru1zzz3.github.io/openshift-customization/json/data.json", function (data) {
        var featureCount = Object.keys(data).length; // amount of features

        // print all features from JSON file
        function feature_status() {
          var features = "";
          features = features.concat('<p id="plain">should be response from ajax</p>')
          $.each(data, function (key, val) {
            features = features.concat('<li class="ng-scope">' + key + ' : ' + val + '</li>');
          });
          return features;
        }

        extensionRegistry
          .add('nav-widget-dropdown', function () {
            return [{
              type: 'dom',
              node: feature_status()
            }];
          });

        var featureStr = ' ' + featureCount + ' feature';
        if (featureCount !== 1) {
          featureStr += "s";
        }

        var status_widget = $('<li class="dropdown" uib-dropdown="" style="padding-top: 20px">' +         // dropdown element on page
          '<a id="widget-dropdown" uib-dropdown-toggle="" class="nav-item-iconic dropdown-toggle"' +
          'href="" aria-haspopup="true" aria-expanded="false">' +
          '<span title="System Status" class="fa object fa-tachometer"></span>' +                     // dashboard icon
          '<span>' + featureStr + '</span>' +                                                          // print amount of features
          '<span class="sr-only">Status dashboard</span>' +                                           // hover comment
          '<span class="caret" aria-hidden="true"></span>' +                                          // arrow icon
          '</a>' +
          '<ul uib-dropdown-menu="" aria-labelledby="widget-dropdown" extension-point="" extension-name="nav-widget-dropdown"' +
          'extension-types="dom html" class="ng-isolate-scope dropdown-menu">' +                      // dropdown menu
          // here will be input of "nav-widget-dropdown" extension           
          '</ul>' +
          '</li>'
        );

        // extension add widget to
        extensionRegistry
          .add('nav-system-status', function () {
            return [{
              type: 'dom',
              node: status_widget // maybe change to monitoring widget
            }];
          });


        $.ajax({
          type: "GET", //GET, POST, PUT
          url: '/metrics',  //the url to call
          contentType: 'application/json',
          beforeSend: function (xhr) {   //Set token here
            var token = 'XjAOx66G3ITI4wceWjznFPHM5GS7nM1cviu2Ofd6HkY'
            xhr.setRequestHeader("Authorization", 'Bearer ' + token);
          }
        }).done(function (response) {
          console.log("Authorization ok");
          plainelement = document.getElementById("plain");
          plainelement.append(response)

        }).fail(function (err) {
          console.log("Error during request");
        });


      });
    }
  ]);

pluginLoader.addModule('openshiftMonitoringWidget');

