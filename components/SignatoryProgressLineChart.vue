<template>
  <div class="line-chart-container">
    <LineChart
      :data="chartData"
      :options="chartOptions"
      class="line-chart"></LineChart>
  </div>
</template>
<style scoped>
.line-chart-container {
  max-width: 100%;
  overflow-x: scroll;
}
.line-chart {
  height: 400px;
  min-width: 800px;
}

</style>
<script>
import LineChart from '~/components/charts/line-chart'
export default {
  name: 'SignatoryProgressLineChart',
  components: {
    LineChart
  },
  props: [
    'signatoryProgressData',
    'signatoryProgressFields',
    'signatoryProgressChartFields',
    'signatoryProgressDivideBy'
  ],
  data() {
    return {
      colours: [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf"
      ]
    }
  },
  computed: {
    signatoryProgressDataForChart() {
      return this.signatoryProgressFields.filter(item => {
        return this.signatoryProgressChartFields.includes(item.key)
      })
    },
    chartOptions() {
      const tooltips = {
        callbacks: {
          label: ((tooltipItem, data) => {
            return `${this.chartData.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.yLabel}%`
          })
        }
      }
      const scales = {
        yAxes: [
          {
            id: 'y-axis-left',
            position: 'left',
            ticks: {
              beginAtZero: true,
              precision: 0,
              stepSize: 25,
              max: 100,
              callback: function(tick) {
                return `${tick}%`
              }
            },
            scaleLabel: {
              display: false
            },
            gridLines: {
              display: true
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: true
            },
            ticks: {
              callback: function(tick) {
                console.log('tick', tick)
                return tick
              }
            },
          }
        ]
      }
      const legend = {
        display: true,
        position: 'bottom'
      }
      return {
        maintainAspectRatio: false,
        legend: legend,
        tooltips: tooltips,
        scales: scales,
        layout: {
          padding: 20
        }
      }
    },
    chartData() {
      return {
        datasets: this.signatoryProgressDataForChart.map((field, i) => {
          return {
            label: field.label,
            fill: false,
            data: this.makeData(field.key, field.divideBy),
            borderColor: this.colours[i],
            yAxisID: 'y-axis-left',
            type: 'line',
            showLine: true
          }
        }),
        labels: this.makeLabels('Date'),
      }
    }
  },
  methods: {
    makeData(valueField, divideBy) {
      var _data = this.signatoryProgressData.map((ds) => {
        return Math.round((ds[valueField] / ds[divideBy])*100)
      })
      return _data
    },
    makeLabels(labelField) {
      return this.signatoryProgressData.map((ds) => { return ds[labelField] })
    },
    numberFormatter(value) {
      return value ? value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }) : ""
    }
  }
}
</script>
