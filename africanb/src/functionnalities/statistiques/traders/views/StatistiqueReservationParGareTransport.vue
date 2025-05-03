<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <CardStat
          :icon="require('@/assets/salary.png')"
          title="Chiffre d'affaires"
          :value="
            dataStatistiqueGareTransport == null
              ? 0
              : dataStatistiqueGareTransport.chiffreAffaires
          "
          :isPrice="true"
        ></CardStat>
      </div>
      <div class="col-lg-4">
        <CardStat
          :icon="require('@/assets/ticket.png')"
          title="Total des reservations"
          :value="
            dataStatistiqueGareTransport == null
              ? 0
              : dataStatistiqueGareTransport.nombreTotalReservationBilletVoyage
          "
          :isPrice="false"
        ></CardStat>
      </div>
      <div class="col-lg-4">
        <CardStat
          :icon="require('@/assets/cross.png')"
          title="Chiffre d'affaire des bagages"
          :value="
            dataStatistiqueGareTransport == null
              ? 0
              : dataStatistiqueGareTransport.chiffreAffairesBagages
          "
          :isPrice="true"
        ></CardStat>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-5">
        <v-card rounded="lg">
          <v-card-text>
            <LineChartGenerator
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

      <div class="col-lg-7">
        <v-card rounded="lg">
          <v-card-text>
            <Doughnut
              :chart-options="chartOptions"
              :chart-data="chartDataDoughnutGare"
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
  </div>
</template>

<script>
import CardStat from "../../admin/widgets/CardStat.vue";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import { Doughnut } from "vue-chartjs/legacy";
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
    Doughnut,
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
