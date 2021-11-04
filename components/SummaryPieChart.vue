<template>
  <PieChart
    :data="chartData"
    :options="chartOptions"
    class="pie-chart"></PieChart>
</template>

<style scoped>
.pie-chart {
  height: 300px;
}
</style>
<script>

import PieChart from '~/components/charts/pie-chart'
export default {
  props: ['labels', 'data'],
  components: {
    PieChart
  },
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
    chartOptions() {
      const legend = {
        display: true
      }
      return {
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: null,
        layout: {
          padding: 20
        },
        plugins: {
          datalabels: {
            backgroundColor: function(context) {
              return context.dataset.backgroundColor;
            },
            display: true,
            borderColor: 'white',
            borderRadius: 10,
            borderWidth: 2,
            color: 'white',
            textShadowColor : '#000000',
            textShadowBlur: 2,
            font: {
              weight: 'bold'
            }
          }
        }
      }
    },
    chartData() {
      return {
        datasets: [
          {
            fill: true,
            data: this.data,
            fill: true,
            backgroundColor: this.colours
          }
        ],
        labels: this.labels
      }
    }
  }
}
</script>
