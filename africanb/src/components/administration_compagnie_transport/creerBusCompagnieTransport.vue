<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card max-width="800px" class="mx-auto">
                    <v-card-title><h4>ASSOCIER DES BUS À UNE OFFRE DE VOYAGE</h4>
                        <v-spacer></v-spacer>
                        <v-dialog transition="dialog-top-transition" max-width="700">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="white" rounded small v-bind="attrs" v-on="on">AJOUTER UN BUS</v-btn>
                            </template>
                            <template v-slot:default="dialog">
                                <v-card>
                                    <v-toolbar color="white"><span class="font-weight-bold">INFOS DU BUS</span>
                                        <v-spacer></v-spacer>
                                        <v-btn text small color="black" @click="enregistrerBus(addedBusData)"><v-icon>mdi-check</v-icon>VALIDER</v-btn>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-container fluid>
                                            <v-subheader><v-icon color="#40407a">mdi-alert-circle</v-icon>&nbsp;&nbsp;Le nombre de place et le numéro du bus doivent être au format numerique</v-subheader>
                                            <v-subheader><br>Définissez les références de vos bus : &nbsp;&nbsp;&nbsp; </v-subheader>
                                            <v-row>
                                                <v-col><v-text-field class="my_input" :error-messages="designationBus" v-model.trim="$v.addedBusData.designation.$model" rounded dense outlined label="Réf du bus"></v-text-field></v-col>
                                                <v-col><v-text-field class="my_input" type="number" min="0" :error-messages="numeroBusContrainte" v-model.number="$v.addedBusData.numeroBus.$model" rounded dense outlined label="N° du bus"></v-text-field></v-col>
                                                <v-col><v-text-field class="my_input" type="number" min="0" :error-messages="nbrePlaceBusContrainte" v-model.number="$v.addedBusData.nombrePlace.$model" rounded dense outlined label="Nbre de place"></v-text-field></v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn text @click="dialog.value = false">RETOUR SANS SAUVEGARDER</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-card-title>
                    <v-card-subtitle>Définissez les bus de votre offre de voyage</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="4">
                                <v-select class="my_input" :error-messages="offreVoyageDesignationContainte" v-model.trim="$v.addedBusData.offreVoyageDesignation.$model" :items="offreVoyageParCompagnieTransportList" item-text="designation" item-value="designation" rounded dense outlined color="teal" label="sélectionnez une offre"></v-select>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>   
                        <v-divider></v-divider><br>

                        <v-row>
                            <v-sheet width="750" class="mx-auto">
                                <v-card-title class="title-card"><span><h5>BUS DISPONIBLES OFFRE DE VOYAGE</h5></span>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
                                 </v-card-title>
                                <v-data-table
                                    :headers="headers"
                                    :items="busObject.datas"
                                    :search="search">

                                    <template v-slot:[`item.actions`]="{ item }">                   
                                        <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerBus(item)">mdi-delete</v-icon>
                                    </template>

                                </v-data-table>
                            </v-sheet>
                        </v-row>
                        
                    </v-container>
                    <v-card-actions>
                        <v-btn small shaped rounded outlined>REINITIALISER</v-btn>
                        <v-btn type="submit" small shaped rounded outlined color="#474787">SAUVEGARDER</v-btn>
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
import axios from 'axios'
import $ from 'jquery'
import { required } from 'vuelidate/lib/validators'
import { API_RECUPERER_LISTE_OFFRE_VOYAGE , API_ASSOCIER_BUS_OFFRE_VOYAGE , HEADERS } from '../globalConfig/globalConstConfig'
export default {
    name:'creerBusCompagnieTransport',
    data(){
        return{
            errorMsg : null,
            successMsg:null,
            overlay : false,

            headers:[
                {text : 'Référence' , value : 'designation'},
                {text : 'N° Bus' , value : 'numeroBus'},
                {text : 'nbre de place' , value : 'nombrePlace'},
                {text : 'Voyage' , value : 'offreVoyageDesignation'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],
            search:"",


            offreVoyageParCompagnieTransportList:[],

            busObject:{
                datas:[]
            },

            offreVoyageObject:{
                data:{
                    compagnieTransportRaisonSociale:"KOUEVI CT"
                }
            },

            addedBusData:{
                designation : null,
                numeroBus: null,
                nombrePlace : null,
                offreVoyageDesignation : null ,
            },
        }
    },

    validations:{

        addedBusData:{
            offreVoyageDesignation : {
                required
            },
            designation:{
                required
            },
            numeroBus:{
                required
            },
            nombrePlace:{
                required
            },
        },
    },

    methods:{

        // SOUMETTRE LE FORMULAIRE
        submitForm(){
            if (this.busObject.datas.length == 0) {
                this.errorMsg = 'Aucune référence de transport n\'a été ajouté'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }else{
                this.associerBusOffreVoyage();
            }
        },

        //SUPPRIMER UN BUS
        supprimerBus(position){
            this.busObject.datas.splice(position,1)
        },

        //ENREGISTRER LE BUS
        enregistrerBus(busAdded){
            this.$v.$touch();
            if (this.$v.addedBusData.designation.$invalid || this.$v.addedBusData.numeroBus.$invalid
                || this.$v.addedBusData.nombrePlace.$invalid) {
              this.errorMsg = "Vous devez renseigner toutes les informations" ;
              $(".alert-error").fadeIn();
              setTimeout(function(){
                $(".alert-error").fadeOut(); 
              }, 2000);
            }else if(!this.isOverToZero(this.addedBusData.nombrePlace) || !this.isOverToZero(this.addedBusData.numeroBus)){
                this.errorMsg = "Attention des champs sont incorrects" ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 2000);
            }
            else{
                var busAddedSaisi = {
                    designation : null, 
                    nombrePlace: null,
                    numeroBus : null,
                    offreVoyageDesignation: null,
                }
                busAddedSaisi.designation = busAdded.designation;
                busAddedSaisi.nombrePlace = busAdded.nombrePlace;
                busAddedSaisi.numeroBus = busAdded.numeroBus;
                busAddedSaisi.offreVoyageDesignation = busAdded.offreVoyageDesignation;

                this.busObject.datas.push(busAddedSaisi);

                busAdded.designation = null;
                busAdded.nombrePlace = null;
                busAdded.numeroBus = null;
            }
        },

        // ASSOCIER DES BUS À UNE OFFRE DE VOYAGE
        async associerBusOffreVoyage(){
            this.overlay = true ;
            await axios.post(API_ASSOCIER_BUS_OFFRE_VOYAGE, this.busObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.busObject.datas = [];
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.busObject.datas = [];
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.busObject.datas = [];
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.busObject.datas = [];
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
                this.busObject.datas = [];
            }).finally(() => {
                this.overlay = false;
            })
        },

        //RECUPERER LA LISTE DES OFFRES DE VOYAGES PAR COMPAGNIE DE TRANSPORT
        async obtenirOffreVoyageParCompagnieTransport(){
            await axios.post(API_RECUPERER_LISTE_OFFRE_VOYAGE, this.offreVoyageObject , { headers : HEADERS(this.$store.state.userAuthentified.token) } ).then((response) => {
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

        isOverToZero(item){
            if (item > 0) {
                return true ;
            }
        },

    },

    computed:{
        // GESTION DES CONTRAINTES DES CHAMPS DE SAISIES
        offreVoyageDesignationContainte(){
            const errors = [];
            if (!this.$v.addedBusData.offreVoyageDesignation.$dirty) return errors
            !this.$v.addedBusData.offreVoyageDesignation.required && errors.push('Veuillez sélectionner une offre de voyage.')
            return errors 
        },

        designationBus(){
            const errors = [];
            if (!this.$v.addedBusData.designation.$dirty) return errors
            !this.$v.addedBusData.designation.required && errors.push('Entrer une désignation pour le bus.')
            return errors 
        },

        numeroBusContrainte(){
            const errors = [];
            if (!this.$v.addedBusData.numeroBus.$dirty) return errors
            !this.$v.addedBusData.numeroBus.required && errors.push('Information requis.')
            !this.isOverToZero(this.addedBusData.numeroBus) && errors.push('Champs Incorrect')
            return errors 
        },

        nbrePlaceBusContrainte(){
            const errors = [];
            if (!this.$v.addedBusData.nombrePlace.$dirty) return errors
            !this.$v.addedBusData.nombrePlace.required && errors.push('Information requis.')
            !this.isOverToZero(this.addedBusData.nombrePlace) && errors.push('Champs Incorrect')
            return errors 
        },
    },


    mounted(){
        this.obtenirOffreVoyageParCompagnieTransport();
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

    h5{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 13px;
    }

    .my_input{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: bolder;
        color: #596275;
    }
</style>