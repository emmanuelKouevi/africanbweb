<template>
  <v-app>
    <landing-page></landing-page>
  </v-app>
</template>

<script>
import landingPage from "@/components/LandingPage.vue";
export default {
  name: "HomePage",
  components: { landingPage },
};
</script>
