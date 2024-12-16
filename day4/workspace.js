const fs = require('fs')
const fsp = fs.promises

try {
    fsp.writeFile('./readme.md', 'Hello World')
    .then(() => console.log('File altered'))
    .catch((err) => console.log(err))
}
catch (e) {
    console.log('Error: ' + e);
}
