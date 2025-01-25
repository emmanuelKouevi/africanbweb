<template>
  <v-app>
    <v-container fluid>
      <div class="row">
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
        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >TOTAL RESERVATIONS PAYEES</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">{{
                    reservationList.length
                  }}</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text">CAISSE</span></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold"
                    >{{ totalPriceReservation }} FCFA
                  </span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text"
                >RESERVATIONS NON EFFECTIVES</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">5</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text"
                >RESERVATIONS EFFECTIVES</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">3</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              >Reservations récentes
              <v-spacer></v-spacer>
              <v-btn text x-small>Plus d'actions</v-btn>
            </v-card-title>
            <v-card-text>
              <v-data-table :headers="headers"></v-data-table>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import {
  API_GET_RESERVATIONS_BY_SELLER,
  API_GET_RESERVATIONS_BY_ADMIN_TP,
  //API_GENERATE_TICKET,
  HEADERS,
  API_GET_DOCUMENT_URL,
  //API_GENERATE_REPORT,
} from "../globalConfig/globalConstConfig";
export default {
  name: "DashboardSeller",

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
    };
  },

  methods: {
    //OBTENIR LA LISTE DES RESERVATIONS EFFECTUÉ PAR LES UTILISATEUR À LA GARE
    async getAllReservationTicketAvailable() {
      this.loading = true;
      if (
        this.$store.state.userAuthentified.roleCode ==
        "RoleAdminCompagnieTransport"
      ) {
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
      } else {
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
      }
    },

    // RECUPERER LA PHOTO DE PROFIL DE L'UTILISATEUR
    async getUrlPhotoProfil() {
      console.log("Nous sommes dans la fonction");
      this.photoProfilObject.data.typeDocument = "PHOTO_PROFIL";
      this.loading = true;
      await axios
        .post(API_GET_DOCUMENT_URL, this.photoProfilObject, {
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
              this.photoProfilUrl = response.data.item.url;
              console.log(this.photoProfilUrl);
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
</style>
