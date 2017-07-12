<template>
<div class="container is-mobile">
  <br>
  <div v-if="load == false "><p class="title is-3" style="color:black;"><b> Loading... </b></p> </div>
  <div class="columns "  v-if="load == true ">
        <div class="column is-2" >
          <div class="box" style="height:100%; margin-right:5%;">
            <article class="media" v-for="index in detail">
              <div class="media-left">
               <!--  <strong>{{index.name}}</strong>{{index.ip}}
                <br>
                <span class="icon"><i class="fa fa-tachometer" style="color:#40e2bd;"></i></span>
                <strong class="is-6">Cpu:</strong>{{index.cpu}}% -->
                <figure class="image is-48x48">
                <img v-show="index.name == 'SW4503' " src="../img/sw-L3.png" alt="Image">
                <img v-show="index.name == 'SW-3850' " src="../img/sw-L3.png" alt="Image">
                <img v-show="index.name == 'ISP-4451' " src="../img/router.png" alt="Image">
                <img v-show="index.name != 'SW4503' && index.name != 'SW-3850' && index.name != 'ISP-4451'" src="../img/sw-L2.png" alt="Image">
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p v-show="index.ip != '10.99.0.1' " style="padding-bottom:0rem;margin-bottom:0em;"><strong>{{index.name}}</strong> <!-- <small>{{index.ip}}</small> --> </p>
                  <p v-show="index.ip == '10.99.0.1' " style="padding-bottom:0rem;margin-bottom:0em;"><strong>ISR-4451</strong> <!-- <small>{{index.ip}}</small> --></p>
                  <p ><!-- <i class="fa fa-tachometer" > </i>--> Cpu: {{index.cpu}}%</p><!-- style="color:#40e2bd;" -->
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="column is-half">
          <div class="box" >
            <p class="title is-3"><b>Internet Traffic</b></p>
            <div><line-chart-dashboard :chart-data="dataLineChart" :options="option" :width="400" :height="300"></line-chart-dashboard></div>
            <span class="tag is-medium" id="div-in" style="width:20%; background-color:#36A2EB;">Inbound</span>
            <span class="title is-6"><b>Min :</b>{{minin}}<b> Max :</b>{{maxin}}<b> Average:</b>{{averagein}}</span><br>
            <span class="tag is-medium" id="div-out" style="width:20%; background-color:#FFA1B5;">Outbound</span>
            <span class="title is-6"><b>Min :</b>{{minout}}<b> Max :</b>{{maxout}}<b> Average:</b>{{averageout}}</span>
          </div>
          <div class="box is-toggle is-fullwidth" style="height:27%;margin-top:0rem;">
             <!-- <p class="title is-4" style="line-height: 0;"><b>Event Log</b></p> -->
             <div class="field">
                <p class="title is-4" style="line-height: 0;"><b>Event Log</b></p>
                 <span v-for="(data,i) in dataEvent">
                   <p v-show="data['event'] == 'status' ">{{dateEvent[i]}} {{timeEvent[i]}}{{' Interface ' + data['data']+ ' is Down' }}</p>
                   <p v-show="data['event'] == 'mem' ">{{dateEvent[i]}} {{timeEvent[i]}}{{' Your memory was used more than 1 GB! ' + data['data'] }}</p>
                   <p v-show="data['event'] == 'cpu' ">{{dateEvent[i]}} {{timeEvent[i]}}{{' Your CPU was used more then 80% ' + data['data'] }}</p>
                   <p v-show="data['event'] == 'temp' ">{{dateEvent[i]}} {{timeEvent[i]}}{{' Temperature is more than 55 C. ' + data['data'] }}</p>
                   
                 </span>
             </span>
              </div>
             <!-- <span v-show="dataEvent['status'].length > 0" v-for="status in dataEvent['status']" style="">
              {{' Date :'+ dateEvent }}{{' '+ timeEvent }}{{' Interface ' + toStr(status,'status')+ ' is Down' }}<br>
             </span>
             <span v-show="dataEvent['mem'].length > 0" v-for="mem in dataEvent['mem']">
               {{' Date :'+ dateEvent }}{{' '+ timeEvent }}{{toStr(mem,'mem')}}<br>
             </span>
             <span v-show="dataEvent['cpu'].length > 0" v-for="cpu in dataEvent['cpu']">
               {{' Date :'+ dateEvent }}{{' '+ timeEvent }}{{toStr(cpu,'cpu')}}<br>
             </span>
             <span v-show="dataEvent['temp'].length > 0" v-for="temp in dataEvent['temp']">
               {{' Date :'+ dateEvent }}{{' '+ timeEvent }}{{toStr(temp,'temp')}}<br>
             </span> -->

          </div>
        </div>
        <span style="margin-right:1%"></span>
        <div class="column is-one-third">
          <div class="box" style="height:100%">
            <p class="title is-3"><b>Traffic Ratio</b></p>
            <div><pie-chart :chart-data="doughnutChart" :options="{legend :{display: false},responsive: true, maintainAspectRatio: false}" :width="400" :height="300"></pie-chart></div>
            <div class="column is-12" style="padding-top:0rem; padding-bottom:0rem;">
                <span v-for="index in dataPieChart">
                  <span  class="tag is-medium" :style="'background-color: '+ index['color']">{{index['label']}}</span>
                  <span class="title is-6">{{index['value']+ unit}}</span>
                </span>
            </div>
          </div>
        </div>

    </div><!-- columns -->
