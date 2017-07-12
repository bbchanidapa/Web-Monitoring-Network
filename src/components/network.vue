<template>
<div class="container is-one-mobile">
	<div class="notification" style="background-color:#fff;">
		<center><br>
		<div v-if="load == false "><p class="title is-3" style="color:black;"><b> Loading... </b></p> </div>
		<div v-if="load == true "> 
			<div class="columns " ><!-- 1 -->
				<div class="column" style="margin-left:25%"><b>Unit : {{unit}} </b></div>
				<div class="column" >
					<p class="title is-6" style="padding-right:-10%"><b>ISR4451</b></p>
					<i class="fa fa-arrow-up"></i>{{showData['10.99.0.1']['in']}} <i class="fa fa-arrow-down"></i>{{showData['10.99.0.1']['out']}}</p>
				</div>
				<div class="column" ><img src="../img/switch.png"></div>
				<div class="column" >
					<p style="position:absolute;margin-left:1%; margin-top:1%;">{{data['10.99.0.1']['Gi0/0/0']['in']}}<br>
					{{data['10.99.0.1']['Gi0/0/0']['out']}} </p>
					<hr style="height: 8px;background-color:#7bd84c;margin-top:20%;margin-bottom:0rem; margin-right:-10%;">
				</div>
				<div class="column" >
					<img src="../img/clouds.png" style="width:50%; margin-right:30%;">
				</div>
				<div class="column" ></div>
			</div>
			<div class="columns"><!-- 2 -->
				<div class="column" style="padding-left:7%">
					<p class="title is-6"><b>SW3850</b></p>
					<i class="fa fa-arrow-up"></i>{{showData['10.99.2.1']['in']}} <i class="fa fa-arrow-down"></i>{{showData['10.99.2.1']['out']}}
				</div>
				<div class="column" style="margin-left:-7%"></div>
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ><!-- Post SW4503 to ISR -->
					<p style="position:absolute;margin-left:1.5%;">{{data['10.99.1.1']['Gi2/1']['in']}} </p>
					<p style="position:absolute;margin-left:7.8%;">{{data['10.99.1.1']['Gi2/1']['out']}} </p>
					<img src="../img/inbound-1.png" class="size" v-if="data['10.99.0.1']['Gi0/0/2']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size" v-if="data['10.99.0.1']['Gi0/0/2']['status'] == 'Down' ">
				</div>
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ></div>
			</div>
			<div class="columns" ><!-- 3 -->
				<div class="column" style="margin-left:7%;"><img src="../img/sw3850.png" ></div>
				<div class="column" style=" margin-right:18%;"><!-- Post SW3850 to SW4503  ** Trunk **-->
					<p style="position:absolute;margin-left:2%; margin-top:1px;">{{data['10.99.2.1']['Vlan304']['in']}}<br>{{data['10.99.2.1']['Vlan304']['out']}} </p>
					<p style="position:absolute;margin-left:25%; margin-top:1px;">{{data['10.99.1.1']['Vlan304']['in']}}<br>{{data['10.99.1.1']['Vlan304']['out']}}  </p>

					<div v-if="data['10.99.1.1']['Vlan304']['status'] == 'Up' " class="column" style="margin-top:10%; margin-right:-146%;">
						<hr class="trunkUp"><hr class="trunkUp"><hr class="trunkUp"><hr class="trunkUp">
					</div>
					<div v-if="data['10.99.1.1']['Vlan304']['status'] == 'Down' " class="column" style="margin-top:10%; margin-right:-146%;">
						<hr class="trunkDown"><hr class="trunkDown"><hr class="trunkDown"><hr class="trunkDown">
					</div>
				</div>
				<div class="column" ><img src="../img/switch.png" ></div>
				<div class="column" >
					<p class="title is-6"><b>SW4503</b></p>
					<i class="fa fa-arrow-up"></i>{{showData['10.99.1.1']['in']}} <i class="fa fa-arrow-down"></i>{{showData['10.99.1.1']['out']}}
				</div>
				<div class="column" style="margin-left:12.5%"></div>
			</div>
			<div class="columns"><!-- 4 -->
				<div class="column" ><!-- Post Rshop to SW3850-->
					<p style="position:absolute;margin-left:4%;">{{data['10.99.2.1']['Gi1/0/2']['in']}} </p>
					<p style="position:absolute;margin-left:9%;">{{data['10.99.2.1']['Gi1/0/2']['out']}} </p>

					<img src="../img/inbound-1.png" class="size line" v-if="data['10.99.2.1']['Gi1/0/2']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size line" v-if="data['10.99.2.1']['Gi1/0/2']['status'] == 'Down' ">
				</div>
				<div class="column" ><!-- Post SW3850 to R101C -->
					<p style="position:absolute;margin-left:1.5%;">{{data['10.99.2.1']['Gi1/0/1']['in']}} </p>
					<p style="position:absolute;margin-left:8%;">{{data['10.99.2.1']['Gi1/0/1']['out']}} </p>

					<img src="../img/inbound-1.png" class="size liner101c" v-if="data['10.99.2.1']['Gi1/0/1']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size liner101c" v-if="data['10.99.2.1']['Gi1/0/1']['status'] == 'Down' ">
				</div>
				<div class="column" ></div>
				<div class="column" ><div class="column" id="link"></div><hr class="linkSw4503" ></div><!-- Post long to SW4503 -->
				
				<div class="column" ><hr class="linkSw4503Top"></div><!-- Post shot to SW4503 -->
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ></div>
			</div>
			<div class="columns"><!-- 5 -->
				<div class="column" ><!-- Post SW4503 to Rshop -->
					<img src="../img/inbound-1.png" class="size line" v-if="data['10.99.2.1']['Gi1/0/2']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size line" v-if="data['10.99.2.1']['Gi1/0/2']['status'] == 'Down' ">
				</div>
				<div class="column" ><!-- Post SW4503 to R101C -->
					<p style="position:absolute;margin-left:1.5%;">{{data['10.99.3.1']['Gi0/49']['in']}} </p>
					<p style="position:absolute;margin-left:7.8%;">{{data['10.99.3.1']['Gi0/49']['out']}} </p>
					<img src="../img/inbound-1.png" class="size liner101c" v-if="data['10.99.2.1']['Gi1/0/1']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size liner101c" v-if="data['10.99.2.1']['Gi1/0/1']['status'] == 'Down' ">
					
				</div>
				<div class="column" ></div>
				<div class="column" ><!-- Post R124 -->
					<p style="position:absolute;margin-left:1.5%;">{{data['10.99.4.1']['Gi0/49']['in']}} </p>
					<p style="position:absolute;margin-left:7.8%;">{{data['10.99.4.1']['Gi0/49']['out']}} </p>
					<img src="../img/inbound-1.png" class="size" v-if="data['10.99.4.1']['Gi0/49']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size" v-if="data['10.99.4.1']['Gi0/49']['status'] == 'Down' ">
				</div>
				<div class="column" ></div>
				<div class="column" ><!-- Post R415 -->
					<p style="position:absolute;margin-left:1.5%;">{{data['10.99.5.1']['Gi0/49']['in']}} </p>
					<p style="position:absolute;margin-left:7.8%;">{{data['10.99.5.1']['Gi0/49']['out']}} </p>
					<img src="../img/inbound-1.png" class="size" v-if="data['10.99.5.1']['Gi0/49']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size" v-if="data['10.99.5.1']['Gi0/49']['status'] == 'Down' ">
				</div>
				<div class="column" ></div>
				<div class="column" ><!-- Post R330A to SW4503-->
					<p style="position:absolute;margin-left:1.5%; ">{{data['10.99.6.1']['Gi0/49']['in']}} </p>
					<p style="position:absolute;margin-left:7.8%;">{{data['10.99.6.1']['Gi0/49']['out']}} </p>
					<img src="../img/inbound-1.png" class="size" v-if="data['10.99.6.1']['Gi0/49']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size" v-if="data['10.99.6.1']['Gi0/49']['status'] == 'Down' ">
				</div>
			</div>
			<div class="columns"><!-- 6 -->
				<div class="column" ><!-- Post SW4503 to Rshop -->
					<img src="../img/inbound-1.png" class="size line" v-if="data['10.99.2.1']['Gi1/0/2']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size line" v-if="data['10.99.2.1']['Gi1/0/2']['status'] == 'Down' ">
				</div>
				<div class="column" ><img src="../img/switch.png"></div><!--SW R101C -->
				<div class="column" ><!-- Post R101C to R124 **Redundant** -->
					<div class="column" id="link">
						<p style="position:absolute;margin-left:1%; margin-top:5px;">{{data['10.99.3.1']['Gi0/48']['in']}}<br>{{data['10.99.3.1']['Gi0/48']['out']}} </p>
						<p style="position:absolute;margin-left:8%; margin-top:5px;">{{data['10.99.4.1']['Gi0/3']['in']}}<br>{{data['10.99.4.1']['Gi0/3']['out']}}  </p>
					</div>

					<hr class="redundantUp" v-if="data['10.99.3.1']['Gi0/48']['status'] == 'Up' ">
					<hr class="redundantDown" v-if="data['10.99.3.1']['Gi0/48']['status'] == 'Down' ">

				</div>
				<div class="column" ><img src="../img/switch.png"></div><!--SW R124 -->
				<div class="column" ><!-- Post R124 to R415 **Redundant** -->
					<div class="column" id="link">
						<p style="position:absolute;margin-left:1%; margin-top:5px;">{{data['10.99.4.1']['Gi0/51']['in']}}<br>{{data['10.99.4.1']['Gi0/51']['out']}} </p>
						<p style="position:absolute;margin-left:8%; margin-top:5px;">{{data['10.99.5.1']['Gi0/51']['in']}}<br>{{data['10.99.5.1']['Gi0/51']['out']}}  </p>
					</div>
					<hr class="redundantUp" v-if="data['10.99.4.1']['Gi0/51']['status'] == 'Up' ">
					<hr class="redundantDown" v-if="data['10.99.4.1']['Gi0/51']['status'] == 'Down' ">
				</div>
				<div class="column" ><img src="../img/switch.png"></div><!--SW R415 -->
				<div class="column" ><!-- Post R415 to R330A **Redundant** -->
					<div class="column" id="link">
						<p style="position:absolute;margin-left:1%; margin-top:5px;">{{data['10.99.5.1']['Gi0/52']['in']}}<br>{{data['10.99.5.1']['Gi0/52']['out']}} </p>
						<p style="position:absolute;margin-left:8%;margin-top:5px;">{{data['10.99.6.1']['Gi0/51']['in']}}<br>{{data['10.99.6.1']['Gi0/51']['out']}} </p>
					</div>
					<hr class="redundantUp" v-if="data['10.99.6.1']['Gi0/51']['status'] == 'Up' ">
					<hr class="redundantDown" v-if="data['10.99.6.1']['Gi0/51']['status'] == 'Down' ">
				</div>
				<div class="column" ><img src="../img/switch.png"></div><!--SW R330A -->
			</div>
			<div class="columns"><!-- 7 -->
				<div class="column" ><!-- Post Rshop to SW3850 -->
					<p style="position:absolute;margin-left:3.5%;margin-top:5px;">{{data['10.99.7.1']['Gi0/49']['in']}} </p>
					<p style="position:absolute;margin-left:9%;margin-top:5px;">{{data['10.99.7.1']['Gi0/49']['out']}} </p>

					<img src="../img/inbound-1.png" class="size line" v-if="data['10.99.2.1']['Gi1/0/2']['status'] == 'Up' ">
					<img src="../img/inbound-3.png" class="size line" v-if="data['10.99.2.1']['Gi1/0/2']['status'] == 'Down' ">
				</div>
				<div class="column" >
					<p class="title is-6"><b>R101C</b></p>
					<i class="fa fa-arrow-up"></i>{{showData['10.99.3.1']['in']}} <i class="fa fa-arrow-down"></i>{{showData['10.99.3.1']['out']}}
				</div>
				<div class="column" ></div>
				<div class="column" >
				<p class="title is-6"><b>R124</b></p>
					<i class="fa fa-arrow-up"></i>{{showData['10.99.4.1']['in']}} <i class="fa fa-arrow-down"></i>{{showData['10.99.4.1']['out']}}
				</div>
				<div class="column" ></div>
				<div class="column" ><!-- Post Top R415 to Rshop -->
					<p style="position:absolute;margin-left:-1%; ">{{data['10.99.5.1']['Gi0/50']['in']}} </p>
					<p style="position:absolute;margin-left:3%;">{{data['10.99.5.1']['Gi0/50']['out']}} </p>
					<hr class="linkR415Top" id="linkR415Up" v-if="data['10.99.5.1']['Gi0/50']['status'] == 'Up' ">
					<hr class="linkR415Top" id="linkR415Down" v-if="data['10.99.5.1']['Gi0/50']['status'] == 'Down' ">
					<div style="padding-left:15%">
						<p class="title is-6"><b>R415</b></p>
						<i class="fa fa-arrow-up"></i>{{showData['10.99.5.1']['in']}} <i class="fa fa-arrow-down"></i>{{showData['10.99.5.1']['out']}}
					</div>
				</div>
				<div class="column" ></div>
				<div class="column" >
					<p class="title is-6"><b>R330A</b></p>
					<i class="fa fa-arrow-up"></i>{{showData['10.99.6.1']['in']}} <i class="fa fa-arrow-down"></i>{{showData['10.99.6.1']['out']}}
				</div>
			</div>
			<div class="columns"><!-- 8 -->
				<div class="column" ><img src="../img/switch.png"></div>
				<div class="column" ><!-- Post Down Rshop to R415 -->
					<div class="column" style="padding-bottom:23%;">
						<p style="position:absolute;margin-left:1%;margin-top:1.5%;">{{data['10.99.7.1']['Gi0/51']['in']}}<br>{{data['10.99.7.1']['Gi0/51']['out']}} </p>
					</div>
					
					<hr class="linkRshop" id="linkR415Up" v-if="data['10.99.5.1']['Gi0/50']['status'] == 'Up' ">
					<hr class="linkRshop" id="linkR415Down" v-if="data['10.99.5.1']['Gi0/50']['status'] == 'Down' ">
				</div>
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ><!-- Post Center Rshop to R415 -->
					<hr class="linkR415Center" id="linkR415Up" v-if="data['10.99.5.1']['Gi0/50']['status'] == 'Up' ">
					<hr class="linkR415Center" id="linkR415Down" v-if="data['10.99.5.1']['Gi0/50']['status'] == 'Down' ">
				</div>
				<div class="column" ></div>
				<div class="column" ></div>
			</div>
			<div class="columns"><!-- 9 -->
				<div class="column" >
					<p class="title is-6"><b>Rshop</b></p>
					<i class="fa fa-arrow-up"></i>{{showData['10.99.7.1']['in']}} <i class="fa fa-arrow-down"></i>{{showData['10.99.7.1']['out']}}
				</div>
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ></div>
				<div class="column" ></div>
			 </div>  <!-- div check load-->
			
		<!-- <i class="fa fa-arrow-right"></i> -->
		</div>
		</center>
	</div>
