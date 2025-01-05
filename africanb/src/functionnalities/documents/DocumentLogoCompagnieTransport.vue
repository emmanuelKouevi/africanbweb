<template>
  <v-app>
    <div class="container">
      <div class="row">
        <span class="font-weight-bold title"
          >LOGO DE LA COMPAGNIE DE TRANSPORT</span
        >
        <v-subheader
          >Insérer le logo de votre compagnie qui sera visible par les
          utilisateurs</v-subheader
        ><br />
      </div>

      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title>
              <v-avatar size="85" color="grey">
                <v-img :src="logoTransportInBase64"></v-img>
              </v-avatar>
            </v-card-title>
            <v-card-text>
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <v-file-input
                        class="input"
                        @change="convertirEnBase64"
                        v-model="logoTransportSelected"
                        show-size
                        outlined
                        accept="image/jpeg, image/png"
                        dense
                        placeholder="logo de la compagnie"
                      ></v-file-input>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <v-btn
                      :disabled="logoTransportSelected == null"
                      color="success"
                      outlined
                      @click="sendLogoTransport()"
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
  name: "LogoCompagnieTransport",

  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: false,

      logoTransportSelected: null,
      logoTransportInBase64: "",

      documentToSend: {
        datas: [],
      },

      logoTransportDocumentModel: {
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
        this.logoTransportInBase64 = e.target.result;
      };
    },

    returnTypeMime(file) {
      var formatTypeMime = "";
      if (file.type == "image/png") {
        formatTypeMime = "FORMAT_PNG";
      }
      if (file.type == "image/jpeg") {
        formatTypeMime = "FORMAT_PNG";
      }
      if (file.type == "image/gif") {
        formatTypeMime = "FORMAT_GIF";
      }
      if (file.type == "application/pdf") {
        formatTypeMime = "FORMAT_PDF";
      }
      return formatTypeMime;
    },

    // ENVOYER DOCUMENT DE TRANSPORT
    async sendLogoTransport() {
      this.overlay = true;
      this.logoTransportDocumentModel.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.logoTransportDocumentModel.typeDocument = "LOGO";
      this.logoTransportDocumentModel.content =
        this.logoTransportInBase64.split(",")[1];
      this.logoTransportDocumentModel.typeMime = this.returnTypeMime(
        this.logoTransportSelected
      );
      this.documentToSend.datas.push(this.logoTransportDocumentModel);
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
              this.logoTransportSelected = null;
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.documentToSend.datas = [];
              this.logoTransportSelected = null;
            }
          } else {
            this.errorMsg = "Impossible de soumettre le document";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.documentToSend.datas = [];
            this.logoTransportSelected = null;
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 3000);
          this.documentToSend.datas = [];
          this.logoTransportSelected = null;
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
