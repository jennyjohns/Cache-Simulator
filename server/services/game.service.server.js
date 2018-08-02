
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app, models){
  var pageModel = models.pageModel;
  var boardModel = models.boardModel;

  var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456" },
    { "_id": "432", "name": "Post 2", "websiteId": "456" },
    { "_id": "543", "name": "Post 3", "websiteId": "456" }
  ];

  app.get("/api/game/:gameId",findGame);
  app.post("/api/game/:gameId",initializeBoard);

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/page/:pageId",findPageById);
  app.put("/api/page/:pageId",updatePage);
  app.delete("/api/page/:pageId",deletePage);

  function findGame(req, res) {
    var numbers = [3, 2, 6, 9];
    res.json(numbers);
  }

  function initializeBoard(req, res) {
    var board = req.body;
    boardModel.initializeBoard(board).then(function (board) {
      res.json(board);
    });

    // before mongo:
    // board.numbers = [9, 3, 2, 5];

  }

  function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;

    pageModel
      .createPage(websiteId, page)
      .then(function (page) {
        res.json(page);
      }, function (err) {
        res.sendStatus(400).send(err);
      });
    // var newPage = {
    //     _id: (new Date()).getTime()+"",
    //     name: page.name,
    //     title: page.title,
    //     websiteId: websiteId
    // }
    // pages.push(newPage);
    // res.send(newPage);

  }

  function findAllPagesForWebsite(req,res) {
    var websiteId = req.params.websiteId;

    pageModel
      .findAllPagesForWebsite(websiteId)
      .then(function (pages) {
          res.json(pages);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
    // var resultSet=[];
    // for (var i in pages){
    //     if (pages[i].websiteId === websiteId){
    //         resultSet.push(pages[i]);
    //     }
    // }
    // res.send(resultSet);

  }
  function updatePage(req,res) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
      .updatePage(pageId, page)
      .then(function (stats) {
          console.log(stats);
          res.send(200);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
    // for (var i in pages){
    //     if(pages[i]._id === pageId){
    //         pages[i].name = page.name;
    //         pages[i].title = page.title;
    //         res.send(200);
    //     }
    // }
    // res.send(400);
  }
  function findPageById(req,res ) {
    var pageId = req.params.pageId;
    pageModel
      .findPageById(pageId)
      .then(function (page) {
          res.json(page);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function deletePage(req,res) {
    var pageId = req.params.pageId;
    pageModel
      .deletePage(pageId)
      .then (function (stats) {
          console.log(stats);
          res.send(200);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
    // for (var i in pages){
    //     if (pages[i]._id === pageId){
    //         pages.splice(i,1);
    //         res.send(200);
    //     }
    // }
    // res.send(400);
  }

  //////////////////////////////end





};