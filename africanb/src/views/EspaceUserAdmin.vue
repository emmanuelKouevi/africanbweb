<template>
  <v-app id="inspire">
    <v-navigation-drawer app v-model="drawer" width="400">
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-if="logoCompagnieUrl == null" src=""></v-img>
          <v-img v-else :src="logoCompagnieUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-title class="text-h6 font-weight-thin">{{
          $store.state.userAuthentified.compagnieTransportRaisonSociale
        }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          link
          @click="$router.push({ path: '/tableauBord' }).catch(() => {})"
        >
          <v-list-item-icon>
            <v-avatar size="25">
              <v-img src="../assets/dashboard.png"></v-img>
            </v-avatar>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="list-item-title"
              >Tableau de bord</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div
        v-if="
          $store.state.userAuthentified.roleCode ==
          'RoleUtiGareCompagnieTransport'
        "
      >
        <v-list
          dense
          nav
          v-for="menu in buildComponentFromFunctionnalities"
          :key="menu.title"
        >
          <div v-if="menu.items == undefined">
            <v-list-item
              link
              @click="$router.push({ path: menu.navigation }).catch(() => {})"
            >
              <v-list-item-icon>
                <v-avatar size="25">
                  <v-img :src="menu.url"></v-img>
                </v-avatar>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="list-item-title">{{
                  menu.title.toUpperCase()
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>

          <div v-else>
            <div v-if="menu.items.length > 1">
              <v-list-group no-action>
                <template v-slot:activator>
                  <v-list-item-icon>
                    <v-avatar size="25">
                      <v-img :src="menu.url"></v-img>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-content
                    ><v-list-item-title class="list-item-title">{{
                      menu.title
                    }}</v-list-item-title></v-list-item-content
                  >
                </template>

                <v-list-item
                  link
                  v-for="child in menu.items"
                  :key="child.title"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="list-item-title"
                      @click="
                        $router.push({ path: child.navigation }).catch(() => {})
                      "
                      >{{ child.title }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </div>
          </div>
        </v-list>
      </div>

      <div v-else>
        <v-list
          dense
          nav
          v-for="menu in buildComponentFromFunctionnalities"
          :key="menu.title"
        >
          <div v-if="menu.items == undefined">
            <v-list-item
              link
              @click="$router.push({ path: menu.navigation }).catch(() => {})"
            >
              <v-list-item-icon>
                <v-avatar size="25">
                  <v-img :src="menu.url"></v-img>
                </v-avatar>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="list-item-title">{{
                  menu.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>

          <div v-else>
            <div v-if="menu.items.length > 1">
              <v-list-group no-action>
                <template v-slot:activator>
                  <v-list-item-icon>
                    <v-avatar size="25">
                      <v-img :src="menu.url"></v-img>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-content
                    ><v-list-item-title class="list-item-title">{{
                      menu.title
                    }}</v-list-item-title></v-list-item-content
                  >
                </template>

                <v-list-item
                  link
                  v-for="child in menu.items"
                  :key="child.title"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="list-item-title"
                      @click="
                        $router.push({ path: child.navigation }).catch(() => {})
                      "
                      >{{ child.title }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </div>
          </div>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar app color="white">
      <v-app-bar-nav-icon
        color="dark"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img
          max-height="50px"
          max-width="75px"
          src="../assets/UB.jpg"
        ></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu
        v-model="menuNotification"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="transparent" v-bind="attrs" v-on="on"
            ><v-badge color="green" overlap value="messages">
              <v-icon color="black" large> mdi-bell </v-icon>
            </v-badge></v-btn
          >
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="simple_title"
                  >Mes Notifications</v-list-item-title
                >
                <v-list-item-subtitle class="simple_title"
                  >Notifications récentes</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-text>
            <span class="text-center">Vous n'avez aucune notifications</span>
          </v-card-text>
        </v-card> </v-menu
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <v-menu
        v-model="menuProfil"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="transparent" v-bind="attrs" v-on="on"
            ><v-avatar size="45">
              <v-img :src="$store.state.pictureProfilUser"></v-img></v-avatar
          ></v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="simple_title"
                  >{{ $store.state.userAuthentified.prenoms }}
                  {{ $store.state.userAuthentified.nom }}</v-list-item-title
                >
                <v-list-item-subtitle class="simple_title">{{
                  $store.state.userAuthentified.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item
              link
              @click="
                $router
                  .push({ name: 'userProfilCompagnieTransport' })
                  .catch(() => {})
              "
            >
              <v-list-item-icon>
                <v-icon>mdi-account-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title
                ><span class="simple_title">Mon profil</span></v-list-item-title
              >
            </v-list-item>

            <v-list-item
              link
              @click="
                $router
                  .push({ name: 'resetPasswordCompagnieTransport' })
                  .catch(() => {})
              "
            >
              <v-list-item-icon>
                <v-icon>mdi-account-key</v-icon>
              </v-list-item-icon>
              <v-list-item-title
                ><span class="simple_title"
                  >Changer le mot de passe</span
                ></v-list-item-title
              >
            </v-list-item>

            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-dialog v-model="dialogLogout" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item-title
                    v-on="on"
                    v-bind="attrs"
                    class="simple_title"
                    >Déconnexion</v-list-item-title
                  >
                </template>
                <v-card>
                  <v-card-title class="text-h5"
                    >Voulez-vous vraiment vous déconnecter ?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialogLogout = false" text
                      >Annuler</v-btn
                    >
                    <v-btn color="primary" @click="logout" text>Accepter</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main class="content_router">
      <!-- Provides the application the proper gutter -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import {
  API_GET_DOCUMENT_URL,
  API_GET_FUNCTIONNALITY_BY_ROLE,
  HEADERS,
  LISTEN_URL_NOTIFICATION,
} from "../components/globalConfig/globalConstConfig";
import $ from "jquery";
import {
  FUNCTIONNALITY_MANAGE_OFFRE_VOYAGE,
  FUNCTIONNALITY_MANAGE_STATION,
  FUNCTIONNALITY_MANAGE_BUS,
  FUNCTIONNALITY_MANAGE_RESERVATION_TICKET,
  FUNCTIONNALITY_MANAGE_SUBSCRIPTION_AND_PAYMENT,
  FUNCTIONNALITY_MANAGE_LOCALISATION,
  FUNCTIONNALITY_MANAGE_USERS,
  FUNCTIONNALITY_MANAGE_ROLE_AND_FUNCTIONNALITY,
  FUNCTIONNALITY_MANAGE_ADHESION,
  FUNCTIONNALITY_MANAGE_STRATEGIE_BAGAGE,
  FUNCTIONNALITY_MANAGE_DOCUMENT,
  FUNCTIONNALITY_GESTION_CAISSE,
  FUNCTIONNALITY_MANAGE_NOTIFICATION,
} from "../components/globalConfig/constFunctionnalies";
let sseClient;
export default {
  name: "EspaceUI",
  data() {
    return {
      menuProfil: false,
      menuNotification: false,
      dialogLogout: false,
      mini: true,
      drawer: true,
      functionnalitiesListByUserRole: [],
      functionnalitiesListComponents: [],

      photoProfilObject: {
        data: {
          typeDocument: null,
        },
      },

      messages: [],

      logoCompagnieTransport: {
        data: {
          typeDocument: null,
          compagnieTransportRaisonSociale: null,
        },
      },

      photoProfilUrl: null,
      logoCompagnieUrl: null,
    };
  },

  methods: {
    // Retrieve notification from sse server connect
    checkNotification() {
      sseClient = this.$sse.create({
        url: LISTEN_URL_NOTIFICATION("COMPAGNIE"),
        format: "json",
        polyfill: true,
      });

      sseClient.on("error", (e) => {
        console.error("lost connection or failed to parse!", e);

        // If this error is due to an unexpected disconnection, EventSource will
        // automatically attempt to reconnect indefinitely. You will _not_ need to
        // re-add your handlers.
      });

      // Handle messages without a specific event
      sseClient.on("message", this.handleMessage);

      // Handle 'chat' messages
      sseClient.on("chat", this.handleChat);

      // Handle once for a ban message
      sseClient.once("ban", this.handleBan);

      sseClient
        .connect()
        .then((sse) => {
          console.log(sse);
          console.log("We're connected!");

          // Unsubscribes from event-less messages after 7 seconds
          /*setTimeout(() => {
            sseClient.off("message", this.handleMessage);
            console.log("Stopped listening to event-less messages!");
          }, 7000);

          // Unsubscribes from chat messages after 14 seconds
          setTimeout(() => {
            sse.off("chat", this.handleChat);
            console.log("Stopped listening to chat messages!");
          }, 14000);*/
        })
        .catch((err) => {
          // When this error is caught, it means the initial connection to the
          // events server failed.  No automatic attempts to reconnect will be made.
          console.error("Failed to connect to server", err);
        });
    },

    handleBan(banMessage) {
      console.log(banMessage);
      // Note that we can access properties of message, since our parser is set to JSON
      // and the hypothetical object has a `reason` property.
      this.messages.push(`You've been banned! Reason: ${banMessage.reason}`);
    },
    handleChat(message) {
      console.log(message);
      // Note that we can access properties of message, since our parser is set to JSON
      // and the hypothetical object has these properties.
      this.messages.push(`${message.user} said: ${message.text}`);
    },
    handleMessage(message, lastEventId) {
      console.log(message);
      console.log(lastEventId);
      console.warn("Received a message w/o an event!", message, lastEventId);
    },
    beforeDestroy() {
      console.log("Nous sommes dans la destruction du sse");
      // Make sure to close the connection with the events server
      // when the component is destroyed, or we'll have ghost connections!
      sseClient.disconnect();
      console.log("Après destruction");

      // Alternatively, we could have added the `sse: { cleanup: true }` option to our component,
      // and the SSEManager would have automatically disconnected during beforeDestroy.
    },

    // Get user profil picture.
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
              this.$store.commit(
                "UPDATE_PICTURE_PROFIL",
                response.data.item.url
              );
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
      this.logoCompagnieTransport.data.typeDocument = "LOGO";
      this.logoCompagnieTransport.data.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.loading = true;
      await axios
        .post(API_GET_DOCUMENT_URL, this.logoCompagnieTransport, {
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

    // RECUPERER LES DONNNES DE L'UTILISATEUR CONNECTÉ POUR LA SAUVEGARDE DE SA SESSION
    storeSessionUser() {
      if (localStorage.getItem("token_user")) {
        const userConnected = JSON.parse(localStorage.getItem("token_user"));
        this.$store.state.userAuthentified = userConnected;
      }
    },

    //RECUPERER LA LISTE DES FONCTIONNALITÉS PAR ROLE UTILISATEURS
    async getAllFunctionnalitiesByUserRole() {
      this.storeSessionUser();
      await axios
        .post(
          API_GET_FUNCTIONNALITY_BY_ROLE,
          { data: { code: this.$store.state.userAuthentified.roleCode } },
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.functionnalitiesListByUserRole = response.data.items;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Bloquer la session de l'utilisateur
    destroyLocalSession() {
      if (localStorage.getItem("token_user")) {
        localStorage.removeItem("token_user");
        localStorage.setItem("auth", false);
      }
    },

    // METHODE PERMETTANT À UN UTILISATEUR DE SE DECONNECTER
    logout() {
      this.destroyLocalSession();
      this.$store.commit("DESTROY_SESSION_USER");
      this.$router.replace("/");
    },

    checkIfFunctionnalityExist(functionnality) {
      var exist = false;
      this.functionnalitiesListByUserRole.forEach((element) => {
        if (element.funct == functionnality) {
          exist = true;
        }
      });
      return exist;
    },
  },

  computed: {
    buildComponentFromFunctionnalities() {
      var globalFunctionnalities = [];

      this.functionnalitiesListByUserRole.forEach((element) => {
        if (element.code == FUNCTIONNALITY_MANAGE_SUBSCRIPTION_AND_PAYMENT) {
          var manageSubscription = {
            title: "Gestion des abonnements et paiments",
            url: require("@/assets/souscription.png"),
            items: [
              {
                title: "Creer un mode abonnement",
                navigation: "/creerModeAbonnement",
              },
              {
                title: "Creer un mode de paiement",
                navigation: "/creerModePaiement",
              },
              {
                title: "Liste des abonnements et paiements",
                navigation: "/selectionnerModeAbonnementEtPaiement",
              },
            ],
          };
          globalFunctionnalities.push(manageSubscription);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_STATION) {
          var manageStation = {
            title: "Gestion des gares de transport",
            url: require("@/assets/station.png"),
            items: [
              {
                title: "Nouvelle de gare de transport",
                url: "mdi-train-car",
                navigation: "/creerGareCompagnieTransport",
              },
              {
                title: "Liste des gares disponibles",
                url: require("../assets/liste.png"),
                navigation: "/selectionnerGareCompagnieTransport",
              },
            ],
          };
          globalFunctionnalities.push(manageStation);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_BUS) {
          var manageBus = {
            title: "Gestion des bus",
            url: require("@/assets/bus.png"),
            items: [
              {
                title: "Nouveau bus",
                navigation: "/associerBusCompagnieTransport",
              },
              {
                title: "Liste des bus disponibles",
                navigation: "/selectionnerBusCompagnieTransport",
              },
            ],
          };
          globalFunctionnalities.push(manageBus);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_OFFRE_VOYAGE) {
          var manageOffreVoyage = {
            title: "Gestion des offres de voyage",
            url: require("@/assets/route.png"),
            items: [
              {
                title: "Creer une offre de voyage",
                navigation: "/creerOffreVoyage",
              },
              {
                title: "Liste des offres de voyage",
                navigation: "/selectionnerOffreVoyage",
              },
              {
                title: "Planifier une offre de voyage",
                navigation: "/planifierOffreVoyage",
              },
            ],
          };
          globalFunctionnalities.push(manageOffreVoyage);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_RESERVATION_TICKET) {
          var manageReservationTicket = {
            title: "Gestion des billets de reservation",
            url: require("@/assets/billets.png"),
            items: [
              {
                title: "Réserver un billet de voyage",
                navigation: "/selectionnerOffreVoyageReservation",
              },
              {
                title: "Voir les réservations",
                navigation: "/selectionnerReservationBillet",
              },
              {
                title: "Vérifier un billet de voyage",
                navigation: "/verifierBilletReservation",
              },
              {
                title: "Confirmer un billet de voyage",
                navigation: "/confirmerBilletReservation",
              },
            ],
          };
          globalFunctionnalities.push(manageReservationTicket);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_RESERVATION_TICKET) {
          var manageBags = {
            title: "Gestion des bagages",
            url: require("@/assets/bus.png"),
            items: [
              {
                title: "Enregistrement de bagages",
                navigation: "/SearchTicket",
              },
              {
                title: "Suivi des bagages",
                navigation: "/SuiviDesBagages",
              },
            ],
          };
          globalFunctionnalities.push(manageBags);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_LOCALISATION) {
          var createlocation = {
            title: "Localité",
            url: "",
            items: [
              {
                title: "Ajouter une ville",
                navigation: "/creerVille",
              },
              {
                title: "Ajouter un pays",
                navigation: "/creerPays",
              },
              {
                title: "Liste des villes",
                navigation: "/selectionnerVille",
              },
              {
                title: "Liste des pays",
                navigation: "/selectionnerPays",
              },
            ],
          };

          globalFunctionnalities.push(createlocation);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_USERS) {
          var createUserFunction = {
            title: "Gestion des comptes utilisateurs",
            url: require("@/assets/partners.png"),
            items: [
              {
                title: "Creer un compte utilisateur",
                navigation: "/creerUtilisateur",
              },
              {
                title: "Liste des comptes",
                navigation: "/selectionnerUtilisateur",
              },
            ],
          };

          globalFunctionnalities.push(createUserFunction);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_ROLE_AND_FUNCTIONNALITY) {
          var createRoleAndFunctionnality = {
            title: "Gestion des rôles et fonctionnalités",
            url: "",
            items: [
              {
                title: "Ajouter une fonctionnalité",
                navigation: "/creerFonctionnalite",
              },
              {
                title: "Ajouter un rôle utilisateur",
                navigation: "/creerRoleUtilisateur",
              },

              {
                title: "Liste des roles et fonctionnalités",
                navigation: "/gestionFonctionnalitesEtRoles",
              },
            ],
          };

          globalFunctionnalities.push(createRoleAndFunctionnality);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_STRATEGIE_BAGAGE) {
          var createStrategieBagageFunctionality = {
            title: "Gestion des strategies de bagages",
            url: require("@/assets/bagages.png"),
            items: [
              {
                title: "Creer une strategie",
                navigation: "/creerStrategieBagage",
              },
              {
                title: "Liste des strategies",
                navigation: "/SelectionnerStrategieBagage",
              },
            ],
          };

          globalFunctionnalities.push(createStrategieBagageFunctionality);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_DOCUMENT) {
          var manageDocumentFunctionality = {
            title: "Gestion des documents",
            url: require("@/assets/timbre.png"),
            items: [
              {
                title: "Attestation de transport",
                navigation: "/attestationTransport",
              },
              {
                title: "Logo de la compagnie",
                navigation: "/imageCompagnieTransport",
              },
              {
                title: "Liste des documents",
                navigation: "/Liste des documents",
              },
            ],
          };

          globalFunctionnalities.push(manageDocumentFunctionality);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_NOTIFICATION) {
          var functionManageNotification = {
            title: "Gestion des notifications",
            url: "",
            items: [
              {
                title: "Envoyer une notification",
                navigation: "/send-notification",
              },
              {
                title: "Liste des notifications",
                navigation: "/all-notifications-sended",
              },
            ],
          };

          globalFunctionnalities.push(functionManageNotification);
        }

        if (element.code == FUNCTIONNALITY_GESTION_CAISSE) {
          var functionGestionCaisse = {
            title: "Gestion des caisses",
            url: "",
            items: [
              {
                title: "Créer une transaction",
                navigation: "/create-new-transaction",
              },
              {
                title: "Consulter l'état de caisses",
                navigation: "/check-state-wallet",
              },
            ],
          };

          globalFunctionnalities.push(functionGestionCaisse);
        }

        if (element.code == FUNCTIONNALITY_MANAGE_ADHESION) {
          var adhesionFunction = {
            title: "Gestion des adhésions",
            url: "",
            items: [
              {
                title: "Créer une adhésion",
                navigation: "/CreerAdhesionAdmin",
              },
              {
                title: "Liste des demandes d'adhésions",
                navigation: "/selectionnerDemandeAdhesionCompagnie",
              },
            ],
          };

          globalFunctionnalities.push(adhesionFunction);
        }

        // ==============================================================================================================================================//
      });

      return globalFunctionnalities;
    },
  },

  mounted() {
    this.getUrlPhotoProfil();
    this.getUrlLogoCompagnie();
    this.getAllFunctionnalitiesByUserRole();
    this.checkNotification();
  },

  beforeDestroy() {
    // Close the SSE connection when the component is destroyed
    if (this.eventSource) {
      this.eventSource.close();
    }
  },
};
</script>

<style scoped>
.content_router {
  padding-top: 70px;
}

.lang {
  color: white;
}

.list-item-title {
  font-family: "Montserrat";
  font-size: 20px;
}

.simple_title {
  font-family: "Montserrat";
}
</style>
