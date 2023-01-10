<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card max-width="1200px" class="mx-auto">
                <v-card-title class="title"><v-icon color="teal">mdi-plus</v-icon> AJOUTER UNE VILLE</v-card-title>

                <v-divider></v-divider>
                
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <v-label>Designation:</v-label>
                        </v-col>
                        <v-col>
                            <v-text-field dense outlined color="teal" placeholder="Entrer une designation"
                                :error-messages="designationVilleErrors"
                                v-model.trim="$v.ville.designation.$model"
                                @input="$v.ville.designation.$touch()"
                                @blur="$v.ville.designation.$touch()">
                            </v-text-field>
                        </v-col>
                    </v-row>
                

                    <v-row>
                        <v-col cols="2">
                            <v-label>Pays:</v-label>
                        </v-col>
                        <v-col cols="5">
                            <v-select :items="paysList" item-text="designation" item-value="id" dense outlined color="teal" v-model="ville.paysId"></v-select>
                        </v-col>
                    </v-row>

                </v-container>

                <v-container>
                    <v-row class="mt-5" justify-lg="space-around">
                        <v-col cols="5"><v-btn color="secondary"><v-icon>mdi-sync</v-icon> REINITIALISER</v-btn></v-col>
                        <v-col cols="5"><v-btn type="submit" color="primary"><v-icon>mdi-check</v-icon> AJOUTER</v-btn></v-col>
                    </v-row>
                </v-container>
            </v-card>   
        </v-form>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 
        <v-alert class="myalert alert-warning" type="warning" width="350px" dismissible>{{ warningMsg }}</v-alert>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import { required } from 'vuelidate/lib/validators'
import { API_CREER_VILLE , API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE} from '../globalConfig/globalConstConfig'
export default {
    name: 'CreerVille',
    data(){
        return{
            overlay : false,
            errorMsg : null,
            warningMsg : null ,
            successMsg : null,

            paysList : [],  

            objectContainList:{
                datas:[]
            },

            ville:{
                designation:null,
                paysId : null
            },
        }
    },

    validations:{
        
        ville:{
            designation:{
                required
            }
        }

    },

    methods:{

        // CREATION D'UNE VILLE VIA UN SERVICE WEB
        async creerVille(){
            this.objectContainList.datas.push(this.ville);
            await axios.post(API_CREER_VILLE, this.objectContainList).then((response) => {
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
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
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
            }).finally(() => {
                this.overlay = false;
            })
        },


        // RECUPERER LA LISTE DES PAYS DISPONIBLES
        async obtenirListePaysDisponible(){
            var objectToSend = {};
            await axios.post(API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE , objectToSend).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.paysList = response.data.items
                    }
                }
                else{
                    this.errorMsg = "Erreur coté serveur";
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                }
            }).catch((e) => {
                this.errorMsg = e;
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            })
        },



        // ENVOI DU FORMULAIRE VERS LE MIDDLEWARE

        submitForm(){
            this.$v.$touch();
            if (this.$v.ville.$invalid) {
                this.errorMsg = 'Des informations sont manquantes'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }else{
                this.creerVille();
            }
        }

    },

    computed:{
        // ENSEMBLE DES CONTRAINTES POUR L'ENRGISTREMENT D'UN PAYS
        designationVilleErrors(){
            const errors = [];
            if (!this.$v.ville.designation.$dirty) return errors
            !this.$v.ville.designation.required && errors.push('Veuillez saisir une désignation.')
            return errors
        }

    },

    mounted(){
        this.obtenirListePaysDisponible();
    }
}
</script>

<style scoped>

    .title{
        color: teal;
        font-weight: bold;
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

    .alert-warning{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }

</style>