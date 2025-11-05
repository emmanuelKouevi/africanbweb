<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <h3 class="main_title">Ajouter des catégories voyageurs.</h3>
        <small class="subtitle"
          >Définissez vos catégories pour une gestion efficiente de vos offres
          de voyages.</small
        >
      </div>
      <br />
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              ><span class="main_title">Catégories en cours de création.</span>
              <v-spacer></v-spacer>
              <!--BOITE DE DIALOGUE POUR LES PRIX -->
              <v-dialog v-model="addNewBusDialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn small color="secondary" v-bind="attrs" v-on="on">
                    Nouvelle catégorie
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Ajouter une nouvelle catégorie</span>
                  </v-card-title>
                  <v-card-text>
                    <form>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label"
                          >Référence:</label
                        >

                        <input
                          type="text"
                          class="form-control content_form col-lg-6 input_field"
                          v-model.trim="$v.newBus.designation.$model"
                          name=""
                          id=""
                        />
                      </div>

                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label"
                          >Description:</label
                        >

                        <textarea
                          class="form-control"
                          maxlength="2"
                          name=""
                          id=""
                        ></textarea>
                      </div>
                    </form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="addNewBusDialog = false"
                    >
                      Annuler
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="addNewBusInList(newBus)"
                    >
                      Enregistrer
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- FIN DE BOITE DE DIALOGUE -->
            </v-card-title>
            <v-card-text>
              <span v-if="busObject.datas.length == 0" class="text-center"
                >Pas de catégories en cours de creation !</span
              >
              <div class="row" v-else>
                <div
                  class="col-lg-3"
                  v-for="(bus, b) in busObject.datas"
                  :key="b"
                >
                  <v-card rounded="lg" hover>
                    <v-card-title>
                      <span class="bus_designation">{{ bus.designation }}</span>
                      <v-spacer></v-spacer>
                      <v-btn icon
                        ><v-icon color="red" @click="deleteBusItem(b)"
                          >mdi-close</v-icon
                        ></v-btn
                      >
                    </v-card-title>
                  </v-card>
                </div>
              </div>
              <br /><br />
              <div class="float-right" v-if="busObject.datas.length != 0">
                <v-btn btn small color="secondary" @click="busObject.datas = []"
                  ><span>REINITIALISER</span></v-btn
                >&nbsp;&nbsp;
                <v-btn
                  type="submit"
                  color="success"
                  btn
                  small
                  @click="saveBus()"
                  ><span>AJOUTER À SA FLOTTE</span></v-btn
                >
              </div>
            </v-card-text>
            <br />
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

      addNewBusDialog: false,

      referenceCategorieVoyageur: {
        referenceFamilleDesignation: "referenceFamilleCategorieVoyaeur",
      },

      referenceModeCategorieVoyageurList: [],

      warningMsg: false,

      busObject: {
        datas: [],
      },

      offreVoyageObject: {
        data: {
          compagnieTransportRaisonSociale: null,
        },
      },

      newBus: {
        designation: null,
        numero: null,
        nombrePlace: null,
        raisonSociale: null,
      },
    };
  },

  validations: {
    newBus: {
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
    //OBTENIR REFERENCE DESIGNATION CATEGORIE VOYAGEUR
    async obtenirReferenceModeCategorieVoyageur() {
      this.objectToSendReferenceModeCategorieVoyageur.datas.push(
        this.referenceCategorieVoyageur
      );
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.objectToSendReferenceModeCategorieVoyageur,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          this.referenceModeCategorieVoyageurList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          showErrorMessage();
        });
    },

    createSetOfBus() {
      if (this.busObject.datas.length == 0) {
        this.errorMsg = "Aucun autocar configuré !";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        this.saveBus();
      }
    },

    // REINITAILISER LE FORMULAIRE D'AJOUTER D'AUTOCAR DANS LE DIALOGUE
    reinitFormDialog() {
      this.newBus.designation = null;
      this.newBus.numero = null;
      this.newBus.nombrePlace = null;
    },

    // AJOUTER UN NOUVEAU BUS DANS LA LISTE DES BUS À ENVOYER AU BACKEND
    addNewBusInList(busSended) {
      this.$v.$touch();
      if (this.$v.newBus.$invalid) {
        this.errorMsg = "Vous n'avez saisi les champs concernés";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        var bus = {
          designation: null,
          numero: null,
          nombrePlace: null,
          raisonSociale:
            this.$store.state.userAuthentified.compagnieTransportRaisonSociale,
        };
        bus.designation = busSended.designation;
        bus.numero = busSended.numero;
        bus.nombrePlace = busSended.nombrePlace;
        this.busObject.datas.push(bus);
        this.reinitFormDialog();
      }
    },

    deleteBusItem(position) {
      this.busObject.datas.splice(position, 1);
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
          this.busObject.datas = [];
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
      if (!this.$v.newBus.designation.$dirty) return errors;
      !this.$v.newBus.designation.required &&
        errors.push("Entrer une désignation pour le bus.");
      return errors;
    },

    numeroContrainte() {
      const errors = [];
      if (!this.$v.newBus.numero.$dirty) return errors;
      !this.$v.newBus.numero.required && errors.push("Information requis.");
      !this.isOverToZero(this.newBus.numero) && errors.push("Champs Incorrect");
      return errors;
    },

    nbrePlaceBusContrainte() {
      const errors = [];
      if (!this.$v.newBus.nombrePlace.$dirty) return errors;
      !this.$v.newBus.nombrePlace.required &&
        errors.push("Information requis.");
      !this.isOverToZero(this.newBus.nombrePlace) &&
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

.bus_designation {
  font-size: 15px;
  font-weight: bold;
  font-family: "Montserrat";
}

.main_title {
  opacity: 0.8;
  font-family: "Montserrat";
  font-weight: bold;
}

.subtitle {
  font-family: "Montserrat";
}

.input_field {
  font-family: "Montserrat";
}
</style>
