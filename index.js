const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

var jobs = ['Babysitter','Barman'];

app.get('/',(req,res) => {
    res.render('index',{jobs:jobs});
});
app.get('/delete/:id',(req,res) => {
    jobs = jobs.filter((val,index) => {
        if(index != req.params.id){
            return val;
        }
    })
    res.render('index',{jobs:jobs});
});
app.post('/',(req,res) => {
    jobs.push(req.body.job);
    res.render('index',{jobs:jobs})
})

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
});