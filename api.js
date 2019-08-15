const fs = require('fs')
const fsPromises = fs.promises

module.exports = {
  getHealth,
  putStudent,
  getStudent,
  delStudent
}

async function getHealth (req, res, next) {
  res.json({ success: true })
}
async function putStudent (req, res, next) {
  try {
    let props = req.path.split('/').filter(Boolean)
    let studentId = props.shift()
    let filePath = './data/' + studentId + '.json'
    let jsonObj = {}
    try {
      jsonObj = await readData(req, filePath)
    } catch (error) {
      console.log(error.message)
    }
    let value = req.body
    setJsonObj(jsonObj, props, value)
    await fsPromises.writeFile(filePath, JSON.stringify(jsonObj), 'utf-8')
    res.json({ success: true })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}
async function getStudent (req, res, next) {
  try {
    let props = req.path.split('/').filter(Boolean)
    let studentId = props.shift()
    let filePath = './data/' + studentId + '.json'
    let jsonObj = await readData(req, filePath)
    if (props.length === 0) {
      res.json({ sucess: true, data: jsonObj })
    } else {
      var value
      for (var propName of props) {
        value = jsonObj[propName]
        if (!value) throw new Error("Property doesn't exist")
        jsonObj = value
      }
      res.json({ sucess: true, data: value })
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}
async function delStudent (req, res, next) {
  try {
    let props = req.path.split('/').filter(Boolean)
    let studentId = props.shift()
    let filePath = './data/' + studentId + '.json'
    let jsonObj = await readData(req, filePath)
    let navJson = jsonObj
    var value
    for (var propName of props) {
      value = navJson[propName]
      if (!value) throw new Error("Property doesn't exist")
      props[props.length - 1] === propName ? delete navJson[propName] : navJson = value
    }
    await fsPromises.writeFile(filePath, JSON.stringify(jsonObj), 'utf-8')
    res.json({ success: true })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}
function setJsonObj (object, keys, value) {
  let last = keys.pop()
  keys.reduce(function (o, k) {
    return (o[k] = o[k] || {})
  }, object)[last] = value
}
async function readData (req, filePath) {
  let data
  try {
    data = await fsPromises.readFile(filePath, 'utf-8')
  } catch (error) {
    throw new Error("File doesn't exists")
  }
  return JSON.parse(data)
}
