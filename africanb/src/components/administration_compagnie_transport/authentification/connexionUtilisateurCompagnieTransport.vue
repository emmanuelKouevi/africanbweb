<template>
    <v-app>  
      <v-main>
            <v-container>
                <v-form @submit.prevent="login">
                    <v-row justify="center" align="center">
                        <v-img max-height="150" max-width="250" src="../../../assets/logo_africanbus.jpg"></v-img>
                    </v-row><br><br>

                    <v-row justify="center">
                        <v-card width="380px" elevation="10" rounded="100px">
                            <v-row justify="center">
                                <v-card-title class="title">SE CONNECTER</v-card-title>
                            </v-row><br>
                            
                            <v-container>
                                <v-text-field v-model="username" rounded dense outlined prepend-inner-icon="mdi-account" color="teal" label="Pseudo ou E-mail"></v-text-field><br>
                                <v-divider inset></v-divider>
                                <v-text-field v-model="password" rounded dense outlined prepend-inner-icon="mdi-lock-check" color="teal" type="password" label="Mot de Passe"></v-text-field>
                                <v-row justify="center">
                                    <small class="password_forget">Mot de passe oublié ?</small>
                                </v-row>
                            </v-container><br><br>

                            <v-container>
                                <v-row justify="center">
                                    <v-btn type="submit" rounded color="teal"><span class="connexion_text">CONNEXION</span></v-btn>
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
export default {
    name:"connexionUtilisateurCompagnieTransport.vue",
    data(){
        return{
            username: '',
      password: ''
        }
    },

    methods:{

        login() {
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
        },

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
</style>