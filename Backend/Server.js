const express = require('express');
const mongoos = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const todomodel = require('./Model.js')
// routing

//post
app.post('/add',(req,res)=>{
    const text = req.body.text;
    todomodel.create({
        text:text,complete:false
    }).then((result)=>{
        res.json(result);
        console.log("Todo Created"+result);
    }).catch((err)=>{
        res.json(err);
        console.log("Error creating todo"+err);
    })
})

app.get('/get',(req,res)=>{
        todomodel.find()
        .then((result)=>{
            res.json(result);
        }).catch((err)=>{
        res.json(err);
    })
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    todomodel.findByIdAndDelete({_id:id}).then((result)=>{
        res.json(result);
    }).catch((err)=>{
        res.json(err);
    })
})

app.put('/edit/:id',(req,res)=>{
    const id = req.params.id;
    const newtext = req.body.text;
    todomodel.findByIdAndUpdate(id,{text:newtext},{new:true})
    .then((result)=>{
        res.json(result);
    }).catch((err)=>{
        res.json(err);
    })
})


app.put('/editcomplete/:id', (req, res) => {
    const id = req.params.id;
    
    todomodel.findById(id)
    .then((todo) => {
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        return todomodel.findByIdAndUpdate(id, { complete: !todo.complete }, { new: true });
    })
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });
});


// connect to mongodb
mongoos.connect('mongodb://localhost:27017/TodoList').then((res)=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error Connecting Mongoos "+err);
})
app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})