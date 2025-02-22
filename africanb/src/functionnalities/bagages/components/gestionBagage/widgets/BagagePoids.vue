<template>
  <v-app>
    <div class="container">
      <div class="row">
        <div class="col-lg-7">
          <InfosTicket></InfosTicket>
        </div>
        <div class="col-lg-5">
          <InfoBagageList :bagageList="bags"></InfoBagageList>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-7">
          <!--<BagageInfo></BagageInfo>-->
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
//import BagageInfo from "./BagageInfo.vue";
import InfoBagageList from "./InfoBagageList.vue";
import InfosTicket from "./InfosTicket.vue";

export default {
  name: "GestionBagagePoids",
  components: {
    InfosTicket,
    InfoBagageList,
    //BagageInfo,
  },
  data() {
    return {
      dialog: false,

      bags: [],

      bagageWeightObject: {
        data: {
          designation: null,
          description: null,
          reservationBilletReference: null,
          bagagePoidsDTO: {
            poidsTotalBagage: null,
            typeBagages: [],
          },
        },
      },
    };
  },
};
</script>

<style scoped></style>
