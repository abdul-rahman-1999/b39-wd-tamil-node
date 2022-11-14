// const add = (a,b) => a+b;
// console.log(add(5,7))


// const add = (a,b) => a+b;
// // console.log(process.argv)
// const [, ,n1,n2] = process.argv;
// console.log(add(+n1,+n2));

// const os = require('os');
// console.log('Free Ram',os.freemem()/1024/1024/1024)
// console.log('Total Ram',os.totalmem()/1024/1024/1024)
// console.log('version',os.version())
// console.log('processor',os.cpus())

// const fs = require('fs')
// import fs from 'fs'  // This usesd in module which we have to change in package.json
// const text1 = 'hi syed how are you..?'
//const [, , num] = process.argv 
// for(let i=1;i<=num;i++){
//     fs.writeFile(`./backup/text${i}.html`, text1, (err) => {
//         console.log('completed writing')
//     })
// }

// fs.writeFile(`./backup/hello.html`, text1, (err) => {
//     console.log('completed writing')
// })

// fs.readFile(`./msg1.txt`,'utf-8', (err,data) => {
//     if(err){
//         console.log('Error',err)
//     }else{
//         console.log(data)
//     }
// })

// const quote3 = 'Dream without fear, love without limits'
// fs.appendFile('./msg1.txt', '\n' + quote3, (err) => {
//     console.log('completed updating')
// })

// fs.unlink('./del_css.css', (err) => {
//     console.log("completed deleting")
// })


// fs.unlink('./msg1.txt', (err) => {
//     console.log("completed deleting")
// })

// const append = "Ashok Kumar"

// fs.appendFile('./msg1.txt',append,(err) => {
//     console.log("Message has been Updated")
// })


