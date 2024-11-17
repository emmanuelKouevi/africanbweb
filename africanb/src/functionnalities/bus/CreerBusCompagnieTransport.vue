<template>
  <v-app id="inspire">
    <div class="container">
      <v-form @submit.prevent="submitForm">
        <v-container fluid>
          <v-card elevation="5">
            <v-card-title
              ><h6 class="font-weight-bold">
                ENREGISTRER UN BUS
              </h6></v-card-title
            >
            <v-card-subtitle
              >Enregister un bus pour faciliter votre prgrammation d'offre de
              voyage et sa mise en ligne.</v-card-subtitle
            ><br />

            <v-card-text>
              <v-container fluid>
                <form>
                  <div class="row">
                    <div class="col-lg-4">
                      <label for="exampleInputEmail1" class="form-label"
                        >Référence du bus</label
                      >
                      <v-text-field
                        type="text"
                        dense
                        outlined
                        color="teal"
                        :error-messages="designationBus"
                        v-model.trim="$v.addedBusData.designation.$model"
                      ></v-text-field>
                    </div>
                    <div class="col-lg-4">
                      <label for="exampleInputEmail1" class="form-label"
                        >Numéro du bus</label
                      >
                      <v-text-field
                        type="number"
                        min="0"
                        dense
                        outlined
                        color="teal"
                        :error-messages="numeroBusContrainte"
                        v-model.number="$v.addedBusData.numeroBus.$model"
                      ></v-text-field>
                    </div>

                    <div class="col-lg-4">
                      <label for="exampleInputEmail1" class="form-label"
                        >Nombre de place</label
                      >
                      <v-text-field
                        color="teal"
                        class="my_input"
                        type="number"
                        min="0"
                        :error-messages="nbrePlaceBusContrainte"
                        v-model.number="$v.addedBusData.nombrePlace.$model"
                        dense
                        outlined
                      ></v-text-field>
                    </div>
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
                  @click="reinitializeForm"
                  >REINITIALISER</v-btn
                >&nbsp;&nbsp;
                <v-btn
                  id="btnCreate"
                  type="submit"
                  dark
                  color="success"
                  data-cy="btnCreate"
                  outlined
                >
                  ENREGISTRER</v-btn
                >
              </div> </v-card-text
            ><br />
          </v-card>
        </v-container>
      </v-form>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { required } from "vuelidate/lib/validators";
import {
  API_ASSOCIER_BUS_OFFRE_VOYAGE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
export default {
  name: "CreerBusCompagnieTransport",

  data() {
    return {
      busObject: {
        datas: [],
      },

      offreVoyageObject: {
        data: {
          compagnieTransportRaisonSociale: null,
        },
      },

      addedBusData: {
        designation: null,
        numeroBus: null,
        nombrePlace: null,
        //offreVoyageDesignation: null,
      },
    };
  },

  validations: {
    addedBusData: {
      designation: {
        required,
      },
      numeroBus: {
        required,
      },
      nombrePlace: {
        required,
      },
    },
  },

  methods: {
    // SOUMISSION DU FORMULAIRE D'ENREGISTREMENT
    submitForm() {
      this.$v.$touch();
      if (this.$v.addedBusData.$invalid) {
        this.errorMsg = "Vous n'avez saisi les champs concernés";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        this.saveBus();
      }
    },

    reinitializeForm() {
      this.addedBusData.designation = null;
      this.addedBusData.numeroBus = null;
      this.addedBusData.nombrePlace = null;
    },

    //ENREGISTRER UN BUS
    async saveBus() {
      this.overlay = true;
      await axios
        .post(API_ASSOCIER_BUS_OFFRE_VOYAGE, this.busObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              $(".alert-success").fadeIn();
              setTimeout(function () {
                $(".alert-success").fadeOut();
              }, 4000);
              this.busObject.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.busObject.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg = "Erreur , lors de la création";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.busObject.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.busObject.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 3000);
          this.busObject.datas = [];
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    isOverToZero(item) {
      if (item > 0) {
        return true;
      }
    },
  },

  computed: {
    // GESTION DES CONTRAINTES POUR LE FORMULAIRE D'ENREGISTREMENT DE BUS
    designationBus() {
      const errors = [];
      if (!this.$v.addedBusData.designation.$dirty) return errors;
      !this.$v.addedBusData.designation.required &&
        errors.push("Entrer une désignation pour le bus.");
      return errors;
    },

    numeroBusContrainte() {
      const errors = [];
      if (!this.$v.addedBusData.numeroBus.$dirty) return errors;
      !this.$v.addedBusData.numeroBus.required &&
        errors.push("Information requis.");
      !this.isOverToZero(this.addedBusData.numeroBus) &&
        errors.push("Champs Incorrect");
      return errors;
    },

    nbrePlaceBusContrainte() {
      const errors = [];
      if (!this.$v.addedBusData.nombrePlace.$dirty) return errors;
      !this.$v.addedBusData.nombrePlace.required &&
        errors.push("Information requis.");
      !this.isOverToZero(this.addedBusData.nombrePlace) &&
        errors.push("Champs Incorrect");
      return errors;
    },
  },
};
</script>

<style>
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

.alert-warning {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}
</style>
