<template>
  <v-app>
    <div class="container">
      <h5>
        <v-icon size="30">mdi-menu-right</v-icon>
        <span class="title"
          >DÉFINISSEZ VOTRE STRATEGIE POUR UNE MEILLEURE GESTION DES
          BAGAGES</span
        >
      </h5>
      <br />
      <v-card elevation="3">
        <v-card-title
          ><h6 class="font-weight-bold">
            Sélectionner une stratégie
          </h6></v-card-title
        >
        <v-card-text>
          <div class="container">
            <div class="row justify-space-between">
              <div
                class="col-lg-5"
                v-for="(strategie, str) in referenceBagageStrategyList"
                :key="str"
              >
                <v-card>
                  <v-card-subtitle
                    ><span class="font-weight-bold"
                      >stratégie {{ str + 1 }}</span
                    >
                    <v-spacer></v-spacer>
                    <br />
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        :name="strategie"
                        :value="strategie.designation"
                        v-model="strategieSelected"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        {{ strategie.designation }}
                      </label>
                    </div>
                  </v-card-subtitle>
                </v-card>
              </div>
            </div>
          </div>
        </v-card-text> </v-card
      ><br />

      <v-card
        elevation="3"
        :hidden="
          strategieSelected == null ||
          strategieSelected === 'Strategie bagage Par Type'
        "
      >
        <v-card-title>{{ strategieSelected }}</v-card-title>
        <v-card-text>
          <div class="row justify-space-around">
            <div class="col-lg-3">
              <label for="inputPrice" class="form-label"
                >Prix du kilo (kg)*</label
              >
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="basic-addon1"
                  v-model.number="
                    $v.strategieBagagePoidsModel.data.strategieBagagePoidsDTO
                      .prixKilo.$model
                  "
                />
                <span class="input-group-text" id="basic-addon1">FCFA</span>
              </div>
            </div>
            <div class="col-lg-3">
              <label for="exampleInputPassword1" class="form-label"
                >Kilo gratuit*</label
              >
              <input
                type="number"
                min="0"
                id=""
                class="form-control col-lg-8"
                v-model.number="
                  $v.strategieBagagePoidsModel.data.strategieBagagePoidsDTO
                    .nombreKiloNonTaxable.$model
                "
              />
            </div>
          </div>
          <br />
          <div class="float-right">
            <v-btn btn color="secondary" outlined>REINITIALISER</v-btn
            >&nbsp;&nbsp;
            <v-btn color="success" @click="submitStrategieBagage" btn outlined
              >ENREGISTRER</v-btn
            >
          </div>
          <br /><br />
        </v-card-text> </v-card
      ><br />

      <v-card
        elevation="3"
        :hidden="
          strategieSelected == null ||
          strategieSelected === 'Strategie bagage Par Poids'
        "
      >
        <v-card-title
          >{{ strategieSelected }}
          <v-spacer></v-spacer>
          <!--BOITE DE DIALOGUE POUR LES PRIX -->
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn small color="secondary" v-bind="attrs" v-on="on">
                type de bagage
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Définir vos types de bagages</span>
              </v-card-title>
              <v-card-text>
                <form>
                  <div class="row">
                    <div class="col-lg-5">
                      <label for="exampleInputEmail1" class="form-label"
                        >Sélectionner un type de bagage</label
                      >
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        v-model.trim="
                          $v.bagageTypeModel.typeBagageDesignation.$model
                        "
                      >
                        <option
                          v-for="(bagageType, bag) in referenceBagageTypeList"
                          :key="bag"
                        >
                          {{ bagageType.designation }}
                        </option>
                      </select>
                    </div>

                    <div class="col-lg-5">
                      <label for="exampleInputEmail1" class="form-label"
                        >Prix</label
                      >
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="basic-addon1"
                          v-model.number="$v.bagageTypeModel.prix.$model"
                        />
                        <span class="input-group-text" id="basic-addon1"
                          >FCFA</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-5">
                      <label for="exampleInputEmail1" class="form-label"
                        >Référence</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        v-model.trim="$v.bagageTypeModel.designation.$model"
                      />
                    </div>

                    <div class="col-lg-4">
                      <label for="exampleInputEmail1" class="form-label"
                        >Quantité non taxable:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        v-model.trim="
                          $v.bagageTypeModel.quantiteNonTaxable.$model
                        "
                      />
                    </div>
                  </div>
                </form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Annuler
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveTypeBagageInList">
                  Enregistrer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- FIN DE BOITE DE DIALOGUE -->
        </v-card-title>
        <v-card-text>
          <v-card width="900px">
            <v-card-title class="title-card"
              >Type de bagages sélectionnés
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
              :items="
                strategieBagageTypeModel.data.strategieBagageTypeDTO
                  .prixBagageParTypeDTOS
              "
              :search="search"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  x-small
                  @click="deleteItemInBagageList(item)"
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
          <div class="float-right">
            <v-btn btn color="secondary" outlined>REINITIALISER</v-btn
            >&nbsp;&nbsp;
            <v-btn color="success" @click="submitStrategieBagage" btn outlined
              >ENREGISTRER</v-btn
            >
          </div>
          <br /><br />
        </v-card-text>
      </v-card>
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
import $ from "jquery";
import { required } from "vuelidate/lib/validators";
import {
  API_CREATE_STRATEGIE_BAGAGE,
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
export default {
  name: "CreerStrategieBagage",
  data() {
    return {
      // COMMON VARIABLES
      errorMsg: null,
      successMsg: null,
      warningMsg: null,
      overlay: false,
      dialog: false,
      editedIndex: -1,

      search: "",
      headers: [
        { text: "RÉFÉRENCE", value: "designation" },
        { text: "PRIX", value: "prix" },
        { text: "TYPE DE BAGAGE", value: "typeBagageDesignation" },
        { text: "QUANTITE NON TAXABLE", value: "quantiteNonTaxable" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],

      // VARIABLE BAGAGES
      referenceBagage: {
        referenceFamilleDesignation: "referenceFamilleBagage",
      },

      objectToSendReferenceBagage: {
        datas: [],
      },

      referenceStrategieBagage: {
        referenceFamilleDesignation: "referenceFamilleTypeStrategie",
      },

      objectToSendReferenceStrategieBagage: {
        datas: [],
      },

      referenceBagageTypeList: [],

      referenceBagageStrategyList: [],

      strategieSelected: null,

      objectToSendStrategieBagageParPoids: {
        datas: [],
      },

      strategieBagagePoidsModel: {
        data: {
          designation: null,
          typeStrategieBagageDesignation: null,
          strategieBagagePoidsDTO: {
            designation: null,
            prixKilo: null,
            nombreKiloNonTaxable: null,
          },
        },
      },

      strategieBagageTypeModel: {
        data: {
          designation: null,
          typeStrategieBagageDesignation: null,
          strategieBagageTypeDTO: {
            designation: null,
            prixBagageParTypeDTOS: [],
          },
        },
      },

      bagageTypeModel: {
        designation: null,
        prix: null,
        quantiteNonTaxable: null,
        typeBagageDesignation: null,
      },
    };
  },

  validations: {
    // VALIDATION POUR LA PLANIFICATION D'UNE OFFRE DE VOYAGE
    strategieBagagePoidsModel: {
      data: {
        strategieBagagePoidsDTO: {
          prixKilo: {
            required,
          },

          nombreKiloNonTaxable: {
            required,
          },
        },
      },
    },

    bagageTypeModel: {
      designation: {
        required,
      },

      prix: {
        required,
      },

      quantiteNonTaxable: {
        required,
      },

      typeBagageDesignation: {
        required,
      },
    },
  },

  methods: {
    // SUPPRIMER DES PROGRAMMES
    deleteItemInBagageList(item) {
      this.editedIndex =
        this.strategieBagageTypeModel.data.strategieBagageTypeDTO.prixBagageParTypeDTOS.indexOf(
          item
        );
      this.strategieBagageTypeModel.data.strategieBagageTypeDTO.prixBagageParTypeDTOS.splice(
        this.editedIndex,
        1
      );
    },

    saveTypeBagageInList() {
      this.$v.$touch();
      if (this.$v.bagageTypeModel.$invalid) {
        this.errorMsg = "Vous n'avez saisi les champs concernés";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        var bagageType = {
          designation: null,
          prix: null,
          quantiteNonTaxable: null,
          typeBagageDesignation: null,
        };

        bagageType.designation = this.bagageTypeModel.designation;
        bagageType.prix = this.bagageTypeModel.prix;
        bagageType.quantiteNonTaxable = this.bagageTypeModel.quantiteNonTaxable;
        bagageType.typeBagageDesignation =
          this.bagageTypeModel.typeBagageDesignation;

        this.strategieBagageTypeModel.data.strategieBagageTypeDTO.prixBagageParTypeDTOS.push(
          bagageType
        );
      }
    },

    // ENVOYER LA STRATEGIE SÉLECTIONNÉE
    submitStrategieBagage() {
      if (this.strategieSelected == "Strategie bagage Par Poids") {
        this.$v.$touch();
        if (this.$v.strategieBagagePoidsModel.$invalid) {
          this.errorMsg = "Vous n'avez saisi les champs concernés";
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        } else this.creerStrategieParPoids();
      } else {
        if (
          this.strategieBagageTypeModel.data.strategieBagageTypeDTO
            .prixBagageParTypeDTOS.length == 0
        ) {
          this.errorMsg = "Vous n'avez défini aucun type de bagage";
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        } else this.creerStrategieParType();
      }
    },

    // CREER STRATEGIE PAR TYPE
    async creerStrategieParType() {
      this.overlay = true;
      this.strategieBagageTypeModel.data.designation = this.strategieSelected;
      this.strategieBagageTypeModel.data.typeStrategieBagageDesignation =
        this.strategieSelected;
      this.strategieBagageTypeModel.data.strategieBagageTypeDTO.designation =
        this.strategieSelected;

      await axios
        .post(API_CREATE_STRATEGIE_BAGAGE, this.strategieBagageTypeModel, {
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
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
            }
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    // CREER STRATEGIE PAR POIDS
    async creerStrategieParPoids() {
      this.overlay = true;
      this.strategieBagagePoidsModel.data.designation = this.strategieSelected;
      this.strategieBagagePoidsModel.data.typeStrategieBagageDesignation =
        this.strategieSelected;
      this.strategieBagagePoidsModel.data.strategieBagagePoidsDTO.designation =
        this.strategieSelected;

      await axios
        .post(API_CREATE_STRATEGIE_BAGAGE, this.strategieBagagePoidsModel, {
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
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
            }
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    //OBTENIR LA LISTE DES REFERENCES BAGAGES DISPONIBLE
    async obtenirReferenceTypeBagage() {
      this.objectToSendReferenceBagage.datas.push(this.referenceBagage);
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.objectToSendReferenceBagage,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          this.referenceBagageTypeList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    //OBTENIR LA LISTE DES REFERENCES DES STRATEGIES DE GESTION DE BAGAGES DISPONIBLES
    async obtenirReferenceStrategyBagage() {
      this.objectToSendReferenceStrategieBagage.datas.push(
        this.referenceStrategieBagage
      );
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.objectToSendReferenceStrategieBagage,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          this.referenceBagageStrategyList = response.data.items;
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

  mounted() {
    this.obtenirReferenceStrategyBagage();
    this.obtenirReferenceTypeBagage();
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
