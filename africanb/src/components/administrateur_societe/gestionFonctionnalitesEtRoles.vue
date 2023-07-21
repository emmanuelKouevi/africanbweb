<template>
    <v-app>
        <v-card>
            <v-card-title class="title-card"><h5>FONCTIONNALITÉS UTILISATEURS</h5>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
            </v-card-title>
            
            <v-data-table
                :headers="headersFunctionnality"
                :items="functionnalitiesList"
                :loading="loadingFunctionnality"
                :search="searchFunctionnality">

                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon title="editer" color="blue" small class="mr-2" @click="editerOffreVoyage(item)">mdi-pencil</v-icon>                      
                    <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProduitLogement(item)">mdi-delete</v-icon>
                </template>

            </v-data-table>
        </v-card><br>
        <v-divider></v-divider><br>
        <v-card>
            <v-card-title class="title-card"><h5>ROLES UTILISATEURS</h5>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
            </v-card-title>
            
            <v-data-table
                :headers="headersUserRole"
                :items="userRoleList"
                :loading="loadingUserRole"
                :search="searchUserRole">

                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon title="editer" color="blue" small class="mr-2" @click="editerOffreVoyage(item)">mdi-pencil</v-icon>
                    <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProduitLogement(item)">mdi-delete</v-icon>
                </template>

            </v-data-table>
        </v-card>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
    </v-app>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import { API_GET_ALL_FUNCTIONNALITIES , API_GET_ALL_ROLES , HEADERS} from '../globalConfig/globalConstConfig'
export default {
    name:'gestionFonctionnalitesEtRoles',
    data(){
        return{
            errorMsg: null,

            functionnalitiesList : [],
            userRoleList : [],

            loadingUserRole:true,
            searchUserRole:'',
            headersUserRole:[
                {text : 'reference' , value : 'id'},
                {text : 'Libelle' , value : 'libelle'},
                {text : 'Code' , value : 'code'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],


            loadingFunctionnality:true,
            searchFunctionnality:'',
            headersFunctionnality:[
                {text : 'reference' , value : 'id'},
                {text : 'Libelle' , value : 'libelle'},
                {text : 'Code' , value : 'code'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],
        }
    },

    methods:{

        //RECUPERER LA LISTE DES ROLES CRÉES
        async getAllUserRole(){
            this.loadingUserRole = true
            await axios.post(API_GET_ALL_ROLES, {} , { headers : HEADERS } ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.userRoleList = response.data.items;
                    }
                }else{
                    this.errorMsg = "Erreur";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }
            }).catch((e) => {
                this.errorMsg = e
            }).finally(() => {
                this.loadingUserRole = false;   
            })
        },

        // RECUPERER LA LISTE DES FONCTIONNALITÉS
        async getAllFunctionnalities(){
            this.loadingFunctionnality = true
            await axios.post(API_GET_ALL_FUNCTIONNALITIES, {}, { headers : HEADERS } ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.functionnalitiesList = response.data.items;
                    }
                }else{
                    this.errorMsg = "Erreur";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }
            }).catch((e) => {
                this.errorMsg = e
            }).finally(() => {
                this.loadingFunctionnality = false;   
            })
        },

    },


    mounted(){
        this.getAllFunctionnalities();
        this.getAllUserRole();
    }
}
</script>

<style scoped>
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