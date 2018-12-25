const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const clearCache = require('../middlewares/clearCache');
const Day = mongoose.model('Day');

module.exports = app => {
  app.get('/api/days/:id', requireLogin, async (req, res) => {
    const days = await Day.find({_user: req.user.id});

    res.send(days);
  });

  app.get('/api/days', requireLogin, async (req, res) => {
    const days = await Day
      .find({ _user: req.user.id })
      .cache({ key: req.user.id});

    res.send(days);
  });

  app.post('/api/days', requireLogin, clearCache, async (req, res) => {
    const { title, content, imageUrl } = req.body;

    const day = new Day({
      title,
      content,
      imageUrl,
      _user: req.user.id
    });

    try {
      await day.save();
      res.send(day);
    } catch (err) {
      res.send(400, err);
    }

  });
};
