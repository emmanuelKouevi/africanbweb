import {
  API_CREATE_USER_ROLE,
  API_GET_ALL_ROLES,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
/*import {
  showErrorMessage,
  showSuccessMessage,
} from "@/modules/messages/messageProcess";*/
import axios from "axios";
import $ from "jquery";

export const getRoleUserApi = async (body, headers) => {
  let userRoles = [];
  await axios
    .post(API_GET_ALL_ROLES, body, { headers: headers })
    .then((response) => {
      if (response.status == 200) {
        if (response.data.status.code != 800) {
          //this.errorMsg = response.data.status.message;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        } else {
          userRoles = response.data.items;
        }
      } else {
        userRoles = [];
        //this.errorMsg = "Erreur";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      }
    })
    .catch((e) => {
      userRoles = [];
      console.log(e);
      //this.errorMsg = e;
    });

  return userRoles;
};

// CALL API TO ADD NEW USER ROLE
export const addRoleApi = async (body, token) => {
  await axios
    .post(API_CREATE_USER_ROLE, body, {
      headers: HEADERS(token),
    })
    .then((response) => {
      if (response.status == 200) {
        if (response.data.status.code == 800) {
          //successMsg = response.data.status.message;
          //showSuccessMessage();
        } else {
          //errorMsg = response.data.status.message;
          //showErrorMessage();
        }
      }
    })
    .catch((e) => {
      console.log(e);
      //errorMsg = e;
      //showErrorMessage();
    });
};
