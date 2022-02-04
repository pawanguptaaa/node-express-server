const express = require('express');
const Joi = require('joi');
const authentication = require('./authentication');
//const port = 3000;
const app = express(); // Express application

app.use(express.json()); // data will be in json format

const courses = [
   { id: 1, name: 'course1'},
   { id: 2, name: 'course2'},
   { id: 3, name: 'course3'}
];

// route handlers....
app.get('/', (req,res) =>{
    res.send('Hello World');
});

app.get('/api/courses',authentication, (req,res) =>{
    res.send(courses);
});

app.get('/api/courses/:id' , (req,res) =>{
    const course =courses.find(c =>c.id ===parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);
});

app.post('/api/courses' , (req,res) => {
    const { error } = validateCourse(req.body);
     if(error){
        // 404 bad request..
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,    
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req,res) => {
    // lookup the course
    // if not existing, return 404
    const course =courses.find(c =>c.id ===parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found');
    
    // validate
    // if invalid, return 400 - bad request
    
    const { error } = validateCourse(req.body);
     if(error){
        // 404 bad request..
        return res.status(400).send(result.error.details[0].message);
        
    }
    // update course
    // return the updataed course
    course.name = req.body.name;
    res.send(course);
});

// validation logic...
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
     };
     return Joi.validate(course,schema);

}

app.delete('/api/courses/:id', (req,res) => {
    // lookup the course
    // Not existing, return 404
    const course =courses.find(c =>c.id ===parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found');

    //delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    // return the same course
    res.send(course);
})

const port = process.env.PORT || 3000;    // setting env var ... use exoprt command...
app.listen(port, () => console.log(`Listning on port ${port}...`));
