# yourday. - a Javascript/React and Ruby/Rails web application
Flatiron School - Module 5 Final Project.

![yourdaylogo](https://cdn.discordapp.com/attachments/749783037281042626/753351314666160128/Copy_of_find.jpg)

- Frontend: https://github.com/estherkang14/mod5-proj-frontend
- Backend: https://github.com/estherkang14/mod5-proj-backend

## Project Details

yourday. is an electronic planner-type web app that allows a user to:
1. Create an account that saves daily posts, tasks, and events specific to that user
2. Post a 'daily post' that tracks: mood, things a user is stressed about and thankful for, a summary of the user's day, and number of cups of water drank by the user
3. View previous 'daily posts'
4. Add and remove up to three tasks at a time
5. Add, view, update, and remove events off the user's calendar (color-labeled by: 'Birthday', 'Work', 'Personal', 'School', and 'Other')

This application gathers API data from: 
- openweathermap.org
- calendarific.com 

Libraries and gems used: 
- react-router-dom
- redux / react-redux
- Semantic UI 
- Material UI
- FullCalendar.io 
- gem `bcrypt` 
- gem `rest-client`
- gem `json`
- gem `jwt`

## Installation instructions:
1. Clone both the frontend and backend repositories to your computer
2. Run `bundle install` on the backend repository to install the required gems
3. Run `rails db:migrate && rails db:create`, then `rails db:seed` to migrate the schema and seed your data
4. Run `rails s` to start the backend server
5. Run `npm install` on the frontend repository (this one) to install the required libraries
6. Run `npm start` to start the frontend server
7. Open `http://localhost:3001` to view your server


