<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-btn icon color="secondary" @click="deleteBag(position)"
        ><v-icon size="30">mdi-close</v-icon></v-btn
      >
    </v-card-title>
    <v-card-subtitle>Bagage n° {{ position + 1 }} </v-card-subtitle>
    <v-card-text>
      {{ titleItem }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    position: Number,
    titleItem: String,
  },
  name: "BagageItem",
  data() {
    return {};
  },

  methods: {
    //DELETE BAG SAVED
    deleteBag(position) {
      this.bags.splice(position, 1);
    },
  },
};
</script>

<style scoped></style>
