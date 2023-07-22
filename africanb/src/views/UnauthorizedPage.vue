<template>
    <v-app>
        <v-main>
            <v-container fluid>

                <div class="content pageNotFound" justify="center">
                    <span class="four">4</span><span class="zero">0</span><span class="four">4</span>
                </div>

                <v-row class="text-h5 font-weight-bold" justify="center">
                     <small>Oops !! Impossible de retrouver la page demandée.</small>
                </v-row>

                <v-row class="text-h5 font-weight-thin" justify="center">
                    <small>Désolé !! Mais la page que vous recherchez n'existe pas. Vous avez surement perdu votre session de connexion.</small>
                </v-row><br><br>

                <v-row class="" justify="center">
                    <v-btn class="btn_auth" @click="goToLoginPage" rounded><v-icon color="white">mdi-arrow-left</v-icon> <span class="text">AUTHENTIFIEZ-VOUS</span></v-btn>
                </v-row>

            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name : "UnauthorizedPage",

    methods : {

        goToLoginPage() {
            this.$router.replace('/connexion')
        }

    }
}
</script>

<style scoped>
    .four{
        font-weight: bold;
        background: -webkit-linear-gradient(#0a3d62, #38ada9);
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .zero{
        font-weight: bold;
        background: -webkit-linear-gradient(#eee, #333);
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .content{
        text-align: center;
    }

    .pageNotFound{
        font-size: 150px;
    }

    .btn_auth{
        background: -webkit-linear-gradient(#0a3d62, #38ada9);
    }

    .text{
        color: white;
    }
</style>