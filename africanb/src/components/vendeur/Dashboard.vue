<template>
  <v-app id="inspire">
    <div class="container">
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

        <div class="col col-lg-2">
          <v-btn small color="secondary" @click="applyFilterReservation"
            ><v-icon>mdi-magnify</v-icon> Appliquer</v-btn
          >
        </div>
      </div>
      <br />
      <span class="statistic_text"
        >Statistiques de reservations (Journalier)</span
      >
      <StatistiqueReservationParGareTransport
        :chart-data-gare="chartDataDaily"
        :dataStatistiqueGareTransport="dailyStatisticByStation"
      ></StatistiqueReservationParGareTransport
      ><br />

      <span class="statistic_text">Statistiques de reservations (Annuel)</span>
      <StatistiqueReservationParGareTransport
        :chart-data-gare="chartDataAnnual"
        :dataStatistiqueGareTransport="annualStatisticByStation"
      ></StatistiqueReservationParGareTransport>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import {
  API_GET_RESERVATIONS_BY_SELLER,
  API_GET_RESERVATIONS_BY_ADMIN_TP,
  HEADERS,
  API_GET_DOCUMENT_URL,
  API_STATISTIQUE_RESERVATIONS,
} from "../globalConfig/globalConstConfig";
import StatistiqueReservationParGareTransport from "@/functionnalities/statistiques/traders/views/StatistiqueReservationParGareTransport.vue";
export default {
  name: "DashboardSeller",
  components: {
    StatistiqueReservationParGareTransport,
  },
  data() {
    return {
      search: "",
      loading: true,
      headers: [
        { text: "REFERENCE", value: "" },
        { text: "PRIX", value: "" },
        { text: "NOM ET PRENOMS", value: "" },
        { text: "E-MAIL", value: "" },
      ],

      objectToSend: {
        data: {},
      },

      reservationList: [],

      photoProfilObject: {
        data: {
          typeDocument: null,
        },
      },

      photoProfilUrl: null,

      dateFilterList: [
        { title: "Aujourd'hui", value: "jour" },
        { title: "Periodique", value: "period" },
        { title: "À une date précise", value: "date" },
        { title: "Annuel", value: "annuel" },
      ],

      sectionGroup: null,
      dateSelected: null,

      chartDataDaily: {
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

      chartDataAnnual: {
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

      dataToSend: {
        data: {
          gareTransportDesignation: null,
          dateGiven: null,
          period: {
            dateDebut: null,
            dateFin: null,
          },
        },
      },

      dailyStatisticByStation: null,
      annualStatisticByStation: null,
    };
  },

  methods: {
    // GET DATAS FOR DAILY STATISTICS OF LINE GRAPH
    getLabelAndDataSetGraphicsLineDaily(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesParProgramme
        )) {
          this.chartDataDaily.labels.push(cle);
          this.chartDataDaily.datasets[0].data.push(valeur);
        }

        for (var value of Object.entries(
          data.chiffreAffairesBagagesParOffreVoyage
        )) {
          this.chartDataDaily.datasets[1].data.push(value);
        }
      }
    },

    getLabelAndDataSetGraphicsLineAnnual(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesParProgramme
        )) {
          this.chartDataAnnual.labels.push(cle);
          this.chartDataAnnual.datasets[0].data.push(valeur);
        }

        for (var value of Object.entries(
          data.chiffreAffairesBagagesParOffreVoyage
        )) {
          this.chartDataAnnual.datasets[1].data.push(value);
        }
      }
    },

    async getDailyStatisticsByStation() {
      this.dataToSend.data.gareDesignation =
        this.$store.state.userAuthentified.gareDesignation;
      await axios
        .post(API_STATISTIQUE_RESERVATIONS("jour", "gare"), this.dataToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
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
              this.dailyStatisticByStation = response.data.item;
              this.getLabelAndDataSetGraphicsLineDaily(
                this.dailyStatisticByStation
              );
              /*this.getLabelAndDataSetGraphicsDoughnutToday(
                this.dataStatisticsToday
              );*/
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

    async getAnnualStatisticsByStation() {
      this.dataToSend.data.gareDesignation =
        this.$store.state.userAuthentified.gareDesignation;
      await axios
        .post(API_STATISTIQUE_RESERVATIONS("annuel", "gare"), this.dataToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
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
              this.annualStatisticByStation = response.data.item;
              this.getLabelAndDataSetGraphicsLineAnnual(
                this.annualStatisticByStation
              );
              /*this.getLabelAndDataSetGraphicsDoughnutToday(
                this.dataStatisticsToday
              );*/
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

    // OBTENIR LA LISTE DE TOUTES LES RESERVATIONS ADMINISTRATEUR.
    async getAllReservationTicketByAdmin() {
      await axios
        .post(API_GET_RESERVATIONS_BY_ADMIN_TP, this.objectToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.hasError == false) {
              this.reservationList = response.data.items;
            } else {
              //
            }
          } else {
            alert("");
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // OBTENIR LA LISTE DE TOUTES LES RESERVATIONS PAR VENDEUR
    async getAllReservationTicketBySeller() {
      await axios
        .post(API_GET_RESERVATIONS_BY_SELLER, this.objectToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.hasError == false) {
              this.reservationList = response.data.items;
            } else {
              //
            }
          } else {
            //
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //OBTENIR LA LISTE DES RESERVATIONS EFFECTUÉ PAR LES UTILISATEUR À LA GARE
    async getAllReservationTicketAvailable() {
      this.loading = true;
      if (
        this.$store.state.userAuthentified.roleCode ==
        "RoleAdminCompagnieTransport"
      ) {
        this.getAllReservationTicketByAdmin();
      } else {
        this.getAllReservationTicketBySeller();
      }
    },

    // RECUPERER LA PHOTO DE PROFIL DE L'UTILISATEUR
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
  },

  computed: {
    totalPriceReservation() {
      var total = 0;
      for (let index = 0; index < this.reservationList.length; index++) {
        total += this.reservationList[index].montantTotalReservation;
      }
      return total;
    },
  },

  mounted() {
    this.getUrlPhotoProfil();
    this.getAllReservationTicketAvailable();
    this.getDailyStatisticsByStation();
    this.getAnnualStatisticsByStation();
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
  font-size: 12px;
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

.statistic_text {
  font-family: "Montserrat";
  font-size: 15px;
}

.stats_text {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 25px;
  word-spacing: 1.2px;
  letter-spacing: 1.2px;
  opacity: 0.85;
}
</style>
