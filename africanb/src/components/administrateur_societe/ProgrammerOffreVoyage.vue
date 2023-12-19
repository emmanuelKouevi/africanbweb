<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-sheet color="#ecf0f1" height="500">
                    
                </v-sheet>
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
                                            <v-subheader>
                                                <v-spacer></v-spacer>
                                                <v-btn small outlined rounded color="secondary" @click="recupererJourSemaineParOfrreVoyage()" text><v-icon>mdi-cached</v-icon> RECUPERER LES JOURS</v-btn>
                                                <v-btn small outlined rounded color="primary" text @click="validerProgrammeOffreVoyage(programmeOffreVoyage)"><v-icon>mdi-check</v-icon> VALIDER LE PROGRAMME</v-btn>
                                            </v-subheader>
                                            <v-divider></v-divider><br>
                                            <v-row justify="space-between">
                                                <v-col cols="5"><v-text-field :error-messages="programmeOffreDesignation" v-model.trim="$v.programmeOffreVoyage.designation.$model" label="Designation du programme" rounded dense outlined></v-text-field></v-col>
                                                <v-col cols="5"><v-select :error-messages="programmeOffreJourSemaineDesignation" :items="jourSemaineList" item-text="jourSemaineDesignation" item-value="designation"  v-model.trim="$v.programmeOffreVoyage.jourSemaineDesignation.$model" label="Designation du programme" rounded dense outlined></v-select></v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <v-menu ref="menuHeureDepart" v-model="menuHeureDepart" :close-on-content-click="false" :nudge-right="40" :return-value.sync="programmeOffreVoyage.heureDepart"
                                                        transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field :error-messages="programmeOffreHeureDepart" dense outlined rounded v-model.trim="$v.programmeOffreVoyage.heureDepart.$model" label="Heure de départ" prepend-icon="mdi-clock-time-four-outline"
                                                                readonly v-bind="attrs" v-on="on">
                                                            </v-text-field>
                                                        </template>
                                                        <v-time-picker v-if="menuHeureDepart" v-model.trim="$v.programmeOffreVoyage.heureDepart.$model" full-width @click:minute="$refs.menuHeureDepart.save(programmeOffreVoyage.heureDepart)"></v-time-picker>
                                                    </v-menu>
                                                </v-col>

                                                <v-col>
                                                    <v-menu ref="menuHeureArrivee" v-model="menuHeureArrivee" :close-on-content-click="false" :nudge-right="40" :return-value.sync="programmeOffreVoyage.heureArrivee"
                                                        transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field :error-messages="programmeOffreHeureArrivee" dense rounded outlined v-model.trim="$v.programmeOffreVoyage.heureArrivee.$model" label="Heure d'arrivée" prepend-icon="mdi-clock-time-four-outline"
                                                                readonly v-bind="attrs" v-on="on">
                                                            </v-text-field>
                                                        </template>
                                                        <v-time-picker v-if="menuHeureArrivee" v-model.trim="$v.programmeOffreVoyage.heureArrivee.$model" full-width @click:minute="$refs.menuHeureArrivee.save(programmeOffreVoyage.heureArrivee)"></v-time-picker>
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
                            <v-col cols="5">
                                <v-select :items="offreVoyageParCompagnieTransportList" item-text="designation" item-value="designation" rounded  v-model="offreVoyageReference"  dense outlined color="teal" label="sélectionnez une offre"></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col><small class="libelle-programme">Offre de Voyage</small></v-col>
                            <v-col><small class="libelle-programme">Programmer pour</small></v-col>
                            <v-col><small class="libelle-programme">Heure de départ</small></v-col>
                            <v-col><small class="libelle-programme">Heure d'arrivée</small></v-col>
                        </v-row>

                        <v-row v-for="programme , index in programmeOffreVoyageList" :key="index">
                            <v-col><small class="libelle-programme">{{ programme.designation }}</small></v-col>
                            <v-col><small class="libelle-programme">{{ programme.jourSemaineDesignation }}</small></v-col>
                            <v-col><small class="libelle-programme">{{ programme.heureDepart }}</small></v-col>
                            <v-col><small class="libelle-programme">{{ programme.heureArrivee }}</small></v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn small shaped rounded outlined>REINITIALISER</v-btn>
                        <v-btn type="submit" small shaped rounded outlined color="primary">APPLIQUER</v-btn>
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
import $ from 'jquery';
import { API_RECUPERER_LISTE_OFFRE_VOYAGE , API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE , API_CREER_PROGRAMME_OFFRE_VOYAGE , HEADERS} from '../globalConfig/globalConstConfig'
import { required } from 'vuelidate/lib/validators'
export default {
    name:"ProgrammerOffreVoyage",
    data(){
        return{
            overlay: false,
            errorMsg:null,
            successMsg:null,

            menuHeureDepart:false,
            menuHeureArrivee:false,
            time:null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            jourSemaineList : [],

            jourSemaineParOffreVoyage:{
                data:{
                    designation:null
                }
            },

            programmeObject:{
                datas:[]
            },

            offreVoyageReference : null,

            programmeOffreVoyageList:[],

            programmeOffreVoyage:{
                designation:null,
                jourSemaineDesignation:null,
                heureDepart:null,
                heureArrivee:null
            },

            objectToSend:{
                datas:[]
            },

            offreVoyageObject:{
                data:{
                    compagnieTransportRaisonSociale:"COMPAGNIE KOUEVI CT"
                }
            },

            offreVoyageParCompagnieTransportList:[]
        }
    },

    validations:{

        programmeOffreVoyage:{
            designation:{
                required,
            },

            jourSemaineDesignation:{
                required
            },

            heureArrivee:{
                required
            },
            heureDepart:{
                required
            }
        },


    },


    methods:{

        //SOUMISSION DU FORMULAIRE
        submitForm(){
            this.enregistrerProgrammeOffreVoyage();
        },

        //ENREGISTRER UN PROGRAMME POUR UNE OFFRE DE VOYAGE
        async enregistrerProgrammeOffreVoyage(){
            this.programmeObject.datas = this.programmeOffreVoyageList ;
            this.overlay = true ;
            await axios.post(API_CREER_PROGRAMME_OFFRE_VOYAGE, this.programmeObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.programmeObject.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.programmeObject.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création de l'offre de voyage";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.programmeObject.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.programmeObject.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.programmeObject.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            }) 
        },

        //VALIDER PROGRAMME D'UNE OFFRE EN FONCTION DU COURS DE SEMAINE
        validerProgrammeOffreVoyage(programmeOffre){
            this.$v.$touch();
            if (this.$v.programmeOffreVoyage.$invalid) {
                this.errorMsg = "Vous avez omis certains champs" ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 2000);
            }else{
                var unProgramme = {
                    designation : null,
                    jourSemaineDesignation : null,
                    heureDepart : null,
                    heureArrivee : null,
                };
                unProgramme.designation = programmeOffre.designation; 
                unProgramme.jourSemaineDesignation = programmeOffre.jourSemaineDesignation;
                unProgramme.heureDepart = programmeOffre.heureDepart;
                unProgramme.heureArrivee = programmeOffre.heureArrivee;
                this.programmeOffreVoyageList.push(unProgramme);
            }
        },

        
        // RECUPERER LA LISTE DES JOURS RATTACHÉS A UNE OFFRE DE VOYAGE (PAR OFFRE VOYAGE)
        async recupererJourSemaineParOfrreVoyage(){
            this.jourSemaineParOffreVoyage.data.designation = this.offreVoyageReference;
            await axios.post(API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE, this.jourSemaineParOffreVoyage , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.jourSemaineList = response.data.items;
                    }
                }  
            }).catch((e) => {
                this.errorMsg = e
            })
        },

        // RECUPERER LA LISTE DES OFFRES DE VOYAGES DISPONIBLES PAR COMPAGNIE DE TRANSPORT
        async obtenirOffreVoyageParCompagnieTransport(){
            await axios.post(API_RECUPERER_LISTE_OFFRE_VOYAGE, this.offreVoyageObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
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

    },

    computed:{
        
        // GESTIONS DES CONTRAINTES POUR LES CHAMPS DE SAISIES

        programmeOffreDesignation(){
           const errors = [];
            if (!this.$v.programmeOffreVoyage.designation.$dirty) return errors
            !this.$v.programmeOffreVoyage.designation.required && errors.push('Ce programme doit avoir un designation.')
            return errors 
        },

        programmeOffreJourSemaineDesignation(){
           const errors = [];
            if (!this.$v.programmeOffreVoyage.jourSemaineDesignation.$dirty) return errors
            !this.$v.programmeOffreVoyage.jourSemaineDesignation.required && errors.push('Selectionner un jour pour la programmation.')
            return errors 
        },

        programmeOffreHeureArrivee(){
           const errors = [];
            if (!this.$v.programmeOffreVoyage.heureArrivee.$dirty) return errors
            !this.$v.programmeOffreVoyage.heureArrivee.required && errors.push('Programmez une heure d\'arrivée.')
            return errors 
        },

        programmeOffreHeureDepart(){
           const errors = [];
            if (!this.$v.programmeOffreVoyage.heureDepart.$dirty) return errors
            !this.$v.programmeOffreVoyage.heureDepart.required && errors.push('Programmez une heure de départ.')
            return errors 
        },

    },

    mounted(){
        this.obtenirOffreVoyageParCompagnieTransport();
    }
}
</script>

<style scoped>
    
    .libelle-programme{
        color: grey;
        font-weight: 500;
        font-size: 13px;
    }

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