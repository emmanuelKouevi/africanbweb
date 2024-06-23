<template>

    <v-app id="page"><br>

        <v-container class="jumbotron">

            <div class="row justify-between">
                <div class="col-lg-6">
                    <span class="font-weight-bold">Détail du billet de réservation</span>
                </div>

                <div class="col-lg-6">
                    <v-btn x-small text color="primary" @click="$router.replace({path:'/selectionnerReservationBillet'})">Faire une nouvelle réservation</v-btn>
                </div>
            </div>

            <v-divider></v-divider>

            <div class="row">

                <div class="col-lg-12">

                    <v-card>

                        <v-card-title><span>Réservation Reférence n° {{ reservationItem.id }}</span></v-card-title>

                        <v-divider></v-divider>

                        <v-card-text>

                            <div class="row">

                                <div class="col-lg-6">
                                    <span>Réservation faite par le gérant de gare :</span>
                                </div>

                                <div class="col-lg-6">
                                    <span class="font-weight-bold">Kouevi Ayite Emmanuel Hervé</span>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-lg-6">
                                    <span>Gare de voyage :</span>
                                </div>

                                <div class="col-lg-6">
                                    <span class="font-weight-bold">{{ reservationItem.gareDesignation }}</span>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-lg-6">
                                    <span>Réservation crée le:</span>
                                </div>

                                <div class="col-lg-6">
                                    <span class="font-weight-bold">24-06-2024</span>
                                </div>

                            </div>

                            <v-divider></v-divider>

                            <div class="row">

                                <div class="col-lg-6">
                                    <span>Nom et Prénoms du client:</span>
                                </div>

                                <div class="col-lg-6">
                                    <span class="font-weight-bold">{{ reservationItem.clientDetails.nom }} {{ reservationItem.clientDetails.prenoms }}</span>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-lg-6">
                                    <span>Address E-mail:</span>
                                </div>

                                <div class="col-lg-6">
                                    <span class="font-weight-bold">{{ reservationItem.clientDetails.email }}</span>
                                </div>

                            </div>

                            <v-divider></v-divider>

                            <div class="row">

                                <div class="col-lg-6">
                                    <span>Nombre de place réservé(s):</span>
                                </div>

                                <div class="col-lg-6">
                                    <span class="font-weight-bold">{{ reservationItem.nombrePlace }}</span>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-lg-6">
                                    <span>Montant de la réservation:</span>
                                </div>

                                <div class="col-lg-6">
                                    <span class="font-weight-bold">{{ reservationItem.montantTotalReservation}} FCFA</span>
                                </div>

                            </div>

                        </v-card-text><br>

                        <v-card-actions class="float-right">
                            <v-btn x-small color="success">Imprimer le billet</v-btn>
                        </v-card-actions>

                    </v-card>

                </div>
                
                

            </div>

        </v-container>
            
    </v-app>

</template>

<script>
export default {
    name:"ReservationDetail",
    data(){
        return{
            reservationItem:{
                id:null,
                clientDetails:{
                    nom: null,
                    prenoms:null,
                    email: null,
                },
                gareDesignation:null,
                montantTotalReservation: null,
                nombrePlace: null,
                statusActualDesignation: null,
            }
        }
    },

    methods:{

        async editingBooking(){
            if (localStorage.getItem("reservationBillet")) {
                try {
                    const booking = JSON.parse(localStorage.getItem("reservationBillet"));
                    this.reservationItem = booking;
                    console.log(this.reservationItem)

                    localStorage.removeItem("reservationBillet");
                } catch (error) {
                    localStorage.removeItem("reservationBillet");
                }
            }else{
                this.$router.replace({path:'/selectionnerReservationBillet'})
            }
        },

    },

    mounted(){
        this.editingBooking();
    }
}
</script>

<style scoped>
    #page{
        margin-top: 50px;
    }
</style>