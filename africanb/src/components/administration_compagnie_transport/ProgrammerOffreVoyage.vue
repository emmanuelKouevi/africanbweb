<template>
    <v-app>
        <v-form>
            <v-container fluid>
                <v-card>
                    <v-card-title>PROGRAMMER UNE OFFRE DE VOYAGE
                        <v-spacer></v-spacer>
                        <v-dialog transition="dialog-top-transition" max-width="700">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="secondary" rounded small v-bind="attrs" v-on="on">Programmer l'offre &nbsp;<v-icon>mdi-plus-circle</v-icon></v-btn>
                            </template>
                            <template v-slot:default="dialog">
                                <v-card>
                                    <v-toolbar color="white" ><span class="font-weight-bold">PROGRAMMATION DE L'OFFRE</span></v-toolbar>
                                    <v-card-text>
                                        <v-container fluid>
                                            <v-subheader>***Remplissez les champs de saisies pour la programmation de votre offre
                                                <v-spacer></v-spacer>
                                            </v-subheader>
                                            <v-divider></v-divider><br>
                                            <v-row justify="space-between">
                                                <v-col><v-text-field label="Designation du programme" rounded dense outlined></v-text-field></v-col>
                                                <v-col><v-select dense rounded outlined label="Jour de la semaine" :items="jourSemaineList" item-value="designation" item-text="designation"></v-select></v-col>
                                            </v-row>
                                            <v-row justify="space-between">
                                                <v-col>
                                                    <v-menu ref="menuDateDepart" v-model="menuDateDepart" :close-on-content-click="false" :return-value.sync="date"
                                                        transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field rounded dense outlined v-model="programmeOffreVoyage.dateDepart" label="Date de départ" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="programmeOffreVoyage.dateDepart" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="menuDateDepart = false">Cancel</v-btn>
                                                            <v-btn text color="primary" @click="$refs.menuDateDepart.save(date)">OK</v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col>
                                                    <v-menu ref="menuDateArrivee" v-model="menuDateArrivee" :close-on-content-click="false" :return-value.sync="date"
                                                        transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field rounded dense outlined v-model="programmeOffreVoyage.dateArrivee" label="Date d'arrivée" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="programmeOffreVoyage.dateArrivee" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="menuDateArrivee = false">Cancel</v-btn>
                                                            <v-btn text color="primary" @click="$refs.menuDateArrivee.save(date)">OK</v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <v-menu ref="menuHeureDepart" v-model="menuHeureDepart" :close-on-content-click="false" :nudge-right="40" :return-value.sync="programmeOffreVoyage.heureDepart"
                                                        transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field dense outlined rounded v-model="programmeOffreVoyage.heureDepart" label="Heure de départ" prepend-icon="mdi-clock-time-four-outline"
                                                                readonly v-bind="attrs" v-on="on">
                                                            </v-text-field>
                                                        </template>
                                                        <v-time-picker v-if="menuHeureDepart" v-model="programmeOffreVoyage.heureDepart" full-width @click:minute="$refs.menuHeureDepart.save(programmeOffreVoyage.heureDepart)"></v-time-picker>
                                                    </v-menu>
                                                </v-col>

                                                <v-col>
                                                    <v-menu ref="menuHeureArrivee" v-model="menuHeureArrivee" :close-on-content-click="false" :nudge-right="40" :return-value.sync="programmeOffreVoyage.heureArrivee"
                                                        transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field dense rounded outlined v-model="programmeOffreVoyage.heureArrivee" label="Heure d'arrivée" prepend-icon="mdi-clock-time-four-outline"
                                                                readonly v-bind="attrs" v-on="on">
                                                            </v-text-field>
                                                        </template>
                                                        <v-time-picker v-if="menuHeureArrivee" v-model="programmeOffreVoyage.heureArrivee" full-width @click:minute="$refs.menuHeureArrivee.save(programmeOffreVoyage.heureArrivee)"></v-time-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-divider></v-divider><br>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn text @click="dialog.value = false">Effectuer</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-card-title>
                    <v-card-subtitle>Programmez les trajets, les jours , les heures de vos offres</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-select :error-messages="offreVoyageDesignation" v-model.trim="$v.programmeOffreVoyage.offreVoyageDesignation.$model" dense outlined color="teal" label="sélectionnez une offre"></v-select>
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
import axios from 'axios';
import $ from 'jquery';
import { API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE } from '../globalConfig/globalConstConfig'
import { required } from 'vuelidate/lib/validators'
export default {
    name:"ProgrammerOffreVoyage",
    data(){
        return{
            menuDateDepart :false,
            menuDateArrivee: false,

            menuHeureDepart:false,
            menuHeureArrivee:false,
            time:null,
            errorMsg:null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            jourSemaineList : [],

            programmeObject:{
                datas:[]
            },

            programmeOffreVoyage:{
                offreVoyageDesignation:null,
                designation:null,
                jourSemaine:null,
                dateDepart:null,
                dateArrivee:null,
                heureDepart:null,
                heureArrivee:null
            },

            referenceJourSemaine:{
                referenceFamilleDesignation : 'referenceFamilleJourSemaine'
            },

            objectToSend:{
                datas:[]
            }
        }
    },

    validations:{

        programmeOffreVoyage:{
            offreVoyageDesignation:{
                required
            },

            designation:{
                required,
            },

            jourSemaine:{
                required
            }
        }

    },


    methods:{

        //OBTENIR LISTE DES JOURS DE LA SEMAINE
        async obtenirJourSemaineList(){
            this.objectToSend.datas.push(this.referenceJourSemaine);
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE , this.objectToSend).then((response) => {
                this.jourSemaineList = response.data.items;
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
        
        // GESTIONS DES CONTRAINTES POUR LES CHAMPS DE SAISIES

        offreVoyageDesignation(){
           const errors = [];
            if (!this.$v.programmeOffreVoyage.offreVoyageDesignation.$dirty) return errors
            !this.$v.programmeOffreVoyage.offreVoyageDesignation.required && errors.push('Veuillez sélectionner une offre de voyage.')
            return errors 
        },

    },

    mounted(){
        this.obtenirJourSemaineList();
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