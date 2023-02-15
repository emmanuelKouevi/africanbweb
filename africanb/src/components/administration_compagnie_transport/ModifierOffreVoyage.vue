<template>
    <v-app>
        <v-form>
            <v-card color="teal">
                <v-card-title class="title_card">MODIFIER UNE OFFRE DE VOYAGE</v-card-title>
                <v-card-subtitle>Modiifier portant sur votre de voyage</v-card-subtitle>
            </v-card><br>

            <v-card max-height="675">
                <v-card-title class="title_card">INFORMATION(S) GÉNÉRALE(S) DE L'OFFRE DE VOYAGE
                    <v-spacer></v-spacer>
                    <v-btn small color="teal"><v-icon color="white">mdi-check</v-icon>Modifier</v-btn>
                </v-card-title>
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

        </v-form>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>


<script>
import { required , minLength } from 'vuelidate/lib/validators';
import { API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE ,API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE } from '../globalConfig/globalConstConfig'
import axios from 'axios'
import $ from 'jquery'
export default {
    name: 'ModifierOffreVoyage',
    data(){
        return{
            errorMsg : null,
            successMsg : null,
            overlay : false,

            simpleObject:{},

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
            }
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
        this.obtenirListeDesVillesDisponible();
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
</style>