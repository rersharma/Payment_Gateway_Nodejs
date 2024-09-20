const express=require('express')
const app=express()
const myrouter=require('./route')
const port=3456
app.set('view engine','ejs')

app.use('/static',express.static(__dirname+'/static'))
app.use(express.urlencoded({extended:true}))


app.use('/',myrouter)

app.listen(port,()=>
{
      console.log(`click here http://localhost:${port}`)
})