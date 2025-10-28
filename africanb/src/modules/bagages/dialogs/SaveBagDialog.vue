<template>
  <v-app id="inspire">
    <v-dialog max-width="500px">
      <v-card>
        <v-card-title>Enregistrer un sac</v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col-lg-6">
              <v-select label="A Select List" item-value="text"></v-select>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <v-select label="A Select List" item-value="text"></v-select>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <label for="designation" class="form-label">Désignation *</label>
              <div>
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <label for="designation" class="form-label">Désignation *</label>
              <div>
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "SaveBagDialog",
  props: ["bagDialog"],
  data() {
    return {};
  },
};
</script>
