const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send("Bot đã hoạt động")
})

function keepAlive() {
  server.listen(3000,  () => {
    console.log("server đã hoạt động")
  })
}

module.exports = keepAlive