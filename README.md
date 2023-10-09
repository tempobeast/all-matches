# All Matches
All Matches is a fake dating app with AI generated photos of matches based on prompts set by the user. No matter how the photos hit or miss, the beauty of the app is that they are ALL MATCHES. Its intent is to play on the psychology of dating apps, the dopamine hit of a match and the overall distaste of users with mainstream (real) dating apps. The app is being developed with a React front end and an Express backend that makes calls to OpenAI's Dall-E2. 

## User Features

Select your preferred gender, age, and activity.

![gif of selecting parameters](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXo1dzVoOWhncWdzb2pjazVtYTZyazBkMjRtY2o2cXZqejVnZjJnZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1SPN1aR1Im3lj4qxYj/giphy.gif)

Click View Matches and wait for the AI generated image to render.

![gif of view matches](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODFlenIxNXF5NmVjbzJlYTJ1ejhjanY5ZGtjY2prd2szbXJtdzdhbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TfQHmSlNUQ0BhPLX5B/giphy.gif)

Swipe right to match or left to generate a new match image.

 ![gif of swiping right](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHo2ZTVmOXozOGNyd2YxMXhhaGVubXl6NjIwdDVpN2tiOTBiam90NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Tg8fYzHCGIBoivHHqP/giphy.gif)


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