</div>
</template>
<script>
	/*eslint-disable */
	import axios from 'axios'
	export default {
		name: 'network',
		mounted: function () {
			this.getSheet()
		},
		data () {
			return {
				urlDetailDevice: "https://get-api-myproject.herokuapp.com/10oB-UFsm6gldPrDLw730R5-u0ap-4foRfxBUVax-vK0/sheet1!C:C",
				urlDevice: "https://get-api-myproject.herokuapp.com/1WXmhTnJ9Dw6ana0tqtrV1mq2tyzM6TeErNA-_6aZ2fA/sheet1!C:C",
				traffic: '',
			    data: {
			    	'10.99.1.1': {},
			    	'10.99.4.1': {},
			    	'10.99.3.1': {},
			    	'10.99.6.1': {},
			    	'10.99.5.1': {},
			    	'10.99.7.1': {},
			    	'10.99.2.1': {},
			    	'10.99.0.1': {}
			    },
			    showData: {
			    	'10.99.1.1': {},
			    	'10.99.4.1': {},
			    	'10.99.3.1': {},
			    	'10.99.6.1': {},
			    	'10.99.5.1': {},
			    	'10.99.7.1': {},
			    	'10.99.2.1': {},
			    	'10.99.0.1': {}
			    },
			    load: false,
			    unit: ''
			}
		},
		methods: {
			getSheet (){
				axios.get(this.urlDevice).then(res => {
					let values = res.data.values
					let length  = values.length-1
					let device = JSON.parse(values[length][0])

					for(let index in device){
						let ip = Object.keys(device[index])
						ip = ip[0]

						let inbound = parseFloat(device[index][ip]['inbound'].substring(0,device[index][ip]['inbound'].search(" ")), 10)
						let outbound =  parseFloat(device[index][ip]['outbound'].substring(0,device[index][ip]['outbound'].search(" ")),10)	
						this.getDetail(inbound,outbound,ip)
					}

				})
			},//func
			getDetail(inbound_, outbound_, ip_){
				axios.get(this.urlDetailDevice).then(res => {
					let values = res.data.values
					let length  = values.length-1
					let detail = JSON.parse(values[length][0])

					for(let i in detail[ip_]){	
						this.addData(ip_, inbound_, outbound_, detail[ip_][i]['status'], detail[ip_][i]['interface'],detail[ip_][i]['in'], detail[ip_][i]['out'])
					}
					setInterval(()=>{this.load = true},5000)
					
				})
			},
			addData (ip, inboundTotal_, outboundTotal_, status_, name_, inbound_, outbound_){

				this.unit = inbound_.substring(inbound_.search(" "), inbound_.length )
				inbound_ = Number(inbound_.substring(0,inbound_.search(" "))) 
				outbound_ = Number(outbound_.substring(0,outbound_.search(" "))) 

				if('10.99.1.1' === ip) {
					this.showData[ip] = {
						in: inboundTotal_,
						out: outboundTotal_
					}
					this.data[ip][name_] = {
						status: status_,
						in:inbound_,
						out:outbound_
					}
					//console.log(this.showData[ip],this.data[ip][name_],name_,status_)
				}
				else if('10.99.4.1' === ip) {
					this.showData[ip] = {
						in: inboundTotal_,
						out: outboundTotal_
					}
					this.data[ip][name_] = {
						status: status_,
						in:inbound_,
						out:outbound_
					}
				}
				else if('10.99.3.1' === ip) {
					this.showData[ip] = {
						in: inboundTotal_,
						out: outboundTotal_
					}
					this.data[ip][name_] = {
						status: status_,
						in:inbound_,
						out:outbound_
					}
				}
				else if('10.99.6.1' === ip) {
					this.showData[ip] = {
						in: inboundTotal_,
						out: outboundTotal_
					}
					this.data[ip][name_] = {
						status: status_,
						in:inbound_,
						out:outbound_
					}
				}
				else if('10.99.7.1' === ip) {
					this.showData[ip] = {
						in: inboundTotal_,
						out: outboundTotal_
					}
					this.data[ip][name_] = {
						status: status_,
						in:inbound_,
						out:outbound_
					}
				}
				else if('10.99.5.1' === ip) {
					this.showData[ip] = {
						in: inboundTotal_,
						out: outboundTotal_
					}
					this.data[ip][name_] = {
						status: status_,
						in:inbound_,
						out:outbound_
					}
				}
				else if('10.99.2.1' === ip) {
					this.showData[ip] = {
						in: inboundTotal_,
						out: outboundTotal_
					}
					this.data[ip][name_] = {
						status: status_,
						in:inbound_,
						out:outbound_
					}
				}
				else if('10.99.0.1' === ip) {
					this.showData[ip] = {
						in: inboundTotal_,
						out: outboundTotal_
					}
					this.data[ip][name_] = {
						status: status_,
						in:inbound_,
						out:outbound_
					}
				}
				
			}

		}//methods
	}
