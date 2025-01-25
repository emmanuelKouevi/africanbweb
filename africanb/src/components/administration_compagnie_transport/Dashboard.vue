<template>
  <v-app id="inspire">
    <v-container>
      <div class="row justify-space-evenly">
        <div class="col-lg-1">
          <v-avatar size="72">
            <v-img
              v-if="photoProfilUrl == null"
              src="@/assets/avatar.png"
            ></v-img>
            <v-img v-else :src="photoProfilUrl"></v-img>
          </v-avatar>
        </div>
        <div class="col-lg-4">
          <div class="row">
            <span class="greeting"
              >Bienvenue, {{ $store.state.userAuthentified.nom }}</span
            >
          </div>
          <div class="row">
            <span class="last_connexion"
              >Dernière connexion le:
              {{ $store.state.userAuthentified.lastConnection }}</span
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >Offres de voyages</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">15</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text">Offres actives</span></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">2 </span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text"
                >Offres Inactives</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">5</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text">Villes</span></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">147</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <v-card rounded="lg" elevation="5" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >Total des ventes</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold"
                    >1.650.145
                    <small class="font-weight-bold">FCFA</small></span
                  >&nbsp;
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-6">
          <v-card rounded="lg" elevation="5" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >Distributeurs (Vendeurs)</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">4 </span>&nbsp;
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import {
  API_GET_DOCUMENT_URL,
  HEADERS,
} from "../globalConfig/globalConstConfig";
import axios from "axios";
import $ from "jquery";
export default {
  name: "DashboardAdminTransportCompanie",

  data() {
    return {
      search: "",
      loading: true,
      headers: [
        { text: "Designation", value: "" },
        { text: "Type ,de l'offre", value: "" },
        { text: "Départ", value: "" },
        { text: "Destination", value: "" },
      ],

      reservationList: [],

      photoProfilObject: {
        data: {
          typeDocument: null,
        },
      },

      photoProfilUrl: null,
    };
  },

  methods: {
    async getUrlPhotoProfil() {
      console.log("Nous sommes dans la fonction");
      this.photoProfilObject.data.typeDocument = "PHOTO_PROFIL";
      this.loading = true;
      await axios
        .post(API_GET_DOCUMENT_URL, this.photoProfilObject, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.photoProfilUrl = response.data.item.url;
              console.log(this.photoProfilUrl);
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
    this.getUrlPhotoProfil();
  },
};
</script>

<style scoped>
.greeting {
  font-size: 23px;
  word-spacing: 2px;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: "Montserrat";
}

.last_connexion {
  font-family: "Montserrat";
  opacity: 0.7;
}

.card-title-text {
  font-size: 17px;
  letter-spacing: 1.9px;
  font-family: "Montserrat";
  color: #2d3436;
  opacity: 0.9;
  font-weight: bold;
}

.libelle {
  color: black;
  opacity: 0.8;
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
}

.cfa {
  color: white;
}

.btn-libelle {
  text-decoration: underline;
  color: white;
}

.titre {
  font-weight: 15px;
  font-weight: bold;
  color: #2f3640;
}

.cfa {
  color: white;
}
</style>
