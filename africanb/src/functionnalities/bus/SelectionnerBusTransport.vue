<template>
  <v-app id="inspire">
    <div class="row">
      <div class="col-lg-12">
        <v-container fluid>
          <v-card>
            <v-card-title class="title-card"
              >LISTE DES BUS DISPONIBLES
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="availableBusList"
              :loading="loading"
              :search="search"
            >
              <template v-slot:[`item.etat`]="{ item }">
                <v-chip
                  x-small
                  v-if="item.etat !== 'HORS_SERVICE'"
                  color="success"
                  text-color="white"
                  class="mr-2"
                  ><span class="etat font-weight-bold">en service</span></v-chip
                >
                <v-chip
                  x-small
                  v-else
                  color="red"
                  text-color="white"
                  class="mr-2"
                  ><span class="etat">hors service</span></v-chip
                >
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  title="editer"
                  color="blue"
                  small
                  class="mr-2"
                  @click="updateBus(item)"
                  >mdi-pencil</v-icon
                >
              </template>
            </v-data-table>
            <v-alert
              class="myalert alert-error"
              type="error"
              width="350px"
              dismissible
              >{{ errorMsg }}</v-alert
            >
          </v-card>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import {
  API_RECUPERER_LISTE_BUS_PAR_COMPAGNIE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import $ from "jquery";
export default {
  name: "SelectionnerBusTransport",
  data() {
    return {
      errorMsg: null,
      loading: true,
      search: "",
      headers: [
        { text: "RÉFÉRENCE", value: "designation" },
        { text: "NUMERO DU BUS", value: "numero" },
        { text: "NOMBRE DE PLACES", value: "nombrePlace" },
        { text: "ETAT", value: "etat" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],

      availableBusList: [],

      busObject: {
        data: {
          raisonSociale: null,
        },
      },
    };
  },

  methods: {
    //OBTENIR LISTE DES OFFRES DE VOYAGES DISPONIBLES PAR COMPAGNIE
    async getAllAvailableBus() {
      this.busObject.data.raisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.loading = true;
      await axios
        .post(API_RECUPERER_LISTE_BUS_PAR_COMPAGNIE, this.busObject, {
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
              this.availableBusList = response.data.items;
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

  mounted() {
    this.getAllAvailableBus();
  },
};
</script>

<style>
.title-card {
  font-weight: bold;
  color: black;
  font-size: 17px;
}

.myalert {
  display: none;
  z-index: 1900;
}

.alert-error {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}
</style>
