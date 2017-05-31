import { Line, mixins } from 'vue-chartjs'

export default Line.extend({
  mixins: [mixins.reactiveProp],
  props: ['dataLineChart', 'options'],
  mounted () {
    this.renderChart(this.dataLineChart, this.options)
  }
})
