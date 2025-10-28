<template>
  <v-app id="inspire">
    <v-container>
      <div class="row justify-space-evenly">
        <div class="col-lg-1">
          <v-avatar size="72">
            <v-img
              v-if="photoProfilUrl == null"
              src="@/assets/avatar.png"
            ></v-img>
            <v-img v-else :src="photoProfilUrl"></v-img>
          </v-avatar>
        </div>
        <div class="col-lg-4">
          <div class="row">
            <span class="greeting"
              >Bienvenue, {{ $store.state.userAuthentified.nom }}</span
            >
          </div>
          <div class="row">
            <span class="last_connexion"
              >Dernière connexion le:
              {{ $store.state.userAuthentified.lastConnection }}</span
            >
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <span class="stats_text">Statistiques de reservation</span>
        </div>
        <div class="col-md-auto">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn btn color="white" small v-bind="attrs" v-on="on">
                <v-icon color="black" size="15">mdi-calendar-search</v-icon>
                {{ dateSelected == null ? "Par Date" : dateSelected }}
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
                <v-icon color="black">mdi-menu-down</v-icon>
                {{ sectionGroup == null ? "Section" : sectionGroup }}
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
          <v-btn small color="secondary" @click="applyFilterReservation"
            ><v-icon>mdi-magnify</v-icon> Appliquer</v-btn
          >
        </div>
      </div>

      <div class="row justify-content-end">
        <div
          class="col-lg-2"
          :hidden="dateSelected !== 'Periodique' || dateSelected == null"
        >
          <v-text-field
            v-model="dateDebut"
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
            v-model="dateFin"
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
          <v-text-field
            v-model="datePrecise"
            type="date"
            solo
            rounded
            dense
          ></v-text-field>
        </div>
        <div
          class="col-lg-3"
          :hidden="sectionGroup !== 'Gare de transport' || sectionGroup == null"
        >
          <v-select
            label="Gare de transport"
            v-model="gareDesignationSelected"
            rounded
            solo
            dense
            :items="gareDisponiblesList"
            item-text="designation"
            item-value="designation"
          ></v-select>
        </div>
      </div>
      <br />

      <span
        v-if="isFilterApply == true && sectionGroup == 'Gare de transport'"
        class="statistic_text"
        >Statistiques de reservation par Gare: ({{
          gareDesignationSelected
        }})</span
      >
      <StatistiqueReservationParGareTransport
        v-if="isFilterApply == true && sectionGroup == 'Gare de transport'"
        :data-statistique-gare-transport="dataStatisticGareTransport"
        :chartDataGare="chartDataGare"
        :chart-data-doughnut-gare="chartDataDoughnutGare"
      ></StatistiqueReservationParGareTransport>
      <br />

      <!-- STATISTIQUE DE RESERVATIONS DES OFFRES DE VOYAGES JOURNALIER -->
      <span class="statistic_text"
        >Statistiques de reservations (Journalier)</span
      >
      <div class="row">
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/salary.png')"
            title="Chiffre d'affaires"
            :value="
              dataStatisticsToday == null
                ? 0
                : dataStatisticsToday.chiffreAffaires
            "
            :isPrice="true"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/ticket.png')"
            title="Total des reservations"
            :value="
              dataStatisticsToday == null
                ? 0
                : dataStatisticsToday.nombreTotalReservationBilletVoyage
            "
            :isPrice="false"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/cross.png')"
            title="Chiffre d'affaire des bagages"
            :value="
              dataStatisticsToday == null
                ? 0
                : dataStatisticsToday.chiffreAffairesBagages == null
                ? 0
                : dataStatisticsToday.chiffreAffairesBagages
            "
            :isPrice="true"
          ></CardStat>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <v-card rounded="lg">
            <v-card-text>
              <LineChartGenerator
                :chart-options="chartOptionsToday"
                :chart-data="chartDataToday"
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

        <div class="col-lg-12">
          <v-card rounded="lg">
            <v-card-text>
              <Doughnut
                :chart-options="chartOptionsDoughnutToday"
                :chart-data="chartDataDoughnutToday"
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

      <v-divider></v-divider>

      <!-- STATISTIQUE DE RESERVATIONS DES OFFRES DE VOYAGES ANNUEL -->

      <span class="statistic_text">Statistiques de reservations (Annuel)</span>

      <div class="row">
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/salary.png')"
            title="Chiffre d'affaires"
            :value="dataStatistics == null ? 0 : dataStatistics.chiffreAffaires"
            :isPrice="true"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/ticket.png')"
            title="Total des reservations"
            :value="
              dataStatistics == null
                ? 0
                : dataStatistics.nombreTotalReservationBilletVoyage
            "
            :isPrice="false"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/cross.png')"
            title="Chiffre d'affaire des bagages"
            :value="
              dataStatistics == null ? 0 : dataStatistics.chiffreAffairesBagages
            "
            :isPrice="true"
          ></CardStat>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <v-card rounded="lg">
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

        <div class="col-lg-12">
          <v-card rounded="lg">
            <v-card-text>
              <Doughnut
                :chart-options="chartOptionsDoughnut"
                :chart-data="chartDataDoughnut"
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

      <v-divider></v-divider>
      <span class="statistic_text"
        >Statistiques des offres de voyages ({{ getTextPeriod }})</span
      >
      <div class="row">
        <div class="col-lg-8">
          <v-card>
            <v-card-title
              ><span class="simple_text"
                >Liste des offres de voyage</span
              ></v-card-title
            >
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="offreVoyageDisponibleList"
                :loading="loading"
                :search="search"
              >
                <template v-slot:[`item.isActif`]="{ item }">
                  <v-chip
                    x-small
                    v-if="item.isActif == true"
                    color="success"
                    text-color="white"
                    class="mr-2"
                    ><span class="etat font-weight-bold">active</span></v-chip
                  >
                  <v-chip
                    x-small
                    v-else
                    color="red"
                    text-color="white"
                    class="mr-2"
                    ><span class="etat">non-active</span></v-chip
                  >
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    title="plus de détails"
                    color="teal"
                    small
                    class="mr-2"
                    @click="getStatisticsOffreVoyageCompagnie(item.designation)"
                    >mdi-chart-bar</v-icon
                  >
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/cross.png')"
            title="Offre de voyage"
            :value="
              offreVoyageStatistique == null
                ? 'Aucune selection d\'offre'
                : offreVoyageStatistique.offreVoyageDesignation
            "
            :isPrice="false"
          ></CardStat>
        </div>
      </div>

      <div class="row" v-if="offreVoyageStatistique != null">
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/salary.png')"
            title="Chiffre d'affaires"
            :value="
              offreVoyageStatistique == null
                ? 0
                : offreVoyageStatistique.chiffreAffairesReservation
            "
            :isPrice="true"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/ticket.png')"
            title="Total des reservations"
            :value="
              dataStatistics == null
                ? 0
                : offreVoyageStatistique.nombreReservationBilletVoyage
            "
            :isPrice="false"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/cross.png')"
            title="Chiffre d'affaire des bagages"
            :value="
              offreVoyageStatistique == null
                ? 0
                : offreVoyageStatistique.chiffreAffairesBagage == null
                ? 0
                : offreVoyageStatistique.chiffreAffairesBagage
            "
            :isPrice="true"
          ></CardStat>
        </div>
      </div>

      <div class="row" v-if="offreVoyageStatistique != null">
        <div class="col-lg-5">
          <v-card rounded="lg">
            <v-card-text>
              <LineChartGenerator
                :chart-options="chartOptions"
                :chart-data="chartDataByProgram"
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
                :chart-data="chartDataDoughnutByProgram"
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
    </v-container>

    <v-alert
      class="myalert alert-success"
      type="success"
      width="350px"
      dismissible
      >{{ successMsg }}</v-alert
    >
    <v-alert
      class="myalert alert-error"
      type="error"
      width="350px"
      dismissible
      >{{ errorMsg }}</v-alert
    >
  </v-app>
