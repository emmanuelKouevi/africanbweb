<template>
  <v-app id="inspire">
    <div class="container">
      <v-card elevation="5">
        <v-card-title
          ><h6 class="font-weight-bold">
            CONFIRMER UN BILLET DE RESERVATION
          </h6></v-card-title
        >
        <v-card-subtitle
          >Confirmation d'un billet de vérification via la
          référence.</v-card-subtitle
        ><br />

        <v-card-text>
          <v-container fluid>
            <form>
              <div class="row">
                <div class="col-lg-6">
                  <label for="exampleInputEmail1" class="form-label"
                    >Référence du billet.</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model="dataToSend.data.reference"
                  />
                </div>
                <div class="col-lg-3"></div>
              </div>
              <br />
            </form>
            <br />
          </v-container>
          <div class="float-right">
            <v-btn
              id="btnInitialize"
              dark
              color="secondary"
              data-cy="btnInitialize"
              outlined
              >REINITIALISER</v-btn
            >&nbsp;&nbsp;
            <v-btn
              id="btnCreate"
              @click="confirmTicketReservation"
              dark
              color="success"
              data-cy="btnCreate"
              outlined
            >
              CONFIRMER LE BILLET</v-btn
            >
          </div> </v-card-text
        ><br />
      </v-card>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import {
  API_CONFIRM_TICKET,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import $ from "jquery";
export default {
  name: "ConfirmerBilletReservation",

  data() {
    return {
      dataToSend: {
        data: {
          reference: null,
        },
      },
    };
  },

  methods: {
    // CREATION D'UNE OFFRE DE VOYAGE
    async confirmTicketReservation() {
      this.overlay = true;
      await axios
        .post(API_CONFIRM_TICKET, this.dataToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              if (response.data.item.confirm == false) {
                this.$swal.fire(
                  "Confirmation",
                  response.data.item.description,
                  "error"
                );
              } else {
                this.$swal.fire(
                  "Confirmation",
                  response.data.item.description,
                  "success"
                );
              }
            }
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        })
        .finally(() => {
          this.overlay = false;
        });
    },
  },
};
</script>

<style></style>
