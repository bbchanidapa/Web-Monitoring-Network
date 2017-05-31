<template>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
export default {
	name: 'test',
	mounted: function () {
		this.getSheet()
	},
	data () {
	return {
		urlDetail: "https://apisheet.herokuapp.com/1Oykec18xewJw68XbG3xzJ3DU1N3mMqf6l7jBUwZ58Zs/sheet1!B:C",
		urlRatio: "https://apisheet.herokuapp.com/1o1XNXtyEcKHbkh326ofZN3yQFrOFgSTW44GCro_c_Zs/sheet1!B:C"
		}
	},
	methods: {
		getSheet (){
			

			axios.get(this.urlDetail).then(res => {
	        let values  = res.data.values
	        let length  = values.length-12
	        let sumInbound = 0
			let avgInbound = []
			let sumOutbound = 0
			let avgOutbound = []
			let beforeIn = 0
			let afterIn = 0
			let beforeOut = 0
			let afterOut = 0

	        for (length ; length < values.length; length++) {
	          let before = values[length-1][1]
	          let after = values[length][1]

	          before = JSON.parse(before)
	          after = JSON.parse(after)

	          beforeIn = Number(before['inbound'].substring(0,before['inbound'].search(" ")))
	          afterIn = Number(after['inbound'].substring(0,after['inbound'].search(" ")))
	          beforeOut = Number(before['outbound'].substring(0,before['outbound'].search(" ")))
	          afterOut = Number(after['outbound'].substring(0,after['outbound'].search(" ")))

	          sumInbound += (afterIn - beforeIn) * 1000 
	          avgInbound.push( (afterIn - beforeIn) * 1000 )
	          sumOutbound += (afterOut - beforeOut) * 1000 
	          avgOutbound.push( (afterOut - beforeOut) * 1000 )

	          console.log(sumInbound,sumOutbound )

	          // this.time.push(values[length][1])
	          // this.inbound.push(Number(json['inbound'].substring(0,json['inbound'].search(" "))))
	          // this.outbound.push(Number(json['outbound'].substring(0,json['inbound'].search(" "))))  
	        }

			let avgIn = (sumInbound/12).toFixed(2)
			let avgOut = (sumOutbound/12).toFixed(2)
			console.log(avgIn,avgOut)
			// this.averageout = (this.averageout/12).toFixed(2)
			// this.maxin = Math.max.apply(null, this.inbound).toFixed(2)
			// this.minin = Math.min.apply(null, this.inbound).toFixed(2) 
			// this.maxout = Math.max.apply(null, this.outbound).toFixed(2)
			// this.minout = Math.min.apply(null, this.outbound).toFixed(2)  

	        })
		}
	      
	}
}
</script>