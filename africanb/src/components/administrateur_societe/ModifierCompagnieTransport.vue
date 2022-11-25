<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card max-width="1200px" class="mx-auto">
                <v-card-title class="title">CREER UNE COMPAGNIE</v-card-title>

                <v-divider></v-divider>
                
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field color="teal" label="Designation"
                                :error-messages="designationCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.designation.$model"
                                @input="$v.compagnieTransport.designation.$touch()"
                                @blur="$v.compagnieTransport.designation.$touch()">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col>
                            <v-textarea color="teal" label="Description"
                                :error-messages="descriptionCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.description.$model"
                                @input="$v.compagnieTransport.description.$touch()"
                                @blur="$v.compagnieTransport.description.$touch()"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field color="teal" label="Email" append-icon="mdi-email"
                                :error-messages="emailCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.email.$model"
                                @input="$v.compagnieTransport.email.$touch()"
                                @blur="$v.compagnieTransport.email.$touch()">

                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-select :items="villesList" color="teal" label="Ville"
                                :error-messages="villeCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.ville.id.$model"
                                @input="$v.compagnieTransport.ville.id.$touch()"
                                @blur="$v.compagnieTransport.ville.id.$touch()">

                            </v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field color="teal" prefix="+225" label="N° Télephone" append-icon="mdi-phone"
                                :error-messages="telephoneCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.telephone.$model"
                                @input="$v.compagnieTransport.telephone.$touch()"
                                @blur="$v.compagnieTransport.telephone.$touch()">

                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>

                <v-container>
                    <v-row class="mt-5" justify-lg="space-between">
                        <v-col cols="5"><v-btn color="secondary"><v-icon>mdi-sync</v-icon> REINITIALISER</v-btn></v-col>
                        <v-col cols="5"><v-btn type="submit" color="primary"><v-icon>mdi-check</v-icon> CREER</v-btn></v-col>
                    </v-row>
                </v-container>
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
import { API_MODIFIER_COMPAGNIE_TRANSPORT } from '../globalConfig/globalConstConfig'
import $ from 'jquery'
import axios from 'axios'
export default {
    name:"ModifierCompagnieTransport",
    data(){
        return{
            successMsg : null, 
            errorMsg:null,
            warningMsg: null,
            overlay : false,

            villesList:[],

            compagnieTransport:{
                id: null,
                designation: null,
                description: null,
                estActif: null,
                raisonSocial: null,
                siegeSocial: null,
                email:null,
                sigle:null,
                telephone:null,
                ville:{
                    id:"Abidjan"
                },
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

            ville:{
                id:{
                    required, 
                }
            },

            telephone :{
                required,
            },

        }
    },

    methods:{

        // CREATION D'UNE COMPAGNIE DE TRANSPORT
        async modifierCompagnieTransport(){
            await axios.post(API_MODIFIER_COMPAGNIE_TRANSPORT, this.compagnieTransport).then((response) => {
                if (response.status == 200) {  
                    this.successMsg = "La compagnie a bien été crée"
                    $(".alert-success").fadeIn();
                    setTimeout(function(){
                        $(".alert-success").fadeOut(); 
                    }, 3000)
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                }
                else{
                    this.errorMsg = "Erreur , Impossible de créer la compagnie";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }).finally(() => {
                this.overlay = false  
            })
        },

        submitForm(){
            console.log('bonjour je suis la methode form')
            this.$v.$touch();
            if (this.$v.compagnieTransport.$invalid) {
                this.errorMsg = 'Des informations sont manquantes'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }
            else{
                this.modifierCompagnieTransport()
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

        villeCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.ville.id.$dirty) return errors
            !this.$v.compagnieTransport.designation.required && errors.push('La ville est obligatoire est obligatoire.')
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