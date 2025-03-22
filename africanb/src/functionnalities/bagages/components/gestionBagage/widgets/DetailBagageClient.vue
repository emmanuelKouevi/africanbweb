<template>
  <v-app>
    <div
      class="row"
      :hidden="response == null"
      v-if="strategyType == 'typeStrategieBagagePoids'"
    >
      <div class="col-lg-12">
        <div class="row">
          <v-card>
            <v-card-title
              ><span class="title_card">Détail des bagages</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label">Nom</label>
                  <div>
                    <input
                      disabled
                      type="text"
                      :value="$store.state.ticket.clientDetails.nom"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Prenom(s)</label
                  >
                  <div>
                    <input
                      disabled
                      type="text"
                      :value="$store.state.ticket.clientDetails.prenoms"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-8">
                  <label for="designation" class="form-label">E-mail</label>
                  <div>
                    <input
                      disabled
                      type="text"
                      :value="$store.state.ticket.clientDetails.email"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label">Téléphone</label>
                  <div>
                    <input
                      disabled
                      type="text"
                      :value="$store.state.ticket.clientDetails.telephone"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Addresse</label
                  >
                  <div>
                    <input
                      disabled
                      type="text"
                      :value="$store.state.ticket.clientDetails.adress"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label">Programme</label>
                  <div>
                    <input
                      disabled
                      type="text"
                      :value="$store.state.ticket.programmeDesignation"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Offre de voyage</label
                  >
                  <div>
                    <input
                      disabled
                      type="text"
                      :value="$store.state.ticket.offreVoyageDesignation"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="">
        <v-card>
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
            <v-divider></v-divider>

            <span class="search_text text-h5"
              >Total bagages:
              {{
                response != null
                  ? response.bagagePoidsDTO.bagagePoidsReferenceDTOS.length
                  : ""
              }}</span
            >
            <div v-if="response != null">
              <div
                v-if="
                  response.bagagePoidsDTO.bagagePoidsReferenceDTOS.length > 0
                "
              >
                <div class="container row justify-space-center">
                  <div
                    class="col-lg-4"
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
