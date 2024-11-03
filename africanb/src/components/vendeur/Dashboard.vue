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
                {{ $store.state.userAuthentified.lastConnexion }}</span
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <v-card rounded="lg" color="#0be881" class="count-books">
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
          <v-card rounded="lg" color="#273c75">
            <v-card-title
              ><span class="card-title-text"
                >Caisse actuelle</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">258.015 </span
                  >&nbsp;&nbsp;<span class="cfa">FCFA</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-3">
          <v-card rounded="lg" color="#fbc531">
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
          <v-card rounded="lg" color="#c23616">
            <v-card-title
              ><span class="card-title-text">Remboursement</span></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">55.455</span
                  >&nbsp;&nbsp;<span class="cfa">FCFA</span>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8">
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
        <div class="col-lg-4">
          <v-card rounded="lg" color="#2f3640">
            <v-card-title
              ><span class="card-title-text"
                >Reservations Récentes</span
              ></v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <span class="libelle font-weight-bold">6</span>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn x-small text
                ><span class="btn-libelle">Plus de détail</span></v-btn
              >
            </v-card-actions>
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
  font-size: 13px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

.libelle {
  color: white;
  font-size: 20px;
}

.cfa {
  color: white;
}

.btn-libelle {
  text-decoration: underline;
  color: white;
}
</style>
