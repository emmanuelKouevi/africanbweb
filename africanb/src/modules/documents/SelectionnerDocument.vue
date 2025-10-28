<template>
  <v-app>
    <div class="container">
      <div class="row">
        <v-card>
          <v-card-title
            ><span class="document_title"
              >VOS DOCUMENTS ENREGISTRÉS</span
            ></v-card-title
          >
          <v-card-text>
            <div class="container">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>IDENTIFIANT</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle
                      >TYPE DU DOCUMENT</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle>ACTIONS</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold"
                      >Document n°1</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold"
                      >Attestation de Transport</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      ><v-btn
                        text
                        color="primary"
                        small
                        @click="redirectToUrl(attestationTransportUrl)"
                        >Aperçu</v-btn
                      ></v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold"
                      >Document n°2</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold"
                      >Logo de la compagnie</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      ><v-btn
                        text
                        color="primary"
                        small
                        @click="redirectToUrl(logoCompagnieUrl)"
                        >Aperçu</v-btn
                      ></v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import {
  API_GET_DOCUMENT_BASE64,
  API_GET_DOCUMENT_URL,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import $ from "jquery";

export default {
  name: "SelectionnerDocument",
  data() {
    return {
      errorMsg: null,
      loading: true,
      search: "",
      headers: [
        { text: "Document", value: "ATTESTATION_TRANSPORT" },
        { text: "url", value: "url" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      documentList: [],

      attestationTransportUrl: null,
      attestationTransportBase: null,

      logoCompagnieUrl: null,

      attestationDocumentObject: {
        data: {
          typeDocument: null,
          compagnieTransportRaisonSociale: null,
        },
      },

      logoDocumentObject: {
        data: {
          typeDocument: null,
          compagnieTransportRaisonSociale: null,
        },
      },
    };
  },

  methods: {
    redirectToUrl(url) {
      window.open(url, "_blank", "fullscreen=yes");
    },

    // Obtenir l'url des documents
    async getUrlAttesationDocument() {
      this.attestationDocumentObject.data.typeDocument =
        "ATTESTATION_TRANSPORT";
      this.attestationDocumentObject.data.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.loading = true;
      await axios
        .post(API_GET_DOCUMENT_URL, this.attestationDocumentObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.attestationTransportUrl = response.data.item.url;
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

    async getUrlLogoCompagnie() {
      this.logoDocumentObject.data.typeDocument = "LOGO";
      this.logoDocumentObject.data.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.loading = true;
      await axios
        .post(API_GET_DOCUMENT_URL, this.logoDocumentObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.logoCompagnieUrl = response.data.item.url;
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

    async getBase64AttesationDocument() {
      this.attestationDocumentObject.data.typeDocument =
        "ATTESTATION_TRANSPORT";
      this.attestationDocumentObject.data.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.loading = true;
      await axios
        .post(API_GET_DOCUMENT_BASE64, this.attestationDocumentObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.attestationTransportBase = response.data.item.content;
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
    this.getUrlAttesationDocument();
    this.getUrlLogoCompagnie();
    this.getBase64AttesationDocument();
  },
};
</script>

<style scoped>
.document_title {
  font-size: 18px;
  font-weight: bold;
  font-family: "Montserrat";
  word-spacing: 3px;
  letter-spacing: 2px;
}
</style>
