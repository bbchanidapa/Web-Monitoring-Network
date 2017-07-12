<template>
	<div class="container is-mobile-tablet"><br>
		<div class="tabs is-toggle is-fullwidth">
			<ul >
				<li :class="{'is-active': statusBtn.SW4503}">
					<a @click="showInterface('SW4503')">
						<span>SW4503</span>
					</a>
				</li>
				<li :class="{'is-active': statusBtn.R101C}">
					<a @click="showInterface('R101C')">
						<span>R101C</span>
					</a>
				</li>
				<li :class="{'is-active': statusBtn.R124}">
					<a @click="showInterface('R124')">
						<span>R124</span>
					</a>
				</li>
				<li :class="{'is-active': statusBtn.R415}">
					<a @click="showInterface('R415')">
						<span>R415</span>
					</a>
				</li>
				<li :class="{'is-active': statusBtn.R330A}">
					<a @click="showInterface('R330A')">
						<span>R330A</span>
					</a>
				</li>
				<li :class="{'is-active': statusBtn.Rshop}">
					<a @click="showInterface('Rshop')">
						<span>Rshop</span>
					</a>
				</li>
				<li :class="{'is-active': statusBtn.SW3850}">
					<a @click="showInterface('SW3850')">
						<span>SW3850</span>
					</a>
				</li>
				<li :class="{'is-active': statusBtn.ISR4451}">
					<a @click="showInterface('ISR4451')">
						<span>ISR4451</span>
					</a>
				</li>
			</ul>
		</div><br>
		
		<div v-show="load == false "><p class="title is-3" align="center" style="color:black;"><b> Loading... </b></p> </div>
		<div v-show="load == true">
			<span class="title is-3"><b>{{showSwitch}}</b></span>
			<br><br>
			<!-- *************************** SW4503 ***************************-->
			<div v-if="start == true" class="divSwitch">
				<div id="switch">
					<center>
						<b v-for="col in 13"><!--style="position:absolute; color:#fff;"  -->
							<span  v-if="detailInterface['10.99.1.1'][col-1]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa' + detailInterface['10.99.1.1'][col-1]['interface'].substring(12,detailInterface['10.99.1.1'][col-1]['interface'].length) }} </span>
						    <span v-if="detailInterface['10.99.1.1'][col-1]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.1.1'][col-1]['interface'].substring(18,detailInterface['10.99.1.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.1.1'][col-1]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' + detailInterface['10.99.1.1'][col-1]['interface'].substring(15,detailInterface['10.99.1.1'][col-1]['interface'].length) }} </span>
						     

							<img class="rj" src="../img/rj1.png" :style="'hover:background-color: yellow;background-color:'+status['10.99.1.1'][col-1]" @click="activeModal(detailInterface['10.99.1.1'][col-1])" >

							<span style="padding-left: 2rem; " v-if="col == 2"></span>
							<span style="padding-left: 2rem; " v-if="col == 6"></span>
						</b>
					</center>
				</div><br>

				<div id="switch">
					<center>
						<b v-for="col in 24">
							<span  v-if="detailInterface['10.99.1.1'][col+12]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa' + detailInterface['10.99.1.1'][col+12]['interface'].substring(12,detailInterface['10.99.1.1'][col+12]['interface'].length) }} </span>
						    <span v-if="detailInterface['10.99.1.1'][col+12]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.1.1'][col+12]['interface'].substring(18,detailInterface['10.99.1.1'][col+12]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.1.1'][col+12]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' + detailInterface['10.99.1.1'][col+12]['interface'].substring(15,detailInterface['10.99.1.1'][col+12]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.1.1'][col+12]" @click="activeModal(detailInterface['10.99.1.1'][col+12])">

							<span style="padding-left: 0.5em; " v-if="(col%6) == 0"></span>
						</b><hr class="br">
						<b v-for="col in 24">
							<span  v-if="detailInterface['10.99.1.1'][col+36]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa' + detailInterface['10.99.1.1'][col+36]['interface'].substring(12,detailInterface['10.99.1.1'][col+36]['interface'].length) }} </span>
						    <span v-if="detailInterface['10.99.1.1'][col+36]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.1.1'][col+36]['interface'].substring(18,detailInterface['10.99.1.1'][col+36]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.1.1'][col+36]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' + detailInterface['10.99.1.1'][col+36]['interface'].substring(15,detailInterface['10.99.1.1'][col+36]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.1.1'][col+36
						     ]['interface'].substring(0,1) == 'V' " style="font-size: 11px;position:fixed; margin-top: -0.7%;padding-left:0.2%; ">Vlan304</span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.1.1'][col+36]" @click="activeModal(detailInterface['10.99.1.1'][col+36])">
							<span style="padding-left: 0.5em; " v-if="(col%6) == 0"></span>
						</b>	
					</center>
				</div>
			</div>
			<!-- *************************** SW4503 ***************************-->
			<div v-if="showSwitch === 'SW4503' " class="divSwitch">
				<div id="switch">
					<center>
						<b v-for="col in 13"><!--style="position:absolute; color:#fff;"  -->
							<span  v-if="detailInterface['10.99.1.1'][col-1]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa' + detailInterface['10.99.1.1'][col-1]['interface'].substring(12,detailInterface['10.99.1.1'][col-1]['interface'].length) }} </span>
						    <span v-if="detailInterface['10.99.1.1'][col-1]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.1.1'][col-1]['interface'].substring(18,detailInterface['10.99.1.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.1.1'][col-1]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' + detailInterface['10.99.1.1'][col-1]['interface'].substring(15,detailInterface['10.99.1.1'][col-1]['interface'].length) }} </span>
						     

							<img class="rj" src="../img/rj1.png" :style="'hover:background-color: yellow;background-color:'+status['10.99.1.1'][col-1]" @click="activeModal(detailInterface['10.99.1.1'][col-1])" >

							<span style="padding-left: 2rem; " v-if="col == 2"></span>
							<span style="padding-left: 2rem; " v-if="col == 6"></span>
						</b>
					</center>
				</div><br>

				<div id="switch">
					<center>
						<b v-for="col in 24">
							<span  v-if="detailInterface['10.99.1.1'][col+12]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa' + detailInterface['10.99.1.1'][col+12]['interface'].substring(12,detailInterface['10.99.1.1'][col+12]['interface'].length) }} </span>
						    <span v-if="detailInterface['10.99.1.1'][col+12]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.1.1'][col+12]['interface'].substring(18,detailInterface['10.99.1.1'][col+12]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.1.1'][col+12]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' + detailInterface['10.99.1.1'][col+12]['interface'].substring(15,detailInterface['10.99.1.1'][col+12]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.1.1'][col+12]" @click="activeModal(detailInterface['10.99.1.1'][col+12])">

							<span style="padding-left: 0.5em; " v-if="(col%6) == 0"></span>
						</b><hr class="br">
						<b v-for="col in 24">
							<span  v-if="detailInterface['10.99.1.1'][col+36]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa' + detailInterface['10.99.1.1'][col+36]['interface'].substring(12,detailInterface['10.99.1.1'][col+36]['interface'].length) }} </span>
						    <span v-if="detailInterface['10.99.1.1'][col+36]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.1.1'][col+36]['interface'].substring(18,detailInterface['10.99.1.1'][col+36]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.1.1'][col+36]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' + detailInterface['10.99.1.1'][col+36]['interface'].substring(15,detailInterface['10.99.1.1'][col+36]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.1.1'][col+36
						     ]['interface'].substring(0,1) == 'V' " style="font-size: 11px;position:fixed; margin-top: -0.7%;padding-left:0.2%; ">Vlan304</span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.1.1'][col+36]" @click="activeModal(detailInterface['10.99.1.1'][col+36])">
							<span style="padding-left: 0.5em; " v-if="(col%6) == 0"></span>
						</b>	
					</center>
				</div>
			</div>
			<!-- *************************** R415 ***************************-->
			<div v-if="showSwitch === 'R415' " class="divSwitch">
				<div id="switch">
					<center>
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.5.1'][col-1]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa' + detailInterface['10.99.5.1'][col-1]['interface'].substring(12,detailInterface['10.99.5.1'][col-1]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.5.1'][col-1]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.5.1'][col-1]['interface'].substring(18,detailInterface['10.99.5.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.5.1'][col-1]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' +detailInterface['10.99.5.1'][col-1]['interface'].substring(15,detailInterface['10.99.5.1'][col-1]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.5.1'][col-1]" @click="activeModal(detailInterface['10.99.5.1'][col-1])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b><hr class="br">
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.5.1'][col+25]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa' + detailInterface['10.99.5.1'][col+25]['interface'].substring(12,detailInterface['10.99.5.1'][col+25]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.5.1'][col+25]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.5.1'][col+25]['interface'].substring(18,detailInterface['10.99.5.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.5.1'][col+25]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' +detailInterface['10.99.5.1'][col+25]['interface'].substring(15,detailInterface['10.99.5.1'][col-1]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.5.1'][col+25]" @click="activeModal(detailInterface['10.99.5.1'][col+25])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b>	
					</center>
				</div>
			</div>
			<!-- *************************** R124 ***************************-->
			<div v-if="showSwitch === 'R124' " class="divSwitch">
				<div id="switch">
					<center>
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.4.1'][col-1]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa'+ detailInterface['10.99.4.1'][col-1]['interface'].substring(12,detailInterface['10.99.4.1'][col-1]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.4.1'][col-1]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.4.1'][col-1]['interface'].substring(18,detailInterface['10.99.4.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.4.1'][col-1]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' +detailInterface['10.99.4.1'][col-1]['interface'].substring(15,detailInterface['10.99.4.1'][col-1]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.4.1'][col-1]" @click="activeModal(detailInterface['10.99.4.1'][col-1])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b><hr class="br">
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.4.1'][col+25]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa'+detailInterface['10.99.4.1'][col+25]['interface'].substring(12,detailInterface['10.99.4.1'][col+25]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.4.1'][col+25]['interface'].substring(0,1) == 'T' " id="ten"> {{'T'+detailInterface['10.99.4.1'][col+25]['interface'].substring(18,detailInterface['10.99.4.1'][col+25]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.4.1'][col+25]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi'+detailInterface['10.99.4.1'][col+25]['interface'].substring(15,detailInterface['10.99.4.1'][col+25]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.4.1'][col+25]" @click="activeModal(detailInterface['10.99.4.1'][col+25])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b>	
					</center>
				</div>
			</div>
			<!-- *************************** R330A ***************************-->
			<div v-if="showSwitch === 'R330A' "class="divSwitch">
				<div id="switch">
					<center>
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.6.1'][col-1]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa'+ detailInterface['10.99.6.1'][col-1]['interface'].substring(12,detailInterface['10.99.6.1'][col-1]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.6.1'][col-1]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.6.1'][col-1]['interface'].substring(18,detailInterface['10.99.6.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.6.1'][col-1]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' +detailInterface['10.99.6.1'][col-1]['interface'].substring(15,detailInterface['10.99.6.1'][col-1]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.6.1'][col-1]" @click="activeModal(detailInterface['10.99.6.1'][col-1])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b><hr class="br">
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.6.1'][col+25]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa'+detailInterface['10.99.6.1'][col+25]['interface'].substring(12,detailInterface['10.99.6.1'][col+25]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.6.1'][col+25]['interface'].substring(0,1) == 'T' " id="ten"> {{'T'+detailInterface['10.99.6.1'][col+25]['interface'].substring(18,detailInterface['10.99.6.1'][col+25]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.6.1'][col+25]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi'+detailInterface['10.99.6.1'][col+25]['interface'].substring(15,detailInterface['10.99.6.1'][col+25]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style="'background-color:'+status['10.99.6.1'][col+25]" @click="activeModal(detailInterface['10.99.6.1'][col+25])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b>	
					</center>
				</div>
			</div> 
			<!-- *************************** R101C ***************************-->
			<div v-if="showSwitch === 'R101C' " class="divSwitch">
				<div id="switch">
					<center>
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.3.1'][col-1]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa'+ detailInterface['10.99.3.1'][col-1]['interface'].substring(12,detailInterface['10.99.3.1'][col-1]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.3.1'][col-1]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.3.1'][col-1]['interface'].substring(18,detailInterface['10.99.3.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.3.1'][col-1]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' +detailInterface['10.99.3.1'][col-1]['interface'].substring(15,detailInterface['10.99.3.1'][col-1]['interface'].length) }} </span> 

							<img class="rj" src="../img/rj1.png"  :style=" 'background-color:' + status['10.99.3.1'][col-1]" @click="activeModal(detailInterface['10.99.3.1'][col-1])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b><hr class="br">
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.3.1'][col+25]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa'+detailInterface['10.99.3.1'][col+25]['interface'].substring(12,detailInterface['10.99.3.1'][col+25]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.3.1'][col+25]['interface'].substring(0,1) == 'T' " id="ten"> {{'T'+detailInterface['10.99.3.1'][col+25]['interface'].substring(18,detailInterface['10.99.3.1'][col+25]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.3.1'][col+25]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi'+detailInterface['10.99.3.1'][col+25]['interface'].substring(15,detailInterface['10.99.3.1'][col+25]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style=" 'background-color:' + status['10.99.3.1'][col+25]" @click="activeModal(detailInterface['10.99.3.1'][col+25])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b>	
					</center>
				</div>
			</div>
			<!-- *************************** Rshop ***************************-->
			<div v-if="showSwitch === 'Rshop' " class="divSwitch">
				<div id="switch">
					<center>
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.7.1'][col-1]['interface'].substring(0,1) == 'V' " id="fa"> {{'Vlan'+ detailInterface['10.99.7.1'][col-1]['interface'].substring(12,detailInterface['10.99.7.1'][col-1]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.7.1'][col-1]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.7.1'][col-1]['interface'].substring(18,detailInterface['10.99.7.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.7.1'][col-1]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' +detailInterface['10.99.7.1'][col-1]['interface'].substring(15,detailInterface['10.99.7.1'][col-1]['interface'].length) }} </span> 

							<img class="rj" src="../img/rj1.png" :style=" 'background-color:' + status['10.99.7.1'][col-1] " @click="activeModal(detailInterface['10.99.7.1'][col-1])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b><hr class="br">
						<b v-for="col in portRJ">
							<span  v-if="detailInterface['10.99.7.1'][col+25]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa'+detailInterface['10.99.7.1'][col+25]['interface'].substring(12,detailInterface['10.99.7.1'][col+25]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.7.1'][col+25]['interface'].substring(0,1) == 'T' " id="ten"> {{'T'+detailInterface['10.99.7.1'][col+25]['interface'].substring(18,detailInterface['10.99.7.1'][col+25]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.7.1'][col+25]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi'+detailInterface['10.99.7.1'][col+25]['interface'].substring(15,detailInterface['10.99.7.1'][col+25]['interface'].length) }} </span>

							<img class="rj" src="../img/rj1.png" :style=" 'background-color:' + status['10.99.7.1'][col+25] " @click="activeModal(detailInterface['10.99.7.1'][col+25])">
							<span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span>
						</b>
						<!-- <b v-for="col in portRJ"> -->
			      			<!-- {{detailInterface['10.99.7.1'][col+36]}} -->
							<!-- <span v-if="detailInterface['10.99.7.1'][col+36
						     ]['interface'].substring(0,1) == 'V' " style="font-size: 11px;position:fixed; margin-top: -0.7%;padding-left:0.2%; ">Vlan304</span>

							<img class="rj" src="../img/rj1.png" :style=" 'background-color:' + status['10.99.7.1'][col+25] " @click="activeModal(detailInterface['10.99.7.1'][col+25])"> -->
							<!-- <span style="padding-left: 0.5em; " v-if="(col%8) == 0"></span> -->
						<!-- </b><hr class="br">	 -->
					</center>
				</div>
			</div>
			<!-- *************************** SW3850 ***************************-->
			<div v-if="showSwitch === 'SW3850' " class="divSwitch">
				<div id="switch">
					<center>
						<b v-for="col in 22">
							<span  v-if="detailInterface['10.99.2.1'][col-1]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa'+ detailInterface['10.99.2.1'][col-1]['interface'].substring(12,detailInterface['10.99.2.1'][col-1]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.2.1'][col-1]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.2.1'][col-1]['interface'].substring(18,detailInterface['10.99.2.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.2.1'][col-1]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' +detailInterface['10.99.2.1'][col-1]['interface'].substring(15,detailInterface['10.99.2.1'][col-1]['interface'].length) }} </span> 

						     <span v-if="detailInterface['10.99.2.1'][col-1]['interface'].substring(0,1) == 'V' " style="font-size: 11px;position:fixed; margin-top: -0.7%;padding-left:0.2%; ">Vlan304</span>

							<img class="rj" src="../img/rj1.png" :style=" 'background-color:' + status['10.99.2.1'][col-1] " @click="activeModal(detailInterface['10.99.2.1'][col-1])">
							
						</b>
						
					</center>
				</div>
			</div>
			<!-- *************************** ISR4451 ***************************-->
			<div v-if="showSwitch === 'ISR4451' " class="divSwitch">
				<div id="switch">
					<center>
						<b v-for="col in 5">
							<span  v-if="detailInterface['10.99.0.1'][col-1]['interface'].substring(0,1) == 'F' " id="fa"> {{'Fa'+ detailInterface['10.99.0.1'][col-1]['interface'].substring(12,detailInterface['10.99.0.1'][col-1]['interface'].length) }} </span>
	  					    <span v-if="detailInterface['10.99.0.1'][col-1]['interface'].substring(0,1) == 'T' " id="ten"> {{'T' + detailInterface['10.99.0.1'][col-1]['interface'].substring(18,detailInterface['10.99.0.1'][col-1]['interface'].length) }} </span>
						     <span v-if="detailInterface['10.99.0.1'][col-1]['interface'].substring(0,1) == 'G' " id="gi"> {{'Gi' +detailInterface['10.99.0.1'][col-1]['interface'].substring(15,detailInterface['10.99.0.1'][col-1]['interface'].length) }} </span> 

							<img class="rj" src="../img/rj1.png" :style=" 'background-color:' + status['10.99.0.1'][col-1] " @click="activeModal(detailInterface['10.99.0.1'][col-1])">
							
						</b>
						
					</center>
				</div>
			</div>


		</div>

		
		<modal-detail :show-modal="showModal"  :close-modal="closeModal" :show-detail="showDetail" ></modal-detail>
		
	</div>
