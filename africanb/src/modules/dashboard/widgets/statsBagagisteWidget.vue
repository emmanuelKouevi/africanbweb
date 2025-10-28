<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <CardStat
          :icon="require('@/assets/ticket.png')"
          title="Chiffre d'Affaire Bagages"
          :value="
            dataStatisticBagStation == null
              ? 0
              : dataStatisticBagStation.chiffreAffaires
          "
          :isPrice="false"
        ></CardStat>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <v-card rounded="lg">
          <v-card-text>
            <LineChartGenerator
              :key="`chart-${Date.now()}`"
              :chart-options="chartOptions"
              :chart-data="chartDataGare"
              :chart-id="chartId"
              :dataset-id-key="datasetIdKey"
              :plugins="plugins"
              :css-classes="cssClasses"
              :styles="styles"
              :width="width"
              :height="height"
            />
          </v-card-text>
        </v-card>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import CardStat from "@/modules/statistiques/admin/widgets/CardStat.vue";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  ArcElement,
  CategoryScale,
  PointElement
);
export default {
  name: "StatistiqueReservationParGareTransport",
  props: {
    dataStatistiqueGareTransport: {
      type: Object,
      default: null,
    },

    dataStatisticBagStation: {
      type: Object,
      default: null,
    },

    chartDataDoughnutGare: {
      type: Object,
      default: () => ({}),
    },

    chartDataGare: {
      type: Object,
      default: () => ({}),
    },

    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CardStat,
    LineChartGenerator,
  },

  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
