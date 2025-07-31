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
        <v-data-table
          :search="search"
          :headers="headers"
          :items="stations == null ? [] : stations"
        >
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
import { ROLE_ADMIN_COMPAGNIE_TRANSPORT } from "@/components/globalConfig/constUsersRoles";

export default {
  name: "ListOfCompagnies.vue",
  props: {
    compagnieTransport: {
      type: Object,
      default: null,
    },

    compagnieStations: {
      type: Array,
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
      ],

      dataStationObject: {
        data: {
          compagnieTransportRaisonSociale: null,
        },
      },
      stations: [],
    };
  },

  methods: {
    // RÉCUPÉRER LA LISTE DES COMPAGNIES DE TRANSPORT
    async getStations() {
      if (
        this.$store.state.userAuthentified.roleCode ==
        ROLE_ADMIN_COMPAGNIE_TRANSPORT
      ) {
        this.dataStationObject.data.compagnieTransportRaisonSociale =
          this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
        try {
          const stations = await getStationApi(
            this.dataStationObject,
            this.$store.state.userAuthentified.token
          );
          this.stations = stations;
        } catch (error) {
          showErrorMessage();
        }
      }
    },
  },

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
