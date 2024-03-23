<template>
    <v-app>
        <v-container fluid>

            <div class="jumbotron">
                <div class="row">
                    <div class="col-sm">
                        <v-card rounded="lg">
                            <v-card-title><span class="card-title-text">D.Adhesion en attentes</span></v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row justify="center">
                                        <span class="libelle font-weight-bold">{{ demandeAdhesionList.length }}</span>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </div>

                    <div class="col-sm">
                        <v-card rounded="lg">
                            <v-card-title><span class="card-title-text">D.Adhesion validées</span></v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row justify="center">
                                        <span class="libelle font-weight-bold">{{ demandeAdhesionValides }}</span>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </div>

                    <div class="col-sm">
                        <v-card rounded="lg">
                            <v-card-title><span class="card-title-text">D.Adhesion non validées</span></v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row justify="center">
                                        <span class="libelle font-weight-bold">{{ demandeAdhesionNonValides }}</span>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </div>

            <v-card width="1800">
                <v-card-title class="title-card">DEMANDE D'ADHÉSIONS
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="demandeAdhesionList" :search="search" :loading="loading">

                    <template v-slot:[`item.statusUtilActualDesignation`]="{ item }">
                        <v-chip x-small v-if="item.statusUtilActualDesignation == 'compagnieTransportValide'" color="teal" text-color="white" class="mr-2"><span class="etat font-weight-bold">Valide</span></v-chip>
                        <v-chip x-small v-else color="secondary" text-color="white" class="mr-2"><span class="etat">Non validé</span></v-chip>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn x-small text @click="verifierInfosDemandeAdhesion(item)">voir détail</v-btn>
                    </template>
                
                </v-data-table>
                <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>

import { /*API_OBTENIR_LISTE_DES_DEMANDES_ADHESIONS_VALIDEES,*/ API_OBTENIR_LISTE_DE_TOUTES_LES_DEMANDES_ADHESIONS, HEADERS } from '../globalConfig/globalConstConfig'
import axios from 'axios'
import $ from 'jquery'
export default {
    name:'SelectionnerDemandeAdhesionCompagnie',
    data(){
        return{
            errorMsg:null,
            successMsg:null,
            warningMsg:null,

            demandeAdhesionList: [],
            demandeAdhesionNonValides:0,
            demandeAdhesionValides:0,

            search : '',
            headers:[
                {text : 'Designation' , value : 'designation'},
                {text : 'Compagnie' , value : 'raisonSociale'},
                {text : 'E-mail' , value : 'email'},
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

        verifierInfosDemandeAdhesion(demandeAdhesion){
            console.log(demandeAdhesion)
            this.$router.push({name:"InfosAdhesion" , params:{raisonSociale:demandeAdhesion.raisonSociale}} )
        },

        //OBTENIR LA LISTE DE TOUTES LES DEMANDE D'ADHESIONS EFFECTUÉS
        async obtenirToutesLesDemandesAdhesion(){
            this.loading = false;
            axios.post(API_OBTENIR_LISTE_DE_TOUTES_LES_DEMANDES_ADHESIONS , this.options, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.demandeAdhesionList = response.data.items;
                        this.demandeAdhesionList.forEach(element => {
                            if (element.isValidate == true) {
                                this.demandeAdhesionValides += 1;
                            }else{
                                this.demandeAdhesionNonValides += 1;
                            }
                        });
                    }
                }else{
                    this.errorMsg = "Erreur";
                }
            }).catch((e) => {
                this.errorMsg = e
            })
        },

        // OBTENIR LA LISTE DES DEMANDES D'ADHESIONS VALIDÉES
        /*async obtenirDemandeAdhesionValidees(){
            this.loading = false;
            axios.post(API_OBTENIR_LISTE_DES_DEMANDES_ADHESIONS_VALIDEES , this.options, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
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
        },*/

    },

    mounted(){
        this.obtenirToutesLesDemandesAdhesion();
        //this.obtenirDemandeAdhesionValidees();
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