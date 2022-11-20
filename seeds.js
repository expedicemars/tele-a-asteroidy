// const mongoose = require("mongoose")
// const Telemetry = require("./models/tele.js")
// const Asteroids = require("./models/asteroids.js")

const random = (min, max) => {
    return Math.floor((Math.random()*(max-min+1) + min)*100)/100
}

const dataGen = () => {return [
    {num: 01, name:"Temperature", value: random(19, 21).toString()},
    {num: 02, name:"Pressure", value: 14504.00.toString()},
    {num: 03, name:"Oxy. level", value: random(20.5, 21.5).toString()},
    {num: 04, name:"LPOT [rpm]", value: 5150.00.toString()},
    {num: 05, name:"LPOT [psia]", value: random(100, 422).toString()},
    {num: 06, name:"HPOT [rpm]", value: 28120.00.toString()},
    {num: 07, name:"HPOT [psia]", value: random(422, 7420).toString()},
    {num: 08, name:"LPFT [rpm]", value: 16185.00.toString()},
    {num: 09, name:"HPFT [rpm]", value: 35360.00.toString()},
    {num: 10, name:"CC Valve", value: random(64.5, 100).toString()},
    {num: 11, name:"POGO SS.", value: "true"},
    {num: 12, name:"GPC Status", value: "1 1 1 1 1"},
    {num: 13, name:"Purge seq.", value: "false"},
    {num: 14, name:"LH2 [psia]", value: random(28, 60).toString()},
    {num: 15, name:"He right [psia]", value: random(0, 1150).toString()},
    {num: 16, name:"He center [psia]", value: random(0, 1150).toString()},
    {num: 17, name:"He left [psia]", value: random(0, 1150).toString()},
    {num: 18, name:"He right r. [psia]", value: random(0, 820).toString()},
    {num: 19, name:"He center r. [psia]", value: random(0, 820).toString()},
    {num: 20, name:"He left r. [psia]", value: random(0, 820).toString()},
    {num: 21, name:"He right dP/dt", value: random(0, 29).toString()},
    {num: 22, name:"He center dP/dt", value: random(0, 29).toString()},
    {num: 23, name:"He left dP/dt", value: random(0, 29).toString()},
]}

// const seedDB = () => {
//     let data = dataGen()
//     Telemetry.deleteMany({}, (err) => {
//         if(err) { console.log(err) }
//         else {
//             data.forEach((seed) => {
//                 Telemetry.create(seed, (err, value) => {
//                     if(err) { console.log(err) }
//                 })
//             })
//         }
//     })
//     console.log("Tele seeding successful")
// }

const errors = [ //probably will be changed to method
    {
        num: [03],
        val: [random(7, 20)],
        command: "O2RES"
    }, {
       num: [04, 05],
        val: [random(5151, 7500), random(423, 500)],
        command: "STLPOT;STHPOT"
    }, {
       num: [10],
        val: [random(45, 63)],
        command: "RECCVL"
    }, {
       num: [14],
        val: [random(61, 75)],
        command: "STLH2S"
    }, {
       num: [15, 18, 21],
        val: [random(1151, 2000), random(821, 1000), random(30, 55)],
        command: "STHESS:r"
    }, {
       num: [16, 19, 22],
        val: [random(1151, 2000), random(821, 1200), random(30, 55)],
        command: "STHESS:c" 
    }, {
       num: [17, 20, 23],
        val: [random(1151, 2000), random(821, 1200), random(30, 55)],
        command: "STHESS:l"
    }, {
       num: [11],
        val: ["false"],
        command: "REPOGO:true"
    }, {
       num: [12],
        val: ["0 1 1 1 1"],
        command: "REGPC:1"
    }, {
       num: [12],
        val: ["1 0 0 1 0"],
        command: "REGPC:2;REGPC:3;REGPC:5"
    }, {
       num: [12],
        val: ["0 0 0 0 1"],
        command: "REGPC:1_4"
    }, {
       num: [12],
        val: ["0 1 1 0 1"],
        command: "REGPC:1;REGPC:4"
    }
]


// const seedAst = () => {
//     Asteroids.deleteMany({}, (err) => {
//         console.log(err?err:"Asteroids seeding successful")
//     })
// }
// const genAst = (nearest) => {
//     let angle = Math.random()*Math.PI*2
//     Asteroids.create({
//         dist: 1000,
//         angle: angle,
//         energy: random(5, 25),
//         nearest: nearest,
//         angle_init: angle
//     }, (err, val) => { console.log(err?err:("Asteroid created\n" + val)) })
// }
var astData = []
const seedAst = () => {
    astData = []
    console.log("Seeding asteroids successful")
}
const genAst = (nearest) => {
    let p = new Promise((resolve, reject) => {
        let angle = Math.random()*Math.PI*2
        if(angle) {
            resolve(angle)
        } else {
            reject("failure")
        }
    })
    p.then((angle) => {
        astData.push({
            dist: 1000,
            angle: angle,
            energy: random(5, 25),
            nearest: nearest,
            angle_init: angle,
            time_elapsed: 0
        })
        console.log("asteroid added")
        console.log(astData)
    }).catch((message) => {
        console.log(message)
    })
}

const simulateAst = () => {
    var simuInterval = setInterval(() => {
        for(let index = astData.length-1; index >= 0; index--) {
            let p = new Promise((resolve, reject) => {
                astData[index].time_elapsed++
                console.log(astData[index].time_elapsed)
                if(astData[index].time_elapsed<=60) { resolve("resolved") }
                else { reject("error") }
            })
            p.then((message) => {
                astData[index].dist = Math.abs((astData[index].nearest-1000)/30*astData[index].time_elapsed + (1000-astData[index].nearest))+astData[index].nearest
                astData[index].angle = astData[index].angle_init + Math.PI/2/60*astData[index].angle*astData[index].time_elapsed
            }).catch((message) => {
                astData.splice(index, 1)
            })
        }
    }, 1000)
}

const returnAst = () => {
    return astData
}
const resetAst = () => {
    for(let i = 0; i < astData.length; i++) {
        if(astData[i].nearest == 0) {
            astData.splice(i, 1)
        }
    }
}

module.exports = {
    //seedDB,
    seedAst,
    genAst,
    errors,
    simulateAst,
    returnAst,
    resetAst
}