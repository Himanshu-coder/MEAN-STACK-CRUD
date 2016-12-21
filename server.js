var express = require("express");
var bodyParser = require("body-parser");

var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds019856.mlab.com:19856/star-wars-quote', ['friends']);
const app = express();
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
});
app.use(bodyParser.urlencoded({
	extended: true,
	limit: '52428800',
	type: 'application/x-www-form-urlencoding'

}));

app.use(bodyParser.json({
	limit: '52428800',
	type: 'application/json'
}))

/*app.get('/',function(req,res){
res.sendfile(__dirname+'/form.html');  
})*/
app.use('/', express.static(__dirname + '/public/'))
// app.use('/', express.static(__dirname + '/form.html'));
// app.use('/', express.static('form.html'));
// app.use('/NewFolder', express.static(__dirname + '/'));
// console.log('hello');

// app.use(express.static(__dirname + '/'))


app.get('/search', function (req,res){
  //tostring not required for mongojs
  var data = db.friends.find(function(err, result){
    // res.send(result);
    res.send(JSON.stringify(result));
  });

});

app.post('/save', function(req, res){
    
    console.log(req.body);
    
    db.friends.insert(req.body, function(err, result){
        if(err) console.log(err);
        
        res.send(result);
    })
    
})

    app.post('/remove', function(req, res) {
    console.log(req.body._id);
    db.friends.remove( {_id: mongojs.ObjectId(req.body._id)}, (err, result) => {
    if(err) console.log(err)
    res.send(result);
    console.log('Deleted');
      
    })
})

app.post('/update', function(req, res) {
    
    console.log(req.body);
    
    db.friends.findAndModify({ 
      query: { _id: mongojs.ObjectId(req.body._id) },
      update: { $set: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        home: req.body.home,
        face: req.body.face
        
      }},
      new: true
      }, (err, result) => {
        
        if(err) console.log(err)
        
        res.send(result);
        
      
    })
})

app.get('/dashboard', function(req, res) {
  
  var final = {};
  db.friends.find((err, result) => {
    if(err) return console.log(err)
    final.totalfriends = JSON.stringify(result.length);
    console.log(result.length);
    res.send((final));
  })
  
  
})