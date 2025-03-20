<template>
  <v-app>
    <div
      class="row"
      :hidden="response == null"
      v-if="strategyType == 'typeStrategieBagageType'"
    >
      <div class="col-lg-12">
        <div class="row">
          <v-card>
            <v-card-title
              ><span class="title_card">Détail des bagages</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Montant à payer</label
                  >
                  <div class="input-group mb-3">
                    <input
                      disabled
                      :value="response != null ? response.montantSoldable : ''"
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">FCFA</span>
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <span class="search_text text-h5"
                >Total bagages:
                {{
                  response != null
                    ? response.bagageTypeDTO.bagageTypeReferenceDTOS.length
                    : ""
                }}</span
              >
              <div v-if="response != null">
                <div
                  v-if="
                    response.bagageTypeDTO.bagageTypeReferenceDTOS.length > 0
                  "
                >
                  <div class="container row justify-space-center">
                    <div
                      class="col-lg-4"
                      v-for="(bag, b) in response.bagageTypeDTO
                        .bagageTypeReferenceDTOS"
                      :key="b"
                    >
                      <span>{{ bag.typeBagageDesignation }}</span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <span>AUCUN BAGAGE</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "DetailBagageClient",
  props: ["response", "strategyType"],
  data() {
    return {};
  },
};
</script>
