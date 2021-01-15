const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000;

// const apiRouter = require('./routes/api');

// handle parsing request body
app.use(express.json());

// handle get requests to homepage, will serve index.html
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// route handler for api, sends to apiRouter
// app.use('/api', apiRouter);

// on a request to homepage, responds with index.html, which links to 'client/components/App.jsx'
app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../index.html')));



// will only run in production mode
if (process.env.NODE_ENV === 'production') {
    // allows build to populate properly when called in index.html
    app.get('/build/bundle.js', (req, res) => {
        console.log(path.join(__dirname, '../build/bundle.js'));
        res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
    });

    // homepage, will fire index.html, which calls App.jsx
    app.get('/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../index.html'));
    });
}



// catch-all route handler for requests to an unknown route
app.use((req, res) => res.status(404).send("You're looking for something that doesn't exist. Try a real route, dude"))

// telling the app which port to listen on
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

module.exports = app;