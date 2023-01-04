<template>

  <v-app>

    <v-system-bar window fixed dark color="teal" app>
      <v-icon color="white" size="60">mdi-train-car</v-icon><span class="text-h5 logo">AFRICAN BUS</span>
      <v-spacer></v-spacer>
      <v-btn text><small>FR</small><v-icon>mdi-menu-down</v-icon></v-btn>
    </v-system-bar>

    <v-app-bar absolute app color="teal" elevate-on-scroll scroll-target="#scrolling-techniques-7">

      <v-spacer></v-spacer>

      <v-btn text><span class="link">À PROPOS</span></v-btn>
      <v-btn text><span class="link">NOUS JOINDRE</span></v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-avatar size="30"><img src="../../src/assets/undraw_profile.svg" alt="John"></v-avatar>
            <v-icon color="white">mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push({path: item.link})" link v-for="(item, index) in items" :key="index">
            <v-list-item-icon><v-icon color="teal" v-text="item.icon"></v-icon></v-list-item-icon>
            <v-list-item-title class="subtitle">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-card class="container_image">
      <v-container>
        <v-card class="search_offers_travels" width="700" color="white">
          <v-card-title class="card_subtitle" color="teal">RECHERCHER DES OFFRES DE VOYAGES
            <v-spacer></v-spacer>
            <v-btn icon><v-icon color="teal">mdi-sync</v-icon></v-btn>
          </v-card-title>
          <v-container fluid>
            <v-row justify="space-between">
              <v-col><v-select prefix="De: " outlined dense color="teal" label="Ville Départ"></v-select></v-col>
              <v-col><v-select prefix="Vers: " outlined dense color="teal" label="Ville Arrivée"></v-select></v-col>
            </v-row>
            <v-row justify="space-between">
              <v-col>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field outlined dense v-model="date" label="Date de l'offre" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>

                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col><v-text-field color="" outlined dense label="Ville Arrivée"></v-text-field></v-col>
            </v-row>

            <v-row justify="center">
              <v-btn text outlined rounded color="teal"><v-icon color="teal">mdi-magnify</v-icon> RECHERCHER LES OFFRES</v-btn>
            </v-row><br>
          </v-container>
        </v-card>
      </v-container>
    </v-card>

    <v-main>

    </v-main>


    <v-footer></v-footer>

  </v-app>

</template>

<script>

  export default {
    name: 'HomeView',
    data(){
      return{
        items:[
          { title : "Espace Compagnie Transport" , icon : "mdi-wallet-travel" , link:"/EspaceCompagnieTransport"},
          { title : "Mes réquêtes préenregistrés" , icon : "mdi-clipboard-list-outline" , link:""},
          { title : "Se connecter" , icon : "mdi-account-cog" , link:""},
          { title : "Créer un compte" , icon : "mdi-account-plus" , link:""},
        ],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        modal: false,
      }
    }
  }
</script>

<style scoped>
  .logo{
    font-weight: bold;
    word-spacing: 2px;
    color: #fff;
  }

  .link{
    color: white;
    font-weight: bold;
    font-size: 17px;
  }

  .container_image{
    background-image: url("../../src/assets/inside_bus.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 500px;
  }

  .search_offers_travels{
    position: relative;
    margin-top: 120px;
    margin-left: 220px;
  }

  .card_subtitle{
    font-size: 15px;
    font-weight: 500;
  }

</style>
