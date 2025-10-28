<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row justify-space-between">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-6">
              <span class="stats_text">Statistique des reservations</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/salary.png')"
            title="Chiffre d'affaires"
            value="6000"
            :isPrice="true"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/ticket.png')"
            title="Total des reservations"
            value="25"
            :isPrice="false"
          ></CardStat>
        </div>
        <div class="col-lg-4">
          <CardStat
            :icon="require('@/assets/cross.png')"
            title="Nombre de place(s) restante(s)"
            value="12"
            :isPrice="false"
          ></CardStat>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <v-card rounded="lg">
            <v-card-title
              ><span class="title_text"
                >Liste des réservations</span
              ></v-card-title
            >
            <v-card-text>
              <v-data-table></v-data-table>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import CardStat from "../widgets/CardStat.vue";

export default {
  name: "StatistiqueReservationParProgramme",
  components: {
    CardStat,
  },
};
</script>

<style scoped>
#inspire {
  background: #eeeeee;
}

.title_text {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 17px;
}

.stats_text {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 25px;
  word-spacing: 1.2px;
  letter-spacing: 1.2px;
  opacity: 0.85;
}
</style>
