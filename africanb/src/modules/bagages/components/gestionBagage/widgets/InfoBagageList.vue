<template>
  <v-card>
    <v-card-title
      ><span class="title_card">Bagages Enregistrés</span></v-card-title
    >
    <v-card-text>
      <div v-if="bagageList.length == 0">
        <span class="text-center">PAS DE BAGAGES ENREGISTRÉS</span>
      </div>
      <div v-else class="container">
        <div class="row">
          <div class="col-lg-6" v-for="(bag, b) in bags" :key="b">
            <BagageItem :position="b" :title-item="bag" />
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import BagageItem from "./BagageItem.vue";

export default {
  components: {
    BagageItem,
  },
  props: {
    bagageList: Array,
  },
  name: "InfoBagage",
  data() {
    return {};
  },
};
</script>

<style scoped></style>
