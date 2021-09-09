const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios').default;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

var corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}


const chatId = -598218104
const botToken = '1979480195:AAHoGddof2q_4pg2jHnFxvWIdNNErmg1X-0'

app.options('/message', cors())

app.post('/message', cors(corsOptions), function (req, res) {
  const { budget, description, email, phone } = req.body;

  let fields = [
    '<b>Budget</b>: ' + budget,
    '<b>Phone</b>: ' + phone,
    '<b>Email</b>: ' + email,
    description
  ]
  let msg = ''

  fields.forEach(field => {
    msg += field + '\n'
  });

  axios.post(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${msg}`)
    .then(() => {
      res.send({ status: 'ok' })
    })
    .catch(() => {
      res.status(500).send('Something broke!');
    })
})

app.listen(3000)