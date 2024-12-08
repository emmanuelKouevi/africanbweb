<template>
  <v-app>
    <div class="container">
      <span class="title_form">Création d'une offre de voyage</span>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1" color="teal">
              <span class="litle_title"
                >Renseigner les informations générales</span
              >
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-card color="white" class="mb-12">
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
                    <br />
                  </v-container>
                </v-card-text>
              </v-card>
              <v-btn color="teal" outlined @click="checkInfosOffreVoyage">
                Continuer
              </v-btn>
              <v-btn text disabled> Annuler </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2" color="teal">
              <span class="litle_title">Définir vos prix de voyages</span>
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card color="white" class="mb-12">
                <v-card-title>
                  <v-spacer></v-spacer>
                  <!--BOITE DE DIALOGUE POUR LES PRIX -->
                  <v-dialog
                    v-model="dialogForPrice"
                    persistent
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn small color="secondary" v-bind="attrs" v-on="on">
                        Definir un prix
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Prix de voyage</span>
                      </v-card-title>
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
                                v-model="
                                  $v.prixOffreVoyageModel.designation.$model
                                "
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
                                  v-for="(
                                    mode, mod
                                  ) in referenceModeOffreVoyageList"
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
                                  type="number"
                                  class="form-control"
                                  v-model.number="
                                    $v.prixOffreVoyageModel.prix.$model
                                  "
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
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogForPrice = false"
                        >
                          Annuler
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="savePriceInList"
                        >
                          Enregistrer
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- FIN DE BOITE DE DIALOGUE -->
                </v-card-title>
                <v-card-text>
                  <div v-if="priceList.length == 0">
                    <span class="font-weight-bold text-center"
                      >AUCUN PRIX DÉFINI</span
                    >
                  </div>
                  <div v-else class="container">
                    <div class="row">
                      <div
                        v-for="(price, p) in priceList"
                        :key="p"
                        class="col-lg-4"
                      >
                        <v-card>
                          <v-card-title>
                            <span>Prix n°{{ p + 1 }}</span>
                            <v-spacer></v-spacer>
                            <v-icon
                              @click="deleteItemInPriceList(p)"
                              color="red"
                              >mdi-close</v-icon
                            >
                          </v-card-title>
                          <v-card-text>
                            <div>
                              <span>Réf:</span> &nbsp;&nbsp;
                              <span class="font-weight-bold">{{
                                price.designation
                              }}</span>
                            </div>
                            <div>
                              <span>Mode:</span>&nbsp;&nbsp;
                              <span class="font-weight-bold">{{
                                price.modeDesignation
                              }}</span>
                            </div>
                            <div>
                              <span>Catégorie:</span>&nbsp;&nbsp;
                              <span class="font-weight-bold">{{
                                price.categorieVoyageurDesignation
                              }}</span>
                            </div>
                            <div>
                              <span>Prix:</span>&nbsp;&nbsp;
                              <span class="font-weight-bold"
                                >{{ price.prix }} FCFA</span
                              >
                            </div>
                          </v-card-text>
                        </v-card>
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
              <v-btn color="teal" outlined @click="e6 = 3"> CONTINUER </v-btn>
              <v-btn text @click="e6 = 1"> ANNULER </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3" color="teal">
              <span class="litle_title">Définir vos villes esclaves</span>
            </v-stepper-step>
            <v-stepper-content step="3">
              <div class="row justify-end">
                <div class="col-lg-6">
                  <!-- BOITE DE DIALOG DEBUT-->
                  <v-dialog
                    v-model="dialogForEscale"
                    persistent
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn small color="secondary" v-bind="attrs" v-on="on">
                        AJOUTER DES ESCALES
                      </v-btn>
                    </template>
                    <v-card>
                      <v-toolbar color="white"
                        ><span class="font-weight-bold"
                          >SÉLECTIONNER VOS VILLES D'ESCALES</span
                        ></v-toolbar
                      >
                      <v-card-text>
                        <v-container fluid>
                          <div class="row">
                            <div class="col-lg-3">
                              <label for="exampleInputEmail1" class="form-label"
                                >Ordre escale</label
                              >
                              <input
                                type="number"
                                min="0"
                                class="form-control"
                                id="exampleInputEmail1"
                                v-model.trim="
                                  $v.villeEscaleData.position.$model
                                "
                              />
                            </div>
                            <div class="col-lg-6">
                              <label for="exampleInputEmail1" class="form-label"
                                >Ville</label
                              >
                              <select
                                class="form-select"
                                aria-label="Default select example"
                                v-model.trim="
                                  $v.villeEscaleData.villeDesignation.$model
                                "
                              >
                                <option
                                  v-for="(ville, v) in villesList"
                                  :key="v"
                                >
                                  {{ ville.designation }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogForEscale = false"
                        >
                          Annuler
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveVilleEscale(villeEscaleData)"
                        >
                          Valider
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <!-- BOITE DE DIALOG FIN-->
                </div>
              </div>
              <br />
              <v-card width="900px">
                <v-card-title class="title-card"
                  >Vos villes d'escales
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
                  :items="villesEscaleList"
                  :search="search"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                      x-small
                      @click="deleteItemInVilleEscaleList(item)"
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
                > </v-card
              ><br />
              <v-btn color="teal" outlined @click="creerOffreVoyage">
                Terminer
              </v-btn>
              <v-btn @click="e6 = 2" text> Annuler </v-btn>
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
                      offreVoyage.designation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Type de l'offre:</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      offreVoyage.typeOffreVoyageDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Départ :</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      offreVoyage.villeDepartDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Destination:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      offreVoyage.villeDestinationDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Total des prix:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      priceList.length
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
} from "@/components/globalConfig/globalConstConfig";
import { required, minLength } from "vuelidate/lib/validators";
import $ from "jquery";

