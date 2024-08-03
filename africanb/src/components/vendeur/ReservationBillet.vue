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
                                                        <v-icon dense color="teal">mdi-circle</v-icon>&nbsp;&nbsp; Gare départ : <span class="gareDepart">{{ offreVoyage.villeDepartDesignation }}</span>  
                                                    </v-row><br><br>
                                                    
                                                    <v-row>
                                                        <v-icon dense color="#2C3A47">mdi-circle</v-icon>&nbsp;&nbsp; Gare destination : <span class="gareDestination">{{ offreVoyage.villeDestinationDesignation }} </span>  
                                                    </v-row>        
                                                </v-container>
                                            </v-card-text>
                                        </v-card>
                                    </v-container>
                                </div>

                                <div class="col-sm-6">
                                    <v-container>
                                        <v-card>
                                            <v-card-text>
                                                <v-container>
                                                    <div class="form-group">
                                                        <label>Choisissez le jour du voyage:</label>
                                                        <v-select :items="jourSemainesParOffreVoyagesList" item-text="jourSemaineDesignation" item-value="jourSemaineDesignation" v-model="jourDepart" dense outlined></v-select>

                                                    </div>

                                                    <div class="form-group" v-if="jourVoyageSelected">
                                                        <label>Choisissez l'heure de départ:</label>
                                                        <v-select v-model="jourVoyageSelected.designation" :items="getProgrammeFromDaySelected" item-text="heureDepart" item-value="designation" dense outlined></v-select>
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
                                        <label for="inputEmail4">Nom:</label>
                                        <input type="text" v-model="user.nom" class="form-control" id="inputEmail4">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Prenoms:</label>
                                        <input type="text" class="form-control" id="inputPassword4" v-model="user.prenoms">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Numero de téléphone:</label>
                                        <input type="text" class="form-control" v-model="user.telephone" id="inputEmail4">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Nombre de place:</label>
                                        <input type="number" min="0" class="form-control" v-model="programmeReserved.data.nombrePlace" id="inputEmail4">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-8">
                                        <label for="inputEmail4">email:</label>
                                        <input suffix="225" type="text" class="form-control" v-model="user.email" id="inputEmail4">
                                    </div>
                                </div>
                            </form>
                        </v-card-text>
                    </v-card><br>

                </v-container>  

                <v-card-actions>
                    <v-btn x-small color="secondary">RETOUR</v-btn>
                    <v-btn x-small color="teal" @click="chooseCategorieVoyageur"><span class="btn-title">RESERVER POUR CE TRAJET</span></v-btn>
                </v-card-actions>  

            </v-sheet>

        </v-container>

        <v-dialog v-model="dialog">

            <v-sheet>

                <v-toolbar><v-toolbar-title><span class="font-weight-bold">CONFIRMATION DE RESERVATION</span></v-toolbar-title></v-toolbar><br>

                <v-card>
                    <v-card-text>
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
                                            <v-icon dense color="teal">mdi-circle</v-icon>&nbsp;&nbsp; Gare départ : <span class="gareDepart">{{ offreVoyage.villeDepartDesignation }}</span>  
                                        </v-row><br><br>
                                        <v-row>
                                            <v-icon dense color="#2C3A47">mdi-circle</v-icon>&nbsp;&nbsp; Gare destination : <span class="gareDestination">{{ offreVoyage.villeDestinationDesignation }} </span>  
                                        </v-row>        
                                    </v-container>
                                    <v-divider></v-divider>
                                </v-card-text>
                            </v-card>
                            
                            <v-divider></v-divider>

                            <v-card>
                                <v-card-title><span class="designation-offre">Information du client</span></v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <span>Nom:</span>&nbsp;&nbsp;
                                            <span>{{ user.nom }}</span>
                                        </v-row><br><br>
                                        <v-row>
                                            <span>Prenoms:</span>&nbsp;&nbsp;
                                            <span>{{ user.prenoms }}</span>
                                        </v-row><br><br>
                                        <v-row>
                                            <span>Contact:</span>&nbsp;&nbsp;
                                            <span>{{ user.telephone }}</span>
                                        </v-row>      
                                    </v-container>
                                    <v-divider></v-divider>
                                </v-card-text>
                            </v-card>

                            <v-divider></v-divider>

                            <v-card>
                                <v-card-title><span class="designation-offre">Catégorie du client</span></v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <div class="form-group">
                                            <label>Selectionnez la categorie:</label>
                                            <v-select class="col-sm-6" :items="prixEtModeParOffreVoyageList" item-text="categorieVoyageurDesignation" item-value="categorieVoyageurDesignation" v-model="programmeReserved.data.categorieVoyageur" dense outlined></v-select>
                                        </div>
                                        <div>
                                            <span class="font-weight-bold">Mode :</span> <span class="data-label">{{ getModeByOffre }}</span><br><br>
                                        </div>
                                        <div>
                                            <span class="font-weight-bold">Montant à payer :</span> <span class="data-label font-weight-bold">{{ getPrixByOffre }}</span> FCFA
                                        </div>
                                              
                                    </v-container>
                                    <v-divider></v-divider>
                                </v-card-text>
                            </v-card>

                        </v-container>

                    </v-card-text>  

                    <v-card-actions>

                        <v-btn x-small color="secondary">Annuler</v-btn>

                        <v-btn x-small color="success" @click="reserverOffre()">confirmer</v-btn>

                    </v-card-actions>  

                </v-card>

            </v-sheet>
                                
            <v-divider vertical></v-divider>

        </v-dialog>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 

        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>

        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>

    </v-app>

