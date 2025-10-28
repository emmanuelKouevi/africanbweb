<template>
  <v-app>
    <div class="container">
      <div class="row">
        <span class="font-weight-bold title">ATTESTATION DE TRANSPORT</span>
        <v-subheader
          >Rattacher votre attestion de transport, document prouvant votre
          éligibilité</v-subheader
        ><br />
      </div>

      <div class="row">
        <div class="col-lg-3" v-if="attestationTransportInBase64">
          <v-card>
            <v-card-text>
              <iframe
                v-if="attestationTransportInBase64"
                :src="attestationTransportInBase64"
                width="100%"
                height="200px"
              ></iframe>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-9">
          <v-card>
            <v-card-text>
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <v-file-input
                        class="input"
                        @change="convertirEnBase64"
                        v-model="attestationTransportSelected"
                        show-size
                        outlined
                        accept="application/pdf"
                        dense
                        placeholder="Attestation de transport"
                      ></v-file-input>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <v-btn
                      :disabled="attestationTransportSelected == null"
                      color="success"
                      outlined
                      @click="sendAttestationTransport()"
                      >ENREGISTRER</v-btn
                    >
                  </div>
                </div>
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
  API_SEND_DOCUMENTS,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import $ from "jquery";
import axios from "axios";
export default {
  name: "DocumentAttestationTransport",

  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: false,

      attestationTransportSelected: null,
      attestationTransportInBase64: "",
      pdfContent: null,

      documentToSend: {
        datas: [],
      },

      attestationTransportDocumentModel: {
        compagnieTransportRaisonSociale: null,
        typeDocument: null,
        content: null,
        typeMime: null,
      },
    };
  },

  methods: {
    convertirEnBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.attestationTransportInBase64 = e.target.result;
      };
    },

    // ENVOYER DOCUMENT DE TRANSPORT
    async sendAttestationTransport() {
      this.overlay = true;
      this.attestationTransportDocumentModel.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.attestationTransportDocumentModel.typeDocument =
        "ATTESTATION_TRANSPORT";
      this.attestationTransportDocumentModel.content =
        this.attestationTransportInBase64.split(",")[1];
      this.attestationTransportDocumentModel.typeMime = "FORMAT_PDF";
      this.documentToSend.datas.push(this.attestationTransportDocumentModel);
      await axios
        .post(API_SEND_DOCUMENTS, this.documentToSend, {
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
              this.documentToSend.datas = [];
              this.attestationTransportSelected = null;
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.documentToSend.datas = [];
              this.attestationTransportSelected = null;
            }
          } else {
            this.errorMsg = "Impossible de soumettre le document";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.documentToSend.datas = [];
            this.attestationTransportSelected = null;
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 3000);
          this.documentToSend.datas = [];
          this.attestationTransportSelected = null;
        })
        .finally(() => {
          this.overlay = false;
        });
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 15px;
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

.alert-warning {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}
</style>
