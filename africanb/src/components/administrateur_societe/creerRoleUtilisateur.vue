<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card max-width="800px" class="mx-auto">
                    <v-card-title><h4>CREATION DE RÔLE UTILISATEUR</h4>
                        <v-spacer></v-spacer>
                        <v-dialog transition="dialog-top-transition" max-width="700">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="white" rounded small v-bind="attrs" v-on="on">DEFINIR UN RÔLE</v-btn>
                            </template>
                            <template v-slot:default="dialog">
                                <v-card>
                                    <v-toolbar color="white"><span class="font-weight-bold">PARAMETRES DES ROLES</span>
                                        <v-spacer></v-spacer>
                                        <v-dialog v-model="viewingFunctionnalityDialog" max-width="350">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-badge :content="functionnalitiesChoosenList.length" :value="functionnalitiesChoosenList.length" color="primary" overlap>
                                                    <v-btn small text v-bind="attrs" v-on="on">VOIR LES FONCTIONNALITÉS</v-btn>
                                                </v-badge>
                                            </template>
                                            <v-card>
                                                <v-card-text v-if="functionnalitiesChoosenList.length > 0">
                                                    <v-list two-line>
                                                        <v-list-item-group multiple>
                                                            <template >
                                                                <v-list-item v-for="(item, index) in functionnalitiesChoosenList" :key="item.title">
                                                                    <template>
                                                                        <v-list-item-content>                                        
                                                                            <v-list-item-subtitle class="text--primary">
                                                                                {{ item }}
                                                                            </v-list-item-subtitle>
                                                                        </v-list-item-content>
                                                        
                                                                        <v-list-item-action @click="deleteFunctionnalityInList(index)">
                                                                            <v-icon color="red">mdi-close</v-icon>
                                                                        </v-list-item-action>
                                                                    </template>
                                                                    </v-list-item>
                                                                <v-divider v-if="index < functionnalitiesChoosenList.length - 1" :key="index"></v-divider>
                                                            </template>
                                                        </v-list-item-group>
                                                    </v-list>
                                                </v-card-text>
                                                <v-card-text v-else>
                                                    AUCUN CODE DÉFINI
                                                </v-card-text>
                                            </v-card>
                                        </v-dialog>
                                        <v-btn text small color="black" @click="addUserRole(userRoleObject)"><v-icon>mdi-check</v-icon>VALIDER</v-btn>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-container fluid>
                                            <v-subheader><v-icon color="#40407a">mdi-alert-circle</v-icon>&nbsp;&nbsp;
                                                <v-spacer></v-spacer>
                                                <v-dialog v-model="functionalityDialog" max-width="380">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn small outlined v-bind="attrs" v-on="on">Fonctionnalités à rattacher</v-btn>
                                                    </template>
                                                    <v-card>
                                                        <v-card-title class="text font-weight-thin">FONCTIONNALITÉS DISPONIBLES</v-card-title>
                                                        <v-card-text>
                                                            <v-select dense v-model="functionnalitiesChoosenList" :items="getFunctionalitiesList" item-text="code" item-value="code" :menu-props="{ maxHeight: '400' }" label="Vos fonctionnalités"
                                                                multiple hint="Sélectionnez vos fonctionnalités" persistent-hint
                                                            ></v-select>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text @click="functionalityDialog = false">Annuler</v-btn>                                                        
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-subheader>
                                            <v-subheader><br>Veuillez renseigner les champs : &nbsp;&nbsp;&nbsp; 
                                            </v-subheader>
                                            <v-row>
                                                <v-col><v-text-field class="my_input" v-model="userRoleObject.libelle" rounded dense outlined label="Libellé"></v-text-field></v-col>
                                                <v-col><v-text-field class="my_input" :error-messages="codeContrainte" v-model.trim="$v.userRoleObject.code.$model" rounded dense outlined label="Code"></v-text-field></v-col>
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
                    <v-card-subtitle>Définissez vos différents rôles ici</v-card-subtitle>
                    <v-container>
                        <v-divider></v-divider>   
                        <v-divider></v-divider><br>

                        <v-row v-if="userRoleDataToSend.datas.length == 0">
                            <v-col class="text-center">
                                <span class="font-weight-thin">AUCUN RÔLE UTILISATEUR DÉFINI</span>
                            </v-col>
                        </v-row>

                        <v-row v-else>
                            <v-sheet width="750" class="mx-auto">
                                <v-card-title class="title-card"><span><h5>RÔLES UTILISATEURS</h5></span>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
                                 </v-card-title>
                                <v-data-table
                                    :headers="headers"
                                    :items="userRoleDataToSend.datas"
                                    :search="search">

                                    <template v-slot:[`item.actions`]="{ item }">                   
                                        <v-icon title="supprimer" color="red" small class="mr-2" @click="deleteUserRole(item)">mdi-delete</v-icon>
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
import axios from 'axios';
import $ from 'jquery';
import { API_CREATE_USER_ROLE , API_GET_ALL_FUNCTIONNALITIES , HEADERS } from '../globalConfig/globalConstConfig';
import { required } from 'vuelidate/lib/validators'
export default {
    name : "creerRoleUtilsateur",
    data(){
        return{
            errorMsg : null,
            successMsg : null,
            overlay:null,
            functionalityDialog : false,
            viewingFunctionnalityDialog:false,

            headers:[
                {text : 'Libelle' , value : 'libelle'},
                {text : 'Code' , value : 'code'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],
            search:"",
            
            functionnalitiesChoosenList:[],
            getFunctionalitiesList:[],

            userRoleDataToSend:{
                datas:[]
            },

            userRoleObject :{
                code : null, 
                libelle : null,
                datasFunctionalities:[]
            }
        }
    },

    validations:{

        userRoleObject:{
            code:{
                required
            }
        }

    },


    methods:{

        // RECUPERER LA LISTE DES FONCTIONNALITÉS
        async getAllFunctionnalites(){
            await axios.post(API_GET_ALL_FUNCTIONNALITIES, {}, { headers : HEADERS(this.$store.state.userAuthentified.token) } ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.getFunctionalitiesList = response.data.items;
                        console.log(this.getFunctionalitiesList);
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

        //SOUMETTRE LE FORMULAIRE
        submitForm(){
            if (this.userRoleDataToSend.datas.length == 0) {
                this.errorMsg = 'Aucun rôle n\'a été ajouté'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }else{
                this.createUserRole();
            }
        },

        //SUPPRIMER UN ROLE DE LA LISTE A ENVOYER
        deleteUserRole(position){
            this.userRoleDataToSend.datas.splice(position,1)
        },

        //SUPPRIMER UNE FONCTIONNALITÉ
        deleteFunctionnalityInList(position){
            this.functionnalitiesChoosenList.splice(position , 1)
        },

        //AJOUTER UN ROLE UTILISATEUR DANS LA LISTE
        addUserRole(){
            this.$v.$touch();
            if (this.$v.userRoleObject.code.$invalid) {
              this.errorMsg = "Le code est obligatoire !" ;
              $(".alert-error").fadeIn();
              setTimeout(function(){
                $(".alert-error").fadeOut(); 
              }, 2000);
            }else if (this.functionnalitiesChoosenList.length == 0 ) {
                this.errorMsg = "La liste des fonctionnalités est vide!" ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 2000);
            }
            else{
                var userRole = {
                    libelle : null ,
                    code : null ,
                    datasFunctionalities : [] 
                }

                this.functionnalitiesChoosenList.forEach(element => {
                    var codeObject ={
                        code : null ,
                    }
                    codeObject.code = element;
                    userRole.datasFunctionalities.push(codeObject);
                });

                userRole.libelle = this.userRoleObject.libelle
                userRole.code = this.userRoleObject.code
                userRole.datasFunctionalities.forEach(element => {
                    this.userRoleObject.datasFunctionalities.push(element)
                });
                

                this.userRoleDataToSend.datas.push(userRole);
                console.log(this.userRoleDataToSend)

                this.userRoleObject.libelle = null;
                this.userRoleObject.code = null;
                this.functionnalitiesChoosenList = []
            }
        },

        //CREER UN ROLE UTILISATEUR
        async createUserRole(){
            this.overlay = true;
            await axios.post(API_CREATE_USER_ROLE, this.userRoleDataToSend , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.successMsg = response.data.status.message
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                        this.userRoleDataToSend.datas = [];
                    }else{
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                        this.userRoleDataToSend.datas = [];
                    }  
                    
                }else if (response.status == 204) {
                    this.warningMsg = "Erreur , lors de la création";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                    this.userRoleDataToSend.datas = [];
                }else{
                    this.errorMsg = "Erreur , opération de création impossible";
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                    this.userRoleDataToSend.datas = [];
                }
            }).catch((e) => {
                this.errorMsg = e;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
                this.userRoleDataToSend.datas = [];
            }).finally(() => {
                this.overlay = false;
            })
        }

    },

    computed:{

        //GESTION DES CONTRAINTES UTILISATEUR
        codeContrainte(){
            const errors = [];
            if (!this.$v.userRoleObject.code.$dirty) return errors
            !this.$v.userRoleObject.code.required && errors.push('Le code est obligatoire.')
            return errors 
        },
    }, 

    mounted(){
        this.getAllFunctionnalites();
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