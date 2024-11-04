<template>
  <v-app>
    <v-container fluid>
      <div class="row">
        <div class="row justify-space-evenly">
          <div class="col-lg-1">
            <v-avatar size="72">
              <v-img src="@/assets/avatar.png"></v-img>
            </v-avatar>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <span class="greeting"
                >Bienvenue, {{ $store.state.userAuthentified.nom }}</span
              >
            </div>
            <div class="row">
              <span class="last_connexion"
                >Dernière connexion le:
                {{ $store.state.userAuthentified.lastConnection }}</span
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5" class="count-books">
            <v-card-title
              ><span class="card-title-text"
                >Total Réservation</span
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
              ><span class="card-title-text"
                >Caisse actuelle</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">258.015 </span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" elevation="5">
            <v-card-title
              ><span class="card-title-text"
                >Offres Disponibles</span
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
              ><span class="card-title-text"
                >Reservation en cours</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">3</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              >Reservations récentes
              <v-spacer></v-spacer>
              <v-btn text x-small>Plus d'actions</v-btn>
            </v-card-title>
            <v-card-text>
              <v-data-table :headers="headers"></v-data-table>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "DashboardSeller",

  data() {
    return {
      search: "",
      loading: true,
      headers: [
        { text: "Référence", value: "" },
        { text: "Prix", value: "" },
        { text: "Nom et Prenoms", value: "" },
        { text: "E-mail", value: "" },
      ],

      reservationList: [],
    };
  },
};
</script>

<style scoped>
.greeting {
  font-size: 23px;
  word-spacing: 2px;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: "Montserrat";
}

.last_connexion {
  font-family: "Montserrat";
  opacity: 0.7;
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
</style>
