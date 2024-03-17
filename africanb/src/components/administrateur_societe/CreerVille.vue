<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card max-width="1300px" class="mx-auto">
                <v-card-title><h6 class="font-weight-bold">AJOUTER UNE VILLE</h6></v-card-title>
                <v-card-subtitle>Définissez vos différents villes pour une administration classique</v-card-subtitle>

                <v-card-text>
                    <v-container fluid>
                        <div class="form-group">
                            <label for="inputAddress">Designation de la ville</label>
                            <v-text-field class="col-md-6" dense outlined color="primary" placeholder="Entrer une designation"
                                :error-messages="designationVilleErrors"
                                v-model.trim="$v.ville.designation.$model"
                                @input="$v.ville.designation.$touch()"
                                @blur="$v.ville.designation.$touch()">
                            </v-text-field>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputCity">Pays</label>
                                <v-select :items="paysList" item-text="designation" 
                                    item-value="id" dense outlined color="teal" 
                                    v-model="ville.paysId">
                                </v-select>
                            </div>
                        </div>
                    </v-container>
                </v-card-text>                

                <v-card-actions>
                    <v-btn x-small color="secondary">REINITIALISER</v-btn>
                    <v-btn x-small type="submit" color="success">MODIFIER</v-btn>
                </v-card-actions>

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
import { API_CREER_VILLE , API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE , HEADERS } from '../globalConfig/globalConstConfig'
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
            await axios.post(API_CREER_VILLE, this.objectContainList, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.objectContainList.datas.push = [];
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.objectContainList.datas.push = [];
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.objectContainList.datas.push = [];
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.objectContainList.datas.push = [];
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
                this.objectContainList.datas.push = [];
            }).finally(() => {
                this.overlay = false;
            })
        },


        // RECUPERER LA LISTE DES PAYS DISPONIBLES
        async obtenirListePaysDisponible(){
            var objectToSend = {};
            await axios.post(API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE , objectToSend, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
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