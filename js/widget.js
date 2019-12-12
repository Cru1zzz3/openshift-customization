'use strict';

angular
  .module('openshiftMonitoringWidget', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {

        function add_metricsViewerDiv() {
          var features = "";
          features = features.concat('<div id="metricsViewer" style="height:350px;width:1250px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;white-space:pre;resize: vertical;"></div>' + 
          '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/rickshaw/1.6.6/rickshaw.min.js"></script>') // there should be response from /metrics    
          return features;
        }

        function getMetrics(){
          var delay = 5000;
          $.ajax({
            url: '/metrics',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJvcGVuc2hpZnQtbW9uaXRvcmluZyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJjbHVzdGVyLW1vbml0b3Jpbmctb3BlcmF0b3ItdG9rZW4taDhod2IiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiY2x1c3Rlci1tb25pdG9yaW5nLW9wZXJhdG9yIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMjJhMGQyZTAtMTljNy0xMWVhLTkyYzEtMDIwMDE3MDBiZGIxIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Om9wZW5zaGlmdC1tb25pdG9yaW5nOmNsdXN0ZXItbW9uaXRvcmluZy1vcGVyYXRvciJ9.WaOw4RShMJDlcDV7NUJCcp2Ba7Lvm7CKxywGijR2pZqcyI70NUeLE9Vx3pqUznPbL1biGRPdRllfEStVQq9QywCg16zi2Q9Ka0zIyg4vlt9seWuwctPEEdQitXqPnrlwuyzqcNO0tnS2AFjoeSxhOIlocLcfW-WvBARyEYr7kjKnH4mwvBCK3bklIh5hsub6LLVLqBSqx72q4fjsHQz7fBrlcRFj_qTSrIDoSBfYDkSGHojCQ48DbWHzm0KmaGspEFnT06QNogm1FwKRq08dZ0oaDf1WFIVZ_LTqYarSyDTU3aQ6TW_VNd8nEOLXmq3PQ8p1U5lEAhYPq7qvvt0tCg');
            },
            metrics: {},
            success: function (metrics) { 
              $("#metricsViewer").html(metrics);
              setTimeout(function() {
                delaySuccess(metrics);
              }, delay);
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

        //var refresh_button = $('<button id="refreshMetrics" type="button" onclick="getMetics()" title="Refresh metrics" class="fa action fa-refresh"> </button>');
        
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

