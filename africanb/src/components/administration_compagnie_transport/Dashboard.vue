<template>
    <v-app>
        <v-container fluid>
            <div class="row">
                <div class="col-lg-3">
                    <v-card rounded="lg" color="#474787" class="count-books">
                        <v-card-title><span class="card-title-text">Offres de voyages</span></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <span class="libelle font-weight-bold">15</span>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </div>

                <div class="col-lg-3">
                    <v-card rounded="lg" color="#218c74">
                        <v-card-title><span class="card-title-text">Offres actives</span></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <span class="libelle font-weight-bold">17 </span>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </div>

                <div class="col-lg-3">
                    <v-card rounded="lg" color="#b33939">
                        <v-card-title><span class="card-title-text">Offres Inactives</span></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <span class="libelle font-weight-bold">5</span>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </div>

                <div class="col-lg-3">
                    <v-card rounded="lg" color="#c23616">
                        <v-card-title><span class="card-title-text">Villes</span></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <span class="libelle font-weight-bold">147</span>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </div>
            </div>  
      
            <div class="row">

                <div class="col-lg-8">
                    <v-card hover rounded="lg">
                        <v-card-title><span class="titre">Offres de voyages</span></v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle><v-icon dense color="#2c2c54">mdi-circle</v-icon>&nbsp;&nbsp;Propriété offre de voyage :</v-list-item-subtitle>
                                        </v-list-item-content>
                    
                                        <v-list-item-content>
                                            <v-list-item-subtitle><span class="font-weight-bold">3</span>&nbsp;&nbsp;<span >Propriétés</span></v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle><v-icon dense color="#ffb142">mdi-circle</v-icon>&nbsp;&nbsp;Mode de paiements:</v-list-item-subtitle>
                                        </v-list-item-content>
                    
                                        <v-list-item-content>
                                            <v-list-item-subtitle><span class="font-weight-bold">2</span>&nbsp;&nbsp;<span>Mode de paiements définis</span></v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle><v-icon dense color="#ff5252">mdi-circle</v-icon>&nbsp;&nbsp;Offres non programmées:</v-list-item-subtitle>
                                        </v-list-item-content>
                    
                                        <v-list-item-content>
                                            <v-list-item-subtitle><span class="font-weight-bold">2</span>&nbsp;&nbsp;</v-list-item-subtitle>
                                        </v-list-item-content>

                                    </v-list-item>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </div>
                
                <div class="col-lg-4">
                    <v-card rounded="lg" color="#2f3640">
                        <v-card-title><span class="card-title-text">GARES DE VOYAGES</span></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <span class="libelle font-weight-bold">6</span>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn x-small text><span class="btn-libelle">consulter</span></v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-8">
                    <v-card>
                        <v-card-title><span class="titre">Offres récentes</span>
                            <v-spacer></v-spacer>
                            <v-btn text x-small>Plus d'actions</v-btn>
                        </v-card-title>
                        <v-card-text>
                            <v-data-table :headers="headers"></v-data-table>
                        </v-card-text>
                    </v-card>
                </div>

                <div class="col-lg-4">
                    <v-card>
                        <v-card-title><span class="titre">Vos vendeurs</span>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>Vendeur #1 :</v-list-item-subtitle>
                                        </v-list-item-content>
                    
                                        <v-list-item-content>
                                            <v-list-item-subtitle><span class="font-weight-bold">Kouevi Ayite</span></v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>Vendeur #2:</v-list-item-subtitle>
                                        </v-list-item-content>
                    
                                        <v-list-item-content>
                                            <v-list-item-subtitle><span class="font-weight-bold">N'Doma Emmanuella</span>&nbsp;&nbsp;</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item>

                            </v-list>
                        </v-card-text>
                    </v-card>
                </div>
            </div>

            
        </v-container>

    </v-app>
</template>

<script>

export default {

    name:"DashboardAdminTransportCompanie",

    data(){

        return{

            search:'',
            loading:true,
            headers : [
                {text : 'Designation' , value:''},
                {text : "Type ,de l'offre" , value:''},
                {text : 'Départ' , value:''},
                {text : 'Destination' , value:''}
            ],


            reservationList:[],
        }
    }
}
</script>

<style scoped>
    .card-title-text{
        font-size: 13px;
        color: white;
        text-transform: uppercase;
        font-weight: bold
    }

    .libelle{
        color: white;
        font-size:20px
    }

    .cfa{
        color: white;
    }

    .btn-libelle{
        text-decoration: underline;
        color: white;
    }

    .titre{
        font-weight: 15px;
        font-weight: bold;
        color: #2f3640;
    }

</style>