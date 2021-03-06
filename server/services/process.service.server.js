module.exports = function (app) {
  var ProcessModel = require('../../model/process/process.model.server');

  console.log("Process server started...");
  app.get("/api/process/:pid", findProcessByPid);
  app.post("/api/process", createProcess);
  app.put("/api/process/:pid", updateProcess);

  function findProcessByPid(req, res) {
    var processId = req.params['pid'];
    ProcessModel.findProcessByPid(processId)
      .then(function (process) {
        if (process != null) {
          res.json(process);
        } else {
          return createProcess(req, res);
        }
      });
  }

  function createProcess(req, res) {
    var processId = req.params['pid'];
    var cacheLine = [];
    var addedNums = [];
    while(cacheLine.length < 10) {
      var num = Math.floor((Math.random()*100));
      if(addedNums.indexOf(num) > -1) {
        continue;
      }
      addedNums.push(num);
      cacheLine[cacheLine.length] = {value: num, found: 0};
    }

    var newProcess = {pid: processId, processCache: cacheLine};

    ProcessModel.createProcess(newProcess)
      .then(function (process) {
        res.json(process);
      });
  }

  function updateProcess(req, res) {
    var processId = req.params['pid'];
    var updatedProcess = req.body;

    ProcessModel.updateProcess(processId, updatedProcess)
      .then(function (status) {
        res.json(status);
      });
  }


};
