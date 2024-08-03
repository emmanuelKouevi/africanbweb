<template>
    <v-app>
        <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card width="1200" elevation="3">
                    <v-card-title>CREER UNE GARE DE TRANSPORT</v-card-title>
                    <v-card-subtitle>Gérer vos gares pour les demandes de reservations ou autres</v-card-subtitle>
                    <v-container>

                        <div class="form-row">

                            <div class="form-group col-lg-6">
                                <label for="inputAddress">Désignation de la gare :</label>
                                <v-text-field class="myInput" :error-messages="designationGareErrors" outlined dense
                                    v-model.trim="$v.gareTransportModel.designation.$model">
                                </v-text-field>
                            </div>

                            <div class="form-group col-lg-6">
                                <label for="inputAddress">E-mail du vendeur:</label>
                                <v-text-field class="myInput" :error-messages="emailGareErrors"
                                    v-model.trim="$v.gareTransportModel.email.$model"  
                                    outlined dense>
                                </v-text-field>
                            </div>

                        </div>

                        <div class="form-row">

                            <div class="form-group col-lg-6">
                                <label for="inputAddress">Numéro de télephone n° 1 :</label>
                                <v-text-field class="myInput" :error-messages="premierTelephoneGareErrors" outlined dense
                                    v-model.trim="$v.gareTransportModel.telephone1.$model">
                                </v-text-field>
                            </div>

                            <div class="form-group col-lg-6">
                                <label for="inputAddress">Numéro de télephone n° 2:</label>
                                <v-text-field class="myInput" v-model.trim="$v.gareTransportModel.telephone2.$model"  
                                    outlined dense>
                                </v-text-field>
                            </div>

                        </div>

                        <div class="form-row">

                            <div class="form-group col-lg-6">
                                <label for="inputAddress">Addresse:</label>
                                <v-text-field :error-messages="addresseLocalisationGareError" dense outlined v-model.trim="$v.gareTransportModel.adresseLocalisation.$model"></v-text-field>
                            </div>

                        </div>
                    
                    </v-container>

                    <v-card-actions>
                        <v-btn x-small btn color="secondary">REINITIALISER</v-btn>
                        <v-btn type="submit" x-small  dark color="success" btn>CREER LA GARE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-form>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
    </v-app>
</template>

<script>
import { required , email} from 'vuelidate/lib/validators'
import axios from 'axios';
import $ from 'jquery';
import { API_CREER_GARE_COMPAGNIE_TRANSPORT , HEADERS } from '../globalConfig/globalConstConfig';
export default {
    name:'CreerGareCompagnieTransport',
    data(){
        return{
            errorMsg: null,
            successMsg : null,
            overlay : false,


            gareTransportToSend:{
                datas:[],
            },

            gareTransportModel:{
                designation : null,
                email:null,
                telephone1:null,
                telephone2:null,
                adresseLocalisation:null,
                compagnieTransportRaisonSociale:"KOUEVI CT",
            }
        }
    },

    validations:{

        gareTransportModel:{
            
            designation:{
                required
            },

            email:{
                required,
                email
            },

            telephone1:{
                required
            },

            telephone2:{
                required
            },
            
            adresseLocalisation:{
                required
            }

        }

    },
    
    methods:{

        // SOUMISSION DU FORMULAIRE
        submitForm(){
            this.$v.$touch();
            if (this.$v.gareTransportModel.$invalid) {
                this.errorMsg = 'Des informations sont manquantes'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }
            else{
                this.creerGareCompagnieTransport();
            }
        },



        //CREER UNE COMPAGNIE DE TRANSPORT
        async creerGareCompagnieTransport(){
            this.gareTransportToSend.datas.push(this.gareTransportModel)
            this.overlay = true ;
            await axios.post(API_CREER_GARE_COMPAGNIE_TRANSPORT, this.gareTransportToSend , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.gareTransportToSend.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.gareTransportToSend.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création de la gare";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.gareTransportToSend.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.gareTransportToSend.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.gareTransportToSend.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            })
        }
    },

    computed:{

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION DU MODE D'UNE OFFRE

        designationGareErrors(){
           const errors = [];
            if (!this.$v.gareTransportModel.designation.$dirty) return errors
            !this.$v.gareTransportModel.designation.required && errors.push('La désignation est obligatoire.')
            return errors 
        },

        emailGareErrors(){
           const errors = [];
            if (!this.$v.gareTransportModel.email.$dirty) return errors
            !this.$v.gareTransportModel.email.required && errors.push('Le champs E-mail est obligatoire')
            !this.$v.gareTransportModel.email.email && errors.push('Entrer une addresse mail valide.')
            return errors 
        },

        premierTelephoneGareErrors(){
           const errors = [];
            if (!this.$v.gareTransportModel.telephone1.$dirty) return errors
            !this.$v.gareTransportModel.telephone1.required && errors.push('Entrer un numero de téléphone.')
            return errors 
        },

        addresseLocalisationGareError(){
           const errors = [];
            if (!this.$v.gareTransportModel.adresseLocalisation.$dirty) return errors
            !this.$v.gareTransportModel.adresseLocalisation.required && errors.push('Votre addresse est obligatoire.')
            return errors 
        },

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