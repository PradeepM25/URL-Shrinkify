const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();

mongoose.connect(process.env.Mongo_URI)
  .then(() => {
    console.log('✅ MongoDB connected (Atlas)');
  })
  .catch((err) => {
    console.error('❌ MongoDB Atlas connection error:', err);
  });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); 

app.get('/', async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    console.log(shortUrls)
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

app.delete('/:short_url', async (req, res) => {
  try {
    const short_url = req.params.short_url;
    console.log('Received short_url:', short_url);
    const exist = await ShortUrl.findOne({ short: short_url });
    console.log(exist)
    if (!exist) {
      res.status(400).send({ message: 'There is no such url', success: false });
      throw new Error("No such url found")
    }

    await ShortUrl.deleteOne({ _id: exist._id });
    res.status(200).send({ message: 'Deleted successfully', success: true });
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: 'Internal server error', success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