export default {
  name: "CreerOffreVoyage",
  data() {
    return {
      // ------------------------------ VARIABLES COMMUNES ----------------------------------- //
      e6: 1,
      successMsg: null,
      errorMsg: null,
      warningMsg: null,
      overlay: false,

      objectValue: {},

      objectToSend: {
        datas: [],
      },

      // ---------------------- VARIABLES EN RAPPORT AVEC LES VILLES ------------------------//

      search: "",
      headers: [
        { text: "ORDRE", value: "position" },
        { text: "VILLE", value: "villeDesignation" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],

      villeEscaleData: {
        offreVoyageDesignation: null,
        villeDesignation: null,
        position: null,
      },

      villesEscaleList: [],

      villesList: [],

      dialogForEscale: false,

      // ---------------------- VARIABLES EN RAPPORT AVEC LES OFFRES DE VOYAGE ------------------------//

      offreVoyageToSend: {
        datas: [],
      },

      offreVoyage: {
        designation: null,
        description: null,
        compagnieTransportRaisonSociale: null,
        typeOffreVoyageDesignation: null,
        villeDepartDesignation: null,
        villeDestinationDesignation: null,
        prixOffreVoyageDTOList: [],
        villeEscaleDTOList: [],
      },

      referenceTypeOffreVoyage: {
        referenceFamilleDesignation: "referenceFamilleTypeOffreVoyage",
      },

      referenceTypeOffreVoyageList: [],

      // ---------------------- VARIABLES EN RAPPORT AVEC LES PRIX DE VOYAGES ------------------------//

      dialogForPrice: false,

      prixOffreVoyageModel: {
        designation: null,
        prix: null,
        modeDesignation: null,
        categorieVoyageurDesignation: null,
        offreVoyageDesignation: null,
      },

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

      referenceModeOffreVoyageList: [],
      referenceModeCategorieVoyageurList: [],

      priceList: [],

      // ----------------------- FIN: VARIABLE EN RAPPORT AVEC LES PRIX DE VOYAGES --------------------------//
    };
  },

  validations: {
    // VALIDATION DES CONTRAINTES OFFRE DE VOYAGES

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

    // VALIDATION DES CONTRAINTES PRIX DE VOYAGES
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

    // VALIDATION DES CONTRAINTES POUR LES VILLES ESCALES
    villeEscaleData: {
      /*offreVoyageDesignation: {
        required,
      },*/
      villeDesignation: {
        required,
      },
      position: {
        required,
      },
    },
  },

  methods: {
    // ENREGISTRER UNE VILLE ESCALE
    saveVilleEscale(villeEscale) {
      this.$v.$touch();
      if (
        this.$v.villeEscaleData.position.$invalid ||
        this.$v.villeEscaleData.villeDesignation.$invalid
      ) {
        this.errorMsg = "Le numero d'ordre et la ville escale sont obligatoire";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 2000);
      } else {
        var escale = {
          position: null,
          villeDesignation: null,
          offreVoyageDesignation: null,
        };
        if (this.villesEscaleList.length == 0) {
          escale.position = villeEscale.position;
          escale.villeDesignation = villeEscale.villeDesignation;
          //escale.offreVoyageDesignation = villeEscale.offreVoyageDesignation;

          this.villesEscaleList.push(escale);
          villeEscale.position = null;
          villeEscale.villeDesignation = null;
        } else {
          this.villesEscaleList.forEach((element) => {
            if (element.villeDesignation == villeEscale.villeDesignation) {
              this.$swal.fire(
                "Erreur",
                "Vous avez déja enregistré cette ville",
                "error"
              );
            } else {
              escale.position = villeEscale.position;
              escale.villeDesignation = villeEscale.villeDesignation;
              //escale.offreVoyageDesignation = villeEscale.offreVoyageDesignation;

              this.villesEscaleList.push(escale);
              villeEscale.position = null;
              villeEscale.villeDesignation = null;
            }
          });
        }
      }
    },

    // SUPPRIMER DES VILLES ESCALES ENREGISTRÉS
    deleteItemInVilleEscaleList(item) {
      this.editedIndex = this.villesEscaleList.indexOf(item);
      this.villesEscaleList.splice(this.editedIndex, 1);
    },

    //ENREGISTRER UN NOUVEAU PRIX
    savePriceInList() {
      this.$v.$touch();
      if (this.$v.prixOffreVoyageModel.$invalid) {
        this.errorMsg = "Vous devez saisir tous les champs obligatoires";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        var price = {
          designation: null,
          prix: null,
          modeDesignation: null,
          categorieVoyageurDesignation: null,
        };
        price.designation = this.prixOffreVoyageModel.designation;
        price.prix = this.prixOffreVoyageModel.prix;
        price.modeDesignation = this.prixOffreVoyageModel.modeDesignation;
        price.categorieVoyageurDesignation =
          this.prixOffreVoyageModel.categorieVoyageurDesignation;

        this.priceList.push(price);
        this.dialogForPrice = false;

        this.prixOffreVoyageModel.designation = null;
        this.prixOffreVoyageModel.modeDesignation = null;
        this.prixOffreVoyageModel.categorieVoyageurDesignation = null;
        this.prixOffreVoyageModel.prix = null;
      }
    },

    deleteItemInPriceList(position) {
      this.priceList.splice(position, 1);
    },

    //VERIFICATION DE L'ETAPE DE SAISIE DES INFORMATIONS D'OFFRE DE VOYAGE
    checkInfosOffreVoyage() {
      this.$v.$touch();
      if (this.$v.offreVoyage.$invalid) {
        this.errorMsg = "Vous n'avez saisi les champs concernés";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else this.e6 = 2;
    },
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
      this.offreVoyage.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.offreVoyage.prixOffreVoyageDTOList = this.priceList;
      this.offreVoyage.villeEscaleDTOList = this.villesEscaleList;
      this.prixOffreVoyageDTOList = this.priceList;
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
          this.offreVoyage.designation = null;
          this.offreVoyage.description = null;
          this.offreVoyage.typeOffreVoyageDesignation = null;
          this.offreVoyage.villeDepartDesignation = null;
          this.offreVoyage.villeDestinationDesignation = null;
          this.priceList = [];
          this.villesEscaleList = [];
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

    //VERIFIE SI CEST UN NOMBRE POSITIF
    isNumber(item) {
      return item > 0;
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

    // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LES PRIX DE VOYAGE

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

    categoriePrixOffreVoyageErrors() {
      const errors = [];
      if (!this.$v.prixOffreVoyageModel.categorieVoyageurDesignation.$dirty)
        return errors;
      !this.$v.prixOffreVoyageModel.categorieVoyageurDesignation.required &&
        errors.push("Veuillez selectionner une catégorie.");
      return errors;
    },

    // CONTRAINTES POUR L'ENREGISTREMENT DES VILLES ESCALES

    villeDesignation() {
      const errors = [];
      if (!this.$v.villeEscaleData.villeDesignation.$dirty) return errors;
      !this.$v.villeEscaleData.villeDesignation.required &&
        errors.push("Le champs ville est obligatoire.");
      return errors;
    },

    positionRequired() {
      const errors = [];
      if (!this.$v.villeEscaleData.position.$dirty) return errors;
      !this.$v.villeEscaleData.position.required &&
        errors.push("Definissez une position.");
      return errors;
    },
  },

  mounted() {
    this.getAllCities();
    this.obtenirReferenceTypeOffreVoyage();
    this.obtenirReferenceModeOffreVoyage();
    this.obtenirReferenceModeCategorieVoyageur();
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

.title_form {
  font-weight: bold;
  font-size: 25px;
  opacity: 0.7;
  font-family: "Montserrat";
}

.litle_title {
  opacity: 0.7;
  font-size: 18px;
  font-family: "Montserrat";
}
</style>
