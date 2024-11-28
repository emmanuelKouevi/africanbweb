<template>
  <v-app>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <span class="title_form"
            >Finalisez le processus d'activation de votre offre de voyage.</span
          >
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1">
              Sélectionner une offre
              <small
                >Selectionner l'offre de voyage que vous voudriez
                finaliser.</small
              >
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-card color="grey lighten-1" class="mb-12" height="200px">
                <v-card-text>
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label"
                        >Sélectionner une offre de voyage</label
                      >
                      <select
                        class="form-select col-lg-5"
                        aria-label="Default select example"
                        v-model="offreVoyageDesignation"
                      >
                        <option
                          v-for="(
                            offre, o
                          ) in offreVoyageParCompagnieTransportList"
                          :key="o"
                          :value="offre.designation"
                        >
                          {{ offre.designation }}
                        </option>
                      </select>
                    </div>
                  </form>
                </v-card-text>
              </v-card>
              <v-btn
                :disabled="offreVoyageDesignation == null"
                color="primary"
                @click="e6 = 2"
              >
                Continue
              </v-btn>
              <v-btn text disabled> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">
              Définir un jour de voyage pour votre offre
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card color="grey lighten-1" class="mb-12" height="200px">
                <v-card-text>
                  <form>
                    <div class="row">
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Désignation:</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          :error-messages="jourSemaineReference"
                          v-model.trim="$v.jourSemaineModel.designation.$model"
                        />
                      </div>
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Jour:</label
                        >
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          :error-messages="jourSemaineDesignation"
                          v-model.trim="
                            $v.jourSemaineModel.jourSemaineDesignation.$model
                          "
                        >
                          <option
                            v-for="(jour, day) in jourSemaineList"
                            :key="day"
                          >
                            {{ jour.designation }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </form>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click="rattacherJourVoyage">
                Continue
              </v-btn>
              <v-btn text @click="e6 = 1"> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3">
              Gérer le mode et le prix
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-card color="grey lighten-1" class="mb-12" height="200px">
                <v-card-text>
                  <form>
                    <div class="row">
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Réference du mode:</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          v-model="$v.prixOffreVoyageModel.designation.$model"
                        />
                      </div>
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Catégorie de l'offre:</label
                        >
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="
                            prixOffreVoyageModel.categorieVoyageurDesignation
                          "
                        >
                          <option
                            v-for="(
                              categorie, cat
                            ) in referenceModeCategorieVoyageurList"
                            :key="cat"
                          >
                            {{ categorie.designation }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Mode de l'offre:</label
                        >
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="prixOffreVoyageModel.modeDesignation"
                        >
                          <option
                            v-for="(mode, mod) in referenceModeOffreVoyageList"
                            :key="mod"
                          >
                            {{ mode.designation }}
                          </option>
                        </select>
                      </div>

                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Prix:</label
                        >
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            v-model.number="$v.prixOffreVoyageModel.prix.$model"
                            aria-describedby="basic-addon1"
                          />
                          <span class="input-group-text" id="basic-addon1"
                            >FCFA</span
                          >
                        </div>
                      </div>
                    </div>
                  </form>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click="rattacherModeEtPrix">
                Continue
              </v-btn>
              <v-btn text @click="e6 = 2"> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">
              Planifier votre offre de voyage
            </v-stepper-step>
            <v-stepper-content step="4">
              <v-card color="grey lighten-1" class="mb-12">
                <v-card-text>
                  <form>
                    <div class="row">
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Réference du programme:</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          :error-messages="programmeOffreDesignation"
                          v-model.trim="
                            $v.programmeOffreVoyage.designation.$model
                          "
                        />
                      </div>
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Jour de voyage:</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          v-model="jourSemaineModel.designation"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Date de départ:</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          id="exampleInputEmail1"
                          :error-messages="programmeOffreDesignation"
                          v-model="programmeOffreVoyage.dateDepart"
                        />
                      </div>
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Date d'arrivée (Estimation):</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          id="exampleInputEmail1"
                          :error-messages="programmeOffreDesignation"
                          v-model="programmeOffreVoyage.dateArrivee"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Heure de départ:</label
                        >
                        <input
                          type="time"
                          class="form-control"
                          id="exampleInputEmail1"
                          v-model="programmeOffreVoyage.heureDepart"
                        />
                      </div>
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Heure d'arrivée (Estimation):</label
                        >
                        <input
                          type="time"
                          class="form-control"
                          id="exampleInputEmail1"
                          v-model="programmeOffreVoyage.heureArrivee"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Selectionner votre autocar:</label
                        >
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="programmeOffreVoyage.numeroBus"
                        >
                          <option
                            v-for="(bus, b) in availableBusList"
                            :key="b"
                            :value="bus.numero"
                          >
                            {{ bus.designation }}
                          </option>
                        </select>

                        {{ programmeOffreVoyage.numeroBus }}
                      </div>
                    </div>

                    <v-divider></v-divider>
                  </form>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click="submitAllProcess">
                Terminer
              </v-btn>
              <v-btn text> Cancel </v-btn>
            </v-stepper-content>
          </v-stepper>
        </div>

        <div class="col-lg-3">
          <v-card elevation="5">
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >OFFRE DE VOYAGE EN COURS DE
                      PROGRAMMATION:</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >offre de voyage :</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      offreVoyageDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Référence du jour:</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      jourSemaineModel.designation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Jour de la semaine :</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      jourSemaineModel.jourSemaineDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Référence de mode:</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      prixOffreVoyageModel.designation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Catégorie :</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      prixOffreVoyageModel.categorieVoyageurDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Mode :</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      prixOffreVoyageModel.modeDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Prix:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      prixOffreVoyageModel.prix
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Référence du programme:</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      programmeOffreVoyage.designation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Départ:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      programmeOffreVoyage.dateDepart
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Arrivée:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      programmeOffreVoyage.dateArrivee
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Bus :</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      programmeOffreVoyage.numeroBus
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
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
  API_CREER_JOUR_SEMAINE_OFFRE_VOYAGE,
  API_RECUPERER_LISTE_BUS_PAR_COMPAGNIE,
  API_CREER_PROGRAMME_OFFRE_VOYAGE,
  API_RATTACHER_PRIX_OFFRE_VOYAGE,
  HEADERS,
} from "../globalConfig/globalConstConfig";

