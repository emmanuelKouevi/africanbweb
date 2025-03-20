<template>
  <v-app>
    <div v-if="typeStrategieBagage !== undefined">
      <br />
      <v-card>
        <v-card-text>
          <span class="title_card">Information(s) Générale(s)</span>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle class="font-weight-bold"
                  >Votre stratégie:</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-subtitle class="font-weight-thin text-h6"
                  >Stratégie de gestion de bagages par type
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text> </v-card
      ><br />

      <v-card>
        <v-card-title>
          <span class="title_card">Liste des types de bagages:</span>
          <v-spacer></v-spacer>
          <v-btn btn color="secondary" small>Ajouter un type</v-btn>
        </v-card-title>
        <v-card-text
          v-if="typeStrategieBagage.strategieBagageTypeDTO !== undefined"
        >
          <v-data-table :headers="headers" :items="items">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                x-small
                color="primary"
                @click="
                  modifierTypeBagage(
                    item,
                    typeStrategieBagage.strategieBagageTypeDTO
                      .prixBagageParTypeDTOS
                  )
                "
              >
                <v-icon x-small color="white" class="mr-2">mdi-pencil</v-icon>
                Éditer
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>

    <!--BOITE DE DIALOGUE POUR LES PRIX -->
    <v-dialog v-model="dialogForType" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="title_card">Editer la strategie</span>
        </v-card-title>
        <v-card-text
          v-if="typeStrategieBagage.strategieBagageTypeDTO !== undefined"
        >
          <form>
            <div class="row">
              <div class="col-lg-5">
                <label for="exampleInputEmail1" class="form-label"
                  >Sélectionner un type de bagage</label
                >
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="editedTypeBagage.typeBagageDesignation"
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
                <label for="exampleInputEmail1" class="form-label">Prix</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="basic-addon1"
                    v-model="editedTypeBagage.prix"
                  />
                  <span class="input-group-text" id="basic-addon1">FCFA</span>
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
                  v-model="editedTypeBagage.designation"
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
                  v-model="editedTypeBagage.quantiteNonTaxable"
                />
              </div>
            </div>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogForType = false">
            Annuler
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="updateStrategieParType(editedTypeBagage)"
          >
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- FIN DE BOITE DE DIALOGUE -->

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
  </v-app>
</template>

<script>
import {
  API_GET_PRIX_BAGAGE_TYPE,
  //API_CREATE_STRATEGIE_BAGAGE,
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  API_PRIX_BAGAGE_TYPE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import $ from "jquery";
import axios from "axios";
export default {
  name: "StrategieBagageParType",
  props: ["items", "typeStrategieBagage"],
  data() {
    return {
      strategieObject: {
        data: {},
      },

      dialogForType: false,
      successMsg: null,
      errorMsg: null,
      warningMsg: null,

      editedTypeBagageIndex: -1,

      referenceBagageTypeList: [],

      referenceBagage: {
        referenceFamilleDesignation: "referenceFamilleBagage",
      },

      objectToSendReferenceBagage: {
        datas: [],
      },

      dataObjectToUpdate: {
        datas: [],
      },

      updatePriceObject: {
        data: {
          strategieBagageTypeDesignation: "typeStrategieBagageType",
        },
      },

      updatePriceList: [],

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

      headers: [
        { text: "Bagage n°", value: "id" },
        { text: "Designation", value: "typeBagageDesignation" },
        { text: "Type de bagage", value: "typeBagageDesignation" },
        { text: "Prix (FCFA)", value: "prix" },
        { text: "Qte non taxable", value: "quantiteNonTaxable" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  methods: {
    async updatePrixBagage() {
      await axios
        .post(API_GET_PRIX_BAGAGE_TYPE, this.updatePriceObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.typeStrategieBagage.strategieBagageTypeDTO.prixBagageParTypeDTOS =
                response.data.items;
            } else {
              this.updatePriceList =
                this.typeStrategieBagage.strategieBagageTypeDTO.prixBagageParTypeDTOS;
            }
          } else {
            this.updatePriceList =
              this.typeStrategieBagage.strategieBagageTypeDTO.prixBagageParTypeDTOS;
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
          this.updatePriceList =
            this.typeStrategieBagage.strategieBagageTypeDTO.prixBagageParTypeDTOS;
        });
    },

    // MODIFIER STRATEGIE PAR TYPE
    async updateStrategieParType(typeBagage) {
      console.log(
        this.typeStrategieBagage.strategieBagageTypeDTO.prixBagageParTypeDTOS
      );
      this.dataObjectToUpdate.datas.push(typeBagage);
      await axios
        .put(API_PRIX_BAGAGE_TYPE, this.dataObjectToUpdate, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              $(".alert-success").fadeIn();
              setTimeout(function () {
                $(".alert-success").fadeOut();
              }, 4000);
              this.updatePrixBagage();
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
            }
          } else {
            this.errorMessage = "Erreur , opération de création impossible";
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
          this.typeBagage = Object.assign({}, this.defaultTypeBagage);
          this.dialogForType = false;
        });
    },

    // MODIFICATION DES INFORMATIONS D'UN TYPE DE BAGAGE VIA UNE DIALOGUE
    modifierTypeBagage(type, listTypeBagage) {
      this.editedTypeBagageIndex = listTypeBagage.indexOf(type);
      this.editedTypeBagage = Object.assign({}, type);
      this.dialogForType = true;
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
  },

  mounted() {
    this.obtenirReferenceTypeBagage();
  },
};
</script>

<style scoped>
.title_card {
  font-size: 18px;
  font-family: "Montserrat";
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
</style>
