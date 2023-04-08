<template>
   <v-app>
        <v-form @submit.prevent="submitForm">
            <v-card>
                <v-card-title>ATTESTION DE TRANSPORT</v-card-title>
                <v-card-subtitle>Rattachez votre document de transport</v-card-subtitle>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-file-input v-model="selectedFile" dense rounded accept=".pdf" color="deep-purple accent-4" counter
                                placeholder="Choisissez votre document" prepend-icon="mdi-paperclip" outlined :show-size="1000"
                                @change="previewFile">
                            </v-file-input>
                        </v-col>

                        <v-col>
                            <div v-if="filePreview">
                                <h4>{{ selectedFile.name }}</h4>
                                <img :src="filePreview" v-if="isImage" />
                                <iframe width="100%" height="100%" :src="filePreview" v-else></iframe>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
                
                <v-card-actions>
                    <v-btn small rounded  color="secondary">REINITIALISER</v-btn>
                    <v-btn type="submit" rounded color="primary" small>ENREGISTRER LE DOCUMENT</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
   </v-app> 
</template>

<script>
import axios from "axios";
import $ from 'jquery';
import { API_CREER_DOCUMENT_TRANSPORT } from '../globalConfig/globalConstConfig'

export default {
    name:"DocumentAttestionTransport",
    data() {
        return {
            successMsg: null,
            errorMsg : null,
            overlay : false,

            selectedFile: null,
            filePreview: null,
            isImage: false,

            compagnieTransportRaisonSociale : 'COMPAGNIE KOUEVI CT'
        };
    },

    methods:{

        submitForm(){
            if (this.selectedFile == null) {
                this.errorMsg = "Vous devez sélectionner un document !!!" ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 2000);
            }
            else{
                this.saveDocumentTransport();
            }
            
        },
        
        // PREVISUALISATION DU DOCUMENT
        previewFile(){
            if (!this.selectedFile) return;
            const reader = new FileReader();
            reader.onload = () => {
                this.filePreview = reader.result;
                this.isImage = this.selectedFile.type.startsWith("image/");
            };
            reader.readAsDataURL(this.selectedFile);
        },

        // ENREGISTRER LE DOCUMENT
        async saveDocumentTransport(){
            const formData = new FormData();
            formData.append('file', this.selectedFile); 
            formData.append('raisonSociale', this.compagnieTransportRaisonSociale);

            await axios.post(API_CREER_DOCUMENT_TRANSPORT , formData , {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
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
                    this.warningMsg = "Erreur , lors de la création de l'offre de voyage";
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
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            }).finally(() => {
                this.overlay = false;
            })
        }
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