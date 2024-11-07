<template>
  <v-app>
    <div class="row">
      <div class="col-lg-12">
        <v-container fluid>
          <v-card>
            <v-card-title class="title-card"
              >LISTE DES OFFRES DE VOYAGES
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
                  title="editer"
                  color="blue"
                  small
                  class="mr-2"
                  @click="editerOffreVoyage(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon
                  title="activer"
                  color="success"
                  small
                  class="mr-2"
                  @click="activerOffreVoyage(item)"
                  >mdi-broadcast</v-icon
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
import $ from "jquery";
import {
  API_RECUPERER_LISTE_OFFRE_VOYAGE,
  API_ACTIVER_OFFRE_DE_VOYAGE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";

export default {
  name: "SelectionnerOffreVoyage",
  data() {
    return {
      errorMsg: null,
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

      offreVoyageToActived: {
        datas: [],
      },
    };
  },

  methods: {
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

    //ACTIVER L'OFFRE DE VOYAGE
    async activerOffreVoyage(offreVoyage) {
      var offreActived = { id: null };
      offreActived.id = offreVoyage.id;
      this.offreVoyageToActived.datas.push(offreActived);
      axios
        .post(API_ACTIVER_OFFRE_DE_VOYAGE, this.offreVoyageToActived, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.$swal.fire(
                "Activation",
                response.data.status.message,
                "error"
              );
            } else {
              this.$swal.fire(
                "Activation",
                response.data.status.message,
                "success"
              );
              offreVoyage.isActived = true;
            }
          } else {
            this.$swal.fire(
              "Activation",
              "Error lors de la validation",
              "error"
            );
          }
        })
        .catch((e) => {
          this.$swal.fire("Activation refusée", e, "error");
        });
    },

    //EDITER UNE OFFRE DE VOYAGE
    editerOffreVoyage(offreVoyage) {
      const parsedOffreVoyage = JSON.stringify(offreVoyage);
      localStorage.setItem("offreVoyage", parsedOffreVoyage);
      this.$router.push({ path: "/modifierOffreVoyage" });
    },
  },

  mounted() {
    this.obtenirOffreVoyageListParCompagnie();
  },
};
</script>

<style scoped>
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
