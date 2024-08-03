<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card class="mx-auto" max-width="1000">
                <v-card-title><h4>MON PROFIL</h4></v-card-title>
                <v-card-subtitle>Modifier votre compte utilisateur</v-card-subtitle>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col><v-text-field class="myInput" :error-messages="usernameError" v-model.trim="$v.userUpdating.nom.$model" label="Nom" outlined dense></v-text-field></v-col>
                            <v-col><v-text-field class="myInput" :error-messages="surnameError" v-model.trim="$v.userUpdating.prenoms.$model" label="Prénom" outlined dense></v-text-field></v-col>
                        </v-row>

                        <v-row>
                            <v-col><v-text-field class="myInput" :error-messages="loginError" v-model.trim="$v.userUpdating.login.$model" label="Login ou Pseudo" outlined dense></v-text-field></v-col>
                            <v-col><v-text-field disabled class="myInput" v-model="userUpdatingMail" label="E-mail" outlined dense></v-text-field></v-col>
                        </v-row>

                        <v-row>
                            <v-col><v-text-field disabled class="myInput" v-model="userUpdating.roleCode" label="E-mail" outlined dense></v-text-field></v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-btn type="button" small outlined color="secondary">REINITIALISER</v-btn>
                    <v-btn type="submit" text small outlined color="primary">ENREGISTRER LES MODIFICATIONS</v-btn>
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
import { API_UPDATE_USER ,HEADERS } from '../globalConfig/globalConstConfig';
import {required , minLength} from 'vuelidate/lib/validators';
import $ from 'jquery';
export default {
    name:"userProfil",
    data(){
        return{
            errorMsg : null,
            successMsg : null,
            overlay : null,

            userDataUpdating:{
                datas:[]
            },

            userUpdating:{
                id:null,
                nom : null,
                prenoms : null,
                login : null,
                roleCode:null,
            },

            userUpdatingMail:null
        }
    },

    validations:{
        userUpdating:{
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
            }
        }
    },  

    methods:{

        // SOUMETTRE FORMULAIRE
        submitForm(){
            this.$v.$touch()
            if(this.$v.userUpdating.$invalid)this.errorMsg = 'Certains champs sont requis';
            else this.updateUserProfil();
        },

        async retrieveUserInfo(){
            /**
             * RECUPERER LES DONNÉES UTILISATEURS
             */
            if (this.$store.state.userAuthentified !== null) {
                this.userUpdating.id = this.$store.state.userAuthentified.id;
                this.userUpdating.nom = this.$store.state.userAuthentified.nom;
                this.userUpdating.prenoms = this.$store.state.userAuthentified.prenoms;
                this.userUpdating.login = this.$store.state.userAuthentified.login;
                this.userUpdatingMail = this.$store.state.userAuthentified.email;
                this.userUpdating.roleCode = this.$store.state.userAuthentified.roleCode
            }
        },

        //MODIFIER COMPTE UTILISATEUR
        async updateUserProfil(){
            this.overlay = true;
            this.userDataUpdating.datas.push(this.userUpdating)
            await axios.put(API_UPDATE_USER, this.userDataUpdating , { headers : HEADERS(this.$store.state.userAuthentified.token) } ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        this.$swal.fire('Modification reussie' , this.successMsg , 'success')
                        this.userDataUpdating.datas = [];
                        this.$store.commit('UPDATE_USER_PROFIL' , response.data.items[0])
                    }else{
                        this.errorMsg = response.data.status.message
                        this.$swal.fire('Operation Echoué' ,this.errorMsg, 'error')
                        this.userDataUpdating.datas = [];
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.userDataUpdating.datas = [];
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.userDataUpdating.datas = [];
                }
            }).catch((e) => {
                this.$swal.fire('Operation Echoué' , e , 'error')
                this.userDataToSend.datas = [];
            }).finally(() => {
                this.overlay = false;
            })
        }

    },

    computed:{
        //CONTRAINTES SUR LES CHAMPS DE SAISIES

        usernameError(){
            const errors = [];
            if (!this.$v.userUpdating.nom.$dirty) return errors
            !this.$v.userUpdating.nom.required && errors.push('Le nom de l\'utilsateur est obligatoire.')
            !this.$v.userUpdating.nom.minLength && errors.push('Au moins 2 caractères.')
            return errors 
        },


        surnameError(){
            const errors = [];
            if (!this.$v.userUpdating.prenoms.$dirty) return errors
            !this.$v.userUpdating.prenoms.required && errors.push('Le prenom de l\'utilsateur est obligatoire.')
            !this.$v.userUpdating.prenoms.minLength && errors.push('Au moins 2 caractères.')
            return errors 
        },

        loginError(){
            const errors = [];
            if (!this.$v.userUpdating.login.$dirty) return errors
            !this.$v.userUpdating.login.required && errors.push('Le login de l\'utilsateur est obligatoire.')
            !this.$v.userUpdating.login.minLength && errors.push('Au moins 2 caractères.')
            return errors 
        },
    },

    mounted(){
        this.retrieveUserInfo();
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