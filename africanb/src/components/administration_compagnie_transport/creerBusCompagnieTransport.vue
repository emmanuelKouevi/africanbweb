<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card max-width="800px" class="mx-auto">
                    <v-card-title><h4>ASSOCIER DES BUS À UNE OFFRE DE VOYAGE</h4>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-subtitle>Définissez les bus de votre offre de voyage</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="4">
                                <v-select class="my_input" :error-messages="offreVoyageDesignationContainte" v-model.trim="$v.busDataObject.offreVoyageDesignation.$model" :items="offreVoyageParCompagnieTransportList" item-text="designation" item-value="designation" rounded dense outlined color="teal" label="sélectionnez une offre"></v-select>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>   
                        <v-divider></v-divider><br>

                        <v-row>
                            <v-col><v-text-field class="my_input" :error-messages="designationBus" v-model.trim="$v.busDataObject.designation.$model" rounded dense outlined label="Réf du bus"></v-text-field></v-col>
                            <v-col><v-text-field class="my_input" type="number" min="0" :error-messages="numeroBusContrainte" v-model.trim="$v.busDataObject.numeroBus.$model" rounded dense outlined label="N° du bus"></v-text-field></v-col>
                            <v-col><v-text-field class="my_input" type="number" min="0" :error-messages="nbrePlaceBusContrainte" v-model.trim="$v.busDataObject.nombrePlace.$model" rounded dense outlined label="Nbre de place"></v-text-field></v-col>
                        </v-row>
                        
                    </v-container>
                    <v-card-actions>
                        <v-btn small shaped rounded outlined>REINITIALISER</v-btn>
                        <v-btn type="submit" small shaped rounded outlined color="#1B1464">ENREGISTRER</v-btn>
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
import { API_RECUPERER_LISTE_OFFRE_VOYAGE , API_ASSOCIER_BUS_OFFRE_VOYAGE } from '../globalConfig/globalConstConfig'
export default {
    name:'creerBusCompagnieTransport',
    data(){
        return{
            errorMsg : null,
            successMsg:null,
            overlay : false,

            offreVoyageParCompagnieTransportList:[],

            busSimpleObject:{
                datas:[]
            },

            busDataObject:{
                designation : null ,
                numeroBus : null , 
                nombrePlace : null,
                offreVoyageDesignation: null,  
            },

            offreVoyageObject:{
                data:{
                    compagnieTransportRaisonSociale:"COMPAGNIE KOUEVI CT"
                }
            },
        }
    },

    validations:{

        busDataObject:{

            designation:{
                required
            },

            numeroBus:{
                required
            },

            nombrePlace:{
                required
            },

            offreVoyageDesignation:{
                required
            }
        },
    },

    methods:{

        // SOUMETTRE LE FORMULAIRE
        submitForm(){
            this.$v.$touch();
            if (this.$v.busDataObject.$invalid) {
                this.errorMsg = 'Des informations sont manquantes'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }else if(!this.isNumberAndOverToZero(this.busDataObject.numeroBus)){
                this.errorMsg = 'Vous avez saisi des champs incorrectement'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }
            else if(!this.isNumberAndOverToZero(this.busDataObject.nombrePlace)){
                this.errorMsg = 'Vous avez saisi des champs incorrectement'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }
            else{
                this.associerBusOffreVoyage();
            }
        },

        // ASSOCIER DES BUS À UNE OFFRE DE VOYAGE
        async associerBusOffreVoyage(){
            this.busSimpleObject.datas.push(this.busDataObject)
            this.overlay = true ;
            await axios.post(API_ASSOCIER_BUS_OFFRE_VOYAGE, this.busSimpleObject).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.busSimpleObject.datas = [];
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.busSimpleObject.datas = [];
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.busSimpleObject.datas = [];
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.busSimpleObject.datas = [];
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
                this.busSimpleObject.datas = [];
            }).finally(() => {
                this.overlay = false;
            })
        },

        //RECUPERER LA LISTE DES OFFRES DE VOYAGES PAR COMPAGNIE DE TRANSPORT
        async obtenirOffreVoyageParCompagnieTransport(){
            await axios.post(API_RECUPERER_LISTE_OFFRE_VOYAGE, this.offreVoyageObject ).then((response) => {
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

        isNumberAndOverToZero(item){
            if (typeof(item) == 'number' && item > 0) {
                return item ; 
            }
        }
    },

    computed:{
        // GESTION DES CONTRAINTES DES CHAMPS DE SAISIES
        offreVoyageDesignationContainte(){
            const errors = [];
            if (!this.$v.busDataObject.offreVoyageDesignation.$dirty) return errors
            !this.$v.busDataObject.offreVoyageDesignation.required && errors.push('Veuillez sélectionner une offre de voyage.')
            return errors 
        },

        designationBus(){
            const errors = [];
            if (!this.$v.busDataObject.designation.$dirty) return errors
            !this.$v.busDataObject.designation.required && errors.push('Entrer une désignation pour le bus.')
            return errors 
        },

        numeroBusContrainte(){
            const errors = [];
            if (!this.$v.busDataObject.numeroBus.$dirty) return errors
            !this.$v.busDataObject.numeroBus.required && errors.push('Information requis.')
            this.isNumberAndOverToZero(this.busDataObject.nombrePlace) && errors.push('Champs Incorrect')
            return errors 
        },

        nbrePlaceBusContrainte(){
            const errors = [];
            if (!this.$v.busDataObject.nombrePlace.$dirty) return errors
            !this.$v.busDataObject.nombrePlace.required && errors.push('Information requis.')
            this.isNumberAndOverToZero(this.busDataObject.nombrePlace) && errors.push("Champs incorrect")
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

    .my_input{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: bolder;
        color: #596275;
    }
</style>