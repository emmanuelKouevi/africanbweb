<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card width="1200" elevation="3">
                    <v-card-title>MODE D'ABONNEMENTS</v-card-title>
                    <v-card-subtitle>Définissez vos modes d'abonnements</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="5">
                                <v-select :items="referenceAbonnementList" item-text="designation" item-value="designation" :error-messages="typeAbonnementErrors" rounded dense outlined color="teal" label="Type d'abonnement" v-model="typeAbonnement"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container v-if="typeAbonnement == 'AbonnementPeriodique'">
                        <v-row>
                            <v-col>
                                <v-text-field :error-messages="designationAbonnementErrors" rounded dense outlined label="Désignation de l'abonnement" v-model.trim="$v.modeAbonnementPeriodiqueModel.designation.$model"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field :error-messages="redevanceAbonnementErrors" rounded dense outlined color="teal" label="redevance" suffix="FCFA" v-model.trim="$v.modeAbonnementPeriodiqueModel.redevance.$model"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-menu ref="menuDebutAbonnement" v-model="menuDebutAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :error-messages="dateDebutAbonnementErrors" dense outlined rounded v-model="dateDebutAbonnementPeriodique" label="Debut de l'abonnement" prepend-icon="mdi-clock-time-four-outline"
                                            readonly  v-bind="attrs" v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="menuDebutAbonnement = false" v-model="dateDebutAbonnementPeriodique" no-title></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col>
                                <v-menu ref="menuFinAbonnement" v-model="menuFinAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :error-messages="dateFinAbonnementErrors" dense outlined rounded v-model="dateFinAbonnementPeriodique" label="Fin de l'abonnement" prepend-icon="mdi-clock-time-four-outline"
                                            readonly  v-bind="attrs" v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="menuFinAbonnement = false" v-model="dateFinAbonnementPeriodique" no-title></v-date-picker>
                                </v-menu>
                            </v-col>

                            
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field :error-messages="redevancePubAbonnementErrors" rounded dense outlined color="teal" label="redevance publicité" v-model.trim="$v.modeAbonnementPeriodiqueModel.redevancePublicite.$model" suffix="FCFA" ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select :items="referencePeriodiciteList" item-value="designation" item-text="designation" :error-messages="periodiciteAbonnementErrors" rounded dense outlined color="teal" label="périodicité Abonnement" v-model.trim="$v.modeAbonnementPeriodiqueModel.periodiciteAbonnementDesignation.$model"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-container v-if="typeAbonnement == 'AbonnementPrelevement'">
                        <v-row>
                            <v-col>
                                <v-text-field :error-messages="designationAbonnementErrors" rounded dense outlined label="Désignation de l'abonnement" v-model.trim="$v.modeAbonnementPrelevementModel.designation.$model"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field :error-messages="redevanceAbonnementErrors" rounded dense outlined color="teal" label="taux" suffix="%" v-model.trim="$v.modeAbonnementPrelevementModel.taux.$model"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select :items="referencePeriodiciteList" item-value="designation" item-text="designation" :error-messages="periodiciteAbonnementErrors" rounded dense outlined color="teal" label="périodicité Abonnement" v-model.trim="$v.modeAbonnementPrelevementModel.periodiciteAbonnementDesignation.$model"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-menu ref="menuDebutAbonnement" v-model="menuDebutAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :error-messages="dateDebutAbonnementErrors" dense outlined rounded v-model="dateDebutAbonnementPrevelement"  label="Debut de l'abonnement" prepend-icon="mdi-calendar"
                                            readonly  v-bind="attrs" v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="menuDebutAbonnement = false" v-model="dateDebutAbonnementPrevelement" no-title></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col>
                                <v-menu ref="menuFinAbonnement" v-model="menuFinAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :error-messages="dateFinAbonnementErrors"  dense outlined rounded v-model="dateFinAbonnementPrevelement" label="Fin de l'abonnement" prepend-icon="mdi-calendar"
                                            readonly  v-bind="attrs" v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="menuFinAbonnement = false" v-model="dateFinAbonnementPrevelement" no-title></v-date-picker>
                                </v-menu>
                            </v-col> 
                        </v-row>
                    </v-container>

                    <v-card-actions>
                        <v-btn small rounded outlined>REINITIALISER</v-btn>
                        <v-btn small type="submit" rounded outlined color="primary">VALIDER</v-btn>
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
import { required } from 'vuelidate/lib/validators';
import axios from 'axios'
import $ from 'jquery'
import { API_CREER_MODE_ABONNEMENT, API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE , HEADERS } from '../globalConfig/globalConstConfig'

