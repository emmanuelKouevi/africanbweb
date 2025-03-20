<template>
  <v-app>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <span class="strategie_title"
            >EDITER VOTRE STRATEGIE DE GESTION DE BAGAGES</span
          ><br /><br />
          <v-card
            v-if="
              typeStrategieBagage.typeStrategieBagageDesignation ==
              'typeStrategieBagagePoids'
            "
          >
            <v-card-title
              ><span class="title_card">Information(s) Générale(s)</span>
              <v-spacer></v-spacer>
              <!--BOITE DE DIALOGUE POUR LES PRIX -->
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text small v-bind="attrs" v-on="on"
                    ><v-icon size="15">mdi-pencil</v-icon> Editer</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="title_card">Editer la strategie</span>
                  </v-card-title>
                  <v-card-text
                    v-if="
                      typeStrategieBagage.strategieBagagePoidsDTO !== undefined
                    "
                  >
                    <form>
                      <div class="row justify-space-around">
                        <div class="col-lg-5">
                          <label for="inputPrice" class="form-label"
                            >Prix du kilo (kg)*</label
                          >
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              aria-describedby="basic-addon1"
                              v-model="prixKilo"
                            />
                            <span class="input-group-text" id="basic-addon1"
                              >FCFA</span
                            >
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <label for="exampleInputPassword1" class="form-label"
                            >Kilo gratuit*</label
                          >
                          <input
                            type="number"
                            min="0"
                            id=""
                            class="form-control col-lg-8"
                            v-model="nombreKiloNonTaxable"
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
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="updateStrategieParPoids"
                    >
                      Modifier
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- FIN DE BOITE DE DIALOGUE -->
            </v-card-title>

            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Type de la strategie</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      typeStrategieBagage.typeStrategieBagageDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Prix du kilo</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold"
                      >{{
                        typeStrategieBagage.strategieBagagePoidsDTO !==
                        undefined
                          ? typeStrategieBagage.strategieBagagePoidsDTO.prixKilo
                          : ""
                      }}
                      FCFA</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Total kilo non Taxable</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold"
                      >{{
                        typeStrategieBagage.strategieBagagePoidsDTO !==
                        undefined
                          ? typeStrategieBagage.strategieBagagePoidsDTO
                              .nombreKiloNonTaxable
                          : ""
                      }}
                      Kg</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-alert
              class="myalert alert-error"
              type="error"
              width="350px"
              dismissible
              >{{ errorMsg }}</v-alert
            >
          </v-card>

          <StrategieBagageParType
            v-if="typeStrategieBagage.strategieBagageTypeDTO !== undefined"
            :type-strategie-bagage="typeStrategieBagage"
            :items="
              typeStrategieBagage.strategieBagageTypeDTO.prixBagageParTypeDTOS
            "
          ></StrategieBagageParType>
        </div>
      </div>
    </div>

    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-app>
</template>

<script>
import {
  API_CREATE_STRATEGIE_BAGAGE,
  API_GET_STRATEGIE_PAR_COMPAGNIE,
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import axios from "axios";
import $ from "jquery";
import StrategieBagageParType from "./widgets/StrategieBagageParType.vue";
export default {
  name: "SelectionnerStrategieBagageParCompagnie",
  components: {
    StrategieBagageParType,
  },
  data() {
    return {
      dialog: false,
      dialogForType: false,
      overlay: false,
      referenceBagageTypeList: [],

      prixKilo: null,
      nombreKiloNonTaxable: null,
      referenceBagage: {
        referenceFamilleDesignation: "referenceFamilleBagage",
      },

      errorMsg: null,
      successMsg: null,
      warningMsg: null,

      typeStrategieBagage: {},

      strategieObject: {
        data: {},
      },

      objectToSendReferenceBagage: {
        datas: [],
      },

      editedTypeBagageIndex: -1,

      editedTypeBagage: {
        id: null,
        designation: null,
        prix: null,
        quantiteNonTaxable: null,
        typeBagageDesignation: null,
      },

      defaultTypeBagage: {
        id: null,
        designation: null,
        prix: null,
        quantiteNonTaxable: null,
        typeBagageDesignation: null,
      },
    };
  },

  methods: {
    // EDITER UN TYPE BAGAGE
    editerTypeBagage(type, listTypeBagage) {
      this.editedTypeBagageIndex = listTypeBagage.indexOf(type);
      this.editedTypeBagage = Object.assign({}, type);
      this.dialogForType = true;
    },

    // MODIFIER STRATEGIE PAR POIDS
    async updateStrategieParPoids() {
      this.overlay = true;
      this.typeStrategieBagage.strategieBagagePoidsDTO.prixKilo = this.prixKilo;
      this.typeStrategieBagage.strategieBagagePoidsDTO.nombreKiloNonTaxable =
        this.nombreKiloNonTaxable;

      this.strategieObject.data = this.typeStrategieBagage;

      console.log(this.strategieObject);

      await axios
        .put(API_CREATE_STRATEGIE_BAGAGE, this.strategieObject, {
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

    // RÉCUPERER LA LISTE DES STRATEGIES DÉFINIS PAR COMPAGNIE
    async getStrategieBagageList() {
      this.loading = true;
      await axios
        .post(API_GET_STRATEGIE_PAR_COMPAGNIE, this.strategieObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              if (
                this.typeStrategieBagage.typeStrategieBagageDesignation ==
                "typeStrategieBagagePoids"
              ) {
                this.prixKilo =
                  response.data.item.strategieBagagePoidsDTO.prixKilo;
                this.nombreKiloNonTaxable =
                  response.data.item.strategieBagagePoidsDTO.nombreKiloNonTaxable;
                this.typeStrategieBagage = response.data.item;
              } else {
                this.typeStrategieBagage = response.data.item;
              }
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
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  mounted() {
    this.getStrategieBagageList();
    this.obtenirReferenceTypeBagage();
  },
};
</script>

<style scoped>
.strategie_title {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 3px;
  word-spacing: 2px;
}

.title_card {
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 3px;
  word-spacing: 2px;
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
