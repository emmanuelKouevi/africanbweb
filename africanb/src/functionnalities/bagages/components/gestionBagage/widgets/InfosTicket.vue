<template>
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
              disabled
              :value="billetReservation.clientDetails.nom"
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
              :value="billetReservation.clientDetails.prenoms"
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
              :value="billetReservation.clientDetails.email"
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
              :value="billetReservation.clientDetails.telephone"
              type="text"
              class="form-control"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <label for="exampleInputPassword1" class="form-label">Addresse</label>
          <div>
            <input
              disabled
              :value="billetReservation.clientDetails.addresse"
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
              disabled
              :value="billetReservation.programmeDesignation"
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
              disabled
              :value="billetReservation.offreVoyageDesignation"
              type="text"
              class="form-control"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "InfoTicket",
  data() {
    return {
      billetReservation: {},
    };
  },

  methods: {
    // INITIALIZE TICKET SELECTED
    initializeTicketFound() {
      this.billetReservation = this.$store.state.ticket;
    },
  },

  mounted() {
    this.initializeTicketFound();
  },
};
</script>

<style scoped></style>
