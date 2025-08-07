<template>
  <div>
    <v-card rounded="lg" elevation="3" v-if="role !== undefined">
      <v-card-text>
        <div class="container">
          <div class="row">
            <span class="text_role_libelle">{{ role.libelle }}</span>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <v-btn small text color="#159e72" @click="isOpenDialog = true"
                ><span class="">Éditer</span></v-btn
              >
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="isOpenDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="add_role_title">Editer un rôle</span>
        </v-card-title>
        <v-card-subtitle>Modifier un rôle utilisateur</v-card-subtitle>
        <v-card-text>
          <v-container>
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Désignation du rôle
                  </label>
                  <input
                    type="text"
                    class="form-control col-lg-12 user_field"
                    id="exampleInputEmail1"
                    v-model="roleObject.libelle"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Code du rôle
                  </label>
                  <input
                    type="text"
                    class="form-control col-lg-12 user_field"
                    id="exampleInputEmail1"
                    v-model="roleObject.code"
                  />
                </div>
              </div>
            </div>
            <br />
            <p class="add_role_title">Permissions</p>
            <v-data-table
              v-model="permissionSelected"
              :headers="permissionHeaders"
              :items="permissionList"
              :single-select="singleSelect"
              item-key="code"
              show-select
              class="elevation-1"
            >
              <template v-slot:top>
                <v-switch
                  v-model="singleSelect"
                  label="Single select"
                  class="pa-3"
                ></v-switch>
              </template>
            </v-data-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="secondary" text @click="isOpenDialog = false">
            Fermer
          </v-btn>
          <v-btn small color="#159e72" btn>
            <span class="text_btn">Enregistrer</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "RoleItem.vue",
  props: {
    role: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      isOpenDialog: false,
      singleSelect: false,
      permissionSelected: [],
      permissionHeaders: [{ text: "Libelle", value: "libelle" }],

      roleObject: {
        code: null,
        libelle: null,
        datasFunctionalities: [],
      },
    };
  },
};
</script>

<style scoped>
.text_role_libelle {
  font-family: "Montserrat";
  font-weight: bold;
  color: black;
}
</style>
