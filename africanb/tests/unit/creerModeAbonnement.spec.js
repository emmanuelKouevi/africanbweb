import { createLocalVue , mount } from "@vue/test-utils";
import creerModeAbonnement from '../../src/components/administration_compagnie_transport/CreerModeAbonnement'
import Vue from "vue";
import Vuelidate from "vuelidate";
import Vuetify from "vuetify";

Vue.use(Vuelidate);
Vue.use(Vuetify);

let wrapper;

describe("Tester le composant CreerModePaiement.vue", () => {
    const localVue = createLocalVue();
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify()
        wrapper = mount(creerModeAbonnement,{
            localVue,
            vuetify
        })
        jest.resetModules();
    });  
    
    it('Verifie que nous sommes dans le bon composant' , () => {
        expect(wrapper.text()).toContain("MODE D'ABONNEMENTS")
    })

    it('Test le rendu en fonction du type d\'abonnement choisi' , () => {
        const typeAbonnement = "AbonnementPeriodique";
    })

});