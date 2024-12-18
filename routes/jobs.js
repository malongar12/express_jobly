const express = require("express")
const { authenticateJWT, ensureAdmin } = require('../middleware/auth');
const Job = require("../models/job")
const router = new express.Router();




router.get('/', async (req, res, next) => {
    const { title, minSalary, hasEquity } = req.query;
  
    try {
      const jobs = await Job.getAll({ title, minSalary, hasEquity });
      return res.json({ jobs });
    } catch (err) {
      return next(err);
    }
  });
  


router.get("/:id", async(req, res)=> {
   const id = parseInt(req.params.id)
    try {
        const job = await Job.get(id)
        if (!job) {
            res.status(400).send(`job with the id of ${id} NOT FOUND!!`)
        }
        res.status(200).json({job})
    } catch (error) {
        
    }


})


router.post('/', ensureAdmin, async (req, res, next) => {
    const { title, salary, equity, companyHandle } = req.body;
  
    try {
        if (!title && !salary && !equity && !companyHandle) {
            res.status(400).send("All input field require")
        }

      const createJob = await Job.create({ title, salary, equity, companyHandle });
      return res.status(201).json({ createJob });
    } catch (err) {
      return next(err);
    }
  });



  router.put('/:id', ensureAdmin, async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { title, salary, equity } = req.body;
  
    try {
      const job = await Job.update(id, { title, salary, equity });
      return res.json({ job });
    } catch (err) {
      return next(err);
    }
  });


  router.delete('/:id', ensureAdmin, async (req, res, next) => {
    const id = parseInt(req.params.id);
  
    try {
      const job = await Job.delete(id);
      return res.json({ job });
    } catch (err) {
      return next(err);
    }
  });






module.exports = router;