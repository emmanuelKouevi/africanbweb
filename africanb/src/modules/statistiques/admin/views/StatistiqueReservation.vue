<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <div class="col">
          <span class="stats_text">Statistiques de reservation</span>
        </div>
        <div class="col-md-auto">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn btn color="white" small v-bind="attrs" v-on="on">
                <v-icon color="black" size="15">mdi-calendar-search</v-icon> Par
                date
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in dateFilterList" :key="index">
                <v-list-item-title class="simple_text"
                  ><v-radio-group v-model="dateSelected">
                    <v-radio :label="item.title" :value="item.title"></v-radio>
                  </v-radio-group>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="col-md-auto">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn btn small color="white" v-bind="attrs" v-on="on">
                <v-icon color="black">mdi-menu-down</v-icon> Section
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in sections" :key="index">
                <v-list-item-title class="simple_text"
                  ><v-radio-group v-model="sectionGroup">
                    <v-radio
                      :label="item.title"
                      :value="item.title"
                    ></v-radio> </v-radio-group
                ></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div class="col col-lg-2">
          <v-btn small color="secondary"
            ><v-icon>mdi-magnify</v-icon> Rechercher</v-btn
          >
        </div>
      </div>

      <div class="row justify-content-end">
        <div
          class="col-lg-2"
          :hidden="dateSelected !== 'Periodique' || dateSelected == null"
        >
          <v-text-field
            label="Début"
            type="date"
            solo
            rounded
            dense
          ></v-text-field>
        </div>
        <div
          class="col-lg-2"
          :hidden="dateSelected !== 'Periodique' || dateSelected == null"
        >
          <v-text-field
            label="Fin"
            type="date"
            solo
            rounded
            dense
          ></v-text-field>
        </div>
        <div
          class="col-lg-2"
          :hidden="
            dateSelected !== 'À une date précise' || dateSelected == null
          "
        >
          <v-text-field type="date" solo rounded dense></v-text-field>
        </div>
        <div
          class="col-lg-3"
          :hidden="sectionGroup !== 'Gare de transport' || sectionGroup == null"
        >
          <v-select label="Gare de transport" rounded solo dense></v-select>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/salary.png')"
            title="Chiffre d'affaires"
            value="6000"
            :isPrice="true"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/ticket.png')"
            title="Total des reservations"
            value="25"
            :isPrice="false"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/cross.png')"
            title="Nombre de place(s) restante(s)"
            value="12"
            :isPrice="false"
          ></CardStat>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-5">
          <v-card>
            <v-card-text>
              <LineChartGenerator
                :chart-options="chartOptions"
                :chart-data="chartData"
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
          <v-card>
            <v-card-text>
              <Doughnut
                :chart-options="chartOptions"
                :chart-data="chartData"
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
  </v-app>
</template>

<script>
import CardStat from "../widgets/CardStat.vue";
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
  name: "StatistiqueReservation",
  components: {
    CardStat,
    LineChartGenerator,
    Doughnut,
  },
  props: {
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
  data() {
    return {
      chartData: {
        labels: [
          "Janvier",
          "Fevrier",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Decembre   ",
        ],
        datasets: [
          {
            label: "Reservation Annuel",
            backgroundColor: "#f87979",
            data: [
              1000, 5000, 4000, 0, 35000, 5000, 17500, 15000, 0, 13450, 10000,
              70000,
            ],
          },
          {
            label: "Reservation journalier",
            backgroundColor: "#222f3e",
            data: [
              2000, 20000, 15000, 400, 9200, 8000, 1780, 5000, 0, 1450, 1200,
              650,
            ],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

      dateFilterList: [
        { title: "Aujourd'hui" },
        { title: "Periodique" },
        { title: "À une date précise" },
        { title: "Annuel" },
      ],

      sections: [{ title: "Gare de transport" }, { title: "Ma compagnie" }],

      sectionGroup: null,
      dateSelected: null,
    };
  },
};
</script>

<style scoped>
#inspire {
  background: #eeeeee;
}

.stats_text {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 25px;
  word-spacing: 1.2px;
  letter-spacing: 1.2px;
  opacity: 0.85;
}

.simple_text {
  font-family: "Montserrat";
  font-size: 15px;
}
</style>
