const express= require('express')
const router = express.Router()
const mongoose=require('mongoose')
const stats = require('../models/stats')
const passport = require('passport');
require('../passport')

const Profile = require("../models/stats")
router.get('/', passport.authenticate('jwt', {session:false}),(req, res, next)=>
{
    Profile.find()
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            stats: docs.map(doc =>{
                return {
                    _id:doc.id,
                    Country:doc.Country,
                    State: doc.State,
                    District:doc.District,
                    Recovered:doc.Recovered,
                    Area: doc.Area,
                    Landmark: doc.Landmark,
                }
            })
        }
        console.log(docs)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
router.post('/', passport.authenticate('jwt', {session:false}), (req, res, next)=>
{
    const person = new Profile({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age:req.body.age
    })
    person.save().then(result =>{
        console.log(result)
        res.status(201).json({
            message: 'Handling POST requests to /Govt dashboard',
            createdProfile: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
})

/*
router.patch('/:personId', (err,req,res,next)=>{
    const id = req.params.statsId
    const updateOps ={}
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value
    }
    Stats.update({ _id:id}, { $set : updateOps})
    .exec()
    .then( result=> {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })  
})

router.delete('/:personId', (req,res,next)=>{
    const id=req.params.personId
    Profile.findByIdAndDelete({ _id:id})
    .exec()
    .then( result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })    
})
*/

module.exports = router;