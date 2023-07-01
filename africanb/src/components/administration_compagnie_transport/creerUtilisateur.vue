<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card class="mx-auto" max-width="1000">
                <v-card-title><h4>CREER UN COMPTE (GESTION DE LA PLATEFORME)</h4></v-card-title>
                <v-card-subtitle>Création d'utilisateurs pour la meilleur gestion de votre plateforme</v-card-subtitle>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col><v-text-field class="myInput" :error-messages="usernameError" v-model.trim="$v.userObject.nom.$model" label="Nom" outlined dense></v-text-field></v-col>
                            <v-col><v-text-field class="myInput" :error-messages="surnameError" v-model.trim="$v.userObject.prenoms.$model" label="Prénom" outlined dense></v-text-field></v-col>
                        </v-row>

                        <v-row>
                            <v-col><v-text-field class="myInput" :error-messages="loginError" v-model.trim="$v.userObject.login.$model" label="Login ou Pseudo" outlined dense></v-text-field></v-col>
                            <v-col><v-text-field class="myInput" :error-messages="emailError" v-model.trim="$v.userObject.email.$model" label="E-mail" outlined dense></v-text-field></v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6"><v-select class="myInput" :items="userRoleList" item-text="code" item-value="code" :error-messages="roleCodeError" v-model.trim="$v.userObject.roleCode.$model" label="Rôle utilisateur" outlined dense></v-select></v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-btn type="button" small outlined color="secondary">REINITIALISER</v-btn>
                    <v-btn type="submit" text small outlined color="primary">CREER UTILISATEUR</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import { required , email , minLength } from 'vuelidate/lib/validators' 
import { API_GET_ALL_ROLES , API_CREATE_USER  } from '../globalConfig/globalConstConfig'
export default {
    name:'creerUtilisateur',
    data(){
        return{

            errorMsg : null,
            successMsg: null,
            overlay:null,

            userRoleList:[],


            userDataToSend:{
                datas:[]
            },

            userObject:{
                nom: null,
                prenoms:null,
                login:null,
                email:null,
                roleCode:null,
            },
        }
    },

    validations:{

        userObject:{
            nom:{
                required,
                minLength : minLength(2)
            },

            prenoms:{
                required,
                minLength : minLength(2)
            },

            login:{
                required,
                minLength : minLength(2)
            },

            email:{
                required,
                email
            },

            roleCode:{
                required
            }
        }
    
    },

    methods:{

        //SOUMISSION DU FORMULAIRE
        submitForm(){
            this.$v.$touch();
            if (this.$v.userObject.$invalid) {
              this.errorMsg = "Certaines informations requises n'ont pas été renseigné" ;
              $(".alert-error").fadeIn();
              setTimeout(function(){
                $(".alert-error").fadeOut(); 
              }, 2000);
            } 
            else {
                this.createUser();
            }
        },

        // CREER UN UTILISATEUR

        async createUser(){
            this.overlay = true ;
            this.userDataToSend.datas.push(this.userObject)
            await axios.post(API_CREATE_USER, this.userDataToSend ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.userDataToSend .datas = [];
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.userDataToSend .datas = [];
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.userDataToSend .datas = [];
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.userDataToSend.datas = [];
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
                this.userDataToSend.datas = [];
            }).finally(() => {
                this.overlay = false;
            })
        },

        // RECUPERER LA LISTE DES ROLES DÉFINIS
        async getAllUsersRoles(){
            await axios.post(API_GET_ALL_ROLES, {} ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.userRoleList = response.data.items;
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
        }

    },


    computed:{

        //CONTRAINTES SUR LES CHAMPS DE SAISIES

        usernameError(){
            const errors = [];
            if (!this.$v.userObject.nom.$dirty) return errors
            !this.$v.userObject.nom.required && errors.push('Le nom de l\'utilsateur est obligatoire.')
            !this.$v.userObject.nom.minLength && errors.push('Au moins 2 caractères.')
            return errors 
        },


        surnameError(){
            const errors = [];
            if (!this.$v.userObject.prenoms.$dirty) return errors
            !this.$v.userObject.prenoms.required && errors.push('Le prenom de l\'utilsateur est obligatoire.')
            !this.$v.userObject.prenoms.minLength && errors.push('Au moins 2 caractères.')
            return errors 
        },

        loginError(){
            const errors = [];
            if (!this.$v.userObject.login.$dirty) return errors
            !this.$v.userObject.login.required && errors.push('Le login de l\'utilsateur est obligatoire.')
            !this.$v.userObject.login.minLength && errors.push('Au moins 2 caractères.')
            return errors 
        },


        emailError(){
            const errors = [];
            if (!this.$v.userObject.email.$dirty) return errors
            !this.$v.userObject.email.required && errors.push('L\'email de l\'utilsateur est obligatoire.')
            !this.$v.userObject.email.email && errors.push('Format adresse e-mail incorrect.')
            return errors 
        },

        roleCodeError(){
            const errors = [];
            if (!this.$v.userObject.roleCode.$dirty) return errors
            !this.$v.userObject.roleCode.required && errors.push('Veuillez selectionner un rôle.')
            return errors 
        }

    },

    mounted(){
        this.getAllUsersRoles();
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

    .myInput{
        font-weight: bolder;
        color: grey;
        font-size: 15px;
    }
</style>