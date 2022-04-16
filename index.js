const { server } = require('./dist/js/server/main')
const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Application is started on http://localhost:${port}`)
})
