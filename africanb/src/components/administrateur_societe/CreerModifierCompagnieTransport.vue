<template>
    <v-app>
        <v-form>
            <v-card>
                <v-card-title class="title">CREER UNE COMPAGNIE</v-card-title>
                
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field color="teal" label="Nom de la compagnie" append-icon="mdi-domain"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field color="teal" label="Raison Sociale"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea color="teal" label="Description"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field color="teal" label="Email" append-icon="mdi-email"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select color="teal" label="Ville"></v-select>
                        </v-col>
                        <v-col>
                            <v-select color="teal" label="Status Actuel" append-icon="mdi-account-cog"></v-select>
                        </v-col>
                        <v-col>
                            <v-text-field color="teal" prefix="+225" label="N° Télephone" append-icon="mdi-phone"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>   
            
            <v-row class="mt-5" justify-lg="space-between">
                <v-col cols="5"><v-btn color="secondary"><v-icon>mdi-sync</v-icon> REINITIALISER</v-btn></v-col>
                <v-col cols="5"><v-btn color="primary"><v-icon>mdi-check</v-icon> CREER</v-btn></v-col>
            </v-row>
        
        </v-form>
    </v-app>
</template>

<script>
export default {
    name:"CreerModifierCompagnieTransport",
    data(){
        return{}
    },
}
</script>

<style scoped>
    .title{
        color: teal;
        font-weight: bold;
    }
</style>