<template>
  <v-app id="inspire">
    <div class="container">
      <h3 class="title_search">Enregistrer des bagages</h3>
      <small class="subtitle">Procédure et formalités d'enregistrement.</small
      ><br /><br />
      <div class="row">
        <div class="col-lg-6">
          <v-card>
            <v-card-title
              ><span class="title_search">Recherche de billet</span
              ><v-spacer></v-spacer>
              <v-btn
                x-small
                color="secondary"
                @click="showOrHideTicketList()"
                >{{
                  isShowTicketList == false
                    ? "Afficher les réservations"
                    : "Cacher les réservations"
                }}</v-btn
              >
            </v-card-title>
            <v-card-text>
              <v-form>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Référence du billet:</label
                  >

                  <input
                    id="searchTicket"
                    type="text"
                    class="form-control col-lg-10"
                    aria-describedby="basic-addon1"
                    v-model="keyword"
                  />
                </div> </v-form
              ><br />
              <div class="float-right" v-if="isSearching == true">
                <v-progress-circular
                  indeterminate
                  color="secondary"
                ></v-progress-circular>
              </div>
              <div class="float-right" v-else>
                <v-btn
                  small
                  btn
                  color="success"
                  @click="searchTicketByReference"
                  ><v-icon>mdi-magnify</v-icon>&nbsp;&nbsp;Rechercher</v-btn
                >
              </div> </v-card-text
            ><br />
          </v-card>
          <div></div>
        </div>
        <div
          class="col-lg-6 animate__animated animate__backInLeft animate__delay-1s"
          v-if="isShowTicketList == true"
        >
          <v-card>
            <v-card-title
              ><span class="title_search">Liste des réservations</span
              ><v-spacer>
                <v-text-field
                  v-model="search"
                  placeholder="Recherche ..."
                  class="col-lg-7"
                ></v-text-field> </v-spacer
            ></v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :search="search"
                :loading="loading"
                :items="ticketAvailableList"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    title="Sélectionner"
                    color="blue"
                    small
                    class="mr-2"
                    @click="chooseTicketFromList(item)"
                    >mdi-gesture-tap-button</v-icon
                  >
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
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
  API_GET_RESERVATIONS_BY_SELLER,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import axios from "axios";
import $ from "jquery";
export default {
  name: "SearchTicket",
  data() {
    return {
      isShowTicketList: false,

      headers: [
        { text: "Référence", value: "designation" },
        { text: "Nom", value: "clientDetails.nom" },
        { text: "Prenom", value: "clientDetails.prenoms" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      search: "",

      loading: false,

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
    // CHOOSE A TICKET FROM TICKET LIST
    chooseTicketFromList(item) {
      this.keyword = item.designation;
    },
    //HIDE OR SHOW RESERVATIONS LIST TICKET
    showOrHideTicketList() {
      this.isShowTicketList = !this.isShowTicketList;
    },
    //RÉCUPÉRER LA LISTE DES BILLETS DISPONIBLES.
    async getTicketAvailables() {
      await axios
        .post(
          this.$store.state.userAuthentified.roleCode ==
            "RoleUtiGareCompagnieTransport"
            ? API_GET_RESERVATIONS_BY_SELLER
            : API_GET_RESERVATIONS_BY_ADMIN_TP,
          this.objectToSend,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
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

#inspire {
  background: #eeeeee;
}

.subtitle {
  font-family: "Montserrat";
}

#searchTicket {
  font-family: "Montserrat";
  border-radius: 10px;
  font-size: 16px;
}

.title_search {
  font-weight: 700;
  font-family: "Montserrat";
  font-size: 20px;
}
</style>