</template>

<script>
import CardStat from "@/modules/statistiques/admin/widgets/CardStat.vue";
import {
  API_GET_DOCUMENT_URL,
  API_RECUPERER_LISTE_GARES_PAR_COMPAGNIE,
  API_RECUPERER_LISTE_OFFRE_VOYAGE,
  API_STATISTIQUE_OFFRE_VOYAGE_RESERVATION,
  API_STATISTIQUE_RESERVATIONS,
  HEADERS,
} from "../globalConfig/globalConstConfig";
import axios from "axios";
import $ from "jquery";
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
import StatistiqueReservationParGareTransport from "@/modules/statistiques/traders/views/StatistiqueReservationParGareTransport.vue";

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
  name: "DashboardAdminTransportCompanie",
  components: {
    CardStat,
    StatistiqueReservationParGareTransport,
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
      errorMsg: null,
      successMsg: null,

      loading: true,
      search: "",
      headers: [
        { text: "reference", value: "id" },
        { text: "Designation", value: "designation" },
        { text: "Type de l'offre", value: "typeOffreVoyageDesignation" },
        { text: "Ville de départ", value: "villeDepartDesignation" },
        { text: "Ville d'arrivée", value: "villeDestinationDesignation" },
        { text: "Active", value: "isActif" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      offreVoyageDisponibleList: [],

      offreVoyageObject: {
        data: {
          compagnieTransportRaisonSociale: null,
        },
      },

      chartDataToday: {
        labels: [],
        datasets: [
          {
            label: "Chiffre Affaire Réservation (Aujourd'hui)",
            backgroundColor: "#2f3542",
            data: [],
          },
          {
            label: "Chiffre Affaire Bagage (Aujourd'hui)",
            backgroundColor: "#2ed573",
            data: [],
          },
        ],
      },

      chartDataByProgram: {
        labels: [],
        datasets: [
          {
            label: "CA par Programme",
            backgroundColor: "#2f3542",
            data: [],
          },
          {
            label: "CA bagage par Programme",
            backgroundColor: "#2ed573",
            data: [],
          },
        ],
      },

      chartDataDoughnutByProgram: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#2f3542",
              "#2ed573",
              "#ffd32a",
              "#ffa801",
              "#3c40c6",
              "#f53b57",
              "#182C61",
              "#9AECDB",
              "#BDC581",
              "#82589F",
              "#EAB543",
              "#079992",
            ],
            data: [],
          },
        ],
      },

      chartOptionsToday: {
        responsive: true,
        maintainAspectRatio: false,
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

      chartDataDoughnutToday: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#2f3542",
              "#2ed573",
              "#ffd32a",
              "#ffa801",
              "#3c40c6",
              "#f53b57",
              "#182C61",
              "#9AECDB",
              "#BDC581",
              "#82589F",
              "#EAB543",
              "#079992",
            ],
            data: [],
          },
        ],
      },
      chartOptionsDoughnutToday: {
        responsive: true,
        maintainAspectRatio: false,
      },

      chartData: {
        labels: [],
        datasets: [
          {
            label: "Chiffre Affaire Réservation (Annuel)",
            backgroundColor: "#2f3542",
            data: [],
          },
          {
            label: "Chiffre Affaire Bagage (Annuel)",
            backgroundColor: "#2ed573",
            data: [],
          },
        ],
      },

      chartDataDoughnut: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#2f3542",
              "#2ed573",
              "#ffd32a",
              "#ffa801",
              "#3c40c6",
              "#f53b57",
              "#182C61",
              "#9AECDB",
              "#BDC581",
              "#82589F",
              "#EAB543",
              "#079992",
            ],
            data: [],
          },
        ],
      },

      chartDataGare: {
        labels: [],
        datasets: [
          {
            label: "Chiffre Affaire Réservation (Annuel)",
            backgroundColor: "#2f3542",
            data: [],
          },
          {
            label: "Chiffre Affaire Bagage (Annuel)",
            backgroundColor: "#2ed573",
            data: [],
          },
        ],
      },

      chartDataDoughnutGare: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#2f3542",
              "#2ed573",
              "#ffd32a",
              "#ffa801",
              "#3c40c6",
              "#f53b57",
              "#182C61",
              "#9AECDB",
              "#BDC581",
              "#82589F",
              "#EAB543",
              "#079992",
            ],
            data: [],
          },
        ],
      },
      chartOptionsDoughnut: {
        responsive: true,
        maintainAspectRatio: false,
      },

      isFilterApply: false,

      dateFilterList: [
        { title: "Periodique", value: "period" },
        { title: "À une date précise", value: "date" },
      ],

      sections: [{ title: "Gare de transport" }, { title: "Ma compagnie" }],

      sectionGroup: null,
      dateSelected: null,

      reservationList: [],

      photoProfilObject: {
        data: {
          typeDocument: null,
        },
      },

      dataToSend: {
        data: {
          raisonSociale: null,
          dateGiven: null,
          period: {
            dateDebut: null,
            dateFin: null,
          },
        },
      },

      dataToSendGare: {
        data: {
          gareDesignation: null,
          dateGiven: null,
          period: {
            dateDebut: null,
            dateFin: null,
          },
        },
      },

      offreVoyageStats: {
        data: {
          offreVoyageDesignation: null,
          dateGiven: null,
          period: {
            dateDebut: null,
            dateFin: null,
          },
        },
      },

      offreVoyageStatistique: null,

      gareListObject: {
        data: {
          compagnieTransportRaisonSociale: null,
        },
      },
      gareDisponiblesList: [],
      gareDesignationSelected: null,

      photoProfilUrl: null,
      dataStatistics: null,
      dataStatisticGareTransport: null,
      dataStatisticsToday: null,
      datePrecise: null,
      dateDebut: null,
      dateFin: null,
    };
  },

  methods: {
    // DELETE ALL DATAS GRAPH STATISTICS.

    deleteAllDataGraph() {
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
      this.chartData.datasets[1].data = [];
      this.chartDataDoughnut.labels = [];
      this.chartDataDoughnut.datasets[0].data = [];

      this.chartDataGare.labels = [];
      this.chartDataGare.datasets[0].data = [];
      this.chartDataGare.datasets[1].data = [];

      this.chartDataDoughnutGare.labels = [];
      this.chartDataDoughnutGare.datasets[0].data = [];
    },

    // APPLIQUER LA RECHERCHE PAR FILTRE.
    async applyFilterReservation() {
      this.deleteAllDataGraph();
      this.isFilterApply = true;
      var periodDate = "";
      var section = "";

      switch (this.sectionGroup) {
        case "Ma compagnie":
          section = "compagnie";
          this.dataToSend.data.raisonSociale =
            this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
          break;
        case "Gare de transport":
          section = "gare";
          this.dataToSendGare.data.gareDesignation =
            this.gareDesignationSelected;
          break;
        default:
          section = "compagnie";
          this.dataToSend.data.raisonSociale =
            this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
          break;
      }
      switch (this.dateSelected) {
        case "Periodique":
          if (section == "Ma compagnie" || section == "") {
            periodDate = "period";
            this.dataToSend.data.period.dateDebut = this.formatDate(
              this.dateDebut
            );

            this.dataToSend.data.period.dateFin = this.formatDate(this.dateFin);
          } else {
            periodDate = "period";
            this.dataToSendGare.data.period.dateDebut = this.formatDate(
              this.dateDebut
            );
            this.dataToSendGare.data.period.dateFin = this.formatDate(
              this.dateFin
            );
          }
          break;
        case "À une date précise":
          periodDate = "date";
          this.dataToSend.data.dateGiven = this.formatDate(this.datePrecise);
          this.dataToSendGare.data.dateGiven = this.formatDate(
            this.datePrecise
          );
          break;

        default:
          periodDate = "annuel";
          break;
      }
      await axios
        .post(
          API_STATISTIQUE_RESERVATIONS(periodDate, section),
          section == "compagnie" || section == ""
            ? this.dataToSend
            : this.dataToSendGare,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              if (section == "gare") {
                this.dataStatisticGareTransport = response.data.item;
                this.getLabelAndDataSetGraphicsLineGare(
                  this.dataStatisticGareTransport
                );

                this.getLabelAndDataSetGraphicsDoughnutGare(
                  this.dataStatisticGareTransport
                );
              } else {
                //this.dataStatistics = response.data.item;
                //this.getLabelAndDataSetGraphicsLine(this.dataStatistics);
                //this.getLabelAndDataSetGraphicsDoughnut(this.dataStatistics);
              }
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.getStatisticsReservationOffreVoyageByYear();
          this.loading = false;
        });
    },
    //OBTENIR LES STATISTIQUES DES OFFRES DE VOYAGE
    async getStatisticsOffreVoyageCompagnie(offreVoyageDesignation) {
      var periodDate = "";
      this.offreVoyageStatistique = null;
      this.chartDataByProgram.labels = [];
      this.chartDataByProgram.datasets[0].data = [];
      this.chartDataByProgram.datasets[1].data = [];
      this.chartDataDoughnutByProgram.labels = [];
      this.chartDataDoughnutByProgram.datasets[0].data = [];
      this.offreVoyageStats.data.offreVoyageDesignation =
        offreVoyageDesignation;
      switch (this.dateSelected) {
        case "Aujourd'hui":
          periodDate = "jour";
          break;
        case "Periodique":
          periodDate = "periode";
          this.offreVoyageStats.data.period.dateDebut = this.formatDate(
            this.dateDebut
          );
          this.offreVoyageStats.data.period.dateFin = this.formatDate(
            this.dateFin
          );
          break;
        case "À une date précise":
          periodDate = "date";
          this.offreVoyageStats.data.dateGiven = this.formatDate(
            this.datePrecise
          );
          break;
        case "Annuel":
          periodDate = "annuel";
          break;
        default:
          periodDate = "annuel";
          break;
      }
      await axios
        .post(
          API_STATISTIQUE_OFFRE_VOYAGE_RESERVATION(periodDate),
          this.offreVoyageStats,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.offreVoyageStatistique = response.data.item;
              this.getLabelAndDataSetGraphicsLineByProgram(
                this.offreVoyageStatistique
              );
              this.getLabelAndDataSetGraphicsDoughnutProgram(
                this.offreVoyageStatistique
              );
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //OBTENIR LISTE DES OFFRES DE VOYAGES DISPONIBLES PAR COMPAGNIE
    async obtenirOffreVoyageListParCompagnie() {
      this.offreVoyageObject.data.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.loading = true;
      await axios
        .post(API_RECUPERER_LISTE_OFFRE_VOYAGE, this.offreVoyageObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.offreVoyageDisponibleList = response.data.items;
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // Obtenir les libelles pour la legende des graphics
    getLabelAndDataSetGraphicsLineToday(data) {
      if (this.dataStatisticsToday != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesParOffreVoyage
        )) {
          this.chartDataToday.labels.push(cle);
          this.chartDataToday.datasets[0].data.push(valeur);
        }

        for (var value of Object.entries(
          data.chiffreAffairesBagagesParOffreVoyage
        )) {
          this.chartData.datasets[1].data.push(value);
        }
      }
    },

    // ------------------- Affichage des informations grâce aux graphs statistique en rapport avec les offres de voyages ------------------------ //

    getLabelAndDataSetGraphicsLineByProgram(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesReservationParProgramme
        )) {
          this.chartDataByProgram.labels.push(cle);
          this.chartDataByProgram.datasets[0].data.push(valeur);
        }

        for (var value of Object.entries(
          data.chiffreAffairesBagageParProgramme
        )) {
          this.chartDataByProgram.datasets[1].data.push(value);
        }
      }
    },

    getLabelAndDataSetGraphicsDoughnutProgram(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.nombreReservationBilletVoyageParProgramme
        )) {
          this.chartDataDoughnutByProgram.labels.push(cle);
          this.chartDataDoughnutByProgram.datasets[0].data.push(valeur);
        }
      }
    },

    // -----------------------------------------------------------------------------------------------------------------------------------------//

    // Obtenir les libelles pour la legende des graphics
    getLabelAndDataSetGraphicsDoughnutToday(data) {
      if (this.dataStatisticsToday != null) {
        for (var [cle, valeur] of Object.entries(
          data.nombreReservationBilletVoyageParOffreVoyage
        )) {
          this.chartDataDoughnutToday.labels.push(cle);
          this.chartDataDoughnutToday.datasets[0].data.push(valeur);
        }
      }
    },

    // Obtenir les libelles pour la legende des graphics
    getLabelAndDataSetGraphicsLine(data) {
      if (this.dataStatistics != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesParOffreVoyage
        )) {
          this.chartData.labels.push(cle);
          this.chartData.datasets[0].data.push(valeur);
        }

        for (var value of Object.entries(
          data.chiffreAffairesBagagesParOffreVoyage
        )) {
          this.chartData.datasets[1].data.push(value);
        }
      }
    },

    getLabelAndDataSetGraphicsLineGare(data) {
      if (this.dataStatisticGareTransport != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesParProgramme
        )) {
          this.chartDataGare.labels.push(cle);
          this.chartDataGare.datasets[0].data.push(valeur);
        }

        if (
          data.chiffreAffairesBagagesParOffreVoyage != undefined ||
          data.chiffreAffairesBagagesParOffreVoyage != null
        ) {
          for (var value of Object.entries(
            data.chiffreAffairesBagagesParOffreVoyage
          )) {
            this.chartDataGare.datasets[1].data.push(value);
          }
        }
      }
    },

    getLabelAndDataSetGraphicsDoughnutGare(data) {
      if (this.dataStatisticGareTransport != null) {
        for (var [cle, valeur] of Object.entries(
          data.nombreReservationBilletVoyageParProgramme
        )) {
          this.chartDataDoughnutGare.labels.push(cle);
          this.chartDataDoughnutGare.datasets[0].data.push(valeur);
        }
      }
    },

    // Obtenir les libelles pour la legende des graphics
    getLabelAndDataSetGraphicsDoughnut(data) {
      if (this.dataStatistics != null) {
        for (var [cle, valeur] of Object.entries(
          data.nombreReservationBilletVoyageParOffreVoyage
        )) {
          this.chartDataDoughnut.labels.push(cle);
          this.chartDataDoughnut.datasets[0].data.push(valeur);
        }
      }
    },

    // Récupérer les statistiques de reservation des offre de voyage par an au chargement de la page
    async getStatisticsReservationOffreVoyageByYear() {
      this.dataToSend.data.raisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      await axios
        .post(
          API_STATISTIQUE_RESERVATIONS("annuel", "compagnie"),
          this.dataToSend,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.dataStatistics = response.data.item;
              this.getLabelAndDataSetGraphicsLine(this.dataStatistics);
              this.getLabelAndDataSetGraphicsDoughnut(this.dataStatistics);
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // Récupérer les statistiques de reservation des offre de voyage à la date d'aujourd'hui au chargement de la page
    async getStatisticsReservationOffreVoyageToday() {
      this.dataToSend.data.raisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      await axios
        .post(
          API_STATISTIQUE_RESERVATIONS("jour", "compagnie"),
          this.dataToSend,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.dataStatisticsToday = response.data.item;
              this.getLabelAndDataSetGraphicsLineToday(
                this.dataStatisticsToday
              );
              this.getLabelAndDataSetGraphicsDoughnutToday(
                this.dataStatisticsToday
              );
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // Obtenir la photo de profil de l'utilisateur courant
    async getUrlPhotoProfil() {
      this.photoProfilObject.data.typeDocument = "PHOTO_PROFIL";
      this.loading = true;
      await axios
        .post(API_GET_DOCUMENT_URL, this.photoProfilObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.photoProfilUrl = response.data.item.url;
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // FORMAT DE LA DATE
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    // RECUPERER LA LISTE DES GARES ENREGISTRÉS PAR COMPAGNIE DE TRANSPORT
    async obtenirGareListParCompagnieTransport() {
      this.loading = true;
      this.gareListObject.data.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      axios
        .post(API_RECUPERER_LISTE_GARES_PAR_COMPAGNIE, this.gareListObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.gareDisponiblesList = response.data.items;
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  computed: {
    getTextPeriod() {
      var text = "";
      switch (this.dateSelected) {
        case "Aujourd'hui":
          text = "Journalier";
          break;
        case "Periodique":
          text = "Période : " + this.dateDebut + " Au " + this.dateFin;
          break;
        case "À une date précise":
          text = "À la date du: " + this.datePrecise;
          break;

        case "Annuel":
          text = "Annuel";
          break;

        default:
          text = "Annuel";
          break;
      }
      return text;
    },
  },

  mounted() {
    this.getUrlPhotoProfil();
    this.obtenirGareListParCompagnieTransport();
    this.obtenirOffreVoyageListParCompagnie();
    this.getStatisticsReservationOffreVoyageByYear();
    this.getStatisticsReservationOffreVoyageToday();
  },
};
</script>

<style scoped>
.greeting {
  font-size: 23px;
  word-spacing: 2px;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: "Montserrat";
}

.last_connexion {
  font-family: "Montserrat";
  opacity: 0.7;
}

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

.statistic_text {
  font-family: "Montserrat";
  font-size: 15px;
}

.myalert {
  display: none;
  z-index: 1900;
}

.alert-success {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}

.alert-error {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}
</style>
