<template>
    <v-app>
        <v-container fluid>
            <v-sheet color="#b2bec3">
                <v-container>
                    <v-card elevation="5">
                        <v-card-title><span class="title-card">DÉTAIL SUR L'OFFRE:</span></v-card-title>
                        <v-card-text>
                            <div class="row">
                                <div class="col-sm-6">
                                    <v-container>
                                        <v-card>
                                            <v-card-title><span class="designation-offre">{{ offreVoyage.designation }}</span></v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <span>Type de l'offre :</span>&nbsp;&nbsp;
                                                        <span>{{ offreVoyage.typeOffreVoyageDesignation }}</span>
                                                    </v-row><br><br>
                                                    <v-row>
                                                        <v-icon dense color="teal">mdi-circle</v-icon> Gare départ : <span class="gareDepart">{{ offreVoyage.villeDepartDesignation }}</span>  
                                                    </v-row><br><br>
                                                    <v-row>
                                                        <v-icon dense color="#2C3A47">mdi-circle</v-icon> Gare destination : <span class="gareDestination">{{ offreVoyage.villeDestinationDesignation }} </span>  
                                                    </v-row>        
                                                </v-container>
                                            </v-card-text>
                                        </v-card>
                                    </v-container>
                                </div>

                                <div class="col-sm-6">
                                    <v-container>
                                        <v-card height="135">
                                            <v-card-text>
                                                <v-container>
                                                    <div class="form-group">
                                                        <label for="inputEmail4">Choisissez le jour du voyage:</label>
                                                        <v-select :items="jourSemainesParOffreVoyagesList" item-text="jourSemaineDesignation" dense outlined></v-select>
                                                    </div>
                                                </v-container>
                                            </v-card-text>
                                        </v-card>
                                    </v-container>
                                </div>
                            </div>
                            <v-divider></v-divider>
                            <div class="row">
                                <div class="col-sm-6" v-for="(mode,index) in prixEtModeParOffreVoyageList" :key="index">
                                    <v-card>
                                        <v-card-title>Mode n°{{ index + 1}}</v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col><small class="muted-text">Mode de l'offre :</small></v-col>
                                                    <v-col><span class="label-text font-weight-bold">{{ mode.modeDesignation }}</span></v-col>
                                                </v-row>

                                                <v-row>
                                                    <v-col><small class="muted-text">Catégorie :</small></v-col>
                                                    <v-col><span class="label-text font-weight-bold">{{ mode.categorieVoyageurDesignation }}</span></v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col><small class="muted-text">Prix de l'offre :</small></v-col>
                                                    <v-col><span class="label-text font-weight-bold">{{ mode.prix }} FCFA</span></v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card><br>
                    <v-card elevation="5">
                        <v-card-title><span class="title-card">INFORMATION DU CLIENT:</span></v-card-title>
                        <v-card-text>
                            <form>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Nom du voyageur:</label>
                                        <input type="text" class="form-control" id="inputEmail4">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Prenom du voyageur:</label>
                                        <input type="prenom" class="form-control" id="inputPassword4">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Numero de téléphone:</label>
                                        <input type="text" class="form-control" id="inputEmail4">
                                    </div>
                                </div>
                            </form>
                        </v-card-text>
                    </v-card><br>

                    <v-card elevation="5">
                        <v-card-title><span class="title-card">CHOIX DU MODE DE PAIEMENT:</span></v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-radio-group row>
                                    <v-radio label="En espèces" value="radio-1"></v-radio>
                                    <v-radio label="Mobile money" value="radio-2"></v-radio>
                                    <v-radio label="Autres méthodes" value="radio-3"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-card-text>
                    </v-card><br>
                </v-container>  
                <v-card-actions>
                    <v-btn x-small color="secondary">RETOUR</v-btn>
                    <v-btn x-small color="teal"><span class="btn-title">RESERVER POUR CE TRAJET</span></v-btn>
                </v-card-actions>         
            </v-sheet>
            </v-container>
    </v-app>
</template>

<script>
import axios from "axios"
import $ from 'jquery'
import { API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE , API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE , HEADERS } from '../globalConfig/globalConstConfig'
export default {
    name:"ReservationBillet",
    data(){
        return{
            offreVoyage:{
                id:null,
                designation : null ,
                description: null,
                compagnieTransportRaisonSociale : "COMPAGNIE KOUEVI CT",
                typeOffreVoyageDesignation : null,
                villeDepartDesignation : null,
                villeDestinationDesignation : null
            },

            jourSemainesParOffreVoyagesList : [],
            prixEtModeParOffreVoyageList:[],

            offreVoyageObject:{
                data:{
                    designation:null
                }
            },
        }
    },

    methods:{

        async retrieveOffreSelected(){
            if (localStorage.getItem("offreVoyageSelected")) {
                try {
                    const offreVoyageEditing = JSON.parse(localStorage.getItem("offreVoyageSelected"));
                    this.offreVoyage.id = offreVoyageEditing.id;
                    this.offreVoyage.designation = offreVoyageEditing.designation;
                    this.offreVoyage.description = offreVoyageEditing.description;
                    this.offreVoyage.typeOffreVoyageDesignation = offreVoyageEditing.typeOffreVoyageDesignation;
                    this.offreVoyage.villeDepartDesignation = offreVoyageEditing.villeDepartDesignation;
                    this.offreVoyage.villeDestinationDesignation = offreVoyageEditing.villeDestinationDesignation;
                    this.offreVoyageObject.data.designation = this.offreVoyage.designation;
                    await axios.post(API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE , this.offreVoyageObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                        if (response.data.status.code == 800) {
                            this.jourSemainesParOffreVoyagesList = response.data.items
                            console.log(this.jourSemainesParOffreVoyagesList)
                        }else{
                            this.jourSemainesParOffreVoyagesList = [];
                        }
                    }).catch((e) => {
                        this.errorMsg = e ;
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    })

                    await axios.post(API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE, this.offreVoyageObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                        if (response.data.status.code == 800) {
                            this.prixEtModeParOffreVoyageList = response.data.items
                        }else{
                            this.prixEtModeParOffreVoyageList = [];
                        }
                    }).catch((e) => {
                        this.errorMsg = e ;
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    })
                    //localStorage.removeItem("offreVoyage");
                } catch (error) {
                    localStorage.removeItem("offreVoyage");
                }
            }
        },
    },

    mounted(){
        this.retrieveOffreSelected();
    }
}
</script>

<style scoped>
    .title-card{
        font-weight: bold;
        font-size: 12px;
    }

    .designation-offre{
        font-weight: 700;
        color: #303952;
    }

    .btn-title{
        color: white;
    }

    .gareDepart{
        font-size: 15px;
        color: teal;
        font-weight: bold;
    }

    .gareDestination{
        font-size: 15px;
        color: #2C3A47;
        font-weight: bold;
    }
</style>