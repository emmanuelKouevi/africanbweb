<template>
    <v-app>
        <v-container fluid class="mt-6">
            <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="black"></v-tabs-slider>
                <v-tab> Vue d'ensemble </v-tab>
                <v-tab> Opérations </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item key="Vue d'ensemble" class="mt-6">
                    <v-card elevation="">
                        <v-card-text>
                            <div class="row">
                                <div class="col-lg-6"><span class="font-weight-bold">Activités</span></div>    
                                <div class="row">
                                    <div class="col-lg-12">Compte crée le : {{ demandeAdhesion.createdAt }}</div>
                                </div>
                            </div><br>
                        </v-card-text>
                            
                    </v-card><br><br>

                    <v-card elevation="">
                        <v-card-text>
                            <div class="row">
                                <div class="col-lg-6"><span class="font-weight-bold">Informations Générales</span></div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6"><span>Raison Sociale : {{ demandeAdhesion.raisonSociale }}</span></div>
                                <div class="col-lg-6"><span>Description: {{ demandeAdhesion.description }}</span></div>      
                            </div>
                            <div class="row">
                                <div class="col-lg-6"><span>E-mail: {{ demandeAdhesion.email}}</span></div>
                                <div class="col-lg-6"><span>Téléphone: {{ demandeAdhesion.telephone }}</span></div>      
                            </div>
                            <div class="row">
                                <div class="col-lg-6"><span>Ville: {{ demandeAdhesion.villeDesignation }}</span></div>
                                <div class="col-lg-6"><span>Sigle: {{ demandeAdhesion.sigle }}</span></div>      
                            </div>
                        </v-card-text>
                            
                    </v-card><br><br>

                </v-tab-item>
                <v-tab-item key="Opérations">
                    <v-card elevation="">
                        <v-card-text>
                            <div class="row">
                                <div class="col-lg-6"><span class="font-weight-bold">Statut d'activation</span></div>
                                <div class="col-lg-6">
                                    <v-chip v-if="demandeAdhesion.isActif === false" x-small color="red"><span class="font-weight-bold status">Inactive</span></v-chip>
                                    <v-chip v-else-if="demandeAdhesion.isActif === null" x-small color="success"><span class="font-weight-bold status">Inactive</span></v-chip>
                                    <v-chip v-else x-small color="success"><span class="font-weight-bold status">Active</span></v-chip>
                                </div>      
                            </div>
                            <div class="row">
                                <div class="col-lg-6"><span class="font-weight-bold">Statut de validation :</span></div>
                                <div class="col-lg-6">
                                    <v-chip v-if="demandeAdhesion.isValided === false" x-small color="red"><span class="font-weight-bold status">Non Valide</span></v-chip>
                                    <v-chip v-else-if="demandeAdhesion.isValided === null" x-small color="success"><span class="font-weight-bold status">Npn valide</span></v-chip>
                                    <v-chip v-else x-small color="success"><span class="font-weight-bold status">Validé</span></v-chip>
                                </div>      
                            </div>
                        </v-card-text>
                    </v-card><br>

                    <v-card elevation="">
                        <v-card-text>
                            <div class="row">
                                <div class="col-lg-6">
                                    <span v-if="demandeAdhesion.isActif == true" class="font-weight-bold">Activé</span>
                                    <span v-if="demandeAdhesion.isActif == false" class="font-weight-bold">Désactivé</span>
                                </div>
                                <div class="col-lg-6">
                                    <span v-if="demandeAdhesion.isActif == false"><v-switch @click="toActivedUser" v-model="switch1" inset color="success"></v-switch></span>
                                    <span v-else-if="demandeAdhesion.isActif == null"><v-switch disabled v-model="switch1" inset color="success"></v-switch></span>
                                    <span v-else><v-switch disabled v-model="switch1" inset color="success"></v-switch></span>
                                </div>      
                            </div>
                        </v-card-text>
                    </v-card><br>

                    <v-card elevation="">
                        <v-card-text>
                            <div class="row">
                                <div class="col-lg-6">
                                    <span v-if="demandeAdhesion.isActif == true" class="font-weight-bold">Validé</span>
                                    <span v-if="demandeAdhesion.isActif == false" class="font-weight-bold">Invalidé</span>
                                </div>
                                <div class="col-lg-6">
                                    <span v-if="demandeAdhesion.isValided == false"><v-switch @click="validerDemandeAdhesion" v-model="switch2" inset color="success"></v-switch></span>
                                    <span v-else-if="demandeAdhesion.isValided == null"><v-switch disabled v-model="switch2" inset color="success"></v-switch></span>
                                    <span v-else><v-switch disabled v-model="switch2" inset color="success"></v-switch></span>
                                </div>      
                            </div>
                        </v-card-text>
                    </v-card><br>
                    
                </v-tab-item>

            </v-tabs-items>
        </v-container>
    </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery"
import { API_OBTENIR_LISTE_DE_TOUTES_LES_DEMANDES_ADHESIONS, API_VALIDER_DEMANDE_ADHESION_COMPAGNIE ,  HEADERS  } from "@/components/globalConfig/globalConstConfig"
export default {
    name:"InfosAdhesion",
    data(){
        return{

            demandeAdhesion: {},
            simpleObjectToSend:{
                data:{}
            },

            toValid:{
                data:{
                    id : null,
                }
            },

            demandeAdhesionList:[],

            options:{
                index:0,
                size:8
            },

            totalPermission : 0,

            switch1: false,
            switch2: false,

            tab: null,
            items: ["Vue d'ensemble" , "Opérations"],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },

    methods:{

        async validerDemandeAdhesion(){
            this.toValid.data.id = this.demandeAdhesion.login
            await axios.post(API_VALIDER_DEMANDE_ADHESION_COMPAGNIE, this.toValid , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.$swal.fire('Validation',response.data.status.message,'error')
                        this.toActive.data.login = null;
                    }
                    else{
                        this.$swal.fire('Validation',response.data.status.message,'success')
                        this.toActive.data.login = null;
                    }
                }
                else{
                    this.$swal.fire('Validation','Error lors de la validation','error')
                    this.toActive.data.login = null;
                }
            }).catch((e) => {
                this.$swal.fire('Validation refusée' , e , 'error')
                this.toActive.data.login = null;
            })
        },


        //OBTENIR LA LISTE DE TOUTES LES DEMANDE D'ADHESIONS EFFECTUÉS
        async obtenirToutesLesDemandesAdhesion(){
            this.loading = false;
            axios.post(API_OBTENIR_LISTE_DE_TOUTES_LES_DEMANDES_ADHESIONS , this.options, { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code != 800) {
                        this.errorMsg = response.data.status.message
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.demandeAdhesionList = response.data.items;
                        this.demandeAdhesionList.forEach(element => {
                            if (element.raisonSociale == this.$route.params.raisonSociale) {
                                this.demandeAdhesion = element ;
                            }
                        });
                    }
                }else{
                    this.errorMsg = "Erreur";
                }
            }).catch((e) => {
                this.errorMsg = e
            })
        },


    },

    mounted(){
        this.obtenirToutesLesDemandesAdhesion();
    }
}
</script>