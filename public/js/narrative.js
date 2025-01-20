const saveNarrative = (owner, results) => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      owner: owner._id,
      ...results,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("/api/narrative/save", options).catch((err) => console.error(err));
};

const listNarratives = async (owner) => {
  const params = new URLSearchParams({ googleID: owner.googleID });
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`/api/narratives?${params}`, options).then(
    (response) => response.json()
  );

  // TODO: #25 Add some visual cue to the user that the narratives are loading

  const list = document.querySelector("#narrativesList");
  list.innerHTML = "";

  response.forEach((narrative, index) => {
    const detail = document.createElement("details");

    const summary = document.createElement("summary");
    summary.textContent = `${index + 1}: ${narrative.region} - ${
      narrative.season
    }`;
    detail.appendChild(summary);

    const outputKeys = [
      "weatherWind",
      "weatherTemp",
      "weatherOverview",
      "travelConditions",
      "combatEncounter",
      "nonCombatEncounter",
    ];

    const innerList = document.createElement("ul");
    for (const key in narrative) {
      if (!outputKeys.includes(key)) {
        continue;
      }

      const listItem = document.createElement("li");
      listItem.textContent = `${narrative[key]}`;
      innerList.appendChild(listItem);
    }
    detail.appendChild(innerList);
    list.appendChild(detail);
  });
};

export { saveNarrative, listNarratives };
