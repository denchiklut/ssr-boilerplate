const { app } = require('./dist/server.js')

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Application is started on localhost:', port)
})
