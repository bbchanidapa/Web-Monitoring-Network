<template>
  <div class="container "><br>

    <div v-if="load == false "><p class="title is-3" style="color:black;"><b> Loading... </b></p> </div>
    <div class="columns "  v-if="load == true ">
      <div class="column is-2">
        <div class="box" >
          <article class="media" v-for="index in detail" @click="showChart(index.ip)">
            <div class="media-left">
              <figure class="image is-32x32">
                <img v-if="index.name == 'SW4503' " src="../img/sw-L3.png" alt="Image">
                <img v-if="index.name == 'SW-3850' " src="../img/sw-L3.png" alt="Image">
                <img v-if="index.name == 'ISR-4451' " src="../img/router.png" alt="Image">
                <img v-if="index.name != 'SW4503' && index.name != 'SW-3850' && index.name != 'ISR-4451'" src="../img/sw-L2.png" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p v-if="index.ip != '10.9.99.1' "><strong>{{index.name}}</strong> <small>{{index.ip}}</small> </p>
                <p v-if="index.ip == '10.9.99.1' "><strong>ISR-4451</strong> <small>{{index.ip}}</small></p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="column is-half" >
        <div class="box" style="height:100%;">
          <p class="title is-2"><b>Internet Traffic {{showDetail.name}}</b></p>

          <div><line-chart :chart-data="chartData" :options="option" :width="400" :height="300"></line-chart></div><br>

          <span class="tag is-medium" style="width:20%; background:rgba(54,162,235,1);">Inbound</span> 
          <span class="title is-6"><b>Min :</b>{{minin}}<b> Max :</b>{{maxin}}<b> Average:</b>{{averagein}}</span><br>
          <span class="tag is-medium" style="width:20%; background:rgba(255,161,181,1);">Outbound</span>
          <span class="title is-6"><b>Min :</b>{{minout}}<b> Max :</b>{{maxout}}<b> Average:</b>{{averageout}}</span>
        </div>
      </div>
      <span style="margin-right:1%"></span>
      <div class="box column is-one-third" style="margin-top:1%;margin-bottom:1%"><br>   
        <div style="margin-left:6%;height:100%;" >

          <div class="box" id="top"  style="box-shadow:none; ">
            <span class="title is-4" style="color:black;"><b>IP Address</b>({{showDetail.ip}})</span><br>
            <span class="title is-4" style="color:black;"><b>Model : </b>{{showDetail.ios}}</span><br>
            <span class="title is-4" style="color:black;"><b>IOS : </b>{{software}}</span><br>
            <span class="title is-4" style="color:black;"><b>Version  : </b>{{version}}</span><br><br>
            <p class="title is-4" style="margin-bottom:0px; color:black;"><i class="fa fa-clock-o"></i> <b>Uptime: {{ showDetail.uptime }} Days</b></p>  
          </div>

          <div class="columns"> 
            <div class="box columns" id="boxLeft" :style=" 'background-color:'+ colorDetail.temp ">
              <p class="title is-4"><i class="fa fa-thermometer-half"></i><b> {{showDetail.temp}} C</b></p>
            </div>
            <div class="box columns" id="boxRight" :style="'background-color:'+ colorDetail.mem  ">
              <p class="title is-4"><i class="fa fa-hdd-o" ></i> <b> {{showDetail.mem}}</b></p>
            </div>
          </div>
          <div class="columns" style="margin-bottom: 0rem;">      
           <div class="box columns" id="boxLeft" :style=" 'background-color:'+ colorDetail.cpu ">
            <p class="title is-4"><i class="fa fa-tachometer"></i> <b>{{showDetail.cpu}}%</b></p>
          </div>
          <div class="box columns"  id="boxRight" :style=" 'background-color:'+ colorDetail.warning ">
            <p class="title is-4"><i class="fa fa-heartbeat"></i> <b>Health</b></p>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</template> 