</template> 
<script>
	/*eslint-disable */
	import ModalDetail from '@/components/modal'

	import axios from 'axios'
	export default {
		name: 'Interface',
		components: { 
			ModalDetail 
		},
		mounted: function () {
			this.active = false
			this.getDetail()
			this.getInterface()
			this.showInterface('SW4503')
		},
		data () {
			return {// get-api-myproject
				urlDetail: "https://test-post-api.herokuapp.com/1USfbjHmVE0vpOPvq8mDpGbad-zX6PTDxUeQBDlcs6JI/sheet1!C:C",
				urlInterface: "https://test-post-api.herokuapp.com/1eZwYLOMnsvuNNr9tg27-BUiQQMxOXsyQ76XeWFmI4xc/sheet1!C:C",
				detail: '',
				interfaces: '',
				showModal: false,
				showDetail:'',
				portName: '',
				portRJ: 26,
				range: '',
				status: {
					'10.99.1.1':[],
					'10.99.3.1':[],
					'10.99.4.1':[],
					'10.99.6.1':[],
					'10.99.5.1':[],
					'10.99.7.1':[],
					'10.99.2.1':[],
					'10.99.0.1':[]
				},
				c:0,
				active:false,
				showSwitch: '',
				detailInterface: {
					'10.99.1.1':[],
					'10.99.3.1':[],
					'10.99.4.1':[],
					'10.99.6.1':[],
					'10.99.5.1':[],
					'10.99.7.1':[],
					'10.99.2.1':[],
					'10.99.0.1':[]
				},
				vlan: {
					'10.99.1.1':[],
					'10.99.3.1':[],
					'10.99.4.1':[],
					'10.99.6.1':[],
					'10.99.5.1':[],
					'10.99.7.1':[],
					'10.99.2.1':[],
					'10.99.0.1':[]
				},
				statusBtn:{
					SW4503:false,
					R101C:false,
					R124:false,
					R415:false,
					R330A:false,
					Rshop:false,
					SW3850:false,
					ISR4451:false
				},
				start: true
			}
		},
		methods: {
			closeModal () {
				this.showModal = false
			},
			activeModal (data) {
				this.$set(this, 'showModal', true)
				this.$set(this, 'showDetail', data)  
			},
			getDetail () {
				axios.get(this.urlDetail).then(res => {
					let values = res.data.values
					let length  = values.length-1
					this.detail = JSON.parse(values[length][0])
				})
			},
			getInterface (){
				axios.get(this.urlInterface).then(res => {
					let values = res.data.values
					let length  = values.length-1
					this.interfaces = JSON.parse(values[length][0])	

					for (let index in this.interfaces) {       	
						for (let indexInDetail in this.interfaces[index]['detail']) {
							let ip = this.interfaces[index]['ip']
							let name = this.interfaces[index]['detail'][indexInDetail]['interface']

							if(name.substring(0,1) == 'V' && name.substring(0,1) != 'G' && name.substring(0,1) != 'T'){
							console.log(name)
								if(ip == "10.99.2.1" && name == "Vlan304" ){
									if (ip in this.detailInterface){
										this.detailInterface[ip].push(this.interfaces[index]['detail'][indexInDetail])
										let tus = this.interfaces[index]['detail'][indexInDetail]['status']
										if (tus === 'Up'){
											this.status[ip].push('#19ff79;')
										}
										else if (tus === 'Down'){
											this.status[ip].push('#ff4c4c;')
										}
								    }	
								}

								else if(ip == "10.99.1.1" && name == "Vlan304" ){
									if (ip in this.detailInterface){
										this.detailInterface[ip].push(this.interfaces[index]['detail'][indexInDetail])
										let tus = this.interfaces[index]['detail'][indexInDetail]['status']
										if (tus === 'Up'){
											this.status[ip].push('#19ff79;')
										}
										else if (tus === 'Down'){
											this.status[ip].push('#ff4c4c;')
										}
								    }	
								}
							}else{
								//console.log(ip,this.detailInterface[ip])
								if (ip in this.detailInterface){
									this.detailInterface[ip].push(this.interfaces[index]['detail'][indexInDetail])
									let tus = this.interfaces[index]['detail'][indexInDetail]['status']

									if (tus === 'Up'){
										this.status[ip].push('#19ff79;')
									}
									else if (tus === 'Down'){
										this.status[ip].push('#ff4c4c;')
									}
								}	
							}

						}
					}

				this.load = true
				}) 
			},
			showInterface (name){
				this.showSwitch = name
				this.start = false
				if(name === 'SW4503'){
					this.statusBtn.SW4503 = true
					this.statusBtn.R101C = false
					this.statusBtn.R124 = false
					this.statusBtn.R415 = false
					this.statusBtn.R330A = false
					this.statusBtn.Rshop = false
					this.statusBtn.SW3850 = false 
					this.statusBtn.ISR4451 = false 
				}
				else if(name === 'R101C'){
					this.statusBtn.SW4503 = false 
					this.statusBtn.R101C = true
					this.statusBtn.R124 = false
					this.statusBtn.R415 = false
					this.statusBtn.R330A = false
					this.statusBtn.Rshop = false
					this.statusBtn.SW3850 = false 
					this.statusBtn.ISR4451 = false 
				}
				else if(name === 'R124'){
					this.statusBtn.SW4503 = false
					this.statusBtn.R101C = false
					this.statusBtn.R124 =  true
					this.statusBtn.R415 = false
					this.statusBtn.R330A = false
					this.statusBtn.Rshop = false
					this.statusBtn.SW3850 = false 
					this.statusBtn.ISR4451 = false 
				}
				else if(name === 'R415'){
					this.statusBtn.SW4503 = false
					this.statusBtn.R101C = false
					this.statusBtn.R124 = false 
					this.statusBtn.R415 = true
					this.statusBtn.R330A = false
					this.statusBtn.Rshop = false
					this.statusBtn.SW3850 = false 
					this.statusBtn.ISR4451 = false 
				}
				else if(name === 'R330A'){
					this.statusBtn.SW4503 = false
					this.statusBtn.R101C = false
					this.statusBtn.R124 = false 
					this.statusBtn.R415 = false 
					this.statusBtn.R330A = true
					this.statusBtn.Rshop = false
					this.statusBtn.SW3850 = false 
					this.statusBtn.ISR4451 = false 
				}
				else if(name === 'Rshop'){
					this.statusBtn.SW4503 = false
					this.statusBtn.R101C = false
					this.statusBtn.R124 = false 
					this.statusBtn.R415 = false 
					this.statusBtn.R330A = false
					this.statusBtn.Rshop = true 
					this.statusBtn.SW3850 = false
					this.statusBtn.ISR4451 = false  
				}
				else if(name === 'SW3850'){
					this.statusBtn.SW4503 = false
					this.statusBtn.R101C = false
					this.statusBtn.R124 = false 
					this.statusBtn.R415 = false 
					this.statusBtn.R330A = false
					this.statusBtn.Rshop = false 
					this.statusBtn.SW3850 = true 
					this.statusBtn.ISR4451 = false 
				}
				else if(name === 'ISR4451'){
					this.statusBtn.SW4503 = false
					this.statusBtn.R101C = false
					this.statusBtn.R124 = false 
					this.statusBtn.R415 = false 
					this.statusBtn.R330A = false
					this.statusBtn.Rshop = false 
					this.statusBtn.SW3850 = false 
					this.statusBtn.ISR4451 = true 
				}

			}

		}
		
	}
</script>

<style scoped>
	.rj {
		width: 3.2%;
	}
	.divSwitch {
		padding-bottom: 30px;
		padding-top: 30px;
		padding-left: 17px;
		padding-right: 17px;
		background-color: #373d45;
	}
	#fa{
		font-size: 11px;
		position:fixed; 
		margin-top: -0.7%;
		padding-left:0.6%; 
		
	}
	#ten{
		font-size: 11px;
		position:fixed; 
		margin-top: -0.7%;
		padding-left:0.4%; 
	
	}
	#gi{
		font-size: 11px;
		position:fixed; 
		margin-top: -0.7%;
		padding-left:0.4%; 
	
	}
	.br {
		padding-bottom:1%;
		padding-top:0rem; 
		margin:0rem;
	}
	#switch {
		padding-top: 15px;
		background-color: #cedcdf;
	}
	img:hover {
    	background-color: yellow;
    }
</style>
