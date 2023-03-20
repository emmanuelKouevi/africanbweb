<template>
    <v-app>
        <v-container fluid>
            <v-row>
                <v-col cols="4">
                    <v-card elevation="5">
                        <v-container>
                            <v-row>
                                <v-col cols="5">
                                    <v-card class="card-icon" color="teal" elevation="6">
                                        <v-icon size="80" color="white">mdi-train-car</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col cols="7">
                                    <v-row justify="end"><v-subheader><h3>OFFRES VOYAGES</h3></v-subheader></v-row>
                                    <v-row justify="end"><v-subheader><h2>4</h2></v-subheader></v-row>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-subheader>Voir plus</v-subheader><v-icon>mdi-menu-right</v-icon>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card elevation="5">
                        <v-container>
                            <v-row>
                                <v-col cols="5">
                                    <v-card class="card-icon" color="teal" elevation="6">
                                        <v-icon size="80" color="white">mdi-subway-variant</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col cols="7">
                                    <v-row justify="end"><v-subheader><h3>GARES DE TRANSPORT</h3></v-subheader></v-row>
                                    <v-row justify="end"><v-subheader><h1>3</h1></v-subheader></v-row>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-subheader>Voir plus</v-subheader><v-icon>mdi-menu-right</v-icon>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card elevation="5">
                        <v-container>
                            <v-row>
                                <v-col cols="4">
                                    <v-card class="card-icon" color="teal" elevation="6">
                                        <v-icon size="80" color="white">mdi-wallet-travel</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col cols="8">
                                    <v-row justify="end"><v-subheader><h3>SACS DE VOYAGES</h3></v-subheader></v-row>
                                    <v-row justify="end"><v-subheader><h2>2</h2></v-subheader></v-row>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-subheader>Voir plus</v-subheader><v-icon>mdi-menu-right</v-icon>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>


            <v-row>
                <v-col cols="4">
                    <v-card elevation="5">
                        <v-container>
                            <v-row>
                                <v-col cols="5">
                                    <v-card class="card-icon" color="teal" elevation="6">
                                        <v-icon size="80" color="white">mdi-ticket-outline</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col cols="7">
                                    <v-row justify="end"><v-subheader><h3>RESERVATIONS</h3></v-subheader></v-row>
                                    <v-row justify="end"><v-subheader><h2>0</h2></v-subheader></v-row>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-subheader>Voir plus</v-subheader><v-icon>mdi-menu-right</v-icon>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card elevation="5">
                        <v-container>
                            <v-row>
                                <v-col cols="5">
                                    <v-card class="card-icon" color="teal" elevation="6">
                                        <v-icon size="80" color="white">mdi-account-group</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col cols="7">
                                    <v-row justify="end"><v-subheader><h3>UTILISATEURS</h3></v-subheader></v-row>
                                    <v-row justify="end"><v-subheader><h1>0</h1></v-subheader></v-row>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-subheader>Voir plus</v-subheader><v-icon>mdi-menu-right</v-icon>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card elevation="5">
                        <v-container>
                            <v-row>
                                <v-col cols="4">
                                    <v-card class="card-icon" color="teal" elevation="6">
                                        <v-icon size="80" color="white">mdi-feature-search</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col cols="8">
                                    <v-row justify="end"><v-subheader><h3>PROPRIETES</h3></v-subheader></v-row>
                                    <v-row justify="end"><v-subheader><h2>3</h2></v-subheader></v-row>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-subheader>Voir plus</v-subheader><v-icon>mdi-menu-right</v-icon>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name:'TableauBord',
    data(){
        return{

        }
    },

    methods:{

    }
}
</script>

<style scoped>
    .card-icon{
        margin-top: -20px;
        margin-left: 15px;
    }
</style>