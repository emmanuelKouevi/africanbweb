<template>
    <v-app>
        <v-form>
            <v-card color="teal">
                <v-card-title class="title_card">MODIFIER UNE OFFRE DE VOYAGE</v-card-title>
                <v-card-subtitle>Modiifier portant sur votre de voyage</v-card-subtitle>
            </v-card><br>




            <v-card>
                <v-card-title class="title_card">INFORMATION(S) GÉNÉRALE(S) DE L'OFFRE DE VOYAGE
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small color="teal" title="Voir plus" @click="isVisibleOffreVoyageInfo()"><v-icon>mdi-plus-outline</v-icon></v-btn>
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
                </v-card>
            </v-card><br>

            <v-card :loading="loadingModePrix">
                <v-card-title class="title_card">MODE ET PRIX DE L'OFFRE
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small color="teal" title="Voir plus" @click="isVisiblePrixModeOffreVoyage()"><v-icon>mdi-plus-outline</v-icon></v-btn>
                </v-card-title>
                <v-card id="card-prix-mode-offre-voyage">
                    <v-container>
                        <v-row v-if="prixEtModeParOffreVoyageList.length">
                            <v-col cols="6" v-for="(mode,index) in prixEtModeParOffreVoyageList" :key="index">
                                <v-card>
                                    <v-card-title>Mode n° {{ index + 1 }}
                                        <v-spacer></v-spacer>
                                        <v-btn icon><v-icon color="primary">mdi-pencil</v-icon></v-btn>
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
                    <v-btn outlined rounded icon small color="teal" title="Voir plus" @click="isVisibleVilleEscaleOffreVoyage()"><v-icon>mdi-plus-outline</v-icon></v-btn>
                </v-card-title>
                <v-card id="card-ville-escale-offre-voyage">
                    <v-container>
                        <v-data-table
                            :headers="headers"
                            :items="villesEscalesParOffreVoyagesList"
                            :search="search">

                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon title="editer" color="blue" small class="mr-2" @click="editCompagnieTransport(item)">mdi-pencil</v-icon>                       
                                <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProduitLogement(item)">mdi-delete</v-icon>
                            </template>

                        </v-data-table>
                    </v-container>
                </v-card>
            </v-card><br>

            <v-card>
                <v-card-title class="title_card">PROPRIETES DE L'OFFRE
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small color="teal" title="Voir plus"><v-icon>mdi-plus-outline</v-icon></v-btn>
                </v-card-title>
            </v-card><br>

            <v-card :loading="loadingProgrammeOffreVoyage">
                <v-card-title class="title_card">PROGRAMME DE L'OFFRE
                    <v-spacer></v-spacer>
                    <v-btn outlined rounded icon small color="teal" title="Voir plus" @click="isVisibleProgrammeOffreVoyage()"><v-icon>mdi-plus-outline</v-icon></v-btn>
                </v-card-title>
                <v-card id="card-programme-offre-voyage">
                    <v-container>
                        <v-row>
                            <v-col cols="6" v-for="(jourSemaine,index) in jourSemainesParOffreVoyagesList" :key="index">
                                <v-card>
                                    <v-card-title>Programme n° {{ index + 1 }}
                                        <v-spacer></v-spacer>
                                        <v-btn icon><v-icon color="primary">mdi-pencil</v-icon></v-btn>
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

        </v-form>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>


<script>
import { required , minLength } from 'vuelidate/lib/validators';
import { API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE ,API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE } from '../globalConfig/globalConstConfig'
import { API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE , API_RECUPERER_VILLE_ESCALE_PAR_OFFRE_VOYAGE } from '../globalConfig/globalConstConfig'
import { API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE  } from '../globalConfig/globalConstConfig'
import axios from 'axios'
import $ from 'jquery'
export default {
    name: 'ModifierOffreVoyage',
    data(){
        return{
            search:'',
            headers:[
                {text : 'Designation' , value : 'designation'},
                {text : 'Pays' , value : 'paysDesignation'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],
            errorMsg : null,
            successMsg : null,
            overlay : false,

            loadingModePrix:false,
            loadingVilleEscale:false,
            loadingProgrammeOffreVoyage:false,

            simpleObject:{},


            offreVoyageReceivedPrice:{
                data:{
                    designation:null
                }
            },

            offreVoyage:{
                id:null,
                designation : null ,
                description: null,
                compagnieTransportRaisonSociale : "COMPAGNIE KOUEVI CT",
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
            this.obtenirVilleEscaleParOffreVoyage();
        },

        //OBTENIR LE PRIX ET LE MODE PAR OFFRE DE VOYAGE
        async obtenirPrixEtModeParOffreVoyage(){
            this.loadingModePrix = true
            this.offreVoyageReceivedPrice.data.designation = this.offreVoyage.designation;
            await axios.post(API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE, this.offreVoyageReceivedPrice).then((response) => {
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
            this.offreVoyageReceivedPrice.data.designation = this.offreVoyage.designation;
            await axios.post(API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE , this.offreVoyageReceivedPrice).then((response) => {
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
            this.offreVoyageReceivedPrice.data.designation = this.offreVoyage.designation;
            await axios.post(API_RECUPERER_VILLE_ESCALE_PAR_OFFRE_VOYAGE, this.offreVoyageReceivedPrice).then((response) => {
                if (response.data.status.code == 800) {
                    this.villesEscalesParOffreVoyagesList = response.data.items
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



        //OBTENIR REFERENCE DESIGNATION TYPE OFFRE DE VOYAGE
        async obtenirTypeOffreVoyageList(){
            this.objectToSend.datas.push(this.referenceTypeOffreVoyage)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSend).then((response) => {
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
            if (localStorage.getItem("offreVoyage")) {
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
            await axios.post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.simpleObject).then((response) => {
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
        //this.obtenirListeDesVillesDisponible();
        //this.obtenirPrixEtModeParOffreVoyage();
        this.obtenirVilleEscaleParOffreVoyage();
        this.obtenirJourSemaineParOffreVoyage();
    }
}
</script>

<style scoped>
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
</style>