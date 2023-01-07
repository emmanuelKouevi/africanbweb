<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini">
      <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">AFRICANB</v-list-item-title>
            <v-list-item-subtitle>Société AFRICANB</v-list-item-subtitle>
          </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link>
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
  
            <v-list-item v-for="([title, icon , navigation], i) in operationCompagnieTransport" :key="i" link>
              <v-list-item-title v-text="title" @click="$router.push({path:navigation}).catch(() => {})"></v-list-item-title>
              <v-list-item-icon>
                <v-icon color="teal" v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>ADHÉSION</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item v-for="([title, icon , navigation], i) in operationAdhesion" :key="i" link>
              <v-list-item-title v-text="title" @click="$router.push({path:navigation}).catch(() => {})"></v-list-item-title>
              <v-list-item-icon>
                <v-icon color="teal" v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

        </v-list-group>
      </v-list>

      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon color="teal">mdi-view-list-outline</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>GÉRER LES OFFRES DE VOYAGES</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon color="teal">mdi-account-group</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>UTILISATEURS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon color="teal">mdi-account-edit</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>MON PROFIL</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app color="white">
      <v-app-bar-nav-icon color="dark" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="teal">mdi-bell-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="teal">mdi-email</v-icon>
      </v-btn>
      
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
  export default {
    name:"EspaceCompagnieTransport" ,
    data(){
      return{
        mini:true,
        drawer: true,
        operationCompagnieTransport: [
          ['NOUVELLE OFFRE' , 'mdi-plus-outline' , '/creerOffreVoyage'],
          ['ADMINISTRER' , 'mdi-gesture-tap-button' , ''],
        ],

        operationAdhesion : [
          ['DEMANDER UNE ADHESION' , 'mdi-plus-outline' , '/creerDemandeAdhesion'],
          ['ADMINISTRER LES ADHÉSIONS' , 'mdi-gesture-tap-button' , ''],
        ],
      }
    }
  }
</script>
