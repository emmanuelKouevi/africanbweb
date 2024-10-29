<template>
  <v-app>
    <v-container fluid class="mt-6">
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="black"></v-tabs-slider>
        <v-tab> Vue d'ensemble </v-tab>
        <v-tab> Opérations </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item key="Vue d'ensemble" class="mt-6">
          <v-card elevation="">
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <span class="font-weight-bold">Activités</span>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    Compte crée le : {{ user.createdAt }}
                  </div>
                  <div class="col-lg-12">
                    Dernière connexion le : {{ user.lastConnectionDate }}
                  </div>
                </div>
              </div>
              <br />
            </v-card-text> </v-card
          ><br /><br />

          <v-card elevation="">
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <span class="font-weight-bold">Informations Générales</span>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <span>Nom : {{ user.nom }}</span>
                </div>
                <div class="col-lg-6">
                  <span>Prénom: {{ user.prenoms }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <span>E-mail: {{ user.email }}</span>
                </div>
                <div class="col-lg-6">
                  <span>Pseudo: {{ user.login }}</span>
                </div>
              </div>
            </v-card-text> </v-card
          ><br /><br />

          <v-card elevation="">
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <span class="font-weight-bold">Role Utilisateur</span>
                </div>
                <div class="col-lg-6">
                  <span>{{ user.roleCode }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="Opérations">
          <v-card elevation="">
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <span class="font-weight-bold">Status</span>
                </div>
                <div class="col-lg-6">
                  <v-chip v-if="user.isActif === false" x-small color="red"
                    ><span class="font-weight-bold status"
                      >Inactive</span
                    ></v-chip
                  >
                  <v-chip
                    v-else-if="user.isActif === null"
                    x-small
                    color="success"
                    ><span class="font-weight-bold status"
                      >Inactive</span
                    ></v-chip
                  >
                  <v-chip v-else x-small color="success"
                    ><span class="font-weight-bold status">Active</span></v-chip
                  >
                </div>
              </div>
            </v-card-text> </v-card
          ><br />

          <v-card elevation="">
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <span v-if="user.isActif == true" class="font-weight-bold"
                    >Activé</span
                  >
                  <span v-if="user.isActif == false" class="font-weight-bold"
                    >Désactivé</span
                  >
                </div>
                <div class="col-lg-6">
                  <span v-if="user.isActif == false"
                    ><v-switch
                      @click="toActivedUser"
                      v-model="switch1"
                      inset
                      color="success"
                    ></v-switch
                  ></span>
                  <span v-else-if="user.isActif == null"
                    ><v-switch
                      disabled
                      v-model="switch1"
                      inset
                      color="success"
                    ></v-switch
                  ></span>
                  <span v-else
                    ><v-switch
                      disabled
                      v-model="switch1"
                      inset
                      color="success"
                    ></v-switch
                  ></span>
                </div>
              </div>
            </v-card-text> </v-card
          ><br />

          <v-card elevation="">
            <v-card-text>
              <div class="row">
                <div class="col-lg-6">
                  <span class="font-weight-bold">Total Permissions</span>
                </div>
                <div class="col-lg-6">
                  <span>{{ totalPermission }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import {
  API_GET_ALL_USERS_CREATED,
  API_ACTIVATE_USER,
  HEADERS,
  API_GET_ALL_ROLES,
} from "@/components/globalConfig/globalConstConfig";
export default {
  data() {
    return {
      user: {},
      simpleObjectToSend: {
        data: {},
      },

      toActive: {
        data: {
          login: null,
        },
      },

      totalPermission: 0,

      switch1: false,
      tab: null,
      items: ["Vue d'ensemble", "Données", "Opérations"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },

  methods: {
    // ACTIVER UN UTILISATEUR
    async toActivedUser() {
      this.toActive.data.login = this.user.login;
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
              this.toActive.data.login = null;
              this.user.isActif = true;
            } else {
              this.$swal.fire(
                "Activation",
                response.data.status.message,
                "success"
              );
              this.toActive.data.login = null;
              this.user.isActif = true;
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

    // RECUPERER LA LISTE DES UTILISATEURS CREES SUR LA PLATEFORME
    async toGetAllUsersCreated() {
      await axios
        .post(API_GET_ALL_USERS_CREATED, this.simpleObjectToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              response.data.items.forEach((element) => {
                if (element.nom == this.$route.params.nom) {
                  this.user = element;
                }
              });
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          console.log("Finally");
        });
    },

    //RECUPERER LA LISTE DES ROLES CRÉES
    async getAllUserRole() {
      await axios
        .post(
          API_GET_ALL_ROLES,
          {},
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              response.data.items.forEach((element) => {
                if (element.code == this.user.roleCode) {
                  this.totalPermission = element.datasFunctionalities.length;
                }
              });
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        })
        .finally(() => {
          this.loadingUserRole = false;
        });
    },
  },

  mounted() {
    this.toGetAllUsersCreated();
    this.getAllUserRole();
  },
};
</script>

<style scoped>
.status {
  color: white;
}
</style>
