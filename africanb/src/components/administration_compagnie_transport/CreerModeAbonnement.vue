<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card width="1200" elevation="3">
                    <v-card-title>MODE D'ABONNEMENTS</v-card-title>
                    <v-card-subtitle>Définissez vos modes d'abonnements</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field :error-messages="designationAbonnementErrors" rounded dense outlined label="Désignation de l'abonnement" v-model.trim="$v.modeAbonnementCompagnieModel.designation.$model"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field :error-messages="redevanceAbonnementErrors" rounded dense outlined color="teal" label="redevance" suffix="FCFA" v-model.trim="$v.modeAbonnementCompagnieModel.redevance.$model"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-menu ref="menuDebutAbonnement" v-model="menuDebutAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :error-messages="dateDebutAbonnementErrors" dense outlined rounded v-model.trim="$v.modeAbonnementCompagnieModel.dateDebutAbonnement.$model" label="Debut de l'abonnement" prepend-icon="mdi-clock-time-four-outline"
                                            readonly  v-bind="attrs" v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="menuDebutAbonnement = false" v-model.trim="$v.modeAbonnementCompagnieModel.dateDebutAbonnement.$model" no-title></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col>
                                <v-menu ref="menuFinAbonnement" v-model="menuFinAbonnement" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :error-messages="dateFinAbonnementErrors" dense outlined rounded v-model.trim="$v.modeAbonnementCompagnieModel.dateFinAbonnement.$model" label="Fin de l'abonnement" prepend-icon="mdi-clock-time-four-outline"
                                            readonly  v-bind="attrs" v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="menuFinAbonnement = false" v-model.trim="$v.modeAbonnementCompagnieModel.dateFinAbonnement.$model" no-title></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col>
                                <v-select :items="referenceAbonnementList" item-text="designation" item-value="designation" :error-messages="typeAbonnementErrors" rounded dense outlined color="teal" label="Type d'abonnement" v-model.trim="$v.modeAbonnementCompagnieModel.typeModeAbonnementDesignation.$model"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field :error-messages="redevancePubAbonnementErrors" rounded dense outlined color="teal" label="redevance publicité" v-model.trim="$v.modeAbonnementCompagnieModel.redevancePublicite.$model" suffix="FCFA" ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select :items="referencePeriodiciteList" item-value="designation" item-text="designation" :error-messages="periodiciteAbonnementErrors" rounded dense outlined color="teal" label="périodicité Abonnement" v-model.trim="$v.modeAbonnementCompagnieModel.periodiciteAbonnementDesignation.$model"></v-select>
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
import { API_CREER_MODE_ABONNEMENT, API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE } from '../globalConfig/globalConstConfig'

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

            referenceAbonnementList:[],
            referencePeriodiciteList:[],

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

            modeAbonnementCompagnieModel:{
                designation : null,
                dateDebutAbonnement:null,
                dateFinAbonnement: null,
                redevance : null, 
                redevancePublicite : null,
                typeModeAbonnementDesignation: null,
                periodiciteAbonnementDesignation: null,
                compagnieTransportRaisonSociale: "COMPAGNIE KOUEVI CT",
            },

            abonnementObject:{
                datas:[],
            }
        }
    },

    validations:{
        modeAbonnementCompagnieModel:{
            
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

        }
    },
    
    methods:{
        // SOUMISSION DU FORMULAIRE
        submitForm(){
            this.creerAbonnementCompagnie();
        },

        async creerAbonnementCompagnie(){
            this.abonnementObject.datas.push(this.modeAbonnementCompagnieModel);
            this.overlay = true ;
            await axios.post(API_CREER_MODE_ABONNEMENT, this.abonnementObject).then((response) => {
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
        },

        //OBTENIR REFERENCE DESIGNATION ABONNEMENT
        async obtenirReferenceAbonnementList(){
            this.objectToSendReferenceAbonnement.datas.push(this.referenceAbonnement)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSendReferenceAbonnement).then((response) => {
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

        //VERIFIE SI CEST UN NOMBRE POSITIF
        isNumber(item){
          return  item  > 0
        },
    },

    computed:{

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UN ABONNEMENT

        designationAbonnementErrors(){
           const errors = [];
            if (!this.$v.modeAbonnementCompagnieModel.designation.$dirty) return errors
            !this.$v.modeAbonnementCompagnieModel.designation.required && errors.push('La désignation est obligatoire.')
            return errors 
        },

        redevanceAbonnementErrors(){
           const errors = [];
            if (!this.$v.modeAbonnementCompagnieModel.redevance.$dirty) return errors
            !this.isNumber(this.modeAbonnementCompagnieModel.redevance) && errors.push('Saisissez un prix correct.')
            !this.$v.modeAbonnementCompagnieModel.redevance.required && errors.push('Le prix est obligatoire.')
            return errors 
        },

        typeAbonnementErrors(){
           const errors = [];
            if (!this.$v.modeAbonnementCompagnieModel.typeModeAbonnementDesignation.$dirty) return errors
            !this.$v.modeAbonnementCompagnieModel.typeModeAbonnementDesignation.required && errors.push('La selection du type du sac est obligatoire.')
            return errors 
        },

        periodiciteAbonnementErrors(){
            const errors = [];
            if (!this.$v.modeAbonnementCompagnieModel.periodiciteAbonnementDesignation.$dirty) return errors
            !this.$v.modeAbonnementCompagnieModel.periodiciteAbonnementDesignation.required && errors.push('Veuillez renseigner ce champs.')
            return errors 
        },

        redevancePubAbonnementErrors(){
            const errors = [];
            !this.isNumber(this.modeAbonnementCompagnieModel.redevancePublicite) && errors.push('Saisissez un nombre correct.')
            if (!this.$v.modeAbonnementCompagnieModel.redevancePublicite.$dirty) return errors
            !this.$v.modeAbonnementCompagnieModel.redevancePublicite.required && errors.push('Veuillez renseigner ce champs.')
            return errors 
        },

        dateDebutAbonnementErrors(){
            const errors = [];
            if (!this.$v.modeAbonnementCompagnieModel.dateDebutAbonnement.$dirty) return errors
            !this.$v.modeAbonnementCompagnieModel.dateDebutAbonnement.required && errors.push('Veuillez renseigner ce champs.')
            return errors 
        },

        dateFinAbonnementErrors(){
            const errors = [];
            if (!this.$v.modeAbonnementCompagnieModel.dateDebutAbonnement.$dirty) return errors
            !this.$v.modeAbonnementCompagnieModel.dateDebutAbonnement.required && errors.push('Veuillez renseigner ce champs.')
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