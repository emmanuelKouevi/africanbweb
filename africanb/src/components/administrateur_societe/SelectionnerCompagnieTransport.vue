<template>
    <v-app>
        <v-card>
            <v-card-title class="title-card">LISTE DES COMPAGNIES
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
            </v-card-title>
            
            <v-data-table
                :headers="headers"
                :items="compagnieTransportList"
                :loading="loading"
                :search="search">

                <template v-slot:[`item.statusUtilActualDesignation`]="{ item }">
                    <v-chip small v-if="item.statusUtilActualDesignation == 'compagnieTransportEncoursTraitement'" color="teal" text-color="white" class="mr-2"><span class="etat font-weight-bold">En cours de traitement</span></v-chip>
                    <v-chip v-else color="blue" text-color="white" class="mr-2"><span class="etat">Aucune décision</span></v-chip>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon title="editer" color="blue" small class="mr-2" @click="editCompagnieTransport(item)">mdi-pencil</v-icon>
                    <v-icon title="valider" color="success" small class="mr-2" @click="validerCompagnieTransport(item)">mdi-sync</v-icon>                       
                    <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProduitLogement(item)">mdi-delete</v-icon>
                </template>

            </v-data-table>
            <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        </v-card>
    </v-app>
</template>

<script>
import axios from "axios"
import $ from "jquery"
import { API_RECUPERER_LISTE_COMPAGNIE_TRANSPORT, API_VALIDER_DEMANDE_ADHESION_COMPAGNIE } from '../globalConfig/globalConstConfig'
export default {
    name:'SelectionnerCompagnieTransport',
    data(){
        return{
            errorMsg:null,

            loading: true,
            options: {
                index : 0,
                size : 4
            },
            search : '',
            compagnieTransportList : [],
            headers:[
                {text : 'reference' , value : 'id'},
                {text : 'Designation' , value : 'designation'},
                {text : 'Ville' , value : 'villeDesignation'},
                {text : 'Status' , value : 'statusUtilActualDesignation'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ]
        }
    },

    methods :{
        editCompagnieTransport(compagnie){
            const parsedCompagnie = JSON.stringify(compagnie);
            localStorage.setItem('compagnie', parsedCompagnie);
            this.$router.push({path: "/ModifierCompagnieTransport" });
        },


        // RECUPERER LA LISTE DE TOUTES LES COMPAGNIES EN ATTENTES
        readAllCompagniesTransportFromApi(){
            this.loading = false;
            axios.post(API_RECUPERER_LISTE_COMPAGNIE_TRANSPORT , this.options ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.compagnieTransportList = response.data.items
                    }
                }
            })
        },
        
        supprimerCompagnieTransport(){},

        async validerCompagnieTransport(){
            axios.post(API_VALIDER_DEMANDE_ADHESION_COMPAGNIE , )
        },
    },

    mounted(){
        this.readAllCompagniesTransportFromApi()
    }
}
</script>

<style scoped>
    .title-card{
        font-weight: bold;
        color: black;
        font-size: 17px;
    }

    .myalert{
        display: none;
        z-index: 1900;
    }

    .alert-error{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }
</style>