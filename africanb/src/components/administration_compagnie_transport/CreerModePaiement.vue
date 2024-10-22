<template>
  <v-app>
    <v-form @submit.prevent="submitForm">
      <v-container fluid>
        <v-card width="1200" elevation="3">
          <v-card-title
            ><h5 class="font-weight-bold">MODE DE PAIEMENTS</h5></v-card-title
          >
          <v-card-subtitle>Définissez vos modes de paiements</v-card-subtitle>

          <v-card-text>
            <form>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Réference paiement:</label
                >

                <input
                  type="text"
                  class="form-control col-lg-10"
                  v-model.trim="$v.modePaiementModel.designation.$model"
                  name=""
                  id=""
                />
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <label for="exampleInputEmail1" class="form-label"
                    >Opérateur:</label
                  >
                  <select
                    class="form-select"
                    v-model.trim="
                      $v.modePaiementModel.typeModePaiementDesignation.$model
                    "
                  >
                    <option
                      v-for="(operateur, op) in referenceTypePaiementList"
                      :key="op"
                    >
                      {{ operateur.designation }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="inputCity" class="form-label"
                    >N° de téléphone:</label
                  >
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">+225</span>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                      v-model.trim="
                        $v.modePaiementModel.telephoneGenerique.$model
                      "
                    />
                  </div>
                </div>
              </div>
            </form>
          </v-card-text>

          <v-card-actions>
            <v-btn small btn color="secondary">REINITIALISER</v-btn>
            <v-btn small btn type="submit" color="success">VALIDER</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-form>
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
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-app>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from "axios";
import $ from "jquery";
import {
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  API_CREER_MODE_PAIEMENT,
  HEADERS,
} from "../globalConfig/globalConstConfig";

export default {
  name: "CreerModePaiement",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: null,

      referenceTypePaiementList: [],

      referenceModePaiement: {
        referenceFamilleDesignation: "referenceFamilleModePaiement",
      },

      objectToSendReferenceModePaiement: {
        datas: [],
      },

      modePaiementModel: {
        designation: null,
        telephoneGenerique: null,
        typeModePaiementDesignation: null,
        compagnieTransportRaisonSociale: "KOUEVI CT",
      },

      modePaiementObject: {
        datas: [],
      },
    };
  },

  validations: {
    modePaiementModel: {
      designation: {
        required,
      },
      telephoneGenerique: {
        required,
      },
      typeModePaiementDesignation: {
        required,
      },
    },
  },

  methods: {
    // SOUMISSION DU FORMULAIRE
    submitForm() {
      this.$v.$touch();
      if (this.$v.modePaiementModel.$invalid) {
        this.errorMsg = "Des informations sont manquantes";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 3000);
      } else {
        this.creerModePaiement();
      }
    },

    // CREATION D'UN MODE DE PAIEMENT
    async creerModePaiement() {
      this.modePaiementObject.datas.push(this.modePaiementModel);
      this.overlay = true;
      await axios
        .post(API_CREER_MODE_PAIEMENT, this.modePaiementObject, {
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
              this.modePaiementObject.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.modePaiementObject.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg =
              "Erreur , lors de la création de l'offre de voyage";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.modePaiementObject.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.modePaiementObject.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.modePaiementObject.datas = [];
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    //OBTENIR REFERENCE DESIGNATION MODE DE PAIEMENT
    async obtenirReferenceModePaiementList() {
      this.objectToSendReferenceModePaiement.datas.push(
        this.referenceModePaiement
      );
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.objectToSendReferenceModePaiement,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          this.referenceTypePaiementList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },
  },

  computed: {
    // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UN MODE DE PAIEMENT

    designationPaiementErrors() {
      const errors = [];
      if (!this.$v.modePaiementModel.designation.$dirty) return errors;
      !this.$v.modePaiementModel.designation.required &&
        errors.push("La désignation est obligatoire.");
      return errors;
    },

    telephoneGeneriqueErrors() {
      const errors = [];
      if (!this.$v.modePaiementModel.telephoneGenerique.$dirty) return errors;
      !this.$v.modePaiementModel.telephoneGenerique.required &&
        errors.push("Entrer un numero de téléphone.");
      return errors;
    },

    typePaiementErrors() {
      const errors = [];
      if (!this.$v.modePaiementModel.typeModePaiementDesignation.$dirty)
        return errors;
      !this.$v.modePaiementModel.typeModePaiementDesignation.required &&
        errors.push("La selection du type de paiement est obligatoire.");
      return errors;
    },
  },

  mounted() {
    this.obtenirReferenceModePaiementList();
  },
};
</script>

<style scoped>
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
