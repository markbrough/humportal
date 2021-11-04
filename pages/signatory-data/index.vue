<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <h1>Signatory IATI data</h1>
        <p class="lead">This page provides an overview of the IATI ('open') data currently published by individual Grand Bargain signatories and/or their affiliated organisations. Its primary purpose is to enable signatories to monitor their own progress in relation to meeting the data publication commitment of the Grand Bargain.</p>
        <p class="lead">Each column in the table relates to a specific IATI publishing indicator as defined within the workstream <nuxt-link :to="{name: 'signatory-progress-cctri-target'}">Core Commitment Target Results & Indicators (CCTRIs)</nuxt-link>.</p>
        <h2>Signatories or their affiliate organisations</h2>
        <b-table
          :fields="signatoryFields"
          :items="signatoryData"
          :busy="busy"
          responsive
          >
            <template #table-busy>
              <div class="text-center text-muted my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(name)="data">
              <template v-if="data.item.iatiOrganisationID">
                <nuxt-link :to="{name: 'signatory-data-id', params: {id: data.item.iatiOrganisationID}}">
                  {{ data.value }}
                </nuxt-link>
              </template>
              <template v-else>
                {{ data.value }}
              </template>
            </template>
            <template v-slot:[colName]="data" v-for="colName in [
              'cell(humData)', 'cell(202HumData)', 'cell(203HumData)',
              'cell(traceability)', 'cell(monthly)']">
              <font-awesome-icon :icon="['fas', 'check']" v-if="data.value==true" />
              <font-awesome-icon :icon="['fas', 'times']" class="text-muted" v-else />
            </template>
          </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import { mapState } from 'vuex'
import DecorationLanding from '~/components/DecorationLanding.vue'
export default {
  components: {
    DecorationLanding
  },
  data() {
    return {
      busy: true,
      signatoryFields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'gbSignatory',
          label: 'GB Signatory',
          sortable: true
        },
        {
          key: 'organisationType',
          label: 'Organisation Type',
          sortable: true
        },
        {
          key: 'iatiVersion',
          label: 'Latest IATI Version',
          sortable: true
        },
        {
          key: 'humData',
          label: 'Publishing hum. data?',
          sortable: true
        },
        {
          key: '202HumData',
          label: 'Publishing v2.02 hum.data?',
          sortable: true
        },
        {
          key: '203HumData',
          label: 'Publishing v2.03 hum.data?',
          sortable: true
        },
        {
          key: 'traceability',
          label: 'Incoming trans traceability',
          sortable: true
        },
        {
          key: 'monthly',
          label: 'Publishing to IATI monthly',
          sortable: true
        },
      ]
    }
  },
  computed: mapState(['signatoryData']),
  async mounted() {
    await this.$store.dispatch('loadSignatoryData')
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
