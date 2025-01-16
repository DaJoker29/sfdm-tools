const ENDPOINT = "/api/days-travel";
const travelForm = document.querySelector("#travelOptions");

const addEventListeners = () => {
  travelForm.addEventListener("submit", onSubmit);
};

async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(travelForm);
  const season = formData.get("season");
  const region = formData.get("region");
  const combatFlag = formData.get("combatFlag");
  const nonCombatFlag = formData.get("nonCombatFlag");

  const options = {
    method: "POST",
    body: JSON.stringify({
      season,
      region,
      combatFlag,
      nonCombatFlag,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(ENDPOINT, options).then((response) =>
    response.json()
  );

  updateResults(response);
}

function updateResults(response) {
  const windElement = document.querySelector("#wind-output");
  const tempElement = document.querySelector("#temp-output");
  const overviewElement = document.querySelector("#overview-output");
  const bannerElement = document.querySelector("#banner-output > img");
  const travelElement = document.querySelector("#travel-output");
  const combatElement = document.querySelector("#combat-output");
  const nonCombatElement = document.querySelector("#non-combat-output");

  windElement.textContent = response.weatherWind;
  tempElement.textContent = response.weatherTemp;
  overviewElement.textContent = response.weatherOverview;
  bannerElement.src = `/img/${response.weatherBanner}`;
  bannerElement.alt = response.weatherOverview;

  drawNarrativeElement({
    context: travelElement,
    label: "Travel Conditions",
    content: response.travelConditions,
  });

  if (response.combatFlag === "on") {
    drawNarrativeElement({
      context: combatElement,
      label: "Combat Encounter",
      content: response.combatEncounter,
    });
  }

  if (response.nonCombatFlag === "on") {
    drawNarrativeElement({
      context: nonCombatElement,
      label: "Noncombat Encounter",
      content: response.nonCombatEncounter,
    });
  }
}

function drawNarrativeElement({ context, label, content }) {
  context.textContent = "";

  const strong = document.createElement("strong");
  strong.innerText = label;

  context.appendChild(strong);
  context.append(" ");
  context.append(content);
}

export { addEventListeners };
