const express = require('express');
const mongoose = require('mongoose');
const datetime = require('./models/date_time');
const methodOverride = require('method-override');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const PORT = 3000;

mongoose.connect('mongodb://mongo:27017/demo-app-db', {useNewUrlParser: true, useUnifiedTopology: true })
.then( ()=> console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/demo', async (req, res) => {
    const dateCollection = await datetime.find()
    res.render('index', { dateCollection: dateCollection })
});

app.post('/demo', async (req, res) => {
    const dateandtime = new datetime({
        date: req.body.date
    })
    await dateandtime.save();
    res.redirect('/demo');
});

app.post('/demo/datetime', async (req, res) => {
    const dateandtime = new datetime({
        date: req.body.date
    })
    await dateandtime.save();
    res.send(dateandtime);
});

app.delete('/demo/clearall', async (req, res) => {
    try{
        await datetime.deleteMany()
        console.log('Successfully deleted all data');
      } catch(err){
          console.log(err)
      }
    res.send('Successfully deleted all data');
});

app.listen(PORT, () => console.log(`Demo ap server is running..`));
console.log('Use http://localhost:80/demo for UI')
console.log('Use curl -X POST http://localhost:80/demo/datetime to add date & time stamps')
console.log('Use curl -X DELETE http://localhost:80/demo/clearall to clear all date & time stamps')

