<template>
    <v-app class="body">  
        <v-main class="my-container">
            <div>
                <v-container>
                    <v-form @submit.prevent="login">
                        <v-card max-width="400" max-height="1000" elevation="5">
                            <v-row justify="center" align="center">
                                <v-img max-height="60" max-width="60" src="../../assets/logo_africanbus.jpg"></v-img>
                            </v-row>
                        
                            <v-card-text>
                                <v-container>
                                    <v-row justify="center">
                                        <div class="text_auth">
                                            <h5 class="font-weight-bold">BIENVENUE</h5>
                                            <small>Entrer vos paramètres de connexion pour accéder à votre espace de travail.</small>
                                        </div>

                                        <v-container>
                                            <div class="form-group">
                                                <label for="pseudoOrEmail" class="myLabel">Identifiant ou E-mail</label>
                                                <v-text-field class="input_field" id="pseudoOrEmail" :error-messages="usernameError" 
                                                    v-model.trim="$v.userLogin.login.$model" dense outlined 
                                                    prepend-inner-icon="mdi-account" 
                                                    color="#273c75">
                                                </v-text-field>
                                            </div>

                                            <div class="form-group">
                                                <label for="login_password" class="myLabel">Mot de Passe</label>
                                                <v-text-field :error-messages="passwordError" v-model.trim="$v.userLogin.password.$model" :append-icon="passwordIsVisible ? 'mdi-eye' : 'mdi-eye-off'"  
                                                    class="input_field" id="login_password" 
                                                    @click:append="passwordIsVisible = !passwordIsVisible"
                                                    dense outlined prepend-inner-icon="mdi-lock-check" color="#273c75" :type="passwordIsVisible ? 'text' : 'password'">
                                                </v-text-field>
                                            </div>

                                            <span>Vous avez oublié votre mot de passe ? <small class="password_forget">Cliquez-ici</small></span><br><br><br>

                                            <v-row justify="center">
                                                <div class="text-xs-center">
                                                    <v-btn small type="submit" rounded color="#192a56"><span class="connexion_text">CONNEXION</span></v-btn>
                                                </div>
                                            </v-row>
                                        </v-container><br>                        
                                    </v-row>
                                </v-container>
                            </v-card-text>    
                        </v-card>
                    </v-form><br><br>
                </v-container>
            </div>
        </v-main><br>

        <v-footer class="footer" dark>
            <v-container fluid>
                <v-row>
                    <v-col class="text-center">
                        <span class="font-weight-bold">© copyright 2023 - African bus. Tous droits réservés</span>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
        <v-overlay :value="overlay"><v-progress-circular  indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>

<script>
import axios from 'axios';
import { API_LOGIN_USER } from '../globalConfig/globalConstConfig'
import { required } from 'vuelidate/lib/validators'
export default {
    name:"LoginVue",
    data(){
        return{
            overlay : false ,
            passwordIsVisible : false ,

            userLoginData:{
                data :{
                    login : null,
                    password : null
                }
            },

            userLogin :{
                login: null,
                password:null,
            },

        }
    },

    validations:{

        userLogin:{
            login:{
                required
            },

            password:{
                required
            }
        }

    },

    methods:{

        //SOUMISSION FORMULAIRE
        submitForm(){
            
        },

        // SERVICE WEB PERMETTANT DE SE CONNECTER ET D'ACCEDER À SON ESPACE PERSONNEL
        async login(){
            this.userLoginData.data.login = this.userLogin.login;
            this.userLoginData.data.password = this.userLogin.password; 
            await axios.post(API_LOGIN_USER,this.userLoginData).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.$store.commit('LOGIN_USER');
                        this.$store.commit('SET_USER_AUTHENTIFIED' , response.data.item);
                        this.$store.commit('STORE_TOKEN_USER' , response.data.item.token);
                        this.$router.push('/tableauBord')
                        localStorage.setItem("auth", true);
                        const user_info = JSON.stringify(response.data.item)
                        localStorage.setItem("token_user", user_info);
                    }else{
                        this.$swal.fire('Connexion échouée','Error lors de la connexion','error')
                    }  
                }else{
                    this.$swal.fire('Connexion Impossible','Problème interne','error')
                }
            }).catch((e) => {
                this.$swal.fire('Connexion Impossible' , e , 'error')
            })
        },


        /**
         * Cette methode permettra de détecter si nous sommes sur la page de connexion (/connexion).
         * Si c'est le cas , l'utilisateur perd sa session et sera invité de saisir 
         * à nouveau ses paramètres de connexion
         */
        initializeSession() {

        }
    },

    computed:{
        
        //GESTION DES CONTRAINTES (SAISIE UTILISATEUR)
        usernameError(){
            const errors = [];
            if (!this.$v.userLogin.login.$dirty) return errors
            !this.$v.userLogin.login.required && errors.push('Entrer votre pseudo ou e-mail de connexion.')
            return errors 
        },

        passwordError(){
            const errors = [];
            if (!this.$v.userLogin.password.$dirty) return errors
            !this.$v.userLogin.password.required && errors.push('Entrer votre mot de passe.')
            return errors 
        }

    },

    mounted(){

    }
}
</script>

<style scoped>
    .body{
        background: teal;
    }

    .my-container{
        
        margin: auto;
        margin-top: 50px;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .title{
        padding-top: 40px;
        color: black;
        font-weight: bold;
        font-size: 60px;
    }

    .connexion_text{
        color: white;
    }

    .password_forget{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 13px;
        color: black;
        opacity: 0.9;
        font-weight: bolder;
    }


    .password_forget:hover{
        cursor: pointer;
        color: #487eb0;
    }

    .label{
        font-size: 15px;
        font-weight: bold;
    }

    .text_auth{
        text-align: center;
    }

    .text_auth small{
        color: grey;
    }

    .input_field {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bolder;
        color: #596275;
    }

    .footer{
        color: white;
    }

    .myLabel{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 13px;
        color: black;
        opacity: 0.9;
        font-weight: bolder;
    }

    .header_card{
        height: 10px;
        background: linear-gradient(to left top, black, #273c75);
    }

    .card-subtitle{
        color:black;
        font-size: 13px;
        opacity: 0.7;
    }
</style>