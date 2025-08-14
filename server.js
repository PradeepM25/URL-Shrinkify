const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); 

app.get('/', async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.render('index', { ShortUrls: shortUrls });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/shortUrls', async (req, res) => {
  try {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Could not shorten URL');
  }
});

app.get('/:short_url', async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.short_url });
    if (!shortUrl) return res.sendStatus(404);

    shortUrl.clicks++;
    await shortUrl.save();
    res.redirect(shortUrl.full);
  } catch (err) {
    console.error(err);
    res.status(500).send('Redirection error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
