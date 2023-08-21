import { createLocalVue , mount } from "@vue/test-utils";
import creerOffreVoyage from '../../src/components/administration_compagnie_transport/CreerOffreVoyage'
import Vue from "vue";
import Vuelidate from "vuelidate";
import Vuetify from "vuetify";

Vue.use(Vuelidate);
Vue.use(Vuetify);

let wrapper;

describe("Tester le composant CreerOffreVoyage.vue", () => {
    const localVue = createLocalVue();
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify()
        wrapper = mount(creerOffreVoyage,{
            localVue,
            vuetify
        })
        jest.resetModules();
    });  
    
    it('Verifie que nous sommes dans le bon composant' , () => {
        expect(wrapper.text()).toContain("CREER UNE OFFRE DE VOYAGE")
    })

    it("Test du formulaire permettant la création d'une offre de voyage pour les saisies simples" ,async () => {
        const designation = "Paris-Londres";
        const description = "Offre de voyage pour le trajet Paris-Londres";
        await wrapper.find('#designationOffre').setValue(designation);
        await wrapper.find('#descriptionOffre').setValue(description);
        expect(wrapper.vm.offreVoyage.designation).toBe(designation);
        expect(wrapper.vm.offreVoyage.description).toBe(description);
    })

    it("Test du formulaire permettant la création d'une offre de voyage pour les selections" ,async () => {
        const gareDepart = "Abidjan";
        const gareArrivee = "Yamoussokro";
        await wrapper.find("#gareDepart").setValue(gareDepart)
        await wrapper.find("#gareArrivee").setValue(gareArrivee)
        expect(wrapper.vm.offreVoyage.villeDepartDesignation).toBe(gareDepart);
        expect(wrapper.vm.offreVoyage.villeDestinationDesignation).toBe(gareArrivee);
    })
});
  