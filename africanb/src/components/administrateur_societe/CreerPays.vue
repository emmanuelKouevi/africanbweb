<template>
  <v-app>
    <v-container fluid>
      <v-form @submit.prevent="submitForm">
        <v-card max-width="1300px" class="">
          <v-card-title
            ><h6 class="font-weight-bold">
              <span class="title-card">AJOUTER UN PAYS</span>
            </h6></v-card-title
          >
          <v-card-subtitle
            >Définissez les differents pays pour une administration
            classique</v-card-subtitle
          >

          <v-card-text>
            <form>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Pays</label
                >

                <input
                  type="text"
                  class="form-control col-lg-6"
                  v-model.trim="$v.pays.designation.$model"
                  name=""
                  id=""
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Description</label
                >
                <textarea
                  class="form-control col-lg-7"
                  name=""
                  id=""
                  v-model="pays.description"
                ></textarea>
              </div>
            </form>
          </v-card-text>

          <v-card-actions>
            <v-btn small color="secondary">REINITIALISER</v-btn>
            <v-btn small type="submit" color="success">ENREGISTRER</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>

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
import { required } from "vuelidate/lib/validators";
import $ from "jquery";
import axios from "axios";
import { API_CREER_PAYS, HEADERS } from "../globalConfig/globalConstConfig";
export default {
  name: "CreerPays",
  data() {
    return {
      overlay: false,
      errorMsg: null,
      successMsg: null,
      warningMsg: null,

      objectContainList: {
        datas: [],
      },

      pays: {
        designation: null,
        description: null,
      },
    };
  },

  validations: {
    pays: {
      designation: {
        required,
      },
    },
  },

  methods: {
    // CREATION D'UN PAYS VIA UN SERVICE WEB
    async creerPays() {
      this.objectContainList.datas.push(this.pays);
      await axios
        .post(API_CREER_PAYS, this.objectContainList, {
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
              this.pays.description = null;
              this.pays.description = null;
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

    // SOUMISSION DU FORMULAIRE
    submitForm() {
      this.$v.$touch();
      if (this.$v.pays.$invalid) {
        this.errorMsg = "Des informations sont manquantes";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 3000);
      } else {
        this.creerPays();
      }
    },
  },

  computed: {
    // ENSEMBLE DES CONTRAINTES POUR L'ENRGISTREMENT D'UN PAYS
    designationPaysErrors() {
      const errors = [];
      if (!this.$v.pays.designation.$dirty) return errors;
      !this.$v.pays.designation.required &&
        errors.push("Veuillez saisir une désignation.");
      return errors;
    },
  },
};
</script>

<style scoped>
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
