<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card>
                    <v-card-title>GESTION DES VILLES EN ESCALES</v-card-title>
                    <v-card-subtitle>Gérer les villes escales pour une offre</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="2"><v-text-field rounded dense outlined label="Ordre escale" type="number" min="0" v-model="villeEscaleModel.position"></v-text-field></v-col>
                            <v-col cols="5"><v-select label="Sélectionner une ville" :items="villesList" item-text="designation" v-model="villeEscaleModel.villeDesignation" item-value="designation" dense outlined rounded></v-select></v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn rounded outlined small>REINITIALISER</v-btn>
                        <v-btn type="submit" rounded outlined small color="teal">ENREGISTRER LES MODIFICATIONS</v-btn>
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
import axios from "axios";
import $ from 'jquery';
import { API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE , API_CREER_VILLES_ESCALES_OFFRE_VOYAGE, HEADERS } from '../globalConfig/globalConstConfig'
export default {
    name:'ModifierVilleEscaleOffreVoyage',
    data(){
        return{
            errorMsg :null,
            successMsg:null,
            overlay:false,

            objectValue:{},
            villesList:[],

            villeEscaleModel:{
                id:null,
                position: null,
                villeDesignation:null,
            },

            villeEscaleToModify:{
                datas:[]
            }
        }
    },

    methods:{

        // SOUMISSION DU FORMULAIRE DE MODIFICATION
        submitForm(){
            this.enregistrerModificationVilleEscale();
        },

        //ENREGISTRER LES MODIFICATIONS PORTANT SUR UNE VILLE D'ESCALE
        async enregistrerModificationVilleEscale(){
            this.villeEscaleToModify.datas.push(this.villeEscaleModel);
            this.overlay = true ;
            await axios.put(API_CREER_VILLES_ESCALES_OFFRE_VOYAGE , this.villeEscaleToModify , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.villeEscaleToModify.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.villeEscaleToModify.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la modification de l'offre de voyage";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.villeEscaleToModify.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de modification impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.villeEscaleToModify.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.villeEscaleToModify.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            })
        },

        // MODE EDITION D'UNE VILLE ESCALE
        async editerVilleEscale(){
            if (localStorage.getItem("villeEscaleEdit")) {
                try {
                    const villeEscaleEditing = JSON.parse(localStorage.getItem("villeEscaleEdit"));
                    this.villeEscaleModel.id = villeEscaleEditing.id;
                    this.villeEscaleModel.villeDesignation = villeEscaleEditing.designation;
                    this.villeEscaleModel.position = villeEscaleEditing.position;
                    localStorage.removeItem("villeEscaleEdit");
                } catch (error) {
                    localStorage.removeItem("villeEscaleEdit");
                }
            }else{
                this.$router.replace({path:'/selectionnerOffreVoyage'})
            }
        },

        //RECUPERER LA LISTE DES VILLES DISPONIBLES
        async obtenirVillesListApi(){
            await axios.post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.objectValue , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
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

    computed:{},

    mounted(){
        this.obtenirVillesListApi();
        this.editerVilleEscale();
    },
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