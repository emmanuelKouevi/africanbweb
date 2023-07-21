<template>
    <v-app>
        <v-form @submit.prevent="creerOffreVoyage()">
            <v-container fluid>
                <v-card max-width="900px" class="mx-auto" elevation="5">
                    <v-card-title><h4>CREER UNE OFFRE DE VOYAGE</h4></v-card-title>
                    <v-card-subtitle>Mettre en ligne un nouvel offre de voyage</v-card-subtitle><br>

                    <v-container fluid>
                        <v-row><v-col><v-text-field class="my_input" :error-messages="designationOffreVoyageErrors" dense rounded outlined color="teal" label="Désignation de l'offre" v-model.trim="$v.offreVoyage.designation.$model"></v-text-field></v-col></v-row><br>
                        <v-row><v-col><v-textarea class="my_input" :error-messages="descriptionOffreVoyageErrors" dense outlined rounded color="teal" label="Description de l'offre"></v-textarea></v-col></v-row><br>
                        <v-row>
                            <v-col cols="6"><v-select class="my_input" :error-messages="villeDepartErrors" v-model.trim="$v.offreVoyage.villeDepartDesignation.$model" dense rounded outlined :items="villesList" item-text="designation" item-value="designation" color="teal" prefix="De :" label="Ville de départ"></v-select></v-col>
                            <v-col cols="6"><v-select class="my_input" :error-messages="villeDestinationErrors" v-model.trim="$v.offreVoyage.villeDestinationDesignation.$model" dense rounded outlined :items="villesList" item-text="designation" item-value="designation" color="teal" prefix="Vers :" label="ville d'arrivée"></v-select></v-col>
                        </v-row><br>
                        <v-row>
                            <v-col cols="6"><v-select class="my_input" :items="referenceTypeOffreVoyageList" item-text="designation" item-value="designation" :error-messages="typeOffreVoyageErrors" v-model.trim="$v.offreVoyage.typeOffreVoyageDesignation.$model" dense outlined rounded color="teal" label="Type de voyage"></v-select></v-col>
                        </v-row><br>

                    </v-container>
                    <v-card-actions>
                        <v-btn small rounded dark color="secondary"><v-icon>mdi-sync</v-icon> REINITIALISER</v-btn>
                        <v-btn small type="submit" rounded dark color="primary"><v-icon>mdi-check</v-icon> CRÉER L'OFFRE</v-btn>
                </v-card-actions>
                </v-card>
            </v-container>
        </v-form>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 
        <v-alert class="myalert alert-warning" type="warning" width="350px" dismissible>{{ warningMsg }}</v-alert>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>

<script>
import axios from 'axios';
import { API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE , API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE , API_CREER_OFFRE_VOYAGE , HEADERS } from '../globalConfig/globalConstConfig'
import { required , minLength } from 'vuelidate/lib/validators'
import $ from 'jquery'

export default {
    name:"CreerOffreVoyage",
    data(){
        return{
            successMsg : null, 
            errorMsg:null,
            warningMsg: null,
            overlay : false,

            villesList : [],
            objectValue : {},
            referenceTypeOffreVoyageList : [],
            objectToSend:{
                datas:[],
            },

            offreVoyageToSend:{
                datas:[]
            },
            
        

            offreVoyage:{
                designation : null ,
                description: null,
                compagnieTransportRaisonSociale : "COMPAGNIE KOUEVI CT",
                typeOffreVoyageDesignation : null,
                villeDepartDesignation : null,
                villeDestinationDesignation : null
            },

            referenceTypeOffreVoyage:{
                referenceFamilleDesignation: "referenceFamilleTypeOffreVoyage"
            }
        }
    },

    validations : {
        offreVoyage :{
            designation:{
                required,
                minLength : minLength(4)
            },
            description:{
                required,
                minLength : minLength(4)
            },
            villeDepartDesignation:{
                required,
            },
            villeDestinationDesignation:{
                required,
            },
            typeOffreVoyageDesignation:{
                required
            }
        }
    },

    methods:{

        //OBTENIR REFERENCE DESIGNATION TYPE OFFRE DE VOYAGE
        async obtenirReferenceTypeOffreVoyage(){
            this.objectToSend.datas.push(this.referenceTypeOffreVoyage)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSend , { headers : HEADERS }).then((response) => {
                this.referenceTypeOffreVoyageList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },


        // CREATION D'UNE OFFRE DE VOYAGE 
        async creerOffreVoyage(){
            this.offreVoyageToSend.datas.push(this.offreVoyage)
            this.overlay = true ;
            await axios.post(API_CREER_OFFRE_VOYAGE, this.offreVoyageToSend , { headers : HEADERS }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.offreVoyageToSend.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.offreVoyageToSend.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création de l'offre de voyage";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.offreVoyageToSend.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.offreVoyageToSend.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.offreVoyageToSend.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            })
        },
        


        // RECUPERER LA LISTE DES VILLES ENREGISTRÉES
        async readAllVilleFromApi(){
            this.loading = false
            await axios.post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.objectValue , { headers : HEADERS }).then((response) => {
                this.villesList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },

    },

    computed: {

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UNE OFFRE DE VOYAGE

        designationOffreVoyageErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.designation.$dirty) return errors
            !this.$v.offreVoyage.designation.minLength && errors.push('Au moins quatres (4) caractères pour la designation')
            !this.$v.offreVoyage.designation.required && errors.push('La désignation est obligatoire.')
            return errors 
        },

        descriptionOffreVoyageErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.description.$dirty) return errors
            !this.$v.offreVoyage.description.minLength && errors.push('Au moins quatres (4) caractères pour la description')
            !this.$v.offreVoyage.description.required && errors.push('La description est obligatoire.')
            return errors 
        },

        villeDepartErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.villeDepartDesignation.$dirty) return errors
            !this.$v.offreVoyage.villeDepartDesignation.required && errors.push('La ville de depart est obligatoire.')
            return errors 
        },

        villeDestinationErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.villeDestinationDesignation.$dirty) return errors
            !this.$v.offreVoyage.villeDestinationDesignation.required && errors.push('La ville de destination est obligatoire.')
            return errors 
        },

        typeOffreVoyageErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.typeOffreVoyageDesignation.$dirty) return errors
            !this.$v.offreVoyage.typeOffreVoyageDesignation.required && errors.push('Le type d\'offre de voyage est obligatoire.')
            return errors 
        },

        
    },

    mounted(){
        this.readAllVilleFromApi();
        this.obtenirReferenceTypeOffreVoyage();
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

    h4{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    
    .my_input{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: bolder;
        font-size: 15px;
    }
</style>
