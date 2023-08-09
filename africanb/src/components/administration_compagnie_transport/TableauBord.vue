<template>
    <v-app>
        <v-container fluid>
            <v-row>
                <v-col cols="4">
                    <v-card hover rounded="lg">
                        <div class="offreVoyages_wrap"></div>
                        <v-card-text>
                            <h5 class="data">OFFRES DE VOYAGE</h5><br>
                            <p class="data_number">4</p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card hover rounded="lg">
                        <div class="gareTransport_wrap"></div>
                        <v-card-text>
                            <h5 class="data">GARE DE TRANSPORTS</h5><br>
                            <p class="data_number">3</p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card hover rounded="lg">
                        <div class="bagage_wrap"></div>
                        <v-card-text>
                            <h5 class="data">BAGAGES</h5><br>
                            <p class="data_number">3</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>


            <v-row>
                <v-col cols="4">
                    <v-card hover rounded="lg">
                        <div class="reservation_wrap"></div>
                        <v-card-text>
                            <h5 class="data">RESERVATIONS</h5><br>
                            <p class="data_number">0</p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card hover rounded="lg">
                        <div class="users_wrap"></div>
                        <v-card-text>
                            <h5 class="data">UTILISATEURS</h5><br>
                            <p class="data_number">2</p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card hover rounded="lg">
                        <div class="property_wrap"></div>
                        <v-card-text>
                            <h5 class="data">TYPE DE PROPRIETES</h5><br>
                            <p class="data_number">5</p>
                        </v-card-text>
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

    .offreVoyages_wrap{
        height: 10px;
        background: linear-gradient(to left top, teal, blue);
    }

    .gareTransport_wrap{
        height: 10px;
        background: linear-gradient(to left top, red, grey);
    }

    .bagage_wrap{
        height: 10px;
        background: linear-gradient(to left top, #3ae374, #c56cf0);
    }

    .reservation_wrap{
        height: 10px;
        background: linear-gradient(to left top, #e74c3c, #16a085);
    }

    .users_wrap{
        height: 10px;
        background: linear-gradient(to left top, #2c2c54, #34ace0);
    }

    .property_wrap{
        height: 10px;
        background: linear-gradient(to left top, #fff200, #ffb8b8);
    }

    .data{
        text-align: center;
        font-family: 'Times New Roman', Times, serif;
        font-weight: bold;
    }

    .data_number{
        color: #4b4b4b;
        font-size: 60px;
        text-align: center;
        font-family: 'Times New Roman', Times, serif;
    }
</style>