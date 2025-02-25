<template>
  <v-app id="cityPageId">
    <v-form @submit.prevent="submitForm">
      <v-card max-width="1200px" class="mx-auto">
        <v-card-title
          ><h5 class="font-weight-bold">
            <span class="title-card">ENREGISTRER UNE VILLE</span>
          </h5></v-card-title
        >
        <v-card-subtitle
          >Définissez les différentes villes pour les offres de
          voyages</v-card-subtitle
        >

        <v-card-text>
          <form>
            <div class="row">
              <div class="col-lg-6">
                <label for="exampleInputEmail1" class="form-label"
                  >Désignation</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="$v.ville.designation.$model"
                />
              </div>
              <div class="col-lg-6">
                <label for="exampleInputEmail1" class="form-label">Pays</label>
                <select class="form-select" v-model="ville.paysId">
                  <option
                    v-for="(pays, p) in paysList"
                    :key="p"
                    :value="pays.id"
                  >
                    {{ pays.designation }}
                  </option>
                </select>
              </div>
            </div>
          </form>
        </v-card-text>

        <v-card-actions>
          <v-btn small color="secondary">REINITIALISER</v-btn>
          <v-btn small type="submit" color="success">ENREGISTRER</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>

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
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { required } from "vuelidate/lib/validators";
import {
  API_CREER_VILLE,
  API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE,
  HEADERS,
} from "../globalConfig/globalConstConfig";
export default {
  name: "CreerVille",
  data() {
    return {
      overlay: false,
      errorMsg: null,
      warningMsg: null,
      successMsg: null,

      paysList: [],

      objectContainList: {
        datas: [],
      },

      ville: {
        designation: null,
        paysId: null,
      },
    };
  },

  validations: {
    ville: {
      designation: {
        required,
      },
    },
  },

  methods: {
    // CREATION D'UNE VILLE VIA UN SERVICE WEB
    async creerVille() {
      this.objectContainList.datas.push(this.ville);
      await axios
        .post(API_CREER_VILLE, this.objectContainList, {
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
              this.objectContainList.datas.push = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.objectContainList.datas.push = [];
            }
          } else if (response.status == 204) {
            this.warningMsg = "Erreur , lors de la création";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.objectContainList.datas.push = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.objectContainList.datas.push = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 3000);
          this.objectContainList.datas.push = [];
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    // RECUPERER LA LISTE DES PAYS DISPONIBLES
    async obtenirListePaysDisponible() {
      var objectToSend = {};
      await axios
        .post(API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE, objectToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.paysList = response.data.items;
            }
          } else {
            this.errorMsg = "Erreur coté serveur";
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 3000);
        });
    },

    // ENVOI DU FORMULAIRE VERS LE MIDDLEWARE
    submitForm() {
      this.$v.$touch();
      if (this.$v.ville.$invalid) {
        this.errorMsg = "Des informations sont manquantes";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 3000);
      } else {
        this.creerVille();
      }
    },
  },

  computed: {
    // ENSEMBLE DES CONTRAINTES POUR L'ENRGISTREMENT D'UN PAYS
    designationVilleErrors() {
      const errors = [];
      if (!this.$v.ville.designation.$dirty) return errors;
      !this.$v.ville.designation.required &&
        errors.push("Veuillez saisir une désignation.");
      return errors;
    },
  },

  mounted() {
    this.obtenirListePaysDisponible();
  },
};
</script>

<style scoped>
#cityPageId {
  padding-top: 10px;
}

.title-card {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 16px;
}

.title {
  color: teal;
  font-weight: bold;
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

.alert-warning {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}
</style>
