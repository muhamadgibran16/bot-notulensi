require('dotenv').config();
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routers/router')
const app = express();

app.use(cors({
  credentials: true,
  origin: '*'
}))
app.use(morgan('tiny'))
app.disable('x-powered-by') 
app.use(express.json())
app.use(router)


const port = 3000;
app.listen(port, () => {
  console.log(`Bot Google Meet berjalan di http://localhost:${port}`);
});