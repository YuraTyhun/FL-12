// task1
const maxElement = (array) => Math.max(...array);

const arr1 = [1,2,3,4,56,7,8,76,5,241,5,356,567,2];
console.log(`task 1:`);
console.log(maxElement(arr1));

// task2
const copyArray = (arr) => [...arr];

const arr2 = [1,2,3];
const copiedArray = copyArray(arr2);
console.log(`task 2:`);
console.log(arr2, copiedArray);
console.log(arr2 === copiedArray);

// task3
const addUniqueId = (obj) => {
    let uniqueId = Symbol('identifier');
    const res = {...obj};
    res.id = uniqueId;
    return res;
}
const objTask3 = {name: 'Flash', speed: 3000};
console.log(`task 3:`);
console.log(addUniqueId(objTask3));
console.log(objTask3);


//task4
const regroupObject = (obj) => {
    let {name, details} = obj;
    return { 
        university : details.university, 
        user: { 
            age: details.age, 
            firstName: name, 
            id: details.id 
        }
    }
}

let objTask4 = {name: 'Someone', details: {id: 1, age: 11, university: 'UNI'}};
console.log(`task 4:`);
console.log(regroupObject(objTask4));
console.log(objTask4);

//task5
const findUniqueElements = (arr) => Array.from(new Set(arr));

const arr3 = [1,1,23,3,4,5,6,5,4,23,2,1,1,1,1,1];
console.log(`task 5:`);
console.log(findUniqueElements(arr3));

//task6
const hideNumber = (str) => str.slice(-4).padStart(str.length,'*'); 
 
 const phoneNumber = '0123456789';
 console.log(`task 6:`);
 console.log(hideNumber(phoneNumber));

 //task7
const add = (a = require(), b = require()) => a + b;

const require = () => { 
    throw new Error('Missing property!');
}
console.log(`task7:`);
console.log(add(1,3));
//console.log(add(1));

 //task8
 const getInfoPromise = (url) => {
    fetch(url)
    .then(result => result.json())
    .then(data => {
        let res = [];
        for (el of data) {
            res.push(el.name);
        }
        return res.sort();
    })
    .then(res => {
        console.log(`task8:`)
        console.log(res);
    })
    .catch(error => console.log(error));
}
getInfoPromise('http://jsonplaceholder.typicode.com/users');

//task9
const resultArray = (data) => {
    let res = [];
    for (el of data) {
        res.push(el.name);
    }
    return res.sort();
}

const getInfoAsync = async (url) => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        console.log(`task9:`);
        console.log(resultArray(data));
    } catch(err) {
        console.log(err);
    }
    
}
getInfoAsync('http://jsonplaceholder.typicode.com/users');
