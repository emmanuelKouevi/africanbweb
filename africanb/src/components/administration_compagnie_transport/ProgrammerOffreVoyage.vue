<template>
    <v-app>
        <v-form>
            <v-container fluid>
                <v-card>
                    <v-card-title>PROGRAMMER UNE OFFRE DE VOYAGE
                        <v-spacer></v-spacer>
                        <v-dialog transition="dialog-top-transition" max-width="700">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="secondary" rounded small v-bind="attrs" v-on="on">Programmer l'offre &nbsp;<v-icon>mdi-plus-circle</v-icon></v-btn>
                            </template>
                            <template v-slot:default="dialog">
                                <v-card>
                                    <v-toolbar color="black" dark><span class="font-weight-bold">PROGRAMMATION DE L'OFFRE</span></v-toolbar>
                                    <v-card-text>
                                        <v-container fluid>
                                            <v-subheader>Définissez l'ordre et vos villes pour les escales
                                                <v-spacer></v-spacer>
                                                <v-btn small rounded icon title="Ajouter une ville" @click="ajouterNouvelleVilleEscale()"><v-icon color="black" size="20">mdi-plus</v-icon></v-btn>
                                            </v-subheader>
                                            <v-row justify="space-between" v-for="ville , index in villesEscalesList" :key="index">
                                                <v-col cols="3"><v-text-field color="black" :error-messages="positionRequired" v-model.trim="$v.villeEscaleData.position.$model" dense outlined rounded type="number" min="0" label="N° Ordre"></v-text-field></v-col>
                                                <v-col cols="6"><v-select :items="villesList" :error-messages="villeDesignation" v-model.trim="$v.villeEscaleData.villeDesignation.$model" item-text="designation" item-value="designation" dense outlined rounded label="Sélectionnez la ville"></v-select></v-col>
                                                <v-col><v-btn icon dense @click="saveVilleEscale()"><v-icon color="primary">mdi-content-save-edit</v-icon></v-btn></v-col>
                                                <v-col><v-btn icon dense @click="supprimerVilleEscale(index)"><v-icon color="red">mdi-delete</v-icon></v-btn></v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn text @click="dialog.value = false">Effectuer</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-card-title>
                    <v-card-subtitle>Programmez les trajets , les jours de votre offre</v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-select :error-messages="offreVoyageDesignation" v-model.trim="$v.villeEscaleData.offreVoyageDesignation.$model" dense outlined color="teal" label="sélectionnez une offre"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-container>
        </v-form>
    </v-app>
</template>

<script>
export default {
    name:"ProgrammerOffreVoyage",
    data(){
        return{

        }
    },

    methods:{

    },
}
</script>

<style scoped>

</style>