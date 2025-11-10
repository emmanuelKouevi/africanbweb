<template>
  <v-app>
    <div class="container">
      <div class="row">
        <h3 class="main_title">Selectionner vos catégories voyageurs.</h3>
        <small class="subtitle">Choisissez vos catégories de voyageurs.</small>
      </div>
      <br />
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              ><span class="main_title"
                >Listes des catégories voyageurs disponibles.</span
              >
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <span
                class="text-center"
                v-if="referenceModeCategorieVoyageurList.length == 0"
                >Aucune reference de type catégorie !</span
              >
              <div class="row" v-else>
                <div
                  class="col-lg-3"
                  v-for="(
                    refCategory, refCat
                  ) in referenceModeCategorieVoyageurList"
                  :key="refCat"
                >
                  <v-card elevation="2">
                    <v-card-title
                      ><span class="category_label">{{
                        refCategory.designation
                      }}</span>
                      <v-spacer></v-spacer>
                      <v-checkbox
                        dense
                        color="#192a56"
                        v-model="categoriesSelected"
                        :value="refCategory"
                      ></v-checkbox>
                    </v-card-title>
                  </v-card>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="float-right">
              <v-btn btn small color="secondary"
                ><span>REINITIALISER</span></v-btn
              >&nbsp;&nbsp;
              <v-btn
                type="submit"
                color="success"
                btn
                small
                @click="addNewCategory()"
                ><span>ENREGISTRER</span></v-btn
              >
            </v-card-actions>
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
import {
  API_CREATE_CATEGORY,
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/modules/messages/messageProcess";
import axios from "axios";
import $ from "jquery";
export default {
  name: "SelectCategory",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: false,

      categoriesSelected: [],

      categoriesByCompagnieTransport: [],

      objectToSendReferenceModeCategorieVoyageur: {
        datas: [],
      },

      categoryByCompagnieObject: {
        datas: [
          {
            compagnieTransportId:
              this.$store.state.userAuthentified.compagnieTransportId,
          },
        ],
      },

      addNewCategoryObject: {
        data: {
          compagnieTransportId:
            this.$store.state.userAuthentified.compagnieTransportId,
          referenceDTOS: [],
        },
      },

      referenceCategorieVoyageur: {
        referenceFamilleDesignation: "referenceFamilleCategorieVoyageur",
      },

      referenceModeCategorieVoyageurList: [],
    };
  },

  methods: {
    //GET ALL CATEGORIES TRAVELLERS.
    async getAllCategoryTravellers() {
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
          showErrorMessage();
        });
    },

    // ADD NEW CATEGORY
    async addNewCategory() {
      var referenceToSend = [];
      if (this.categoriesSelected.length == 0) {
        this.errorMsg = "Aucune référence catégorie selectionnée !";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        this.overlay = true;
        this.categoriesSelected.forEach((element) => {
          var referenceCategory = {
            designation: element.designation,
          };
          referenceToSend.push(referenceCategory);
        });
        this.addNewCategoryObject.data.referenceDTOS = referenceToSend;
        await axios
          .post(API_CREATE_CATEGORY, this.addNewCategoryObject, {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          })
          .then((response) => {
            if (
              response.data.status.code !== "800" ||
              response.data.status.hasError == true
            ) {
              this.errorMsg = response.data.status.message;
              showErrorMessage();
            } else {
              this.successMsg = response.data.status.message;
              showSuccessMessage();
            }
          })
          .catch((e) => {
            this.errorMsg = e;
            showErrorMessage();
          })
          .finally(() => {
            this.overlay = false;
          });
      }
    },
  },

  mounted() {
    this.getAllCategoryTravellers();
  },
};
</script>

<style scoped>
.category_label {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 16px;
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

.main_title {
  opacity: 0.8;
  font-family: "Montserrat";
  font-weight: bold;
}

.subtitle {
  font-family: "Montserrat";
}
</style>
