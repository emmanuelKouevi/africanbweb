<template>
  <div>
    <v-card>
      <v-card-title
        ><span class="user_section">Gare(s) disponible(s)</span
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
        <v-data-table :search="search" :headers="headers" :items="stations">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              title="Sélectionner"
              color="teal"
              small
              class="mr-2"
              @click="chooseStation(item)"
              >mdi-gesture-tap-button</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
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
import { showErrorMessage } from "@/functionnalities/messages/messageProcess";
import { getStationApi } from "../services/commonApi";

export default {
  name: "ListOfCompagnies.vue",
  props: {
    compagnieTransport: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      errorMsg: null,

      search: "",
      headers: [
        { text: "Reference", value: "designation" },
        { text: "Localisation", value: "adresseLocalisation" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      dataStationObject: {
        data: {
          compagnieTransportRaisonSociale:
            this.$store.state.userAuthentified.compagnieTransportRaisonSociale,
        },
      },
      stations: [],
    };
  },

  methods: {
    // RÉCUPÉRER LA LISTE DES COMPAGNIES DE TRANSPORT
    async getStations() {
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

  chooseStation() {},

  mounted() {
    this.getStations();
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
