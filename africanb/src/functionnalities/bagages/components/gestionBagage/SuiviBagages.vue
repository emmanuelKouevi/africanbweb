<template>
  <v-app>
    <div class="container">
      <br />
      <span class="title_card">SUIVI DES BAGAGES</span>
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              ><span class="search_text"
                >Rechercher des bagages par:</span
              ></v-card-title
            >
            <v-card-subtitle>Sélectionnez le type de recherche</v-card-subtitle
            ><br />
            <v-card-text>
              <div class="row justify-space-between">
                <v-radio-group v-model="searchType" row>
                  <v-radio
                    label="Billet de reservation"
                    value="referenceBilletReservation"
                  ></v-radio>
                  <v-radio
                    label="Programme de voyage"
                    value="designationProgramme"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-card-text> </v-card
          ><br />
        </div>
      </div>

      <div
        class="row"
        :hidden="
          searchType == null || searchType != 'referenceBilletReservation'
        "
      >
        <div class="col-lg-12">
          <v-card>
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <div>
                    <input
                      id="searchTicket"
                      v-model="referenceTicket"
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                      placeholder="Entrer la référence du billet"
                    />
                  </div>
                </div>
                <div class="col-lg-3">
                  <div v-if="isSearchingByTicket == true">
                    <v-progress-circular
                      indeterminate
                      color="secondary"
                    ></v-progress-circular>
                  </div>
                  <div v-else>
                    <v-btn btn color="primary" @click="getBagsByReference"
                      ><v-icon>mdi-magnify</v-icon>&nbsp;&nbsp;Rechercher</v-btn
                    >
                  </div>
                </div>
              </div>
            </v-card-text> </v-card
          ><br />
        </div>
      </div>

      <div
        class="row"
        :hidden="searchType == null || searchType != 'designationProgramme'"
      >
        <div class="col-lg-12">
          <v-card>
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <div>
                    <input
                      id="searchTicket"
                      v-model="designationProgramme"
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                      placeholder="Entrer la désignation du programme"
                    />
                  </div>
                </div>
                <div class="col-lg-3">
                  <div v-if="isSearchingByDesignation == true">
                    <v-progress-circular
                      indeterminate
                      color="secondary"
                    ></v-progress-circular>
                  </div>
                  <div v-else>
                    <v-btn btn color="primary" @click="getBagsByOffre"
                      ><v-icon>mdi-magnify</v-icon>&nbsp;&nbsp;Rechercher</v-btn
                    >
                  </div>
                </div>
              </div>
            </v-card-text> </v-card
          ><br />
        </div>
      </div>

      <DetailBagageClient
        :response="apiResponse"
        :strategyType="typeStrategieCompagnieStrategie"
      ></DetailBagageClient>

      <DetailBagageClientType
        :response="apiResponse"
        :strategyType="typeStrategieCompagnieStrategie"
      ></DetailBagageClientType>

      <!--
      <div
        class="row"
        :hidden="apiResponse == null"
        v-if="typeStrategieCompagnieStrategie == 'typeStrategieBagageType'"
      >
        <div class="col-lg-7">
          <v-card>
            <v-card-title
              ><span class="title_card">Détail des bagages</span>
              <v-spacer></v-spacer>
              <v-btn btn color="secondary" small>Imprimer le reçu</v-btn>
            </v-card-title>
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Montant à payer</label
                  >
                  <div class="input-group mb-3">
                    <input
                      disabled
                      :value="
                        apiResponse != null ? apiResponse.montantSoldable : ''
                      "
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">FCFA</span>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div class="col-lg-5">
          <v-card>
            <v-card-title
              ><span class="search_text"
                >Total bagages:
                {{
                  apiResponse != null
                    ? apiResponse.bagageTypeDTO.bagageTypeReferenceDTOS.length
                    : ""
                }}</span
              ></v-card-title
            >
            <v-card-text v-if="apiResponse != null">
              <div
                v-if="
                  apiResponse.bagageTypeDTO.bagageTypeReferenceDTOS.length > 0
                "
              >
                <div class="row">
                  <div
                    class="col-lg-6"
                    v-for="(bag, b) in apiResponse.bagageTypeDTO
                      .bagageTypeReferenceDTOS"
                    :key="b"
                  >
                    <span>{{ bag.typeBagageDesignation }}</span>
                  </div>
                </div>
              </div>
              <div v-else>
                <span>AUCUN BAGAGE</span>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>-->

      <div
        class="row"
        :hidden="apiResponseProgramme == null"
        v-if="typeStrategieCompagnieStrategie == 'typeStrategieBagagePoids'"
      >
        <div class="col-lg-7">
          <v-card>
            <v-card-title
              ><span class="title_card">Détail des bagages</span>
              <v-spacer></v-spacer>
              <v-btn btn color="secondary" small>Imprimer le reçu</v-btn>
            </v-card-title>
            <v-card-text>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label"
                    >Poids Total</label
                  >
                  <div class="input-group mb-3">
                    <input
                      disabled
                      :value="
                        apiResponseProgramme != null
                          ? apiResponseProgramme[0].bagagePoidsDTO
                              .poidsTotalBagage
                          : ''
                      "
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">KG</span>
                  </div>
                </div>
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Montant à payer</label
                  >
                  <div class="input-group mb-3">
                    <input
                      disabled
                      :value="
                        apiResponseProgramme != null
                          ? apiResponseProgramme[0].montantSoldable
                          : ''
                      "
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">FCFA</span>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div class="col-lg-5">
          <v-card>
            <v-card-title
              ><span class="search_text"
                >Total bagages:
                {{
                  apiResponseProgramme != null
                    ? apiResponseProgramme[0].bagagePoidsDTO
                        .bagagePoidsReferenceDTOS.length
                    : ""
                }}</span
              ></v-card-title
            >
            <v-card-text v-if="apiResponseProgramme != null">
              <div
                v-if="
                  apiResponseProgramme[0].bagagePoidsDTO
                    .bagagePoidsReferenceDTOS.length > 0
                "
              >
                <div class="row">
                  <div
                    class="col-lg-6"
                    v-for="(bag, b) in apiResponseProgramme[0].bagagePoidsDTO
                      .bagagePoidsReferenceDTOS"
                    :key="b"
                  >
                    <span>{{ bag.typeBagageDesignation }}</span>
                  </div>
                </div>
              </div>
              <div v-else>
                <span>AUCUN BAGAGE</span>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div
        class="row"
        :hidden="apiResponseProgramme == null"
        v-if="typeStrategieCompagnieStrategie == 'typeStrategieBagageType'"
      >
        <div class="col-lg-7">
          <v-card>
            <v-card-title
              ><span class="title_card">Détail des bagages</span>
              <v-spacer></v-spacer>
              <v-btn btn color="secondary" small>Imprimer le reçu</v-btn>
            </v-card-title>
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Montant à payer</label
                  >
                  <div class="input-group mb-3">
                    <input
                      disabled
                      :value="
                        apiResponseProgramme != null
                          ? apiResponseProgramme[0].montantSoldable
                          : ''
                      "
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">FCFA</span>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div class="col-lg-5">
          <v-card>
            <v-card-title
              ><span class="search_text"
                >Total bagages:
                {{
                  apiResponseProgramme != null
                    ? apiResponseProgramme[0].bagageTypeDTO
                        .bagageTypeReferenceDTOS.length
                    : ""
                }}</span
              ></v-card-title
            >
            <v-card-text v-if="apiResponseProgramme != null">
              <div
                v-if="
                  apiResponseProgramme[0].bagageTypeDTO.bagageTypeReferenceDTOS
                    .length > 0
                "
              >
                <div class="row">
                  <div
                    class="col-lg-6"
                    v-for="(bag, b) in apiResponseProgramme[0].bagageTypeDTO
                      .bagageTypeReferenceDTOS"
                    :key="b"
                  >
                    <span>{{ bag.typeBagageDesignation }}</span>
                  </div>
                </div>
              </div>
              <div v-else>
                <span>AUCUN BAGAGE</span>
              </div>
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
  </v-app>
