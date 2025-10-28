<template>
  <v-container>
    <v-card>
      <v-card-title
        ><span class="user_functionalities"
          >Droits et Permissions</span
        ></v-card-title
      >
      <v-card-text>
        <div class="container">
          <div
            class="row"
            v-if="functionnalities != undefined && functionnalities.length != 0"
          >
            <div
              class="col-lg-3"
              v-for="(functionnality, func) in functionnalities"
              :key="func"
            >
              <li class="functionnality">
                <ol>
                  {{
                    functionnality.libelle
                  }}
                </ol>
              </li>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "userFunctionnalities.vue",
  props: ["functionnalities"],
};
</script>

<style scoped>
.user_functionalities {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 17px;
  opacity: 0.7;
}

.functionnality {
  font-weight: normal;
  font-size: 17px;
  font-family: "Montserrat";
}
</style>
