const express = require('express');
const session = require('express-session');
const app = express();

app.use(
    session({
        secret: 'anything',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 10000 },
    })
)
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
})

app.get('/', (req, res) => {
    res.cookie('mycookie', 'myvalue', { httpOnly: true, maxAge: 10000 });
    res.send('Hello World');
})

app.get('/views', (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write(`<p>You have visited this page ${req.session.views} times</p>`);
        res.write(`<p>Session expires in: ${req.session.cookie.maxAge / 1000} seconds</p>`);
        res.end(`You have visited this page ${req.session.views} times`)
    } else {
        req.session.views = 1;
        res.end('Welcome to the session demo. Refresh the page!')
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

