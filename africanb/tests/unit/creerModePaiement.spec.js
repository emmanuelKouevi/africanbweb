import { createLocalVue , mount } from "@vue/test-utils";
import creerModePaiement from '../../src/components/administration_compagnie_transport/CreerModePaiement'
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
        wrapper = mount(creerModePaiement,{
            localVue,
            vuetify
        })
        jest.resetModules();
    });  
    
    it('Verifie que nous sommes dans le bon composant' , () => {
        expect(wrapper.text()).toContain("MODE DE PAIEMENTS")
    })

    it("Test du formulaire permettant la création d'un mode de paiement" ,async () => {
        const designation = "Paiement 1";
        const phoneNumber = "07 89 72 85 01";
        const typePaiement = "paiementOrangeMoney"
        await wrapper.find('#referencePaiement').setValue(designation);
        await wrapper.find('#phoneNumber').setValue(phoneNumber);
        await wrapper.find('#typePaiement').setValue(typePaiement);
        expect(wrapper.vm.modePaiementModel.designation).toBe(designation);
        expect(wrapper.vm.modePaiementModel.telephoneGenerique).toBe(phoneNumber);
        expect(wrapper.vm.modePaiementModel.typeModePaiementDesignation).toBe(typePaiement);
    })
});