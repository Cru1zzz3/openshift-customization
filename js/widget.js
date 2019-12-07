'use strict';

angular
  .module('openshiftMonitoringWidget', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {

      $.ajax({
        url: 'http://localhost:9101/metrics',
        type: 'GET',
        contentType: 'application/json',
        headers: {
           'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJvcGVuc2hpZnQtbW9uaXRvcmluZyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJtZXRyaWNzLXRva2VuLXRram16Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Im1ldHJpY3MiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIyMGQyZjgwMi0xOTBlLTExZWEtOTNmOC0wMjAwMTcwMGJkYjEiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6b3BlbnNoaWZ0LW1vbml0b3Jpbmc6bWV0cmljcyJ9.j5BkaeqbcM1IR-Be6gyBUxGU0blAI3BTmcx-Y6pmcKmGdHEzkYgszCepFTMmMZXFjvypmIAeUeT6L_f4FlGQOmu7DSW3O0fQOcjRyOdTo17JzNBeQX8T8AwjeOpNodpdDN1zVr9uFcF_srxmbIwithznNy8TAj38_DSgLK9NB8RPyFeVQbApzmwVnPFx1T9ghkdXLLjOd9VbRJ7WPU_PiGlcVw4rvuaW0Q3OoMqU3JZczHu5wC70vsnDgz9_FTKN2JsQmxOY7nCJy_aznBEGQXrNQVjz8oZMuEJ_gNbbgxk4g5f5xfAMveRmhJnnHSWhS_w1OAjSg7JKmStMy5VRKg'
        },
        success: function (result) {
            console.log("successfull get metrics")
        },
        error: function (error) {
          console.log("can't get metrics")
        }
     });

      $.getJSON("/home/origin/prom2json/metrics.json", function (data) {
        var featureCount = Object.keys(data).length; // amount of features

        // print all features from JSON file
        function feature_status() { 
          var features = "";
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
              '<span>'+ featureStr + '</span>' +                                                          // print amount of features
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
      });
    }
  ]);

pluginLoader.addModule('openshiftMonitoringWidget');

