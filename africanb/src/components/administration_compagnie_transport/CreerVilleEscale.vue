<template>
    <v-app>
        <v-form>
            <v-container fluid>
                <v-card>
                    <v-card-title>GESTION DES VILLES EN ESCALES
                        <v-spacer></v-spacer>
                        <v-dialog transition="dialog-top-transition" max-width="700">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="secondary" rounded small v-bind="attrs" v-on="on">Ajouter des villes escales &nbsp;<v-icon>mdi-plus-circle</v-icon></v-btn>
                            </template>
                            <template v-slot:default="dialog">
                                <v-card>
                                    <v-toolbar color="white"><span class="font-weight-bold">PARAMÈTRAGE DES VILLES D'ESCALES</span></v-toolbar>
                                    <v-card-text>
                                        <v-container fluid>
                                            <v-subheader>Définissez l'ordre et vos villes pour les escales
                                                <v-spacer></v-spacer>
                                                <v-btn small rounded icon title="Ajouter une ville" @click="ajouterNouvelleVilleEscale()"><v-icon color="black" size="20">mdi-plus</v-icon></v-btn>
                                            </v-subheader>
                                            <v-row justify="space-between" v-for="ville , index in villesEscalesList" :key="index">
                                                <v-col cols="3"><v-text-field color="black" :error-messages="positionRequired" dense outlined rounded type="number" min="0" label="N° Ordre"></v-text-field></v-col>
                                                <v-col cols="6"><v-select :items="villesList" :error-messages="villeDesignation" item-text="designation" item-value="designation" dense outlined rounded label="Sélectionnez la ville"></v-select></v-col>
                                                <v-col><v-btn icon dense @click="saveVilleEscale()"><v-icon color="primary">mdi-content-save-edit</v-icon></v-btn></v-col>
                                                <v-col><v-btn icon dense @click="supprimerVilleEscale(index)"><v-icon color="red">mdi-delete</v-icon></v-btn></v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn text @click="dialog.value = false">Effectuer</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-card-title>
                    <v-card-subtitle>Gérer les villes escales pour une offre</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-select :error-messages="offreVoyageDesignation" v-model.trim="$v.villeEscaleData.offreVoyageDesignation.$model" dense outlined color="teal" label="sélectionnez une offre"></v-select>
                            </v-col>
                        </v-row>
                        <v-row justify="space-around">
                            <v-btn rounded outlined>REINITIALISER</v-btn>
                            <v-btn rounded outlined color="primary">APPLIQUER</v-btn>
                        </v-row><br>
                    </v-container>
                </v-card>
            </v-container>
        </v-form>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
    </v-app>
</template>

<script>
import { API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE } from '../globalConfig/globalConstConfig'
import axios from 'axios'
import $ from 'jquery'
import { required } from 'vuelidate/lib/validators'

export default {
    name:"CreerVilleEscale",
    data(){
        return{
            errorMsg:null,

            villesEscalesList:[],
            villesList:[],

            objectValue:{},

            villesObject : {
                datas : []
            },

            villeEscaleData:{
                offreVoyageDesignation : null,
                villeDesignation : null,
                position : null ,
            }
        }
    },

    validations : {

        villeEscaleData:{
            offreVoyageDesignation : {
                required
            },
            villeDesignation:{
                required
            },
            position:{
                required
            }
        }
    },

    methods:{

        // ENREGISTRER UNE VILLE DANS LA LISTE DES VILLES ESCALES
        async saveVilleEscale(){},

        //AJOUTER UNE VILLE ESCALE
        ajouterNouvelleVilleEscale(){
            var nouvelleVille = {}
            this.villesEscalesList.push(nouvelleVille);
        },

        //SUPPRIMER UNE VILLE ESCALE 
        supprimerVilleEscale(position){
            this.villesEscalesList.splice(position,1)
        },

        //RECUPERER LA LISTE DES VILLES DISPONIBLES
        async obtenirVillesListApi(){
            await axios.post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.objectValue).then((response) => {
                this.villesList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        }
    },

    computed:{

        // CONTRAINTES POUR L'ENREGISTREMENT DES VILLES ESCALES

        villeDesignation(){
           const errors = [];
            if (!this.$v.villeEscaleData.villeDesignation.$dirty) return errors
            !this.$v.villeEscaleData.villeDesignation.required && errors.push('Le champs ville est obligatoire.')
            return errors 
        },

        offreVoyageDesignation(){
           const errors = [];
            if (!this.$v.villeEscaleData.offreVoyageDesignation.$dirty) return errors
            !this.$v.villeEscaleData.offreVoyageDesignation.required && errors.push('Veuillez sélectionner une offre de voyage.')
            return errors 
        },

        positionRequired(){
           const errors = [];
            if (!this.$v.villeEscaleData.position.$dirty) return errors
            !this.$v.villeEscaleData.position.required && errors.push('Definissez une position.')
            return errors 
        },

    },

    mounted(){
        this.obtenirVillesListApi();
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