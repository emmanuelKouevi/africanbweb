<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row>
                   <h1>AFRICAN<span class="initial_B">B</span></h1>
                </v-row><br><br>

                <v-row justify="center">
                    <v-card width="380px" height="420px" elevation="5" rounded="35px">
                        <v-row justify="center">
                            <v-card-title class="title">S'IDENTIFIER</v-card-title>
                        </v-row><br>
                        
                        <v-container>
                            <v-text-field outlined prepend-inner-icon="mdi-account" color="teal" label="Pseudo ou E-mail"></v-text-field><br>
                            <v-divider inset>OR</v-divider>
                            <v-text-field outlined prepend-inner-icon="mdi-lock-check" color="teal" type="password" label="Mot de Passe"></v-text-field>
                            <v-row justify="center">
                                <small class="password_forget">Mot de passe oublié ?</small>
                            </v-row>
                            <v-row justify="center">
                                <small class="no_compte">Vous n'avez pas de compte ? <span class="signup">Inscrivez-vous.</span></small>
                            </v-row>
                        </v-container><br><br><br>

                        <v-container>
                            <v-row justify="center">
                                <v-btn rounded color="teal"><span class="connexion_text">CONNEXION</span></v-btn>
                            </v-row>
                        </v-container><br>
                    </v-card>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name:'ConnexionUtilisateur',
    data(){
        return{
            credentialsValid : false
        }
    },

    methods:{

        /*connexion() {
            // Vérification des informations d'identification côté client
            if (credentialsValid) {
                localStorage.setItem('isLoggedIn', 'true');
            
                // Redirection vers la page appropriée en fonction des rôles de l'utilisateur
                if (estAdministrateur) {
                    this.$router.push('/EspaceAdmin');
                } else {
                    this.$router.push('/EspaceAdministrateurTransport');
                }
            }
        }*/
    }
}
</script>

<style scoped>
    .initial_B{
        color: teal;
    }

    h1{
        font-weight: bold;
        font-size: 60px;
        color: grey;
    }
    

    .password_forget{
        color: grey;
    }


    .password_forget:hover{
        cursor: pointer;
        color: #487eb0;
    }

    .title{
        color: black;
        font-weight: bold;
        font-size: 60px;
    }

    .no_compte{
        color: grey;
    }

    .signup:hover{
        color: #487eb0;
        cursor: pointer;
    }

    .connexion_text{
        color: white;
    }

</style>