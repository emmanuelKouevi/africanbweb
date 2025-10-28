<template>
  <v-card rounded="lg">
    <v-card-title>
      <span class="title_text">{{ title }}</span>
      <v-spacer></v-spacer>
      <v-avatar size="25"><v-img :src="icon"></v-img></v-avatar>
    </v-card-title>
    <v-card-text>
      <span class="content_value"
        >{{ value }} {{ isPrice == true ? "FCFA" : "" }}</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardStat",
  props: ["title", "icon", "value", "isPrice"],
};
</script>

<style scoped>
.title_text {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 17px;
}

.content_value {
  font-family: "Montserrat";
  font-size: 22px;
  font-weight: bold;
  color: #1e272e;
}
</style>
