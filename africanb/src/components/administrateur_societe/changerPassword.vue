<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card class="mx-auto" max-width="700">
                <v-card-title><h4>CHANGER LE MOT DE PASSE</h4></v-card-title>
                <v-card-subtitle>Changer votre de passe pour une meilleur sécurité</v-card-subtitle>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col><v-text-field disabled class="myInput" v-model="userParams.email" label="E-mail" outlined dense></v-text-field></v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field :error-messages="oldPasswordError" v-model.trim="$v.userParams.oldPassWord.$model" :append-icon="oldPasswordIsVisible ? 'mdi-eye' : 'mdi-eye-off'"  class="input_field myInput"
                                    @click:append="oldPasswordIsVisible = !oldPasswordIsVisible" label="Votre mot de passe actuel"
                                    dense outlined prepend-inner-icon="mdi-lock-check" color="primary" :type="oldPasswordIsVisible ? 'text' : 'password'">
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field :error-messages="newPasswordError" v-model.trim="$v.userParams.newPassWord.$model" :append-icon="newPasswordIsVisible ? 'mdi-eye' : 'mdi-eye-off'"  class="input_field myInput"
                                    @click:append="newPasswordIsVisible = !newPasswordIsVisible" label="Votre nouveau mot de passe"
                                    dense outlined prepend-inner-icon="mdi-lock-check" color="primary" :type="newPasswordIsVisible ? 'text' : 'password'">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-btn type="button" small outlined color="secondary">REINITIALISER</v-btn>
                    <v-btn type="submit" text small outlined color="primary">VALIDER LES MODIFICATIONS</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>

<script>
import { API_RESET_PASSWORD_USER , HEADERS } from '../globalConfig/globalConstConfig';
import axios from 'axios';
import { required } from 'vuelidate/lib/validators'
export default {
    name:"changerPassword",
    data(){
        return{
            errorMsg : null,
            successMsg : null,
            overlay: null, 

            oldPasswordIsVisible : false,
            newPasswordIsVisible : false , 

            userParams:{
                email: null,
                oldPassWord: null,
                newPassWord:null
            },

            userReset:{
                data:{
                    email:null,
                    oldPassWord : null,
                    newPassWord : null, 
                }
            }
        }
    },

    validations:{
        userParams:{
            oldPassWord:{
                required
            },
            newPassWord:{
                required
            }
        }
    },

    methods:{

        async retrieveUserInfo(){
            /**
             * RECUPERER LES DONNEES UTILISATEURS
             */
            if (this.$store.state.userAuthentified !== null) {
                this.userParams.email = this.$store.state.userAuthentified.email;
            }
        },
        
        // SOUMISSION DU FORMULAIRE
        submitForm(){
            this.$v.$touch();
            if(this.$v.userParams.$invalid) this.errorMsg = "Vous avez omis des champs de saisie" 
            else this.resetPasswordUser();
        },


        //CHANGER DE MOT DE PASSE
        async resetPasswordUser(){
            this.overlay = true ;
            this.userReset.data.email = this.userParams.email;
            this.userReset.data.oldPassWord = this.userParams.oldPassWord;
            this.userReset.data.newPassWord = this.userParams.newPassWord;
            await axios.post(API_RESET_PASSWORD_USER, this.userReset, { headers : HEADERS } ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        this.$swal.fire('Mot de Passe modifié' , this.successMsg , 'success')
                        this.userReset.data.email = null;
                        this.userReset.data.oldPassword = null;
                        this.userReset.data.newPassword = null;
                    }else{
                        this.errorMsg = response.data.status.message
                        this.$swal.fire('Erreur' , this.errorMsg , 'error')
                        this.userReset.data.email = null;
                        this.userReset.data.oldPassWord = null;
                        this.userReset.data.newPassWord = null;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    this.$swal.fire('Erreur' , this.warningMsg , 'warning')
                    this.userReset.data.email = null;
                    this.userReset.data.oldPassWord = null;
                    this.userReset.data.newPassWord = null;
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    this.$swal.fire('Erreur' , this.errorMsg , 'error')
                    this.userReset.data.email = null;
                    this.userReset.data.oldPassWord = null;
                    this.userReset.data.newPassWord = null;
                }
            }).catch((e) => {
                this.$swal.fire('Erreur' , e , 'error')
                this.userReset.data.email = null;
                this.userReset.data.oldPassWord = null;
                this.userReset.data.newPassWord = null;
            }).finally(() => {
                this.overlay = false;
            })
        }

    },

    computed:{

        //GESTION DES CHAMPS UTILISATEURS

        oldPasswordError(){
            const errors = [];
            if (!this.$v.userParams.oldPassWord.$dirty) return errors
            !this.$v.userParams.oldPassWord.required && errors.push('Entrer l\'ancien mot de passe.')
            return errors 
        },

        newPasswordError(){
            const errors = [];
            if (!this.$v.userParams.newPassWord.$dirty) return errors
            !this.$v.userParams.newPassWord.required && errors.push('Le nouveau mot de passe est obligatoire.')
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