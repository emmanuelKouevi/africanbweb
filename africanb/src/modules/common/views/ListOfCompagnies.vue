<template>
  <div>
    <div class="row">
      <div>
        <v-card>
          <v-card-title
            ><span class="user_section">Compagnie(s) disponible(s)</span
            ><v-spacer></v-spacer>
            <v-text-field
              class="input"
              dense
              append-icon="mdi-magnify"
              v-model="search"
              label="Filtre"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :search="search"
              :headers="headers"
              :items="compagnies"
            >
              <template
                v-slot:[`item.actions`]="{ item }"
                v-if="role != undefined"
              >
                <v-icon
                  v-if="role !== 'Role Administrateur Compagnie Transport'"
                  title="Sélectionner"
                  color="teal"
                  small
                  class="mr-2"
                  @click="loadStations(item.raisonSociale)"
                  >mdi-gesture-tap-button</v-icon
                >
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <br />

    <div
      :hidden="
        role === 'Role Administrateur Compagnie Transport' || role == null
      "
    >
      <v-card>
        <v-card-title
          ><span class="user_section">Gare(s) disponible(s)</span
          ><v-spacer></v-spacer>
          <v-text-field
            class="input"
            dense
            append-icon="mdi-magnify"
            v-model="searchStation"
            label="Filtre"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :search="searchStation"
            :headers="headersStation"
            :items="stations == null ? [] : stations"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
    <v-alert
      class="myalert alert-error"
      type="error"
      width="350px"
      dismissible
      >{{ errorMsg }}</v-alert
    >
  </div>
</template>

<script>
import { showErrorMessage } from "@/modules/messages/messageProcess";
import {
  getCompagniesAvailableApi,
  getStationApi,
} from "../services/commonApi";

export default {
  name: "ListOfCompagnies.vue",
  props: {
    role: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      errorMsg: null,

      search: "",
      headers: [
        { text: "Raison sociale", value: "raisonSociale" },
        { text: "Sigle", value: "sigle" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      searchStation: "",
      headersStation: [
        { text: "Reference", value: "designation" },
        { text: "Localisation", value: "adresseLocalisation" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      dataCompagnyObject: {
        index: 0,
        size: 8,
      },

      dataStationObject: {
        data: {
          compagnieTransportRaisonSociale: null,
        },
      },

      compagnies: [],

      stations: [],
    };
  },

  methods: {
    // RÉCUPÉRER LA LISTE DES COMPAGNIES DE TRANSPORT
    async getCompagniesOfTransport() {
      try {
        const compagnies = await getCompagniesAvailableApi(
          this.dataCompagnyObject,
          this.$store.state.userAuthentified.token
        );
        this.compagnies = compagnies;
      } catch (error) {
        showErrorMessage();
      }
    },

    async loadStations(compagnieRaisonSociale) {
      this.dataStationObject.data.compagnieTransportRaisonSociale =
        compagnieRaisonSociale;
      try {
        const stations = await getStationApi(
          this.dataStationObject,
          this.$store.state.userAuthentified.token
        );
        this.stations = stations;
      } catch (error) {
        showErrorMessage();
      }
    },
  },

  mounted() {
    this.getCompagniesOfTransport();
  },
};
</script>

<style scoped>
.user_section {
  font-size: 13px;
  font-family: "Montserrat";
  font-weight: bold;
  opacity: 0.7;
}

.input {
  font-family: "Montserrat";
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
