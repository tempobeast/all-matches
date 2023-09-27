const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000;
const cors = require('cors')

const app = express();

//Enable body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cors())

app.use('/openai', require('./routes/openAiRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))