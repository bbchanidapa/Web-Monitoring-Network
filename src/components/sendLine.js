var express = require('express')
var app = express()
var server = require('http').Server(app)
var bodyParser = require('body-parser')
var api_key = 'key-de3c04a95a1fbaff3c200907518b3376';
var domain = 'sandbox700d900b0bdb4b5cab876a6af395f94e.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var mail = ['monitor.sheet1@gmail.com','monitor.sheet2@gmail.com']
var axios = require('axios')
var url = "https://apisheet.herokuapp.com/16VAMJIjLcAF4XVJqw8OisDrlCOjKh9cnyBDRK9HlTdg/sheet1!B:C"
var text = ''
var LINEBot = require('line-messaging')
var _ = require('lodash')
var bot = LINEBot.create({
  channelID: '1514835122',
  channelSecret: '949c00bc9bd530da0eaa90ab6c933da8',
  channelToken: 'x6fzf6vrmlXKmyvos3ki/e+lRxuQYKf0NU7Ajl0itVDgm/Zwg2Ua3JaF3DCfOhSrTRuCIgDeP0K9a7VZAJqItP1NbF9ZVLicpQpU9O1fuaUl7Ea+A/UmJMpyNbRqpX51SxrSSZXppuIrlPBQ7FzWYAdB04t89/1O/w1cDnyilFU='
}, server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('port', (process.env.PORT || 8001))
bot.webhook('/webhook')

var time = 0
var obj = []

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.get(url).then(res => {

  	let values  = res.data.values
    let length  = values.length
    let before  = JSON.parse(values[length-2][1])
    let after   = JSON.parse(values[length-1][1])
    let status = true 

    if(after['cpu'].length > 0){
      let txt = ''
      for(let i in after['cpu']){
        let val =  Object.keys(after['cpu'][i])
        txt += ( val.toString()+':'+after['cpu'][i][val]+ '% , ')
      }
      sendLine('Your CPU was used more then 80%. Please check!','('+txt.substring(0,txt.length-1)+')')
      obj.push('Your CPU was used more then 80%. Please check! ('+txt.substring(0,txt.length-1)+')')
    }

    if(after['mem'].length > 0){
      let txt = ''
      for(let i in after['mem']){
        let val =  Object.keys(after['mem'][i])
        txt += ( val.toString()+' '+after['mem'][i][val]+ ',')
      }
      sendLine('Your memory was used more than 1 GB!','('+txt.substring(0,txt.length-1)+')')
      obj.push('Your memory was used more than 1 GB! ('+txt.substring(0,txt.length-1)+')')
    }


//******
setTimeout(function(){
    let txtMail = []
    let title = ''
    for (let index in before['interface']) { 
        for (let sw in before['interface'][index]){ 
            let val = _.difference(after['interface'][index][sw],before['interface'][index][sw])
            val = val.toString() 
            if (val != ''){
                if (status) {
                  title = "In this time, The Port's status was down."
                  setTimeout(function(){ bot.pushTextMessage('U65a85e9b64b09ff25848781811906cb8', "In this time, The Port's status was down.") },time+=1000)
                  status = false
                }
                if (val.length > 0){ 
                  txtMail.push('( '+ sw + ' = '+ val + ' )')       
                  setTimeout(function(){ bot.pushTextMessage('U65a85e9b64b09ff25848781811906cb8','( '+ sw + ' = '+ val + ' )')   },time+=1000)
                }

            }//check null
        }    
    }
    
    obj.push(title+txtMail.toString())
    sendMail(obj.toString())

},time+=1000)
//****

})


function sendLine (title,mes){
  setTimeout(function(){ bot.pushTextMessage('U65a85e9b64b09ff25848781811906cb8',title) },time+=1000)
  setTimeout(function(){ bot.pushTextMessage('U65a85e9b64b09ff25848781811906cb8',mes) },time+=1000)
}

function sendMail (text){
  for (let index in mail) {
      var data = {
        from: 'FITM Monitoring <postmaster@sandbox700d900b0bdb4b5cab876a6af395f94e.mailgun.org>',
        to: mail[index],
        subject: 'Network problem',
        text: text
      }

      mailgun.messages().send(data, function (error, body) {
        console.log(body)
      })
  }
}

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})



