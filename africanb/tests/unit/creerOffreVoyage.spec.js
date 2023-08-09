import { mount } from "@vue/test-utils";
import creerOffreVoyage from '../../src/components/administration_compagnie_transport/CreerOffreVoyage'
//import flushPromises from "flush-promises";
import Vue from "vue";
import Vuelidate from "vuelidate";
//import axios from "axios";

Vue.use(Vuelidate);

let wrapper;

describe("Tester le composant CreerOffreVoyage.vue", () => {
    beforeEach(() => {
        wrapper = mount(creerOffreVoyage)
        jest.resetModules();
    });  
    
    it('Verifie que nous sommes dans le bon composant' , () => {
        expect(wrapper.text()).toContain("ESPACE PROMOTEUR")
    })
})
  