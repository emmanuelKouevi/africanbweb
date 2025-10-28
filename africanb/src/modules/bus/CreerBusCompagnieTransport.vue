<!--<template>
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
                        :error-messages="numeroContrainte"
                        v-model.number="$v.addedBusData.numero.$model"
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
    <v-alert
      class="myalert alert-success"
      type="success"
      width="350px"
      dismissible
      >{{ successMsg }}</v-alert
    >
    <v-alert
      class="myalert alert-warning"
      type="warning"
      width="350px"
      dismissible
      >{{ warningMsg }}</v-alert
    >
    <v-alert
      class="myalert alert-error"
      type="error"
      width="350px"
      dismissible
      >{{ errorMsg }}</v-alert
    >
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-app>
</template> -->

<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <h3 class="main_title">Ajouter un nouvel autocar à sa flotte.</h3>
        <small class="subtitle"
          >Gérez efficacement vos autocars pour bien programmer vos
          offres.</small
        >
      </div>
      <br />
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              ><span class="main_title">Information de l'autocar.</span>
              <v-spacer></v-spacer>
              <!--BOITE DE DIALOGUE POUR LES PRIX -->
              <v-dialog
                v-model="dialogForPlanning"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :disabled="offreVoyageDesignation == null"
                    small
                    color="secondary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Ajouter un autocar
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Définir un programme</span>
                  </v-card-title>
                  <v-card-text>
                    <form>
                      <div class="row">
                        <div class="col-lg">
                          <label for="exampleInputEmail1" class="form-label"
                            >Réference du programme:</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            v-model.trim="
                              $v.programmeOffreVoyageModel.designation.$model
                            "
                          />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <label for="exampleInputEmail1" class="form-label"
                            >Date de départ:</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            id="exampleInputEmail1"
                            v-model.trim="
                              $v.programmeOffreVoyageModel.dateDepart.$model
                            "
                          />
                        </div>

                        <div class="col-lg-6">
                          <label for="exampleInputEmail1" class="form-label"
                            >Date d'arrivée:</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            id="exampleInputEmail1"
                            v-model.trim="
                              $v.programmeOffreVoyageModel.dateArrivee.$model
                            "
                          />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <label for="exampleInputEmail1" class="form-label"
                            >Heure de départ:</label
                          >
                          <input
                            type="time"
                            class="form-control"
                            id="exampleInputEmail1"
                            v-model.trim="
                              $v.programmeOffreVoyageModel.heureDepart.$model
                            "
                          />
                        </div>

                        <div class="col-lg-6">
                          <label for="exampleInputEmail1" class="form-label"
                            >Heure d'arrivée (Estimation):</label
                          >
                          <input
                            type="time"
                            class="form-control"
                            id="exampleInputEmail1"
                            v-model.trim="
                              $v.programmeOffreVoyageModel.heureArrivee.$model
                            "
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6">
                          <label for="exampleInputEmail1" class="form-label"
                            >Selectionner un autocar:</label
                          >
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            v-model.trim="
                              $v.programmeOffreVoyageModel.numeroBus.$model
                            "
                          >
                            <option
                              v-for="(bus, b) in availableBusList"
                              :key="b"
                              :value="bus.numero"
                            >
                              {{ bus.designation }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogForPlanning = false"
                    >
                      Annuler
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="savePlanningInList"
                    >
                      Enregistrer
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- FIN DE BOITE DE DIALOGUE -->
            </v-card-title>
            <v-card-text>
              <form>
                <br />
              </form>

              <br /><br />
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>

    <v-alert
      class="myalert alert-success"
      type="success"
      width="350px"
      dismissible
      >{{ successMsg }}</v-alert
    >

    <v-alert
      class="myalert alert-error"
      type="error"
      width="350px"
      dismissible
      >{{ errorMsg }}</v-alert
    >
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
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
      errorMsg: null,

      successMsg: null,

      overlay: false,

      warningMsg: false,

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
        numero: null,
        nombrePlace: null,
        raisonSociale: null,
        //offreVoyageDesignation: null,
      },
    };
  },

  validations: {
    addedBusData: {
      designation: {
        required,
      },
      numero: {
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
      this.addedBusData.numero = null;
      this.addedBusData.nombrePlace = null;
    },

    //ENREGISTRER UN BUS
    async saveBus() {
      this.overlay = true;
      this.addedBusData.raisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.busObject.datas.push(this.addedBusData);
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
          this.reinitializeForm();
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

    numeroContrainte() {
      const errors = [];
      if (!this.$v.addedBusData.numero.$dirty) return errors;
      !this.$v.addedBusData.numero.required &&
        errors.push("Information requis.");
      !this.isOverToZero(this.addedBusData.numero) &&
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
