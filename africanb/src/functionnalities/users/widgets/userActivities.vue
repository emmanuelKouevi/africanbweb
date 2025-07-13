<template>
  <v-container>
    <v-card height="190">
      <v-card-title><span class="user_activity">Activités</span></v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle_text"
                >Compte crée le :</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-subtitle
                ><span class="subtitle_content_text">{{
                  account == undefined ? "" : account.createdAt
                }}</span></v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle_text"
                >Dernière connexion :</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-subtitle
                ><span class="subtitle_content_text">{{
                  account == undefined ? "" : account.lastConnectionDate
                }}</span></v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "UserActivities.vue",
  props: {
    account: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
.user_activity {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 17px;
  opacity: 0.7;
}

.subtitle_content_text {
  font-family: "Montserrat";
  font-weight: bold;
}

.subtitle_text {
  font-family: "Montserrat";
}
</style>
