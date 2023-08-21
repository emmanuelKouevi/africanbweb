<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card max-width="800px" class="mx-auto">
                    <v-card-title><h4>CREER UNE FONCTIONNALITÉ</h4>
                        <v-spacer></v-spacer>
                        <v-dialog transition="dialog-top-transition" max-width="700">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="white" rounded small v-bind="attrs" v-on="on">NOUVELLE FONCTIONNALITÉ</v-btn>
                            </template>
                            <template v-slot:default="dialog">
                                <v-card>
                                    <v-toolbar color="white"><span class="font-weight-bold">PARAMETRES DES FONCTIONNALITÉS</span>
                                        <v-spacer></v-spacer>
                                        <v-btn text small color="black" @click="addFunctionnality(functionnalityObject)"><v-icon>mdi-check</v-icon>VALIDER</v-btn>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-container fluid>
                                            <v-subheader><v-icon color="#40407a">mdi-alert-circle</v-icon>&nbsp;&nbsp;</v-subheader>
                                            <v-subheader><br>Définissez les infos de vos fonctionnalités : &nbsp;&nbsp;&nbsp; </v-subheader>
                                            <v-row>
                                                <v-col><v-text-field class="my_input" v-model="functionnalityObject.libelle" rounded dense outlined label="Libellé"></v-text-field></v-col>
                                                <v-col><v-text-field class="my_input" :error-messages="codeContrainte" v-model.trim="$v.functionnalityObject.code.$model" rounded dense outlined label="Code"></v-text-field></v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn text @click="dialog.value = false">RETOUR SANS SAUVEGARDER</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-card-title>
                    <v-card-subtitle>Définissez les fonctionnalités pour les différents rôles</v-card-subtitle>
                    <v-container>
                        <v-divider></v-divider>   
                        <v-divider></v-divider><br>

                        <v-row v-if="functionnalityToSend.datas.length == 0">
                            <v-col class="text-center">
                                <span class="font-weight-thin">AUCUNE FONCTIONNALITÉS DÉFINIE</span>
                            </v-col>
                        </v-row>

                        <v-row v-else>
                            <v-sheet width="750" class="mx-auto">
                                <v-card-title class="title-card"><span><h5>VOS FONCTIONNALITÉS</h5></span>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
                                 </v-card-title>
                                <v-data-table
                                    :headers="headers"
                                    :items="functionnalityToSend.datas"
                                    :search="search">

                                    <template v-slot:[`item.actions`]="{ item }">                   
                                        <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerFunctionnality(item)">mdi-delete</v-icon>
                                    </template>

                                </v-data-table>
                            </v-sheet>
                        </v-row>
                        
                    </v-container>
                    <v-card-actions>
                        <v-btn small shaped rounded outlined>REINITIALISER</v-btn>
                        <v-btn type="submit" small shaped rounded outlined color="primary">SAUVEGARDER</v-btn>
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
import { API_CREER_FUNCTIONNALITY, HEADERS } from '../globalConfig/globalConstConfig'
import { required } from 'vuelidate/lib/validators'
export default {
    name:"creerFonctionnalite",
    data(){
        return{
            errorMsg : null,
            successMsg : null,
            overlay : false ,

            headers:[
                {text : 'Libelle' , value : 'libelle'},
                {text : 'Code' , value : 'code'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],
            search:"",

            functionnalityObject:{
                libelle : null ,
                code : null ,
            },

            functionnalityToSend:{
                datas: []
            }
        }
    },

    validations :{

        functionnalityObject:{
            code:{
                required
            }
        }

    },
    
    methods:{

        // SOUMETTRE LE FORMULAIRE
        submitForm(){
            if (this.functionnalityToSend.datas.length == 0) {
                this.errorMsg = 'Aucune functionnalitée  n\'a été ajouté'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }else{
                this.enregistrerFunctionnality();
            }
        },


        //SUPPRIMER UNE FONCTIONNALITÉ
        supprimerFunctionnality(position){
            this.functionnalityToSend.datas.splice(position,1)
        },


        //AJOUTER UNE FONCTIONNALITÉ DANS LA LISTE
        addFunctionnality(){
            this.$v.$touch();
            if (this.$v.functionnalityObject.code.$invalid) {
              this.errorMsg = "Le code est obligatoire !" ;
              $(".alert-error").fadeIn();
              setTimeout(function(){
                $(".alert-error").fadeOut(); 
              }, 2000);
            }
            else{
                var functionnality = {
                    libelle : null ,
                    code : null , 
                }
                functionnality.libelle = this.functionnalityObject.libelle
                functionnality.code = this.functionnalityObject.code

                this.functionnalityToSend.datas.push(functionnality);

                this.functionnalityObject.libelle = null;
                this.functionnalityObject.code = null;
            }
        },

        // CREER UNE FONCTIONNALITÉ
        async enregistrerFunctionnality(){
            this.overlay = true ;
            await axios.post(API_CREER_FUNCTIONNALITY, this.functionnalityToSend, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.functionnalityToSend.datas = [];
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.functionnalityToSend.datas = [];
                    }  
                    
                }
                else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.functionnalityToSend.datas = [];
                }
                else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.functionnalityToSend.datas = [];
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
                this.functionnalityToSend.datas = [];
            }).finally(() => {
                this.overlay = false;
            })
        },

    },

    computed:{

        codeContrainte(){
            const errors = [];
            if (!this.$v.functionnalityObject.code.$dirty) return errors
            !this.$v.functionnalityObject.code.required && errors.push('Le code est obligatoire.')
            return errors 
        },
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

    h4{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    h5{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 13px;
    }

    .my_input{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: bolder;
        color: #596275;
    }
</style>