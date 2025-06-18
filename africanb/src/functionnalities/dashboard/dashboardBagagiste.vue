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

      <div class="container">
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
                <v-list-item
                  v-for="(item, index) in dateFilterList"
                  :key="index"
                >
                  <v-list-item-title class="simple_text"
                    ><v-radio-group v-model="dateSelected">
                      <v-radio
                        :label="item.title"
                        :value="item.title"
                      ></v-radio>
                    </v-radio-group>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <div class="col col-lg-2">
            <v-btn
              :disabled="
                dateSelected == 'Aujourd\'hui' || dateSelected == 'Annuel'
              "
              small
              color="secondary"
              @click="applyFilterReservation"
              ><v-icon>mdi-magnify</v-icon> Appliquer</v-btn
            >
          </div>
          <br />
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
          </div>
        </div>
      </div>

      <br />

      <div class="container">
        <div class="row">
          <span class="statistic_text" v-if="isFilterApply == true"
            >Statistiques de reservations ({{
              dateSelected == "Periodique" ? "Periode" : "A une date precise"
            }})</span
          >
        </div>
      </div>

      <StatistiqueReservationParGareTransport
        v-if="isFilterApply == true"
        :chart-data-gare="
          dateSelected == 'Periodique' ? chartDataPeriod : chartDataMainDaily
        "
        :chartDataDoughnutGare="
          dateSelected == 'Periodique'
            ? chartDataDoughnutPeriod
            : chartDataDoughnutMainDaily
        "
        :dataStatistiqueGareTransport="
          dateSelected == 'Periodique'
            ? periodStatisticByStation
            : mainlyDateStatisticByStation
        "
        :data-statistic-bag-station="
          dateSelected == 'Periodique'
            ? periodStatisticBags
            : mainlyDateStatisticBags
        "
      ></StatistiqueReservationParGareTransport
      ><br />
      <v-divider></v-divider>
      <div class="container">
        <div class="row">
          <span class="statistic_text"
            >Statistiques de reservations (Journalier)</span
          >
        </div>
      </div>

      <StatistiqueReservationParGareTransport
        :chart-data-gare="chartDataDaily"
        :chartDataDoughnutGare="chartDataDoughnutDaily"
        :dataStatistiqueGareTransport="dailyStatisticByStation"
        :data-statistic-bag-station="dailyStatisticBags"
      ></StatistiqueReservationParGareTransport
      ><br />
      <v-divider></v-divider>

      <div class="container">
        <div class="row">
          <span class="statistic_text"
            >Statistiques de reservations (Annuel)</span
          >
        </div>
      </div>

      <StatistiqueReservationParGareTransport
        :chart-data-gare="chartDataAnnual"
        :chartDataDoughnutGare="chartDataDoughnutAnnual"
        :dataStatistiqueGareTransport="annualStatisticByStation"
        :dataStatisticBagStation="annualStatisticBags"
      ></StatistiqueReservationParGareTransport>
    </div>

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
import axios from "axios";
import $ from "jquery";
import {
  API_GET_RESERVATIONS_BY_SELLER,
  API_GET_RESERVATIONS_BY_ADMIN_TP,
  HEADERS,
  API_GET_DOCUMENT_URL,
  API_STATISTIQUE_RESERVATIONS,
  API_STATISTIQUE_BAGAGES,
} from "@/components/globalConfig/globalConstConfig";
import StatistiqueReservationParGareTransport from "@/functionnalities/statistiques/traders/views/StatistiqueReservationParGareTransport.vue";
export default {
  name: "DashboardSeller",
  components: {
    StatistiqueReservationParGareTransport,
  },
  data() {
    return {
      successMsg: null,
      errorMsg: null,

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
        { title: "Periodique", value: "period" },
        { title: "À une date précise", value: "date" },
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
            label: "Chiffre Affaire Bagage (Aujourd'hui)",
            backgroundColor: "#2ed573",
            data: [],
          },
        ],
      },

      chartDataDoughnutDaily: {
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

      chartDataDoughnutAnnual: {
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

      chartDataPeriod: {
        labels: [],
        datasets: [
          {
            label: "Chiffre Affaire Réservation (Periode)",
            backgroundColor: "#2f3542",
            data: [],
          },
          {
            label: "Chiffre Affaire Bagage (Period)",
            backgroundColor: "#2ed573",
            data: [],
          },
        ],
      },

      chartDataDoughnutPeriod: {
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

      chartDataMainDaily: {
        labels: [],
        datasets: [
          {
            label: "Chiffre Affaire Réservation (Periode)",
            backgroundColor: "#2f3542",
            data: [],
          },
          {
            label: "Chiffre Affaire Bagage (Period)",
            backgroundColor: "#2ed573",
            data: [],
          },
        ],
      },

      chartDataDoughnutMainDaily: {
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

      isFilterApply: false,

      dailyStatisticByStation: null,
      annualStatisticByStation: null,

      periodStatisticByStation: null,
      mainlyDateStatisticByStation: null,

      dailyStatisticBags: null,
      annualStatisticBags: null,

      periodStatisticBags: null,
      mainlyDateStatisticBags: null,

      dateDebut: null,
      dateFin: null,
      datePrecise: null,
    };
  },

  methods: {
    async getLabelAndDataSetGraphicsDoughnutPeriod(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.nombreReservationBilletVoyageParProgramme
        )) {
          this.chartDataDoughnutPeriod.labels.push(cle);
          this.chartDataDoughnutPeriod.datasets[0].data.push(valeur);
        }
      }
    },

    // GET DATAS FOR ANNUAL STATISTICS OF DOUGHNUTS GRAPH
    async getLabelAndDataSetGraphicsDoughnutMainDaily(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.nombreReservationBilletVoyageParProgramme
        )) {
          this.chartDataDoughnutMainDaily.labels.push(cle);
          this.chartDataDoughnutMainDaily.datasets[0].data.push(valeur);
        }
      }
    },

    getLabelAndDataSetGraphicsLinePeriodBag(data) {
      if (data != null) {
        if (
          data.chiffreAffairesParProgramme != null ||
          data.chiffreAffairesParProgramme != undefined
        )
          for (var value of Object.entries(data.chiffreAffairesParProgramme)) {
            this.chartDataPeriod.datasets[1].data.push(value);
          }
      }
    },

    getLabelAndDataSetGraphicsLineMainlyDateBag(data) {
      if (data != null) {
        for (var value of Object.entries(data.chiffreAffairesParProgramme)) {
          this.chartDataMainDaily.datasets[1].data.push(value);
        }
      }
    },

    getLabelAndDataSetGraphicsLinePeriod(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesParProgramme
        )) {
          this.chartDataPeriod.labels.push(cle);
          this.chartDataPeriod.datasets[0].data.push(valeur);
        }
      }
    },
    // GET DATAS FOR ANNUAL STATISTICS OF LINE GRAPH
    getLabelAndDataSetGraphicsLineMainDate(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesParProgramme
        )) {
          this.chartDataMainDaily.labels.push(cle);
          this.chartDataMainDaily.datasets[0].data.push(valeur);
        }
      }
    },
    // DELETE ALL DATAS GRAPH
    deleteAllDataGraph() {
      this.chartDataDaily.labels = [];
      this.chartDataDaily.datasets[0].data = [];
      this.chartDataDaily.datasets[1].data = [];

      this.chartDataDoughnutDaily.labels = [];
      this.chartDataDoughnutDaily.datasets[0].data = [];

      this.chartDataAnnual.labels = [];
      this.chartDataAnnual.datasets[0].data = [];
      this.chartDataAnnual.datasets[1].data = [];

      this.chartDataDoughnutAnnual.labels = [];
      this.chartDataDoughnutAnnual.datasets[0].data = [];

      this.chartDataMainDaily.labels = [];
      this.chartDataMainDaily.datasets[0].data = [];
      this.chartDataMainDaily.datasets[1].data = [];

      this.chartDataDoughnutMainDaily.labels = [];
      this.chartDataDoughnutMainDaily.datasets[0].data = [];

      this.chartDataPeriod.labels = [];
      this.chartDataPeriod.datasets[0].data = [];
      this.chartDataPeriod.datasets[1].data = [];

      this.chartDataDoughnutPeriod.labels = [];
      this.chartDataDoughnutPeriod.datasets[0].data = [];
    },

    // APPLIQUER LA RECHERCHE PAR FILTRE.
    async applyFilterReservation() {
      this.deleteAllDataGraph();
      this.isFilterApply = true;
      var periodDate = "";

      switch (this.dateSelected) {
        case "Periodique":
          periodDate = "period";
          this.dataToSend.data.period.dateDebut = this.formatDate(
            this.dateDebut
          );
          this.dataToSend.data.period.dateFin = this.formatDate(this.dateFin);

          break;
        case "À une date précise":
          periodDate = "date";
          this.dataToSend.data.dateGiven = this.formatDate(this.datePrecise);
          this.dataToSend.data.dateGiven = this.formatDate(this.datePrecise);
          break;
        default:
          periodDate = "annuel";
          break;
      }
      this.dataToSend.data.gareTransportDesignation = "Gare de Marcory";
      await axios
        .post(
          API_STATISTIQUE_RESERVATIONS(periodDate, "gare"),
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
              if (periodDate == "period") {
                if (
                  (this.dateDebut == "" || this.dateDebut == null) &&
                  (this.dateFin == "" || this.dateFin == null)
                ) {
                  this.errorMsg =
                    "Les dates périodiques ne sont pas renseignés !!";
                  $(".alert-error").fadeIn();
                  setTimeout(function () {
                    $(".alert-error").fadeOut();
                  }, 4000);
                } else {
                  this.periodStatisticByStation = response.data.item;
                  this.getLabelAndDataSetGraphicsLinePeriod(
                    this.periodStatisticByStation
                  );
                  this.getLabelAndDataSetGraphicsDoughnutPeriod(
                    this.periodStatisticByStation
                  );
                }
              } else if (periodDate == "date") {
                if (this.datePrecise == "" || this.datePrecise == null) {
                  this.errorMsg = "La date n'a pas été renseigné !!";
                  $(".alert-error").fadeIn();
                  setTimeout(function () {
                    $(".alert-error").fadeOut();
                  }, 4000);
                } else {
                  this.mainlyDateStatisticByStation = response.data.item;
                  this.getLabelAndDataSetGraphicsLineMainDate(
                    this.mainlyDateStatisticByStation
                  );
                  this.getLabelAndDataSetGraphicsDoughnutMainDaily(
                    this.mainlyDateStatisticByStation
                  );
                }
              } else {
                console.log("N'affichons rien");
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
          this.getDailyStatisticsByStation();
          this.getAnnualStatisticsByStation();
          this.getDailyStatisticBagByStation();
          this.getAnnualStatisticBagByStation();
          this.loading = false;
        });

      await axios
        .post(API_STATISTIQUE_BAGAGES(periodDate), this.dataToSend, {
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
              if (periodDate == "period") {
                this.periodStatisticBags = response.data.item;
                this.getLabelAndDataSetGraphicsLinePeriodBag(
                  this.periodStatisticBags
                );
              } else if (periodDate == "date") {
                this.mainlyDateStatisticBags = response.data.item;
                this.getLabelAndDataSetGraphicsLineMainlyDateBag(
                  this.mainlyDateStatisticBags
                );
              } else {
                console.log("N'affichons rien");
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
        });
    },
    // GET DATAS FOR DAILY STATISTICS OF LINE GRAPH
    getLabelAndDataSetGraphicsLineDailyBag(data) {
      if (data != null) {
        if (
          data.chiffreAffairesParProgramme != null ||
          data.chiffreAffairesParProgramme != undefined
        )
          for (var value of Object.entries(data.chiffreAffairesParProgramme)) {
            this.chartDataDaily.datasets[1].data.push(value);
          }
      }
    },

    getLabelAndDataSetGraphicsLineAnnualBag(data) {
      if (data != null) {
        for (var value of Object.entries(data.chiffreAffairesParProgramme)) {
          this.chartDataAnnual.datasets[0].data.push(value);
        }
      }
    },

    // GET DATAS FOR DAILY STATISTICS OF LINE GRAPH
    getLabelAndDataSetGraphicsLineDaily(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesParProgramme
        )) {
          this.chartDataDaily.labels.push(cle);
          this.chartDataDaily.datasets[0].data.push(valeur);
        }
      }
    },
    // GET DATAS FOR ANNUAL STATISTICS OF LINE GRAPH
    getLabelAndDataSetGraphicsLineAnnual(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.chiffreAffairesParProgramme
        )) {
          this.chartDataAnnual.labels.push(cle);
          this.chartDataAnnual.datasets[0].data.push(valeur);
        }
      }
    },

    // GET DATAS FOR DAILY STATISTICS OF DOUGHNUTS GRAPH
    async getLabelAndDataSetGraphicsDoughnutDaily(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.nombreReservationBilletVoyageParProgramme
        )) {
          this.chartDataDoughnutDaily.labels.push(cle);
          this.chartDataDoughnutDaily.datasets[0].data.push(valeur);
        }
      }
    },

    // GET DATAS FOR ANNUAL STATISTICS OF DOUGHNUTS GRAPH
    async getLabelAndDataSetGraphicsDoughnutAnnual(data) {
      if (data != null) {
        for (var [cle, valeur] of Object.entries(
          data.nombreReservationBilletVoyageParProgramme
        )) {
          this.chartDataDoughnutAnnual.labels.push(cle);
          this.chartDataDoughnutAnnual.datasets[0].data.push(valeur);
        }
      }
    },

    // GET DAILY BOOKING STATISTICS BY STATION
    async getDailyStatisticsByStation() {
      this.dataToSend.data.gareDesignation = "Gare de Marcory";
      await axios
        .post(API_STATISTIQUE_RESERVATIONS("jour", "gare"), this.dataToSend, {
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
              this.dailyStatisticByStation = response.data.item;
              this.getLabelAndDataSetGraphicsLineDaily(
                this.dailyStatisticByStation
              );
              this.getLabelAndDataSetGraphicsDoughnutDaily(
                this.dailyStatisticByStation
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

    // GET ANNUAL BOOKING STATISTICS BY STATION
    async getAnnualStatisticsByStation() {
      this.dataToSend.data.gareDesignation = "Gare de Marcory";
      await axios
        .post(API_STATISTIQUE_RESERVATIONS("annuel", "gare"), this.dataToSend, {
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
              this.annualStatisticByStation = response.data.item;
              this.getLabelAndDataSetGraphicsLineAnnual(
                this.annualStatisticByStation
              );
              this.getLabelAndDataSetGraphicsDoughnutAnnual(
                this.annualStatisticByStation
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

    // GET DAILY NET SALES STATISTICS BY STATION
    async getDailyStatisticBagByStation() {
      this.dataToSend.data.gareDesignation = "Gare de Marcory";
      await axios
        .post(API_STATISTIQUE_BAGAGES("jour"), this.dataToSend, {
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
              this.dailyStatisticBags = response.data.item;
              this.getLabelAndDataSetGraphicsLineDailyBag(
                this.dailyStatisticBags
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

    // GET ANNUAL BAGS STATISTICS BY STATION
    async getAnnualStatisticBagByStation() {
      this.dataToSend.data.gareDesignation = "Gare de Marcory";
      await axios
        .post(API_STATISTIQUE_BAGAGES("annuel"), this.dataToSend, {
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
              this.annualStatisticBags = response.data.item;
              this.getLabelAndDataSetGraphicsLineAnnualBag(
                this.annualStatisticBags
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
          "RoleAdminCompagnieTransport" ||
        this.$store.state.userAuthentified.roleCode == "RoleAgentGare"
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

    // FORMAT DE LA DATE
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
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
    this.getDailyStatisticBagByStation();
    this.getAnnualStatisticBagByStation();
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
