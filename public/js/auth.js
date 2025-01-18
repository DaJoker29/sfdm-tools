import { listNarratives } from "./narrative.js";

const checkAuth = async () => {
  const response = await fetch("/profile").then((response) => response.json());
  console.log(response);

  if (response.message === "No user found") {
    document.body.classList.remove("is-authenticated");
    return null;
  } else {
    document.body.classList.add("is-authenticated");

    try {
      listNarratives(response);
    } catch (err) {
      console.error(err);
    }

    return response;
  }
};

export { checkAuth };
