<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card width="1200" elevation="3">
                    <v-card-title><h5 class="font-weight-bold">MODE DE PAIEMENTS</h5></v-card-title>
                    <v-card-subtitle>Définissez vos modes de paiements</v-card-subtitle>

                    <v-card-text>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="referencePaiement">Réference Paiement:</label>
                                <v-text-field :error-messages="designationPaiementErrors" dense outlined 
                                    placeholder="Désignation" v-model.trim="$v.modePaiementModel.designation.$model"
                                    id="referencePaiement" data-cy="referencePaiement">
                                </v-text-field>
                            </div>

                            <div class="form-group col-md-4">
                                <label for="phoneNumber">N° de Téléphone:</label>
                                <v-text-field :error-messages="telephoneGeneriqueErrors" id="phoneNumber"
                                    dense outlined color="primary" placeholder="Numéro de téléphone" class="my"
                                    v-model.trim="$v.modePaiementModel.telephoneGenerique.$model" data-cy="phoneNumber">
                                </v-text-field>
                            </div>

                            <div class="form-group col-md-4">
                                <label for="typePaiement">Type de paiement:</label>
                                <v-select :items="referenceTypePaiementList" id="typePaiement"
                                    item-value="designation" item-text="designation" data-cy="typePaiement"
                                    :error-messages="typePaiementErrors" dense outlined color="teal" 
                                    placeholder="Type de paiement" v-model.trim="$v.modePaiementModel.typeModePaiementDesignation.$model">
                                </v-select>
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
import axios from 'axios';
import $ from 'jquery'
import { API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE , API_CREER_MODE_PAIEMENT, HEADERS } from '../globalConfig/globalConstConfig'

export default {
    name:"CreerModePaiement",
    data(){
        return{
            errorMsg : null,
            successMsg : null,
            overlay: null,

            referenceTypePaiementList:[],

            referenceModePaiement:{
                referenceFamilleDesignation: "referenceFamilleModePaiement"
            },

            objectToSendReferenceModePaiement:{
                datas:[],
            },

            modePaiementModel:{
                designation: null,
                telephoneGenerique: null,
                typeModePaiementDesignation : null,
                compagnieTransportRaisonSociale: "COMPAGNIE KOUEVI CT",
            },

            modePaiementObject:{
                datas:[],
            }
        }
    },

    validations:{

        modePaiementModel:{
            designation:{
                required
            },
            telephoneGenerique:{
                required
            },
            typeModePaiementDesignation:{
                required
            }
        }

    },

    methods:{

        // SOUMISSION DU FORMULAIRE 
        submitForm(){
            this.$v.$touch();
            if (this.$v.modePaiementModel.$invalid) {
                this.errorMsg = 'Des informations sont manquantes'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }
            else{
                this.creerModePaiement();
            }
        },

        // CREATION D'UN MODE DE PAIEMENT
        async creerModePaiement(){
            this.modePaiementObject.datas.push(this.modePaiementModel);
            this.overlay = true ;
            await axios.post(API_CREER_MODE_PAIEMENT, this.modePaiementObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.modePaiementObject.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.modePaiementObject.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création de l'offre de voyage";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.modePaiementObject.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.modePaiementObject.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.modePaiementObject.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            })
        },

        //OBTENIR REFERENCE DESIGNATION MODE DE PAIEMENT
        async obtenirReferenceModePaiementList(){
            this.objectToSendReferenceModePaiement.datas.push(this.referenceModePaiement)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSendReferenceModePaiement , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                this.referenceTypePaiementList = response.data.items;
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },

    },

    computed:{

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UN MODE DE PAIEMENT

        designationPaiementErrors(){
           const errors = [];
            if (!this.$v.modePaiementModel.designation.$dirty) return errors
            !this.$v.modePaiementModel.designation.required && errors.push('La désignation est obligatoire.')
            return errors 
        },

        telephoneGeneriqueErrors(){
           const errors = [];
            if (!this.$v.modePaiementModel.telephoneGenerique.$dirty) return errors
            !this.$v.modePaiementModel.telephoneGenerique.required && errors.push('Entrer un numero de téléphone.')
            return errors 
        },

        typePaiementErrors(){
           const errors = [];
            if (!this.$v.modePaiementModel.typeModePaiementDesignation.$dirty) return errors
            !this.$v.modePaiementModel.typeModePaiementDesignation.required && errors.push('La selection du type de paiement est obligatoire.')
            return errors 
        },
    },

    mounted(){
        this.obtenirReferenceModePaiementList();
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