<script>
  /*eslint-disable */
  import axios from 'axios'
  import lineChart from './lineChart'

  export default {
    name: 'device',
    components: {
      lineChart
    },
    computed: {
      chartData () {
        return {
          labels: this.time,
          datasets: [{
            label: "Inbound",
            lineTension: 0.1,
            backgroundColor: "rgba(54,162,235,0.2)",
            borderColor: "rgba(54,162,235,1)",
            borderCapStyle: 'butt',
            pointBorderColor: "rgba(54,162,235,1)",
            spanGaps: true,
            pointBackgroundColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(54,162,235,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            showLine:true,
            tension: 0.4,
            data: this.dataChart[this.ip]['inbound']
          }, {
            label: "Outbound",
            lineTension: 0.1,
            backgroundColor: "rgba(255,161,181,0.2)",
            borderColor: "rgba(255,161,181,1)",
            borderCapStyle: 'butt',
            pointBorderColor: "rgba(255,161,181,1)",
            pointBackgroundColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,161,181,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            showLine:true,
            tension: 0.4,
            data: this.dataChart[this.ip]['outbound']
            
          }]
        }

      }

    },
    mounted: function () {
      let _this = this
      _this.getSheet() 
  },
  data () {
    return {
      ip: '10.77.4.1',
      urlDetail: "https://get-api-myproject.herokuapp.com/1USfbjHmVE0vpOPvq8mDpGbad-zX6PTDxUeQBDlcs6JI/sheet1!C:C",//pi
      urlDevice: "https://get-api-myproject.herokuapp.com/1WXmhTnJ9Dw6ana0tqtrV1mq2tyzM6TeErNA-_6aZ2fA/sheet1!C:C",
      urlTime: "https://get-api-myproject.herokuapp.com/1WXmhTnJ9Dw6ana0tqtrV1mq2tyzM6TeErNA-_6aZ2fA/sheet1!B:B",
      dataChart: {
        '10.77.4.1': { inbound:[], outbound:[] },
        '10.77.7.2': { inbound:[], outbound:[] },
        '10.77.1.2': { inbound:[], outbound:[] },    
        '10.77.3.2': { inbound:[], outbound:[] },
        '10.77.5.2': { inbound:[], outbound:[] },
        '10.77.8.2': { inbound:[], outbound:[] },
        '10.77.7.1': { inbound:[], outbound:[] },
        '10.9.99.1': { inbound:[], outbound:[] }
      },
      averagein: 0,
      averageout: 0,
      maxin: '',
      minin: '',
      minout: '',
      maxout: '',
      time:[],
      chartJs: '',
      detail: '',
      showDetail: '',
      software: '',
      version: '',
      colorDetail: {},
      option: {
        legend :{display: false},
        responsive: true,
        bezierCurve: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{      
            stacked: false,
            gridLines: {
              display: true
            }
         }],
          yAxes: [{
            stacked: false,
            gridLines: {
              display: true
            }
          }]
        }
      },
      load: false,
      traffic: '',
      data: {
        '10.77.4.1': {},
        '10.77.1.2': {},
        '10.77.7.2': {},
        '10.77.3.2': {},
        '10.77.5.2': {},
        '10.77.8.2': {},
        '10.77.7.1': {},
        '10.9.99.1': {}
      }

    }
  },
  methods: {
    getSheet () {
      axios.get(this.urlDetail).then(res => {
        let values = res.data.values
        let length  = values.length-1
        this.detail = JSON.parse(values[length][0])
        let ip = '10.77.4.1'

        for(let index in this.detail){             
          if(ip === this.detail[index]['ip']){
            this.showDetail = this.detail[index]
                  //************* CPU ****************
                  let cpu =  this.detail[index]['cpu']
                  if (cpu < 60){ 
                    this.colorDetail['cpu'] = '#00ffcc;'
                    this.colorDetail['warning'] =  '#00ffcc;'  
                  } 
                  else if (cpu >= 60 && cpu < 85){
                   this.colorDetail['cpu'] = '#f0901c;' 
                   this.colorDetail['warning'] =  '#be353e;' 
                 } 
                 else if (cpu >= 85 && cpu <= 100){
                   this.colorDetail['cpu'] = '#be353e;'
                   this.colorDetail['warning'] =  '#be353e;'
                 } 
                  //************* Memory ****************
                  let mem =  this.detail[index]['mem']
                  mem = mem.substring(mem.length-2,mem.length)
                  if (mem !== 'GB'){ 
                    this.colorDetail['mem'] = '#00ffcc;'
                    this.colorDetail['warning'] =  '#00ffcc;'  
                  } 
                  else{
                   this.colorDetail['mem'] = '#fcdb3b;' 
                   this.colorDetail['warning'] =  '#be353e;' 
                 }
                  //************* temp ****************
                  let temp =  this.detail[index]['temp']
                  if (temp < 38){ 
                    this.colorDetail['temp'] = '#00ffcc;'
                    this.colorDetail['warning'] =  '#00ffcc;'  
                  } 
                  else{
                   this.colorDetail['temp'] = '#fcdb3b;' 
                   this.colorDetail['warning'] =  '#be353e;' 
                 } 
                 if(ip === '10.77.4.1'){
                   this.detail[index]['ios'] = 'Cisco Catalyst 4500 L3 Switch'
                   this.software = 'cat4500e-LANBASEK9-M'
                   this.version = '15.0(2)SG1'
                 }
               }      
             }
      })
      
      axios.get(this.urlTime).then(res => {
        let values = res.data.values
        let length  = values.length-12
        for (length ; length < values.length; length++) {
          this.time.push(values[length][0])
        }
      })
      axios.get(this.urlDevice).then(res => {
         let values = res.data.values
        let length  = values.length-12

        for (length ; length < values.length; length++) {
          let after = JSON.parse(values[length][0])

          for (let index in after) {   
            for (let ip in after[index]){

              let inboundAfter = parseFloat(after[index][ip]['inbound'].substring(0,after[index][ip]['inbound'].search(" ")))
              let outboundAfter =  parseFloat(after[index][ip]['outbound'].substring(0,after[index][ip]['outbound'].search(" ")))
              let inbounds = parseFloat(inboundAfter.toFixed(2))
              let outbounds =  parseFloat(outboundAfter.toFixed(2))

              if(ip === '10.77.4.1'){
                this.dataChart[ip]['inbound'].push(inbounds)
                this.dataChart[ip]['outbound'].push(outbounds) 
              }
              else if(ip === '10.77.7.2'){
                this.dataChart[ip]['inbound'].push(inbounds)
                this.dataChart[ip]['outbound'].push(outbounds) 
              }
              else if(ip === '10.77.1.2'){
                this.dataChart[ip]['inbound'].push(inbounds)
                this.dataChart[ip]['outbound'].push(outbounds)  
              }
              else if(ip === '10.77.3.2'){
                this.dataChart[ip]['inbound'].push(inbounds)
                this.dataChart[ip]['outbound'].push(outbounds)  
              }
              else if(ip === '10.77.5.2'){
                this.dataChart[ip]['inbound'].push(inbounds)
                this.dataChart[ip]['outbound'].push(outbounds)  
              }
              else if(ip === '10.77.8.2'){
                this.dataChart[ip]['inbound'].push(inbounds)
                this.dataChart[ip]['outbound'].push(outbounds)  
              }
              else if(ip === '10.77.7.1'){
                this.dataChart[ip]['inbound'].push(inbounds)
                this.dataChart[ip]['outbound'].push(outbounds)  
              }
              else if(ip === '10.9.99.1'){
                this.dataChart[ip]['inbound'].push(inbounds)
                this.dataChart[ip]['outbound'].push(outbounds)  
              }

              }//for
            }//for      
            
          } 
          this.showChart ('10.77.4.1')
        })  

    },//funtion
    filterArray (arr){
      let inbounds  = 0
      let outbounds  = 0
      for(let index in arr){
        console.log(  )
        let inbound = parseFloat( arr[index]['in'].substring(0,arr[index]['in'].search(" "))  )
        let outbound = parseFloat( arr[index]['out'].substring(0,arr[index]['out'].search(" "))  )
        inbounds +=inbound  
        outbounds +=outbound 
      }
      console.log({in: inbounds.toFixed(2),out: outbounds.toFixed(2)})
      return {in: inbounds.toFixed(2),out: outbounds.toFixed(2)}
    },
    filter (index_,ip_){
        let name = []
        for(let i in this.traffic[index_]['detail']){

          let nameInterface = this.traffic[index_]['detail'][i]['interface']
          let inbound = this.traffic[index_]['detail'][i]['inbound']
          let outbound = this.traffic[index_]['detail'][i]['outbound']
          let status = this.traffic[index_]['detail'][i]['status']

          //**********4451***********
          if (nameInterface == 'GigabitEthernet0/0/0'){
            this.data[ip_]['Gi0/0/0'] = {
              status: status,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'GigabitEthernet0/0/2'){
            this.data[ip_]['Gi0/0/2'] = {
              status: status,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          //**********3850***********
          else if (nameInterface == 'GigabitEthernet1/0/1'){
            this.data[ip_]['Gi1/0/1'] = {
              status: status,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'GigabitEthernet1/0/2'){
            this.data[ip_]['Gi1/0/2'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'Vlan304'){
            this.data[ip_]['Vlan304'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          //**********4503***********
          else if (nameInterface == 'GigabitEthernet2/1'){
            this.data[ip_]['Gi2/1'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'GigabitEthernet2/2'){
            this.data[ip_]['Gi2/2'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'GigabitEthernet2/3'){
            this.data[ip_]['Gi2/3'] = {
              status: status,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'GigabitEthernet2/6'){
            this.data[ip_]['Gi2/6'] = {
              status: status,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'TenGigabitEthernet3/41'){
            this.data[ip_]['Ten3/41'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'TenGigabitEthernet3/43'){
            this.data[ip_]['Ten3/43'] = {
              status: status,
              in:inbound,
              out:outbound 
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'TenGigabitEthernet3/45'){
            this.data[ip_]['Ten3/45'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          else if (nameInterface == 'TenGigabitEthernet3/47'){
            this.data[ip_]['Ten3/47'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          //**********Rshop***********
          else if (nameInterface == 'GigabitEthernet0/48'){
            this.data[ip_]['Gi0/48'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          //**********R101C***********
          else if (nameInterface == 'GigabitEthernet0/49'){
            this.data[ip_]['Gi0/49'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          //**********R124***********
          else if (nameInterface == 'GigabitEthernet0/51'){
            this.data[ip_]['Gi0/51'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
          //**********R415***********
          else if (nameInterface == 'GigabitEthernet0/50'){
            this.data[ip_]['Gi0/50'] = {
              status: status ,
              in:inbound,
              out:outbound
            }
            name.push(this.traffic[index_]['detail'][i]) 
          }
 
          
        }
        return name
      },
    showChart (ip){      
      this.averagein = 0
      this.averageout = 0
      this.maxin = 0
      this.minin = 0
      this.maxout = 0
      this.minout = 0
      this.chartJs = ''
      this.ip = ip
      
      for (let index = 0; index < 12 ; index++){
       this.averagein += this.dataChart[ip]['inbound'][index]
       this.averageout += this.dataChart[ip]['outbound'][index]
     }
     this.averagein = (this.averagein/12).toFixed(2) +'Gbps' //" Mbps"
     this.averageout = (this.averageout/12).toFixed(2)  +'Gbps' //" Mbps"

     this.maxin = Math.max.apply(null, this.dataChart[ip]['inbound']).toFixed(2) +'Gbps' //' Mbps'
     this.minin = Math.min.apply(null, this.dataChart[ip]['inbound']).toFixed(2) +'Gbps' //' Mbps'
     this.maxout = Math.max.apply(null, this.dataChart[ip]['outbound']).toFixed(2)+'Gbps' //' Mbps'
     this.minout = Math.min.apply(null, this.dataChart[ip]['outbound']).toFixed(2) +'Gbps' //' Mbps'   

     for(let index in this.detail){             
      if(ip === this.detail[index]['ip']){
        if(ip == '10.9.99.1')this.detail[index]['name'] = 'ISR-4451'

        this.showDetail = this.detail[index]
            
                //************* CPU ****************
                let cpu =  this.detail[index]['cpu']
                if (typeof cpu == 'number'){
                    if (cpu < 60){ 
                      this.colorDetail['cpu'] = '#00ffcc;'
                      this.colorDetail['warning'] =  '#00ffcc;' 
                    } 
                    else if (cpu >= 60 && cpu < 85){
                     this.colorDetail['cpu'] = '#f0901c;' 
                     this.colorDetail['warning'] =  '#be353e;' 
                   } 
                   else if (cpu >= 85 && cpu <= 100){
                     this.colorDetail['cpu'] = '#be353e;'
                     this.colorDetail['warning'] =  '#be353e;'
                   }
                }else{
                  this.detail[index]['cpu'] = '-'
                  this.colorDetail['cpu'] = '#fffacd;'
                }
                //************* Memory ****************
                let mem =  this.detail[index]['mem']
                if (typeof mem == 'string'){
                    mem = mem.substring(mem.length-2,mem.length)
                    if (mem !== 'GB'){ 
                      this.colorDetail['mem'] = '#00ffcc;'
                      this.colorDetail['warning'] =  '#00ffcc;'  
                    } 
                    else if (mem == 'GB'){
                     this.colorDetail['mem'] = '#fcdb3b;' 
                     this.colorDetail['warning'] =  '#be353e;' 
                    }
                }
                //************* Memory ****************
                let temp =  this.detail[index]['temp']
                if (typeof temp == 'number'){
                    if (temp < 38){ 
                      this.colorDetail['temp'] = '#00ffcc;'
                      this.colorDetail['warning'] =  '#00ffcc;'  
                    } 
                    else if (temp > 38){
                      this.colorDetail['temp'] = '#fcdb3b;' 
                      this.colorDetail['warning'] =  '#be353e;' 
                    }
                }else{
                  this.colorDetail['temp'] = '#fffacd;' 
                }

               if(ip === '10.77.4.1'){
                   this.detail[index]['ios'] = 'Cisco Catalyst 4500 L3 Switch'
                   this.software = 'cat4500e-LANBASEK9-M'
                   this.version = '15.0(2)SG1'
              }
               else if(ip === '10.77.7.1'){
                 this.detail[index]['ios'] = 'Catalyst L3 Switch'
                 this.software = 'CAT3K_CAA-UNIVERSALK9-M'
                 this.version = '03.06.05E'
               }
               else if(ip === '10.9.99.1'){
                 this.detail[index]['ios'] = 'ISR'
                 this.software = 'X86_64_LINUX_IOSD-UNIVERSALK9-M'
                 this.version = '15.5(3)S4b'
               }
               else{
                 this.detail[index]['ios'] = 'Cisco C3560  Switch'
                 this.software = 'C3560-IPSERVICES-M'
                 this.version = '12.2(50)SE5'
               }
             }      
           }
          this.load = true
    }//function

//******************* End**************************
}
}
</script>

<style scoped>

  #boxRight {
    padding-right: 0px;
    margin-left:6%;
    width:48%;
    border-radius: 0px;
    height: 100px;
  }
  #boxLeft{
    padding-left: 10%;
    height: 100px;
    width:48%;
    border-radius: 0px;
  }
   .tag.is-medium{
    border-radius:8px;
    width: 50%;
    color: #fff;
    margin-top:1%;
  }
</style>