</script>
<style scoped>
	.title:not(:last-child) {
     	margin-bottom: 0rem; 
    }
	.fa.fa-arrow-up {
		color:blue; 
	}
    .fa.fa-arrow-down {
    	color:red; 
    }
    .column {
		padding: 0rem;
		/*border: 1px solid black;*/
	}
	.trunkUp {
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
		height: 2px; 
		background-color:#7bd84c; 
	}
	.trunkDown {
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
		height: 2px; 
		background-color:red; 
	}
	.redundantUp {
		height: 8px; 
		background-color:#7bd84c; 
		margin-top:5%;
		margin-bottom:0rem;
	}
	.redundantDown {
		height: 8px; 
		background-color:red; 
		margin-top:5%;
		margin-bottom:0rem;
	}
	.linkSw4503 {
		height: 8px; 
		background-color:#96c1db; 
		margin-top:8%;
		margin-bottom:0rem;
		margin-left:44%; 
		margin-right:-356%;
	}
	.linkSw4503Top {
		margin-left:47%; 
		margin-right:47%; 
		height:30px; 
		margin-top:0rem;
		margin-bottom: 0rem;
		background-color:#96c1db;
	}
	.linkRshop {
		height: 8px;
		background-color:#7bd84c; 
		margin-top:0rem;
		margin-bottom:0rem;
		margin-right: -320%;
	}
	#linkR415Up {
		background-color:#7bd84c; 
	}
	#linkR415Down {
		background-color:red; 
	}
	.linkR415Top{
		height:100%;
		margin-right:80%; 
		margin-left:15%; 
		margin-top:0rem; 
		margin-bottom:0rem;
	}
	.linkR415Center{
		height:92%; 
		margin-right:80%; 
		margin-left:15%; 
		margin-top:0rem;
	}
	img {
		width: 100%;
		height: 100%;
	}
	.line {
		width:10%;
		margin-left:30%;
	}
	.size {
		width:12%;
	}
	.size.liner101c {
		margin-right:5%;
	}
	#linkleft{
		margin-left:45%;
		height:50%;
		background:#7bd84c;
	}
	#link {
		height:17px;
	}
	#good {
		background: rgb(115, 255, 115);
		margin-bottom: 0.1rem;
	}
	#worning {
		background: rgb(255, 165, 112);
		margin-bottom: 0.1rem;
	}
	#fail {
		background: rgb(255, 156, 192);
		margin-bottom: 0.1rem;
	}
	span {
		text-align: left;
	}
</style>