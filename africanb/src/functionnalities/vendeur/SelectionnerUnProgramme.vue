<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title
          ><span class="title_card">OFFRE DE VOYAGES DISPONIBLES</span>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            dense
            placeholder="Rechercher ..."
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :search="search"
            item-class="offreItem"
            :headers="headers"
            :loading="loading"
            :items="offreVoyageAvailableList"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn @click="voirDetailBtn(item)" x-small color="secondary"
                ><small class="btn-label">Voir les détails</small></v-btn
              >&nbsp;&nbsp;
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import {
  API_RECUPERER_LISTE_OFFRE_VOYAGE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      loading: true,

      errorMsg: false,
      warningMsg: false,
      successMsg: false,

      search: "",

      headers: [
        { text: "REFERENCE", value: "designation" },
        { text: "TYPE DE L'OFFRE", value: "typeOffreVoyageDesignation" },
        { text: "DÉPART", value: "villeDepartDesignation" },
        { text: "DESTINATION", value: "villeDestinationDesignation" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],

      offreVoyageAvailableList: [],
      offreVoyageList: [],
      offreVoyageObject: {
        data: {
          compagnieTransportRaisonSociale: null,
        },
      },
    };
  },

  methods: {
    /*OBTENIR LA LISTE DES OFFRES DE VOYAGES DISPONIBLES POUR LES VENDEURS POUR 
        QU'ILS PUISSENT PROCÉDER À LA RESERVATION DE BILLETS POUR LES CLIENTS
    */
    async getOffreVoyageAvailables() {
      this.loading = true;
      this.offreVoyageObject.data.compagnieTransportRaisonSociale = "KOUEVI CT";
      //this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
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
              this.offreVoyageList = response.data.items;
              this.offreVoyageList.forEach((element) => {
                if (element.isActif == true) {
                  this.offreVoyageAvailableList.push(element);
                }
              });
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

    storeOffreVoyageItem(item) {
      const parsedOffreSelected = JSON.stringify(item);
      localStorage.setItem("offreVoyageSelected", parsedOffreSelected);
    },

    reserverTicket(offreVoyage) {
      this.storeOffreVoyageItem(offreVoyage);
      this.$router.push({ path: "/reservationBillet" });
    },

    voirDetailBtn(offreVoyage) {
      this.storeOffreVoyageItem(offreVoyage);
      this.$router.push({ path: "/offre_voyage_details" });
    },
  },

  mounted() {
    this.getOffreVoyageAvailables();
  },
};
</script>

<style scoped>
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

.title_card {
  font-weight: bold;
  font-size: 12px;
}

.offreItem {
  font-size: 12px;
}

.btn-label {
  color: white;
}
</style>
