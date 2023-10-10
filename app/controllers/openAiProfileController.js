
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateProfile(req, res) {

    const prompt = `Dating app picture, photo realistic, hyper realistic, 34 year old, brunette, attractive, alluring, woman, sigma 24 mm f/8 lens, smiling, loves the beach`

    try {
        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: `create a dating profile with name, age and 25 word bio using this prompt: ${prompt}` }],
          model: 'gpt-3.5-turbo',
        });

        const response = chatCompletion.choices

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