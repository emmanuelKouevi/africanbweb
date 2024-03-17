<template>
    <v-app>

        <v-card class="mb-5" elevation="5" rounded="lg"><br>
            <v-row justify="center">
                <v-col class="text-center">
                    <span class="subtitle font-weight-thin">OFFRE DE VOYAGE :</span>
                    <span class="offreVoyageDesignation font-weight-bold"> {{ offreVoyage.designation }} </span>
                </v-col>    
            </v-row>

            <v-row>
               <v-col class="text-center">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="subtitle">Total Programmation:</v-list-item-subtitle>
                        </v-list-item-content>
                    
                        <v-list-item-content>
                            <v-list-item-subtitle>{{ jourSemainesParOffreVoyagesList.length }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>

                <v-col>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="subtitle">Total Mode de financement :</v-list-item-subtitle>
                        </v-list-item-content>
                    
                        <v-list-item-content>
                            <v-list-item-subtitle>{{ prixEtModeParOffreVoyageList.length }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-row> 

            <v-row>
               <v-col class="text-center">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="subtitle">Total Propriétés :</v-list-item-subtitle>
                        </v-list-item-content>
                    
                        <v-list-item-content>
                            <v-list-item-subtitle>{{ proprieteParOffreVoyageList.length }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>

                <v-col>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="subtitle">Total villes Escales :</v-list-item-subtitle>
                        </v-list-item-content>
                    
                        <v-list-item-content>
                            <v-list-item-subtitle>{{ villesEscalesParOffreVoyagesList.length }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-row>

            <v-row>
               <v-col cols="6" class="text-center">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="subtitle">Total Bus :</v-list-item-subtitle>
                        </v-list-item-content>
                    
                        <v-list-item-content>
                            <v-list-item-subtitle>{{ busParOffreVoyageList.length }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>

            </v-row>

        </v-card>

        <v-form>
            <v-card>
                <v-card-title class="title_card">INFORMATION(S) GÉNÉRALE(S) DE L'OFFRE DE VOYAGE
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small title="Voir plus" @click="isVisibleOffreVoyageInfo()"><v-icon>mdi-menu-down</v-icon></v-btn>
                </v-card-title>
                <v-card max-height="675" id="card-info-offre-voyage">
                    <v-container fluid>
                        <v-row><v-col><v-text-field :error-messages="designationOffreVoyageErrors" dense rounded outlined color="teal" label="Désignation de l'offre" v-model.trim="$v.offreVoyage.designation.$model"></v-text-field></v-col></v-row><br>
                        <v-row><v-col><v-textarea :error-messages="descriptionOffreVoyageErrors" dense outlined rounded color="teal" label="Description de l'offre"></v-textarea></v-col></v-row><br>
                        <v-row>
                            <v-col cols="6"><v-select :error-messages="villeDepartErrors" v-model.trim="$v.offreVoyage.villeDepartDesignation.$model" dense rounded outlined :items="villesList" item-text="designation" item-value="designation" color="teal" prefix="De :" label="Ville de départ"></v-select></v-col>
                            <v-col cols="6"><v-select :error-messages="villeDestinationErrors" v-model.trim="$v.offreVoyage.villeDestinationDesignation.$model" dense rounded outlined :items="villesList" item-text="designation" item-value="designation" color="teal" prefix="Vers :" label="ville d'arrivée"></v-select></v-col>
                        </v-row><br>
                        <v-row>
                            <v-col cols="6"><v-select :items="referenceTypeOffreVoyageList" item-text="designation" item-value="designation" :error-messages="typeOffreVoyageErrors" v-model.trim="$v.offreVoyage.typeOffreVoyageDesignation.$model" dense outlined rounded color="teal" label="Type de voyage"></v-select></v-col>
                        </v-row>
                    </v-container>

                    <v-card-actions>
                        <v-btn outlined rounded small color="teal" @click="modifierOffreVoyageInfo()">VALIDER LES MODIFICATIONS</v-btn>
                    </v-card-actions>
                </v-card>
            </v-card><br>

            <v-card :loading="loadingModePrix">
                <v-card-title class="title_card">MODE ET PRIX DE L'OFFRE
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small title="Voir plus" @click="isVisiblePrixModeOffreVoyage()"><v-icon>mdi-menu-down</v-icon></v-btn>
                </v-card-title>
                <v-card id="card-prix-mode-offre-voyage">
                    <v-container>
                        <v-row v-if="prixEtModeParOffreVoyageList.length">
                            <v-col cols="6" v-for="(mode,index) in prixEtModeParOffreVoyageList" :key="index">
                                <v-card>
                                    <v-card-title>Mode n° {{ index + 1 }}
                                        <v-spacer></v-spacer>
                                        <v-btn icon @click="editerModeOffreVoyage(mode)"><v-icon color="primary">mdi-pencil</v-icon></v-btn>
                                        <v-btn icon><v-icon color="red">mdi-close</v-icon></v-btn>
                                    </v-card-title>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="3"><small class="muted-text">Désignation :</small></v-col>
                                            <v-col><span class="label-text">{{ mode.designation }}</span></v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="3"><small class="muted-text">Mode de l'offre :</small></v-col>
                                            <v-col><span class="label-text">{{ mode.modeDesignation }}</span></v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="3"><small class="muted-text">Catégorie :</small></v-col>
                                            <v-col><span class="label-text">{{ mode.categorieVoyageurDesignation }}</span></v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="3"><small class="muted-text">Prix de l'offre :</small></v-col>
                                            <v-col><span class="label-text">{{ mode.prix }} FCFA</span></v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row v-else justify="center">
                            <h4>AUCUN MODE OU PRIX DÉFINI POUR CETTE OFFRE</h4> 
                        </v-row>
                    </v-container>
                </v-card>
            </v-card><br>

            <v-card :loading="loadingVilleEscale">
                <v-card-title class="title_card">VILLES ESCALES
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small title="Voir plus" @click="isVisibleVilleEscaleOffreVoyage()"><v-icon>mdi-menu-down</v-icon></v-btn>
                </v-card-title>
                <v-card id="card-ville-escale-offre-voyage">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn small rounded color="teal" outlined>FAIRE DES MODIFICATIONS</v-btn>
                    </v-card-title>

                    <v-container>
                        <v-data-table
                            :headers="headersCities"
                            :items="villesEscalesParOffreVoyagesList"
                            :search="searchVille">
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon title="editer" color="blue" small class="mr-2" @click="editerVilleEscale(item)">mdi-pencil</v-icon>                       
                                <v-icon title="supprimer" color="red" small class="mr-2">mdi-delete</v-icon>
                            </template>

                        </v-data-table>
                    </v-container>
                </v-card>
            </v-card><br>

            <v-card :loading="loadingProprieteOffreVoyage">
                <v-card-title class="title_card">PROPRIETES DE L'OFFRE
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small title="Voir plus" @click="isVisibleProprieteOffreVoyage()"><v-icon>mdi-menu-down</v-icon></v-btn>
                </v-card-title>
                <v-card id="card-propriete-offre-voyage"> 
                    <v-container>
                        <v-row>
                            <v-col cols="6" v-for="(propriete,index) in proprieteParOffreVoyageList" :key="index">
                                <v-chip color="teal" text-color="white" class="mr-2"><span class="etat">{{ propriete.designation }}</span></v-chip>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-card><br>

            <v-card :loading="loadingProgrammeOffreVoyage">
                <v-card-title class="title_card">PROGRAMME DE L'OFFRE
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small title="Voir plus" @click="isVisibleProgrammeOffreVoyage()"><v-icon>mdi-menu-down</v-icon></v-btn>
                </v-card-title>
                <v-card id="card-programme-offre-voyage">
                    <v-container>
                        <v-row>
                            <v-col cols="6" v-for="(jourSemaine,index) in jourSemainesParOffreVoyagesList" :key="index">
                                <v-card>
                                    <v-card-title>Programme n° {{ index + 1 }}
                                        <v-spacer></v-spacer>
                                        <v-btn icon @click="editerJourOffre(jourSemaine)"><v-icon color="primary">mdi-pencil</v-icon></v-btn>
                                        <v-btn icon><v-icon color="red">mdi-close</v-icon></v-btn>
                                    </v-card-title>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="3"><small class="muted-text">Désignation :</small></v-col>
                                            <v-col><span class="label-text">{{ jourSemaine.designation }}</span></v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="3"><small class="muted-text">Jour :</small></v-col>
                                            <v-col><span class="label-text">{{ jourSemaine.jourSemaineDesignation }}</span></v-col>
                                        </v-row>

                                    </v-container>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-card><br>

            <v-card :loading="loadingBusOffreVoyage">
                <v-card-title class="title_card">LISTE DES BUS
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small title="Voir plus" @click="isVisibleBusOffreVoyage()"><v-icon>mdi-menu-down</v-icon></v-btn>
                </v-card-title>
                <v-card id="card-bus-offre-voyage">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn small rounded color="teal" outlined>FAIRE DES MODIFICATIONS</v-btn>
                    </v-card-title>

                    <v-container>
                        <v-data-table
                            :headers="headersCars"
                            :items="busParOffreVoyageList"
                            :search="searchBus">
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon title="editer" color="blue" small class="mr-2" @click="editerVilleEscale(item)">mdi-pencil</v-icon>                       
                                <v-icon title="supprimer" color="red" small class="mr-2">mdi-delete</v-icon>
                            </template>

                        </v-data-table>
                    </v-container>
                </v-card>
            </v-card><br>

        </v-form>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>


<script>
import { required , minLength } from 'vuelidate/lib/validators';
import { API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE ,API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, API_CREER_OFFRE_VOYAGE, HEADERS } from '../globalConfig/globalConstConfig'
import { API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE , API_RECUPERER_VILLE_ESCALE_PAR_OFFRE_VOYAGE } from '../globalConfig/globalConstConfig'
import { API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE , API_RECUPERER_PROPRIETE_PAR_OFFRE_VOYAGE , API_RECUPERER_LISTE_BUS_PAR_OFFRE_VOYAGE} from '../globalConfig/globalConstConfig'
import axios from 'axios'
import $ from 'jquery'
export default {
    name: 'ModifierOffreVoyage',
    data(){
        return{
            searchVille:'',
            headersCities:[
                {text : 'Designation' , value : 'designation'},
                {text : 'Pays' , value : 'paysDesignation'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],

            searchBus:'',
            headersCars:[
                {text : 'Designation' , value : 'designation'},
                {text : 'N° du bus' , value : 'numeroBus'},
                {text : 'Nbre de place' , value : 'nombrePlace'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],
            errorMsg : null,
            successMsg : null,
            overlay : false,

            loadingModePrix:false,
            loadingVilleEscale:false,
            loadingProgrammeOffreVoyage:false,
            loadingProprieteOffreVoyage:false,
            loadingBusOffreVoyage:false,

            simpleObject:{},


            offreVoyageObject:{
                data:{
                    designation:null
                }
            },

            offreVoyageToModify:{
                datas:[]
            },

            offreVoyage:{
                id:null,
                designation : null ,
                description: null,
                compagnieTransportRaisonSociale : "KOUEVI CT",
                typeOffreVoyageDesignation : null,
                villeDepartDesignation : null,
                villeDestinationDesignation : null
            },

            referenceTypeOffreVoyageList:[],
            villesList : [],

            referenceTypeOffreVoyage:{
                referenceFamilleDesignation: "referenceFamilleTypeOffreVoyage"
            },

            objectToSend:{
                datas:[]
            },

            prixEtModeParOffreVoyageList:[],
            villesEscalesParOffreVoyagesList:[],
            jourSemainesParOffreVoyagesList:[],
            proprieteParOffreVoyageList:[],
            busParOffreVoyageList : []
        }
    },

    validations:{
        offreVoyage :{
            designation:{
                required,
                minLength : minLength(4)
            },
            description:{
                required,
                minLength : minLength(4)
            },
            villeDepartDesignation:{
                required,
            },
            villeDestinationDesignation:{
                required,
            },
            typeOffreVoyageDesignation:{
                required
            }
        }
    },

    methods:{

        //MODIFIER UN MODE PORTANT SUR UNE OFFRE DE VOYAGE
        editerModeOffreVoyage(modeOffreVoyage){
            const parsedModeOffreVoyage = JSON.stringify(modeOffreVoyage);
            localStorage.setItem('modeOffreVoyage', parsedModeOffreVoyage);
            this.$router.push({path: "/modifierModeTarif" });
        },

        //MODIFIER UN MODE PORTANT SUR UNE OFFRE DE VOYAGE
        editerVilleEscale(villeEscale){
            const parsedVilleEscale = JSON.stringify(villeEscale);
            localStorage.setItem('villeEscaleEdit', parsedVilleEscale);
            this.$router.push({path: "/modifierVilleEscaleOffreVoyage" });
        },

        //MODIFIER UN JOUR LIE A UNE OFFRE DE VOYAGE
        editerJourOffre(jourOffreVoyage){
            const parsedJourOffre = JSON.stringify(jourOffreVoyage);
            localStorage.setItem('jourOffreEdit', parsedJourOffre);
            this.$router.push({path: "/modifierJourOffreVoyage" });
        },

        // MODIFIER UNE OFFRE DE VOYAGE
        async modifierOffreVoyageInfo(){
            this.offreVoyageToModify.datas.push(this.offreVoyage);
            this.overlay = true ;
            await axios.put(API_CREER_OFFRE_VOYAGE , this.offreVoyageToModify , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.offreVoyageToModify.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.offreVoyageToModify.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la modification de l'offre de voyage";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.offreVoyageToSend.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de modification impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.offreVoyageToModify.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.offreVoyageToModify.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            })
        },

        //RENDRE VISIBLE LES INFORMATIONS SUR L'OFFRE DE VOYAGE SÉLECTIONNÉ
        isVisibleOffreVoyageInfo(){
            $("#card-info-offre-voyage").slideToggle(500);           
        },

        //VISIBILITE DU MODE ET DU PRIX
        async isVisiblePrixModeOffreVoyage(){
            $("#card-prix-mode-offre-voyage").slideToggle(500);
            this.obtenirPrixEtModeParOffreVoyage();
        },

         //VISIBILITE DES VILLES ESCALES
        async isVisibleVilleEscaleOffreVoyage(){
            $("#card-ville-escale-offre-voyage").slideToggle(500);
            this.obtenirVilleEscaleParOffreVoyage();
        },

        async isVisibleProgrammeOffreVoyage(){
            $("#card-programme-offre-voyage").slideToggle(500);
            this.obtenirJourSemaineParOffreVoyage();
        },

        async isVisibleProprieteOffreVoyage(){
            $("#card-propriete-offre-voyage").slideToggle(500);
            this.obtenirProprietesOffreVoyage();
        },

        async isVisibleBusOffreVoyage(){
            $("#card-bus-offre-voyage").slideToggle(500);
            this.obtenirBusOffreVoyage();
        },

        //OBTENIR LE PRIX ET LE MODE PAR OFFRE DE VOYAGE
        async obtenirPrixEtModeParOffreVoyage(){
            this.loadingModePrix = true
            this.offreVoyageObject.data.designation = this.offreVoyage.designation;
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
            }).finally(() => {
                this.loadingModePrix = false;
            })
        },

        //OBTENIR LE JOUR DE LA SEMAINE DE L'OFFRE
        async obtenirJourSemaineParOffreVoyage(){
            this.loadingProgrammeOffreVoyage = true
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
            }).finally(() => {
                this.loadingProgrammeOffreVoyage = false;
            })
        },



        // OBTENIR LA LISTE DES VILLES ESCALES PAR OFFRE DE VOYAGE
        async obtenirVilleEscaleParOffreVoyage(){
            this.loadingVilleEscale = true
            this.offreVoyageObject.data.designation = this.offreVoyage.designation;
            await axios.post(API_RECUPERER_VILLE_ESCALE_PAR_OFFRE_VOYAGE, this.offreVoyageObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.data.status.code == 800) {
                    this.villesEscalesParOffreVoyagesList = response.data.items;
                }else{
                    this.villesEscalesParOffreVoyagesList = [];
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            }).finally(() => {
                this.loadingVilleEscale = false;
            })
        },


        // OBTENIR LA LISTE DES PROPRIETES (CARACTERISTIQUES) PAR OFFRE DE VOYAGES
        async obtenirProprietesOffreVoyage(){
            this.loadingProprieteOffreVoyage = true
            this.offreVoyageObject.data.designation = this.offreVoyage.designation;
            await axios.post(API_RECUPERER_PROPRIETE_PAR_OFFRE_VOYAGE, this.offreVoyageObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.data.status.code == 800) {
                    this.proprieteParOffreVoyageList = response.data.items
                }else{
                    this.proprieteParOffreVoyageList = [];
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            }).finally(() => {
                this.loadingProprieteOffreVoyage = false;
            })
        },

        // OBTENIR LA LISTE DES BUS PAR OFFRE DE VOYAGES
        async obtenirBusOffreVoyage(){
            this.loadingBusOffreVoyage = true
            this.offreVoyageObject.data.designation = this.offreVoyage.designation;
            await axios.post(API_RECUPERER_LISTE_BUS_PAR_OFFRE_VOYAGE, this.offreVoyageObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.data.status.code == 800) {
                    this.busParOffreVoyageList = response.data.items
                }else{
                    this.busParOffreVoyageList = [];
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            }).finally(() => {
                this.loadingBusOffreVoyage = false;
            })
        },



        //OBTENIR REFERENCE DESIGNATION TYPE OFFRE DE VOYAGE
        async obtenirTypeOffreVoyageList(){
            this.objectToSend.datas.push(this.referenceTypeOffreVoyage)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSend , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                this.referenceTypeOffreVoyageList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },

        

        async editerOffreVoyage(){
            if (localStorage.getItem("offreVoyageSelected")) {
                try {
                    const offreVoyageEditing = JSON.parse(localStorage.getItem("offreVoyage"));
                    this.offreVoyage.id = offreVoyageEditing.id;
                    this.offreVoyage.designation = offreVoyageEditing.designation;
                    this.offreVoyage.description = offreVoyageEditing.description;
                    this.offreVoyage.typeOffreVoyageDesignation = offreVoyageEditing.typeOffreVoyageDesignation;
                    this.offreVoyage.villeDepartDesignation = offreVoyageEditing.villeDepartDesignation;
                    this.offreVoyage.villeDestinationDesignation = offreVoyageEditing.villeDestinationDesignation;
                    localStorage.removeItem("offreVoyage");
                } catch (error) {
                    localStorage.removeItem("offreVoyage");
                }
            }else{
                this.$router.replace({path:'/selectionnerOffreVoyage'})
            }
        },

        async obtenirListeDesVillesDisponible(){
            this.loading = false
            await axios.post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.simpleObject , { headers : HEADERS }).then((response) => {
                this.villesList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        }

    },

    computed:{

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UNE OFFRE DE VOYAGE

        designationOffreVoyageErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.designation.$dirty) return errors
            !this.$v.offreVoyage.designation.minLength && errors.push('Au moins quatres (4) caractères pour la designation')
            !this.$v.offreVoyage.designation.required && errors.push('La désignation est obligatoire.')
            return errors 
        },

        descriptionOffreVoyageErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.description.$dirty) return errors
            !this.$v.offreVoyage.description.minLength && errors.push('Au moins quatres (4) caractères pour la description')
            !this.$v.offreVoyage.description.required && errors.push('La description est obligatoire.')
            return errors 
        },

        villeDepartErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.villeDepartDesignation.$dirty) return errors
            !this.$v.offreVoyage.villeDepartDesignation.required && errors.push('La ville de depart est obligatoire.')
            return errors 
        },

        villeDestinationErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.villeDestinationDesignation.$dirty) return errors
            !this.$v.offreVoyage.villeDestinationDesignation.required && errors.push('La ville de destination est obligatoire.')
            return errors 
        },

        typeOffreVoyageErrors(){
           const errors = [];
            if (!this.$v.offreVoyage.typeOffreVoyageDesignation.$dirty) return errors
            !this.$v.offreVoyage.typeOffreVoyageDesignation.required && errors.push('Le type d\'offre de voyage est obligatoire.')
            return errors 
        },
    },
    

    mounted(){
        this.obtenirTypeOffreVoyageList();
        this.editerOffreVoyage();
        this.obtenirListeDesVillesDisponible();
    }
}
</script>

<style scoped>
    .etat{
        font-weight: bold;
    }

    .title_card{
        font-weight: bold;
        font-size: 17px;
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

    .muted-text{
        color: grey;
    }

    .label-text{
        color: teal;
        font-weight: 600;
        font-size: 16px;
    }

    #card-info-offre-voyage{
        display: none;
    }

    #card-prix-mode-offre-voyage{
        display: none;
    }

    #card-ville-escale-offre-voyage{
        display: none;
    }

    #card-programme-offre-voyage{
        display: none;
    }

    #card-propriete-offre-voyage{
        display: none;
    }

    #card-bus-offre-voyage{
        display: none;
    }

    .subtitle{
        color: #636e72;
        font-size: 16px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .offreVoyageDesignation{
        color: #2980b9;
        text-transform: uppercase;
        opacity: 0.7;
    }

    .wrap{
        height: 10px;
        background: linear-gradient(to left top, #2c2c54, #34ace0);
    }
</style>