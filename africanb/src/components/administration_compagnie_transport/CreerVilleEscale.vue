<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
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
                                            <v-subheader><br>Définissez le nombre de villes d'escales : &nbsp;&nbsp;&nbsp; </v-subheader>
                                            <v-row>
                                                <v-col cols="3"><v-text-field label="Ordre escale" type="number" min="0" v-model="villeEscaleData.position" dense outlined rounded></v-text-field></v-col>
                                                <v-col cols="5"><v-select label="Villes escales" :items="villesList" item-text="designation" v-model="villeEscaleData.villeDesignation" item-value="designation" dense outlined rounded></v-select></v-col>
                                                <v-col cols="3"><v-btn icon @click="validerVilleEscale(villeEscaleData)"><v-icon color="black">mdi-check</v-icon></v-btn></v-col>
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
                                <v-select :items="offreVoyageParCompagnieTransportList" item-text="designation" item-value="designation" :error-messages="offreVoyageDesignation" v-model.trim="$v.villeEscaleData.offreVoyageDesignation.$model" dense outlined rounded color="teal" label="sélectionnez une offre"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-card width="750">
                                <v-card-title class="title-card"><span>Villes Escales</span>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
                                 </v-card-title>
                                <v-data-table
                                    :headers="headers"
                                    :items="villesObject.datas"
                                    :search="search">

                                    <template v-slot:[`item.isActived`]="{ item }">
                                        <v-chip x-small v-if="item.isActived == true" color="success" text-color="white" class="mr-2"><span class="etat font-weight-bold">active</span></v-chip>
                                        <v-chip x-small v-else color="red" text-color="white" class="mr-2"><span class="etat">non-active</span></v-chip>
                                    </template>

                                    <template v-slot:[`item.actions`]="{ item }">                   
                                        <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerVilleEscale(item)">mdi-delete</v-icon>
                                    </template>

                                </v-data-table>
                            </v-card>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn rounded outlined small>REINITIALISER</v-btn>
                        <v-btn type="submit" rounded outlined small color="primary">APPLIQUER</v-btn>
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
import { API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE , API_RECUPERER_LISTE_OFFRE_VOYAGE , API_CREER_VILLES_ESCALES_OFFRE_VOYAGE, HEADERS} from '../globalConfig/globalConstConfig'
import axios from 'axios'
import $ from 'jquery'
import { required } from 'vuelidate/lib/validators'

export default {
    name:"CreerVilleEscale",
    data(){
        return{
            errorMsg:null,
            successMsg : null,
            overlay: false,
            headers:[
                {text : 'Ordre' , value : 'position'},
                {text : 'Ville' , value : 'villeDesignation'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],
            search:"",


            offreVoyageObject:{
                data:{
                    compagnieTransportRaisonSociale:"COMPAGNIE KOUEVI CT"
                }
            },

            offreVoyageParCompagnieTransportList:[],

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
            },
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

        // SOUMETTRE LE FORMULAIRE

        submitForm(){
            this.$v.$touch();
            if (this.$v.villeEscaleData.$invalid) {
              this.errorMsg = "Certaines informations requises n'ont pas été renseigné" ;
              $(".alert-error").fadeIn();
              setTimeout(function(){
                $(".alert-error").fadeOut(); 
              }, 2000);
            } 
            else {
                this.creerVillesEscaleOffreVoyage();
            }
        },

        // CREER VILLES ESCALES POUR OFFRE DE VOYAGES
        async creerVillesEscaleOffreVoyage(){
            this.overlay = true ;
            await axios.post(API_CREER_VILLES_ESCALES_OFFRE_VOYAGE, this.villesObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.villesObject.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.villesObject.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création de l'offre de voyage";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.villesObject.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.villesObject.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.villesObject.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            })
        },

        // OBTENIR LA LISTE DES OFFRES DE VOYAGES PAR COMPAGNIES
        async obtenirOffresVoyageParCompagnies(){
            axios.post(API_RECUPERER_LISTE_OFFRE_VOYAGE, this.offreVoyageObject, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.offreVoyageParCompagnieTransportList = response.data.items
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
            })
        },


        //VALIDER LE NOMBRE DE VILLES ESCALES
        validerVilleEscale(villeEscale){
            this.$v.$touch();
            if (this.$v.villeEscaleData.position.$invalid || this.$v.villeEscaleData.villeDesignation.$invalid) {
              this.errorMsg = "Le numero d'ordre et la ville escale sont obligatoire" ;
              $(".alert-error").fadeIn();
              setTimeout(function(){
                $(".alert-error").fadeOut(); 
              }, 2000);
            } 
            else{
                var villeEscaleSaisi = {
                    position: null,
                    villeDesignation : null,
                    offreVoyageDesignation: null,
                }
                villeEscaleSaisi.position = villeEscale.position;
                villeEscaleSaisi.villeDesignation = villeEscale.villeDesignation;
                villeEscaleSaisi.offreVoyageDesignation = villeEscale.offreVoyageDesignation;

                this.villesObject.datas.push(villeEscaleSaisi);
            }
        },


        //SUPPRIMER UNE VILLE ESCALE 
        supprimerVilleEscale(position){
            this.villesObject.datas.splice(position,1)
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
        this.obtenirOffresVoyageParCompagnies();
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