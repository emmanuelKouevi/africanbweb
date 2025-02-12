<template>
  <v-app>
    <div class="container">
      <div class="row">
        <span class="section_title">GESTION DES BAGAGES</span>
        <small class="font-weight-normal"
          >Gérer les bagages de vos clients de façon professionnelle.</small
        >
        <div class="col-lg-7">
          <v-card>
            <v-card-title
              ><span class="title_card">Information(s) Génerale(s)</span>
            </v-card-title>
            <v-card-text>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label">Nom</label>
                  <div>
                    <input
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
                  <label for="designation" class="form-label">Programme</label>
                  <div>
                    <input
                      type="text"
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
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-5">
          <v-card>
            <v-card-title
              ><span class="title_card">Bagages Enregistrés</span></v-card-title
            >
            <v-card-text>
              <div>
                <span class="text-center">PAS DE BAGAGES ENREGISTRÉS</span>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-7">
          <v-card>
            <v-card-title
              ><span class="title_card"
                >Étiquetage des bagages</span
              ></v-card-title
            >
            <v-card-text>
              <div class="row justify-space-around">
                <div class="col-lg-6">
                  <label for="designation" class="form-label"
                    >Désignation *</label
                  >
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label"
                    >Poids total *</label
                  >
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">KG</span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12">
                  <label for="designation" class="form-label"
                    >Déscription *</label
                  >
                  <div>
                    <textarea class="form-control" name="" id=""></textarea>
                  </div>
                </div>
              </div>
            </v-card-text> </v-card
          ><br />
          <div class="float-right">
            <v-btn btn color="secondary">REINITIALISER</v-btn>&nbsp;&nbsp;&nbsp;
            <v-btn btn color="success">ENREGISTRER</v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "GestionBagagePoids",
  data() {
    return {};
  },
};
</script>

<style scoped>
.title_card {
  font-family: "Montserrat";
  font-size: 18px;
  font-weight: 600;
}

.section_title {
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
  opacity: 0.7;
  letter-spacing: 3px;
  word-spacing: 2px;
}
</style>
