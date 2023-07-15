<template>

  <v-app>

    <login-page></login-page>

  </v-app>

</template>

<script>
import loginPage from '../components/administration_compagnie_transport/authentification/connexionUtilisateurCompagnieTransport.vue'
export default {
  name:'HomeView',
  components:{ loginPage  }
}
</script>