<template>
  <v-app>
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <v-card>
            <v-card-title
              ><span class="title_card">Reçu de paiement (Bagage)</span>
              <v-spacer></v-spacer>
              <v-btn btn color="secondary" small>Imprimer le reçu</v-btn>
            </v-card-title>
            <v-card-text>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label">Nom</label>
                  <div>
                    <input
                      disabled
                      type="text"
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
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label"
                    >Total des bagages</label
                  >
                  <div>
                    <input
                      disabled
                      type="number"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Montant à payer</label
                  >
                  <div class="input-group mb-3">
                    <input
                      disabled
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
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.title_card {
  font-weight: bold;
  font-family: "Montserrat";
  font-size: 22px;
}
</style>
