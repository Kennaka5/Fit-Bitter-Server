require('./models/User')
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

// this is the connection string from MongoDB
const mongoUri = 'mongodb+srv://Kenlearn:learn5@cluster0-7u60w.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
});

mongoose.connection.on('error', (err) => {
    console.error('error connecting to mongo instance', err)
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3001, () => {
    console.log('Listening on port 3001')
});