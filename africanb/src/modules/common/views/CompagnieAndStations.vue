<template>
  <div class="row">
    <div
      class="col-lg-12"
      v-if="$store.state.userAuthentified.roleCode === 'RoleAdminSocieteMere'"
    >
      <ListOfCompagnies :role="userRole" />
    </div>
    <div
      class="col-lg-12"
      :hidden="
        userRole === 'Role Administrateur Compagnie Transport' ||
        userRole == null
      "
      v-if="
        $store.state.userAuthentified.roleCode ===
          'RoleAdminCompagnieTransport' ||
        $store.state.userAuthentified.roleCode === 'RoleAdminSocieteMere'
      "
    >
      <ListOfStations
        :hidden="
          $store.state.userAuthentified.roleCode === 'RoleAdminSocieteMere'
        "
      />
    </div>
  </div>
</template>

<script>
import ListOfCompagnies from "./ListOfCompagnies.vue";
import ListOfStations from "./ListOfStations.vue";

export default {
  name: "CompagniesAndStations.vue",
  props: {
    userRole: {
      Type: String,
      default: null,
    },
  },
  components: {
    ListOfCompagnies,
    ListOfStations,
  },

  data() {
    return {};
  },
};
</script>
