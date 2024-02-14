var Service = require('node-windows').Service;

// Create a new service object
var svcServer = new Service({
  name:'ouitWebAppServer',
  description: 'local web app',
  script: '..\\ouit\\server\\index.js'
});

var svcClient = new Service({
  name:'ouitWebAppClient',
  description: 'local web app',
  script: '..\\ouit\\client\\src\\main.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svcServer.on('install',function(){
  svcServer.start();
  console.log("Service started");
});

svcServer.install();
console.log("Service installed");

svcClient.on('install',function(){
  svcClient.start();
  console.log("Service started");
});

svcClient.install();
console.log("Service installed");