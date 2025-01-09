const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const app = express();
app.use(express.json());

const courses = [
    {
        courseId: 1,
        courseName: 'courseOne',
    },
    {
        courseId: 2,
        courseName: 'courseTwo',
    }
]
const users = [
    {
        userId: 'alice',
        password: '123',
        firstName: 'Alice',
        lastName: 'Smith',
    },
    {
        userId: 'bob',
        password: '456',
        firstName: 'Bob',
        lastName: 'Johnson',
    }
]

const secret = 'mySecret'

app.post('/login', (req, res) => {
    const { userId, password } = req.body;
    const user = users.find((curruser) => curruser.userId === userId);
    if (!user || user.password !== password) {
        return res.status(401).end({ error: 'Invalid user ID or password' });
    }

    const token = jwt.sign({ userId: user.userId }, secret, {
        algorithm: 'HS256',
        expiresIn: '30s',
    })

    res.json({ token: token });
})

app.get(
    '/courses',
    expressjwt({ secret: secret, algorithms: ["HS256"] }),
    (req, res) => {
        res.json({ courses: courses });
    }
);


app.get('/users/:userId', (req, res) => {
    const user = users.find(user => user.userId === req.params.userId);
    res.json(user);
})

app.get('/users', (req, res) => {
    const user = users.find(user => user.userId === req.query.userId);
    res.json(user);
})

app.post('/users/create', (req, res) => {
    const user = req.body
    users.push(user)
    res.end(`User ${user.userId} has been created`);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})