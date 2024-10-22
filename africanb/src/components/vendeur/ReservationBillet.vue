<template>
    <v-app>
        <v-container fluid>
            <div class="row">
                <div class="col-lg-8">
                    <v-card elevation="5">
                        <v-card-text>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title class="designation_offre"> {{ offreVoyage.designation }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Type l'offre:</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ offreVoyage.typeOffreVoyageDesignation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Départ :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ offreVoyage.villeDepartDesignation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Destination :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ offreVoyage.villeDestinationDesignation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                
                            </v-list>
                        </v-card-text>
                    </v-card>
                    
                    <div class="animate__animated animate__bounce">
                        <div class="row">
                            <div class="col-lg-12">
                                <v-card>
                                    <v-card-subtitle>Selectionner le jour de voyage:</v-card-subtitle>
                                    <v-card-text>
                                        <div class="row">
                                            <v-radio-group row v-model="jourDepart">
                                                <v-radio v-for="jour, j in jourSemainesParOffreVoyagesList" :key="j" 
                                                :label="jour.jourSemaineDesignation" :value="jour.jourSemaineDesignation" 
                                                >
                                            </v-radio>
                                            </v-radio-group>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </div>
                    </div>
                    

                    <div class="row animate__animated animate__fadeInDown" :hidden="jourDepart==null">
                        <div class="col-lg-12">
                            <v-card>
                                <v-card-subtitle>Pour quelle heure votre départ ?</v-card-subtitle>
                                <v-card-text>
                                    <div class="row">
                                        <v-radio-group row>
                                            <v-radio-group row v-model="jourVoyageSelected.designation">
                                                <v-radio v-for="hours, h in getProgrammeFromDaySelected" :key="h" 
                                                    :label="hours.heureDepart" :value="hours.designation" 
                                                >
                                                </v-radio>
                                            </v-radio-group>
                                        </v-radio-group>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </div>
                    </div>

                    <div class="row animate__animated animate__fadeInDown" :hidden="jourVoyageSelected.designation==null">
                        <div class="col-lg-12">
                            <small class="">Sélectionnez un mode et une catégorie !</small>
                            <div class="row">
                                <div class="col-sm-6" v-for="(mode,index) in prixEtModeParOffreVoyageList" :key="index">
                                    <v-card rounded="xl">
                                            <v-card-title>Mode n°{{ index + 1}}
                                            <v-spacer></v-spacer>
                                            <v-radio-group row>
                                                <v-radio-group row v-model="modeChoosen">
                                                    <v-radio :value="mode"></v-radio>
                                                </v-radio-group>
                                            </v-radio-group>
                                        </v-card-title>
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
                        </div>
                    </div>

                    <div class="row animate__animated animate__fadeInDown" :hidden="modeChoosen.modeDesignation == null">
                        <div class="col-lg-12">
                            <v-card>
                                <v-card-subtitle>Formulaire de réservation</v-card-subtitle>
                                <v-card-text>
                                    <form class="row g-3">
                                        <div class="col-md-6">
                                            <label for="inputEmail4" class="form-label">Nom</label>
                                            <input type="text" v-model="user.nom" class="form-control" id="inputEmail4">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputPassword4" class="form-label">Prenom(s)</label>
                                            <input type="text" v-model="user.prenoms" class="form-control" id="inputPassword4">
                                        </div>
                                        <div class="col-12">
                                            <label for="inputAddress" class="form-label">E-mail</label>
                                            <input type="email" v-model="user.email" class="form-control" id="inputAddress">
                                        </div>

                                        <div class="col-md-6">
                                            <label for="inputCity" class="form-label">N° de téléphone:</label>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">+225</span>
                                                <input type="text" v-model="user.telephone" class="form-control" aria-describedby="basic-addon1">
                                            </div>
                                        </div>
 
                                        <div class="col-md-3">
                                            <label for="inputZip" class="form-label">Nombre de places:</label>
                                            <input type="text" v-model="programmeReserved.data.nombrePlace" class="form-control" id="inputZip">
                                        </div>
                                    </form>
                                </v-card-text>
                            </v-card>
                        </div>

                    </div><br>

                    <v-card-actions class="float-right">
                        <v-btn small color="secondary">ANNULER</v-btn>
                        <v-btn small color="success" @click="reserverOffre()">RESERVER</v-btn>
                    </v-card-actions> 

                </div>

                <div class="col-lg-4">
                    <v-card elevation="5">
                        <v-card-text>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title class="font-weight-bold">RESERVATION EN COURS:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>offre de voyage :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ offreVoyage.designation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Départ :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ offreVoyage.villeDepartDesignation}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Destination :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ offreVoyage.villeDestinationDesignation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-divider></v-divider>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Jour de voyage :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ jourDepart }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Catégorie :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ modeChoosen.categorieVoyageurDesignation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Prix :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ modeChoosen.prix }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-divider></v-divider>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Nom:</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ user.nom}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Prénom(s) :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ user.prenoms }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>E-mail :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ user.email }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Numéro de télephone :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ user.telephone }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Nombre de places :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="font-weight-bold">{{ programmeReserved.data.nombrePlace }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                
                            </v-list>
                        </v-card-text>
                    </v-card>
                </div>
            </div><br>
             
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
import { API_RESERVER_PROGRAMME_OFFRE , API_CREATE_HISTORIQUE_PAIEMENT} from '../globalConfig/globalConstConfig'
export default {
    name:"ReservationBillet",
    data(){
        return{
            successMsg : null,
            errorMsg : null,

            modeChoosen:{},


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

            historyPaiement:{
                data:{
                    dateTimePayment:"",
                    modePaiementDesignation:"",
                    reservationBilletVoyageDesignation: "",
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
            this.$swal.fire({
                title: "Êtes vous sûre de confirmer cette réservation ?",
                showCancelButton: true, 
                confirmButtonText: "Confirmer",
            }).then((result) => {
                if(result.isConfirmed){
                    this.overlay = true;
                    this.programmeReserved.data.programmeDesignation = this.jourVoyageSelected.designation
                    this.programmeReserved.data.gareDesignation = this.$store.state.userAuthentified.gareDesignation;
                    this.programmeReserved.data.offreVoyageDesignation = this.offreVoyage.designation
                    this.programmeReserved.data.categorieVoyageur = this.modeChoosen.categorieVoyageurDesignation
                    this.programmeReserved.data.clientDetails = this.user;

                    axios.post(API_RESERVER_PROGRAMME_OFFRE, this.programmeReserved, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                        if (response.status == 200) {
                            if (response.data.status.code == 800) {
                                this.creerHistoriquePaiement(response.data.items[0].designation);
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
                            
                        } else if (response.status == 204) {
                            this.warningMsg = "Erreur , lors de la création";
                            $(".alert-warning").fadeIn();
                            setTimeout(function(){
                                $(".alert-warning").fadeOut(); 
                            }, 3000)
                            //this.objectContainList.datas = []
                        }else{
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
                }else{
                    this.errorMsg = "Error lors de la réservation";
                        $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                }
            })
        
        },

        // CREER HISTORIQUE DE PAIEMENT
        async creerHistoriquePaiement(designationReservation){
            let date = new Date();
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let day = String(date.getDate()).padStart(2, '0'); 
            let hours = String(date.getHours()).padStart(2, '0'); 
            let minutes = String(date.getMinutes()).padStart(2, '0'); 
            let seconds = String(date.getSeconds()).padStart(2, '0'); 
            let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
            this.historyPaiement.data.reservationBilletVoyageDesignation = designationReservation
            this.historyPaiement.data.dateTimePayment = formattedDate;
            this.historyPaiement.data.modePaiementDesignation = "Mode espece"
            await axios.post(API_CREATE_HISTORIQUE_PAIEMENT, this.historyPaiement, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {

                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                    }  
                    
                }else{
                    this.errorMsg = "Erreur , lors la création de l'historique";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
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