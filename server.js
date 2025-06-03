const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

mongoose.connect(process.env.Mongo_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
    const ShortUrls = await ShortUrl.find();
    res.render('index', {ShortUrls: ShortUrls});
});

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({full: req.body.fullUrl});
    res.redirect('/');
})

app.get("/:short_url", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.short_url});
    if(shortUrl == null)
        res.sendStatus(404)
    res.redirect(shortUrl.full);
    shortUrl.clicks++;
    shortUrl.save();
    
})

app.listen(process.env.PORT || 5000);