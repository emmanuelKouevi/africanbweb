<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <h3 class="main_title">Envoyer une notification.</h3>
        <small class="subtitle"
          >Communiquer rapidement avec vos utilisateurs.</small
        >
      </div>
      <br />
      <div class="row" v-if="typeNotification == 'PROGRAMME'">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              ><span class="subtitle_select_program"
                >Étape 1: Sélectionnez votre offre de voyage</span
              ></v-card-title
            >
            <v-card-text>
              <div class="row">
                <div
                  class="col-lg-4"
                  v-for="(offre, off) in offreVoyageList"
                  :key="off"
                >
                  <v-card
                    hover
                    class="custom_card"
                    @click="getProgrammeByOffre(offre.designation)"
                  >
                    <v-card-title>
                      <span class="subtitle">{{ offre.designation }}</span>
                    </v-card-title>
                    <v-card-text>
                      <div>
                        <span>Description:</span>&nbsp;&nbsp;&nbsp;
                        <span>{{ offre.description }}</span>
                      </div>
                      <br />
                      <div>
                        <span>Type:</span>&nbsp;&nbsp;&nbsp;
                        <span>{{ offre.typeOffreVoyageDesignation }}</span>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-divider></v-divider>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <v-divider></v-divider>
        <div class="col-lg-12" v-if="goToStepTwo == true">
          <v-card>
            <v-card-title
              ><span class="subtitle_select_program"
                >Étape 2: Sélectionner le programme concerné</span
              ><v-spacer></v-spacer>
              <v-btn btn color="secondary" @click="goToStepTwo = false" small
                >Retour</v-btn
              >
            </v-card-title>
            <v-card-text>
              <div class="row" v-if="programmeList.length > 0">
                <div
                  class="col-lg-4"
                  v-for="(programme, prog) in programmeList"
                  :key="prog"
                >
                  <v-card
                    hover
                    class="custom_card"
                    @click="takeProgramToNotify(programme.designation)"
                  >
                    <v-card-title>
                      <span class="subtitle">{{ programme.designation }}</span>
                    </v-card-title>
                    <v-card-text>
                      <div>
                        <span>Date de départ:</span>&nbsp;&nbsp;&nbsp;
                        <span
                          >{{ programme.dateDepart }} à
                          {{ programme.heureDepart }}</span
                        >
                      </div>
                      <br />
                      <div>
                        <span>DateArrivée:</span>&nbsp;&nbsp;&nbsp;
                        <span
                          >{{ programme.dateArrivee }} à
                          {{ programme.heureArrivee }}</span
                        >
                      </div>
                      <br />
                      <div>
                        <span>Numéro Bus:</span>&nbsp;&nbsp;&nbsp;
                        <span>{{ programme.numeroBus }}</span>
                      </div>
                      <br />
                      <div>
                        <span>Place(s) restante(s):</span>&nbsp;&nbsp;&nbsp;
                        <span>{{ programme.nombrePlaceDisponible }}</span>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-divider></v-divider>
                </div>
              </div>
              <span v-else class="text-center"
                >AUCUN PROGRAMME DISPONIBLE POUR L'OFFRE SÉLECTIONNÉE</span
              >
            </v-card-text>
          </v-card>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              ><span class="main_title"
                >Formulaire pour l'envoi de notifications.</span
              ></v-card-title
            >
            <v-card-text>
              <form>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >type de notification:</label
                  >

                  <select
                    v-if="
                      $store.state.userAuthentified.roleCode == 'RoleAgentGare'
                    "
                    v-model="typeNotification"
                    class="form-select col-lg-5 content_form"
                    aria-label="Default select example"
                  >
                    <option
                      class="content_form"
                      v-for="(type, t) in referenceTypeNotificationAgent"
                      :value="type.designation"
                      :key="t"
                    >
                      {{ type.description }}
                    </option>
                  </select>

                  <select
                    v-if="
                      $store.state.userAuthentified.roleCode ==
                      'RoleAdminCompagnieTransport'
                    "
                    v-model="typeNotification"
                    class="form-select col-lg-5 content_form"
                    aria-label="Default select example"
                  >
                    <option
                      class="content_form"
                      v-for="(type, t) in referenceTypeNotificationCompagnie"
                      :value="type.designation"
                      :key="t"
                    >
                      {{ type.description }}
                    </option>
                  </select>

                  <select
                    v-if="
                      $store.state.userAuthentified.roleCode ==
                      'RoleAdminSocieteMere'
                    "
                    v-model="typeNotification"
                    class="form-select col-lg-5 content_form"
                    aria-label="Default select example"
                  >
                    <option
                      class="content_form"
                      v-for="(type, t) in referenceTypeNotificationList"
                      :value="type.designation"
                      :key="t"
                    >
                      {{ type.description }}
                    </option>
                  </select>
                </div>

                <div class="mb-3" v-if="typeNotification == 'TOUT_CLIENT'">
                  <label for="exampleInputPassword1" class="form-label"
                    >Message:</label
                  >

                  <textarea
                    class="form-control col-lg-7 content_form"
                    name=""
                    id=""
                    v-model="sendNotificationToCustomer.data.message"
                  ></textarea>
                </div>

                <div class="mb-3" v-if="typeNotification == 'TOUT_UTILISATEUR'">
                  <label for="exampleInputPassword1" class="form-label"
                    >Message:</label
                  >

                  <textarea
                    class="form-control col-lg-7 content_form"
                    name=""
                    id=""
                    v-model="sendNotificationToSystem.data.message"
                  ></textarea>
                </div>

                <div class="mb-3" v-if="typeNotification == 'PROGRAMME'">
                  <label for="exampleInputPassword1" class="form-label"
                    >Porgramme:</label
                  >

                  <input
                    disabled
                    type="text"
                    class="form-control content_form col-lg-6"
                    name=""
                    id=""
                    v-model="
                      sendNotificationToProgram.data.programmmeDesignation
                    "
                  />
                </div>

                <div class="mb-3" v-if="typeNotification == 'PROGRAMME'">
                  <label for="exampleInputPassword1" class="form-label"
                    >Message:</label
                  >

                  <textarea
                    class="form-control col-lg-7 content_form"
                    name=""
                    id=""
                    v-model="sendNotificationToProgram.data.message"
                  ></textarea>
                </div>

                <br />
              </form>
              <div class="float-right">
                <v-btn btn small color="secondary"
                  ><span>REINITIALISER</span></v-btn
                >&nbsp;&nbsp;
                <v-btn
                  :disabled="typeNotification == null"
                  type="submit"
                  color="success"
                  @click="sendNotification()"
                  btn
                  small
                  ><span>ENVOYER LA NOTIFICATION</span></v-btn
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
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  API_RECUPERER_LISTE_OFFRE_VOYAGE,
  API_RECUPERER_PROGRAMME_PAR_OFFRE_VOYAGE,
  API_SEND_NOTIFICATION_URL,
  API_SEND_NOTIFICATION_URL_SYSTEM,
  HEADERS,
  LISTEN_URL_NOTIFICATION,
} from "@/components/globalConfig/globalConstConfig";
import $ from "jquery";
import axios from "axios";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../messages/messageProcess";
let sseClient;
export default {
  data() {
    return {
      errorMsg: null,

      successMsg: null,

      overlay: false,

      goToStepTwo: false,

      offreVoyageToSend: {
        data: {
          designation: null,
        },
      },

      referenceTypeNotificationList: [],

      referenceTypeNotificationAgent: [],

      referenceTypeNotificationCompagnie: [],

      referenceTypeNotificationSystem: [],

      typeNotification: null,

      referenceTypeNotification: {
        datas: [
          {
            referenceFamilleDesignation: "referenceFamilleTypeNotification",
          },
        ],
      },

      sendNotificationToSystem: {
        data: {
          message: null,
          type: null,
        },
      },

      sendNotificationToProgram: {
        data: {
          raisonSociale: "KOUEVI CT",
          programmmeDesignation: null,
          message: null,
          type: null,
        },
      },

      sendNotificationToCustomer: {
        data: {
          raisonSociale: "KOUEVI CT", // To delete
          message: null,
          type: null,
        },
      },

      offreVoyageObject: {
        data: {
          compagnieTransportRaisonSociale: "KOUEVI CT",
        },
      },

      offreVoyageList: [],

      programmeList: [],
    };
  },

  methods: {
    // Obtenir la liste des programmes par designation
    async getProgrammeByOffre(offreDesignation) {
      this.goToStepTwo = true;
      this.offreVoyageToSend.data.designation = offreDesignation;
      await axios
        .post(
          API_RECUPERER_PROGRAMME_PAR_OFFRE_VOYAGE,
          this.offreVoyageToSend,
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
        })
        .finally(() => {
          this.offreVoyageToSend.data.designation = null;
        });
    },
    // OBTENIR LA LISTE DES OFFRES DE VOYAGES
    async getOffreVoyageList() {
      await axios
        .post(API_RECUPERER_LISTE_OFFRE_VOYAGE, this.offreVoyageObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              this.offreVoyageList = [];
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.offreVoyageList = response.data.items;
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

    // OBTENIR LA LISTE DES REFERENCES PAR TYPE DE NOTIFICATION
    async getReferenceTypeNotification() {
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.referenceTypeNotification,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
        .then((response) => {
          this.referenceTypeNotificationList = response.data.items;
          this.referenceTypeNotificationList.forEach((element) => {
            if (element.designation == "TOUT_UTILISATEUR") {
              this.referenceTypeNotificationSystem.push(element);
            } else if (element.designation == "TOUT_CLIENT") {
              this.referenceTypeNotificationCompagnie.push(element);
            } else {
              this.referenceTypeNotificationCompagnie.push(element);
              this.referenceTypeNotificationAgent.push(element);
            }
          });
        })
        .catch((e) => {
          this.errorMsg = e;
          showErrorMessage();
        });
    },

    // Clear Data Sended
    clearDataSended() {
      this.sendNotificationToCustomer.data.type = null;
      this.sendNotificationToCustomer.data.message = null;
      this.sendNotificationToSystem.data.message = null;
      this.sendNotificationToSystem.data.type = null;
      this.sendNotificationToProgram.data.message = null;
      this.sendNotificationToProgram.data.type = null;
      this.sendNotificationToProgram.data.programmmeDesignation = null;
      this.typeNotification = null;
    },

    takeProgramToNotify(programmeDesignation) {
      this.sendNotificationToProgram.data.programmmeDesignation =
        programmeDesignation;
      this.programmeList = [];
      this.goToStepTwo = false;
    },

    // Send notification.
    async sendNotification() {
      this.overlay = true;
      if (this.typeNotification == "TOUT_CLIENT") {
        this.sendNotificationToCustomer.data.type = this.typeNotification;
      } else if (this.typeNotification == "TOUT_UTILISATEUR") {
        this.sendNotificationToSystem.data.type = this.typeNotification;
      } else {
        this.sendNotificationToProgram.data.type = this.typeNotification;
        this.$store.commit(
          "STORE_PROGRAMME",
          this.sendNotificationToProgram.data.programmmeDesignation
        );
      }
      await axios
        .post(
          this.typeNotification == "TOUT_UTILISATEUR" &&
            this.$store.state.userAuthentified.roleCode ==
              "RoleAdminSocieteMere"
            ? API_SEND_NOTIFICATION_URL_SYSTEM
            : API_SEND_NOTIFICATION_URL,
          this.typeNotification == "TOUT_CLIENT"
            ? this.sendNotificationToCustomer
            : this.typeNotification == "TOUT_UTILISATEUR"
            ? this.sendNotificationToSystem
            : this.sendNotificationToProgram,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.item == "OK") {
            this.successMsg = "Notification envoyée avec succès";
            if (
              this.typeNotification != "TOUT_CLIENT" &&
              this.typeNotification != "TOUT_UTILISATEUR"
            ) {
              console.log("Nous envoyons une notification par programme");
              console.log(this.typeNotification);
              this.checkNotificationProgram();
            }
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
          this.clearDataSended();
          this.overlay = false;
        });
    },

    checkNotificationProgram() {
      sseClient = this.$sse.create({
        url: LISTEN_URL_NOTIFICATION("COMPAGNIE_PROGRAMME"),
        format: "json",
        withCredentials: false,
        polyfill: true,
      });

      // Handle messages without a specific event
      sseClient.on("Prog TOUM-TOUMO_programme", (event) => console.log(event));

      sseClient
        .connect()
        .then((sse) => {
          console.log("We're connected!");
          console.log(sse);
        })
        .catch((err) => {
          // When this error is caught, it means the initial connection to the
          // events server failed.  No automatic attempts to reconnect will be made.
          console.error("Failed to connect to server", err);
        });
    },
  },

  beforeDestroy() {
    sseClient.disconnect();
  },

  mounted() {
    this.getOffreVoyageList();
    this.getReferenceTypeNotification();
  },
};
</script>

<style scoped>
#inspire {
  background: #eeeeee;
}

.custom_card {
  padding-top: 4px;
}

.main_title {
  opacity: 0.8;
  font-family: "Montserrat";
  font-weight: bold;
}

.subtitle {
  font-family: "Montserrat";
}

.subtitle_select_program {
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: bold;
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
