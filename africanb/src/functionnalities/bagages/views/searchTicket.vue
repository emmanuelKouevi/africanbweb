<template>
  <v-app>
    <div class="container">
      <span class="title_search">Rechercher un billet</span><br /><br />
      <div class="row">
        <div class="col-lg-6">
          <div>
            <input
              id="searchTicket"
              type="text"
              class="form-control"
              aria-describedby="basic-addon1"
              v-model="keyword"
              placeholder="Entrer la référence du billet"
            />
          </div>
        </div>
        <div class="col-lg-3">
          <div v-if="isSearching == true">
            <v-progress-circular
              indeterminate
              color="secondary"
            ></v-progress-circular>
          </div>
          <div v-else>
            <v-btn btn color="success" @click="searchTicketByReference"
              ><v-icon>mdi-magnify</v-icon>&nbsp;&nbsp;Rechercher</v-btn
            >
          </div>
        </div>
      </div>
    </div>
    <v-alert
      class="myalert alert-error"
      type="error"
      width="350px"
      dismissible
      >{{ errorMsg }}</v-alert
    >
    <v-alert
      class="myalert alert-success"
      type="success"
      width="350px"
      dismissible
      >{{ successMsg }}</v-alert
    >
  </v-app>
</template>

<script>
import {
  API_GET_RESERVATIONS_BY_ADMIN_TP,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import axios from "axios";
import $ from "jquery";
export default {
  name: "SearchTicket",
  data() {
    return {
      isSearching: false,
      keyword: null,
      errorMsg: null,
      successMsg: null,

      objectToSend: {
        data: {},
      },

      ticketAvailableList: [],
    };
  },

  methods: {
    //RÉCUPÉRER LA LISTE DES BILLETS DISPONIBLES.
    async getTicketAvailables() {
      await axios
        .post(API_GET_RESERVATIONS_BY_ADMIN_TP, this.objectToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.hasError == false) {
              this.ticketAvailableList = response.data.items;
              console.log(this.ticketAvailableList);
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
    },

    //RÉCUPÉRER LA LISTE DES BILLETS DISPONIBLES.
    searchTicketByReference() {
      this.isSearching = true;
      if (this.keyword == null) {
        this.errorMsg = "Veuillez entrer une référence";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else if (this.keyword == "") {
        this.errorMsg = "Veuillez entrer une référence";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        var referenceFound = "";
        this.ticketAvailableList.forEach((element) => {
          if (element.designation == this.keyword) {
            referenceFound = element.designation;
            this.$store.commit("STORE_TICKET", element);
            this.$router.push({ path: "/GestionBagage" });
          } else {
            referenceFound = "Aucune correspondance";
            this.errorMsg = referenceFound;
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        });
      }
      this.isSearching = false;
    },
  },

  mounted() {
    this.getTicketAvailables();
  },
};
</script>

<style scoped>
.title_search {
  font-family: "Montserrat";
  font-weight: bold;
  opacity: 0.7;
  font-size: 30px;
}

#searchTicket {
  height: 45px;
}

input[type="text"] {
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 20px;
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
