'use strict';

angular
  .module('corsTest', ['openshiftConsole'])
  .run([
    'extensionRegistry',
    function (extensionRegistry) {
      
      var invocation = new XMLHttpRequest();
      var url = 'http://localhost:9101/metrics';
        
      function callOtherDomain() {
        if(invocation) {    
          invocation.open('GET', url, true);
          invocation.onreadystatechange = handler;
          invocation.send(); 
        }
      }
      console.log(callOtherDomain());
    }
  ]);

pluginLoader.addModule('corsTest');

