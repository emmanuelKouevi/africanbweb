<template>
    <v-app>  
      <v-main>
            <v-container>
                <v-form @submit.prevent="login">
                    <v-row justify="center" align="center">
                        <v-img max-height="100" max-width="240" src="../../../assets/logo_africanbus.jpg"></v-img>
                    </v-row><br><br>

                    <v-row justify="center">
                        <v-card width="500px"  elevation="10" rounded="100px"><br><br>
                            
                            <div class="text_auth">
                                <h2>AUTHENTIFIEZ-VOUS</h2>
                                <small>Entrer vos paramètres de connexion pour accéder à votre espace de travail.</small>
                            </div>
                        
                            <v-container>
                                <label class="label" for="">Pseudo ou E-mail</label>
                                <v-row>
                                    <v-col>
                                        <v-text-field class="input_field" :error-messages="usernameError" v-model.trim="$v.userLogin.login.$model" dense outlined prepend-inner-icon="mdi-account" color="primary"></v-text-field>
                                    </v-col>
                                </v-row>
                                
                                <label class="label" for="">Mot de Passe</label>
                                <v-row>
                                    <v-col>
                                        <v-text-field :error-messages="passwordError" v-model.trim="$v.userLogin.password.$model" :append-icon="passwordIsVisible ? 'mdi-eye' : 'mdi-eye-off'"  class="input_field" id="login_password" 
                                            @click:append="passwordIsVisible = !passwordIsVisible"
                                            dense outlined prepend-inner-icon="mdi-lock-check" color="primary" :type="passwordIsVisible ? 'text' : 'password'">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                    <small class="password_forget">Mot de passe oublié ?</small>
                                </v-row>
                            </v-container><br>

                            <v-container>
                                <v-row justify="center">
                                    <v-btn type="submit" rounded color="primary"><span class="connexion_text">CONNEXION</span></v-btn>
                                </v-row>
                            </v-container><br>
                        </v-card>
                    </v-row>
                </v-form><br><br>
            </v-container>
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
import { API_LOGIN_USER  , HEADERS} from '../../globalConfig/globalConstConfig'
import { required } from 'vuelidate/lib/validators'
export default {
    name:"connexionUtilisateurCompagnieTransport.vue",
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
            await axios.post(API_LOGIN_USER,this.userLoginData,{
                headers : HEADERS
            }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.$store.commit('LOGIN_USER');
                        this.$store.commit('SET_USER_AUTHENTIFIED' , response.data.item);
                        this.$router.push('/userHome')
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
        color: grey;
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
</style>