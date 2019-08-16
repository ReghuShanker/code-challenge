const tape = require('tape')
const jsonist = require('jsonist')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`

const server = require('./server')

tape('health', async function (t) {
  const url = `${endpoint}/health`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful healthcheck')
    t.end()
  })
})

tape('putStudent', async function (t) {
  const url = `${endpoint}/rn1abu8/courses/calculus/quizzes/ye0ab61`
  let reqObj = { 'score': '98' }
  jsonist.put(url, reqObj, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'put student Successful')
    t.end()
  })
})

tape('delStudent', async function (t) {
  const url = `${endpoint}/rn1abu8/courses/calculus/quizzes/ye0ab61`
  jsonist.delete(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'delete student successful')
    t.end()
  })
})

tape('getStudent', async function (t) {
  const url = `${endpoint}/rn1abu8/courses/calculus`
  jsonist.get(url, (err, body) => {
    let expeObj = { 'quizzes': { } }
    if (err) t.error(err)
    t.same(expeObj, body.data, 'get student successful')
    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
