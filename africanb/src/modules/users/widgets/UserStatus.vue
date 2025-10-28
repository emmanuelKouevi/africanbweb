<template>
  <v-container>
    <v-card height="190">
      <v-card-title
        ><span class="user_activity">Status</span>
        <v-spacer></v-spacer>
        <div v-if="account != undefined">
          <v-chip v-if="account.isActif === false" x-small color="red"
            ><span class="font-weight-bold status">Inactive</span></v-chip
          >
          <v-chip v-else-if="account.isActif === null" x-small color="success"
            ><span class="font-weight-bold status">Inactive</span></v-chip
          >
          <v-chip v-else x-small color="success"
            ><span class="font-weight-bold status">Active</span></v-chip
          >
        </div>
      </v-card-title>
      <v-card-text>
        <v-list v-if="account != undefined">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                class="subtitle_btn"
                v-if="account.isActif == true"
                >Activé</v-list-item-subtitle
              >
              <v-list-item-subtitle
                class="subtitle_btn"
                v-if="account.isActif == false"
                >Désactivé</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-subtitle
                ><v-switch
                  v-if="account.isActif == false"
                  @click="toActivedUser"
                  v-model="switch1"
                  inset
                  color="success"
                ></v-switch
                ><v-switch
                  v-else-if="account.isActif == null"
                  disabled
                  v-model="switch1"
                  inset
                  color="success"
                ></v-switch>
                <v-switch
                  v-else
                  disabled
                  v-model="switch1"
                  inset
                  color="success"
                ></v-switch>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import {
  API_ACTIVATE_USER,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";

export default {
  props: ["account"],

  data() {
    return {
      switch1: false,

      toActive: {
        data: {
          login: null,
        },
      },
    };
  },

  methods: {
    // ACTIVER UN UTILISATEUR
    async toActivedUser() {
      this.toActive.data.login = this.account.login;
      await axios
        .post(API_ACTIVATE_USER, this.toActive, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.$swal.fire(
                "Activation",
                response.data.status.message,
                "error"
              );
              this.switch1 = false;
              this.toActive.data.login = null;
            } else {
              this.$swal.fire(
                "Activation",
                response.data.status.message,
                "success"
              );
              this.toActive.data.login = null;
              this.$emit("account-activated", this.account.isActif);
            }
          } else {
            this.$swal.fire(
              "Activation",
              "Error lors de la validation",
              "error"
            );
            this.toActive.data.login = null;
          }
        })
        .catch((e) => {
          this.$swal.fire("Activation refusée", e, "error");
          this.toActive.data.login = null;
        });
    },
  },
};
</script>

<style scoped>
.user_activity {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 17px;
  opacity: 0.7;
}

.subtitle_text {
  font-family: "Montserrat";
}

.status {
  color: white;
  font-family: "Montserrat";
}

.subtitle_btn {
  font-weight: normal;
  font-size: 15px;
  font-family: "Montserrat";
}
</style>
