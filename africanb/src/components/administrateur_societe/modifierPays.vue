<template>
    <v-app>
        <v-app>
            <v-container fluid>
                <v-form @submit.prevent="submitForm">
                    <v-card max-width="1300px" class="">
                        <v-card-title><h6 class="font-weight-bold">MODIFIER UN PAYS</h6></v-card-title>
                        <v-card-subtitle>Modification d'un pays</v-card-subtitle>
                        
                        <v-card-text>
                            <v-container fluid>
                                <div class="form-group">
                                    <label for="inputAddress">Designation</label>
                                    <v-text-field dense outlined color="primary" placeholder="Entrer une designation"
                                        :error-messages="designationPaysErrors"
                                        v-model.trim="$v.pays.designation.$model"
                                        @input="$v.pays.designation.$touch()"
                                        @blur="$v.pays.designation.$touch()">
                                    </v-text-field>
                                </div>
    
                                <div class="form-group">
                                    <label for="inputAddress">Description</label>
                                    <v-textarea outlined color="primary" dense 
                                        aria-placeholder="entrer une description"
                                        v-model="pays.description"
                                    ></v-textarea>
                                </div>
                            </v-container>
                        </v-card-text>
                        
                        <v-card-actions>
                            <v-btn x-small color="secondary">RETOUR</v-btn>
                            <v-btn x-small type="submit" color="success">MODIFIER</v-btn>
                        </v-card-actions>
                    </v-card>   
                </v-form>
            </v-container>
            
    
            <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert> 
            <v-alert class="myalert alert-warning" type="warning" width="350px" dismissible>{{ warningMsg }}</v-alert>
            <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
            <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
        </v-app>
    </v-app>
</template>

<script>
import axios from "axios"
import { required } from 'vuelidate/lib/validators'
import { API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE , HEADERS } from '../globalConfig/globalConstConfig'
import $ from "jquery"
    export default{
        name:"modifierPays",
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

        methods:{
            // RECUPERER LA LISTE DES PAYS ENREGISTRÉS
            async readAllPaysFromApi(){
                await axios.post(API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE, {} , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                    this.paysList = response.data.items
                    this.paysList.forEach(element => {
                        if (element.designation == this.$route.params.designation) {
                            this.pays = element ; 
                        }
                    });
                }).catch((e) => {
                    this.errorMsg = e ;
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                })
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
        },

        mounted(){
            this.readAllPaysFromApi();
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