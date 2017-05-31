const express = require('express')
const app = express()

app.use(express.static('dist'))
app.set('port', (process.env.PORT || 4000))

console.log('test')

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})