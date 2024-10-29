<template>
  <v-app>
    <v-container>
      <div class="row">
        <div class="col-lg-9">
          <v-sheet>
            <span class="font-weight-bold"
              >PROGRAMMER VOTRE OFFRE DE VOYAGE SIMPLEMENT</span
            ><br /><br />
            <!--
            <form>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Sélectionnez une offre:</label
                >
                <select
                  class="form-select col-lg-5"
                  aria-label="Default select example"
                  v-model="offreVoyageReference"
                  @change="recupererJourSemaineParOfrreVoyage"
                >
                  <option
                    v-for="(offre, off) in offreVoyageParCompagnieTransportList"
                    :key="off"
                    :value="offre.designation"
                  >
                    {{ offre.designation }}
                  </option>
                </select>
              </div>
            </form>

            <div class="row">
              <div class="col-lg-10">
                <v-card elevation="5">
                  <v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-btn class="float-right" small color="secondary"
                      ><v-icon>mdi-plus</v-icon> Nouveau programme</v-btn
                    >
                  </v-card-subtitle>
                  <v-card-text>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="designation_offre">
                            {{ offreVoyageReference }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >Programmes disponibles:</v-list-item-subtitle
                          >
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-subtitle class="font-weight-bold">{{
                            jourSemaineList.length
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </div>
            </div>
            <br />-->

            <v-card :disabled="haveSelectedOffre == true">
              <v-card-title
                ><span class="card-title font-weight-bold"
                  >CHOISISSEZ L'OFFRE À PROGRAMMER</span
                ></v-card-title
              >
              <v-card-text>
                <v-form>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Offre de voyage</label>
                    <v-select
                      class="col-lg-5"
                      :items="offreVoyageParCompagnieTransportList"
                      item-text="designation"
                      item-value="designation"
                      v-model="offreVoyageReference"
                      dense
                      outlined
                      color="teal"
                    ></v-select>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  x-small
                  color="teal"
                  :disabled="offreVoyageReference == null"
                  @click="programmerOffreBtn"
                  ><span class="btn-actions">Programmer ce trajet</span></v-btn
                >
              </v-card-actions> </v-card
            ><br />
            <v-divider v-if="haveSelectedOffre == true"></v-divider>
            <v-card
              v-if="haveSelectedOffre == true"
              :disabled="haveChoosedNombrePlace == true"
            >
              <v-card-title
                ><span class="card-title font-weight-bold"
                  >AUTRES INFORMATIONS</span
                ></v-card-title
              >
              <v-card-text>
                <div class="form-group">
                  <label for="exampleInputEmail1">Nombre de places</label>
                  <v-text-field
                    class="col-lg-3"
                    type="number"
                    min="0"
                    v-model.number="programmeOffreVoyage.nombrePlaceDisponible"
                    dense
                    outlined
                  ></v-text-field>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn x-small color="secondary" @click="comeBackSelectOffre"
                  ><span>Retour</span></v-btn
                >
                <v-btn x-small color="teal" @click="validerNombrePlace"
                  ><span class="btn-actions">Suivant</span></v-btn
                >
              </v-card-actions> </v-card
            ><br />
            <v-divider v-if="haveChoosedNombrePlace == true"></v-divider>
            <v-card v-if="haveChoosedNombrePlace == true">
              <v-card-title
                ><span class="card-title font-weight-bold"
                  >PROGRAMMER L'OFFRE</span
                ></v-card-title
              >
              <v-card-text>
                <v-form>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Référence du programme</label>
                      <v-text-field
                        :error-messages="programmeOffreDesignation"
                        v-model.trim="
                          $v.programmeOffreVoyage.designation.$model
                        "
                        dense
                        outlined
                      ></v-text-field>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Jour du programme</label>
                      <v-select
                        :error-messages="programmeOffreJourSemaineDesignation"
                        :items="jourSemaineList"
                        item-text="jourSemaineDesignation"
                        item-value="designation"
                        v-model.trim="
                          $v.programmeOffreVoyage.jourSemaineDesignation.$model
                        "
                        dense
                        outlined
                      ></v-select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Date de départ</label>
                      <v-text-field
                        type="date"
                        v-model="programmeOffreVoyage.dateDepart"
                        dense
                        outlined
                      ></v-text-field>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword4"
                        >Date d'arrivée (Estimation)</label
                      >
                      <v-text-field
                        type="date"
                        v-model="programmeOffreVoyage.dateArrivee"
                        dense
                        outlined
                      ></v-text-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Départ</label>
                      <v-text-field
                        type="time"
                        v-model="programmeOffreVoyage.heureDepart"
                        dense
                        outlined
                      ></v-text-field>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Arrivée</label>
                      <v-text-field
                        type="time"
                        v-model="programmeOffreVoyage.heureArrivee"
                        dense
                        outlined
                      ></v-text-field>
                    </div>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn x-small color="secondary" @click="comeBackSelectPlace"
                  ><span class="btn-actions">Retour</span></v-btn
                >
                <v-btn
                  x-small
                  color="teal"
                  @click="validerProgrammeOffreVoyage(programmeOffreVoyage)"
                  ><span class="btn-actions">Valider ce programme</span></v-btn
                >
              </v-card-actions> </v-card
            ><br />
            <v-divider></v-divider>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      ><small class="libelle-programme"
                        >Offre de Voyage</small
                      ></v-col
                    >
                    <v-col
                      ><small class="libelle-programme"
                        >Programmer pour</small
                      ></v-col
                    >
                    <v-col
                      ><small class="libelle-programme"
                        >Heure de départ</small
                      ></v-col
                    >
                    <v-col
                      ><small class="libelle-programme"
                        >Heure d'arrivée</small
                      ></v-col
                    >
                    <v-col
                      ><small class="libelle-programme"
                        >Nombre de places</small
                      ></v-col
                    >
                  </v-row>

                  <v-row
                    v-for="(programme, index) in programmeOffreVoyageList"
                    :key="index"
                  >
                    <v-col
                      ><small class="libelle-programme">{{
                        offreVoyageReference
                      }}</small></v-col
                    >
                    <v-col
                      ><small class="libelle-programme">{{
                        programme.jourSemaineDesignation
                      }}</small></v-col
                    >
                    <v-col
                      ><small class="libelle-programme">{{
                        programme.heureDepart
                      }}</small></v-col
                    >
                    <v-col
                      ><small class="libelle-programme">{{
                        programme.heureArrivee
                      }}</small></v-col
                    >
                    <v-col
                      ><small class="libelle-programme">{{
                        programme.nombrePlaceDisponible
                      }}</small></v-col
                    >
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions> </v-card-actions> </v-card
            ><br />

            <v-card-actions>
              <v-btn x-small color="secondary">Annuler</v-btn>
              <v-btn
                x-small
                color="success"
                @click="enregistrerProgrammeOffreVoyage()"
                >Enregistrer le programme</v-btn
              >
            </v-card-actions>
          </v-sheet>
        </div>
      </div>
    </v-container>
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
  API_RECUPERER_LISTE_OFFRE_VOYAGE,
  API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE,
  API_CREER_PROGRAMME_OFFRE_VOYAGE,
  HEADERS,
} from "../globalConfig/globalConstConfig";
import { required } from "vuelidate/lib/validators";
export default {
  name: "ProgrammerOffreVoyage",
  data() {
    return {
      haveSelectedOffre: false,
      haveChoosedNombrePlace: false,
      haveCreateProgram: false,

      overlay: false,
      errorMsg: null,
      successMsg: null,

      jourSemaineList: [],

      jourSemaineParOffreVoyage: {
        data: {
          designation: null,
        },
      },

      programmeObject: {
        datas: [],
      },

      offreVoyageReference: null,

      programmeOffreVoyageList: [],

      programmeOffreVoyage: {
        designation: null,
        nombrePlaceDisponible: null,
        jourSemaineDesignation: null,
        dateDepart: null,
        dateArrivee: null,
        heureDepart: null,
        heureArrivee: null,
      },

      objectToSend: {
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

    //COME BACK TO SELECT OFFRE VOYAGE
    comeBackSelectOffre() {
      this.haveSelectedOffre = false;
      this.haveChoosedNombrePlace = false;
    },

    // REVENIR A LA SELECTION DU NOMBRE DE PLACE
    comeBackSelectPlace() {
      this.haveChoosedNombrePlace = false;
      this.haveCreateProgram = false;
    },

    //ENREGISTRER UN PROGRAMME POUR UNE OFFRE DE VOYAGE
    async enregistrerProgrammeOffreVoyage() {
      this.programmeObject.datas = this.programmeOffreVoyageList;
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
          this.overlay = false;
        });
    },

    //VALIDER PROGRAMME D'UNE OFFRE EN FONCTION DU COURS DE SEMAINE
    validerProgrammeOffreVoyage(programmeOffre) {
      this.$v.$touch();
      if (this.$v.programmeOffreVoyage.$invalid) {
        this.errorMsg = "Vous avez omis certains champs";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 2000);
      } else {
        var unProgramme = {
          designation: null,
          nombrePlaceDisponible: null,
          jourSemaineDesignation: null,
          dateDepart: null,
          dateArrivee: null,
          heureDepart: null,
          heureArrivee: null,
        };
        unProgramme.designation = programmeOffre.designation;
        unProgramme.nombrePlaceDisponible =
          programmeOffre.nombrePlaceDisponible;
        unProgramme.jourSemaineDesignation =
          programmeOffre.jourSemaineDesignation;
        unProgramme.dateDepart = this.returnDateFormatted(
          programmeOffre.dateDepart
        );
        unProgramme.dateArrivee = this.returnDateFormatted(
          programmeOffre.dateArrivee
        );
        unProgramme.heureDepart = programmeOffre.heureDepart;
        unProgramme.heureArrivee = programmeOffre.heureArrivee;
        this.programmeOffreVoyageList.push(unProgramme);
      }
    },

    // RECUPERER LA LISTE DES JOURS RATTACHÉS A UNE OFFRE DE VOYAGE (PAR OFFRE VOYAGE)
    async recupererJourSemaineParOfrreVoyage() {
      this.jourSemaineParOffreVoyage.data.designation =
        this.offreVoyageReference;
      await axios
        .post(
          API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE,
          this.jourSemaineParOffreVoyage,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
              this.jourSemaineList = [];
            } else {
              this.jourSemaineList = response.data.items;
            }
          }
        })
        .catch((e) => {
          this.jourSemaineList = [];
          this.errorMsg = e;
        });
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

    //AFFICHER LES INFORMATIONS NÉCESSAIRES PERMETTANT LA PROGRAMMATION D'UNE OFFRE SÉELECTIONNÉE
    programmerOffreBtn() {
      if (this.offreVoyageReference == null) {
        this.$swal.fire("Erreur", "Aucune offre sélectionnée", "error");
      } else {
        this.recupererJourSemaineParOfrreVoyage();
        this.haveSelectedOffre = true;
      }
    },

    // VALIDER LE NOMBRE DE PLACE DU PROGRAMME
    validerNombrePlace() {
      if (this.programmeOffreVoyage.nombrePlaceDisponible == null) {
        this.$swal.fire("Erreur", "Champs nombre de place est requis", "error");
      } else if (
        typeof this.programmeOffreVoyage.nombrePlaceDisponible !== "number"
      ) {
        this.$swal.fire("Erreur", "Information non cohérente", "error");
      } else if (this.programmeOffreVoyage.nombrePlaceDisponible < 0) {
        this.$swal.fire(
          "Erreur",
          "Champs Nombre de place doit être un nombre",
          "error"
        );
      } else if (this.programmeOffreVoyage.nombrePlaceDisponible == 0) {
        this.$swal.fire(
          "Erreur",
          "Champs Nombre de place doit être superieure à 0",
          "error"
        );
      } else {
        this.haveChoosedNombrePlace = true;
      }
    },
  },

  computed: {
    // GESTIONS DES CONTRAINTES POUR LES CHAMPS DE SAISIES

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
    this.obtenirOffreVoyageParCompagnieTransport();
  },
};
</script>

<style scoped>
.card-title {
  color: #130f40;
  font-size: 13px;
}

.designation_offre {
  font-weight: 800;
  font-size: 20px;
  color: #303952;
}

.btn-actions {
  color: white;
}

.libelle-programme {
  color: grey;
  font-weight: 500;
  font-size: 13px;
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
