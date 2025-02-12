<template>
  <v-app>
    <div class="container">
      <span class="title_search">Rechercher un billet</span><br /><br />
      <div class="row">
        <div class="col-lg-6">
          <div>
            <input
              type="text"
              class="form-control"
              aria-describedby="basic-addon1"
              placeholder="Entrer la référence du billet"
            />
          </div>
        </div>
        <div class="col-lg-3">
          <div>
            <v-btn btn color="success"
              ><v-icon>mdi-magnify</v-icon>&nbsp;&nbsp;Rechercher</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "SearchTicket",
  data() {
    return {};
  },
};
</script>

<style scoped>
.title_search {
  font-family: "Montserrat";
  font-weight: bold;
  opacity: 0.7;
  font-size: 30px;
}
</style>
