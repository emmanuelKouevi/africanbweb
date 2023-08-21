<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card>
                    <v-card-title>DATER UNE OFFRE DE VOYAGE
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-subtitle>Rattachez à vos offres , les jours ou celles-ci seront effectuées</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="5">
                                <v-select dense rounded outlined label="Jour de la semaine" :items="jourSemaineList" item-value="designation" item-text="designation" v-model="jourOffreVoyageModel.jourSemaineDesignation"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn small shaped rounded outlined>REINITIALISER</v-btn>
                        <v-btn type="submit" small shaped rounded outlined color="teal">ENREGISTRER LES MODIFICATIONS</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-form>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>

<script>
import axios from 'axios';
import $ from 'jquery'
import { API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE , API_CREER_JOUR_SEMAINE_OFFRE_VOYAGE, HEADERS } from '../globalConfig/globalConstConfig'
 
export default {
    name:"ModifierJourOffreVoyage",
    data(){
        return{
            errorMsg:null,
            successMsg:null,
            overlay:null,


            jourOffreVoyageModel:{
                id:null,
                jourSemaineDesignation:null
            },

            jourSemaineList:[],

            referenceJourSemaine:{
                referenceFamilleDesignation : 'referenceFamilleJourSemaine'
            },

            objectToSend:{
                datas:[]
            },

            jourSemaineToModify:{
                datas:[],
            }
        }
    },

    methods:{

        //SOUMETTRE LE FORMULAIRE
        submitForm(){
            this.enregistrerModificationJourSemaines();
        },

        //ENREGISTRER LES MODIFICATIONS
        async enregistrerModificationJourSemaines(){
            this.jourSemaineToModify.datas.push(this.villeEscaleModel);
            this.overlay = true ;
            await axios.put(API_CREER_JOUR_SEMAINE_OFFRE_VOYAGE , this.jourSemaineToModify , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.jourSemaineToModify.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.jourSemaineToModify.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la modification de l'offre de voyage";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.jourSemaineToModify.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de modification impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.jourSemaineToModify.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.jourSemaineToModify.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            })
        },

        //EDITER UN JOUR PORTANT SUR UNE OFFRE DE VOYAGE
        async editerJourSemaineOffreVoyage(){
            if (localStorage.getItem("jourOffreEdit")) {
                try {
                    const jourOffreEditing = JSON.parse(localStorage.getItem("jourOffreEdit"));
                    this.jourOffreVoyageModel.id = jourOffreEditing.id;
                    this.jourOffreVoyageModel.jourSemaineDesignation = jourOffreEditing.jourSemaineDesignation;
                    localStorage.removeItem("jourOffreEdit");
                } catch (error) {
                    localStorage.removeItem("jourOffreEdit");
                }
            }else{
                this.$router.replace({path:'/selectionnerOffreVoyage'})
            }
        },

        //OBTENIR LISTE DES JOURS DE LA SEMAINE
        async obtenirJourSemaineList(){
            this.objectToSend.datas.push(this.referenceJourSemaine);
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE , this.objectToSend , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                this.jourSemaineList = response.data.items;
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
        this.obtenirJourSemaineList();
        this.editerJourSemaineOffreVoyage();
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