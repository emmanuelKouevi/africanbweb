<template>
  <v-app id="inspire">
    <v-navigation-drawer app v-model="drawer" width="350">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 font-weight-thin">{{
            $store.state.userAuthentified.compagnieTransportRaisonSociale
          }}</v-list-item-title>
          <v-list-item-subtitle>Société AFRICANB</v-list-item-subtitle>
        </v-list-item-content>
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
              >TABLEAU DE BORD</v-list-item-title
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
                  <!--<v-list-item-icon>
                    <v-avatar size="25" color="teal">
                      <v-img :src="child.url"></v-img>
                    </v-avatar>
                  </v-list-item-icon>-->
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

          <!--<div v-if="menu.items.length > 1">
            <v-list-group
              v-for="item in menu.items"
              :key="item.title"
              v-model="item.active"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content
                  ><v-list-item-title class="list-item-title">{{
                    item.title
                  }}</v-list-item-title></v-list-item-content
                >
              </template>

              <v-list-item link v-for="child in item.items" :key="child.title">
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
          </div>--->
        </v-list>
      </div>

      <!--<div
        v-else-if="
          $store.state.userAuthentified.roleCode ==
          'RoleAdminCompagnieTransport'
        "
      >
        <v-list nav dense>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content
                ><v-list-item-title class="list-item-title">{{
                  item.title
                }}</v-list-item-title></v-list-item-content
              >
            </template>

            <v-list-item link v-for="child in item.items" :key="child.title">
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
        </v-list>
      </div>-->

      <!--<div
        v-else-if="
          $store.state.userAuthentified.roleCode ==
          'RoleAdminCompagnieTransport'
        "
      >
        <v-list
          dense
          nav
          v-for="menu in buildComponentFromFunctionnalities"
          :key="menu.title"
        >
          <v-list-item
            link
            @click="$router.push({ path: menu.navigation }).catch(() => {})"
          >
            <v-list-item-icon>
              <v-icon color="teal">{{ menu.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="list-item-title">{{
                menu.title.toUpperCase()
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>-->
      <!--<v-list nav dense v-else>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content
              ><v-list-item-title class="list-item-title">{{
                item.title
              }}</v-list-item-title></v-list-item-content
            >
          </template>

          <v-list-item link v-for="child in item.items" :key="child.title">
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
      </v-list>-->
      <!--
      <v-list
        dense
        nav
        v-for="menu in buildComponentFromFunctionnalities"
        :key="menu.title"
      >
        <v-list-item
          link
          @click="$router.push({ path: menu.navigation }).catch(() => {})"
        >
          <v-list-item-icon>
            <v-icon color="teal">{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="list-item-title">{{
              menu.title.toUpperCase()
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      -->
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
        v-model="menuProfil"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="transparent" v-bind="attrs" v-on="on"
            ><v-avatar size="30"
              ><v-img src="../assets/undraw_profile.svg"></v-img></v-avatar
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

    <v-main>
      <!-- Provides the application the proper gutter -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import {
  API_GET_FUNCTIONNALITY_BY_ROLE,
  HEADERS,
} from "../components/globalConfig/globalConstConfig";
import {
  FUNCTIONNALITY_RATTACHE_ATTESTION_TRANSPORT,
  FUNCTIONNALITY_CREATE_PROGRAMME_OFFRE_VOYAGE,
  FUNCTIONNALITY_MANAGE_OFFRE_VOYAGE,
  FUNCTIONNALITY_MANAGE_STATION,
  FUNCTIONNALITY_MANAGE_BUS,
  FUNCTIONNALITY_MANAGE_RESERVATION_TICKET,
  FUNCTIONNALITY_MANAGE_SUBSCRIPTION_AND_PAYMENT,
  FUNCTIONNALITY_MANAGE_LOCALISATION,
  FUNCTIONNALITY_MANAGE_USERS,
  FUNCTIONNALITY_MANAGE_ROLE_AND_FUNCTIONNALITY,
  FUNCTIONNALITY_MANAGE_ADHESION,
} from "../components/globalConfig/constFunctionnalies";
import {
  FUNCTIONNALITY_CREATE_USER_FUNCTION,
  FUNCTIONNALITY_CREATE_USER_ROLE,
  FUNCTIONNALITY_CREATE_USER_ACCOUNT,
  FUNCTIONNALITY_DEMANDE_ADHESION,
} from "../components/globalConfig/constFunctionnalies";
import { FUNCTIONNALITY_LIST_ADHESION } from "../components/globalConfig/constFunctionnalies";
import {
  FUNCTIONNALITY_CREATE_CARACTERISTIQUE_OFFRE_VOYAGE,
  FUNCTIONNALITY_CREATE_GARE_TRANSPORT,
} from "../components/globalConfig/constFunctionnalies";
import {
  FUNCTIONNALITY_CREATE_MODE_ABONNEMENT,
  FUNCTIONNALITY_CREATE_MODE_PAIEMENT,
  FUNCTIONNALITY_LISTING_MODE_PAIEMENT,
  FUNCTIONNALITY_TO_CONFIRM_TICKET,
  FUNCTIONNALITY_TO_CHECK_TICKET,
} from "../components/globalConfig/constFunctionnalies";
import {
  FUNCTIONNALITY_RESERVING_FROM_OFFRE_VOYAGE,
  FUNCTIONNALITY_SELECTION_RESERVATION_TICKET,
  FUNCTIONNALITY_MANAGE_ALL_ACCOUNT_USER,
  FUNCTIONNALITY_MANAGING_ROLE_AND_FUNCTIONNALITY,
} from "../components/globalConfig/constFunctionnalies";
export default {
  name: "EspaceUI",
  data() {
    return {
      menuProfil: false,
      dialogLogout: false,
      mini: true,
      drawer: true,
      functionnalitiesListByUserRole: [],
      functionnalitiesListComponents: [],
    };
  },

  methods: {
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
            title: "Abonnement Et Paiement",
            url: require("@/assets/station.png"),
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
            title: "Gare de transport",
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
            title: "Bus",
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
            title: "Offre de voyage",
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
            title: "Billet de réservation",
            url: require("@/assets/route.png"),
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
            title: "Comptes uitlisateurs",
            url: "",
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
            title: "Roles et Fonctionnalités",
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

        if (element.code == FUNCTIONNALITY_MANAGE_ADHESION) {
          var adhesionFunction = {
            title: "Liste des demandes d'adhésion",
            url: "",
            navigation: "/selectionnerDemandeAdhesionCompagnie",
          };
          globalFunctionnalities.push(listAdhesionDisponible);
        }

        // ==============================================================================================================================================//

        if (element.code == FUNCTIONNALITY_RATTACHE_ATTESTION_TRANSPORT) {
          var bindTravelFile = {
            title: "DOCUMENT D'ADHESION",
            url: require("../assets/docs.png"),
            navigation: "/documentAttestationTransport",
          };
          globalFunctionnalities.push(bindTravelFile);
        }

        if (element.code == FUNCTIONNALITY_CREATE_USER_ROLE) {
          var userRoleFunction = {
            title: "GESTION DES ROLES",
            icon: "mdi-account-key",
            navigation: "/creerRoleUtilisateur",
          };
          globalFunctionnalities.push(userRoleFunction);
        }
        if (element.code == FUNCTIONNALITY_CREATE_USER_FUNCTION) {
          var userFunction = {
            title: "AJOUTER DES FONCTIONNALITÉS",
            icon: "mdi-cog",
            navigation: "/creerFonctionnalite",
          };
          globalFunctionnalities.push(userFunction);
        }
        if (element.code == FUNCTIONNALITY_CREATE_USER_ACCOUNT) {
          var userAccountFunction = {
            title: "AJOUTER UN MEMBRE",
            icon: "mdi-account-plus",
            navigation: "/creerUtilisateur",
          };
          globalFunctionnalities.push(userAccountFunction);
        }
        if (element.code == FUNCTIONNALITY_DEMANDE_ADHESION) {
          var demandAdhesionFunction = {
            title: "DEMANDE D'ADHESION",
            url: require("../assets/adhesion.png"),
            navigation: "/creerDemandeAdhesion",
          };
          globalFunctionnalities.push(demandAdhesionFunction);
        }
        if (element.code == FUNCTIONNALITY_CREATE_PROGRAMME_OFFRE_VOYAGE) {
          var offrePlanification = {
            title: "PLANIFICATION DE VOYAGE",
            url: require("@/assets/calendar.png"),
            navigation: "/planifierOffreVoyage",
          };

          globalFunctionnalities.push(offrePlanification);
        }

        if (
          element.code == FUNCTIONNALITY_CREATE_CARACTERISTIQUE_OFFRE_VOYAGE
        ) {
          var createFeatureOffre = {
            title: "PROPRIETE OFFRE DE VOYAGE",
            icon: "mdi-feature-search",
            navigation: "/creerProprieteCaracteristiqueOffreVoyage",
          };
          globalFunctionnalities.push(createFeatureOffre);
        }
        if (element.code == FUNCTIONNALITY_CREATE_GARE_TRANSPORT) {
          var stations = {
            title: "GARES DE TRANSPORT",
            url: require("@/assets/station.png"),
            items: [
              {
                title: "NOUVELLE GARE DE TRANSPORT",
                url: "mdi-train-car",
                navigation: "/creerGareCompagnieTransport",
                funct: "FUNCTIONNALITY_CREATE_OFFRE_VOYAGE",
              },
              {
                title: "LISTE DES GARES DISPONIBLES",
                url: require("../assets/liste.png"),
                navigation: "/selectionnerGareCompagnieTransport",
              },
            ],
          };

          globalFunctionnalities.push(stations);
        }

        if (element.code == FUNCTIONNALITY_CREATE_MODE_ABONNEMENT) {
          var creerModeAbonnement = {
            title: "CREER MODE ABONNEMENT",
            icon: "mdi-bank-transfer-out",
            navigation: "/creerModeAbonnement",
          };
          globalFunctionnalities.push(creerModeAbonnement);
        }
        if (element.code == FUNCTIONNALITY_CREATE_MODE_PAIEMENT) {
          var creerModePaiement = {
            title: "CREER MODE DE PAIEMENT",
            icon: "mdi-account-credit-card",
            navigation: "/creerModePaiement",
          };
          globalFunctionnalities.push(creerModePaiement);
        }
        if (element.code == FUNCTIONNALITY_LIST_ADHESION) {
          var listAdhesionDisponible = {
            title: "LISTE DES DEMANDES D'ADHESION",
            icon: "mdi-account-credit-card",
            navigation: "/selectionnerDemandeAdhesionCompagnie",
          };
          globalFunctionnalities.push(listAdhesionDisponible);
        }
        if (element.code == FUNCTIONNALITY_CREATE_USER_FUNCTION) {
          var creerUserFunctionnality = {
            title: "FONCTIONNALITÉ UTILISATEUR",
            icon: "mdi-account-credit-card",
            navigation: "/creerFonctionnalite",
          };
          globalFunctionnalities.push(creerUserFunctionnality);
        }
        if (element.code == FUNCTIONNALITY_CREATE_USER_ROLE) {
          var creerUserRole = {
            title: "ROLE UTILISATEUR",
            icon: "mdi-account-credit-card",
            navigation: "/creerRoleUtilisateur",
          };
          globalFunctionnalities.push(creerUserRole);
        }
        if (element.code == FUNCTIONNALITY_MANAGING_ROLE_AND_FUNCTIONNALITY) {
          var manageRoleAndFunctionnality = {
            title: "ROLE ET FONCTIONNALITÉ",
            icon: "mdi-account-credit-card",
            navigation: "/gestionFonctionnalitesEtRoles",
          };
          globalFunctionnalities.push(manageRoleAndFunctionnality);
        }
        if (element.code == FUNCTIONNALITY_MANAGE_ALL_ACCOUNT_USER) {
          var manageAllUserAccount = {
            title: "GERER LES COMPTES",
            icon: "mdi-account-credit-card",
            navigation: "/selectionnerUtilisateur",
          };
          globalFunctionnalities.push(manageAllUserAccount);
        }
        if (element.code == FUNCTIONNALITY_LISTING_MODE_PAIEMENT) {
          var gestionPaiementEtAbonnementFunction = {
            title: "MODE ABONNEMENT ET PAIEMENT",
            url: "mdi-cash-sync",
            navigation: "/selectionnerModeAbonnementEtPaiement",
          };
          globalFunctionnalities.push(gestionPaiementEtAbonnementFunction);
        }
        if (element.code == FUNCTIONNALITY_RESERVING_FROM_OFFRE_VOYAGE) {
          var selectingFromTravel = {
            title: "RÉSERVER UN BILLET DE VOYAGE",
            url: require("@/assets/liste.png"),
            navigation: "/selectionnerOffreVoyageReservation",
          };
          globalFunctionnalities.push(selectingFromTravel);
        }
        if (element.code == FUNCTIONNALITY_SELECTION_RESERVATION_TICKET) {
          var managingReservation = {
            title: "VOIR LES RESERVATIONS",
            url: require("@/assets/tickets.png"),
            navigation: "/selectionnerReservationBillet",
          };
          globalFunctionnalities.push(managingReservation);
        }
        if (element.code == FUNCTIONNALITY_TO_CONFIRM_TICKET) {
          var confirmTicketReservation = {
            title: "CONFIRMER UN BILLET DE VOYAGE",
            url: require("@/assets/coche.png"),
            navigation: "/confirmerBilletReservation",
          };
          globalFunctionnalities.push(confirmTicketReservation);
        }
        if (element.code == FUNCTIONNALITY_TO_CHECK_TICKET) {
          var checkTicketReservation = {
            title: "VERIFIER UN BILLET DE VOYAGE",
            url: require("@/assets/verification.png"),
            navigation: "/verifierBilletReservation",
          };
          globalFunctionnalities.push(checkTicketReservation);
        }
      });
      return globalFunctionnalities;
    },
  },

  mounted() {
    this.getAllFunctionnalitiesByUserRole();
  },
};
</script>

<style scoped>
.lang {
  color: white;
}

.list-item-title {
  font-family: "Montserrat";
  font-size: 20px;
}

.simple_title {
  font-family: "Raleway";
}
</style>