export default {
    name:"CreerModeAbonnement",
    data(){
        return{
            errorMsg : null,
            successMsg : null,
            overlay : false,
            menuDebutAbonnement:false,
            menuFinAbonnement:false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            dateDebutAbonnementPrevelement : null,
            dateFinAbonnementPrevelement : null,

            dateDebutAbonnementPeriodique : null,
            dateFinAbonnementPeriodique : null,

            referenceAbonnementList:[],
            referencePeriodiciteList:[],

            typeAbonnement : null,

            referenceAbonnement:{
                referenceFamilleDesignation: "referenceFamilleAbonnement"
            },
            referencePeriodiciteAbonnement:{
                referenceFamilleDesignation:"referenceFamillePeriodiciteAbonnement"
            },

            objectToSendReferenceAbonnement:{
                datas:[],
            },
            objectToSendReferencePeriodicite:{
                datas:[],
            },

            modeAbonnementPeriodiqueModel:{
                designation : null,
                dateDebutAbonnement:null,
                dateFinAbonnement: null,
                redevance : null, 
                redevancePublicite : null,
                typeModeAbonnementDesignation: null,
                periodiciteAbonnementDesignation: null,
                compagnieTransportRaisonSociale: "COMPAGNIE KOUEVI CT",
            },

            modeAbonnementPrelevementModel:{
                designation : null,
                dateDebutAbonnement:null,
                dateFinAbonnement: null,
                taux:null,
                periodiciteAbonnementDesignation: null,
                compagnieTransportRaisonSociale: "COMPAGNIE KOUEVI CT",
            },

            abonnementObject:{
                datas:[],
            }
        }
    },

    validations:{
        modeAbonnementPeriodiqueModel:{
            
            designation:{
                required
            },
            dateDebutAbonnement:{
                required
            },
            dateFinAbonnement:{
                required
            },
            redevance:{
                required
            },
            redevancePublicite:{
                required
            },
            typeModeAbonnementDesignation:{
                required
            },
            periodiciteAbonnementDesignation:{
                required
            },

        },

        modeAbonnementPrelevementModel:{
            designation:{
                required
            },
            taux:{
                required
            },
            dateDebutAbonnement:{
                required
            },
            dateFinAbonnement:{
                required
            },
            periodiciteAbonnementDesignation:{
                required
            },
        }
    },
    
    methods:{
        // SOUMISSION DU FORMULAIRE
        submitForm(){
            this.creerAbonnementCompagnie();
        },


        // CREER UN MODE ABONNEMENT DE TYPE PERIODIQUE
        async creerModeAbonnementPeriodique(){
            if (this.typeAbonnement == 'AbonnementPeriodique') {
                this.overlay = true;
                this.modeAbonnementPeriodiqueModel.dateDebutAbonnement = new Date(this.dateDebutAbonnementPeriodique).toLocaleDateString('en-GB');
                this.modeAbonnementPeriodiqueModel.dateFinAbonnement = new Date(this.dateFinAbonnementPeriodique).toLocaleDateString('en-GB');
                this.abonnementObject.datas = [];
                this.modeAbonnementPeriodiqueModel.typeModeAbonnementDesignation = this.typeAbonnement;
                this.abonnementObject.datas.push(this.modeAbonnementPeriodiqueModel);
                await axios.post(API_CREER_MODE_ABONNEMENT, this.abonnementObject , { headers : HEADERS }).then((response) => {
                    if (response.status == 200) {
                        if (response.data.status.code == 800) {
                            this.successMsg = response.data.status.message
                            $(".alert-success").fadeIn();
                            setTimeout(function(){
                                $(".alert-success").fadeOut(); 
                            }, 4000)
                            this.abonnementObject.datas = [] ;
                        }else{
                            this.errorMsg = response.data.status.message
                            $(".alert-error").fadeIn();
                            setTimeout(function(){
                                $(".alert-error").fadeOut(); 
                            }, 3000)
                            this.abonnementObject.datas = [] ;
                        }  
                    
                    }
                    else if (response.status == 204) {
                        this.warningMsg = "Erreur , lors de la création de l'offre de voyage";
                        $(".alert-warning").fadeIn();
                        setTimeout(function(){
                            $(".alert-warning").fadeOut(); 
                        }, 3000)
                        this.abonnementObject.datas = [] ;
                    }
                    else{
                        this.errorMsg = "Erreur , opération de création impossible";
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.abonnementObject.datas = [] ;
                    }
                }).catch((e) => {
                    this.errorMsg = e ;
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                    this.abonnementObject.datas = [] ;
                }).finally(() => {
                    this.overlay = false;
                })
            }
        },


        // CREER UN MODE ABONNEMENT DE TYPE PRELEVEMENT
        async creerModeAbonnementPrelevement(){
            if (this.typeAbonnement == 'AbonnementPrelevement'){
                this.overlay = true;
                this.modeAbonnementPrelevementModel.dateDebutAbonnement = new Date(this.dateDebutAbonnementPrevelement).toLocaleDateString('en-GB');
                this.modeAbonnementPrelevementModel.dateFinAbonnement = new Date(this.dateFinAbonnementPrevelement).toLocaleDateString('en-GB');
                this.abonnementObject.datas = [];
                this.modeAbonnementPrelevementModel.typeModeAbonnementDesignation = this.typeAbonnement;
                this.abonnementObject.datas.push(this.modeAbonnementPrelevementModel); 
                await axios.post(API_CREER_MODE_ABONNEMENT, this.abonnementObject , { headers : HEADERS }).then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        if (response.data.status.code == 800) {
                            this.successMsg = response.data.status.message
                            $(".alert-success").fadeIn();
                            setTimeout(function(){
                                $(".alert-success").fadeOut(); 
                            }, 4000)
                            this.abonnementObject.datas = [] ;
                        }else{
                            this.errorMsg = response.data.status.message
                            $(".alert-error").fadeIn();
                            setTimeout(function(){
                                $(".alert-error").fadeOut(); 
                            }, 3000)
                            this.abonnementObject.datas = [] ;
                        }  
                    
                    }
                    else if (response.status == 204) {
                        this.warningMsg = "Erreur , lors de la création de l'offre de voyage";
                        $(".alert-warning").fadeIn();
                        setTimeout(function(){
                            $(".alert-warning").fadeOut(); 
                        }, 3000)
                        this.abonnementObject.datas = [] ;
                    }
                    else{
                        this.errorMsg = "Erreur , opération de création impossible";
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.abonnementObject.datas = [] ;
                    }
                }).catch((e) => {
                    this.errorMsg = e ;
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                    this.abonnementObject.datas = [] ;
                }).finally(() => {
                    this.overlay = false;
                })
            }
        },


        // CREER UN MODE D'ABONNEMENT
        async creerAbonnementCompagnie(){
            this.creerModeAbonnementPeriodique();
            this.creerModeAbonnementPrelevement();
        },

        //OBTENIR REFERENCE DESIGNATION ABONNEMENT
        async obtenirReferenceAbonnementList(){
            this.objectToSendReferenceAbonnement.datas.push(this.referenceAbonnement)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSendReferenceAbonnement , { headers : HEADERS }).then((response) => {
                this.referenceAbonnementList = response.data.items;
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },

        //OBTENIR REFERENCE DESIGNATION PERIODICITÉ
        async obtenirReferencePeriodicteAbonnementList(){
            this.objectToSendReferencePeriodicite.datas.push(this.referencePeriodiciteAbonnement)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSendReferencePeriodicite).then((response) => {
                this.referencePeriodiciteList = response.data.items;
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },
    
        // FORMAT DE LA DATE
        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },

        //VERIFIE SI CEST UN NOMBRE POSITIF
        isNumber(item){
          return  item  > 0
        },
    },

    computed:{

        computedDateFormatted () {
            return this.formatDate(this.modeAbonnementPrelevementModel.dateDebutAbonnement)
        },

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UN ABONNEMENT

        designationAbonnementErrors(){
           const errors = [];
            if (!this.$v.modeAbonnementPeriodiqueModel.designation.$dirty) return errors
            !this.$v.modeAbonnementPeriodiqueModel.designation.required && errors.push('La désignation est obligatoire.')
            return errors 
        },

        redevanceAbonnementErrors(){
           const errors = [];
            if (!this.$v.modeAbonnementPeriodiqueModel.redevance.$dirty) return errors
            !this.isNumber(this.modeAbonnementPeriodiqueModel.redevance) && errors.push('Saisissez un prix correct.')
            !this.$v.modeAbonnementPeriodiqueModel.redevance.required && errors.push('Le prix est obligatoire.')
            return errors 
        },

        typeAbonnementErrors(){
           const errors = [];
            if (!this.$v.modeAbonnementPeriodiqueModel.typeModeAbonnementDesignation.$dirty) return errors
            !this.$v.modeAbonnementPeriodiqueModel.typeModeAbonnementDesignation.required && errors.push('La selection du type du sac est obligatoire.')
            return errors 
        },

        periodiciteAbonnementErrors(){
            const errors = [];
            if (!this.$v.modeAbonnementPeriodiqueModel.periodiciteAbonnementDesignation.$dirty) return errors
            !this.$v.modeAbonnementPeriodiqueModel.periodiciteAbonnementDesignation.required && errors.push('Veuillez renseigner ce champs.')
            return errors 
        },

        redevancePubAbonnementErrors(){
            const errors = [];
            !this.isNumber(this.modeAbonnementPeriodiqueModel.redevancePublicite) && errors.push('Saisissez un nombre correct.')
            if (!this.$v.modeAbonnementPeriodiqueModel.redevancePublicite.$dirty) return errors
            !this.$v.modeAbonnementPeriodiqueModel.redevancePublicite.required && errors.push('Veuillez renseigner ce champs.')
            return errors 
        },

        dateDebutAbonnementErrors(){
            const errors = [];
            if (!this.$v.modeAbonnementPeriodiqueModel.dateDebutAbonnement.$dirty) return errors
            !this.$v.modeAbonnementPeriodiqueModel.dateDebutAbonnement.required && errors.push('Veuillez renseigner ce champs.')
            return errors 
        },

        dateFinAbonnementErrors(){
            const errors = [];
            if (!this.$v.modeAbonnementPeriodiqueModel.dateDebutAbonnement.$dirty) return errors
            !this.$v.modeAbonnementPeriodiqueModel.dateDebutAbonnement.required && errors.push('Veuillez renseigner ce champs.')
            return errors 
        },


    },

    mounted(){
        this.obtenirReferenceAbonnementList();
        this.obtenirReferencePeriodicteAbonnementList();
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