import {
  API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import { showErrorMessage } from "@/modules/messages/messageProcess";
import axios from "axios";

// obtenir la liste de la reférence passé en paramètre
export const getReference = (dataToSend, userToken, messageText) => {
  axios
    .post(API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE, dataToSend, {
      headers: HEADERS(userToken),
    })
    .then((response) => {
      return response.data.items;
    })
    .catch((e) => {
      messageText = e;
      console.log(messageText);
      showErrorMessage();
      throw e;
    });
};
