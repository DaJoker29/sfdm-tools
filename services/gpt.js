import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const submitToGPT = async (request) => {
  const prompt = generatePrompt(request);

  const raw = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a GM for a D&D campaign." },
      { role: "user", content: prompt },
    ],
  });

  return raw.choices[0].message.content;
};

function generatePrompt(request) {
  return `You are generating boxed text for a D&D campaign. The season is ${
    request.season
  }. The region is ${request.region}. ${
    request.combatFlag ? "I need you to generate a combat encounter." : ""
  }. ${
    request.nonCombatFlag
      ? "I need you to generate a non-combat encounter."
      : ""
  } The weather is ${request.weatherWind} and ${
    request.weatherTemp
  }. Overall, the weather is ${
    request.weatherOverview
  }. Deliver your response in JSON format with the following key values: travelConditions (string), combatEncounter (string), nonCombatEncounter (string).`;
}

export { submitToGPT };
