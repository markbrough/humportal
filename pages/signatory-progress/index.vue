<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <h1>Signatory Progress</h1>
        <p class="lead">The Grand Bargain transparency workstream uses the following IATI publishing indicators for the workstream <nuxt-link :to="{name: 'signatory-progress-cctri-target'}">Core Commitment Target Results & Indicators (CCTRIs)</nuxt-link>.The aim of these indicators is to track the improvement in the quality and usability of the IATI data published by the Grand Bargain signatories.</p>
        <h2>Data publication aggregated signatory progress</h2>
        <SignatoryProgressLineChart
          :signatory-progress-data="signatoryProgressData"
          :signatory-progress-chart-fields="signatoryProgressChartFields"
          :signatory-progress-fields="signatoryProgressFields"
           />
        <hr />
        <b-row class="mb-2">
          <b-col lg="9">
            <h2>Signatories meeting data publication CCTRIs</h2>
          </b-col>
          <b-col lg="3" class="text-lg-right">
            <b-btn :href="signatoryProgressDataCSVURL" variant="primary">
              <font-awesome-icon :icon="['fas', 'download']" /> Download CSV
            </b-btn>
          </b-col>
        </b-row>
        <b-table
          :fields="signatoryProgressFields"
          :items="signatoryProgressData"
          :busy="busy"
          >
          <template #table-busy>
            <div class="text-center text-muted my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template #thead-top="data">
            <b-tr>
              <b-th colspan="3"></b-th>
              <b-th colspan="5" variant="secondary" class="text-center font-italic font-weight-light">
                Of IATI Publishers
              </b-th>
            </b-tr>
          </template>
          <template v-slot:[colName]="data" v-for="colName in ['cell(Publishing open data using IATI)']">
            {{ data.value }} organisations ({{ makePercent(data.value, data.item['Total Signatories']) }})
          </template>
          <template v-slot:[colName]="data" v-for="colName in [
            'cell(Publishing data on their humanitarian activities)',
            'cell(Using v2.02 of the IATI standard or later)',
            'cell(Providing more granular v2.02)',
            'cell(Publishing Traceability Information)',
            'cell(Providing more granular v2.03)',
          ]">
            <template v-if="!isNaN(data.value)">
              {{ data.value }} organisations {{ makePercent(data.value, data.item['Publishing open data using IATI']) }}
            </template>
            <template v-else>
              {{ data.value }}
            </template>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SignatoryProgressLineChart from '~/components/SignatoryProgressLineChart.vue'
import { mapState } from 'vuex'
import DecorationLanding from '~/components/DecorationLanding.vue'
export default {
  components: {
    DecorationLanding
  },
  data() {
    return {
      busy: true,
      signatoryProgressChartFields: [
        'Publishing open data using IATI',
        'Publishing data on their humanitarian activities',
        'Using v2.02 of the IATI standard or later',
        'Providing more granular v2.02',
        'Publishing Traceability Information',
        'Providing more granular v2.03'
      ],
      signatoryProgressFields: [
        {
          key: 'Date'
        },
        {
          key: 'Total Signatories',
          label: 'Total no. of Grand Bargain signatories'
        },
        {
          key: 'Publishing open data using IATI',
          label: 'Organisations* publishing to IATI',
          divideBy: 'Total Signatories'
        },
        {
          key: 'Publishing data on their humanitarian activities',
          label: 'Publishing hum. activity data',
          divideBy: 'Publishing open data using IATI'
        },
        {
          key: 'Using v2.02 of the IATI standard or later',
          label: 'Using v2.02 of the IATI standard or later',
          divideBy: 'Publishing open data using IATI'
        },
        {
          key: 'Providing more granular v2.02',
          label: 'Providing granular v2.02 data',
          divideBy: 'Publishing open data using IATI'
        },
        {
          key: 'Publishing Traceability Information',
          label: 'Publishing IATI traceability info',
          divideBy: 'Publishing open data using IATI'
        },
        {
          key: 'Providing more granular v2.03',
          label: 'Providing granular v2.03 data',
          divideBy: 'Publishing open data using IATI'
        }
      ]
    }
  },
  computed: {
    signatoryProgressDataCSVURL() {
      return `${this.apiURL}/signatories-progress.csv`
    },...mapState(['signatoryProgressData', 'apiURL'])
  },
  methods: {
    makePercent(numerator, denominator) {
      if (isNaN(numerator)) { return '' }
      return `(${Math.round((numerator / denominator)*100)}%)`
    }
  },
  async mounted() {
    await this.$store.dispatch('loadSignatoryProgressData')
    this.busy = false
  }
}
</script>
<style>
.stat-description {
  font-weight: bold;
}
.stat {
  margin-top: 10px;
  font-size: 64px;
  font-weight: 600;
}
.red-color {
  color:  #ed6060;
}
.blue-color {
  color:  #6e5acc;
}
.green-color {
  color:  #59CCBF;
}
</style>
