<template>
    <v-app>

        <v-container>

            <v-card max-width="1900px" class="mx-auto">
                <v-card-title class="title-card">LISTE DES MODES D'ABONNEMENTS
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
                </v-card-title>
            
                <v-data-table :headers="headers" :items="abonnementDisponibleList"
                    :loading="loading"
                    :search="search">


                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon title="editer" color="blue" small class="mr-2" @click="editerModePaiement(item)">mdi-pencil</v-icon>
                        <!--<v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProduitLogement(item)">mdi-delete</v-icon>--> 
                    </template>

                </v-data-table>
                <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
            </v-card><br><br>
            <v-divider></v-divider>

            <v-card>
                <v-card-title class="title-card">LISTE DES MODES DE PAIEMENTS</v-card-title>
                <v-container fluid>
                    <v-row>
                        <v-col cols="6" v-for="paiement , item in paiementDisponibleList" :key="item">
                            <v-card>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title class="title_simulation"> MODE DE PAIEMENT {{ item + 1 }}</v-list-item-title>
                                    </v-list-item-content>
                    
                                    <v-list-item-action>
                                        <v-menu bottom right>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                            </template>
  
                                            <v-list>
                                                <v-list-item link @click="editerModePaiement(paiement)">
                                                    <v-list-item-action><v-icon color="primary">mdi-pencil</v-icon></v-list-item-action>                         
                                                    <v-list-item-subtitle>Editer</v-list-item-subtitle>
                                                </v-list-item>

                                                <v-list-item link>
                                                    <v-list-item-action><v-icon color="red">mdi-delete</v-icon></v-list-item-action>                          
                                                    <v-list-item-subtitle>Supprimer</v-list-item-subtitle>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-list-item-action>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Designation :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{ paiement.designation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Numero :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{ paiement.telephoneGenerique }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Type de paiement :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{ paiement.typeModePaiementDesignation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                
                            </v-list>
                            
                        </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-container>
        
    </v-app>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import { API_OBTENIR_MODE_ABONNEMENT_PAR_COMPAGNIE , API_OBTENIR_MODE_PAIEMENT_PAR_COMPAGNIE , HEADERS} from '../globalConfig/globalConstConfig'
export default {
    name:'SelectionnerModeAbonnementEtPaiement',
    data(){
        return{
            errorMsg : null,
            loading:true,
            search:'',
            headers:[
                {text : 'Designation' , value : 'designation'},
                {text : 'Type Abonnement' , value : 'typeModeAbonnementDesignation'},
                {text : 'Debut Abonnement' , value : 'dateDebutAbonnement'},
                {text : 'Fin Abonnement' , value : 'dateFinAbonnement'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],

            abonnementDisponibleList:[],

            abonnementListObject:{
                data:{
                    compagnieTransportRaisonSociale:"KOUEVI CT"
                }
            },


            paiementDisponibleList:[],

            paiementListObject:{
                data:{
                    compagnieTransportRaisonSociale:"KOUEVI CT"
                }
            },
        }
    },

    methods:{

        // RECUPERER LA LISTE DES MODES D'ABONNEMENTS ENREGISTRÉS PAR COMPAGNIE DE TRANSPORT
        async obtenirAbondemmentListParCompagnieTransport(){
            this.loading = true;
            axios.post(API_OBTENIR_MODE_ABONNEMENT_PAR_COMPAGNIE, this.abonnementListObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.abonnementDisponibleList = response.data.items;
                    }
                }else{
                    this.errorMsg = "Erreur";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }
            }).catch((e) => {
                this.errorMsg = e
            }).finally(() => {
                this.loading = false;   
            })
        },


        // RECUPERER LA LISTE DES MODES DE PAIEMENT DISPONIBLE PAR COMPAGNIE DE TRANSPORT
        async obtenirPaiementListParCompagnieTransport(){
            this.loading = true;
            axios.post(API_OBTENIR_MODE_PAIEMENT_PAR_COMPAGNIE, this.paiementListObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.paiementDisponibleList = response.data.items;
                    }
                }else{
                    this.errorMsg = "Erreur";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }
            }).catch((e) => {
                this.errorMsg = e
            }).finally(() => {
                this.loading = false;   
            })
        },

        //EDITER UN MODE DE PAIEMENT
        editerModePaiement(modePaiement){
            const parsedModePaiement = JSON.stringify(modePaiement);
            localStorage.setItem('modePaiement', parsedModePaiement);
            this.$router.push({path: "/modifierModePaiement" });
        },


    },

    mounted(){
        this.obtenirAbondemmentListParCompagnieTransport();
        this.obtenirPaiementListParCompagnieTransport();
    }
}
</script>

<style scoped>
    .myalert{
        display: none;
        z-index: 1900;
    }

    .alert-error{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }
</style>