var express = require('express');
var router = express.Router();

let iiIndex = 0;

router.get('/', function(req, res, next) {
  res.render('index', {title: "CCC"});
});

router.post('/getHomePageData', function(req, res, next) {
  let theObj = {
                 iiIndex: iiIndex++,
                 Title: "Cloud Security System.",
                 Description: "This is my home page"
               };
  console.log("Sending home page JSON");
  res.status(201).send(theObj);
});

router.post('/getInfoPageData', function(req, res, next) {
  let theObj = {
                 iiIndex: iiIndex++,
                 Title: "My information page",
                 Description: "This is my project description page",
                 StudentId: "G11001234",
                 StudentName: "Joe Bloggs"
               };
  console.log("Sending info page JSON");
  res.status(201).send(theObj);
});

router.post('/getHelpPageData', function(req, res, next) {
  let theObj = {
                 iiIndex: iiIndex++,
                 Title: "My help page",
                 Description: "This is my help page where I describe how to use my App."
               };
  console.log("Sending help page JSON");
  res.status(201).send(theObj);
});

 router.post('/getWidgetsPageData', function(req, res, next) {
  let theObj = { iiIndex: iiIndex++, widgets: [
    { url: '/widgets/Big-Green-Widget.html',
      Title: "Big Green Widget",
      Image: 'http://192.168.1.100/:8000/images/greenWidget.jpg',
      Description: "This is a big green widget which is perfect for doing widgety stuff.",
      Price: "9.95",
      Currency: '€'},
      { url: '/widgets/Big-Blue-Widget.html',
      Title: "Big Blue Widget",
      Image: 'http://192.168.1.100/:8000/images/blueWidget.jpg',
      Description: "This is a big blue widget which is great for doing widgety things.",
      Price: "9.95",
      Currency: '€'},
    { url: '/widgets/Big-Red-Widget.html',
      Title: "Big Red Widget",
      Image: 'http://192.168.1.100:8000/images/redWidget.jpg',
      Description: "This is a big red widget which is also good for doing widgety stuff.",
      Price: "9.95",
      Currency: '€'},
    { url: '/widgets/Big-Green-Widget.html',
      Title: "Big Green Widget",
      Image: 'http://192.168.1.100:8000/images/greenWidget.jpg',
      Description: "This is a big green widget which is perfect for doing widgety stuff.",
      Price: "9.95",
      Currency: '€'},
    { url: '/widgets/Big-Blue-Widget.html',
      Title: "Big Blue Widget",
      Image: 'http://192.168.1.100:8000/images/blueWidget.jpg',
      Description: "This is a big blue widget which is great for doing widgety things.",
      Price: "9.95",
      Currency: '€'},
    { url: '/widgets/Big-Red-Widget.html',
      Title: "Big Red Widget",
      Image: 'http://192.168.1.100:8000/images/redWidget.jpg',
      Description: "This is a big red widget which is also good for doing widgety stuff.",
      Price: "9.95",
      Currency: '€'},
    { url: '/widgets/Big-Green-Widget.html',
      Title: "Big Green Widget",
      Image: 'http://192.168.1.100:8000/images/greenWidget.jpg',
      Description: "This is a big green widget which is perfect for doing widgety stuff.",
      Price: "9.95",
      Currency: '€'},
      { url: '/widgets/Big-Blue-Widget.html',
      Title: "Big Blue Widget",
      Image: 'http://192.168.1.100:8000/images/blueWidget.jpg',
      Description: "This is a big blue widget which is great for doing widgety things.",
      Price: "9.95",
      Currency: '€'},
    { url: '/widgets/Big-Red-Widget.html',
      Title: "Big Red Widget",
      Image: 'http://192.168.1.100:8000/images/redWidget.jpg',
      Description: "This is a big red widget which is also good for doing widgety stuff.",
      Price: "9.95",
      Currency: '€'},
    { url: '/widgets/Big-Green-Widget.html',
      Title: "Big Green Widget",
      Image: 'http://192.168.1.100:8000/images/greenWidget.jpg',
      Description: "This is a big green widget which is perfect for doing widgety stuff.",
      Price: "9.95",
      Currency: '€'},
    { url: '/widgets/Big-Blue-Widget.html',
      Title: "Big Blue Widget",
      Image: 'http://192.168.1.100:8000/images/blueWidget.jpg',
      Description: "This is a big blue widget which is great for doing widgety things.",
      Price: "9.95",
      Currency: '€'},
    { url: '/widgets/Big-Red-Widget.html',
      Title: "Big Red Widget",
      Image: 'http://192.168.1.100:8000/images/redWidget.jpg',
      Description: "This is a big red widget which is also good for doing widgety stuff.",
      Price: "9.95",
      Currency: '€'}
     ]
   };
  console.log("Sending widgets page JSON");
  res.status(201).send(theObj);
});

module.exports = router;
