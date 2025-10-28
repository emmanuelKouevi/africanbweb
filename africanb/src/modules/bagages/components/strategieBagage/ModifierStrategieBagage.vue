<template>
  <v-app>
    <div class="container">
      <span class="title">MODIFIER VOTRE STRATEGIE DE TRANSPORT</span>

      <div class="row">
        <div class="col-lg-12">
          <v-card
            elevation="3"
            :hidden="
              strategieBagageSelected.typeStrategieBagageDesignation == null ||
              strategieBagageSelected.typeStrategieBagageDesignation ===
                'Strategie bagage Par Type'
            "
          >
            <v-card-title>{{
              strategieBagageSelected.designation
            }}</v-card-title>
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
                        $v.strategieBagagePoidsModel.data
                          .strategieBagagePoidsDTO.prixKilo.$model
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
                <v-btn color="success" btn outlined>MODIFIER</v-btn>
              </div>
              <br /><br />
            </v-card-text>
          </v-card>

          <!--<v-card
            elevation="3"
            :hidden="
              strategieBagageSelected.typeStrategieBagageDesignation == null ||
              strategieBagageSelected.typeStrategieBagageDesignation ===
                'Strategie bagage Par Poids'
            "
          >
            <v-card-title
              >{{ strategieBagageSelected.designation }}
              <v-spacer></v-spacer>
              BOITE DE DIALOGUE POUR LES PRIX 
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
                              v-for="(
                                bagageType, bag
                              ) in referenceBagageTypeList"
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
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="saveTypeBagageInList"
                    >
                      Enregistrer
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              FIN DE BOITE DE DIALOGUE 
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
                <v-btn
                  color="success"
                  @click="submitStrategieBagage"
                  btn
                  outlined
                  >ENREGISTRER</v-btn
                >
              </div>
              <br /><br />
            </v-card-text>
          </v-card>-->
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ModifierStrategieBagage",

  data() {
    return {
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

      strategieBagageSelected: {
        id: null,
        designation: null,
        typeStrategieBagageDesignation: null,
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

      strategieBagagePoidsEditable: {
        data: {
          id: null,
          strategieBagageTypeDTO: {},
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
    // STOCKAGE DES INFORMATIONS DE L'OFFRE DE VOYAGE SELECTIONNÉ POUR L'EDITION FUTURE
    async getInfoStrategieBagage() {
      if (localStorage.getItem("strategieBagage")) {
        try {
          const strategieBagageEditing = JSON.parse(
            localStorage.getItem("strategieBagage")
          );
          this.strategieBagageSelected.id = strategieBagageEditing.id;
          this.strategieBagageSelected.designation =
            strategieBagageEditing.designation;
          this.strategieBagageSelected.typeStrategieBagageDesignation =
            strategieBagageEditing.typeStrategieBagageDesignation;
          localStorage.removeItem("strategieBagage");
        } catch (error) {
          localStorage.removeItem("strategieBagage");
        }
      } else {
        this.$router.replace({ path: "/SelectionnerStrategieBagage" });
      }
    },
  },

  mounted() {
    this.getInfoStrategieBagage();
  },
};
</script>

<style scoped>
.title {
  font-size: 25px;
  opacity: 0.7;
  font-family: "Montserrat";
}
</style>
