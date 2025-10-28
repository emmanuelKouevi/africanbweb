<template>
  <v-app>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-text>
              <v-card-title>
                <span class="title_form">Planifier vos offres de voyages</span>
                <v-spacer></v-spacer>
                <!--BOITE DE DIALOGUE POUR LES PRIX -->
                <v-dialog
                  v-model="dialogForPlanning"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :disabled="offreVoyageDesignation == null"
                      small
                      color="secondary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Planifier
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Définir un programme</span>
                    </v-card-title>
                    <v-card-text>
                      <form>
                        <div class="row">
                          <div class="col-lg">
                            <label for="exampleInputEmail1" class="form-label"
                              >Réference du programme:</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputEmail1"
                              v-model.trim="
                                $v.programmeOffreVoyageModel.designation.$model
                              "
                            />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-6">
                            <label for="exampleInputEmail1" class="form-label"
                              >Date de départ:</label
                            >
                            <input
                              type="date"
                              class="form-control"
                              id="exampleInputEmail1"
                              v-model.trim="
                                $v.programmeOffreVoyageModel.dateDepart.$model
                              "
                            />
                          </div>

                          <div class="col-lg-6">
                            <label for="exampleInputEmail1" class="form-label"
                              >Date d'arrivée:</label
                            >
                            <input
                              type="date"
                              class="form-control"
                              id="exampleInputEmail1"
                              v-model.trim="
                                $v.programmeOffreVoyageModel.dateArrivee.$model
                              "
                            />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-6">
                            <label for="exampleInputEmail1" class="form-label"
                              >Heure de départ:</label
                            >
                            <input
                              type="time"
                              class="form-control"
                              id="exampleInputEmail1"
                              v-model.trim="
                                $v.programmeOffreVoyageModel.heureDepart.$model
                              "
                            />
                          </div>

                          <div class="col-lg-6">
                            <label for="exampleInputEmail1" class="form-label"
                              >Heure d'arrivée (Estimation):</label
                            >
                            <input
                              type="time"
                              class="form-control"
                              id="exampleInputEmail1"
                              v-model.trim="
                                $v.programmeOffreVoyageModel.heureArrivee.$model
                              "
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-6">
                            <label for="exampleInputEmail1" class="form-label"
                              >Selectionner un autocar:</label
                            >
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              v-model.trim="
                                $v.programmeOffreVoyageModel.numeroBus.$model
                              "
                            >
                              <option
                                v-for="(bus, b) in availableBusList"
                                :key="b"
                                :value="bus.numero"
                              >
                                {{ bus.designation }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogForPlanning = false"
                      >
                        Annuler
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="savePlanningInList"
                      >
                        Enregistrer
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- FIN DE BOITE DE DIALOGUE -->
              </v-card-title>
              <v-spacer></v-spacer>
              <div class="container">
                <div class="row">
                  <div class="col-lg-5">
                    <label for="exampleInputEmail1" class="form-label"
                      >Désignation de l'offre</label
                    >
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="offreVoyageDesignation"
                    >
                      <option
                        v-for="(
                          offre, off
                        ) in offreVoyageParCompagnieTransportList"
                        :key="off"
                      >
                        {{ offre.designation }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <v-card width="900px">
                    <v-card-title class="title-card"
                      >Planification en cours...
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>

                    <v-data-table
                      :headers="headers"
                      :items="programmeOffreVoyageList"
                      :search="search"
                    >
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-btn
                          x-small
                          @click="deleteItemInPlaningList(item)"
                          color="error"
                          >Supprimer</v-btn
                        >
                      </template>
                    </v-data-table>
                    <v-alert
                      class="myalert alert-error"
                      type="error"
                      width="350px"
                      dismissible
                      >{{ errorMsg }}</v-alert
                    >
                  </v-card>
                </div>
              </div>
              <br /><br />
              <div class="float-right">
                <v-btn btn color="secondary" outlined>REINITIALISER</v-btn
                >&nbsp;&nbsp;
                <v-btn
                  @click="enregistrerProgrammeOffreVoyage"
                  color="success"
                  btn
                  outlined
                  >ENREGISTRER</v-btn
                >
              </div>
              <br /><br />
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
  API_CREER_PROGRAMME_OFFRE_VOYAGE,
  API_RECUPERER_LISTE_OFFRE_VOYAGE,
  API_RECUPERER_LISTE_BUS_PAR_COMPAGNIE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";

export default {
  name: "PlanifierOffreVoyage",
  data() {
    return {
      // VARIABLES COMMUNES

      errorMsg: null,
      successMsg: null,
      overlay: false,
      dialogForPlanning: false,
      editedIndex: -1,

      offreVoyageDesignation: null,

      // VARIABLES PLANIFICATION OFFRE DE VOYAGE

      search: "",
      headers: [
        { text: "RÉFÉRENCE", value: "designation" },
        { text: "NUMERO DU BUS", value: "numeroBus" },
        { text: "DATE DEPART", value: "dateDepart" },
        { text: "DATE ARRIVEE", value: "dateArrivee" },
        { text: "VOYAGE", value: "offreVoyageDesignation" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],

      programmeObject: {
        datas: [],
      },

      programmeOffreVoyageList: [],

      programmeOffreVoyageModel: {
        offreVoyageDesignation: null,
        designation: null,
        numeroBus: null,
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

      objectToSend: {
        datas: [],
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
    // VALIDATION POUR LA PLANIFICATION D'UNE OFFRE DE VOYAGE
    programmeOffreVoyageModel: {
      designation: {
        required,
      },

      dateDepart: {
        required,
      },

      dateArrivee: {
        required,
      },

      heureArrivee: {
        required,
      },
      heureDepart: {
        required,
      },

      numeroBus: {
        required,
      },
    },
  },

  methods: {
    // OUVERTURE DE LA BOITE DE DIALOG
    openDialogBox() {
      if (
        this.offreVoyageDesignation == null ||
        this.offreVoyageDesignation == ""
      ) {
        this.errorMsg = "Veuillez sélectionner une offre de voyage";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        this.dialogForPlanning = true;
      }
    },

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

    // ENREGISTREMENT D'UNE PLANIFICATION
    savePlanningInList() {
      this.$v.$touch();
      if (this.$v.programmeOffreVoyageModel.$invalid) {
        this.errorMsg = "Vous devez saisir tous les champs obligatoires";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        var planning = {
          offreVoyageDesignation: null,
          designation: null,
          numeroBus: null,
          dateDepart: null,
          dateArrivee: null,
          heureDepart: null,
          heureArrivee: null,
        };
        planning.offreVoyageDesignation = this.offreVoyageDesignation;
        planning.designation = this.programmeOffreVoyageModel.designation;
        planning.numeroBus = this.programmeOffreVoyageModel.numeroBus;
        planning.dateDepart = this.returnDateFormatted(
          this.programmeOffreVoyageModel.dateDepart
        );
        planning.dateArrivee = this.returnDateFormatted(
          this.programmeOffreVoyageModel.dateArrivee
        );
        planning.heureDepart = this.programmeOffreVoyageModel.heureDepart;
        planning.heureArrivee = this.programmeOffreVoyageModel.heureArrivee;

        this.programmeOffreVoyageList.push(planning);
        this.dialogForPlanning = false;

        this.programmeOffreVoyageModel.designation = null;
        this.programmeOffreVoyageModel.offreVoyageDesignation = null;
        this.programmeOffreVoyageModel.heureArrivee = null;
        this.programmeOffreVoyageModel.heureDepart = null;
        this.programmeOffreVoyageModel.dateDepart = null;
        this.programmeOffreVoyageModel.dateArrivee = null;
      }
    },

    // SUPPRIMER DES PROGRAMMES
    deleteItemInPlaningList(item) {
      this.editedIndex = this.programmeOffreVoyageList.indexOf(item);
      this.programmeOffreVoyageList.splice(this.editedIndex, 1);
    },

    //ENREGISTRER UN PROGRAMME POUR UNE OFFRE DE VOYAGE
    async enregistrerProgrammeOffreVoyage() {
      this.programmeOffreVoyageList.forEach((element) => {
        this.programmeObject.datas.push(element);
      });
      if (this.programmeOffreVoyageList.length == 0) {
        this.errorMsg = "Vous n'avez défini aucun programme !!";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 3000);
      } else {
        this.overlay = true;
        await axios
          .post(API_CREER_PROGRAMME_OFFRE_VOYAGE, this.programmeObject, {
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
            this.programmeOffreVoyageList = [];
            this.overlay = false;
          });
      }
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

    //VERIFIE SI CEST UN NOMBRE POSITIF
    isNumber(item) {
      return item > 0;
    },
  },

  computed: {
    // CONTRAINTE CONCERNANT LA PROGRAMMATION D'UNE OFFRE DE VOYAGE
    programmeOffreDesignation() {
      const errors = [];
      if (!this.$v.programmeOffreVoyageModel.designation.$dirty) return errors;
      !this.$v.programmeOffreVoyageModel.designation.required &&
        errors.push("Ce programme doit avoir un designation.");
      return errors;
    },

    programmeOffreHeureArrivee() {
      const errors = [];
      if (!this.$v.programmeOffreVoyageModel.heureArrivee.$dirty) return errors;
      !this.$v.programmeOffreVoyageModel.heureArrivee.required &&
        errors.push("Programmez une heure d'arrivée.");
      return errors;
    },

    programmeOffreHeureDepart() {
      const errors = [];
      if (!this.$v.programmeOffreVoyageModel.heureDepart.$dirty) return errors;
      !this.$v.programmeOffreVoyageModel.heureDepart.required &&
        errors.push("Programmez une heure de départ.");
      return errors;
    },
  },

  mounted() {
    this.obtenirOffreVoyageParCompagnieTransport();
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
  opacity: 0.9;
  font-family: "Montserrat";
}
</style>
