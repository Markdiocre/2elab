const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send({
    message: "You did a get request"
  })
})

app.post('/',(req, res)=>{
    res.send('This is a post request updated')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})