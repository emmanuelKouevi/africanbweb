<template>
    <v-app>
        <login-page></login-page>
    </v-app>
</template>

<script>
import loginPage from '@/components/Auth/Login.vue'
export default {
  name:'HomePage',
  components:{ loginPage  }
}
</script>