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
        <div class="col-lg-5">
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

        <div class="col-lg-7">
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
    </v-container>
  </v-app>
</template>

<script>
import CardStat from "@/functionnalities/statistiques/admin/widgets/CardStat.vue";
import {
  API_GET_DOCUMENT_URL,
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
      search: "",
      loading: true,
      headers: [
        { text: "Designation", value: "" },
        { text: "Type ,de l'offre", value: "" },
        { text: "Départ", value: "" },
        { text: "Destination", value: "" },
      ],

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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

      chartDataDoughnut: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#2f3542", "#2ed573", "#2ed573"],
            data: [],
          },
        ],
      },
      chartOptionsDoughnut: {
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

      reservationList: [],

      photoProfilObject: {
        data: {
          typeDocument: null,
        },
      },

      dataToSend: {
        data: {
          raisonSociale: null,
        },
      },

      photoProfilUrl: null,
      dataStatistics: null,
    };
  },

  methods: {
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

    // Récupérer les statistiques de reservation au chargement de la page
    async getStatisticsByReservation() {
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
          console.log(response);
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

    // Obtenir la photo de profil de l'utilisateur courant
    async getUrlPhotoProfil() {
      this.photoProfilObject.data.typeDocument = "PHOTO_PROFIL";
      this.loading = true;
      await axios
        .post(API_GET_DOCUMENT_URL, this.photoProfilObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          console.log(this.$store.state.userAuthentified.token);
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
  },

  computed: {},

  mounted() {
    this.getUrlPhotoProfil();
    this.getStatisticsByReservation();
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

.card-title-text {
  font-size: 17px;
  letter-spacing: 1.9px;
  font-family: "Montserrat";
  color: #2d3436;
  opacity: 0.9;
  font-weight: bold;
}

.libelle {
  color: black;
  opacity: 0.8;
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
}

.cfa {
  color: white;
}

.btn-libelle {
  text-decoration: underline;
  color: white;
}

.titre {
  font-weight: 15px;
  font-weight: bold;
  color: #2f3640;
}

.cfa {
  color: white;
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
</style>
