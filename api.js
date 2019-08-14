const fs = require("fs").promises;

async function getHealth(req, res, next) {
  res.json({ success: true });
}

async function putStudent(req, res, next) {
  let props = req.path.split("/").filter(Boolean);
  let studentId = props.shift();
  let filePath = studentId + ".json";
  let jsonObj={};
  try {
    let data = await fs.readFile(filePath, "utf-8");
    jsonObj = JSON.parse(data);
  } catch (error) {
    console.log("File doesn't exists");
  }
  let value = req.body;
  setJsonObj(jsonObj, props, value);
  try {
    await fs.writeFile(filePath, JSON.stringify(jsonObj), "utf-8");
  } catch (error) {
    console.log(error);
  }
  res.json({ success: true });
}

function setJsonObj(object, keys, value) {
  last = keys.pop();
  keys.reduce( function(o, k) { return (o[k] = o[k] || {});}, object)
  [last] = value;
}

async function getStudent(req, res, next) {
  let props = req.path.split("/").filter(Boolean);
  let studentId = props.shift();
  let filePath = studentId + ".json";
  let jsonObj={};
  try {
    let data = await fs.readFile(filePath, "utf-8");
    jsonObj = JSON.parse(data);
    for (var key in jsonObj) {
      if (obj.hasOwnProperty(key)) {
        console.log(key + ": " + obj[key]);
      }
    }
  } catch (error) {
    console.log("File doesn't exists");
    res.status(404).json({ error: "File doesn't exists"})
  }
  res.json({ success: true });
}

async function delStudent(req, res, next) {
  res.json({ success: true });
}
module.exports = {
  getHealth,
  putStudent,
  getStudent,
  delStudent
};
