const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/forum');
const { sequelize } = require('./models');
const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/forum', forumRoutes);

const PORT = process.env.PORT || 3003;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
