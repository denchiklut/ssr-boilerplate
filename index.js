const { server } = require('./dist/js/main.server')

const port = process.env.PORT || 3000


server.listen(port, () => {
    console.log(`Application is started on http://localhost:${port}`)
})
