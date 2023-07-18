<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini">
      <v-list-item>
          <v-list-item-avatar size="60px">
            <v-img src="../assets/logo_africanbus.jpg"></v-img>
          </v-list-item-avatar>
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
              <v-list-item-title @click="$router.push({path:navigation}).catch(() => {})"> {{ title }} </v-list-item-title>
              <v-list-item-icon>
                <v-icon size="15px"> {{ icon }} </v-icon>
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
              <v-list-item-title  @click="$router.push({path:navigation}).catch(() => {})"> {{ title }} </v-list-item-title>
              <v-list-item-icon>
                <v-icon> {{ icon }} </v-icon>
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
              <v-list-item-title @click="$router.push({path:navigation}).catch(() => {})"> {{ title }} </v-list-item-title>
              <v-list-item-icon>
                <v-icon> {{ icon }} </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

        </v-list-group>
      </v-list>

      <v-list dense nav>
        <v-list-item link @click="$router.push({path:'/selectionnerDemandeAdhesionCompagnie'}).catch(() => {})">
          <v-list-item-icon>
            <v-icon color="teal">mdi-view-list-outline</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>DEMANDE DES ADHESIONS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item link @click="$router.push({path:'/creerFonctionnalite'}).catch(() => {})">
          <v-list-item-icon>
            <v-icon color="teal">mdi-cog</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>GESTION DES FONCTIONNALITÉS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item link @click="$router.push({path:'/gestionFonctionnalitesEtRoles'}).catch(() => {})">
          <v-list-item-icon>
            <v-icon color="teal">mdi-account-key</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>GESTION DES ROLES ET FONCTIONNALITÉS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item link @click="$router.push({path:'/creerUtilisateur'}).catch(() => {})">
          <v-list-item-icon>
            <v-icon color="teal">mdi-account-plus</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>UTILISATEURS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav>
        <v-list-item link disabled @click="$router.push({path:'/selectionnerUtilisateur'}).catch(() => {})">
          <v-list-item-icon>
            <v-icon color="teal">mdi-account-group</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>GESTION UTILISATEURS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      

    </v-navigation-drawer>

    <v-app-bar app color="white">
      <v-app-bar-nav-icon color="dark" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-menu v-model="menuProfil" :close-on-content-click="false" :nudge-width="200" offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded color="teal" dark v-bind="attrs" v-on="on"><v-avatar ><span class="white--text text-h5">A</span></v-avatar></v-btn>
        </template>
  
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img>
              </v-list-item-avatar>
  
              <v-list-item-content>
                <v-list-item-title></v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list>
            <v-list-item link @click="$router.push({name:'monProfil'}).catch(() => {})">
              <v-list-item-icon>
                <v-icon>mdi-account-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title><span class="font-weight-thin">Mon profil</span></v-list-item-title>
            </v-list-item>

            <v-list-item link @click="$router.push({name:'resetPassword'}).catch(() => {})">
              <v-list-item-icon>
                <v-icon>mdi-account-key</v-icon>
              </v-list-item-icon>
              <v-list-item-title><span class="font-weight-thin">Changer le mot de passe</span></v-list-item-title>
            </v-list-item>
  
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="font-weight-thin">Deconnexion</v-list-item-title>
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

export default {
  name: 'EspaceAdminSociete',

  data: () => ({
    mini:true,
    drawer: true,

    menuProfil: false,
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
