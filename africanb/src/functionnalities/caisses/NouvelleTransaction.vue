<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <h3 class="main_title">Créer une nouvelle transaction.</h3>
        <small class="subtitle"
          >Gérez efficacement vos flux d'argent entrants et sortants.</small
        >
      </div>
      <br />
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              ><span class="main_title"
                >Renseigner ce formulaire pour le décaissement.</span
              ></v-card-title
            >
            <v-card-text>
              <form>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Référence de la gare:</label
                  >

                  <input
                    disabled
                    type="text"
                    class="form-control content_form col-lg-6"
                    value="Gare de Marcory"
                    name=""
                    id=""
                  />
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label"
                        >Motif de la transaction:</label
                      >

                      <textarea
                        v-model="transactionToSend.data.motifTransaction"
                        name=""
                        id=""
                        class="form-control content_form"
                      ></textarea>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <label for="inputCity" class="form-label">
                      Type de l'opération:</label
                    >
                    <select
                      v-model="transactionToSend.data.typeOperation"
                      class="form-select content_form"
                      aria-label="Default select example"
                    >
                      <option
                        class="content_form"
                        v-for="(type, t) in referenceTypeOperationList"
                        :value="type.designation"
                        :key="t"
                      >
                        {{ type.description }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label"
                        >Type de paiement:</label
                      >

                      <select
                        v-model="transactionToSend.data.typePaiement"
                        class="form-select content_form"
                        aria-label="Default select example"
                      >
                        <option
                          v-for="(type, t) in referenceTypePaiementList"
                          :value="type.designation"
                          :key="t"
                        >
                          {{ type.description }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <label for="inputCity" class="form-label"> Montant:</label>
                    <div class="input-group mb-3">
                      <input
                        v-model="transactionToSend.data.montantTransaction"
                        type="text"
                        class="form-control content_form"
                        aria-describedby="basic-addon1"
                      />
                      <span class="input-group-text" id="basic-addon1"
                        >FCFA</span
                      >
                    </div>
                  </div>
                </div>
                <br />
              </form>
              <div class="float-right">
                <v-btn btn small color="secondary"
                  ><span>REINITIALISER</span></v-btn
                >&nbsp;&nbsp;
                <v-btn
                  type="submit"
                  color="success"
                  @click="createTransaction()"
                  btn
                  small
                  ><span>DÉCAISSER</span></v-btn
                >
              </div>
              <br /><br />
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
  API_CREATE_TRANSACTION_URL,
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import axios from "axios";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../messages/messageProcess";
import { required } from "vuelidate/lib/validators";

export default {
  name: "NouvelleTransaction.vue",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: false,
      referenceTypePaiementList: [],
      referenceTypeOperationList: [],

      referenceTypePaiement: {
        datas: [
          {
            referenceFamilleDesignation: "referenceFamilleTypePaiement",
          },
        ],
      },

      referenceTypeOperation: {
        datas: [
          {
            referenceFamilleDesignation: "referenceFamilleTypeOperation",
          },
        ],
      },

      transactionToSend: {
        data: {
          typePaiement: null,
          typeOperation: null,
          montantTransaction: null,
          motifTransaction: null,
          gareDesignation: "Gare de Marcory",
        },
      },
    };
  },

  validations: {
    transactionToSend: {
      data: {
        typePaiement: {
          required,
        },
        typeOperation: {
          required,
        },
      },
    },
  },

  methods: {
    // Obtenir la liste des reférences par type paiements
    async getReferenceTypePaiement() {
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.referenceTypePaiement,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
        .then((response) => {
          this.referenceTypePaiementList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          showErrorMessage();
        });
    },

    // Obtenir la liste des reférences par type opérations
    async getReferenceTypeOperation() {
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.referenceTypeOperation,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
        .then((response) => {
          this.referenceTypeOperationList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          showErrorMessage();
        });
    },

    // Creer une transaction
    async createTransaction() {
      this.overlay = true;
      await axios
        .post(API_CREATE_TRANSACTION_URL, this.transactionToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.data.status.code == 800) {
            this.successMsg = response.data.status.message;
            showSuccessMessage();
          } else {
            this.errorMsg = response.data.status.message;
            showErrorMessage();
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          showErrorMessage();
        })
        .finally(() => {
          this.overlay = false;
        });
    },
  },

  mounted() {
    this.getReferenceTypePaiement();
    this.getReferenceTypeOperation();
  },
};
</script>

<style scoped>
#inspire {
  background: #eeeeee;
}

.main_title {
  opacity: 0.8;
  font-family: "Montserrat";
  font-weight: bold;
}

.subtitle {
  font-family: "Montserrat";
}

.content_form {
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
