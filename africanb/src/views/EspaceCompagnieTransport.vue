<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini">
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
            <v-icon color="teal">mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>TABLEAU DE BORD</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-group :value="true" prepend-icon="mdi-cog">
          <template v-slot:activator>
            <v-list-item-title>OPERATIONS TRANSPORTS</v-list-item-title>
          </template>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>OFFRES DE VOYAGES</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(
                [title, icon, navigation], i
              ) in operationCompagnieTransport"
              :key="i"
              link
              @click="$router.push({ path: navigation }).catch(() => {})"
            >
              <v-list-item-title> {{ title }} </v-list-item-title>
              <v-list-item-icon>
                <v-icon color="teal"> {{ icon }} </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>ADHÉSION</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="([title, icon, navigation], i) in operationAdhesion"
              :key="i"
              link
              @click="$router.push({ path: navigation }).catch(() => {})"
            >
              <v-list-item-title> {{ title }} </v-list-item-title>
              <v-list-item-icon>
                <v-icon color="teal"> {{ icon }} </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>

      <v-list dense nav>
        <v-list-item
          link
          @click="
            $router
              .push({ path: '/documentAttestationTransport' })
              .catch(() => {})
          "
        >
          <v-list-item-icon>
            <v-icon color="teal">mdi-file-alert</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>DOCUMENTS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item
          link
          @click="
            $router
              .push({ path: '/creerProprieteCaracteristiqueOffreVoyage' })
              .catch(() => {})
          "
        >
          <v-list-item-icon>
            <v-icon color="teal">mdi-clipboard-list-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>PROPRIETES OFFRE DE VOYAGES</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item
          link
          @click="
            $router
              .push({ path: '/creerGareCompagnieTransport' })
              .catch(() => {})
          "
        >
          <v-list-item-icon>
            <v-icon color="teal">mdi-subway-alert-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>GARE DE TRANSPORT</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item
          link
          @click="
            $router
              .push({ path: '/selectionnerGareCompagnieTransport' })
              .catch(() => {})
          "
        >
          <v-list-item-icon>
            <v-icon color="teal">mdi-subway</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>GESTIONS DES GARES</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item
          link
          @click="
            $router
              .push({ path: '/gestionBagageCompagnieTransport' })
              .catch(() => {})
          "
        >
          <v-list-item-icon>
            <v-icon color="teal">mdi-bag-checked</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>GESTIONS DES BAGAGES</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item
          link
          @click="
            $router.push({ path: '/creerModeAbonnement' }).catch(() => {})
          "
        >
          <v-list-item-icon>
            <v-icon color="teal">mdi-bank-transfer-out</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>MODE D'ABONNEMENT</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item
          link
          @click="$router.push({ path: '/creerModePaiement' }).catch(() => {})"
        >
          <v-list-item-icon>
            <v-icon color="teal">mdi-finance</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>MODE DE PAIEMENTS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item
          link
          @click="
            $router
              .push({ path: '/selectionnerModeAbonnementEtPaiement' })
              .catch(() => {})
          "
        >
          <v-list-item-icon>
            <v-icon color="teal">mdi-view-list-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>ABONNEMENT ET PAIEMENT</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item
          link
          @click="
            $router
              .push({ path: '/associerBusCompagnieTransport' })
              .catch(() => {})
          "
        >
          <v-list-item-icon>
            <v-icon color="teal">mdi-bus-alert</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>GESTION DES BUS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
          src="../assets/logo_africanbus.jpg"
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
                <v-list-item-title
                  >{{ $store.state.userAuthentified.prenoms }}
                  {{ $store.state.userAuthentified.nom }}</v-list-item-title
                >
                <v-list-item-subtitle>{{
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
                ><span class="font-weight-thin"
                  >Mon profil</span
                ></v-list-item-title
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
                ><span class="font-weight-thin"
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
                    class="font-weight-thin"
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

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
//import axios from 'axios'
//import { API_LOGOUT , HEADERS } from '../components/globalConfig/globalConstConfig'
export default {
  name: "EspaceCompagnieTransport",
  data() {
    return {
      menuProfil: false,
      dialogLogout: false,

      mini: true,
      drawer: true,
      operationCompagnieTransport: [
        ["NOUVELLE OFFRE", "mdi-plus-outline", "/creerOffreVoyage"],
        ["PROGRAMMER UNE OFFRE", "mdi-wrench-clock", "/programmeOffreVoyage"],
        ["VILLES ESCALES", "mdi-city", "/creerVilleEscale"],
        ["DATER UNE OFFRE", "mdi-calendar", "/rattacherJourSemaineOffreVoyage"],
        ["MODE ET TARIFS", "mdi-currency-usd", "/creerModeTarif"],
        ["ADMINISTRER", "mdi-gesture-tap-button", "/selectionnerOffreVoyage"],
      ],

      operationAdhesion: [
        ["DEMANDER UNE ADHESION", "mdi-plus-outline", "/creerDemandeAdhesion"],
        ["ADMINISTRER LES ADHÉSIONS", "mdi-gesture-tap-button", ""],
      ],
    };
  },

  methods: {
    logout() {
      this.$store.commit("DESTROY_SESSION_USER");
      this.$router.replace("/");
    },
  },
};
</script>
