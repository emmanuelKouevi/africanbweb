<template>
  <v-container>
    <v-card height="400">
      <v-card-title
        ><span class="info_user"
          >Information(s) personnelle(s)</span
        ></v-card-title
      >
      <v-card-text>
        <v-form>
          <div class="row">
            <div class="col-lg-5 mb-3">
              <label for="exampleInputPassword1" class="form-label">Nom:</label>
              <input
                disabled
                type="text"
                name=""
                id=""
                :value="account == undefined ? '' : account.nom"
                class="form-control col-lg-9 account_input"
              />
            </div>

            <div class="col-lg-7 mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Prénom(s):</label
              >
              <input
                disabled
                type="text"
                name=""
                id=""
                :value="account == undefined ? '' : account.nom"
                class="form-control col-lg-8 account_input"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >E-mail:</label
            >
            <input
              disabled
              type="text"
              name=""
              id=""
              :value="account == undefined ? '' : account.email"
              class="form-control col-lg-10 account_input"
            />
          </div>
          <div class="row">
            <div class="col-lg-5 mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Pseudo:</label
              >
              <input
                disabled
                type="text"
                name=""
                id=""
                :value="account == undefined ? '' : account.login"
                class="form-control col-lg-10 account_input"
              />
            </div>

            <div class="col-lg-7 mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Rôle:</label
              >
              <input
                disabled
                type="text"
                name=""
                id=""
                :value="account == undefined ? '' : account.roleCode"
                class="form-control col-lg-10 account_input"
              />
            </div>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "UserInfo.vue",
  props: {
    account: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
.info_user {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 17px;
  opacity: 0.7;
}

.account_input {
  font-family: "Montserrat";
  font-size: 15px;
}
</style>