</div><!-- end -->
</template> 
<script>
  /*eslint-disable */
  import axios from 'axios'
  import lineChartDashboard from './lineChartDashboard'
  import pieChart from './pieChart'

  export default {
    name: 'dashboard',
    components: {
      lineChartDashboard,pieChart
    },
    computed: {
      dataLineChart () {
        return {
          labels: this.time,
          datasets: [{
            label: "Inbound",
            lineTension: 0.1,
            backgroundColor: "rgba(54,162,235,0.2)",
            borderColor: "rgba(54,162,235,1)",
            borderCapStyle: 'butt',
            pointBorderColor: "rgba(54,162,235,1)",
            pointBackgroundColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(54,162,235,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            showLine:true,
            data: this.inbound
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
            data: this.outbound
          }]
        }

      },
      doughnutChart (){
        return  {
          labels: this.labels,
          datasets: [{        
            data: this.datas,
            backgroundColor: this.backgroundColors,
            hoverBackgroundColor: this.hoverBackgroundColor
          }]
        }
      }
   
  },
  mounted: function () {
    this.getSheet()
  },
  data () {
    return {
      urlDetail: "https://get-api-myproject.herokuapp.com/1USfbjHmVE0vpOPvq8mDpGbad-zX6PTDxUeQBDlcs6JI/sheet1!C:C",//Pi
      urlSw4503: "https://get-api-myproject.herokuapp.com/1r6aV9EUBw5imkeLhEmabMEc1BwkLdOfbTt4AHt_daFg/sheet1!B:C",
      urlRatio: "https://get-api-myproject.herokuapp.com/1g4ka-xMk_6QHbkUMFxt9HHQEl2wX96YTqp-lwBVHaf0/sheet1!C:C",
      urlEvent: "https://get-api-myproject.herokuapp.com/18I5Vg4u-ddK8CHAX2KQQxnxQVNJoiL_UAZdSfh87ANE/sheet1!A:C",
      //urlEvent: "https://apisheet.herokuapp.com/1upkBHoH-6SLY82pKZOKKiMwNSWcAXtNohoRJzSL6vG8/sheet1!A:C",  
      inbound: [],
      outbound: [],
      averagein: '',
      averageout: '',
      maxin: '',
      minin: '',
      minout: '',
      maxout: '',
      time:[],
      ChartDonut: '',
      dataPieChart: [],
      detail: '',
      data: [],
      option: {
        legend :{display: false},
        responsive: true, 
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
      dataDoughnutChart:{},
      labels:[],
      datas:[],
      backgroundColors:[],
      hoverBackgroundColor:[],
      load: false,
      dataEvent: [],
      timeEvent: [],
      dateEvent: [],
      unit: ''
    }
  },
  methods: {  
    toStr(arr,key){
      if(key == 'status'){
        let txt = ''
        for(let i in arr){
            txt += arr[i].substring(1,arr[i].length-1)
        }
        return txt.substring(1,txt.length-1)
      }
      else{
        return arr.toString()
      }
    },
    getSheet () {
      this.time = []
      this.inbound = []
      this.outbound = []
      this.dataPieChart = []
      this.averagein = 0
      this.averageout = 0
      var count = 0
      this.maxin = 0
      this.minin = 0
      this.maxout = 0
      this.minout = 0
      axios.get(this.urlDetail).then(res => {
        let values = res.data.values
        let length  = values.length-1
        this.detail = JSON.parse(values[length][0])
      })
      axios.get(this.urlEvent).then(res => {
        let values = res.data.values
        let length  = values.length-2
        let arr = []

        for (length ; length < values.length; length++) {
          let json = JSON.parse( values[length][2])
            for(let i in json){
              for(let c in json[i]){
                if(Object.keys(json) != '' && this.dataEvent.length < 6){
                  this.dataEvent.push({
                    event: i,
                    data: this.toStr(json[i][c],i)
                  })
                  this.dateEvent.push( values[length][0] ) 
                  this.timeEvent.push( values[length][1] )
                  
                }
                
              }     
            }

        }
       
      })
      axios.get(this.urlSw4503).then(res => {
        let values = res.data.values
        let length  = values.length-12
       
      for (length ; length < values.length; length++) {
        let after = JSON.parse(values[length][1] )
        console.log('afterIn',afterIn)
        let afterIn = Number(after['inbound'].substring(0,after['inbound'].search(" ")))
        let afterOut = Number(after['outbound'].substring(0,after['outbound'].search(" ")))
        
        let inbounds = parseFloat(afterIn.toFixed(2)) 
        let outbounds =  parseFloat(afterOut.toFixed(2)) 

        this.time.push(values[length][0])
        this.inbound.push(parseFloat(afterIn))
        this.outbound.push(parseFloat(afterOut))

      }
      
      this.averagein = this.inbound.reduce((a, b) => a + b, 0)
      this.averageout = this.outbound.reduce((a, b) => a + b, 0)

      this.averagein = (this.averagein/12).toFixed(2) + 'Gbps' //' Mbps'
      this.averageout = (this.averageout/12).toFixed(2) + 'Gbps' //' Mbps'
      this.maxin = Math.max.apply(null, this.inbound).toFixed(2) + 'Gbps' //' Mbps'
      this.minin = Math.min.apply(null, this.inbound).toFixed(2) + 'Gbps' //' Mbps'
      this.maxout = Math.max.apply(null, this.outbound).toFixed(2) + 'Gbps' //' Mbps'
      this.minout = Math.min.apply(null, this.outbound).toFixed(2) + 'Gbps' //' Mbps'
       
      })
      //***************** Data Pie Chart dataDoughnutChart***********************
      axios.get(this.urlRatio).then(res => {
        let values = res.data.values
        let length  = values.length-1
        let ratioArr = JSON.parse(values[length][0])
        let traffic = []

        for (let index in ratioArr) {
          for (let ip in ratioArr[index]) {
                this.unit = ratioArr[index][ip].substring(ratioArr[index][ip].search(" ") ,ratioArr[index][ip].length)
                let json = {}              

                if (ip == '10.99.4.1') {
                  json['R124'] = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                }
                else if (ip == '10.99.3.1') {
                  json['R101C'] = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                }
                else if (ip == '10.99.6.1') {
                  json['R330A'] = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                }
                else if (ip == '10.99.7.1') {
                  json['Rshop'] = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                }
                else if (ip == '10.99.5.1') {
                  json['R415'] = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                }
                else if (ip == '10.99.1.1') {
                  json['SW4503'] = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                }
                else if (ip == '10.99.0.1') {
                  json['ISR-4451'] = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                }
                else if (ip == '10.99.2.1') {
                  json['SW3850'] = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                }
                traffic.push(json)
            } 
        }//for
        this.hoverBackgroundColor = ["#0066FF", "#FF5A5E", "#5AD3D1", "#FFC870", "#616774", "#A8B3C5", "#b0a39a", "#013162"] 
        this.backgroundColors = ["#0066FF", "#F7464A", "#46BFBD", "#FDB45C", "#4D5360", "#949FB1", "#b0a39a", "#013162"] 
        let packData = []
        let i = 0 

        traffic.sort((a, b) => {  
          return (b[Object.keys(b)] - a[Object.keys(a)]) 
        })

        
        traffic.forEach( item => {
          packData = packData.concat(item.packData)
        })

        let dataChart = []
        traffic.forEach( item => { 
          //Object.assign(
          let value = Object.values(item)
          let label = Object.keys(item)
          
          this.datas.push(value[0]) 
          this.labels.push(label[0]) 

          this.dataPieChart.push({
            value: value[0], 
            color: this.backgroundColors[i], 
            highlight: this.hoverBackgroundColor[i], 
            label: label[0]
          })

          i++
        })


    })
      
      this.load = true
  }//func
}
}
</script>

<style scoped>
  .tag.is-medium{
    border-radius:8px;
    width: 50%;
    color: #fff;
    margin-top:1%;
  }
</style>
