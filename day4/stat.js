fs = require ('fs');
const fsp = fs.promises

fs.stat('./readme.md',
     fs.constants.W_OK | fs.constants.R_OK,
     (err) => {}
)