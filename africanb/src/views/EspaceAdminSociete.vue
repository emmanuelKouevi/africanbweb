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
        <v-list-item v-for="item in tabs" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
  
        <v-list-group :value="true" prepend-icon="mdi-cog">
          <template v-slot:activator>
            <v-list-item-title>GESTIONS</v-list-item-title>
          </template>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>COMPAGNIE</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item v-for="([title, icon , navigation], i) in administrationCompagnie" :key="i" link>
              <v-list-item-title v-text="title" @click="$router.push({path:navigation}).catch(() => {})"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

        </v-list-group>
      </v-list>

      <v-list dense nav>
  
        <v-list-group :value="true" prepend-icon="mdi-map-marker-plus">
          <template v-slot:activator>
            <v-list-item-title>LOCALITÉ</v-list-item-title>
          </template>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>PAYS</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item v-for="([title, icon , navigation], i) in administrationLocalitePays" :key="i" link>
              <v-list-item-title v-text="title" @click="$router.push({path:navigation}).catch(() => {})"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>VILLES</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item v-for="([title, icon , navigation], i) in administrationLocaliteVille" :key="i" link>
              <v-list-item-title v-text="title" @click="$router.push({path:navigation}).catch(() => {})"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

        </v-list-group>
      </v-list>

      <v-list dense nav>
        <v-list-item link @click="$router.push({path:'/selectionnerDemandeAdhesionCompagnie'}).catch(() => {})">
          <v-list-item-icon>
            <v-icon>mdi-view-list-outline</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>DEMANDE DES ADHESIONS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app color="white">
      <v-app-bar-nav-icon color="dark" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="black">mdi-bell-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="black">mdi-email</v-icon>
      </v-btn>

      <v-btn text>
        <v-avatar size="30px">
          <img src="">
        </v-avatar>
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
  name: 'EspaceAdminSociete',

  data: () => ({
    mini:true,
    drawer: true,
    tabs: [
      { title: 'TABLEAU DE BORD', icon: 'mdi-view-dashboard' },
    ],

    administrationCompagnie: [
      ['NOUVELLE COMPAGNIE' , 'mdi-plus-outline' , '/creerCompagnieTransport'],
      ['ADMINISTRER' , 'mdi-gesture-tap-button' , '/selectionnerCompagnieTransport'],
    ],

    administrationLocalitePays : [
      ['AJOUTER UN PAYS' , 'mdi-plus-outline' , '/creerPays'],
      ['GERER LES PAYS' , 'mdi-gesture-tap-button' , '/selectionnerPays'],
    ],

    administrationLocaliteVille : [
      ['AJOUTER UNE VILLE' , 'mdi-plus-outline' , '/creerVille'],
      ['GÉRER LES VILLES' , 'mdi-gesture-tap-button' , '/selectionnerVille'],
    ]
  }),
};
</script>

<style scoped>
  .text-h6{
    color: teal;
  }
</style>
