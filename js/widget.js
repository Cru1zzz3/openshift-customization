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
            },{
              type: 'dom',
              node: getMetics()
            }];
          });

        var featureStr = ' ' + featureCount + ' feature';
        if (featureCount !== 1) {
          featureStr += "s";
        }

        function getMetics() {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/metrics')
          xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJvcGVuc2hpZnQtbW9uaXRvcmluZyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJjbHVzdGVyLW1vbml0b3Jpbmctb3BlcmF0b3ItdG9rZW4taDhod2IiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiY2x1c3Rlci1tb25pdG9yaW5nLW9wZXJhdG9yIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMjJhMGQyZTAtMTljNy0xMWVhLTkyYzEtMDIwMDE3MDBiZGIxIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Om9wZW5zaGlmdC1tb25pdG9yaW5nOmNsdXN0ZXItbW9uaXRvcmluZy1vcGVyYXRvciJ9.WaOw4RShMJDlcDV7NUJCcp2Ba7Lvm7CKxywGijR2pZqcyI70NUeLE9Vx3pqUznPbL1biGRPdRllfEStVQq9QywCg16zi2Q9Ka0zIyg4vlt9seWuwctPEEdQitXqPnrlwuyzqcNO0tnS2AFjoeSxhOIlocLcfW-WvBARyEYr7kjKnH4mwvBCK3bklIh5hsub6LLVLqBSqx72q4fjsHQz7fBrlcRFj_qTSrIDoSBfYDkSGHojCQ48DbWHzm0KmaGspEFnT06QNogm1FwKRq08dZ0oaDf1WFIVZ_LTqYarSyDTU3aQ6TW_VNd8nEOLXmq3PQ8p1U5lEAhYPq7qvvt0tCg')
          xhr.responseType = 'text';
          xhr.send();
          xhr.onreadystatechange = function () {
            if (xhr.status == 200) {
              console.log("Authorization ok");
              var plainElement = document.getElementById("plain");
              plainElement.append(xhr.responseText)
              alert(xhr.responseText)
            }
            else
              console.error("Error in getting metrics. Reason" + response.responseType + response.responseText);
            return;
          }
        }

        //getMetics();

        //var refreshMetricsScript = $('<script>' + metrics + '</script>')

        var status_widget = $('<li class="dropdown" uib-dropdown="" style="padding-top: 20px">' +         // dropdown element on page
          '<a id="widget-dropdown" uib-dropdown-toggle="" class="nav-item-iconic dropdown-toggle"' +
          'href="" aria-haspopup="true" aria-expanded="false">' +
          '<button id="refreshMetrics" type="button" onclick="getMetics()" title="Refresh metrics" class="fa action fa-refresh"> </button>' +
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



        /*
        var response = [];
        $.ajax({
          type: "GET", //GET, POST, PUT
          url: '/metrics',  //the url to call
          beforeSend: function (xhr) {   //Set token here
            var token = 'yJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJvcGVuc2hpZnQtbW9uaXRvcmluZyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJjbHVzdGVyLW1vbml0b3Jpbmctb3BlcmF0b3ItdG9rZW4taDhod2IiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiY2x1c3Rlci1tb25pdG9yaW5nLW9wZXJhdG9yIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMjJhMGQyZTAtMTljNy0xMWVhLTkyYzEtMDIwMDE3MDBiZGIxIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Om9wZW5zaGlmdC1tb25pdG9yaW5nOmNsdXN0ZXItbW9uaXRvcmluZy1vcGVyYXRvciJ9.WaOw4RShMJDlcDV7NUJCcp2Ba7Lvm7CKxywGijR2pZqcyI70NUeLE9Vx3pqUznPbL1biGRPdRllfEStVQq9QywCg16zi2Q9Ka0zIyg4vlt9seWuwctPEEdQitXqPnrlwuyzqcNO0tnS2AFjoeSxhOIlocLcfW-WvBARyEYr7kjKnH4mwvBCK3bklIh5hsub6LLVLqBSqx72q4fjsHQz7fBrlcRFj_qTSrIDoSBfYDkSGHojCQ48DbWHzm0KmaGspEFnT06QNogm1FwKRq08dZ0oaDf1WFIVZ_LTqYarSyDTU3aQ6TW_VNd8nEOLXmq3PQ8p1U5lEAhYPq7qvvt0tCg'
            xhr.setRequestHeader("Authorization", 'Bearer ' + token);
          }
        }).done(function (response) {
          console.log("Authorization ok");
          plainelement = document.getElementById("plain");
          plainelement.append(xhr.responseText)
        }).fail(function () {
          alert("Error in getting metrics. Reason" + response.responseType + response.responseText);
        });
        */
      });
    }
  ]);

pluginLoader.addModule('openshiftMonitoringWidget');

