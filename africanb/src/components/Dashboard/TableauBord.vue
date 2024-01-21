<template>
    <v-container v-if="$store.state.userAuthentified.roleCode == 'vendeurGare'">
        <DashboardSeller/>
    </v-container>
    <v-container v-else-if="$store.state.userAuthentified.roleCode == 'RoleAdminCompagnieTransport'">
        <DashboardTransportAdmin/>
    </v-container>
    <v-container v-else>
        <DashboardMainAdmin/>
    </v-container>
</template>

<script>
import DashboardSeller from '../vendeur/Dashboard.vue'
import DashboardTransportAdmin from '@/components/administration_compagnie_transport/Dashboard.vue'
import DashboardMainAdmin from '@/components/administrateur_societe/Dashboard.vue'
export default {
    name:'TableauBord',
    components:{
        DashboardSeller,
        DashboardTransportAdmin,
        DashboardMainAdmin
    },
    data(){
        return{

        }
    },

    methods:{

    },

    mounted(){
        console.log(this.$store.state.userAuthentified)
    }
}
</script>

<style scoped>
    .card-icon{
        margin-top: -20px;
        margin-left: 15px;
    }

    .offreVoyages_wrap{
        height: 10px;
        background: linear-gradient(to left top, teal, blue);
    }

    .gareTransport_wrap{
        height: 10px;
        background: linear-gradient(to left top, red, grey);
    }

    .bagage_wrap{
        height: 10px;
        background: linear-gradient(to left top, #3ae374, #c56cf0);
    }

    .reservation_wrap{
        height: 10px;
        background: linear-gradient(to left top, #e74c3c, #16a085);
    }

    .users_wrap{
        height: 10px;
        background: linear-gradient(to left top, #2c2c54, #34ace0);
    }

    .property_wrap{
        height: 10px;
        background: linear-gradient(to left top, #fff200, #ffb8b8);
    }

    .data{
        text-align: center;
        font-family: 'Times New Roman', Times, serif;
        font-weight: bold;
    }

    .data_number{
        color: #4b4b4b;
        font-size: 60px;
        text-align: center;
        font-family: 'Times New Roman', Times, serif;
    }
</style>