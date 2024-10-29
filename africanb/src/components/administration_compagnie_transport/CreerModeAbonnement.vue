<template>
  <v-app>
    <v-form @submit.prevent="submitForm">
      <v-container fluid>
        <v-card elevation="1">
          <v-card-title
            ><h6 class="font-weight-bold">MODE D'ABONNEMENTS</h6></v-card-title
          >
          <v-card-subtitle>Définissez vos modes d'abonnements</v-card-subtitle>

          <v-card-text>
            <div class="container">
              <div class="row">
                <div
                  class="col-lg-5"
                  v-for="(abonnement, ab) in referenceAbonnementList"
                  :key="ab"
                >
                  <v-card>
                    <v-card-subtitle
                      ><span class="font-weight-bold">Mode {{ ab + 1 }}</span>
                      <v-spacer></v-spacer>
                      <br />
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          :name="abonnement"
                          :value="abonnement.designation"
                          v-model="typeAbonnement"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          {{ abonnement.designation }}
                        </label>
                      </div>
                    </v-card-subtitle>
                  </v-card>
                </div>
              </div>
            </div>
            <v-divider></v-divider>

            <div
              class="container animate__animated animate__backInLeft animate__slower"
              v-if="typeAbonnement == 'AbonnementPeriodique'"
            >
              <form>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Designation</label
                  >
                  <input
                    type="text"
                    id=""
                    class="form-control col-lg-8"
                    v-model.trim="
                      $v.modeAbonnementPeriodiqueModel.designation.$model
                    "
                  />
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <label for="inputCity" class="form-label">Redevance</label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        v-model.trim="
                          $v.modeAbonnementPeriodiqueModel.redevance.$model
                        "
                        aria-describedby="basic-addon1"
                      />
                      <span class="input-group-text" id="basic-addon1"
                        >FCFA</span
                      >
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <label for="inputCity" class="form-label"
                      >Redevance publicité</label
                    >
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        v-model.trim="
                          $v.modeAbonnementPeriodiqueModel.redevancePublicite
                            .$model
                        "
                        aria-describedby="basic-addon1"
                      />
                      <span class="input-group-text" id="basic-addon1"
                        >FCFA</span
                      >
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <label for="inputCity" class="form-label"
                      >Rériodicité</label
                    >
                    <select
                      class="form-select"
                      v-model.trim="
                        $v.modeAbonnementPeriodiqueModel
                          .periodiciteAbonnementDesignation.$model
                      "
                    >
                      <option
                        v-for="(periodicite, p) in referencePeriodiciteList"
                        :key="p"
                      >
                        {{ periodicite.designation }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-5">
                    <label for="inputCity" class="form-label"
                      >Date de début</label
                    >
                    <input
                      type="date"
                      id=""
                      class="form-control"
                      v-model="dateDebutAbonnementPeriodique"
                    />
                  </div>

                  <div class="col-lg-5">
                    <label for="inputCity" class="form-label"
                      >Date de fin</label
                    >
                    <input
                      type="date"
                      id=""
                      class="form-control"
                      v-model="dateFinAbonnementPeriodique"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div
              class="container animate__animated animate__backInLeft animate__slower"
              v-if="typeAbonnement == 'AbonnementPrelevement'"
            >
              <form>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Désignation</label
                  >
                  <input
                    type="text"
                    class="form-control col-lg-8"
                    v-model.trim="
                      $v.modeAbonnementPrelevementModel.designation.$model
                    "
                  />
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <label for="inputCity" class="form-label">Taux</label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        v-model.trim="
                          $v.modeAbonnementPrelevementModel.taux.$model
                        "
                        aria-describedby="basic-addon1"
                      />
                      <span class="input-group-text" id="basic-addon1">%</span>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <label for="inputCity" class="form-label"
                      >Rériodicité</label
                    >
                    <select
                      class="form-select"
                      v-model.trim="
                        $v.modeAbonnementPrelevementModel
                          .periodiciteAbonnementDesignation.$model
                      "
                    >
                      <option
                        v-for="(periodicite, p) in referencePeriodiciteList"
                        :key="p"
                      >
                        {{ periodicite.designation }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-5">
                    <label for="inputCity" class="form-label"
                      >Date de début</label
                    >
                    <input
                      type="date"
                      id=""
                      class="form-control"
                      v-model="dateDebutAbonnementPrevelement"
                    />
                  </div>

                  <div class="col-lg-5">
                    <label for="inputCity" class="form-label"
                      >Date de fin</label
                    >
                    <input
                      type="date"
                      id=""
                      class="form-control"
                      v-model="dateFinAbonnementPrevelement"
                    />
                  </div>
                </div>
              </form>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn small color="secondary">REINITIALISER</v-btn>
            <v-btn small type="submit" color="success">VALIDER</v-btn>
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
  API_CREER_MODE_ABONNEMENT,
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  HEADERS,
} from "../globalConfig/globalConstConfig";

export default {
  name: "CreerModeAbonnement",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: false,
      menuDebutAbonnement: false,
      menuFinAbonnement: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      dateDebutAbonnementPrevelement: null,
      dateFinAbonnementPrevelement: null,

      dateDebutAbonnementPeriodique: null,
      dateFinAbonnementPeriodique: null,

      referenceAbonnementList: [],
      referencePeriodiciteList: [],

      typeAbonnement: null,

      referenceAbonnement: {
        referenceFamilleDesignation: "referenceFamilleAbonnement",
      },
      referencePeriodiciteAbonnement: {
        referenceFamilleDesignation: "referenceFamillePeriodiciteAbonnement",
      },

      objectToSendReferenceAbonnement: {
        datas: [],
      },
      objectToSendReferencePeriodicite: {
        datas: [],
      },

      modeAbonnementPeriodiqueModel: {
        designation: null,
        dateDebutAbonnement: null,
        dateFinAbonnement: null,
        redevance: null,
        redevancePublicite: null,
        typeModeAbonnementDesignation: null,
        periodiciteAbonnementDesignation: null,
        compagnieTransportRaisonSociale: "KOUEVI TRANSPORT",
      },

      modeAbonnementPrelevementModel: {
        designation: null,
        dateDebutAbonnement: null,
        dateFinAbonnement: null,
        taux: null,
        periodiciteAbonnementDesignation: null,
        compagnieTransportRaisonSociale: "KOUEVI TRANSPORT",
      },

      abonnementObject: {
        datas: [],
      },
    };
  },

  validations: {
    modeAbonnementPeriodiqueModel: {
      designation: {
        required,
      },
      dateDebutAbonnement: {
        required,
      },
      dateFinAbonnement: {
        required,
      },
      redevance: {
        required,
      },
      redevancePublicite: {
        required,
      },
      typeModeAbonnementDesignation: {
        required,
      },
      periodiciteAbonnementDesignation: {
        required,
      },
    },

    modeAbonnementPrelevementModel: {
      designation: {
        required,
      },
      taux: {
        required,
      },
      dateDebutAbonnement: {
        required,
      },
      dateFinAbonnement: {
        required,
      },
      periodiciteAbonnementDesignation: {
        required,
      },
    },
  },

  methods: {
    // SOUMISSION DU FORMULAIRE
    submitForm() {
      this.creerAbonnementCompagnie();
    },

    // CREER UN MODE ABONNEMENT DE TYPE PERIODIQUE
    async creerModeAbonnementPeriodique() {
      if (this.typeAbonnement == "AbonnementPeriodique") {
        this.overlay = true;
        this.modeAbonnementPeriodiqueModel.dateDebutAbonnement = new Date(
          this.dateDebutAbonnementPeriodique
        ).toLocaleDateString("en-GB");
        this.modeAbonnementPeriodiqueModel.dateFinAbonnement = new Date(
          this.dateFinAbonnementPeriodique
        ).toLocaleDateString("en-GB");
        this.abonnementObject.datas = [];
        this.modeAbonnementPeriodiqueModel.typeModeAbonnementDesignation =
          this.typeAbonnement;
        this.abonnementObject.datas.push(this.modeAbonnementPeriodiqueModel);
        await axios
          .post(API_CREER_MODE_ABONNEMENT, this.abonnementObject, {
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
                this.abonnementObject.datas = [];
              } else {
                this.errorMsg = response.data.status.message;
                $(".alert-error").fadeIn();
                setTimeout(function () {
                  $(".alert-error").fadeOut();
                }, 3000);
                this.abonnementObject.datas = [];
              }
            } else if (response.status == 204) {
              this.warningMsg =
                "Erreur , lors de la création de l'offre de voyage";
              $(".alert-warning").fadeIn();
              setTimeout(function () {
                $(".alert-warning").fadeOut();
              }, 3000);
              this.abonnementObject.datas = [];
            } else {
              this.errorMsg = "Erreur , opération de création impossible";
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.abonnementObject.datas = [];
            }
          })
          .catch((e) => {
            this.errorMsg = e;
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
            this.abonnementObject.datas = [];
          })
          .finally(() => {
            this.overlay = false;
          });
      }
    },

    // CREER UN MODE ABONNEMENT DE TYPE PRELEVEMENT
    async creerModeAbonnementPrelevement() {
      if (this.typeAbonnement == "AbonnementPrelevement") {
        this.overlay = true;
        this.modeAbonnementPrelevementModel.dateDebutAbonnement = new Date(
          this.dateDebutAbonnementPrevelement
        ).toLocaleDateString("en-GB");
        this.modeAbonnementPrelevementModel.dateFinAbonnement = new Date(
          this.dateFinAbonnementPrevelement
        ).toLocaleDateString("en-GB");
        this.abonnementObject.datas = [];
        this.modeAbonnementPrelevementModel.typeModeAbonnementDesignation =
          this.typeAbonnement;
        this.abonnementObject.datas.push(this.modeAbonnementPrelevementModel);
        await axios
          .post(API_CREER_MODE_ABONNEMENT, this.abonnementObject, {
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
                this.abonnementObject.datas = [];
              } else {
                this.errorMsg = response.data.status.message;
                $(".alert-error").fadeIn();
                setTimeout(function () {
                  $(".alert-error").fadeOut();
                }, 3000);
                this.abonnementObject.datas = [];
              }
            } else if (response.status == 204) {
              this.warningMsg =
                "Erreur , lors de la création de l'offre de voyage";
              $(".alert-warning").fadeIn();
              setTimeout(function () {
                $(".alert-warning").fadeOut();
              }, 3000);
              this.abonnementObject.datas = [];
            } else {
              this.errorMsg = "Erreur , opération de création impossible";
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.abonnementObject.datas = [];
            }
          })
          .catch((e) => {
            this.errorMsg = e;
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
            this.abonnementObject.datas = [];
          })
          .finally(() => {
            this.overlay = false;
          });
      }
    },

    // CREER UN MODE D'ABONNEMENT
    async creerAbonnementCompagnie() {
      this.creerModeAbonnementPeriodique();
      this.creerModeAbonnementPrelevement();
    },

    //OBTENIR REFERENCE DESIGNATION ABONNEMENT
    async obtenirReferenceAbonnementList() {
      this.objectToSendReferenceAbonnement.datas.push(this.referenceAbonnement);
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.objectToSendReferenceAbonnement,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          this.referenceAbonnementList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    //OBTENIR REFERENCE DESIGNATION PERIODICITÉ
    async obtenirReferencePeriodicteAbonnementList() {
      this.objectToSendReferencePeriodicite.datas.push(
        this.referencePeriodiciteAbonnement
      );
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.objectToSendReferencePeriodicite,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          this.referencePeriodiciteList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    // FORMAT DE LA DATE
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    //VERIFIE SI CEST UN NOMBRE POSITIF
    isNumber(item) {
      return item > 0;
    },
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(
        this.modeAbonnementPrelevementModel.dateDebutAbonnement
      );
    },

    // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UN ABONNEMENT

    designationAbonnementErrors() {
      const errors = [];
      if (!this.$v.modeAbonnementPeriodiqueModel.designation.$dirty)
        return errors;
      !this.$v.modeAbonnementPeriodiqueModel.designation.required &&
        errors.push("La désignation est obligatoire.");
      return errors;
    },

    redevanceAbonnementErrors() {
      const errors = [];
      if (!this.$v.modeAbonnementPeriodiqueModel.redevance.$dirty)
        return errors;
      !this.isNumber(this.modeAbonnementPeriodiqueModel.redevance) &&
        errors.push("Saisissez un prix correct.");
      !this.$v.modeAbonnementPeriodiqueModel.redevance.required &&
        errors.push("Le prix est obligatoire.");
      return errors;
    },

    typeAbonnementErrors() {
      const errors = [];
      if (
        !this.$v.modeAbonnementPeriodiqueModel.typeModeAbonnementDesignation
          .$dirty
      )
        return errors;
      !this.$v.modeAbonnementPeriodiqueModel.typeModeAbonnementDesignation
        .required &&
        errors.push("La selection du type du sac est obligatoire.");
      return errors;
    },

    periodiciteAbonnementErrors() {
      const errors = [];
      if (
        !this.$v.modeAbonnementPeriodiqueModel.periodiciteAbonnementDesignation
          .$dirty
      )
        return errors;
      !this.$v.modeAbonnementPeriodiqueModel.periodiciteAbonnementDesignation
        .required && errors.push("Veuillez renseigner ce champs.");
      return errors;
    },

    redevancePubAbonnementErrors() {
      const errors = [];
      !this.isNumber(this.modeAbonnementPeriodiqueModel.redevancePublicite) &&
        errors.push("Saisissez un nombre correct.");
      if (!this.$v.modeAbonnementPeriodiqueModel.redevancePublicite.$dirty)
        return errors;
      !this.$v.modeAbonnementPeriodiqueModel.redevancePublicite.required &&
        errors.push("Veuillez renseigner ce champs.");
      return errors;
    },

    dateDebutAbonnementErrors() {
      const errors = [];
      if (!this.$v.modeAbonnementPeriodiqueModel.dateDebutAbonnement.$dirty)
        return errors;
      !this.$v.modeAbonnementPeriodiqueModel.dateDebutAbonnement.required &&
        errors.push("Veuillez renseigner ce champs.");
      return errors;
    },

    dateFinAbonnementErrors() {
      const errors = [];
      if (!this.$v.modeAbonnementPeriodiqueModel.dateDebutAbonnement.$dirty)
        return errors;
      !this.$v.modeAbonnementPeriodiqueModel.dateDebutAbonnement.required &&
        errors.push("Veuillez renseigner ce champs.");
      return errors;
    },
  },

  mounted() {
    this.obtenirReferenceAbonnementList();
    this.obtenirReferencePeriodicteAbonnementList();
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