</template>

<script>
import axios from "axios"
import $ from 'jquery'
import { API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE , API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE , HEADERS } from '../globalConfig/globalConstConfig'
import { API_RESERVER_PROGRAMME_OFFRE } from '../globalConfig/globalConstConfig'
export default {
    name:"ReservationBillet",
    data(){
        return{
            successMsg : null,
            errorMsg : null,


            programmeReserved:{
                data:{
                    programmeDesignation : null,
                    nombrePlace : null,
                    categorieVoyageur: null,
                    gareDesignation : null,
                    isOtherPerson:true,
                    clientDetails:{
                        nom: null,
                        prenoms: null,
                        email: null,
                        telephone:null
                    },
                    offreVoyageDesignation:null,
                }
            },

            user:{
                nom : null,
                prenoms : null,
                email:null,
                telephone : null
            },

            userCategory : null,

            dialog:false,
            overlay: false,

            offreVoyage:{
                id:null,
                designation : null ,
                description: null,
                compagnieTransportRaisonSociale : "KOUEVI CT",
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

            jourVoyageSelected: {
                id:null,
                designation:null,
                jourSemaineDesignation:null,
                nombrePlaceDisponible:null,
            },

            jourDepart:null,

        }
    },

    methods:{

        // FAIRE UNE RESERVATION POUR UN UTILISATEUR
        async reserverOffre(){
            this.dialog = false;
            this.overlay = true;
            this.programmeReserved.data.programmeDesignation = this.jourVoyageSelected.designation
            this.programmeReserved.data.gareDesignation = this.$store.state.userAuthentified.gareDesignation;
            this.programmeReserved.data.offreVoyageDesignation = this.offreVoyage.designation
            this.programmeReserved.data.clientDetails = this.user;
            await axios.post(API_RESERVER_PROGRAMME_OFFRE, this.programmeReserved, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                console.log(this.programmeReserved)
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        //this.objectContainList.datas = []
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        //this.objectContainList.datas = []
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    //this.objectContainList.datas = []
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    //this.objectContainList.datas = []
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
                //this.objectContainList.datas = []
            }).finally(() => {
                this.overlay = false;
            })
        },
        
        // PROCEDER A LA RESERVATION
        chooseCategorieVoyageur(){
            this.dialog = true
        },

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

    computed:{
        
        getProgrammeFromDaySelected(){
            let programmeDTOList = [];
            this.jourSemainesParOffreVoyagesList.forEach(element => {
                if (this.jourDepart == element.jourSemaineDesignation) {
                    if(element.programmeDTOList != null || element.programmeDTOList != undefined){
                        element.programmeDTOList.forEach(item => {
                            programmeDTOList.push(item)
                        });
                    }
                    
                }
            });
            return programmeDTOList
        },

        getModeByOffre(){
            let mode ;
            this.prixEtModeParOffreVoyageList.forEach(element => {
                if (this.programmeReserved.data.categorieVoyageur == element.categorieVoyageurDesignation) {
                    mode = element.modeDesignation
                }
            });
            return mode;
        },

        getPrixByOffre(){
            let price ;
            this.prixEtModeParOffreVoyageList.forEach(element => {
                if (this.programmeReserved.data.categorieVoyageur == element.categorieVoyageurDesignation) {
                    price = element.prix
                }
            });
            return price;
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

    .data-label{
        color: #2c3e50;
    }

    .myalert{
        display: none;
        z-index: 1900;
    }

    .alert-success{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }

    .alert-error{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }
</style>