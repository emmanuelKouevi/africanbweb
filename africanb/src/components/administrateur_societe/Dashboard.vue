<template>
  <v-app>
    <v-container fluid>
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
        <div class="col-sm">
          <v-card rounded="lg" color="#474787" class="count-books">
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

        <div class="col-sm">
          <v-card rounded="lg" color="#218c74">
            <v-card-title
              ><span class="card-title-text">Offres actives</span></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">17 </span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-sm">
          <v-card rounded="lg" color="#596275">
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

        <div class="col-sm">
          <v-card rounded="lg" color="#c23616">
            <v-card-title
              ><span class="card-title-text">Villes</span></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">350</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-sm">
          <v-card rounded="lg" color="#0be881" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >Total Réservation</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">250</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-sm">
          <v-card rounded="lg" color="#e056fd">
            <v-card-title
              ><span class="card-title-text"
                >Caisse actuelle</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">10.589.145 </span
                  >&nbsp;&nbsp;<span class="cfa">FCFA</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-sm">
          <v-card rounded="lg" color="#c44569">
            <v-card-title
              ><span class="card-title-text"
                >Offres Disponibles</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">231</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-sm">
          <v-card rounded="lg" color="#f78fb3">
            <v-card-title
              ><span class="card-title-text">Remboursement</span></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">55.455</span
                  >&nbsp;&nbsp;<span class="cfa">FCFA</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-sm">
          <v-card hover rounded="lg">
            <v-card-title
              ><span class="titre"
                >Reservations par compagnies</span
              ></v-card-title
            >
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><v-icon dense color="#574b90">mdi-circle</v-icon
                        >&nbsp;&nbsp;#1 STC Transport :</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><span class="font-weight-bold">100</span
                        >&nbsp;&nbsp;<span
                          >Réservations</span
                        ></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>

                <v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><v-icon dense color="#574b90">mdi-circle</v-icon
                        >&nbsp;&nbsp;#2 UTB Transport:</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><span class="font-weight-bold">54</span
                        >&nbsp;&nbsp;<span
                          >Réservations</span
                        ></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>

                <v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><v-icon dense color="#574b90">mdi-circle</v-icon
                        >&nbsp;&nbsp;#3 Masshalah
                        Transport:</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><span class="font-weight-bold">110</span
                        >&nbsp;&nbsp;<span
                          >Réservations</span
                        ></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <v-card rounded="lg" color="#95afc0" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >TOTAL DES VENTES</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">7.456.248</span
                  >&nbsp;<small class="font-weight-bold cfa">FCFA</small>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn text x-small
                ><span class="cfa">Plus de détails</span></v-btn
              >
            </v-card-actions>
          </v-card>
        </div>

        <div class="col-lg-6">
          <v-card rounded="lg" color="#f9ca24">
            <v-card-title
              ><span class="card-title-text"
                >Offres en cours</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">4</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8">
          <v-card hover rounded="lg">
            <v-card-title
              ><span class="titre">Offres de voyages</span></v-card-title
            >
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><v-icon dense color="#2c2c54">mdi-circle</v-icon
                        >&nbsp;&nbsp;Propriété offre de voyage
                        :</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><span class="font-weight-bold">19</span
                        >&nbsp;&nbsp;<span
                          >Propriétés</span
                        ></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>

                <v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><v-icon dense color="#ffb142">mdi-circle</v-icon
                        >&nbsp;&nbsp;Mode de paiements:</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><span class="font-weight-bold">6</span
                        >&nbsp;&nbsp;<span
                          >Mode de paiements définis</span
                        ></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>

                <v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><v-icon dense color="#ff5252">mdi-circle</v-icon
                        >&nbsp;&nbsp;Offres non
                        programmées:</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><span class="font-weight-bold">54</span
                        >&nbsp;&nbsp;</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-4">
          <v-card rounded="lg" color="#2f3640">
            <v-card-title
              ><span class="card-title-text"
                >TOTAL DES GARES</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">17</span>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn x-small text
                ><span class="btn-libelle">consulter</span></v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8">
          <v-card>
            <v-card-title
              ><span class="titre">Offres récentes</span>
              <v-spacer></v-spacer>
              <v-btn text x-small>Plus d'actions</v-btn>
            </v-card-title>
            <v-card-text>
              <v-data-table :headers="headers"></v-data-table>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-4">
          <v-card>
            <v-card-title
              ><span class="titre">Vendeurs par compagnies</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Vendeur #1 :</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><span class="font-weight-bold"
                          >Kouevi Ayite</span
                        ></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>

                <v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Vendeur #2:</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        ><span class="font-weight-bold">N'Doma Emmanuella</span
                        >&nbsp;&nbsp;</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>
              </v-list>
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
  name: "DashboardMainAdmin",

  data() {
    return {
      headers: [],

      photoProfilObject: {
        data: {
          typeDocument: null,
        },
      },

      photoProfilUrl: null,
    };
  },

  methods: {
    // RECUPERER LA PHOTO DE PROFIL DE L'UTILISATEUR
    async getUrlPhotoProfil() {
      this.photoProfilObject.data.typeDocument = "PHOTO_PROFIL";
      this.loading = true;
      await axios
        .post(API_GET_DOCUMENT_URL, this.photoProfilObject, {
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
              this.photoProfilUrl = response.data.item.url;
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
  font-size: 13px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

.libelle {
  color: white;
  font-size: 20px;
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
