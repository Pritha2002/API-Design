const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors');


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

const dbName = 'JSProject';

async function getStudents() {

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('Student');

    const students = collection.find({});

    const stds = [];
    for await (const docs of students) {
        stds.push(docs);
    }
    return stds;
}

async function getStudentByRoll(roll) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Student");

    // console.log(typeof roll);

    const students = collection.find({"Roll":roll});
    const stds = [];
    for await (const docs of students) {
        stds.push(docs);
    }
    return stds;
}
app.get('/getAllStudents', (req, res) => {
    getStudents()
        .then(val => res.send(val))
        .catch(console.error)
        .finally(() => client.close());

})
app.get('/getAllStudents/:roll', (req, res) => {
    getStudentByRoll(req.params.roll)
        .then(val => res.send(val))
        .catch(console.error)
        .finally(() => client.close());
})

app.listen(3000)