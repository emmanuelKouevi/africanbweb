<template>
    <v-app>
        <v-form @submit.prevent="creerOffreVoyage()">
            <v-container fluid>
                <v-card elevation="5">
                    <v-card-title>CREER UNE OFFRE DE VOYAGE</v-card-title>
                    <v-card-subtitle>Mettre en ligne un nouvel offre de voyage</v-card-subtitle><br>

                    <v-container fluid>
                        <v-row><v-col><v-text-field :error-messages="designationOffreVoyageErrors" dense rounded outlined color="teal" label="Désignation de l'offre" v-model.trim="$v.offreVoyage.designation.$model" ></v-text-field></v-col></v-row><br>
                        <v-row><v-col><v-textarea :error-messages="descriptionOffreVoyageErrors" dense outlined rounded color="teal" label="Description de l'offre"></v-textarea></v-col></v-row><br>
                        <v-row>
                            <v-col cols="6"><v-select :error-messages="villeDepartErrors" v-model.trim="$v.offreVoyage.villeDepartDesignation.$model" dense rounded outlined :items="villesList" item-text="designation" item-value="designation" color="teal" prefix="De :" label="Ville de départ"></v-select></v-col>
                            <v-col cols="6"><v-select :error-messages="villeDestinationErrors" v-model.trim="$v.offreVoyage.villeDestinationDesignation.$model" dense rounded outlined :items="villesList" item-text="designation" item-value="designation" color="teal" prefix="Vers :" label="ville d'arrivée"></v-select></v-col>
                        </v-row><br>
                        <v-row>
                            <v-col cols="6"><v-select :items="referenceTypeOffreVoyageList" item-text="designation" item-value="designation" :error-messages="typeOffreVoyageErrors" v-model.trim="$v.offreVoyage.typeOffreVoyageDesignation.$model" dense outlined rounded color="teal" label="Type de voyage"></v-select></v-col>
                        </v-row><br>

                        <v-row justify="space-around">
                            <v-col cols="6"><v-btn outlined rounded><v-icon>mdi-sync</v-icon> REINITIALISER</v-btn></v-col>
                            <v-col cols="6"><v-btn type="submit" outlined rounded dark color="teal"><v-icon>mdi-check</v-icon> CRÉER L'OFFRE</v-btn></v-col>                
                        </v-row>
                    </v-container>
                </v-card>
            </v-container>
        </v-form>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 
        <v-alert class="myalert alert-warning" type="warning" width="350px" dismissible>{{ warningMsg }}</v-alert>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>

                <!--
                <v-expansion-panel>
                    <v-expansion-panel-header class="font-weight-bold">PROGRAMME DE L'OFFRE</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-subheader>Programmez vos offres de voyages
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn rounded small color="secondary" dark v-bind="attrs" v-on="on"><v-icon>mdi-calendar-sync</v-icon> Programmer une offre</v-btn>
                                </template>

                                <v-card>
                                    <v-toolbar dark dense color="teal">
                                        <v-btn icon dark @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                                        <v-toolbar-title><span class="font-weight-bold">Programmer une offre</span></v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-toolbar-items>
                                            <v-btn dark text @click="dialog = false">Save</v-btn>
                                        </v-toolbar-items>
                                    </v-toolbar><br>

                                    <v-container>
                                        <v-row>                                          
                                            <v-col cols="12" sm="6">
                                                <v-text-field disabled rounded outlined dense color="teal" v-model="dateRangeText" label="Jour de la semaine" prepend-icon="mdi-calendar" readonly></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6">
                                                <v-date-picker color="teal" v-model="dates"></v-date-picker>
                                            </v-col>
                                        </v-row>
                                    </v-container>

                                    <v-divider></v-divider>

                                    <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                    :return-value.sync="date" transition="scale-transition" offset-y
                                                    min-width="auto">

                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="date" label="Date de départ" prepend-icon="mdi-calendar"
                                                            readonly v-bind="attrs" v-on="on">
                                                        </v-text-field>
                                                    </template>

                                                    <v-date-picker v-model="date" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>

                                            <v-col>
                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                    :return-value.sync="date" transition="scale-transition" offset-y
                                                    min-width="auto">

                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="date" label="Date d'arrivée" prepend-icon="mdi-calendar"
                                                            readonly v-bind="attrs" v-on="on">
                                                        </v-text-field>
                                                    </template>

                                                    <v-date-picker v-model="date" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col>
                                                <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                                                    :return-value.sync="time" transition="scale-transition" offset-y max-width="290px"
                                                    min-width="290px">

                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="heureDepart" label="Heure de départ" prepend-icon="mdi-clock-time-four-outline"
                                                            readonly v-bind="attrs" v-on="on">
                                                        </v-text-field>
                                                    </template>
                                                    <v-time-picker v-if="menu2" v-model="heureDepart" full-width 
                                                        @click:minute="$refs.menu.save(heureDepart)">
                                                    </v-time-picker>
                                                </v-menu>
                                            </v-col>

                                            <v-col>
                                                <v-menu ref="menu" v-model="menu3" :close-on-content-click="false" :nudge-right="40"
                                                    :return-value.sync="time" transition="scale-transition" offset-y max-width="290px"
                                                    min-width="290px">

                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="heureDepart" label="Heure d'arrivée'" prepend-icon="mdi-clock-time-four-outline"
                                                            readonly v-bind="attrs" v-on="on">
                                                        </v-text-field>
                                                    </template>
                                                    <v-time-picker v-if="menu3" v-model="heureArrivee" full-width 
                                                        @click:minute="$refs.menu.save(heureArrivee)">
                                                    </v-time-picker>
                                                </v-menu>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                        
                                    <v-divider></v-divider>
                                </v-card>
                            </v-dialog>
                        </v-subheader>
                                
                    </v-expansion-panel-content>
                </v-expansion-panel>

                -->

                <!--
                <v-expansion-panel>
                        <v-expansion-panel-header class="font-weight-bold">CARACTERISTIQUES DE L'OFFRE</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row>
                            <v-col>
                                <v-checkbox label="Wifi à bord" color="teal" value="red" hide-details></v-checkbox>
                            </v-col>
                            <v-col>
                                <v-checkbox label="Prise éléctrique" color="teal" value="red" hide-details></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            -->
    </v-app>
</template>

<script>
import axios from 'axios';
import { API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE , API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE , API_CREER_OFFRE_VOYAGE } from '../globalConfig/globalConstConfig'
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
            villesEscalesList:[],
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
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSend).then((response) => {
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
            await axios.post(API_CREER_OFFRE_VOYAGE, this.offreVoyageToSend).then((response) => {
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
        

        // AJOUTER UNE VILLE D'ESCALE
        ajouterNouvelleVilleEscale(){
            var nouvelleVille = {}
            this.villesEscalesList.push(nouvelleVille);
        },


        // SUPPRIMER UNE VILLE D'ESCALE
        supprimerVilleEscale(position){
            this.villesEscalesList.splice(position , 1);
        },

        // RECUPERER LA LISTE DES VILLES ENREGISTRÉES
        async readAllVilleFromApi(){
            this.loading = false
            await axios.post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.objectValue).then((response) => {
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
</style>