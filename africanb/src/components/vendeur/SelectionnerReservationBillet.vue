<template>
    <v-container fluid>
        <v-card>
            <v-card-title><small class="title_card">TOUS LES BILLETS RÉSERVÉS</small>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" dense placeholder="Rechercher ..."></v-text-field>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-data-table :headers="headers" search="search" :loading="loading" :items="reservationTicketList"></v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name:"SelectionnerReservationBillet",
    data(){
        return{
            errorMsg: null,
            successMsg: null,
            warningMsg: null,

            headers:[
                {text : 'Réference N°' , value : 'id'},
                {text : 'Catégorie' , value : 'designation'},
                {text : 'Date de reservation' , value : 'villeDesignation'},
                {text : 'Montant' , value : 'statusUtilActualDesignation'},
                {text : 'Validé le' , value : 'statusUtilActualDesignation'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],

            overlay : false,

            loading:false,
            search: '',


            reservationTicketList:[],
        }
    },

    methods:{

        //OBTENIR LA LISTE DES RESERVATIONS EFFECTUÉ PAR LES UTILISATEUR À LA GARE
        async getAllReservationTicketAvailable(){
            
        }

    }
}
</script>

<style scoped>
    .title_card{
        font-weight: bold;
        font-size: 12px;
    }
</style>