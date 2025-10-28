<template>
  <v-app>
    <div class="row">
      <div class="col-lg-12">
        <div class="container">
          <v-card>
            <v-card-title class="title-card"
              >LISTE DES GARES ENREGISTRÉS
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
              :items="gareDisponiblesList"
              :loading="loading"
              :search="search"
            >
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
                  title="supprimer"
                  color="red"
                  small
                  class="mr-2"
                  @click="supprimerProduitLogement(item)"
                  >mdi-delete</v-icon
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
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import {
  API_RECUPERER_LISTE_GARES_PAR_COMPAGNIE,
  HEADERS,
} from "../../components/globalConfig/globalConstConfig";
export default {
  name: "SelectionnerGareCompagnieTransport",
  data() {
    return {
      errorMsg: null,
      loading: true,
      search: "",
      headers: [
        { text: "reference", value: "id" },
        { text: "Designation", value: "designation" },
        { text: "E-mail", value: "email" },
        { text: "Addresse", value: "adresseLocalisation" },
        { text: "Telephone", value: "telephone1" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      gareListObject: {
        data: {
          compagnieTransportRaisonSociale: null,
        },
      },
      gareDisponiblesList: [],
    };
  },

  methods: {
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

  mounted() {
    this.obtenirGareListParCompagnieTransport();
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
</style>
