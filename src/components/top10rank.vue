<template>
	<div class="container is-mobile"><br>
		<div class="column is-mobile">
			<div class="tabs is-toggle  is-fullwidth " >
				<ul>
					<li :class="{'is-active': statusbtn1}">
						<a @click="showInbound('inbound')">
							<span class="icon is-medium"><i class="fa fa-arrow-circle-down"></i></span>
							<span>Inbound</span>
						</a>
					</li>
					<li :class="{'is-active': statusbtn2}"><!-- style="background: #01579b;" -->
						<a @click="showOutbound('outbound')">
							<span class="icon is-medium"><i class="fa fa-arrow-circle-up"></i></span>
							<span>Outbound</span>
						</a>
					</li>
				</ul>
			</div>
			<div v-show="load == false "><p class="title is-3" align="center" style="color:black;"><b> Loading... </b></p> </div>
			<div v-show="load == true">
				<div class="container" v-show="onclick == 'inbound' "><canvas id="inboundChart" width="500" height="200"></canvas></div>
			<div class="container" v-show="onclick == 'outbound' "><canvas id="outboundChart" width="500" height="200"></canvas></div>

			<table class="table is-striped"  v-show="onclick == 'inbound' ">
				<thead>
					<tr class="is-selected">
						<th><span class="title is-5">#</span></th>
						<th>Vlan Name</th>
						<th>Network ID</th>
						<th>Inbound</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(dataInbound, index) in dataTable">
						<th>{{index+1}}</th>
						<td>{{dataInbound.vlan}}</td>
						<td>{{dataInbound.ip}}</td>
						<td>{{dataInbound.inbound}}</td>
					</tr>
				</tbody>
			</table>
			<table class="table is-striped"  v-show="onclick == 'outbound' ">
				<thead>
					<tr class="is-selected">
						<th><span class="title is-5">#</span></th>
						<th>Vlan Name</th>
						<th>Network ID</th>
						<th>Outbound</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(dataInbound,index) in dataTable">
						<th>{{index+1}}</th>
						<td>{{dataInbound.vlan}}</td>
						<td>{{dataInbound.ip}}</td>
						<td>{{dataInbound.outbound}}</td>
					</tr>
				</tbody>
			</table>
		</div>
			
		</div>	
	</div>
