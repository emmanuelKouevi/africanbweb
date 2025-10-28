<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <span class="section_permission_title">LISTE DES PERMISSIONS</span>
      </div>
      <div class="row">
        <span class="section_permission_subtitle"
          >Créez les différentes permissions que vous pourriez attribuer à
          différents utilisateur pour une meilleur gestion des rôles.</span
        >
      </div>
      <br />
      <div class="row">
        <PermissionList
          :permissions="permissionList"
          @update-permissions="getPermissionsAvailables"
        />
      </div>
    </div>
  </v-app>
</template>

<script>
import { getPermissionApi } from "../services/permissionApi";
import PermissionList from "../widgets/PermissionList.vue";

export default {
  name: "PermissionUser.vue",
  components: {
    PermissionList,
  },
  data() {
    return {
      permissionList: [],
    };
  },

  methods: {
    // RECUPERER LA LISTE DES FONCTIONNALITÉS DISPONIBLES
    async getPermissionsAvailables() {
      const permissions = await getPermissionApi(
        {},
        this.$store.state.userAuthentified.token
      );

      this.permissionList = permissions;
      console.log(this.permissionList);
    },
  },

  mounted() {
    this.getPermissionsAvailables();
  },
};
</script>

<style scoped>
.section_permission_title {
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
  opacity: 0.9;
}

.section_permission_subtitle {
  font-family: "Montserrat";
  font-size: 15px;
}
</style>
