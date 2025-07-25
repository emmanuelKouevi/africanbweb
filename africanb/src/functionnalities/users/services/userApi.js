import {
  API_CREATE_USER,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import axios from "axios";

// CALL API FOR CREATING USERS
export const creatingUserApi = async (body, headers, overlay) => {
  let isCreated = false;
  console.log(overlay);
  try {
    overlay = false;
    await axios
      .post(API_CREATE_USER, body, {
        headers: HEADERS(headers),
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          if (response.data.status.code == 800) {
            isCreated = true;
          } else {
            isCreated = false;
          }
        } else {
          isCreated = false;
        }
      })
      .catch((e) => {
        isCreated = false;
        console.log(e);
      })
      .finally(() => {
        overlay = true;
      });
  } catch (error) {
    isCreated = false;
    console.log(error);
  }
  return isCreated;
};
