<template>
  <v-app>
    <v-form @submit.prevent="submitForm">
      <v-container fluid>
        <v-card width="1200" elevation="3">
          <v-card-title>GESTION DES MODES ET DU TARIF</v-card-title>
          <v-card-subtitle
            >Gérer le mode et les tarifs de l'offre</v-card-subtitle
          >
          <v-container>
            <v-row>
              <v-col cols="5">
                <v-select
                  :error-messages="offreVoyagePrixOffreVoyageErrors"
                  :items="offreVoyageParCompagnieTransportList"
                  item-text="designation"
                  item-value="designation"
                  rounded
                  dense
                  outlined
                  color="teal"
                  label="sélectionnez une offre"
                  v-model.trim="
                    $v.prixOffreVoyageModel.offreVoyageDesignation.$model
                  "
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <v-text-field
                  :error-messages="designationPrixOffreVoyageErrors"
                  rounded
                  dense
                  outlined
                  label="Réference"
                  v-model.trim="$v.prixOffreVoyageModel.designation.$model"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-select
                  :error-messages="categoriePrixOffreVoyageErrors"
                  :items="referenceModeCategorieVoyageurList"
                  item-text="designation"
                  item-value="designation"
                  rounded
                  dense
                  outlined
                  color="teal"
                  label="sélectionnez une categorie"
                  v-model.trim="
                    $v.prixOffreVoyageModel.categorieVoyageurDesignation.$model
                  "
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <v-select
                  :error-messages="modePrixOffreVoyageErrors"
                  :items="referenceModeOffreVoyageList"
                  item-text="designation"
                  item-value="designation"
                  rounded
                  dense
                  outlined
                  color="teal"
                  label="Mode de l'offre"
                  v-model.trim="$v.prixOffreVoyageModel.modeDesignation.$model"
                ></v-select>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  :error-messages="pricePrixOffreVoyageErrors"
                  rounded
                  dense
                  outlined
                  color="teal"
                  label="Tarif de l'offre"
                  suffix="FCFA"
                  v-model.number="$v.prixOffreVoyageModel.prix.$model"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions>
            <v-btn small rounded outlined>REINITIALISER</v-btn>
            <v-btn small type="submit" rounded outlined color="primary"
              >VALIDER</v-btn
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
import { required } from "vuelidate/lib/validators";
import {
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  API_RECUPERER_LISTE_OFFRE_VOYAGE,
  HEADERS,
} from "../globalConfig/globalConstConfig";
import { API_RATTACHER_PRIX_OFFRE_VOYAGE } from "../globalConfig/globalConstConfig";

export default {
  name: "CreerModeTarif",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: false,

      prixOffreVoyageToSend: {
        datas: [],
      },

      prixOffreVoyageModel: {
        designation: null,
        prix: null,
        modeDesignation: null,
        categorieVoyageurDesignation: null,
        offreVoyageDesignation: null,
      },

      referenceModeOffreVoyageList: [],
      referenceModeCategorieVoyageurList: [],

      objectToSendReferenceModeOffre: {
        datas: [],
      },

      objectToSendReferenceModeCategorieVoyageur: {
        datas: [],
      },

      referenceModeOffreVoyage: {
        referenceFamilleDesignation: "referenceFamilleMode",
      },

      referenceCategorieVoyageur: {
        referenceFamilleDesignation: "referenceFamilleCategorieVoyaeur",
      },

      offreVoyageParCompagnieTransportList: [],

      offreVoyageObject: {
        data: {
          compagnieTransportRaisonSociale: "KOUEVI TRANSPORT",
        },
      },
    };
  },

  validations: {
    prixOffreVoyageModel: {
      designation: {
        required,
      },
      prix: {
        required,
      },
      modeDesignation: {
        required,
      },
      offreVoyageDesignation: {
        required,
      },
      categorieVoyageurDesignation: {
        required,
      },
    },
  },

  methods: {
    //SOUMETTRE LE FORMULAIRE DE CREATION D'UN PRIX POUR UNE OFFRE
    submitForm() {
      this.$v.$touch();
      if (this.$v.prixOffreVoyageModel.$invalid) {
        this.errorMsg = "Toutes les informations sont requises";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 2000);
      } else {
        this.creerPrixPourOffreDeVoyage();
      }
    },

    // CREER UN PRIX POUR UNE OFFRE DE VOYAGE
    async creerPrixPourOffreDeVoyage() {
      this.prixOffreVoyageToSend.datas.push(this.prixOffreVoyageModel);
      this.overlay = true;
      await axios
        .post(API_RATTACHER_PRIX_OFFRE_VOYAGE, this.prixOffreVoyageToSend, {
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
              this.prixOffreVoyageToSend.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.prixOffreVoyageToSend.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg =
              "Erreur , lors de la création de l'offre de voyage";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.prixOffreVoyageToSend.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.prixOffreVoyageToSend.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.prixOffreVoyageToSend.datas = [];
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    // RECUPERER LA LISTE DES OFFRES DE VOYAGES DISPONIBLES PAR COMPAGNIE DE TRANSPORT
    async obtenirOffreVoyageParCompagnieTransport() {
      axios
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

    //OBTENIR REFERENCE DESIGNATION TYPE OFFRE DE VOYAGE
    async obtenirReferenceModeOffreVoyage() {
      this.objectToSendReferenceModeOffre.datas.push(
        this.referenceModeOffreVoyage
      );
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.objectToSendReferenceModeOffre,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          this.referenceModeOffreVoyageList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

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
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    //VERIFIE SI CEST UN NOMBRE POSITIF
    isNumber(item) {
      return item > 0;
    },
  },

  computed: {
    // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION DU MODE D'UNE OFFRE

    designationPrixOffreVoyageErrors() {
      const errors = [];
      if (!this.$v.prixOffreVoyageModel.designation.$dirty) return errors;
      !this.$v.prixOffreVoyageModel.designation.required &&
        errors.push("La désignation est obligatoire.");
      return errors;
    },

    pricePrixOffreVoyageErrors() {
      const errors = [];
      if (!this.$v.prixOffreVoyageModel.prix.$dirty) return errors;
      !this.isNumber(this.prixOffreVoyageModel.prix) &&
        errors.push("Saisissez un prix correct.");
      !this.$v.prixOffreVoyageModel.prix.required &&
        errors.push("Le prix est obligatoire.");
      return errors;
    },

    modePrixOffreVoyageErrors() {
      const errors = [];
      if (!this.$v.prixOffreVoyageModel.modeDesignation.$dirty) return errors;
      !this.$v.prixOffreVoyageModel.modeDesignation.required &&
        errors.push("La selection du mode de l'offre est obligatoire.");
      return errors;
    },

    offreVoyagePrixOffreVoyageErrors() {
      const errors = [];
      if (!this.$v.prixOffreVoyageModel.offreVoyageDesignation.$dirty)
        return errors;
      !this.$v.prixOffreVoyageModel.offreVoyageDesignation.required &&
        errors.push("Sélectionnez une offre de voyage.");
      return errors;
    },

    categoriePrixOffreVoyageErrors() {
      const errors = [];
      if (!this.$v.prixOffreVoyageModel.categorieVoyageurDesignation.$dirty)
        return errors;
      !this.$v.prixOffreVoyageModel.categorieVoyageurDesignation.required &&
        errors.push("Veuillez selectionner une catégorie.");
      return errors;
    },
  },

  mounted() {
    this.obtenirReferenceModeOffreVoyage();
    this.obtenirReferenceModeCategorieVoyageur();
    this.obtenirOffreVoyageParCompagnieTransport();
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
