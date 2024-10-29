<template>
  <v-app>
    <v-form @submit.prevent="submitForm">
      <v-container fluid>
        <v-card elevation="5">
          <v-card-title
            ><h6 class="font-weight-bold">
              CREER UNE OFFRE DE VOYAGE
            </h6></v-card-title
          >
          <v-card-subtitle
            >Mettre en ligne un nouvel offre de voyage</v-card-subtitle
          ><br />

          <v-card-text>
            <v-container fluid>
              <form>
                <div class="row">
                  <div class="col-lg-6">
                    <label for="exampleInputEmail1" class="form-label"
                      >Désignation de l'offre</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      v-model.trim="$v.offreVoyage.designation.$model"
                    />
                  </div>
                  <div class="col-lg-4">
                    <label for="exampleInputEmail1" class="form-label"
                      >Type</label
                    >
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model.trim="
                        $v.offreVoyage.typeOffreVoyageDesignation.$model
                      "
                    >
                      <option
                        v-for="(type, t) in referenceTypeOffreVoyageList"
                        :key="t"
                      >
                        {{ type.designation }}
                      </option>
                    </select>
                  </div>
                </div>
                <br />

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Description</label
                  >
                  <textarea
                    class="form-control col-lg-10"
                    name=""
                    id=""
                    v-model.trim="$v.offreVoyage.description.$model"
                  ></textarea>
                </div>
                <div class="row">
                  <div class="col-lg-5">
                    <label for="exampleInputEmail1" class="form-label"
                      >Départ</label
                    >
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model.trim="
                        $v.offreVoyage.villeDepartDesignation.$model
                      "
                    >
                      <option
                        v-for="(ville, l) in villesList"
                        :key="l"
                        :value="ville.designation"
                      >
                        {{ ville.designation }}
                      </option>
                    </select>
                  </div>
                  <div class="col-lg-5">
                    <label for="exampleInputEmail1" class="form-label"
                      >Destination</label
                    >
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model.trim="
                        $v.offreVoyage.villeDestinationDesignation.$model
                      "
                    >
                      <option
                        v-for="(ville, l) in villesList"
                        :key="l"
                        :value="ville.designation"
                      >
                        {{ ville.designation }}
                      </option>
                    </select>
                  </div>
                </div>
              </form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              small
              id="btnInitialize"
              dark
              color="secondary"
              data-cy="btnInitialize"
              >REINITIALISER</v-btn
            >
            <v-btn
              small
              id="btnCreate"
              type="submit"
              dark
              color="success"
              data-cy="btnCreate"
            >
              CRÉER L'OFFRE</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-container>
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
import {
  API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE,
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  API_CREER_OFFRE_VOYAGE,
  HEADERS,
} from "../globalConfig/globalConstConfig";
import { required, minLength } from "vuelidate/lib/validators";
import $ from "jquery";

export default {
  name: "CreerOffreVoyage",
  data() {
    return {
      successMsg: null,
      errorMsg: null,
      warningMsg: null,
      overlay: false,

      villesList: [],
      objectValue: {},
      referenceTypeOffreVoyageList: [],
      objectToSend: {
        datas: [],
      },

      offreVoyageToSend: {
        datas: [],
      },

      offreVoyage: {
        designation: null,
        description: null,
        compagnieTransportRaisonSociale: "KOUEVI TRANSPORT",
        typeOffreVoyageDesignation: null,
        villeDepartDesignation: null,
        villeDestinationDesignation: null,
      },

      referenceTypeOffreVoyage: {
        referenceFamilleDesignation: "referenceFamilleTypeOffreVoyage",
      },
    };
  },

  validations: {
    offreVoyage: {
      designation: {
        required,
        minLength: minLength(4),
      },
      description: {
        required,
        minLength: minLength(4),
      },
      villeDepartDesignation: {
        required,
      },
      villeDestinationDesignation: {
        required,
      },
      typeOffreVoyageDesignation: {
        required,
      },
    },
  },

  methods: {
    //SOUMISSION DU FORMULAIRE
    submitForm() {
      this.$v.$touch();
      if (this.$v.offreVoyage.$invalid) {
        this.errorMsg = "Vous n'avez saisi les champs concernés";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else this.creerOffreVoyage();
    },

    //OBTENIR REFERENCE DESIGNATION TYPE OFFRE DE VOYAGE
    async obtenirReferenceTypeOffreVoyage() {
      this.objectToSend.datas.push(this.referenceTypeOffreVoyage);
      await axios
        .post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          this.referenceTypeOffreVoyageList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    // CREATION D'UNE OFFRE DE VOYAGE
    async creerOffreVoyage() {
      this.offreVoyageToSend.datas.push(this.offreVoyage);
      this.overlay = true;
      await axios
        .post(API_CREER_OFFRE_VOYAGE, this.offreVoyageToSend, {
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
              this.offreVoyageToSend.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.offreVoyageToSend.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg =
              "Erreur , lors de la création de l'offre de voyage";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.offreVoyageToSend.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.offreVoyageToSend.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.offreVoyageToSend.datas = [];
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    // RECUPERER LA LISTE DES VILLES ENREGISTRÉES
    async getAllCities() {
      this.loading = false;
      await axios
        .post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.objectValue, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          this.villesList = response.data.items;
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
    // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UNE OFFRE DE VOYAGE
    designationOffreVoyageErrors() {
      const errors = [];
      if (!this.$v.offreVoyage.designation.$dirty) return errors;
      !this.$v.offreVoyage.designation.minLength &&
        errors.push("Au moins quatres (4) caractères pour la designation");
      !this.$v.offreVoyage.designation.required &&
        errors.push("La désignation est obligatoire.");
      return errors;
    },

    descriptionOffreVoyageErrors() {
      const errors = [];
      if (!this.$v.offreVoyage.description.$dirty) return errors;
      !this.$v.offreVoyage.description.minLength &&
        errors.push("Au moins quatres (4) caractères pour la description");
      !this.$v.offreVoyage.description.required &&
        errors.push("La description est obligatoire.");
      return errors;
    },

    villeDepartErrors() {
      const errors = [];
      if (!this.$v.offreVoyage.villeDepartDesignation.$dirty) return errors;
      !this.$v.offreVoyage.villeDepartDesignation.required &&
        errors.push("La ville de depart est obligatoire.");
      return errors;
    },

    villeDestinationErrors() {
      const errors = [];
      if (!this.$v.offreVoyage.villeDestinationDesignation.$dirty)
        return errors;
      !this.$v.offreVoyage.villeDestinationDesignation.required &&
        errors.push("La ville de destination est obligatoire.");
      return errors;
    },

    typeOffreVoyageErrors() {
      const errors = [];
      if (!this.$v.offreVoyage.typeOffreVoyageDesignation.$dirty) return errors;
      !this.$v.offreVoyage.typeOffreVoyageDesignation.required &&
        errors.push("Le type d'offre de voyage est obligatoire.");
      return errors;
    },
  },

  mounted() {
    this.getAllCities();
    this.obtenirReferenceTypeOffreVoyage();
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

h4 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.my_input {
  font-family: "Times New Roman", Times, serif;
  font-size: 15px;
}
</style>
