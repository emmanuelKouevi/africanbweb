<template>
  <v-app>
    <v-container fluid>
      <v-card>
        <v-card-title
          ><small class="title_card">TOUS LES BILLETS RÉSERVÉS</small>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            dense
            placeholder="Rechercher ..."
          ></v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :search="search"
            :loading="loading"
            :items="reservationTicketList"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                title="editer"
                color="blue"
                small
                class="mr-2"
                @click="checkBooking(item)"
                >mdi-pencil</v-icon
              >&nbsp;

              <v-icon
                title="imprimer"
                color="blue"
                small
                class="mr-2"
                @click="imprimerBillet(item.designation)"
                >mdi-printer</v-icon
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
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
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-app>
</template>

<script>
import axios from "axios";
//import $ from 'jquery';
import {
  API_GET_RESERVATIONS_BY_SELLER,
  API_GET_RESERVATIONS_BY_ADMIN_TP,
  API_GENERATE_TICKET,
  HEADERS,
  //API_GENERATE_REPORT,
} from "../globalConfig/globalConstConfig";
export default {
  name: "SelectionnerReservationBillet",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      warningMsg: null,

      ticketGenerated: {
        data: {
          designation: null,
        },
      },

      reportGenerated: {
        data: {
          designation: null,
        },
      },

      objectToSend: {
        data: {},
      },

      headers: [
        { text: "GARE", value: "gareDesignation" },
        { text: "TRAJET", value: "offreVoyageDesignation" },
        { text: "NOM", value: "clientDetails.nom" },
        { text: "PRENOM", value: "clientDetails.prenoms" },
        { text: "NBRE DE PLACES", value: "nombrePlace" },
        { text: "MONTANT", value: "montantTotalReservation" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],

      overlay: false,
      loading: false,
      search: "",

      reservationTicketList: [],
    };
  },

  methods: {
    async convertToBase64(byte) {
      window.open(
        "data:application/pdf;base64," + byte,
        "_blank",
        "fullscreen=yes"
      );
    },

    //Generer le billet de voyage
    async imprimerBillet(designationBillet) {
      this.ticketGenerated.data.designation = designationBillet;
      await axios
        .post(API_GENERATE_TICKET, this.ticketGenerated, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (designationBillet == null) {
            this.$swal.fire(
              "Erreur",
              "Impossible d'imprimer ce billet",
              "error"
            );
          } else {
            this.convertToBase64(response.data.item.contentBase64);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        });
    },

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
                this.reservationTicketList = response.data.items;
                console.log(this.reservationTicketList);
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
                this.reservationTicketList = response.data.items;
                console.log(this.reservationTicketList);
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
      }
    },

    //CONSULTER UNE RESERVATION
    checkBooking(reservation) {
      const parsedBooking = JSON.stringify(reservation);
      localStorage.setItem("reservationBillet", parsedBooking);
      this.$router.push({ path: "/detail_reservation" });
    },
  },

  computed: {
    totalPriceReservation() {
      var total = 0;
      for (let index = 0; index < this.reservationTicketList.length; index++) {
        total += this.reservationTicketList[index].montantTotalReservation;
      }
      return total;
    },
  },

  mounted() {
    this.getAllReservationTicketAvailable();
  },
};
</script>

<style scoped>
.title_card {
  font-weight: bold;
  font-size: 12px;
}

.myalert {
  display: none;
  z-index: 1900;
}

.libelle {
  color: white;
  font-size: 20px;
}

.cfa {
  color: white;
}

.card-title-text {
  font-size: 13px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
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
