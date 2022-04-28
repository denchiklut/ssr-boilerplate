const { app } = require('./dist/js/server/main.js')

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Application is started on localhost:', port)
})
