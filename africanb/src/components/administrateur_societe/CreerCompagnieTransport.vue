<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card max-width="1200px" class="mx-auto">
                <v-card-title><h6>CREER UNE COMPAGNIE</h6></v-card-title>
                <v-card-subtitle>Créer une compagnie de transport à la demande</v-card-subtitle>
                
                <v-card-text>
                    <v-container fluid>
                        <div class="form-group">
                            <label for="inputAddress">Nom de la compagnie</label>
                            <v-text-field dense outlined color="primary" placeholder="Entrer une designation"
                                :error-messages="designationCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.designation.$model"
                                @input="$v.compagnieTransport.designation.$touch()"
                                @blur="$v.compagnieTransport.designation.$touch()">
                            </v-text-field>
                        </div>

                        <div class="form-group">
                            <label for="inputAddress">Description</label>
                            <v-textarea dense outlined color="primary" aria-placeholder="entrer une description"
                                :error-messages="descriptionCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.description.$model"
                                @input="$v.compagnieTransport.description.$touch()"
                                @blur="$v.compagnieTransport.description.$touch()"
                            ></v-textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Ville</label>
                                <v-select dense outlined :items="villesList" color="primary"
                                    item-text="designation"
                                    item-value="designation"
                                    :error-messages="villeCompagnieErrors"
                                    v-model.trim="$v.compagnieTransport.villeDesignation.$model"
                                    @input="$v.compagnieTransport.villeDesignation.$touch()"
                                    @blur="$v.compagnieTransport.villeDesignation.$touch()">
                                </v-select>
                            </div>

                            <div class="form-group col-md-6">
                                <label for="inputPassword4">N° Téléphone</label>
                                <v-text-field dense outlined color="primary" prefix="+225" append-icon="mdi-phone"
                                    placeholder="N° de Téléphone"
                                    :error-messages="telephoneCompagnieErrors"
                                    v-model.trim="$v.compagnieTransport.telephone.$model"
                                    @input="$v.compagnieTransport.telephone.$touch()"
                                    @blur="$v.compagnieTransport.telephone.$touch()">
                                </v-text-field>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-7">
                                <label for="inputEmail4">E-mail</label>
                                <v-text-field dense outlined color="primary" append-icon="mdi-email"
                                    placeholder="Adresse électronique de la compagnie"
                                    :error-messages="emailCompagnieErrors"
                                    v-model.trim="$v.compagnieTransport.email.$model"
                                    @input="$v.compagnieTransport.email.$touch()"
                                    @blur="$v.compagnieTransport.email.$touch()">
                                </v-text-field>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Sigle</label>
                                <v-text-field dense outlined color="primary"
                                    placeholder="le sigle de la compagnie"
                                    :error-messages="sigleCompagnieErrors"
                                    v-model.trim="$v.compagnieTransport.sigle.$model"
                                    @input="$v.compagnieTransport.sigle.$touch()"
                                    @blur="$v.compagnieTransport.sigle.$touch()">
                                </v-text-field>
                            </div>

                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Raison Sociale</label>
                                <v-text-field dense outlined color="primary"
                                    placeholder="La raison sociale de la compagnie"
                                    :error-messages="raisonSocialeCompagnieErrors"
                                    v-model.trim="$v.compagnieTransport.raisonSociale.$model"
                                    @input="$v.compagnieTransport.raisonSociale.$touch()"
                                    @blur="$v.compagnieTransport.raisonSociale.$touch()">
                                </v-text-field>
                            </div>
                        </div>
                    </v-container>
                </v-card-text>
                
                <v-card-actions>
                    <v-btn small rounded color="secondary">REINITIALISER</v-btn>
                    <v-btn small rounded type="submit" color="primary">CREER</v-btn>
                </v-card-actions>
            </v-card>   
        </v-form>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 
        <v-alert class="myalert alert-warning" type="warning" width="350px" dismissible>{{ warningMsg }}</v-alert>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>

    </v-app>
</template>

