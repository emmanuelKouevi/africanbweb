<template>
    <v-app>  
      <v-main>
            <v-container>
                <v-form @submit.prevent="login">
                    <v-row justify="center" align="center">
                        <v-img max-height="150" max-width="250" src="../../../assets/logo_africanbus.jpg"></v-img>
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
                                        <v-text-field class="input_field" v-model="username" dense outlined prepend-inner-icon="mdi-account" color="primary"></v-text-field>
                                    </v-col>
                                </v-row>
                                
                                <label class="label" for="">Mot de Passe</label>
                                <v-row>
                                    <v-col>
                                        <v-text-field :append-icon="passwordIsVisible ? 'mdi-eye' : 'mdi-eye-off'"  class="input_field" id="login_password" @click:append="passwordIsVisible = !passwordIsVisible"
                                            v-model="password" dense outlined prepend-inner-icon="mdi-lock-check" color="primary" :type="passwordIsVisible ? 'text' : 'password'">
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
                </v-form>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
//import axios from 'axios';
//import $ from 'jquery';
//import { API_LOGIN_USER } from '../../globalConfig/globalConstConfig'
export default {
    name:"connexionUtilisateurCompagnieTransport.vue",
    data(){
        return{

            username:'',
            password:'',

            passwordIsVisible : false ,

            userLoginData:{
                datas:[]
            },

            userLogin :{
                login: null,
                password:null,
            },


            
        }
    },

    methods:{

        async login(){

        }

        /*login() {
            // Votre logique de connexion ici
            // Vérifiez les identifiants et le rôle de l'utilisateur
            // Exemple basique pour démonstration
            if (this.username === 'admin' && this.password === 'admin') {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userRole', 'admin');
                this.$router.push('/tableauBord');
            } else if (this.username === 'user' && this.password === 'user') {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userRole', 'user');
                this.$router.push('/user');
            } else {
                alert('Identifiants incorrects');
            }
        },*/

    },

    mounted(){}
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
</style>