
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: "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"
});

const generateImage = async (req, res) => {

  const { prompt } = req.body;

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '512x512'
    })

    const imageUrl = response.data[0].url

    res.status(200).json({
      success: true,
      data: imageUrl
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'The image cannot be generated'
    })
   
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

  }
    
}

module.exports = { generateImage }