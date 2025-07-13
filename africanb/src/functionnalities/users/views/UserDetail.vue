<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <span class="section_user_title">Information utilisateur</span>
      </div>
      <br />
      <div class="row">
        <div class="col-lg-7">
          <UserInfo
            class="animate__animated animate__backInLeft animate__delay-1s"
            :account="user"
          />
        </div>
        <div class="col-lg-5">
          <div class="row">
            <UserActivities
              class="animate__animated animate__backInDown animate__delay-1s"
              :account="user"
            />
          </div>
          <div class="row">
            <UserStatus
              class="animate__animated animate__backInUp animate__delay-1s"
              :account="user"
              @account-activated="handleAccountActivated"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <UserFunctionnalities
            class="animate__animated animate__backInLeft animate__delay-1s"
            :functionnalities="userFunctionnalyList"
          />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import {
  API_GET_ALL_USERS_CREATED,
  HEADERS,
  API_GET_ALL_ROLES,
  API_GET_FUNCTIONNALITY_BY_USER_ROLE,
} from "@/components/globalConfig/globalConstConfig";
import UserInfo from "../widgets/UserInfo.vue";
import UserActivities from "../widgets/userActivities.vue";
import UserStatus from "../widgets/UserStatus.vue";
import UserFunctionnalities from "../widgets/userFunctionnalities.vue";
export default {
  components: {
    UserInfo,
    UserActivities,
    UserStatus,
    UserFunctionnalities,
  },
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

      gettingFunctionnalityData: {
        data: {
          code: null,
        },
      },

      userFunctionnalyList: [],
    };
  },

  methods: {
    // Gérer l'activation du compte utilisateur
    handleAccountActivated() {
      this.user.isActif = true;
    },

    // Recuperer la liste des fonctionnalités par rôle utilisateur
    async getFunctionnalitiesByUserRole(userRoleCode) {
      console.log(this.user.roleCode);
      this.gettingFunctionnalityData.data.code = userRoleCode;
      await axios
        .post(
          API_GET_FUNCTIONNALITY_BY_USER_ROLE,
          this.gettingFunctionnalityData,
          {
            headers: HEADERS(this.$store.state.userAuthentified.token),
          }
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
              this.userFunctionnalyList = response.data.items;
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
                  this.getFunctionnalitiesByUserRole(this.user.roleCode);
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
#inspire {
  background: #eeeeee;
}
.section_user_title {
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 1px;
}
.status {
  color: white;
}
</style>
