<template>
    <v-app>
        <v-form>
            <v-container fluid>
                <v-card>
                    <v-card-title>GESTION DES MODES ET DU TARIF</v-card-title>
                    <v-card-subtitle>Gérer le mode et les tarifs de l'offre</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="5">
                                <v-select rounded dense outlined color="teal" label="sélectionnez une offre"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-select :items="referenceModeOffreVoyageList" item-text="designation" item-value="designation" rounded dense outlined color="teal" label="Mode de l'offre"></v-select>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field rounded dense outlined color="teal" label="Tarif de l'offre" suffix="FCFA"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row justify="space-around">
                            <v-btn rounded outlined>REINITIALISER</v-btn>
                            <v-btn rounded outlined color="primary">VALIDER</v-btn>
                        </v-row><br>
                    </v-container>
                </v-card>
            </v-container>
        </v-form>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
    </v-app>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import { API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE } from '../globalConfig/globalConstConfig'

export default {
    name:"CreerModeTarif",
    data(){
        return{
            referenceModeOffreVoyageList : [],

            objectToSend:{
                datas:[],
            },

            referenceModeOffreVoyage:{
                referenceFamilleDesignation: "referenceFamilleMode"
            }
        }
    }, 

    methods:{

        //OBTENIR REFERENCE DESIGNATION TYPE OFFRE DE VOYAGE
        async obtenirReferenceModeOffreVoyage(){
            this.objectToSend.datas.push(this.referenceModeOffreVoyage)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSend).then((response) => {
                this.referenceModeOffreVoyageList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },

    },

    mounted(){
        this.obtenirReferenceModeOffreVoyage()
    }
}
</script>

<style scoped>
    .myalert{
        display: none;
        z-index: 1900;
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

    .alert-warning{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    } 
</style>