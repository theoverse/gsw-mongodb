const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err));

// Schema

/*

    const = [
        { name: 'user1', age: 20 },
        { name: 'user2', age: 30 },
    ]
*/

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isMarried: Boolean,
    salary: Number,
    gender: String,
});

const User = mongoose.model('User', userSchema)

// async function storeInformation() {
//     const user = new User({
//         name: 'Dorian',
//         age: '31',
//         isMarried: false,
//         salary: 80000,
//         gender: 'Male',
//     });

//     // store data in db
//     await user.save();
//     console.log(user)
// }
// storeInformation();



// get all data from db
async function fetchInformation() {
    const users = await User.find({});
    console.log(users)
}
// fetchInformation()



// get specific data from db
async function fetchSpecificInformation() {
    const users = await User.find({ isMarried: false, salary: 80000 });
    console.log(users)
}
// fetchSpecificInformation()



// query api
// select
async function fetchSelectQuery() {
    const users = await User.find({ isMarried: false }).select('name salary');
    console.log(users)
}
// fetchSelectQuery()

async function fetchSelectQuery() {
    const users = await User.find({ isMarried: false }).select('-name -salary');
    console.log(users)
}
// fetchSelectQuery()

// sort
async function fetchSortQuery() {
    // ascending, descending add - to salary
    const users = await User.find({ isMarried: false }).select('name salary').sort('salary');
    console.log(users)
}
// fetchSortQuery()

// limit
async function fetchLimitQuery() {
    const users = await User.find({ isMarried: false }).select('name salary').sort('salary').limit(2);
    console.log(users)
}
// fetchLimitQuery()

// count
async function fetchCountQuery() {
    const users = await User.find({ isMarried: false }).countDocuments();
    console.log(users)
}
// fetchCountQuery()



// Comparison Operator

/*
eq - equal
ne - not equal
gt - greater than
gte - greater than equal
lt - less than
lte - less than equal
in - in
nin - not in

And
Or
*/

async function fetchComplexQuery1() {
    const users = await User.find({ age: { $gt: 30 } });
    console.log(users)
}
// fetchComplexQuery1()

// in and nin
async function fetchComplexQuery2() {
    const users = await User.find({ salary: { $in: [25000, 40000, 45000] } });
    console.log(users)
}
// fetchComplexQuery2()

// And, Or
async function db() {
    const users = await User.find().or([{ isMarried: true }, { age: 30 }]);
    console.log(users)
}
// db()



// update document: method 1
async function updateDoc1() {
    const user = await User.findById('621dfedfbdbbfc8ae5de12fd');
    user.isMarried = true;
    await user.save();
}
// updateDoc1()

// update document: method 2
async function updateDoc2() {
    const user = await User.findByIdAndUpdate(
        '621dfedfbdbbfc8ae5de12fd',
        { age: 45, isMarried: false },
        { new: true, runValidators: true }
    );
}
// updateDoc2()



// delete document: method 1
async function deleteDoc1() {
    await User.deleteOne({ _id: '621dfedfbdbbfc8ae5de12fd' })
}
// deleteDoc1()

// delete document: method 2
async function deleteDocs() {
    await User.deleteMany({ isMarried: false }) // note: blank will delete all
}
// deleteDocs()

// delete document: method 3
async function deleteDoc2() {
    await User.findByIdAndDelete('6027d22c7dd46d17c04bdf90')
}
// deleteDoc2()



// Problem Solve
// Find those users whoose age is greater then 40 or they are unmarried
// Find only name
// Sorted then by name

async function ps() {
    const users = await User.find().or([
        { age: { $gt: 40 } },
        { isMarried: false }
    ]).select('name').sort();
    console.log(users)
}

// ps();

