<template>
  <div>
    <v-card elevation="3">
      <v-card-subtitle>Total users</v-card-subtitle>
      <v-card-text>
        <div class="container">
          <div class="row">
            <span>ROLE TYPE</span>
          </div>
          <div class="row">
            <v-btn small color="#162f5c"
              ><span class="text_edit_btn">Éditer</span></v-btn
            >
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "RoleItem.vue",
  props: {
    roles: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style scoped></style>
