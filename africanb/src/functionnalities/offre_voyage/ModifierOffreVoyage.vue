<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title class="title_text">
              {{ offreVoyage.designation }}
              <v-spacer></v-spacer>
              <v-chip
                v-if="offreVoyage.isActif == true"
                x-small
                color="success"
                text-color="white"
                class="mr-2"
                ><span class="etat font-weight-bold">active</span></v-chip
              >
              <v-chip
                v-else
                x-small
                color="error"
                text-color="white"
                class="mr-2"
                ><span class="etat font-weight-bold">inactive</span></v-chip
              >
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Description :</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      offreVoyage.description
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
              </v-list>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <v-card elevation="3">
            <v-card-title class="title_text"
              ><small>Total Tarification</small></v-card-title
            >
            <v-card-text>
              <span class="text-center total">{{
                tarificationList.length
              }}</span
              ><br />
              <div class="float-right">
                <v-btn @click="showTarifList = true" x-small color="secondary"
                  >voir détail</v-btn
                >
              </div> </v-card-text
            ><br />
          </v-card>
        </div>
        <div class="col-lg-4">
          <v-card elevation="3"
            ><v-card-title class="title_text"
              ><small>Total Programme</small></v-card-title
            >
            <v-card-text>
              <span class="text-center total">{{ programmeList.length }}</span
              ><br />
              <div class="float-right">
                <v-btn
                  @click="showProgrammeList = true"
                  x-small
                  color="secondary"
                  >voir détail</v-btn
                >
              </div> </v-card-text
            ><br
          /></v-card>
        </div>
        <div class="col-lg-4">
          <v-card elevation="3">
            <v-card-title class="title_text"
              ><small>Total Villes escales</small></v-card-title
            >
            <v-card-text>
              <span class="text-center total">{{ villeEscaleList.length }}</span
              ><br />
              <div class="float-right">
                <v-btn
                  x-small
                  color="secondary"
                  @click="showVilleEscaleList = true"
                  >voir détail</v-btn
                >
              </div> </v-card-text
            ><br />
          </v-card>
        </div>
      </div>
      <br /><br />
      <!--LISTE DES TARIFICATIONS-->
      <div class="row" v-show="showTarifList == true">
        <v-card>
          <v-card-title>
            <span class="title_text"
              >Tarification de l'offre ({{ offreVoyage.designation }})</span
            >
            <v-spacer></v-spacer>
            <!--BOITE DE DIALOGUE POUR LES PRIX -->
            <v-dialog v-model="dialogForPrice" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="offreVoyage.isActif !== true"
                  small
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="secondary" size="35">mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitlePrice }}</span>
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
                          v-model="editedTarif.designation"
                        />
                      </div>
                      <div class="col-lg-5">
                        <label for="exampleInputEmail1" class="form-label"
                          >Catégorie de l'offre:</label
                        >
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="editedTarif.categorieVoyageurDesignation"
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
                          v-model="editedTarif.modeDesignation"
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
                            type="number"
                            class="form-control"
                            aria-describedby="basic-addon1"
                            v-model="editedTarif.prix"
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
                  <v-btn color="blue darken-1" text @click="closeDialogPrice">
                    Annuler
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="saveOrUpdatePrice()"
                  >
                    Modifier
                  </v-btn>
                </v-card-actions>
              </v-card> </v-dialog
            >&nbsp;&nbsp;&nbsp;
            <!-- FIN DE BOITE DE DIALOGUE -->
            <v-btn x-small icon @click="showTarifList = false"
              ><v-icon color="secondary" size="35">mdi-minus</v-icon></v-btn
            >
          </v-card-title>
          <v-card-text>
            <div class="container">
              <div class="row">
                <div
                  class="col-lg-4"
                  v-for="(tarif, t) in tarificationList"
                  :key="t"
                >
                  <v-card>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle class="font-weight-bold">{{
                            tarif.designation
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action v-if="offreVoyage.isActif !== true">
                          <v-menu bottom right>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on"
                                ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                              >
                            </template>

                            <v-list>
                              <v-list-item
                                link
                                @click="editerTarification(tarif)"
                              >
                                <v-list-item-action
                                  ><v-icon color="primary"
                                    >mdi-pencil</v-icon
                                  ></v-list-item-action
                                >
                                <v-list-item-subtitle
                                  >Editer</v-list-item-subtitle
                                >
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-list-item-action>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle>Mode :</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-subtitle class="font-weight-bold">{{
                            tarif.modeDesignation
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >Categorie:</v-list-item-subtitle
                          >
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-subtitle class="font-weight-bold">{{
                            tarif.categorieVoyageurDesignation
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle>Prix :</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-subtitle class="font-weight-bold"
                            >{{ tarif.prix }} FCFA</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <br /><br />

      <!--LISTE DES PROGRAMMES-->
      <div class="row" v-show="showProgrammeList == true">
        <v-card>
          <v-card-title>
            <span class="title_text"
              >Les programmes de l'offre ({{ offreVoyage.designation }})</span
            >
            <v-spacer></v-spacer>
            <!--BOITE DE DIALOGUE MODIFICATION DE PROGRAMME -->
            <v-dialog v-model="dialogEditProg" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="offreVoyage.isActif !== true"
                  small
                  icon
                  color="secondary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon size="35">mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitleProgramme }}</span>
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
                          v-model="editedProgramme.designation"
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <label for="exampleInputEmail1" class="form-label"
                          >Date de départ:</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          v-model="editedProgramme.dateDepart"
                        />
                      </div>

                      <div class="col-lg-6">
                        <label for="exampleInputEmail1" class="form-label"
                          >Date d'arrivée:</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          v-model="editedProgramme.dateArrivee"
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
                          v-model="editedProgramme.heureDepart"
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
                          v-model="editedProgramme.heureArrivee"
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
                          v-model="editedProgramme.numeroBus"
                        >
                          <option v-for="(bus, b) in availableBusList" :key="b">
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
                    @click="closeDialogProgramme()"
                  >
                    Annuler
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="saveOrUpdateProgramme()"
                  >
                    {{ editedProgrammeIndex === -1 ? "Ajouter" : "Modifier" }}
                  </v-btn>
                </v-card-actions>
              </v-card> </v-dialog
            >&nbsp;&nbsp;
            <!-- FIN DE BOITE DE DIALOGUE -->
            <v-btn x-small icon @click="showProgrammeList = false"
              ><v-icon color="secondary" size="35">mdi-minus</v-icon></v-btn
            >
          </v-card-title>
          <v-card-text>
            <div class="container">
              <div class="row">
                <div
                  class="col-lg-4"
                  v-for="(prog, pr) in programmeList"
                  :key="pr"
                >
                  <v-card>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle class="font-weight-bold"
                            >{{ prog.designation }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-menu
                            bottom
                            right
                            v-if="offreVoyage.isActif !== true"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on"
                                ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                              >
                            </template>

                            <v-list>
                              <v-list-item link @click="editerProgramme(prog)">
                                <v-list-item-action
                                  ><v-icon color="primary"
                                    >mdi-pencil</v-icon
                                  ></v-list-item-action
                                >
                                <v-list-item-subtitle
                                  >Editer</v-list-item-subtitle
                                >
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-list-item-action>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >Jour de départ :</v-list-item-subtitle
                          >
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-subtitle class="font-weight-bold">{{
                            prog.dateDepart
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >Heure de départ:</v-list-item-subtitle
                          >
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-subtitle class="font-weight-bold">{{
                            prog.heureDepart
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle>Bus :</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-subtitle class="font-weight-bold">{{
                            prog.numeroBus
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!--LISTE DES VILLES ESCALES-->
      <div class="row" v-show="showVilleEscaleList == true">
        <v-card>
          <v-card-title>
            <span class="title_text"
              >Les escales de l'offre ({{ offreVoyage.designation }})</span
            >
            <v-spacer></v-spacer>
            <!--BOITE DE DIALOGUE MODIFICATION DE PROGRAMME -->
            <v-dialog v-model="dialogEscale" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="offreVoyage.isActif !== true"
                  small
                  icon
                  color="secondary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon size="35">mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitleEscale }}</span>
                </v-card-title>
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
                          v-model="editedEscale.position"
                        />
                      </div>
                      <div class="col-lg-6">
                        <label for="exampleInputEmail1" class="form-label"
                          >Ville</label
                        >
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="editedEscale.villeDesignation"
                        >
                          <option v-for="(ville, v) in villesList" :key="v">
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
                    @click="closeDialogEscale()"
                  >
                    Annuler
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="saveOrUpdateEscale()"
                  >
                    {{ editedEscaleIndex === -1 ? "Ajouter" : "Modifier" }}
                  </v-btn>
                </v-card-actions>
              </v-card> </v-dialog
            >&nbsp;&nbsp;&nbsp;
            <!-- FIN DE BOITE DE DIALOGUE -->
            <v-btn x-small icon @click="showVilleEscaleList = false"
              ><v-icon color="secondary" size="35">mdi-minus</v-icon></v-btn
            >
          </v-card-title>
          <v-card-text>
            <div class="container">
              <div class="row">
                <v-data-table
                  :headers="headers"
                  :items="villeEscaleList"
                  :search="search"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                      x-small
                      @click="editerVilleEscale(item)"
                      color="secondary"
                      >Modifier</v-btn
                    >
                  </template>
                </v-data-table>
              </div>
            </div>
          </v-card-text>
        </v-card>
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
import {
  API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE,
  API_RECUPERER_PROGRAMME_PAR_OFFRE_VOYAGE,
  API_RECUPERER_LISTE_BUS_PAR_COMPAGNIE,
  API_CREER_PROGRAMME_OFFRE_VOYAGE,
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  HEADERS,
  API_RATTACHER_PRIX_OFFRE_VOYAGE,
  API_RECUPERER_VILLE_ESCALE_PAR_OFFRE_VOYAGE,
  API_CREER_VILLES_ESCALES_OFFRE_VOYAGE,
  API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE,
} from "@/components/globalConfig/globalConstConfig";
import $ from "jquery";
export default {
  name: "ModifierOffreVoyage",
  data() {
    return {
      //VARIABLE COMMUNES
      showTarifList: false,
      showProgrammeList: false,
      showVilleEscaleList: false,
      overlay: false,
      successMsg: null,
      errorMsg: null,

      // VARIABLES EN RAPPORT AVEC LES OFFRES DE VOYAGES

      offreVoyageObject: {
        data: {
          designation: null,
        },
      },

      offreVoyage: {
        id: null,
        designation: null,
        description: null,
        compagnieTransportRaisonSociale: null,
        typeOffreVoyageDesignation: null,
        isActif: null,
        villeDepartDesignation: null,
        villeDestinationDesignation: null,
      },

      // VARIABLES EN RAPPORT AVEC LES PRIX D'OFFRE DE VOYAGE

      dialogForPrice: false,

      tarificationList: [],

      editedTarifIndex: -1,

      editedTarif: {
        designation: null,
        prix: null,
        modeDesignation: null,
        categorieVoyageurDesignation: null,
        offreVoyageDesignation: null,
      },

      defaultTarif: {
        designation: null,
        prix: null,
        modeDesignation: null,
        categorieVoyageurDesignation: null,
        offreVoyageDesignation: null,
      },

      priceObject: {
        datas: [],
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

      // VARIABLES EN RAPPORT AVEC LES PROGRAMMES

      dialogEditProg: false,

      programmeList: [],

      editedProgrammeIndex: -1,

      editedProgramme: {
        offreVoyageDesignation: null,
        designation: null,
        numeroBus: null,
        dateDepart: null,
        dateArrivee: null,
        heureDepart: null,
        heureArrivee: null,
      },

      defaultProgramme: {
        offreVoyageDesignation: null,
        designation: null,
        numeroBus: null,
        dateDepart: null,
        dateArrivee: null,
        heureDepart: null,
        heureArrivee: null,
      },

      programmeObject: {
        datas: [],
      },

      // VARIABLES EN RAPPORT AVEC LES BUS
      availableBusList: [],

      busObject: {
        data: {
          raisonSociale: null,
        },
      },

      // VARIABLES EN RAPPORT AVEC LES VILLES ESCALES

      dialogEscale: false,

      villeEscaleList: [],

      villesList: [],

      villeValue: {},

      editedEscaleIndex: -1,

      editedEscale: {
        offreVoyageDesignation: null,
        villeDesignation: null,
        position: null,
      },

      defaultEscale: {
        offreVoyageDesignation: null,
        villeDesignation: null,
        position: null,
      },

      search: "",
      headers: [
        { text: "ORDRE", value: "position" },
        { text: "VILLE", value: "villeDesignation" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],

      escaleObject: {
        data: {
          designation: null,
        },
      },

      villeEscaleObject: {
        datas: [],
      },
    };
  },

  methods: {
    // RECUPERER LA LISTE DES VILLES ENREGISTRÉES
    async getAllCities() {
      this.loading = false;
      await axios
        .post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.villeValue, {
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

    // OBTENIR LA LISTE DES VILLES ESCALES PAR OFFRE DE VOYAGE
    async obtenirVilleEscaleParOffreVoyage() {
      this.escaleObject.data.designation = this.offreVoyage.designation;
      await axios
        .post(API_RECUPERER_VILLE_ESCALE_PAR_OFFRE_VOYAGE, this.escaleObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.data.status.code == 800) {
            this.villeEscaleList = response.data.items;
          } else {
            this.villeEscaleList = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        })
        .finally(() => {});
    },

    // CREER OU MODIFIER UN PRIX
    saveOrUpdatePrice() {
      if (this.editedTarifIndex > -1) {
        this.modifierTarifOffreVoyage();
      } else {
        this.creerTarifOffreVoyage();
      }
    },

    // CREER OU MODIFIER UN PRIX
    saveOrUpdateProgramme() {
      if (this.editedProgrammeIndex > -1) {
        this.modifierProgrammeOffreVoyage();
      } else {
        this.creerProgrammeOffreVoyage();
      }
    },

    // CREER OU MODIFIER UNE VILLES ESCALE
    saveOrUpdateEscale() {
      if (this.editedEscaleIndex > -1) {
        this.modifierVilleEscale();
      } else {
        this.creerVilleEscale();
      }
    },

    // FERMER LA BOITE DE DIALOGUE DES PRIX
    closeDialogPrice() {
      this.dialogForPrice = false;
      this.$nextTick(() => {
        this.editedTarif = Object.assign({}, this.defaultTarif);
        this.editedTarifIndex = -1;
      });
    },

    // FERMER LA BOITE DE DIALOGUE DES PROGRAMMES
    closeDialogProgramme() {
      this.dialogEditProg = false;
      this.$nextTick(() => {
        this.editedProgramme = Object.assign({}, this.defaultProgramme);
        this.editedProgrammeIndex = -1;
      });
    },

    // FERMER LA BOITE DE DIALOGUE DES VILLES ESCALES
    closeDialogEscale() {
      this.dialogEscale = false;
      this.$nextTick(() => {
        this.editedEscale = Object.assign({}, this.defaultEscale);
        this.editedEscaleIndex = -1;
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

    // RATTACHER UNE NOUVELLE VILLE ESCALE
    async creerVilleEscale() {
      this.overlay = true;
      this.editedEscale.offreVoyageDesignation = this.offreVoyage.designation;

      this.villeEscaleObject.datas.push(this.editedEscale);
      await axios
        .post(API_CREER_VILLES_ESCALES_OFFRE_VOYAGE, this.villeEscaleObject, {
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
              this.obtenirVilleEscaleParOffreVoyage();
              this.villeEscaleObject.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.villeEscaleObject.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg =
              "Erreur , lors de la création de l'offre de voyage";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.villeEscaleObject.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.villeEscaleObject.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.villeEscaleObject.datas = [];
        })
        .finally(() => {
          this.overlay = false;
          this.dialogEscale = false;
        });
    },

    // MODIFIER UNE VILLE ESCALE
    async modifierVilleEscale() {
      this.overlay = true;
      this.editedEscale.offreVoyageDesignation = this.offreVoyage.designation;

      this.villeEscaleObject.datas.push(this.editedEscale);
      await axios
        .put(API_CREER_VILLES_ESCALES_OFFRE_VOYAGE, this.villeEscaleObject, {
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
              Object.assign(
                this.villeEscaleList[this.editedEscaleIndex],
                this.editedEscale
              );
              this.villeEscaleObject.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.villeEscaleObject.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg =
              "Erreur , lors de la création de l'offre de voyage";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.villeEscaleObject.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.villeEscaleObject.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.villeEscaleObject.datas = [];
        })
        .finally(() => {
          this.overlay = false;
          this.dialogEscale = false;
        });
    },

    // CREER UN NOUVEAU TARIF
    async creerTarifOffreVoyage() {
      this.overlay = true;
      this.editedTarif.offreVoyageDesignation = this.offreVoyage.designation;

      this.priceObject.datas.push(this.editedTarif);
      await axios
        .post(API_RATTACHER_PRIX_OFFRE_VOYAGE, this.priceObject, {
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
              this.getAllPriceByTravelOffers();
              this.priceObject.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.priceObject.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg =
              "Erreur , lors de la création de l'offre de voyage";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.priceObject.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.priceObject.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.priceObject.datas = [];
        })
        .finally(() => {
          this.overlay = false;
          this.dialogForPrice = false;
        });
    },

    // MODIFIER UN TARIF
    async modifierTarifOffreVoyage() {
      this.overlay = true;
      this.editedTarif.offreVoyageDesignation = this.offreVoyage.designation;

      this.priceObject.datas.push(this.editedTarif);
      await axios
        .put(API_RATTACHER_PRIX_OFFRE_VOYAGE, this.priceObject, {
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
              Object.assign(
                this.tarificationList[this.editedTarifIndex],
                this.editedTarif
              );
              this.priceObject.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.priceObject.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg =
              "Erreur , lors de la création de l'offre de voyage";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.priceObject.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.priceObject.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.priceObject.datas = [];
        })
        .finally(() => {
          this.overlay = false;
          this.dialogForPrice = false;
        });
    },

    // MODIFIER UN PROGRAMME
    async modifierProgrammeOffreVoyage() {
      this.overlay = true;
      this.editedProgramme.offreVoyageDesignation =
        this.offreVoyage.designation;
      this.editedProgramme.numeroBus = this.returnBusNumber(
        this.editedProgramme.numeroBus
      );
      this.programmeObject.datas.push(this.editedProgramme);
      await axios
        .put(API_CREER_PROGRAMME_OFFRE_VOYAGE, this.programmeObject, {
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
              Object.assign(
                this.programmeList[this.editedProgrammeIndex],
                this.editedProgramme
              );
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
          this.dialogEditProg = false;
        });
    },

    // CREER UN PROGRAMME
    async creerProgrammeOffreVoyage() {
      this.overlay = true;
      this.editedProgramme.offreVoyageDesignation =
        this.offreVoyage.designation;
      this.editedProgramme.numeroBus = this.returnBusNumber(
        this.editedProgramme.numeroBus
      );
      this.programmeObject.datas.push(this.editedProgramme);
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
              this.getPlanningByOffersTravel();
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
          this.dialogEditProg = false;
        });
    },

    // EDITER UN PROGRAMME
    editerTarification(item) {
      this.editedTarifIndex = this.tarificationList.indexOf(item);
      this.editedTarif = Object.assign({}, item);
      this.dialogForPrice = true;
    },

    // EDITER UN PROGRAMME
    editerProgramme(item) {
      this.editedProgrammeIndex = this.programmeList.indexOf(item);
      this.editedProgramme = Object.assign({}, item);
      this.dialogEditProg = true;
    },

    // EDITER UNE VILLE ESCALE
    editerVilleEscale(item) {
      this.editedEscaleIndex = this.villeEscaleList.indexOf(item);
      this.editedEscale = Object.assign({}, item);
      this.dialogEscale = true;
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

    //OBTENIR LA LISTE DES TARIFICATIONS PAR OFFRE DE VOYAGE
    async getAllPriceByTravelOffers() {
      this.offreVoyageObject.data.designation = this.offreVoyage.designation;
      await axios
        .post(API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE, this.offreVoyageObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.data.status.code == 800) {
            this.tarificationList = response.data.items;
          } else {
            this.tarificationList = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          this.tarificationList = [];
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    // RETOURNER LE NUMERO DU BUS
    returnBusNumber(designationBus) {
      var numeroBus;
      this.availableBusList.forEach((element) => {
        if (element.designation == designationBus) {
          numeroBus = element.numero;
        }
      });
      return numeroBus;
    },

    // RETOURNER LA DESIGNATION DU BUS
    returnBusDesignation(numeroBus) {
      var designationBus;
      this.availableBusList.forEach((element) => {
        if (element.numero == numeroBus) {
          designationBus = element.designation;
        }
      });
      return designationBus;
    },

    //OBTENIR LA LISTE DES PROGRAMMES PAR OFFRE DE VOYAGE
    async getPlanningByOffersTravel() {
      this.offreVoyageObject.data.designation = this.offreVoyage.designation;
      await axios
        .post(
          API_RECUPERER_PROGRAMME_PAR_OFFRE_VOYAGE,
          this.offreVoyageObject,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          if (response.data.status.code == 800) {
            this.programmeList = response.data.items;
          } else {
            this.programmeList = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          this.programmeList = [];
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    // STOCKAGE DES INFORMATIONS DE L'OFFRE DE VOYAGE SELECTIONNÉ POUR L'EDITION FUTURE
    async editerOffreVoyage() {
      if (localStorage.getItem("offreVoyage")) {
        try {
          const offreVoyageEditing = JSON.parse(
            localStorage.getItem("offreVoyage")
          );
          console.log(localStorage.getItem("offreVoyage"));
          this.offreVoyage.id = offreVoyageEditing.id;
          this.offreVoyage.designation = offreVoyageEditing.designation;
          this.offreVoyage.description = offreVoyageEditing.description;
          this.offreVoyage.typeOffreVoyageDesignation =
            offreVoyageEditing.typeOffreVoyageDesignation;
          this.offreVoyage.isActif = offreVoyageEditing.isActif;
          this.offreVoyage.villeDepartDesignation =
            offreVoyageEditing.villeDepartDesignation;
          this.offreVoyage.villeDestinationDesignation =
            offreVoyageEditing.villeDestinationDesignation;
          await this.getAllPriceByTravelOffers();
          await this.getPlanningByOffersTravel();
          await this.obtenirVilleEscaleParOffreVoyage();
          localStorage.removeItem("offreVoyage");
        } catch (error) {
          localStorage.removeItem("offreVoyage");
        }
      } else {
        this.$router.replace({ path: "/selectionnerOffreVoyage" });
      }
    },
  },

  computed: {
    formTitlePrice() {
      return this.editedTarifIndex === -1
        ? "Nouveau Tarif"
        : "Modifier le tarif";
    },

    formTitleProgramme() {
      return this.editedProgrammeIndex === -1
        ? "Nouveau Programme"
        : "Modifier le programme";
    },

    formTitleEscale() {
      return this.editedEscaleIndex === -1
        ? "Rattacher une ville escale"
        : "Modifier la ville escale";
    },
  },

  watch: {
    dialogForPrice(val) {
      val || this.closeDialogPrice();
    },
  },

  mounted() {
    this.editerOffreVoyage();
    this.getAllAvailableBus();
    this.obtenirReferenceModeOffreVoyage();
    this.obtenirReferenceModeCategorieVoyageur();
    this.obtenirVilleEscaleParOffreVoyage();
    this.getAllCities();
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
.title_text {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 20px;
}

.total {
  align-content: center;
  font-weight: 700;
  font-size: 30px;
  font-family: "Montserrat";
}
</style>
