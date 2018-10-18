const http = require('http')
const path = require('path')
const mockserver = require('@prague-digi/mockserver')

const verbose = true

http.createServer(mockserver(path.join(__dirname, 'mocks'), verbose)).listen(3330)
