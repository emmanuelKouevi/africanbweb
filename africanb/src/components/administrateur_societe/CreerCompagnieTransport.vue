<template>
    <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card max-width="1200px" class="mx-auto">
                <v-card-title class="title"><v-icon color="teal">mdi-domain</v-icon> CREER UNE COMPAGNIE</v-card-title>

                <v-divider></v-divider>
                
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <v-label>Designation:</v-label>
                        </v-col>
                        <v-col>
                            <v-text-field dense outlined color="teal" placeholder="Entrer une designation"
                                :error-messages="designationCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.designation.$model"
                                @input="$v.compagnieTransport.designation.$touch()"
                                @blur="$v.compagnieTransport.designation.$touch()">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="2">
                            <v-label>Description:</v-label>
                        </v-col>
                        <v-col>
                            <v-textarea dense outlined color="teal" aria-placeholder="entrer une description"
                                :error-messages="descriptionCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.description.$model"
                                @input="$v.compagnieTransport.description.$touch()"
                                @blur="$v.compagnieTransport.description.$touch()"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <v-label>E-mail:</v-label>
                        </v-col>
                        <v-col>
                            <v-text-field dense outlined color="teal" append-icon="mdi-email"
                                placeholder="Adresse ??lectronique de la compagnie"
                                :error-messages="emailCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.email.$model"
                                @input="$v.compagnieTransport.email.$touch()"
                                @blur="$v.compagnieTransport.email.$touch()">

                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="2">
                            <v-label>ville :</v-label>
                        </v-col>
                        <v-col cols="3">
                            <v-select dense outlined :items="villesList" color="teal"
                                item-text="designation"
                                item-value="designation"
                                :error-messages="villeCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.villeDesignation.$model"
                                @input="$v.compagnieTransport.villeDesignation.$touch()"
                                @blur="$v.compagnieTransport.villeDesignation.$touch()">

                            </v-select>
                        </v-col>

                        <v-col cols="2">
                            <v-label>N?? T??lephone :</v-label>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field dense outlined color="teal" prefix="+225" append-icon="mdi-phone"
                                placeholder="N?? de T??l??phone"
                                :error-messages="telephoneCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.telephone.$model"
                                @input="$v.compagnieTransport.telephone.$touch()"
                                @blur="$v.compagnieTransport.telephone.$touch()">

                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="2">
                            <v-label>Sigle:</v-label>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field dense outlined color="teal"
                                placeholder="le sigle de la compagnie"
                                :error-messages="sigleCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.sigle.$model"
                                @input="$v.compagnieTransport.sigle.$touch()"
                                @blur="$v.compagnieTransport.sigle.$touch()">

                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="2">
                            <v-label>Raison sociale:</v-label>
                        </v-col>
                        <v-col>
                            <v-text-field dense outlined color="teal"
                                placeholder="La raison sociale de la compagnie"
                                :error-messages="raisonSocialeCompagnieErrors"
                                v-model.trim="$v.compagnieTransport.raisonSociale.$model"
                                @input="$v.compagnieTransport.raisonSociale.$touch()"
                                @blur="$v.compagnieTransport.raisonSociale.$touch()">

                            </v-text-field>
                        </v-col>
                    </v-row>

                </v-container>

                <v-container>
                    <v-row class="mt-5" justify-lg="space-around">
                        <v-col cols="5"><v-btn rounded color="secondary"><v-icon>mdi-sync</v-icon> REINITIALISER</v-btn></v-col>
                        <v-col cols="5"><v-btn rounded type="submit" color="primary"><v-icon>mdi-check</v-icon> CREER</v-btn></v-col>
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
import { required , minLength , maxLength , email } from 'vuelidate/lib/validators' 
import { API_CREER_COMPAGNIE_TRANSPORT , API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE} from '../globalConfig/globalConstConfig'
import $ from 'jquery'
import axios from 'axios'
export default {
    name:"CreerCompagnieTransport",
    data(){
        return{
            successMsg : null, 
            errorMsg:null,
            warningMsg: null,
            overlay : false,
            

            defaultObject:{},
            villesList:[],

            objectContainList :{
                datas : []
            },

            compagnieTransport:{
                designation: null,
                description: null,
                raisonSociale:null,
                email:null,
                sigle:null,
                telephone:null,
                villeDesignation:null,
            }
        }
    },

    validations:{
        compagnieTransport:{

            designation :{
                required,
                minLength : minLength(4),
                maxLength : maxLength(150),
            },

            description :{
                required,
                minLength : minLength(4),
                maxLength : maxLength(150),
            },

            email:{
                required,
                email
            },

            raisonSociale:{
                required
            },

            sigle:{
                required
            },

            villeDesignation:{
                required,
            },

            telephone :{
                required,
            },

        }
    },

    methods:{

        // OBTENIR LA LISTE DES VILLES DISPONIBLES
        async obtenirListeVillesDispo(){
            await axios.post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.defaultObject).then((response) => {
                this.villesList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },

        // CREATION D'UNE COMPAGNIE DE TRANSPORT
        async creerCompagnieTransport(){
            this.objectContainList.datas.push(this.compagnieTransport)
            this.overlay = true ;
            await axios.post(API_CREER_COMPAGNIE_TRANSPORT, this.objectContainList).then((response) => {
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
                    this.warningMsg = "Erreur , lors de la cr??ation";
                    $(".alert-warning").fadeIn();
                    setTimeout(function(){
                        $(".alert-warning").fadeOut(); 
                    }, 3000)
                }
                else{
                    this.errorMsg = "Erreur , op??ration de cr??ation impossible";
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


        // SOUMETTRE LE FORMULAIRE VERS LE MIDDLEWARE

        submitForm(){
            this.$v.$touch();
            if (this.$v.compagnieTransport.$invalid) {
                this.errorMsg = 'Des informations sont manquantes'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }
            else{
                this.creerCompagnieTransport()
            }
        },
    },

    computed:{

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UNE COMPAGNIE DE TRANSPORT

        designationCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.designation.$dirty) return errors
            !this.$v.compagnieTransport.designation.maxLength && errors.push('La designation ne doit pas d??passer 600 caract??res')
            !this.$v.compagnieTransport.designation.required && errors.push('La d??signation est obligatoire.')
            !this.$v.compagnieTransport.designation.required && errors.push('La d??signation doit avoir au minimum 8 caract??res.')
            return errors
        },

        descriptionCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.description.$dirty) return errors
            !this.$v.compagnieTransport.description.maxLength && errors.push('La description ne doit pas d??passer 600 caract??res')
            !this.$v.compagnieTransport.description.required && errors.push('La d??scription est obligatoire.')
            !this.$v.compagnieTransport.description.required && errors.push('La d??scription doit avoir au minimum 8 caract??res.')
            return errors
        },

        raisonSocialeCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.raisonSociale.$dirty) return errors
            !this.$v.compagnieTransport.raisonSociale.required && errors.push('La raison sociale est obligatoire est obligatoire.')
            return errors
        },

        sigleCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.sigle.$dirty) return errors
            !this.$v.compagnieTransport.sigle.required && errors.push('Le sigle est obligatoire est obligatoire.')
            return errors
        },

        villeCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.villeDesignation.$dirty) return errors
            !this.$v.compagnieTransport.villeDesignation.required && errors.push('La ville est obligatoire est obligatoire.')
            return errors
        },

        telephoneCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.telephone.$dirty) return errors
            !this.$v.compagnieTransport.telephone.required && errors.push('Le num??ro de t??l??phone est obligatoire.')
            return errors
        },
        emailCompagnieErrors(){
            const errors = [];
            if (!this.$v.compagnieTransport.email.$dirty) return errors
            !this.$v.compagnieTransport.email.required && errors.push('Le champ email est obligatoire')
            !this.$v.compagnieTransport.email.email && errors.push('exemple@xyz.com')
            return errors
        },
    },

    mounted(){
        this.obtenirListeVillesDispo();
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