export default {
  name: "CreerModeTarif",
  data() {
    return {
      // VARIABLES COMMUNES

      errorMsg: null,
      successMsg: null,
      overlay: false,

      offreVoyageDesignation: null,

      e6: 1,

      // VARIABLES PLANIFICATION OFFRE DE VOYAGE

      programmeObject: {
        datas: [],
      },

      programmeOffreVoyageList: [],

      programmeOffreVoyage: {
        designation: null,
        numeroBus: null,
        jourSemaineDesignation: null,
        dateDepart: null,
        dateArrivee: null,
        heureDepart: null,
        heureArrivee: null,
      },

      availableBusList: [],

      busObject: {
        data: {
          raisonSociale: null,
        },
      },

      // VARIABLES POUR LA GESTION DU PRIX ET DU MODE D'UNE OFFRE DE VOYAGE

      prixOffreVoyageToSend: {
        datas: [],
      },

      jourSemaineObject: {
        datas: [],
      },

      objectToSend: {
        datas: [],
      },

      jourSemaineList: [],

      jourSemaineModel: {
        designation: null,
        jourSemaineDesignation: null,
        offreVoyageDesignation: null,
      },

      referenceJourSemaine: {
        referenceFamilleDesignation: "referenceFamilleJourSemaine",
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
          compagnieTransportRaisonSociale: null,
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

      categorieVoyageurDesignation: {
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
    },

    // VALIDATION POUR LA PLANIFICATION D'UNE OFFRE DE VOYAGE
    programmeOffreVoyage: {
      designation: {
        required,
      },

      jourSemaineDesignation: {
        required,
      },

      heureArrivee: {
        required,
      },
      heureDepart: {
        required,
      },
    },
  },

  methods: {
    // RETOURNER LA DATE SOUS FORME JJ-MM-AAAA
    returnDateFormatted(dateFormatted) {
      let date = new Date(dateFormatted);
      let jour = date.getDate();
      let mois = date.getMonth() + 1;
      let annee = date.getFullYear();
      jour = String(jour).padStart(2, "0");
      mois = String(mois).padStart(2, "0");
      let dateFormat = `${jour}/${mois}/${annee}`;
      return dateFormat;
    },

    //ENREGISTRER UN PROGRAMME POUR UNE OFFRE DE VOYAGE
    async enregistrerProgrammeOffreVoyage() {
      this.programmeOffreVoyage.dateDepart = this.returnDateFormatted(
        this.programmeOffreVoyage.dateDepart
      );
      this.programmeOffreVoyage.dateArrivee = this.returnDateFormatted(
        this.programmeOffreVoyage.dateArrivee
      );

      this.programmeOffreVoyage.jourSemaineDesignation =
        this.jourSemaineModel.designation;
      this.programmeObject.datas.push(this.programmeOffreVoyage);
      console.log(this.programmeOffreVoyage);
      this.overlay = true;
      await axios
        .post(API_CREER_PROGRAMME_OFFRE_VOYAGE, this.programmeObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          console.log("Nous sommes dans la reponse");
          console.log(response);
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              $(".alert-success").fadeIn();
              setTimeout(function () {
                $(".alert-success").fadeOut();
              }, 4000);
              this.programmeObject.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.programmeObject.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg =
              "Erreur , lors de la création de l'offre de voyage";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.programmeObject.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.programmeObject.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.programmeObject.datas = [];
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    //OBTENIR LISTE DES OFFRES DE VOYAGES DISPONIBLES PAR COMPAGNIE
    async getAllAvailableBus() {
      this.busObject.data.raisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.loading = true;
      await axios
        .post(API_RECUPERER_LISTE_BUS_PAR_COMPAGNIE, this.busObject, {
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
              this.availableBusList = response.data.items;
              console.log(this.availableBusList);
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

    // RATTACHER UN JOUR DE LA SEMAINE À UNE OFFRE DE VOYAGE
    async enregistrerJourSemaine() {
      this.jourSemaineModel.offreVoyageDesignation =
        this.offreVoyageDesignation;
      this.jourSemaineObject.datas.push(this.jourSemaineModel);
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
    },

    // RATTACHER UN JOUR DE LA SEMAINE À UNE OFFRE
    rattacherJourVoyage() {
      this.$v.$touch();
      if (this.$v.jourSemaineModel.$invalid) {
        this.errorMsg = "Vous n'avez saisi les champs concernés";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else this.e6 = 3;
    },

    // RATTACHER UN MODE ET UN PRIX
    rattacherModeEtPrix() {
      this.$v.$touch();
      if (this.$v.prixOffreVoyageModel.$invalid) {
        this.errorMsg = "Vous n'avez saisi les champs concernés";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else this.e6 = 4;
    },
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

    // CREER UN PRIX POUR UNE OFFRE DE VOYAGE
    async creerPrixPourOffreDeVoyage() {
      this.prixOffreVoyageModel.offreVoyageDesignation =
        this.offreVoyageDesignation;
      this.prixOffreVoyageToSend.datas.push(this.prixOffreVoyageModel);
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
        .finally(() => {});
    },

    // RECUPERER LA LISTE DES OFFRES DE VOYAGES DISPONIBLES PAR COMPAGNIE DE TRANSPORT
    async obtenirOffreVoyageParCompagnieTransport() {
      this.offreVoyageObject.data.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
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

    async submitAllProcess() {
      this.offreVoyageObject.data.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.enregistrerJourSemaine();
      this.creerPrixPourOffreDeVoyage();
      this.enregistrerProgrammeOffreVoyage();
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

    // CONTRAINTE CONCERNANT LA PROGRAMMATION D'UNE OFFRE DE VOYAGE
    programmeOffreDesignation() {
      const errors = [];
      if (!this.$v.programmeOffreVoyage.designation.$dirty) return errors;
      !this.$v.programmeOffreVoyage.designation.required &&
        errors.push("Ce programme doit avoir un designation.");
      return errors;
    },

    programmeOffreJourSemaineDesignation() {
      const errors = [];
      if (!this.$v.programmeOffreVoyage.jourSemaineDesignation.$dirty)
        return errors;
      !this.$v.programmeOffreVoyage.jourSemaineDesignation.required &&
        errors.push("Selectionner un jour pour la programmation.");
      return errors;
    },

    programmeOffreHeureArrivee() {
      const errors = [];
      if (!this.$v.programmeOffreVoyage.heureArrivee.$dirty) return errors;
      !this.$v.programmeOffreVoyage.heureArrivee.required &&
        errors.push("Programmez une heure d'arrivée.");
      return errors;
    },

    programmeOffreHeureDepart() {
      const errors = [];
      if (!this.$v.programmeOffreVoyage.heureDepart.$dirty) return errors;
      !this.$v.programmeOffreVoyage.heureDepart.required &&
        errors.push("Programmez une heure de départ.");
      return errors;
    },
  },

  mounted() {
    this.obtenirReferenceModeOffreVoyage();
    this.obtenirReferenceModeCategorieVoyageur();
    this.obtenirOffreVoyageParCompagnieTransport();
    this.obtenirJourSemaineList();
    this.getAllAvailableBus();
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

.title_form {
  font-weight: bold;
  font-size: 25px;
  opacity: 0.7;
  font-family: "Montserrat";
}
</style>
