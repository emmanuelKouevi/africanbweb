<template>
    <v-app>
        <v-container fluid>
            <v-card class="mx-auto" width="1800">
                <v-card-title class="title-card">LISTE DES UTILISATEURS
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
                </v-card-title>

                <v-data-table :headers="headers" :items="usersList" :loading="loading" :search="search">

                    <!--<template v-slot:[`item.isActif`]="{ item }">
                        <v-chip x-small v-if="item.isActived == true" color="success" text-color="white" class="mr-2"><span class="etat font-weight-bold">active</span></v-chip>
                        <v-chip x-small v-else color="red" text-color="white" class="mr-2"><span class="etat">non-active</span></v-chip>
                    </template>-->

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn text x-small color="primary" @click="navigateToUserInfo(item)">Voir détail</v-btn>
                    </template>

                </v-data-table>
                <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
import $ from 'jquery'
import axios from 'axios';
import { API_GET_ALL_USERS_CREATED , API_ACTIVATE_USER, HEADERS } from '../globalConfig/globalConstConfig';
export default {
    name:'selectionnerUtilisateur',
    data(){
        return{
            errorMsg : null,

            search : '',
            headers:[
                {text : 'Nom' , value : 'nom'},
                {text : 'Prenoms' , value : 'prenoms'},
                {text : 'E-mail' , value : 'email'},
                {text : 'Login' , value : 'login'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ],
            
            loading: false,

            simpleObjectToSend:{
                data:{}
            },
            
            toActive:{
                data:{
                    login : null,
                }
            },

            usersList: [],

        }
    },

    methods:{

        navigateToUserInfo(user){
            this.$router.push({name:"userInfo" , params:{nom:user.nom} })
        },

        // ACTIVER UN UTILISATEUR
        async toActivedUser(userItem){
            this.toActive.data.login = userItem.login
            await axios.post(API_ACTIVATE_USER, this.toActive , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.$swal.fire('Activation',response.data.status.message,'error')
                        this.toActive.data.login = null;
                    }
                    else{
                        this.$swal.fire('Activation',response.data.status.message,'success')
                        this.toActive.data.login = null;
                    }
                }
                else{
                    this.$swal.fire('Activation','Error lors de la validation','error')
                    this.toActive.data.login = null;
                }
            }).catch((e) => {
                this.$swal.fire('Activation refusée' , e , 'error')
                this.toActive.data.login = null;
            })
        },

        // RECUPERER LA LISTE DES UTILISATEURS CREES SUR LA PLATEFORME
        async toGetAllUsersCreated(){
            this.loading = true;
            await axios.post(API_GET_ALL_USERS_CREATED, this.simpleObjectToSend, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.usersList = response.data.items;
                        console.log(this.usersList);
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
            }).finally(() => {
                this.loading = false;   
            })
        }

    },

    mounted(){
        this.toGetAllUsersCreated();
    }
}
</script>

<style scoped>
    .title-card{
        font-weight: bold;
        color: black;
        font-size: 17px;
    }

    .myalert{
        display: none;
        z-index: 1900;
    }

    .alert-error{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }
</style>