<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card width="1200" elevation="3">
                    <v-card-title>MODE DE PAIEMENTS</v-card-title>
                    <v-card-subtitle>Modifiez vos modes de paiements</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field :error-messages="designationPaiementErrors" rounded dense outlined label="Désignation" v-model.trim="$v.modePaiementModel.designation.$model"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field :error-messages="telephoneGeneriqueErrors" rounded dense outlined color="teal" label="Numéro de téléphone" v-model.trim="$v.modePaiementModel.telephoneGenerique.$model"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select :items="referenceTypePaiementList" item-value="designation" item-text="designation" :error-messages="typePaiementErrors" rounded dense outlined color="teal" label="Type de paiement" v-model.trim="$v.modePaiementModel.typeModePaiementDesignation.$model"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-card-actions>
                        <v-btn small rounded outlined>REINITIALISER</v-btn>
                        <v-btn small type="submit" rounded outlined color="primary">ACCEPTER LES MODIFICATIONS</v-btn>
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
import { API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE , API_MODIFIER_MODE_PAIEMENT } from '../globalConfig/globalConstConfig';
import $ from 'jquery'
export default {
    name:'ModeModePaiement',
    data(){
        return{
            errorMsg :null,
            successMsg :null,
            overlay:false,

            referenceTypePaiementList:[],

            referenceModePaiement:{
                referenceFamilleDesignation: "referenceFamilleModePaiement"
            },

            objectToSendReferenceModePaiement:{
                datas:[],
            },

            modePaiementModel:{
                id:null,
                designation: null,
                telephoneGenerique: null,
                typeModePaiementDesignation : null,
                compagnieTransportRaisonSociale: "COMPAGNIE KOUEVI CT",
            },

            modePaiementToModify:{
                datas:[]
            },
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

        //SOUMISSION DU FORMULAIRE
        submitForm(){
            this.modifierModePaiement();
        },

        //OBTENIR REFERENCE DESIGNATION MODE DE PAIEMENT
        async obtenirReferenceModePaiementList(){
            this.objectToSendReferenceModePaiement.datas.push(this.referenceModePaiement)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSendReferenceModePaiement).then((response) => {
                this.referenceTypePaiementList = response.data.items;
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },

        // MODIFICATION D'UN MODE DE PAIEMENT
        async modifierModePaiement(){
            this.modePaiementToModify.datas.push(this.modePaiementModel);
            this.overlay = true ;
            await axios.post(API_MODIFIER_MODE_PAIEMENT, this.modePaiementToModify).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.modePaiementToModify.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.modePaiementToModify.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création de l'offre de voyage";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.modePaiementToModify.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.modePaiementToModify.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.modePaiementToModify.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            })
        },


        //MODE EDITION MODE PAIEMENT
        async editerModePaiement(){
            if (localStorage.getItem("modePaiement")) {
                try {
                    const modePaiementEditing = JSON.parse(localStorage.getItem("modePaiement"));
                    console.log(modePaiementEditing)
                    this.modePaiementModel.id = modePaiementEditing.id;
                    this.modePaiementModel.designation = modePaiementEditing.designation;
                    this.modePaiementModel.telephoneGenerique = modePaiementEditing.telephoneGenerique;
                    this.modePaiementModel.typeModePaiementDesignation = modePaiementEditing.typeModePaiementDesignation;
                    localStorage.removeItem("modePaiement");
                } catch (error) {
                    localStorage.removeItem("modePaiement");
                }
            }else{
                this.$router.replace({path:'/selectionnerModeAbonnementEtPaiement'})
            }
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
        this.editerModePaiement();
    },
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
</style>