<template>
    <v-app>
        <v-card>
            <v-card-title class="title-card">DEMANDES D'ADHESION VALIDÉES
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="demandeAdhesionValidesList"
                :search="search"
                :loading="loading">

                <template v-slot:[`item.statusUtilActualDesignation`]="{ item }">
                    <v-chip small v-if="item.statusUtilActualDesignation == 'compagnieTransportValide'" color="teal" text-color="white" class="mr-2"><span class="etat font-weight-bold">Valide</span></v-chip>
                    <v-chip v-else color="blue" text-color="white" class="mr-2"><span class="etat">Aucune décision</span></v-chip>
                </template>

                <template v-slot:[`item.actions`]="{ item }">                     
                    <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProduitLogement(item)">mdi-delete</v-icon>
                </template>
            
            </v-data-table>
            <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        </v-card>
    </v-app>
</template>

<script>

import { API_OBTENIR_LISTE_DES_DEMANDES_ADHESIONS_VALIDEES } from '../globalConfig/globalConstConfig'
import axios from 'axios'
import $ from 'jquery'
export default {
    name:'SelectionnerDemandeAdhesionCompagnie',
    data(){
        return{
            errorMsg:null,
            successMsg:null,
            warningMsg:null,

            search : '',
            demandeAdhesionValidesList : [],
            headers:[
                {text : 'reference' , value : 'id'},
                {text : 'Designation' , value : 'designation'},
                {text : 'Status' , value : 'statusUtilActualDesignation'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],
            loading:true,

            options:{
                index:0,
                size:8
            }
        }
    },

    methods:{

        // OBTENIR LA LISTE DES DEMANDES D'ADHESIONS VALIDÉES
        async obtenirDemandeAdhesionValidees(){
            this.loading = false;
            axios.post(API_OBTENIR_LISTE_DES_DEMANDES_ADHESIONS_VALIDEES , this.options ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.demandeAdhesionValidesList = response.data.items;
                    }
                }else{
                    this.errorMsg = "Erreur";
                }
            }).catch((e) => {
                this.errorMsg = e
            })
        },

    },

    mounted(){
        this.obtenirDemandeAdhesionValidees();
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