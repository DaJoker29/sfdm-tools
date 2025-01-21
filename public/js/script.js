import { addEventListeners } from "./days-travel.js";
import { buildFormFields } from "./forms.js";
import { checkAuth } from "./auth.js";

document.body.classList.remove("no-js");
document.body.classList.add("js");

document.onreadystatechange = async () => {
  if (document.readyState === "complete") {
    await buildFormFields();
    await checkAuth();

    document.body.classList.add("is-complete");
    document.body.classList.remove("is-loading");
  }
};

addEventListeners();
