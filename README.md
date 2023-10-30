# All Matches
All Matches is a fake dating app with AI generated photos of matches based on prompts set by the user. No matter how the photos hit or miss, the beauty of the app is that they are ALL MATCHES. Its intent is to play on the psychology of dating apps, the dopamine hit of a match and the overall distaste of users with mainstream (real) dating apps with real people on the other end. The app is being developed with a React front end and an Express backend that makes calls to OpenAI's Dall-E 2 and chat GPT APIs. 

## User Features

Select your preferred gender, age, activity and your location.

![gif of selecting parameters](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWRicHVhYTJqNXM1MzYydmVxaDlqazRpbXRtamU1MjFhbzUzdTZyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8aBdlcaGpte2UbqcXz/giphy.gif)

Click View Matches and wait for the AI generated image and match bio information to render.

![gif of view matches](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzhma285YmN1NDF2MXFtenZoODd3bTJ1YXZiMzJ5anloczE5MW1kdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/003HZhbWgbw7YjciWm/giphy.gif)

Swipe right or click the heart to match or left click the x to generate a new match image.

 ![gif of swiping right](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHR1OXlub3VrenIzdDlyMGQwc28ybmI5ejVjbWRhc2tubnZ4aWRwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kVCbHzxez5H1WTu5n3/giphy.gif)


## Future Features

In the future this app will include more prompts to create more detailed images. It will also include a full backend and database for persisting user and match data. It will also include a chat feature. It will also require several disclaimers to remind users that they are matching and chatting with AI. 

To run this app you'll have to create an account with OpenAI. 

Create a .env file in app and add: 

`PORT=4000`
`OPENAI_API_KEY = "Your-Open-AI-Key-Here"`

## Running a local server

```npm install --prefix app```
```npm run dev --prefix app```


```npm install --prefix client```
```npm start --prefix client```


