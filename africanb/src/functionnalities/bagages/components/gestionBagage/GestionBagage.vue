<template>
  <v-app>
    <div class="container">
      <div class="row">
        <span class="section_title"
          >GESTION DES BAGAGES ({{
            typeStrategieCompagnieStrategie == "typeStrategieBagagePoids"
              ? "Strategie Par Poids"
              : "Strategie Par Type"
          }})</span
        >
        <small class="font-weight-normal"
          >Gérer les bagages de vos clients de façon professionnelle.</small
        >
        <div class="col-lg-7">
          <v-card>
            <v-card-title
              ><span class="title_card">Information(s) Génerale(s)</span>
            </v-card-title>
            <v-card-text>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label">Nom</label>
                  <div>
                    <input
                      disabled
                      :value="billetReservation.clientDetails.nom"
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Prenom(s)</label
                  >
                  <div>
                    <input
                      disabled
                      :value="billetReservation.clientDetails.prenoms"
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-8">
                  <label for="designation" class="form-label">E-mail</label>
                  <div>
                    <input
                      :value="billetReservation.clientDetails.email"
                      disabled
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label">Téléphone</label>
                  <div>
                    <input
                      disabled
                      :value="billetReservation.clientDetails.telephone"
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Addresse</label
                  >
                  <div>
                    <input
                      disabled
                      :value="billetReservation.clientDetails.addresse"
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label">Programme</label>
                  <div>
                    <input
                      disabled
                      :value="billetReservation.programmeDesignation"
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Offre de voyage</label
                  >
                  <div>
                    <input
                      disabled
                      :value="billetReservation.offreVoyageDesignation"
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-5">
          <v-card>
            <v-card-title
              ><span class="title_card">Bagages Enregistrés</span></v-card-title
            >
            <v-card-text>
              <div v-if="bags.length == 0">
                <span class="text-center">PAS DE BAGAGES ENREGISTRÉS</span>
              </div>
              <div v-else class="container">
                <div class="row">
                  <div class="col-lg-6" v-for="(bag, b) in bags" :key="b">
                    <v-card>
                      <v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon color="secondary" @click="deleteBag(b)"
                          ><v-icon size="30">mdi-close</v-icon></v-btn
                        >
                      </v-card-title>
                      <v-card-subtitle>Bagage n° {{ b + 1 }} </v-card-subtitle>
                      <v-card-text>
                        {{ bag }}
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <v-dialog max-width="500px" persistent v-model="dialog">
        <v-card>
          <v-card-title>AJOUTER UN SAC</v-card-title>
          <v-card-text>
            <div class="row">
              <div class="col-lg-6">
                <label for="exampleInputEmail1" class="form-label"
                  >Sélectionner un type de bagage</label
                >
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="typeBagageDesignation"
                >
                  <option v-for="(bag, b) in referenceBagageList" :key="b">
                    {{ bag.designation }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-8">
                <label for="designation" class="form-label">Type*</label>
                <div>
                  <input
                    type="text"
                    disabled
                    :value="typeBagageDesignation"
                    class="form-control"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn btn small @click="dialog = false" color="secondary"
              >FERMER</v-btn
            >
            <v-btn btn small color="success" @click="addNewBag">AJOUTER</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="row">
        <div class="col-lg-7">
          <v-card>
            <v-card-title
              ><span class="title_card">Étiquetage des bagages</span>
              <v-spacer></v-spacer>
              <v-btn btn x-small color="secondary" @click="dialog = true"
                >AJOUTER UN SAC</v-btn
              >
            </v-card-title>
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <label for="designation" class="form-label"
                    >Désignation *</label
                  >
                  <div>
                    <input
                      v-if="
                        typeStrategieCompagnieStrategie ==
                        'typeStrategieBagagePoids'
                      "
                      type="text"
                      v-model="bagageWeightObject.data.designation"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                    <input
                      v-else
                      type="text"
                      v-model="bagageTypeObject.data.designation"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div
                  class="col-lg-6"
                  v-if="
                    typeStrategieCompagnieStrategie ==
                    'typeStrategieBagagePoids'
                  "
                >
                  <label for="exampleInputPassword1" class="form-label"
                    >Poids total *</label
                  >
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control"
                      v-model="
                        bagageWeightObject.data.bagagePoidsDTO.poidsTotalBagage
                      "
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">KG</span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12">
                  <label for="designation" class="form-label"
                    >Déscription *</label
                  >
                  <div>
                    <textarea
                      v-if="
                        typeStrategieCompagnieStrategie ==
                        'typeStrategieBagagePoids'
                      "
                      v-model="bagageWeightObject.data.description"
                      class="form-control"
                      name=""
                      id=""
                    ></textarea>
                    <textarea
                      v-else
                      v-model="bagageTypeObject.data.description"
                      class="form-control"
                      name=""
                      id=""
                    ></textarea>
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn btn color="secondary">REINITIALISER</v-btn
              >&nbsp;&nbsp;&nbsp;
              <v-btn btn color="success" @click="submitBag">ENREGISTRER</v-btn>
            </v-card-actions> </v-card
          ><br />
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
import {
  API_GET_STRATEGIE_PAR_COMPAGNIE,
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  API_SAVE_BAGAGE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import axios from "axios";
import $ from "jquery";
//import BagagePoids from "./widgets/BagagePoids.vue";

export default {
  name: "GestionBagagePoids",
  components: {
    //BagagePoids,
  },
  /*components: {
    SaveBagDialog,
  },*/
  data() {
    return {
      dialog: false,
      errorMsg: null,
      successMsg: null,
      overlay: false,

      strategieObject: {
        data: {},
      },

      typeStrategieCompagnieStrategie: null,
      typeBagageDesignation: null,

      referenceBagage: {
        referenceFamilleDesignation: "referenceFamilleBagage",
      },

      objectToSendReferenceBagage: {
        datas: [],
      },

      billetReservation: {},

      referenceBagageList: [],

      bags: [],

      bagageWeightObject: {
        data: {
          designation: null,
          description: null,
          reservationBilletReference: null,
          bagagePoidsDTO: {
            poidsTotalBagage: null,
            typeBagages: [],
          },
        },
      },

      bagageTypeObject: {
        data: {
          designation: null,
          reservationBilletReference: null,
          bagageTypeDTO: {
            typeBagages: [],
          },
        },
      },
    };
  },

  methods: {
    // Obtenir la strategie de gestion de bagage de la compagnie
    async getStrategyByCompany() {
      await axios
        .post(API_GET_STRATEGIE_PAR_COMPAGNIE, this.strategieObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          console.log(response);
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

    // Save new bag submit
    async submitBag() {
      console.log("NOus sommes dans la method");
      if (this.typeStrategieCompagnieStrategie == "typeStrategieBagagePoids") {
        if (
          this.bagageWeightObject.data.designation == null ||
          this.bagageWeightObject.data.bagagePoidsDTO.poidsTotalBagage == null
        ) {
          this.errorMsg = "Des informations sont manquantes";
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        } else if (this.bags.length == 0) {
          this.errorMsg = "Vous n'avez séléctionné aucun type de bagages";
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        } else {
          this.saveBagWithStrategy();
        }
      }

      if (this.typeStrategieCompagnieStrategie == "typeStrategieBagageType") {
        if (this.bagageTypeObject.data.designation == null) {
          this.errorMsg = "Des informations sont manquantes";
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        } else if (this.bags.length == 0) {
          this.errorMsg = "Vous n'avez séléctionné aucun type de bagages";
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        } else {
          this.saveBagWithStrategy();
        }
      }
    },

    //Save new bag from API (Weight Strategy)
    async saveBagWithStrategy() {
      if (this.typeStrategieCompagnieStrategie == "typeStrategieBagagePoids") {
        this.bagageWeightObject.data.reservationBilletReference =
          this.$store.state.ticket.designation;
        this.bagageWeightObject.data.bagagePoidsDTO.typeBagages = this.bags;
      } else {
        this.bagageTypeObject.data.reservationBilletReference =
          this.$store.state.ticket.designation;
        this.bagageTypeObject.data.bagageTypeDTO.typeBagages = this.bags;
      }
      await axios
        .post(
          API_SAVE_BAGAGE,
          this.typeStrategieCompagnieStrategie == "typeStrategieBagagePoids"
            ? this.bagageWeightObject
            : this.bagageTypeObject,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.$swal.fire(
                "Opération non effectuée",
                response.data.status.message,
                "error"
              );
            } else {
              this.$swal.fire(
                "Opération effectuée",
                response.data.status.message,
                "success"
              );
            }
          } else {
            this.$swal.fire(
              "Validation",
              "Error lors de la validation",
              "error"
            );
          }
        })
        .catch((e) => {
          this.$swal.fire("Opération non effectuée", e, "error");
        });
    },

    // ADD NEW BAG
    addNewBag() {
      var newBag;
      if (this.typeBagageDesignation != null) {
        newBag = this.typeBagageDesignation;
        this.bags.push(newBag);
      }
      this.dialog = false;
    },

    //DELETE BAG SAVED
    deleteBag(position) {
      this.bags.splice(position, 1);
    },

    // TO GET ALL TYPE BAGS
    async getReferenceBagageList() {
      this.objectToSendReferenceBagage.datas.push(this.referenceBagage);
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.objectToSendReferenceBagage,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          this.referenceBagageList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    // INITIALIZE TICKET SELECTED
    initializeTicketFound() {
      this.billetReservation = this.$store.state.ticket;
    },
  },

  mounted() {
    this.initializeTicketFound();
    this.getStrategyByCompany();
    this.getReferenceBagageList();
  },
};
</script>

<style scoped>
.title_card {
  font-family: "Montserrat";
  font-size: 18px;
  font-weight: 600;
}

.section_title {
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
  opacity: 0.7;
  letter-spacing: 3px;
  word-spacing: 2px;
}

input[type="text"] {
  font-family: "Montserrat";
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 2px;
  word-spacing: 1px;
}

input[type="number"] {
  font-family: "Montserrat";
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 2px;
  word-spacing: 1px;
}

textarea {
  font-family: "Montserrat";
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 2px;
  word-spacing: 1px;
}

select {
  font-family: "Montserrat";
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 2px;
  word-spacing: 1px;
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
