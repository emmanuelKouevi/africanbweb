<template>
  <v-app>
    <v-form @submit.prevent="submitForm">
      <v-container fluid>
        <v-card>
          <v-card-title
            >DATER UNE OFFRE DE VOYAGE
            <v-spacer></v-spacer>
            <v-btn
              rounded
              outlined
              small
              color="primary"
              @click="creerListJourSemaines(jourSemaineModel)"
              ><small
                ><v-icon>mdi-check</v-icon>ENREGISTRER LE JOUR</small
              ></v-btn
            >
          </v-card-title>
          <v-card-subtitle
            >Rattachez à vos offres , les jours ou celles-ci seront
            effectuées</v-card-subtitle
          >
          <v-container>
            <v-row>
              <v-col>
                <v-select
                  :items="offreVoyageParCompagnieTransportList"
                  item-text="designation"
                  item-value="designation"
                  rounded
                  :error-messages="offreVoyageDesignation"
                  v-model.trim="
                    $v.jourSemaineModel.offreVoyageDesignation.$model
                  "
                  dense
                  outlined
                  color="teal"
                  label="sélectionnez une offre"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  dense
                  outlined
                  rounded
                  label="Designation"
                  :error-messages="jourSemaineReference"
                  v-model.trim="$v.jourSemaineModel.designation.$model"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  dense
                  rounded
                  outlined
                  label="Jour de la semaine"
                  :items="jourSemaineList"
                  item-value="designation"
                  item-text="designation"
                  :error-messages="jourSemaineDesignation"
                  v-model.trim="
                    $v.jourSemaineModel.jourSemaineDesignation.$model
                  "
                ></v-select>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row>
              <v-col><small class="libelle-jour">Offre Voyage</small></v-col>
              <v-col><small class="libelle-jour">Designation</small></v-col>
              <v-col><small class="libelle-jour">Programmé pour </small></v-col>
              <v-col><small class="libelle-jour">Actions</small></v-col>
            </v-row>

            <v-row
              v-for="(jour, index) in jourSemaineSelectionnesList"
              :key="index"
            >
              <v-col
                ><small class="jour-info">{{
                  jour.offreVoyageDesignation
                }}</small></v-col
              >
              <v-col
                ><small class="jour-info">{{ jour.designation }}</small></v-col
              >
              <v-col
                ><small class="jour-info">{{
                  jour.jourSemaineDesignation
                }}</small></v-col
              >
              <v-col
                ><small class="libelle-jour"
                  ><v-btn icon></v-btn
                  ><v-icon color="red">mdi-delete</v-icon></small
                ></v-col
              >
            </v-row>

            <v-divider></v-divider><br />
          </v-container>
          <v-card-actions>
            <v-btn small shaped rounded outlined>REINITIALISER</v-btn>
            <v-btn type="submit" small shaped rounded outlined color="success"
              >APPLIQUER</v-btn
            >
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
import axios from "axios";
import $ from "jquery";
import {
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  API_RECUPERER_LISTE_OFFRE_VOYAGE,
  HEADERS,
} from "../globalConfig/globalConstConfig";
import { API_CREER_JOUR_SEMAINE_OFFRE_VOYAGE } from "../globalConfig/globalConstConfig";
import { required } from "vuelidate/lib/validators";
export default {
  name: "ProgrammerOffreVoyage",
  data() {
    return {
      overlay: false,
      errorMsg: null,
      successMsg: null,

      jourSemaineList: [],
      jourSemaineSelectionnesList: [],

      jourSemaineModel: {
        designation: null,
        jourSemaineDesignation: null,
        offreVoyageDesignation: null,
      },

      referenceJourSemaine: {
        referenceFamilleDesignation: "referenceFamilleJourSemaine",
      },

      objectToSend: {
        datas: [],
      },

      jourSemaineObject: {
        datas: [],
      },

      offreVoyageObject: {
        data: {
          compagnieTransportRaisonSociale: "KOUEVI TRANSPORT",
        },
      },

      offreVoyageParCompagnieTransportList: [],
    };
  },

  validations: {
    programmeOffreVoyage: {
      designation: {
        required,
      },

      heureArrivee: {
        required,
      },
      heureDepart: {
        required,
      },
    },

    jourSemaineModel: {
      designation: {
        required,
      },
      jourSemaineDesignation: {
        required,
      },

      offreVoyageDesignation: {
        required,
      },
    },
  },

  methods: {
    //SOUMISSION DU FORMULAIRE
    submitForm() {
      this.enregistrerJourSemaineOffre();
    },

    // ENREGISTRER LE JOUR DE LA SEMAINE
    async enregistrerJourSemaineOffre() {
      if (this.jourSemaineSelectionnesList.length == 0) {
        this.errorMsg = "AUCUN JOUR N'A ÉTÉ SELECTIONNÉ";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        this.jourSemaineObject.datas = this.jourSemaineSelectionnesList;
        await axios
          .post(API_CREER_JOUR_SEMAINE_OFFRE_VOYAGE, this.jourSemaineObject, {
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
                this.jourSemaineObject.datas = [];
              } else {
                this.errorMsg = response.data.status.message;
                $(".alert-error").fadeIn();
                setTimeout(function () {
                  $(".alert-error").fadeOut();
                }, 3000);
                this.jourSemaineObject.datas = [];
              }
            } else if (response.status == 204) {
              this.warningMsg =
                "Erreur , lors de la création de l'offre de voyage";
              $(".alert-warning").fadeIn();
              setTimeout(function () {
                $(".alert-warning").fadeOut();
              }, 3000);
              this.jourSemaineObject.datas = [];
            } else {
              this.errorMsg = "Erreur , opération de création impossible";
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.jourSemaineObject.datas = [];
            }
          })
          .catch((e) => {
            this.errorMsg = e;
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
            this.jourSemaineObject.datas = [];
          })
          .finally(() => {
            this.overlay = false;
          });
      }
    },

    //OBTENIR LISTE DES JOURS DE LA SEMAINE
    async obtenirJourSemaineList() {
      this.objectToSend.datas.push(this.referenceJourSemaine);
      await axios
        .post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          this.jourSemaineList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    //CREER UNE LISTE DE JOUR DE SEMAINE
    creerListJourSemaines(jourSemaine) {
      this.$v.$touch();
      if (this.$v.jourSemaineModel.$invalid) {
        this.errorMsg = "Vous avez omis certains champs";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 2000);
      } else {
        var jourSemaineSelectionne = {
          designation: null,
          jourSemaineDesignation: null,
          offreVoyageDesignation: null,
        };
        jourSemaineSelectionne.designation = jourSemaine.designation;
        jourSemaineSelectionne.jourSemaineDesignation =
          jourSemaine.jourSemaineDesignation;
        jourSemaineSelectionne.offreVoyageDesignation =
          jourSemaine.offreVoyageDesignation;
        this.jourSemaineSelectionnesList.push(jourSemaineSelectionne);
      }
    },

    // RECUPERER LA LISTE DES OFFRES DE VOYAGES DISPONIBLES PAR COMPAGNIE DE TRANSPORT
    async obtenirOffreVoyageParCompagnieTransport() {
      await axios
        .post(API_RECUPERER_LISTE_OFFRE_VOYAGE, this.offreVoyageObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.offreVoyageParCompagnieTransportList = response.data.items;
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        });
    },
  },

  computed: {
    // GESTIONS DES CONTRAINTES POUR LES CHAMPS DE SAISIES
    offreVoyageDesignation() {
      const errors = [];
      if (!this.$v.jourSemaineModel.offreVoyageDesignation.$dirty)
        return errors;
      !this.$v.jourSemaineModel.offreVoyageDesignation.required &&
        errors.push("Veuillez sélectionner une offre de voyage.");
      return errors;
    },
    jourSemaineReference() {
      const errors = [];
      if (!this.$v.jourSemaineModel.designation.$dirty) return errors;
      !this.$v.jourSemaineModel.designation.required &&
        errors.push("Entrer une désignation.");
      return errors;
    },
    jourSemaineDesignation() {
      const errors = [];
      if (!this.$v.jourSemaineModel.jourSemaineDesignation.$dirty)
        return errors;
      !this.$v.jourSemaineModel.jourSemaineDesignation.required &&
        errors.push("Sélectionner un jour.");
      return errors;
    },
  },

  mounted() {
    this.obtenirJourSemaineList();
    this.obtenirOffreVoyageParCompagnieTransport();
  },
};
</script>

<style scoped>
.libelle-jour {
  color: grey;
  font-weight: 500;
  font-size: 13px;
}

.jour-info {
  color: black;
  font-weight: bold;
  font-size: 16px;
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
