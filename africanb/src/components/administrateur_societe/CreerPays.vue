<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card max-width="1200px" class="mx-auto">
                <v-card-title class="title"><v-icon color="teal">mdi-plus</v-icon> AJOUTER UN PAYS</v-card-title>

                <v-divider></v-divider>
                
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <v-label>Designation:</v-label>
                        </v-col>
                        <v-col>
                            <v-text-field outlined color="teal" placeholder="Entrer une designation"
                                :error-messages="designationPaysErrors"
                                v-model.trim="$v.pays.designation.$model"
                                @input="$v.pays.designation.$touch()"
                                @blur="$v.pays.designation.$touch()">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="2">
                            <v-label>Description:</v-label>
                        </v-col>
                        <v-col>
                            <v-textarea outlined color="teal" aria-placeholder="entrer une description"
                                v-model="pays.description"
                            ></v-textarea>
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
import { required } from 'vuelidate/lib/validators'
import $ from 'jquery'
import axios from 'axios'
import { API_CREER_PAYS } from '../globalConfig/globalConstConfig'
export default {
    name:"CreerPays",
    data(){
        return{

            overlay : false , 
            errorMsg : null ,
            successMsg : null,
            warningMsg : null,

            objectContainList:{
                datas:[]
            },

            pays:{
                designation : null ,
                description : null ,
            },

        }
    },

    validations:{

        pays:{
            designation:{
                required
            }
        }

    },

    methods : {

        // CREATION D'UN PAYS VIA UN SERVICE WEB
        async creerPays(){
            this.objectContainList.datas.push(this.pays);
            await axios.post(API_CREER_PAYS, this.objectContainList).then((response) => {
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


        // SOUMISSION DU FORMULAIRE

        submitForm(){
            this.$v.$touch();
            if (this.$v.pays.$invalid) {
                this.errorMsg = 'Des informations sont manquantes'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }else{
                this.creerPays();
            }
        },

    },

    computed:{

        // ENSEMBLE DES CONTRAINTES POUR L'ENRGISTREMENT D'UN PAYS
        designationPaysErrors(){
            const errors = [];
            if (!this.$v.pays.designation.$dirty) return errors
            !this.$v.pays.designation.required && errors.push('Veuillez saisir une désignation.')
            return errors
        }
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