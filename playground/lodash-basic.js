const _ = require("lodash");

// lodash _.get
const user_1 = {
  name: "Nguyen Van A",
  age: 30,
  education: {
    university: "DH Van Lang"
  },
  jobs: [
    {
      title: "teacher",
      type: "fulltime",
      exp: {
        abc: {
          xyz: {}
        }
      }
    },
    {
      title: "dev",
      type: "parttime"
    }
  ]
}

const user_2 = {
  name: "Tran Van B",
  age: 20,
  education: {
    university: "DH Lac Hong"
  },
  jobs: []
}

const users = [user_1, user_2];

// users.forEach(user => {
//   // user.jobs && user.jobs.length > 0 ? console.log(user.jobs[0].title) : console.log(null)
//   console.log(_.get(user, "jobs[0].title", "Thất nghiệp"))
// })

// _.set

// _.chain
const url = "https://cybersoft.edu.vn/abc/courses/1/chapters/2/videos/5";

const parseUrl = url.split("/")
const courseIndex = parseUrl.indexOf("courses")
const courseIdIndex = courseIndex + 1;

const getObjectId = (type) => {
  return _.chain(url)
    .split("/") // array
    .indexOf(type) // index cua course
    .thru(value => value + 1) // index cua courseId
    .thru(value => { // courseId can tim
      return _.chain(url)
        .split("/")
        .get(value)
        .value()
    })
    .value()
}

console.log(getObjectId("courses"))
console.log(getObjectId("chapters"))
console.log(getObjectId("videos"))