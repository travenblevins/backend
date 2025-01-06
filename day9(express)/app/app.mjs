import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const users = [];  // Users array to store user data

app.use(express.json());  // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // Middleware to parse URL-encoded request bodies
app.use(express.static('public'));  // Serve static files from 'public' folder


// Sample users (this could be from a database in a real-world app)
users.push({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
users.push({ firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' });

// Serve the findUser.html when a user accesses the /findUser route
app.get('/findUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'findUser.html'));
});

// Route to handle user search
app.get('/searchUser', (req, res) => {
    const searchQuery = req.query.query.toLowerCase();  // Get the search query from the URL
    const matchingUsers = users.filter(user => 
        user.firstName.toLowerCase().includes(searchQuery) || 
        user.lastName.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)
    );

    // Respond with the matching users in JSON format
    res.json(matchingUsers);
});

// Example route to handle adding a user
app.post('/addUser', (req, res) => {
    const { firstName, lastName, email } = req.body;
    const user = { firstName, lastName, email };
    users.push(user);
    console.log(users);

    fs.appendFile('findUser.html', `<p>User added: ${firstName} ${lastName} with email ${email}</p>\n`, (err) => {
        if (err) {
            console.error('Error appending to file:', err);
            return res.status(500).send('Failed to save user.');
        }
        console.log('User information appended to findUser.html');
    });

    res.send(`User added: ${firstName} ${lastName} with email ${email}`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
