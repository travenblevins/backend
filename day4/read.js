fs = require('fs')

fs.readdir('./lib', (err, files) => {
    if (err) {
        console.error(err)
        return
    }
    files.forEach (file => {
        const path = `./lib/${file}`

        fs.stat(path, (err, stats) => {
            if (err) {
                console.error(err)
                return
            }
            if (stats.isFile()) {
                fs.readFile(path, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log(`This is from file ${file}: ${data}`)
                })
            }
        })
    })
})