<template>
<div class="container is-mobile">
  <br>
  <div v-if="load == false "><p class="title is-3" style="color:black;"><b> Loading... </b></p> </div>
  <div class="columns "  v-if="load == true ">
        <div class="column is-2" >
          <div class="box" style="height:100%; margin-right:5%;">
            <article class="media" v-for="index in detail">
              <div class="media-left">
                <strong>{{index.name}}</strong>{{index.ip}}
                <br>
                <span class="icon"><i class="fa fa-tachometer" style="color:#40e2bd;"></i></span>
                <strong class="is-6">Cpu:</strong>{{index.cpu}}%<br>
                <span class="icon"><i class="fa fa-thermometer-half" style="color:#66bdef;"></i></span>
                <strong>Temp:</strong> {{index.temp}}C
              </div>
            </article>
          </div>
        </div>
        <div class="column is-half">
          <div class="box" style="height:100%">
            <p class="title is-3"><b>Internet Traffic</b></p>
            <div><line-chart-dashboard :chart-data="dataLineChart" :options="option" :width="400" :height="300"></line-chart-dashboard></div><br>
            <br>
            <span class="tag is-medium" id="div-in" style="width:20%; background-color:#36A2EB;">Inbound</span>
            <span class="title is-6"><b>Min :</b>{{minin}}<b> Max :</b>{{maxin}}<b> Average:</b>{{averagein}}</span><br>
            <span class="tag is-medium" id="div-out" style="width:20%; background-color:#FFA1B5;">Outbound</span>
            <span class="title is-6"><b>Min :</b>{{minout}}<b> Max :</b>{{maxout}}<b> Average:</b>{{averageout}}</span>
          </div>
          <br>
        </div>
        <span style="margin-right:1%"></span>
        <div class="column is-one-third">
          <div class="box" style="height:100%">
            <p class="title is-3"><b>Traffic Ratio</b></p>
            <div><pie-chart :chart-data="doughnutChart" :options="{legend :{display: false},responsive: true, maintainAspectRatio: false}" :width="400" :height="300"></pie-chart></div><br><br>
            <!-- <div class="columns "> -->
            <div class="column is-12" style="padding-top:0rem; padding-bottom:0rem;">
              <span class="tag is-medium" id="bel-ISR4451">ISR-4451</span><span class="title is-6" id="txt-ISR4451"></span>
              <span class="tag is-medium" id="bel-SW3580">SW-3580</span><span class="title is-6" id="txt-SW3580"></span>
              <span class="tag is-medium" id="bel-SW4503">SW4503</span><span class="title is-6" id="txt-SW4503"></span>
              <span class="tag is-medium" id="bel-R124">R124</span><span class="title is-6" id="txt-R124"></span>
              <span class="tag is-medium" id="bel-R401">R401</span><span class="title is-6" id="txt-R401"></span>
              <span class="tag is-medium" id="bel-R415">R415</span><span class="title is-6" id="txt-R415"></span>
              <span class="tag is-medium" id="bel-R101C">R101C</span><span class="title is-6" id="txt-R101C"></span>
              <span class="tag is-medium" id="bel-R330A">R330A</span><span class="title is-6" id="txt-R330A"></span>
            </div>
            <!--  </div>  -->
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
    }//function

  },
  mounted: function () {
    this.getSheet() 
    //setInterval(this.getSheet(), 1000 * 60 * 1) 
  },
  data () {
    return {
      urlDetail: "https://apisheet.herokuapp.com/1Q6az-EGPMD-bKYa80NcOTIhAO9Jr2JFlYR9VxIZmB7Y/sheet1!C:C",//Pi
      urlSw4503: "https://apisheet.herokuapp.com/1Oykec18xewJw68XbG3xzJ3DU1N3mMqf6l7jBUwZ58Zs/sheet1!B:C",
      urlRatio: "https://apisheet.herokuapp.com/1o1XNXtyEcKHbkh326ofZN3yQFrOFgSTW44GCro_c_Zs/sheet1!C:C",
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
            stacked: true,
            gridLines: {
              display: true
            }
          }],
          yAxes: [{
            stacked: true,
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
      load: false
    }
  },
  methods: {  
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
      axios.get(this.urlSw4503).then(res => {
        let values = res.data.values
        let length  = values.length-12
       
      for (length ; length < values.length; length++) {
        let after = JSON.parse(values[length][1] )

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

        for (let index in ratioArr) {
          for (let ip in ratioArr[index]) {
                let unit = ratioArr[index][ip].substring(ratioArr[index][ip].search(" ") ,ratioArr[index][ip].length)
                if (ip == '10.77.1.2') {
                  let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                  let json = {
                    value: val,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "R124 :"
                  }
                  this.hoverBackgroundColor.push("#FF5A5E")
                  this.backgroundColors.push("#F7464A")
                  this.datas.push(val)
                  this.labels.push('R124')
                  this.dataPieChart.push(json)
                  this.data.push(val+unit)
                  $('#bel-R124').css({'background': '#F7464A'})
                  $('#txt-R124').html(' '+val+unit)
                }
                else if (ip == '10.77.7.2') {
                  let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                  let json = {
                    value:val,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "R101C :"
                  }
                  this.hoverBackgroundColor.push("#5AD3D1")
                  this.backgroundColors.push("#46BFBD")
                  this.datas.push(val)
                  this.labels.push('R101C')
                  this.dataPieChart.push(json)
                  this.data.push(val+unit)
                  $('#bel-R101C').css({'background': '#46BFBD'})
                  $('#txt-R101C').html(' '+val+unit)
                }
                else if (ip == '10.77.3.2') {
                  let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                  let json = {
                    value: val,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "R330A :"
                  }
                  this.hoverBackgroundColor.push("#FFC870")
                  this.backgroundColors.push("#FDB45C")
                  this.datas.push(val)
                  this.labels.push('R330A')
                  this.dataPieChart.push(json)
                  this.data.push(val+unit)
                  $('#bel-R330A').css({'background': '#FDB45C'})
                  $('#txt-R330A').html(' '+val+unit)
                }
                else if (ip == '10.77.8.2') {
                  let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                  let json = {
                    value: val,
                    color: "#949FB1",
                    highlight: "#A8B3C5",
                    label: "Rshop :"
                  }
                  this.hoverBackgroundColor.push("#A8B3C5")
                  this.backgroundColors.push("#949FB1")
                  this.datas.push(val)
                  this.labels.push('Rshop')
                  this.dataPieChart.push(json)
                  this.data.push(val+unit)
                  $('#bel-R401').css({'background': '#949FB1'})
                  $('#txt-R401').html(' '+val+unit)
                }
                else if (ip == '10.77.5.2') {
                  let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                  let json =  {
                    value: val,
                    color: "#4D5360",
                    highlight: "#616774",
                    label: "R415 :"
                  }
                  this.hoverBackgroundColor.push("#616774")
                  this.backgroundColors.push("#4D5360")
                  this.datas.push(val)
                  this.labels.push('R415')
                  this.dataPieChart.push(json)
                  this.data.push(val+unit)
                  $('#bel-R415').css({'background': '#4D5360'})
                  $('#txt-R415').html(' '+val+unit)
                }
                else if (ip == '10.77.4.1') {
                  let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                  let json =  {
                    value: val,
                    color: "#0066FF",
                    highlight: "#0066FF",
                    label: "SW4503 :"
                  }
                  this.hoverBackgroundColor.push("#0066FF")
                  this.backgroundColors.push("#0066FF")
                  this.datas.push(val)
                  this.labels.push('SW4503')
                  this.dataPieChart.push(json)
                  this.data.push(val+unit)
                  $('#bel-SW4503').css({'background': '#0066FF'})
                  $('#txt-SW4503').html(' '+val+unit)
                }
                else if (ip == '10.9.99.1') {
                  let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                  let json =  {
                    value: val,
                    color: "#013162",
                    highlight: "#013162",
                    label: "ISR4451 :"
                  }
                  this.hoverBackgroundColor.push("#013162")
                  this.backgroundColors.push("#013162")
                  this.datas.push(val)
                  this.labels.push('ISR4451')
                  this.dataPieChart.push(json)
                  this.data.push(val+unit)
                  $('#bel-ISR4451').css({'background': '#013162'})
                  $('#txt-ISR4451').html(' '+val+unit)
                }
                else if (ip == '10.77.7.1') {
                  let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
                  let json =  {
                    value: val,
                    color: "#b0a39a",
                    highlight: "#b0a39a",
                    label: "SW3580 :"
                  }
                  this.hoverBackgroundColor.push("#b0a39a")
                  this.backgroundColors.push("#b0a39a")
                  this.datas.push(val)
                  this.labels.push('SW3580')
                  this.dataPieChart.push(json)
                  this.data.push(val+unit)
                  $('#bel-SW3580').css({'background': '#b0a39a'})
                  $('#txt-SW3580').html(' '+val+unit)
                }
            } 
        }//for

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
