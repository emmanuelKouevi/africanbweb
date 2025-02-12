<template>
  <v-app>
    <v-card>
      <v-card-title
        ><span class="mini_title">Stratégie par poids</span></v-card-title
      >
      <v-card-text>
        <div class="row justify-space-around">
          <div class="col-lg-3">
            <label for="inputPrice" class="form-label"
              >Prix du kilo (kg)*</label
            >
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                aria-describedby="basic-addon1"
              />
              <span class="input-group-text" id="basic-addon1">FCFA</span>
            </div>
          </div>
          <div class="col-lg-3">
            <label for="exampleInputPassword1" class="form-label"
              >Kilo gratuit*</label
            >
            <input type="number" min="0" id="" class="form-control col-lg-8" />
          </div>
        </div>
        <br />
        <div class="float-right">
          <v-btn btn color="secondary" outlined>REINITIALISER</v-btn
          >&nbsp;&nbsp;
          <v-btn color="success" btn @click="creerStrategieParPoids" outlined
            >ENREGISTRER</v-btn
          >
        </div>
        <br /><br />
      </v-card-text>
    </v-card>

    <v-alert
      class="myalert alert-success"
      type="success"
      width="350px"
      dismissible
      >{{ successMsg }}</v-alert
    >
    <v-alert
      class="myalert alert-error"
      type="error"
      width="350px"
      dismissible
      >{{ errorMsg }}</v-alert
    >
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-app>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import $ from "jquery";
import {
  API_CREATE_STRATEGIE_BAGAGE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import axios from "axios";
export default {
  name: "StrategieBagagePoids",
  props: ["errorMessage", "typeStrategie"],
  data() {
    return {
      overlay: false,
      errorMsg: null,
      successMsg: null,

      strategieBagagePoidsModel: {
        data: {
          designation: null,
          typeStrategieBagageDesignation: null,
          strategieBagagePoidsDTO: {
            designation: null,
            prixKilo: null,
            nombreKiloNonTaxable: null,
          },
        },
      },
    };
  },

  validations: {
    strategieBagagePoidsModel: {
      data: {
        strategieBagagePoidsDTO: {
          prixKilo: {
            required,
          },

          nombreKiloNonTaxable: {
            required,
          },
        },
      },
    },
  },

  methods: {
    // CREER STRATEGIE PAR POIDS
    async creerStrategieParPoids() {
      this.overlay = true;
      this.strategieBagagePoidsModel.data.designation = this.typeStrategie;
      this.strategieBagagePoidsModel.data.typeStrategieBagageDesignation =
        this.typeStrategie;
      this.strategieBagagePoidsModel.data.strategieBagagePoidsDTO.designation =
        this.typeStrategie;

      await axios
        .post(API_CREATE_STRATEGIE_BAGAGE, this.strategieBagagePoidsModel, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              $(".alert-success").fadeIn();
              setTimeout(function () {
                $(".alert-success").fadeOut();
              }, 4000);
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
            }
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        })
        .finally(() => {
          this.overlay = false;
        });
    },
  },
};
</script>

<style scoped>
.mini_title {
  font-family: "Montserrat";
  font-size: 15px;
  font-weight: 700;
}

.myalert {
  display: none;
  z-index: 1900;
}

.alert-success {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}

.alert-error {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}
</style>
