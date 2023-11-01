const { randomizeProfile } = require("../helpers/randomizeProfile");

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//need this to return json

async function generateProfile(req, res) {
  const profilePrompt = randomizeProfile(req.body.promptDataSubmitted);

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `return in JSON form - first_name: random name for a ${
            profilePrompt.lookingFor
          } and bio: dating app profile bio, 30 words or less, involving ${
            profilePrompt.happyPlace || profilePrompt.location
          }`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const response = chatCompletion;

    const nonChatData = JSON.stringify({
      age: profilePrompt.age,
      city: profilePrompt.city,
    });
    res.status(200).json({
      success: true,
      chatData: response,
      nonChatData: nonChatData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "The profile cannot be generated",
    });

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

module.exports = { generateProfile };
