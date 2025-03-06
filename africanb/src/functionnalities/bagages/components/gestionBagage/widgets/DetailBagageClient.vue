<template>
  <v-app>
    <div
      class="row"
      :hidden="response == null"
      v-if="strategyType == 'typeStrategieBagagePoids'"
    >
      <div class="col-lg-7">
        <v-card>
          <v-card-title
            ><span class="title_card">Détail des bagages</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <div class="row justify-space-around">
              <div class="col-lg-6">
                <label for="designation" class="form-label">Poids Total</label>
                <div class="input-group mb-3">
                  <input
                    disabled
                    :value="
                      response != null
                        ? response.bagagePoidsDTO.poidsTotalBagage
                        : ''
                    "
                    type="text"
                    class="form-control"
                    aria-describedby="basic-addon1"
                  />
                  <span class="input-group-text" id="basic-addon1">KG</span>
                </div>
              </div>
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
          </v-card-text>
        </v-card>
      </div>
      <div class="col-lg-5">
        <v-card>
          <v-card-title
            ><span class="search_text"
              >Total bagages:
              {{
                response != null
                  ? response.bagagePoidsDTO.bagagePoidsReferenceDTOS.length
                  : ""
              }}</span
            ></v-card-title
          >
          <v-card-text v-if="response != null">
            <div
              v-if="response.bagagePoidsDTO.bagagePoidsReferenceDTOS.length > 0"
            >
              <div class="row">
                <div
                  class="col-lg-6"
                  v-for="(bag, b) in response.bagagePoidsDTO
                    .bagagePoidsReferenceDTOS"
                  :key="b"
                >
                  <span>{{ bag.typeBagageDesignation }}</span>
                </div>
              </div>
            </div>
            <div v-else>
              <span>AUCUN BAGAGE</span>
            </div>
          </v-card-text>
        </v-card>
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
