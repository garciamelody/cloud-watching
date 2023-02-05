# Cloud Watching

<a href="https://enchanting-lab-coat-lamb.cyclic.app/">Cloud Watching</a> is an app created to track your dreams and browse others'  dreams based on topics of interest.

![Screen_Recording_2022-12-30_at_7_55_33_AM_AdobeExpress](https://user-images.githubusercontent.com/102616304/210077910-717098a1-98fd-4ef2-b9bf-7a935a667ea2.gif)

Users can customize their feeds by selecting their topics of interest. Their feed will then only contain dreams tagged with those topics.

![Screen_Recording_2022-12-30_at_8_43_33_AM_AdobeExpress](https://user-images.githubusercontent.com/102616304/210083167-9847fd31-f397-46ef-a8aa-30ec697c809a.gif)

Users can create new posts and select how their dream was, create a title, write a caption, and select topic tags.

![Screen_Recording_2022-12-30_at_9_02_40_AM_AdobeExpress](https://user-images.githubusercontent.com/102616304/210084447-01fe4b2d-9265-4add-b073-d261b31a46b5.gif)

# What is it made with?
EJS, Javascript, CSS, Node.js, Express.js, MongoDB, Mongoose

# EJS
This app uses EJS to generate HTML using Javascript, allowing the app to render posts based on users data. For example a user's feed is rendered by 
checking the users selected tags and rendering posts that contain those tags.

# Javascript
In this app Javascript is used to 'read' the inner text of the dream type (bad, good, neutral). It will then select a random image (using Math.random) associated with the
dream type and set the background image of the post to the random image selected. This allows the user to quickly see the type of dreams on their feed.

# Node.js
Node.js is responsible for the server-side aspect. It uses Javascript to build scalable applications.

# Express.js
Express.js is a framework for Node.js that comes with lots of features. It is responsible for routing and middleware throughout the app.

# MongoDB
MongoDB is the database that stores users' data, such as the data tied to the dream posts and users.

# Mongoose
Mongoose is responsible for defining Schema Objects that map directly to MongoDB. Organizing user data this way makes it easy to reference 
throughout the app. 

# What architecture is used?
MVC architecture organizes the app into three components: Model, View, and Controller. 

The View component holds all of the ejs files the user sees and interacts with.

The Model component holds all of the Mongo schemas that give structure to our user data. It is responsible for adding and retrieving data from the database.

The controller component acts as the middleman between the Model and View components. The Controller will process requests made through 
View components and relay requests related to data to the Model component. The model component will then retrieve the data needed and "pass it" 
to the Controller, which will then interact with the View component to have the data rendered in HTML.
