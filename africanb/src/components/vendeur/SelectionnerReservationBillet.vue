<template>
    <v-app>
        <v-container fluid>

            <div class="row">
                <div class="col-lg-6">
                    <v-card rounded="lg" color="#95afc0" class="count-books">
                        <v-card-title><span class="card-title-text">TOTAL DES VENTES</span></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <span class="libelle font-weight-bold">{{ totalPriceReservation }}</span>&nbsp;<small class="font-weight-bold cfa">FCFA</small>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </div>

                <div class="col-lg-6">
                    <v-card rounded="lg" color="#f9ca24">
                        <v-card-title><span class="card-title-text">Offres en cours</span></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <span class="libelle font-weight-bold">4</span>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </div>
            </div> <br>

            <v-btn x-small btn color="success" @click="toExportReport">Exporter le rapport</v-btn><br><br>

            <v-card>
                <v-card-title><small class="title_card">TOUS LES BILLETS RÉSERVÉS</small>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" dense placeholder="Rechercher ..."></v-text-field>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-data-table :headers="headers" :search="search" :loading="loading" :items="reservationTicketList">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon title="editer" color="blue" small class="mr-2" @click="checkBooking(item)">mdi-pencil</v-icon>&nbsp;
                            <v-icon title="imprimer" color="blue" small class="mr-2" @click="imprimerBillet(item.designation)">mdi-printer</v-icon>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
            
        </v-container>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>

<script>

import axios from 'axios';
//import $ from 'jquery';
import { API_GET_RESERVATIONS_BY_SELLER , API_GET_RESERVATIONS_BY_ADMIN_TP , API_GENERATE_TICKET,  HEADERS, API_GENERATE_REPORT } from '../globalConfig/globalConstConfig';
export default {
    name:"SelectionnerReservationBillet",
    data(){
        return{
            errorMsg: null,
            successMsg: null,
            warningMsg: null,

            ticketGenerated:{
                data: {
                    designation: null,
                }
            },

            reportGenerated:{
                data: {
                    designation: null,
                }
            },

            objectToSend:{
                "data": {
                    
                }
            },

            headers:[
                {text : 'Réference N°' ,value :'id'},
                {text : 'Gare' ,value :'gareDesignation'},
                {text : 'Trajet' ,value :'offreVoyageDesignation'},
                {text : 'Nom du client' ,value :'clientDetails.nom'},
                {text : 'Prenom du client' ,value :'clientDetails.prenoms'},
                {text : 'Montant versé' ,value :'montantTotalReservation'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],

            overlay : false,
            loading:false,
            search: '',


            reservationTicketList:[],
        }
    },

    methods:{

        async convertToBase64(byte){
            console.log(byte)
            window.open("data:application/pdf;base64,"+byte, '_blank', 'fullscreen=yes')
        },


        //Exporter le rapport en PDF
        async toExportReport(){
            await axios.post(API_GENERATE_REPORT, this.ticketGenerated, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {  
                console.log(response)            
            }).catch((e) => {
                this.errorMsg = e
            })
        },

        //Generer le billet de voyage
        async imprimerBillet(designationBillet){
            this.ticketGenerated.data.designation = designationBillet;
            await axios.post(API_GENERATE_TICKET, this.ticketGenerated, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {  
                if (designationBillet == null) {
                    this.$swal.fire('Erreur','Impossible d\'imprimer ce billet','error');
                }else{
                    this.convertToBase64(response.data.item.contentBase64)
                }              
            }).catch((e) => {
                this.errorMsg = e
            })
        },

        //OBTENIR LA LISTE DES RESERVATIONS EFFECTUÉ PAR LES UTILISATEUR À LA GARE
        async getAllReservationTicketAvailable(){
            this.loading = true ;
            console.log("Dans le service de recuperation des reservation")
            if(this.$store.state.userAuthentified.roleCode == "RoleAdminCompagnieTransport"){
                await axios.post(API_GET_RESERVATIONS_BY_ADMIN_TP, this.objectToSend, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                    if (response.status == 200) {
                        console.log(response)
                        if (response.data.hasError == false) {
                            this.reservationTicketList = response.data.items;
                        }else{
                            //
                        }
                    }else{
                        alert("");
                    }
                }).catch((e) => {
                    this.errorMsg = e
                }).finally(() => {
                    this.loading = false;   
                })
            }else{
                await axios.post(API_GET_RESERVATIONS_BY_SELLER, this.objectToSend, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                    if (response.status == 200) {
                        console.log(response)
                        if (response.data.hasError == false) {
                            this.reservationTicketList = response.data.items;
                        }else{
                            //
                        }
                    }else{
                        alert("");
                    }
                }).catch((e) => {
                    this.errorMsg = e
                }).finally(() => {
                    this.loading = false;   
                })
            }
        },

        //CONSULTER UNE RESERVATION
        checkBooking(reservation){
            const parsedBooking= JSON.stringify(reservation);
            localStorage.setItem('reservationBillet', parsedBooking);
            this.$router.push({path: "/detail_reservation" });
        },

    },

    computed:{
        
        totalPriceReservation(){
            var total = 0;
            for (let index = 0; index < this.reservationTicketList.length; index++) {
                console.log(this.reservationTicketList[index].montantTotalReservation)
                total += this.reservationTicketList[index].montantTotalReservation;
            }
            return total;
        }

    },

    mounted(){
        this.getAllReservationTicketAvailable()
    }
}
</script>

<style scoped>
    .title_card{
        font-weight: bold;
        font-size: 12px;
    }

    .myalert{
        display: none;
        z-index: 1900;
    }

    .libelle{
        color: white;
        font-size:20px
    }

    .cfa{
        color: white;
    }

    .card-title-text{
        font-size: 13px;
        color: white;
        text-transform: uppercase;
        font-weight: bold
    }

    .alert-success{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }

    .alert-error{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }
</style>