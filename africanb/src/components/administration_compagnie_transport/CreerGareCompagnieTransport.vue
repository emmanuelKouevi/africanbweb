<template>
    <v-app>
        <v-app>
        <v-form @submit.prevent="submitForm">
            <v-container fluid>
                <v-card width="1200" elevation="3">
                    <v-card-title>CREER UNE GARE DE TRANSPORT</v-card-title>
                    <v-card-subtitle>Gérer vos gares pour les demandes de reservations ou autres</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="5">
                                <v-text-field :error-messages="designationBagage" rounded dense outlined label="Réference du sac" v-model.trim="$v.bagageModel.designation.$model"></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-select :error-messages="typeBagageErrors" :items="referenceBagageList" item-text="designation" item-value="designation" rounded dense outlined color="teal" label="sélectionnez un type de bagage" v-model.trim="$v.bagageModel.typeBagageDesignation.$model"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field :error-messages="nombreBagageErrors" rounded dense outlined label="nombre de sac gratuit" v-model.trim="$v.bagageModel.nombreBagageGratuitParTypeBagage.$model"></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field :error-messages="prixBagageErrors" rounded dense outlined color="teal" label="prix par type de sac" suffix="FCFA" v-model.number="$v.bagageModel.coutBagageParTypeBagage.$model"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-card-actions>
                        <v-btn small rounded outlined>REINITIALISER</v-btn>
                        <v-btn small type="submit" rounded outlined color="primary">VALIDER</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-form>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
    </v-app>
    </v-app>
</template>

<script>
import { required , email} from 'vuelidate/lib/validators'

export default {
    name:'CreerGareCompagnieTransport',
    data(){
        return{
            gareTransportToSend:{
                datas:[],
            },

            gareTransportModel:{
                designation : null,
                email:null,
                telephone1:null,
                telephone2:null,
                adresseLocalisation:null,
                compagnieTransportRaisonSocial:null,
            }
        }
    },

    validations:{

        gareTransportModel:{
            
            designation:{
                required
            },

            email:{
                required,
                email
            },

            telephone1:{
                required
            },

            telephone2:{
                required
            },
            
            adresseLocalisation:{
                required
            }

        }

    },
    
    methods:{

        //CREER UNE COMPAGNIE DE TRANSPORT

    },

    computed:{

        // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION DU MODE D'UNE OFFRE

        designationGareErrors(){
           const errors = [];
            if (!this.$v.gareTransportModel.designation.$dirty) return errors
            !this.$v.gareTransportModel.designation.required && errors.push('La désignation est obligatoire.')
            return errors 
        },

        emailGareErrors(){
           const errors = [];
            if (!this.$v.gareTransportModel.email.$dirty) return errors
            !this.$v.gareTransportModel.email.required && errors.push('Le champs E-mail est obligatoire')
            !this.$v.gareTransportModel.email.email && errors.push('Entrer une addresse mail valide.')
            return errors 
        },

        premierTelephoneGareErrors(){
           const errors = [];
            if (!this.$v.gareTransportModel.telephone1.$dirty) return errors
            !this.$v.gareTransportModel.telephone1.required && errors.push('Entrer un numero de téléphone.')
            return errors 
        },

        addresseLocalisationGareError(){
           const errors = [];
            if (!this.$v.gareTransportModel.adresseLocalisation.$dirty) return errors
            !this.$v.gareTransportModel.adresseLocalisation.required && errors.push('Votre addresse est obligatoire.')
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

</style>