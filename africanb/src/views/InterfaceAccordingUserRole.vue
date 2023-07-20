<template>
    <v-app>
        <div v-if="$store.state.userAuthentified.roleCode == roleCodeAdminTransport">
            <EspaceCompagnieTransportVue></EspaceCompagnieTransportVue>
        </div>

        <div v-else>
            <EspaceAdminSocieteVue></EspaceAdminSocieteVue>
        </div>
    </v-app>
</template>

<script>
import EspaceAdminSocieteVue from './EspaceAdminSociete.vue'
import EspaceCompagnieTransportVue from './EspaceCompagnieTransport.vue'
import { ROLE_ADMIN_COMPAGNIE_TRANSPORT , ROLE_ADMIN_SOCIETE_MERE } from '../components/globalConfig/constUsersRoles'
export default {
    name:'InterfaceAccordingUserRole',
    components : {
        EspaceAdminSocieteVue,
        EspaceCompagnieTransportVue
    },
    data() {
        return{
            roleCodeAdminTransport : ROLE_ADMIN_COMPAGNIE_TRANSPORT , 
            roleCodeSocieteMere : ROLE_ADMIN_SOCIETE_MERE
        }
    }
}
</script>