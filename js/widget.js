'use strict';

angular
  .module('openshiftMonitoringWidget', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {

        function add_metricsViewerDiv() {
          var features = "";
          features = features.concat('<div id="metricsViewer" style="height:350px;width:1250px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;white-space:pre;resize: vertical;"></div>' + // there should be response from /metrics 
          '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/rickshaw/1.6.6/rickshaw.min.js"></script>')     
          return features;
        }

        function getMetrics(){
          var delay = 5000;
          $.ajax({
            url: '/metrics',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJvcGVuc2hpZnQtbW9uaXRvcmluZyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJwcm9tZXRoZXVzLWs4cy10b2tlbi1nNmR4NiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJwcm9tZXRoZXVzLWs4cyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjQxNzliYTRkLTE5YzctMTFlYS05MmMxLTAyMDAxNzAwYmRiMSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpvcGVuc2hpZnQtbW9uaXRvcmluZzpwcm9tZXRoZXVzLWs4cyJ9.vEZDRpvvYBZLyNI4FDO2ICe53jL9QlpvsYibPgOROjhbP9HGxSH9CGvyEPs7lJvLXJe7pUTJ-DDkJ8IP9rB-dBERxUMeZJJYLJX1C13D4Fs-JVGceOxmpuyqRe4SJmExQyp9q5wRQQzbU5dbN8_e6ZLoJX-5hThetMOVLfk1MzSuIS5akE8UwhVXo7zYrEKhXSzZEWejTew2ffmcytpumTTx1sQ49kPoS_ojgwKEwWve9c7WaukinWXAaqWXY7BkxvziP6W39EknauUl9L1K698DskyANLbwBfP3uRxlsasXV9HsmHECeuciJvXI1AQAU6w-yLs5G_Prx247ltVEWQ');
            },
            metrics: {},
            success: function (metrics) { 
              var scroll=$("#metricsViewer")[0].scrollTop;  // save state of scrollbox 
              $("#metricsViewer").html(metrics);            // replace metrics plaintext response
              $("#metricsViewer")[0].scrollTop=scroll;
              setTimeout(getMetrics,delay);                 // delay for scraping metrics
            },
            error: function () { 
              console.log("Error ajax")
            },
            });
        };
        
        extensionRegistry
          .add('nav-widget-dropdown', function () {
            return [{
              type: 'dom',
              node: add_metricsViewerDiv()
            },{
              type: 'dom',
              node: getMetrics()
            }];
          });
         

        function getMeticsGrafana() {
          var xhr = new XMLHttpRequest();
          var grafana = 'https://grafana-openshift-monitoring.apps.centos7-k8s-2/api/datasources/proxy/1/api/v1/query_range?query=node%3Anode_cpu_saturation_load1%3A%7Bnode%3D%22centos7-k8s-2%22%7D&start=1576156650&end=1576160280&step=30';
          xhr.withCredentials = true
          xhr.open('GET', grafana)
          xhr.setRequestHeader('Authorization', 'Bearer LDvujW0IhElEAhDvzelholOfh1-iLLiU3RmyzjVnA1o')
          xhr.send();
          xhr.onload = function () {
            if (xhr.status == 200) {
              console.log("ok");
              console.log(xhr.responseText)
            }
            else
              console.error("Error in getting grafana. Reason" + xhr.responseType + xhr.responseText);
          }
        }
        
        var status_widget = $('<li class="dropdown" uib-dropdown="" style="padding-top: 20px">' +         // dropdown element on page
          '<a id="widget-dropdown" uib-dropdown-toggle="" class="nav-item-iconic dropdown-toggle"' +
          'href="" aria-haspopup="true" aria-expanded="false">' +
          '<span title="System Status" class="fa object fa-tachometer"></span>' +                     // dashboard icon
          //'<span>' + featureStr + '</span>' +     
          '<span>' + 'Features' + '</span>' +                                                       // print amount of features
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
    }
  ]);

pluginLoader.addModule('openshiftMonitoringWidget');

