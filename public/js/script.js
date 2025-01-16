import { addEventListeners } from "./days-travel.js";
import { buildFormFields } from "./forms.js";

document.body.classList.remove("no-js");
document.body.classList.add("js");

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    document.body.classList.add("is-complete");
    document.body.classList.remove("is-loading");

    buildFormFields();
  }
};

addEventListeners();
