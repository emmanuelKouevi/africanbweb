<template>
  <v-card>
    <v-card-title
      ><span class="title_card">Étiquetage des bagages</span>
      <v-spacer></v-spacer>
      <v-btn btn x-small color="secondary" @click="dialog = true"
        >AJOUTER UN SAC</v-btn
      >
    </v-card-title>
    <v-card-text>
      <div class="row justify-space-around">
        <div class="col-lg-6">
          <label for="designation" class="form-label">Désignation *</label>
          <div>
            <input
              type="text"
              class="form-control"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <label for="exampleInputPassword1" class="form-label"
            >Poids total *</label
          >
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control"
              aria-describedby="basic-addon1"
            />
            <span class="input-group-text" id="basic-addon1">KG</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <label for="designation" class="form-label">Déscription *</label>
          <div>
            <textarea class="form-control" name="" id=""></textarea>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn btn color="secondary">REINITIALISER</v-btn>&nbsp;&nbsp;&nbsp;
      <v-btn btn color="success" @click="submitBag">ENREGISTRER</v-btn>
    </v-card-actions>
    <v-dialog max-width="500px" persistent v-model="dialog">
      <v-card>
        <v-card-title>AJOUTER UN SAC</v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col-lg-6">
              <label for="exampleInputEmail1" class="form-label"
                >Sélectionner un type de bagage</label
              >
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="typeBagageDesignation"
              >
                <option v-for="(bag, b) in referenceBagageList" :key="b">
                  {{ bag.designation }}
                </option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8">
              <label for="designation" class="form-label">Type*</label>
              <div>
                <input
                  type="text"
                  disabled
                  :value="typeBagageDesignation"
                  class="form-control"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn btn small @click="dialog = false" color="secondary"
            >FERMER</v-btn
          >
          <v-btn btn small color="success" @click="addNewBag">AJOUTER</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import {
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";

export default {
  name: "BagageInfo",
  /*props: {
    designation: String,
    totalPoids: Number,
    description: String,
  },*/
  data() {
    return {
      dialog: false,

      referenceBagage: {
        referenceFamilleDesignation: "referenceFamilleBagage",
      },

      objectToSendReferenceBagage: {
        datas: [],
      },
    };
  },

  methods: {
    // TO GET ALL TYPE BAGS
    async getReferenceBagageList() {
      this.objectToSendReferenceBagage.datas.push(this.referenceBagage);
      await axios
        .post(
          API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
          this.objectToSendReferenceBagage,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          this.referenceBagageList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },
  },

  mounted() {
    this.getReferenceBagageList();
  },
};
</script>

<style scoped></style>
