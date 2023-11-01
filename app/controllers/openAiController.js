const { randomizeProfile } = require("../helpers/randomizeProfile");

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (req, res) => {
  const promptDetails = randomizeProfile(req.body.promptDataSubmitted);

  const prompt = `Dating app picture, photo realistic, hyper realistic, ${
    promptDetails.age
  } year old, ${promptDetails.race}, ${promptDetails.hairColor}, ${
    promptDetails.happyPlace || promptDetails.location
  }, attractive, alluring, ${
    promptDetails.lookingFor
  }, sigma 24 mm f/8 lens, smiling`;

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "The image cannot be generated",
    });

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

module.exports = { generateImage };
