const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser")
    //   mongoose   = require("mongoose")
    //   Telemetry  = require("./models/tele.js"),
    //   Asteroids  = require("./models/asteroids.js")
const {/*seedDB,*/ seedAst, genAst, errors, simulateAst, returnAst, resetAst} = require("./seeds.js")

// mongoose.connect("mongodb://localhost:27017/simulation", {useNewUrlParser: true})
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
//seedDB()
seedAst()

app.get("/admin", (req, res) => {
    // Asteroids.find({}, (err, data) => {
    //     if(err) { console.log(err) }
    //     else { res.render("admin", {asteroids: data}) }
    // })
    res.render("admin", {asteroids: returnAst()})
})
//generate asteroid to approach the ship in ...
//choose the message for when hit by an asteroid
//cancel the hit from an asteroid

//should be protected from access by the crew

//display asteroids
var isAlarm = false
var timeRem = 0
var message = ""
const timer = () => {
    let interval = setInterval(() => {
        timeRem--
        if(timeRem < 1) {
            clearInterval(interval)
        }
    }, 1000)
}
var hitTimeout
app.post("/admin/add", (req, res) => {
    const time = req.body.time
    message = req.body.message
    genAst(0)
    hitTimeout = setTimeout(() => {
        isAlarm = true
        timeRem = Number(time.substring(0, 2))*3600+Number(time.substring(3,5))*60+Number(time.substring(6))
        setTimeout(() => {
            isAlarm = false
        }, 1000*(timeRem))
        timer()
    }, 30000)
    res.redirect("/admin")
})

app.post("/admin/reset", (req, res) => {
    isAlarm = false
    timeRem = 0
    resetAst()
    clearTimeout(hitTimeout)
    res.redirect("/admin")
})

// app.get("/tele", (req, res) => {
//     if(errNo == -1) {
//         seedDB()
//         teleTimeout(12000) //60000*(Math.random()*90+30)
//     }
//     Telemetry.find({}).sort("num").exec((err, data) => {
//         if(err) {console.log(err)}
//         else {
//             console.log(data)
//             res.render("tele", {
//             data: data, 
//             errNums: (errNo==-1?[]:errors[errNo].num)
//         })}
//     })
// })
//display the data, allow them to deal with the warnings

var errNo = -1
var isTimeout = false
// const teleTimeout = (time) => {
//     if(isTimeout == false) {
//         setTimeout(() => {
//             isTimeout = false

//             errNo = Math.floor(Math.random()*errors.length) //determine error number
//             //loop through numbers, change DB vals to val, change colors to red in DOM
//             for(let i = 0; i < errors[errNo].num.length; i++) {
//                 Telemetry.findOneAndUpdate(
//                     {num: errors[errNo].num[i]},
//                     {value: errors[errNo].val[i].toString()},
//                     (err) => { console.log(err?err:"Error introduced") })
//             }
//             //stop seeding till fixed
//             //display the form (DOM)
//             //
//             console.log(errNo)
//         }, time)
//         isTimeout = true
//     }
// }


app.post("/tele", (req, res) => {
    const body = req.body
    errNo = (errors[errNo].command == body.command ? -1 : errNo)
    console.log("Errno"+errNo)
    seedDB()
    res.redirect("/tele")
})

//could be conditional, would be called everytime the condition became true
//if there is a hit, it wont be generating them, after the time passes, it will
const timerAst = () => {
    setTimeout(() => {
        genAst(Math.floor(Math.random()*900+50))
        timerAst()
    }, 1000*Math.floor(Math.random()*10+10))    
}
timerAst()

// const simulateAst = () => {
//     //take the position of an asteroid, and move it along a path with each interval in mongo
//     var simuTime = 0
//     var simuInterval = setInterval(() => {
//         simuTime += 10
//         Asteroids.find({}, (err, data) => {
//             if(err) { console.log(err) }
//             else {
//                 console.log(data)
//                 console.log(mongoose.Types.ObjectId(data._id))
//                 Asteroids.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), {
//                     dist: Math.abs((data.nearest-1000)/30*simuTime + (1000-data.nearest))+data.nearest,
//                     angle: data.angle_init + Math.PI/2/60*data.angle
//                 }, (err, asteroid) => {
//                     console.log(err?err:asteroid)
//                 })
//             }
//         })
//         if(simuInterval == 60) { clearInterval(simuInterval) }
//     }, 10000)
// }
simulateAst()

app.get("/asteroids", (req, res) => {
    // Asteroids.find({}, (err, data) => {
    //     if(err) { console.log(err) }
    //     else { res.render("asteroids", {asteroids: data}) }
    // })
    console.log(returnAst())
    res.render("asteroids", {asteroids: returnAst(), isAlarm: isAlarm, timeRem: timeRem, message: message})
})

// var isInterval = false
// const astInterval = () => {
//     if(!isInterval) {
//         isInterval = true //should there be statement changing it to false?
//     }
// }
//randomly generates asteroids, provides its data
//rotating radar
//visualize asteroids randomly
//display what needs to be done after being hit by asteroid
//after refresh, data of asteroids to hit ship need to be kept
//should actively pull the data from backend

app.listen(3000, function() {
	console.log("Server running at 3000")
})