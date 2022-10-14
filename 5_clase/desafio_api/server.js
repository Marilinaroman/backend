const express = require('express')

const app = express()

app.listen(8080, () =>console.log('servidor 8080'))
app.use(express.static("public"));

