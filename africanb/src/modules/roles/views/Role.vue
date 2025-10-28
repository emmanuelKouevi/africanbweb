<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <span class="section_role_title">LISTE DES RÔLES</span>
      </div>
      <div class="row">
        <span class="section_role_subtitle"
          >Un rôle donnait accès à des menus et des fonctionnalités prédéfinis,
          de sorte que, selon le rôle attribué, un administrateur pouvait avoir
          accès à ce dont il avait besoin.</span
        >
      </div>
      <br /><br />
      <div class="row">
        <RoleList :roles="roles" @update-roles="getUserRoleAvailable" />
      </div>
    </div>
  </v-app>
</template>

<script>
import RoleList from "../widgets/RoleList.vue";
import { getRoleUserApi } from "../services/roleApi";

export default {
  name: "RoleAdmin.vue",
  components: {
    RoleList,
  },
  data() {
    return {
      roles: [],
    };
  },

  methods: {
    // RECUPERER LA LISTE DES RÔLES UTILISATEURS DISPONIBLES
    async getUserRoleAvailable() {
      const userRoles = await getRoleUserApi(
        {},
        this.$store.state.userAuthentified.token
      );

      this.roles = userRoles;
    },
  },

  mounted() {
    this.getUserRoleAvailable();
  },
};
</script>

<style scoped>
.section_role_title {
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
  opacity: 0.9;
}

.section_role_subtitle {
  font-family: "Montserrat";
  font-size: 15px;
}
</style>
