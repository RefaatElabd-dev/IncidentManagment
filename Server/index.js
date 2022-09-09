const express = require('express');
const mongoose = require('mongoose');
const incidentRoute = require('./Routes/incident');
const userRoute = require('./Routes/user');
const cors = require('cors');

const errorMiddleware = require('./middlewares/error');

const app = express();

const { MONGODB_URI = 'mongodb://localhost:27017/IncidentDB' } = process.env;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch(console.log);

app.use(express.json());
app.use(cors());

app.use('/Incident', incidentRoute);
app.use('/User', userRoute);

app.use('*', (req, res, next) => {
  res.status(404).json({ err: 'NOT_FOUND' });
});

app.use(errorMiddleware);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log('APP is up and ready on:', PORT);
})