</template>

<script>
import {
  API_FIND_BAGS_BY_OFFRE,
  API_FIND_BAGS_BY_TICKET,
  API_GET_STRATEGIE_PAR_COMPAGNIE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import $ from "jquery";
import axios from "axios";
import DetailBagageClient from "./widgets/DetailBagageClient.vue";
import DetailBgageClientType from "./widgets/DetailBgageClientType.vue";
export default {
  name: "SuiviBagages",
  components: {
    DetailBagageClient,
    DetailBgageClientType,
  },
  data() {
    return {
      searchType: null,
      isSearchingByTicket: false,
      isSearchingByDesignation: false,
      errorMsg: null,
      successMsg: null,

      referenceTicket: null,

      designationProgramme: null,

      bagageByTicket: {
        data: {
          reservationBilletReference: null,
        },
      },

      bagageByProgramme: {
        data: {
          designation: null,
        },
      },

      apiResponse: null,
      apiResponseProgramme: null,

      strategieObject: {
        data: {},
      },

      typeStrategieCompagnieStrategie: null,
    };
  },

  methods: {
    // Rechercher bagages par reference billet de réservation
    async getBagsByReference() {
      this.apiResponseProgramme = null;
      this.isSearchingByTicket = true;
      this.bagageByTicket.data.reservationBilletReference =
        this.referenceTicket;
      await axios
        .post(API_FIND_BAGS_BY_TICKET, this.bagageByTicket, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.data.status.code == 800) {
            this.apiResponse = response.data.item;
          } else {
            this.apiResponse = null;
            this.errorMsg = "Nous n'avons pas de réponse";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
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
          this.isSearchingByTicket = false;
        });
    },

    // Rechercher bagages par programme designation
    async getBagsByOffre() {
      this.isSearchingByDesignation = true;
      this.apiResponse = null;
      this.bagageByProgramme.data.designation = this.designationProgramme;
      await axios
        .post(API_FIND_BAGS_BY_OFFRE, this.bagageByProgramme, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.data.status.code == 800) {
            this.apiResponseProgramme = response.data.items;
          } else {
            this.apiResponseProgramme = null;
            this.errorMsg = "Aucune donnée enregistré";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
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
          this.isSearchingByDesignation = false;
        });
    },

    // Obtenir la strategie de gestion de bagage de la compagnie
    async getStrategyByCompany() {
      await axios
        .post(API_GET_STRATEGIE_PAR_COMPAGNIE, this.strategieObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.typeStrategieCompagnieStrategie = null;
            } else {
              this.typeStrategieCompagnieStrategie =
                response.data.item.designation;
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
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },
  },

  mounted() {
    this.getStrategyByCompany();
  },
};
</script>

<style scoped>
.title_card {
  font-weight: bold;
  font-size: 23px;
  font-family: "Montserrat";
  letter-spacing: 2px;
  word-spacing: 1px;
}

.search_text {
  font-weight: bold;
  font-family: "Montserrat";
  opacity: 0.8;
}

.myalert {
  display: none;
  z-index: 1900;
}

.alert-error {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}

#searchTicket {
  height: 45px;
}

input[type="text"] {
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 20px;
}
</style>
