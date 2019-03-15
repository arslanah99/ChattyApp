React Boilerplate
=====================

A minimal and light dev environment for ReactJS. With a server that allows for texting to more than 1 web client.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:arslanah99/ChattyApp.git
cd react-simple-boilerplate
cd chatty-server
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start on both chatty server and react-simple-boilerplate
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* react-dom
* uuid
* express
* ws
* uuid
