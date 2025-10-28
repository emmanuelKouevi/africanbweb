import {
  API_GET_ALL_FUNCTIONNALITIES,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import axios from "axios";
import $ from "jquery";

export const getPermissionApi = async (body, token) => {
  let permissions = [];
  await axios
    .post(API_GET_ALL_FUNCTIONNALITIES, body, { headers: HEADERS(token) })
    .then((response) => {
      if (response.status == 200) {
        if (response.data.status.code != 800) {
          //this.errorMsg = response.data.status.message;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        } else {
          permissions = response.data.items;
        }
      } else {
        permissions = [];
        //this.errorMsg = "Erreur";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      }
    })
    .catch((e) => {
      permissions = [];
      console.log(e);
      //this.errorMsg = e;
    });

  return permissions;
};
