const endpoint = "/journey";
const form = document.querySelector("#travelOptions");

const journey = () => {
  form.addEventListener("submit", submitListener);
};

export default journey;

async function submitListener(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const season = formData.get("season");
  const region = formData.get("region");
  const combatFlag = formData.get("combatFlag");
  const nonCombatFlag = formData.get("nonCombatFlag");

  const data = {
    season,
    region,
    combatFlag,
    nonCombatFlag,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(endpoint, options).then((response) =>
    response.json()
  );

  const promptValues = rollTables(response);
}

function rollTables(options) {}
