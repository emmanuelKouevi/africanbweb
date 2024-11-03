<template>
  <v-app id="inspire">
    <v-container>
      <div class="row">
        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >Offres de voyages</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">15</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text">Offres actives</span></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">2 </span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text"
                >Offres Inactives</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">5</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text">Villes</span></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">147</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <v-card rounded="lg" elevation="5" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >Total des ventes</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold"
                    >1.650.145
                    <small class="font-weight-bold">FCFA</small></span
                  >&nbsp;
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-6">
          <v-card rounded="lg" elevation="5" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >Distributeurs (Vendeurs)</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">4 </span>&nbsp;
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "DashboardAdminTransportCompanie",

  data() {
    return {
      search: "",
      loading: true,
      headers: [
        { text: "Designation", value: "" },
        { text: "Type ,de l'offre", value: "" },
        { text: "Départ", value: "" },
        { text: "Destination", value: "" },
      ],

      reservationList: [],
    };
  },
};
</script>

<style scoped>
template {
  background: grey;
}

.card-title-text {
  font-size: 17px;
  letter-spacing: 1.9px;
  font-family: "Montserrat";
  color: #2d3436;
  opacity: 0.9;
  font-weight: bold;
}

.libelle {
  color: black;
  opacity: 0.8;
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
}

.cfa {
  color: white;
}

.btn-libelle {
  text-decoration: underline;
  color: white;
}

.titre {
  font-weight: 15px;
  font-weight: bold;
  color: #2f3640;
}

.cfa {
  color: white;
}
</style>