<script>
import { required , minLength , maxLength , email } from 'vuelidate/lib/validators' 
import { API_CREER_COMPAGNIE_TRANSPORT , API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE , HEADERS } from '../globalConfig/globalConstConfig'
import $ from 'jquery'
import axios from 'axios'
export default {
    name:"CreerCompagnieTransport",
    data(){
        return{
            successMsg : null, 
            errorMsg:null,
            warningMsg: null,
            overlay : false,
            

            defaultObject:{},
            villesList:[],

            objectContainList :{
                datas : []
            },

            compagnieTransport:{
                designation: null,
                description: null,
                raisonSociale:null,
                email:null,
                sigle:null,
                telephone:null,
                villeDesignation:null,
            }
        }
    },

    validations:{
        compagnieTransport:{

            designation :{
                required,
                minLength : minLength(4),
                maxLength : maxLength(150),
            },

            description :{
                required,
                minLength : minLength(4),
                maxLength : maxLength(150),
            },

            email:{
                required,
                email
            },

            raisonSociale:{
                required
            },

            sigle:{
                required
            },

            villeDesignation:{
                required,
            },

            telephone :{
                required,
            },

        }
    },

    methods:{

        // OBTENIR LA LISTE DES VILLES DISPONIBLES
        async obtenirListeVillesDispo(){
            await axios.post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.defaultObject, { headers : HEADERS }).then((response) => {
                this.villesList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },

        // CREATION D'UNE COMPAGNIE DE TRANSPORT
        async creerCompagnieTransport(){
            this.objectContainList.datas.push(this.compagnieTransport)
            this.overlay = true ;
            await axios.post(API_CREER_COMPAGNIE_TRANSPORT, this.objectContainList, { headers : HEADERS }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.objectContainList.datas = []
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.objectContainList.datas = []
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.objectContainList.datas = []
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.objectContainList.datas = []
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
                this.objectContainList.datas = []
            }).finally(() => {
                this.overlay = false;
            })
        },


        // SOUMETTRE LE FORMULAIRE VERS LE MIDDLEWARE

        submitForm(){
            this.$v.$touch();
            if (this.$v.compagnieTransport.$invalid) {
                this.errorMsg = 'Des informations sont manquantes'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }
            else{
                this.creerCompagnieTransport()
            }
        },
    },

    computed:{

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UNE COMPAGNIE DE TRANSPORT

        designationCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.designation.$dirty) return errors
            !this.$v.compagnieTransport.designation.maxLength && errors.push('La designation ne doit pas dépasser 600 caractères')
            !this.$v.compagnieTransport.designation.required && errors.push('La désignation est obligatoire.')
            !this.$v.compagnieTransport.designation.required && errors.push('La désignation doit avoir au minimum 8 caractères.')
            return errors
        },

        descriptionCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.description.$dirty) return errors
            !this.$v.compagnieTransport.description.maxLength && errors.push('La description ne doit pas dépasser 600 caractères')
            !this.$v.compagnieTransport.description.required && errors.push('La déscription est obligatoire.')
            !this.$v.compagnieTransport.description.required && errors.push('La déscription doit avoir au minimum 8 caractères.')
            return errors
        },

        raisonSocialeCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.raisonSociale.$dirty) return errors
            !this.$v.compagnieTransport.raisonSociale.required && errors.push('La raison sociale est obligatoire est obligatoire.')
            return errors
        },

        sigleCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.sigle.$dirty) return errors
            !this.$v.compagnieTransport.sigle.required && errors.push('Le sigle est obligatoire est obligatoire.')
            return errors
        },

        villeCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.villeDesignation.$dirty) return errors
            !this.$v.compagnieTransport.villeDesignation.required && errors.push('La ville est obligatoire est obligatoire.')
            return errors
        },

        telephoneCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.telephone.$dirty) return errors
            !this.$v.compagnieTransport.telephone.required && errors.push('Le numéro de téléphone est obligatoire.')
            return errors
        },
        emailCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.email.$dirty) return errors
            !this.$v.compagnieTransport.email.required && errors.push('Le champ email est obligatoire')
            !this.$v.compagnieTransport.email.email && errors.push('exemple@xyz.com')
            return errors
        },
    },

    mounted(){
        this.obtenirListeVillesDispo();
    }
}
</script>

<style scoped>
    .title{
        color: teal;
        font-weight: bold;
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