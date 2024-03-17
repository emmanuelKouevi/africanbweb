<template>
    <v-app>
        <landing-page></landing-page>
    </v-app>
</template>

<script>
//import loginPage from '@/components/Auth/Login.vue'
import landingPage from '@/components/LandingPage.vue'
export default {
  name:'HomePage',
  components:{ landingPage }
}
</script>