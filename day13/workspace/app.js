const express = require('express');
const session = require('express-session');
const passport = require('passport');
const faceBookStrategy = require('passport-facebook').Strategy;

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.use(
    session({
        secret: 'asderd',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new faceBookStrategy({
    clientID: '639628291964045',
    clientSecret: '889de4d342fd9b8967580a0a01d82b74',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const authRouter = express.Router();
app.use('/auth', authRouter);

authRouter.get('/facebook',
    passport.authenticate('facebook', { scope: ['public_profile'] }));

authRouter.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/displayUserDetails',
        failureRedirect: '/'
    }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/displayUserDetails', (req, res) => {
    console.log(req.user);
    res.render('userDetails', { user: req.user });
});

app.listen(3000, () => {
    console.log('port 3000');
});


// passport.use(new GoogleStrategy({
//     clientID: '484230459160-lqtv8ihjmfori37gffkf7a7oloigtfvr.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: 'http://localhost:3000/auth/google/callback',
// }, (accessToken, refreshToken, profile, done) => {
//     done(null, profile);
// }));


// passport.serializeUser((user, done) => {
//     done(null, user)
// });
// passport.deserializeUser((user, done) => {
//     done(null, user)
// })

// const authRouter = express.Router();
// app.use('/auth', authRouter);

// authRouter.get
//     ('/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] }));

// authRouter.get
//     ('/google/callback',
//         passport.authenticate('google', {
//             successRedirect: '/displayUserDetails',
//             failureRedirect: '/'
//         }));

// app.get('/', (req, res) => {
//     res.render('index');
// })

// app.get('/displayUserDetails', (req, res) => {
//     console.log(req.user);
//     res.render('userDetails', { user: req.user });
// })

// app.listen(3000, () => {
//     console.log('port 3000')
// })