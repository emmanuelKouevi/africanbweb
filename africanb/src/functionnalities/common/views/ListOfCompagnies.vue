<template>
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
        <v-data-table :search="search" :headers="headers" :items="compagnies">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              title="Sélectionner"
              color="teal"
              small
              class="mr-2"
              @click="chooseCompagny(item)"
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
import { getCompagniesAvailableApi } from "../services/commonApi";

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
        { text: "Raison sociale", value: "raisonSociale" },
        { text: "Sigle", value: "sigle" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      dataCompagnyObject: {
        index: 0,
        size: 8,
      },
      compagnies: [],
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
  },

  chooseCompagny() {},

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