</template>
<script>
	/*eslint-disable */
	import axios from 'axios'
	import MonthlyIncome from './MonthlyIncome'
	export default {
		name: 'top10rank',
		components: {
			MonthlyIncome
		},
		mounted: function () {
			this.getSheet()
			this.start()
		},
		data () {
			return {
				urlToprank: 'https://get-api-myproject.herokuapp.com/1aggVBb8hCOclrJMbo4XsbidTgwTBvvr0nqDQwEVh-L4/sheet1!C:C',
				data:'',
				inboundSort: [],
				outboundSort: [],
				labelInbound: [],
				labelOutbound: [],
				options: { 
					animation: true,
					animationEasing: "easeOutQuart",
					tooltipEvents: ["mousemove", "touchstart", "touchmove"],
					tooltipCornerRadius: 3,
					pointDot : true,
					pointDotRadius : 4,
					datasetFill : true,
					scaleShowLine : true,
					animationEasing : "easeOutBounce",
					animateRotate : true,
					animateScale : true,
					responsive: true
				},
				dataTable:[],
				count:0,
				statusbtn1:false,
				statusbtn2:false,
				onclick: '',
				load:false
			}
		},
		methods: {
			start(){
				this.statusbtn1 = true
				this.statusbtn2 = false
				this.onclick = 'inbound'
			},
			showInbound (in_) {
				this.statusbtn1 = true
				this.statusbtn2 = false
				this.onclick = in_
			},
			showOutbound(out_){
				this.statusbtn2 = true
				this.statusbtn1 = false
				this.onclick = out_
			},
			getSheet () {
				axios.get(this.urlToprank).then(res => {
					let values  = res.data.values
					let length  = values.length-1
					this.data   = JSON.parse(values[length][0])
					console.log('Get data Success')
					this.createTable ()
					this.load  = true
				})
			},
			sortDataDsc (data) {
				return data.sort((a, b) => {
					return (b[Object.keys(b)] - a[Object.keys(a)])
				})
			},
			createTable () {
				let _this = this
				let inbound = []
				let outbound = []
				this.data.forEach( item => {
					inbound = inbound.concat(item.inbound)
					outbound = outbound.concat(item.outbound)
				})
				inbound = _this.sortDataDsc(inbound)
				outbound = _this.sortDataDsc(outbound)
				let inSort = inbound.splice(0,10)
				let outSort = outbound.splice(0,10)
				let vlanIn = []
				let vlanOut = []
				for(let i in inSort){
					let numIn = Object.values(inSort[i])
					let numOut = Object.values(outSort[i])
					let belIn = Object.keys(inSort[i])
					let belOut = Object.keys(outSort[i])
					
					numIn = this.convertType(parseFloat(numIn[0]))
					numOut = this.convertType(parseFloat(numOut[0]))
					_this.dataTable.push({
						vlan: belIn[0].substring(belIn[0].search("#")+1,belIn[0].length),
						ip:  belIn[0].substring(0,belIn[0].search("#")),
						inbound: numIn,
						outbound:numOut 
					})
					_this.labelInbound.push(belIn[0].substring(belIn[0].search("#")+1,belIn[0].length))
					_this.labelOutbound.push(belOut[0].substring(belOut[0].search("#")+1,belOut[0].length))
					_this.inboundSort.push(numIn.substring(0,numIn.search(" ")))
					_this.outboundSort.push(numOut.substring(0,numOut.search(" ")))
				}
				//console.log(_this.labelInbound,_this.inboundSort,_this.labelOutbound,_this.outboundSort)
				_this.createChart(_this.labelInbound,_this.inboundSort,_this.labelOutbound,_this.outboundSort)
				
				
			},
			convertType (Kbp){
				Kbp = Kbp * 1024
				let unit = 'Gbps'
				let unitmod = '1073741824'

				Kbp =  Kbp/unitmod 
				return (Kbp.toFixed(2)+' '+unit)
			},
			createChart(labelInbound,inboundList,labelOutbound,outboundList){
				var ctx = document.getElementById("inboundChart");
				var inboundChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: labelInbound,
						datasets: [{
							label: 'Inbound',
							data: inboundList,
							backgroundColor: [
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)'
							],
							borderColor: [
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)'
							],
							borderWidth: 1
						}]
					},
					options: {
						legend :{display: false},
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero:true
								}
							}]
						}
					}
				})
				var ctx = document.getElementById("outboundChart");
				var outboundChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: labelInbound,
						datasets: [{
							label: 'Outbound',
							data: outboundList,
							backgroundColor: [
							'rgba(238,34,105, 0.2)',
							'rgba(238,34,105, 0.2)',
							'rgba(238,34,105, 0.2)',
							'rgba(238,34,105, 0.2)',
							'rgba(238,34,105, 0.2)',
							'rgba(238,34,105, 0.2)',
							'rgba(238,34,105, 0.2)',
							'rgba(238,34,105, 0.2)',
							'rgba(238,34,105, 0.2)',
							'rgba(238,34,105, 0.2)'
							],
							borderColor: [
							'rgba(119,17,52, 1)',
							'rgba(119,17,52, 1)',
							'rgba(119,17,52, 1)',
							'rgba(119,17,52, 1)',
							'rgba(119,17,52, 1)',
							'rgba(119,17,52, 1)',
							'rgba(119,17,52, 1)',
							'rgba(119,17,52, 1)',
							'rgba(119,17,52, 1)',
							'rgba(119,17,52, 1)'
							],
							borderWidth: 1
						}]
					},
					options: {
						legend :{display: false},
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero:true
								}
							}]
						}
					}
				})
			}
		},
		computed:{
			chartInbound(){
				return {
					type: 'bar',
					data: {
						labels: this.labelInbound,
						datasets: [{
							label: 'Inbound',
							data: this.inboundSort,
							backgroundColor: [
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)',
							'rgba(27,168,224, 0.2)'
							],
							borderColor: [
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)',
							'rgba(27,168,224, 1)'
							],
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero:true
								}
							}]
						}
					}
				}
				
	}//
}
}
</script>
<style scoped>
	.tag.is-medium{
		border-radius:8px;
		width: 50%;
		color: #fff;
	}
	.container {
		width: 80%;
		margin: 0 auto;
	}
</style>