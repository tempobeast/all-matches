
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateProfile(req, res) {

   const { profilePrompt } = req.body;

    try {
        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: `create a dating profile with first name, age and 25 word bio using this prompt: ${profilePrompt}` }],
          model: 'gpt-3.5-turbo',
        });

        const response = chatCompletion

        res.status(200).json({
            success: true,
            data: response
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'The profile cannot be generated'
        })

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message)
        }
        
    }
  }

module.exports = { generateProfile }