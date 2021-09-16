const express = require("express")
const cors = require("cors")
const app = express()
const fs = require("fs");
const https = require("https");
const axios = require("axios").default
const bodyParser = require("body-parser")

app.use(bodyParser.json())

var corsOptions = {
  origin: [
    "https://macarrowstudio.com",
    "https://www.macarrowstudio.com",
    "http://134.0.118.193",
    "http://134.0.118.193:3000",
  ],
  optionsSuccessStatus: 200,
}

const keysDir = "/etc/ssl/";
const options = {
  key  : fs.readFileSync(keysDir + "macarrowstudio.key"),
  ca   : fs.readFileSync(keysDir + "certrequest.csr"),
  cert : fs.readFileSync(keysDir + "macarrowstudio.crt")
};

const chatId = -598218104
const botToken = "1979480195:AAHoGddof2q_4pg2jHnFxvWIdNNErmg1X-0"

app.options("/message", cors())

app.post("/message", cors(corsOptions), function (req, res) {
  const { budget, description, email, phone } = req.body

  let fields = [
    "<b>Budget</b>: " + encodeURI(budget),
    "<b>Phone</b>: " + encodeURI(phone),
    "<b>Email</b>: " + encodeURI(email),
    encodeURI(description),
  ]
  let msg = ""

  fields.forEach(field => {
    msg += field + "\n"
  })

  axios
    .post(
      `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${msg}`
    )
    .then(() => {
      res.send({ status: "ok" })
    })
    .catch(e => {
      res.status(500).send(e.message)
    })
})

https.createServer(options, app).listen(3000);
