<template>
    <v-app>
        <div v-if="$store.state.userAuthentified.roleCode == roleCodeAdminTransport">
            <espace-compagnie-transport-vue></espace-compagnie-transport-vue>
        </div>

        <div v-if="$store.state.userAuthentified.roleCode == roleCodeSocieteMere">
            <espace-admin-societe-vue></espace-admin-societe-vue>
        </div>

        <div v-if="$store.state.userAuthentified.roleCode == undefined || $store.state.userAuthentified.roleCode == null">
            <unauthorized-page-vue></unauthorized-page-vue>
        </div>
    </v-app>
</template>

<script>
import EspaceAdminSocieteVue from './EspaceAdminSociete.vue'
import EspaceCompagnieTransportVue from './EspaceCompagnieTransport.vue'
import UnauthorizedPageVue from './UnauthorizedPage.vue'
import { ROLE_ADMIN_COMPAGNIE_TRANSPORT , ROLE_ADMIN_SOCIETE_MERE } from '../components/globalConfig/constUsersRoles'
export default {
    name:'InterfaceAccordingUserRole',
    components : {
        EspaceAdminSocieteVue,
        EspaceCompagnieTransportVue,
        UnauthorizedPageVue
    },
    data() {
        return{
            roleCodeAdminTransport : ROLE_ADMIN_COMPAGNIE_TRANSPORT , 
            roleCodeSocieteMere : ROLE_ADMIN_SOCIETE_MERE
        }
    },

    mounted(){
        console.log(this.$store.state.userAuthentified.roleCode)
    }
}
</script>