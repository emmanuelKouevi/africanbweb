<template>
    <v-app>
        <v-main>
            <v-container>
                <v-sheet>
                    <v-card>
                        <v-card-title>SECTION OFFRE DE VOYAGE</v-card-title>
                    </v-card>
                    <v-card>
                        <v-card-title>SECTION VOYAGEUR:</v-card-title>
                        <v-card-text>
                            <form>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Nom du voyageur:</label>
                                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Prenom du voyageur:</label>
                                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">E-mail du voyageur:</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                                </div>
                            </form>
                        </v-card-text>
                    </v-card>
                </v-sheet>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name:"ReservationBillet",
    data(){
        return{

        }
    },

    methods:{

    }
}
</script>