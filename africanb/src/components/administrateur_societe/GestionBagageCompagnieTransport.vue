<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card width="1200" elevation="3">
                    <v-card-title>GESTION DES BAGAGES</v-card-title>
                    <v-card-subtitle>Gérer le chargement de bagages</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="5">
                                <v-text-field :error-messages="designationBagage" rounded dense outlined label="Réference du sac" v-model.trim="$v.bagageModel.designation.$model"></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-select :error-messages="typeBagageErrors" :items="referenceBagageList" item-text="designation" item-value="designation" rounded dense outlined color="teal" label="sélectionnez un type de bagage" v-model.trim="$v.bagageModel.typeBagageDesignation.$model"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field :error-messages="nombreBagageErrors" rounded dense outlined label="nombre de sac gratuit" v-model.trim="$v.bagageModel.nombreBagageGratuitParTypeBagage.$model"></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field :error-messages="prixBagageErrors" rounded dense outlined color="teal" label="prix par type de sac" suffix="FCFA" v-model.number="$v.bagageModel.coutBagageParTypeBagage.$model"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-card-actions>
                        <v-btn small rounded outlined>REINITIALISER</v-btn>
                        <v-btn small type="submit" rounded outlined color="primary">VALIDER</v-btn>
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
import { required } from 'vuelidate/lib/validators'
import axios from "axios";
import $ from 'jquery'
import { API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE , API_CREER_BAGAGE, HEADERS } from '../globalConfig/globalConstConfig'
export default {
    name:"GestionBagageCompagnieTransport",
    data(){
        return{
            errorMsg : null,
            successMsg: null,
            overlay: false,

            bagageModel:{
                designation: null,
                coutBagageParTypeBagage:null,
                nombreBagageGratuitParTypeBagage:null,
                typeBagageDesignation:null,
                compagnieTransportRaisonSociale:"COMPAGNIE KOUEVI CT"
            },

            bagageToSend:{
                datas:[]
            },

            referenceBagageList : [],

            referenceBagage:{
                referenceFamilleDesignation: "referenceFamilleBagage"
            },

            objectToSendReferenceBagage:{
                datas:[],
            },
        }
    },

    validations:{
        bagageModel:{
            designation:{
                required
            },
            coutBagageParTypeBagage:{
                required
            },
            nombreBagageGratuitParTypeBagage:{
                required
            },
            typeBagageDesignation:{
                required
            }
        }
    },

    methods:{

        //SOUMISSION DU FORMULAIRE
        submitForm(){
            this.creerBagage();
        },

        //CREER UNE INSTANCE DE BAGAGE
        async creerBagage(){
            this.bagageToSend.datas.push(this.bagageModel)
            this.overlay = true ;
            await axios.post(API_CREER_BAGAGE, this.bagageToSend , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.bagageToSend.datas = [] ;
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.bagageToSend.datas = [] ;
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création de l'offre de voyage";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.bagageToSend.datas = [] ;
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.bagageToSend.datas = [] ;
                }
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
                this.bagageToSend.datas = [] ;
            }).finally(() => {
                this.overlay = false;
            })
        },

        //OBTENIR REFERENCE DESIGNATION BAGAGE
        async obtenirReferenceBagageList(){
            this.objectToSendReferenceBagage.datas.push(this.referenceBagage)
            await axios.post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, this.objectToSendReferenceBagage , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                this.referenceBagageList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },

        //VERIFIE SI CEST UN NOMBRE POSITIF
        isNumber(item){
          return  item  > 0
        },

    },

    computed:{

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION DU MODE D'UNE OFFRE

        designationBagage(){
           const errors = [];
            if (!this.$v.bagageModel.designation.$dirty) return errors
            !this.$v.bagageModel.designation.required && errors.push('La désignation est obligatoire.')
            return errors 
        },

        prixBagageErrors(){
           const errors = [];
            if (!this.$v.bagageModel.coutBagageParTypeBagage.$dirty) return errors
            !this.isNumber(this.bagageModel.coutBagageParTypeBagage) && errors.push('Saisissez un prix correct.')
            !this.$v.bagageModel.coutBagageParTypeBagage.required && errors.push('Le prix est obligatoire.')
            return errors 
        },

        typeBagageErrors(){
           const errors = [];
            if (!this.$v.bagageModel.typeBagageDesignation.$dirty) return errors
            !this.$v.bagageModel.typeBagageDesignation.required && errors.push('La selection du type du sac est obligatoire.')
            return errors 
        },

        nombreBagageErrors(){
           const errors = [];
           !this.isNumber(this.bagageModel.nombreBagageGratuitParTypeBagage) && errors.push('Saisissez un nombre correct.')
            if (!this.$v.bagageModel.nombreBagageGratuitParTypeBagage.$dirty) return errors
            !this.$v.bagageModel.nombreBagageGratuitParTypeBagage.required && errors.push('Veuillez renseigner ce champs.')
            return errors 
        },

    },

    mounted(){
        this.obtenirReferenceBagageList();
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