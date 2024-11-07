<template>
  <v-app>
    <v-app>
      <v-form @submit.prevent="submitForm">
        <v-container fluid>
          <v-card elevation="3">
            <v-card-title>CREER UNE GARE DE TRANSPORT</v-card-title>
            <v-card-subtitle
              >Gérer vos gares pour les demandes de reservations ou
              autres</v-card-subtitle
            >
            <v-card-text>
              <form>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Référence de la gare</label
                  >

                  <input
                    type="text"
                    class="form-control col-lg-6"
                    v-model.trim="$v.gareTransportModel.designation.$model"
                    name=""
                    id=""
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >E-mail</label
                  >

                  <input
                    type="email"
                    class="form-control col-lg-8"
                    v-model.trim="$v.gareTransportModel.email.$model"
                    name=""
                    id=""
                  />
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <label for="inputCity" class="form-label"
                      >Téléphone n°1</label
                    >
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1"
                        >+225</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model.trim="$v.gareTransportModel.telephone1.$model"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>

                  <div class="col-md-4">
                    <label for="inputCity" class="form-label">
                      Téléphone n°2 (falculatif)</label
                    >
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1"
                        >+225</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model.trim="$v.gareTransportModel.telephone2.$model"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
                <br />

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Adresse (Localisation):</label
                  >
                  <input
                    type="text"
                    class="form-control col-lg-6"
                    v-model.trim="
                      $v.gareTransportModel.adresseLocalisation.$model
                    "
                    name=""
                    id=""
                  />
                </div>
              </form>
              <div class="float-right">
                <v-btn btn color="secondary">REINITIALISER</v-btn>&nbsp;&nbsp;
                <v-btn type="submit" color="success" btn>CREER LA GARE</v-btn>
              </div> </v-card-text
            ><br /><br />
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
  </v-app>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
import $ from "jquery";
import {
  API_CREER_GARE_COMPAGNIE_TRANSPORT,
  HEADERS,
} from "../components/globalConfig/globalConstConfig";
export default {
  name: "CreerGareCompagnieTransport",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: false,

      gareTransportToSend: {
        datas: [],
      },

      gareTransportModel: {
        designation: null,
        email: null,
        telephone1: null,
        telephone2: null,
        adresseLocalisation: null,
        compagnieTransportRaisonSociale: null,
      },
    };
  },

  validations: {
    gareTransportModel: {
      designation: {
        required,
      },

      email: {
        required,
        email,
      },

      telephone1: {
        required,
      },

      telephone2: {
        required,
      },

      adresseLocalisation: {
        required,
      },
    },
  },

  methods: {
    // SOUMISSION DU FORMULAIRE
    submitForm() {
      this.$v.$touch();
      if (this.$v.gareTransportModel.$invalid) {
        this.errorMsg = "Des informations sont manquantes";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 3000);
      } else {
        this.creerGareCompagnieTransport();
      }
    },

    //CREER UNE COMPAGNIE DE TRANSPORT
    async creerGareCompagnieTransport() {
      this.gareTransportModel.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.gareTransportToSend.datas.push(this.gareTransportModel);
      this.overlay = true;
      await axios
        .post(API_CREER_GARE_COMPAGNIE_TRANSPORT, this.gareTransportToSend, {
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
              this.gareTransportToSend.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.gareTransportToSend.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg = "Erreur , lors de la création de la gare";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.gareTransportToSend.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.gareTransportToSend.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.gareTransportToSend.datas = [];
        })
        .finally(() => {
          this.overlay = false;
        });
    },
  },

  computed: {
    // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION DU MODE D'UNE OFFRE

    designationGareErrors() {
      const errors = [];
      if (!this.$v.gareTransportModel.designation.$dirty) return errors;
      !this.$v.gareTransportModel.designation.required &&
        errors.push("La désignation est obligatoire.");
      return errors;
    },

    emailGareErrors() {
      const errors = [];
      if (!this.$v.gareTransportModel.email.$dirty) return errors;
      !this.$v.gareTransportModel.email.required &&
        errors.push("Le champs E-mail est obligatoire");
      !this.$v.gareTransportModel.email.email &&
        errors.push("Entrer une addresse mail valide.");
      return errors;
    },

    premierTelephoneGareErrors() {
      const errors = [];
      if (!this.$v.gareTransportModel.telephone1.$dirty) return errors;
      !this.$v.gareTransportModel.telephone1.required &&
        errors.push("Entrer un numero de téléphone.");
      return errors;
    },

    addresseLocalisationGareError() {
      const errors = [];
      if (!this.$v.gareTransportModel.adresseLocalisation.$dirty) return errors;
      !this.$v.gareTransportModel.adresseLocalisation.required &&
        errors.push("Votre addresse est obligatoire.");
      return errors;
    },
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
