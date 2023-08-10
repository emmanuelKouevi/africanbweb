<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card width="1200" elevation="3">
                    <v-card-title><h6 class="font-weight-bold">MODE D'ABONNEMENTS</h6></v-card-title>
                    <v-card-subtitle>Définissez vos modes d'abonnements</v-card-subtitle>

                    <v-card-text>
                        <div class="form-group col-md-6">
                            <label for="typeAbonnement">Type d'abonnement:</label>
                            <v-select :error-messages="typeAbonnementErrors" 
                                id="typeAbonnement" data-cy="typeAbonnement" class="my_input"
                                v-model="typeAbonnement" :items="referenceAbonnementList"
                                dense outlined  item-text="designation" color="primary"
                                item-value="designation" placeholder="Sélectionnez">
                            </v-select>
                        </div>
                        <v-divider></v-divider>
                        <div v-if="typeAbonnement == 'AbonnementPeriodique'">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="designationAbonnement">Designation de l'abonnement:</label>
                                    <v-text-field :error-messages="designationAbonnementErrors" id="designationAbonnement"
                                        dense outlined placeholder="Designation de l'abonnement" data-cy="designationAbonnement"
                                        v-model.trim="$v.modeAbonnementPeriodiqueModel.designation.$model">
                                    </v-text-field>
                                </div>

                                <div class="form-group col-md-3">
                                    <label for="redevance">Redevance</label>
                                    <v-text-field :error-messages="redevanceAbonnementErrors" id="redevance"
                                        dense outlined color="primary" placeholder="redevance" 
                                        suffix="FCFA" v-model.trim="$v.modeAbonnementPeriodiqueModel.redevance.$model">
                                    </v-text-field>
                                </div>

                                <div class="form-group col-md-3">
                                    <label for="redevancePublicite">Redevance publicité</label>
                                    <v-text-field :error-messages="redevancePubAbonnementErrors" id="redevancePublicite"
                                        dense outlined color="primary" placeholder="redevance publicité" data-cy="redevancePublicite"
                                        v-model.trim="$v.modeAbonnementPeriodiqueModel.redevancePublicite.$model" suffix="FCFA" >
                                    </v-text-field>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="periodiciteAbonnement">Periodicité:</label>
                                    <v-select :items="referencePeriodiciteList" item-value="designation" id="periodiciteAbonnement"
                                        item-text="designation" :error-messages="periodiciteAbonnementErrors" data-cy="periodiciteAbonnement"
                                        dense outlined color="primary" placeholder="périodicité Abonnement" 
                                        v-model.trim="$v.modeAbonnementPeriodiqueModel.periodiciteAbonnementDesignation.$model">
                                    </v-select>
                                </div>

                                <div class="form-group col-md-3">
                                    <label for="dateDebutAbonnement">Debut d'Abonnement:</label>
                                    <v-menu ref="menuDebutAbonnement" v-model="menuDebutAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field id="dateDebutAbonnement" :error-messages="dateDebutAbonnementErrors" dense outlined 
                                                v-model="dateDebutAbonnementPeriodique" placeholder="Debut de l'abonnement" append-icon="mdi-clock-time-four-outline"
                                                readonly  v-bind="attrs" v-on="on" data-cy="dateDebutAbonnement">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker @input="menuDebutAbonnement = false" v-model="dateDebutAbonnementPeriodique" no-title></v-date-picker>
                                    </v-menu>
                                </div>

                                <div class="form-group col-md-3">
                                    <label for="dateFinAbonnement">Date de fin d'Abonnement</label>
                                    <v-menu ref="menuFinAbonnement" v-model="menuFinAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field id="dateDebutAbonnement" :error-messages="dateFinAbonnementErrors" dense outlined v-model="dateFinAbonnementPeriodique" placeholder="Fin de l'abonnement" append-icon="mdi-clock-time-four-outline"
                                                readonly  v-bind="attrs" v-on="on" data-cy="dateFinAbonnement">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker @input="menuFinAbonnement = false" v-model="dateFinAbonnementPeriodique" no-title></v-date-picker>
                                    </v-menu>
                                </div>
                            </div>
                        </div>

                        <div v-if="typeAbonnement == 'AbonnementPrelevement'">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="designationAbonnement">Designation de l'abonnement:</label>
                                    <v-text-field :error-messages="designationAbonnementErrors" id="designationAbonnement"
                                        dense outlined placeholder="Designation de l'abonnement" data-cy="designationAbonnement"
                                        v-model.trim="$v.modeAbonnementPrelevementModel.designation.$model">
                                    </v-text-field>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="periodicite">Periodicité</label>
                                    <v-select :items="referencePeriodiciteList" item-value="designation" id="periodicite"
                                        item-text="designation" :error-messages="periodiciteAbonnementErrors" 
                                        dense outlined color="teal" placeholder="périodicité Abonnement" data-cy="periodicite"
                                        v-model.trim="$v.modeAbonnementPrelevementModel.periodiciteAbonnementDesignation.$model">
                                    </v-select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="taux">Taux:</label>
                                    <v-text-field :error-messages="designationAbonnementErrors" id="taux"
                                        dense outlined placeholder="Taux" data-cy="taux"
                                        v-model.trim="$v.modeAbonnementPrelevementModel.taux.$model">
                                    </v-text-field>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="debutAbonnement">Debut Abonnement</label>
                                    <v-menu ref="menuDebutAbonnement" v-model="menuDebutAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field id="debutAbonnement" :error-messages="dateDebutAbonnementErrors" 
                                                dense outlined v-model="dateDebutAbonnementPrevelement"  
                                                placeholder="Debut de l'abonnement" append-icon="mdi-calendar"
                                                readonly  v-bind="attrs" v-on="on" data-cy="debutAbonnement">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker @input="menuDebutAbonnement = false" v-model="dateDebutAbonnementPrevelement" no-title></v-date-picker>
                                    </v-menu>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="finAbonnement">Fin Abonnement</label>
                                    <v-menu ref="menuFinAbonnement" v-model="menuFinAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field id="finAbonnement" :error-messages="dateFinAbonnementErrors"  dense outlined v-model="dateFinAbonnementPrevelement" 
                                                placeholder="Fin de l'abonnement" append-icon="mdi-calendar"
                                                readonly  v-bind="attrs" v-on="on" data-cy="finAbonnement">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker @input="menuFinAbonnement = false" v-model="dateFinAbonnementPrevelement" no-title></v-date-picker>
                                    </v-menu>
                                </div>
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn small outlined>REINITIALISER</v-btn>
                        <v-btn small type="submit" outlined color="primary">VALIDER</v-btn>
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
                await axios.post(API_CREER_MODE_ABONNEMENT, this.abonnementObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
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
                await axios.post(API_CREER_MODE_ABONNEMENT, this.abonnementObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
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
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSendReferenceAbonnement , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
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
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSendReferencePeriodicite , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
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