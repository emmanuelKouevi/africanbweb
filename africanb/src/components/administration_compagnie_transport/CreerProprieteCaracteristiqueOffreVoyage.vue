<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card>
                    <v-card-title>CARACTERISTIQUES DE L'OFFRE DE VOYAGE
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-subtitle>Définissez les differentes caractéristiques de votre offre</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="4">
                                <v-select :error-messages="offreVoyageDesignationContainte" v-model.trim="$v.offreVoyageDesignation.$model" :items="offreVoyageParCompagnieTransportList" item-text="designation" item-value="designation" rounded dense outlined color="teal" label="sélectionnez une offre"></v-select>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>

                        <v-subheader>SÉLECTIONNEZ LES PROPRIETE DE L'OFFRE DE VOYAGE</v-subheader>
                        
                        <v-row>
                            <div v-for="caracteristique, index in valeurCaracteristiqueOffreList" :key="index">
                                <v-col v-if="caracteristique.typeProprieteOffreVoyageDesignation === 'refElementBoolean'">
                                    <v-checkbox :label="caracteristique.proprieteOffreVoyageDesignation" true-value="true" false-value="false" v-model="caracteristique.valeurTexte"></v-checkbox>
                                </v-col>
                                <v-col v-if="caracteristique.typeProprieteOffreVoyageDesignation === 'refElementString'">
                                    <v-text-field :label="caracteristique.proprieteOffreVoyageDesignation" v-model="caracteristique.valeurTexte"></v-text-field>
                                </v-col>
                            </div>
                        </v-row>

                        <v-divider></v-divider><br>
                    </v-container>
                    <v-card-actions>
                        <v-btn small shaped rounded outlined>REINITIALISER</v-btn>
                        <v-btn type="submit" small shaped rounded outlined color="success">APPLIQUER</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-form>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>


<script>
import axios from 'axios'
import $ from 'jquery'
import { required } from 'vuelidate/lib/validators'
import { API_RECUPERER_LISTE_OFFRE_VOYAGE , API_OBTENIR_LISTE_PROPRIETE_OFFRE_VOYAGE , API_CREER_CARACTERISTIQUES_OFFRE_VOYAGE , HEADERS} from '../globalConfig/globalConstConfig'
export default {
    name:"CreerProprieteCarateristiqueOffreVoyage",
    data(){
        return{
            errorMsg : null,
            successMsg:null,
            overlay : false,

            offreVoyageDesignation: null,

            offreVoyageParCompagnieTransportList:[],
            proprieteOffreVoyagesList : [],
            valeurCaracteristiqueOffreList:[],

            valeurCaracteristiqueObject:{
                datas:[]
            },

            valeurCaracteristiqueListToSend:[],

            offreVoyageObject:{
                data:{
                    compagnieTransportRaisonSociale:"KOUEVI CT"
                }
            },

            simpleObject:{},
        }
    },

    validations:{
        offreVoyageDesignation:{
            required
        }
    },

    methods:{

        // SOUMISSION DU FORMULAIRE DE CREATION DE CARACTERISTIQUES
        submitForm(){
            this.creerValeurCaracteristiqueOffreVoyage();
        },

        //CREATION DES CARACTERISTIQUES PORTANT SUR UNE OFFRE DE VOYAGE
        async creerValeurCaracteristiqueOffreVoyage(){
            this.valeurCaracteristiqueOffreList.forEach(element => {
                if (element.valeurTexte == "true") {
                    var caracteristicToSend = {
                        designation : null,
                        valeurTexte : null,
                        offreVoyageDesignation : null,
                        proprieteOffreVoyageDesignation : null,
                    };
                    caracteristicToSend.designation = element.proprieteOffreVoyageDesignation
                    caracteristicToSend.valeurTexte = element.valeurTexte;
                    caracteristicToSend.offreVoyageDesignation = this.offreVoyageDesignation;
                    caracteristicToSend.proprieteOffreVoyageDesignation = element.proprieteOffreVoyageDesignation;
                    this.valeurCaracteristiqueListToSend.push(caracteristicToSend); 
                } 
            });

            if (this.valeurCaracteristiqueListToSend.length == 0) {
                this.errorMsg = "Vous n'avez pas défini de caracteristiques"
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            }else{
                this.overlay = true
                this.valeurCaracteristiqueObject.datas = this.valeurCaracteristiqueListToSend;
                await axios.post(API_CREER_CARACTERISTIQUES_OFFRE_VOYAGE , this.valeurCaracteristiqueObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                    if (response.status == 200) {
                        if (response.data.status.code == 800) {
                            this.successMsg = response.data.status.message
                            $(".alert-success").fadeIn();
                            setTimeout(function(){
                                $(".alert-success").fadeOut(); 
                            }, 4000)
                            this.valeurCaracteristiqueObject.datas = [] ;
                        }else{
                            this.errorMsg = response.data.status.message
                            $(".alert-error").fadeIn();
                            setTimeout(function(){
                                $(".alert-error").fadeOut(); 
                            }, 3000)
                            this.valeurCaracteristiqueObject.datas = [] ;
                        }  
                    }else{
                        this.errorMsg = "Erreur , opération de création impossible";
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.valeurCaracteristiqueObject.datas = [] ;
                    }
                }).catch((e) => {
                    this.errorMsg = e ;
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                this.valeurCaracteristiqueObject.datas = [] ;
                }).finally(() => {
                    this.overlay = false;
                })
            }
        },

        //RECUPERER LA LISTE DES OFFRES DE VOYAGES PAR COMPAGNIE DE TRANSPORT
        async obtenirOffreVoyageParCompagnieTransport(){
            await axios.post(API_RECUPERER_LISTE_OFFRE_VOYAGE, this.offreVoyageObject, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.offreVoyageParCompagnieTransportList = response.data.items
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
            })
        },


        // OBTENIR LA LISTE DES PROPRIETES PORTANT SUR LES OFFRES DE VOYAGES
        async obtenirProprieteOffreVoyage(){
            await axios.post(API_OBTENIR_LISTE_PROPRIETE_OFFRE_VOYAGE , this.simpleObject , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.proprieteOffreVoyagesList = response.data.items;
                        this.proprieteOffreVoyagesList.forEach(element => {
                            var valeurCaracteristiqueOffre = {
                                designation:null,
                                valeurTexte:null,
                                offreVoyageDesignation : null,
                                typeProprieteOffreVoyageDesignation: null,
                                proprieteOffreVoyageDesignation : null, 
                            }
                            valeurCaracteristiqueOffre.proprieteOffreVoyageDesignation = element.designation;
                            valeurCaracteristiqueOffre.typeProprieteOffreVoyageDesignation = element.typeProprieteOffreVoyageDesignation;
                            this.valeurCaracteristiqueOffreList.push(valeurCaracteristiqueOffre);
                        });
                    }
                }else{
                    this.errorMsg = "Erreur";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }
            })
        },

    },

    computed:{
        // GESTION DES CONTRAINTES DES CHAMPS DE SAISIES
        offreVoyageDesignationContainte(){
            const errors = [];
            if (!this.$v.offreVoyageDesignation.$dirty) return errors
            !this.$v.offreVoyageDesignation.required && errors.push('Veuillez sélectionner une offre de voyage.')
            return errors 
        }
    },


    mounted(){
        this.obtenirOffreVoyageParCompagnieTransport();
        this.obtenirProprieteOffreVoyage();
    }
}
</script>

<style scoped>
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

    .alert-warning{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }
</style>