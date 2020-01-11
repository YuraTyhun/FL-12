const a = 2, b = 3, c = 7, d = 30, e = 10, f = 2019; 
// Task 1
function convert() {
    let arr = [];
    for (let i = 0; i < arguments.length; i++) {

        if (typeof arguments[i] === 'string') {
            arguments[i] = Number(arguments[i]);
        } else if (typeof arguments[i] === 'number') {
            arguments[i] = arguments[i].toString();
        }
        arr.push(arguments[i]);
    }
return arr;
}
convert('1',a);


// Task 2
function executeforEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
         callback(arr[i]);
    }
}
executeforEach([1,a], function(el) { 
    console.log(el * a); 
}); 


// Task 3
function mapArray(arr, callback) {
    let result = [];
    executeforEach(arr, function(el) {
    result.push(callback(Number(el)));
});
return result;
}
mapArray([a, '5'], function (el) {
   return el + b;
});


// Task 4
function filterArray(arr, callback) {
    let a = [], result = [];
    executeforEach(arr, function(el) {
    a.push(callback(el));
});
   for(let i = 0; i<a.length;i++){
     if(a[i]) {
       result.push(arr[i]);
     }
   } 
return result;
}
filterArray([a, b], function(el) { 
    return el % a === 0; 
});


// Task 5
function flipOver(str) {
    let temp = '';
    for(let i = str.length-1; i >= 0; i--) {
        temp = temp + str[i];
    }
    return temp;
}
flipOver('hey world');


// Task 6
function makeListFromRange(range) {
    let arr = [],
        start = range[0],
        end = range[1];
    for (let i = start; i<=end; i++) {
        arr.push(i);
    }
    return arr;
}
makeListFromRange([a, c]);

// Task 7
function getArrayOfKeys(arr, prop) {
   let result = [];
    executeforEach(arr, function (el) {
        result.push(el[prop]);
    });
return result;
}
const actors = [
    {
        name: 'tommy',
        age: 36
    },
    {
        name: 'lee',
        age: 28
    }
];
getArrayOfKeys(actors, 'name');


// Task 8
function substitute(arr) {
   return mapArray(arr, function(el) {
        if(el < d) {
          return '*';
        }
    return el; 
    });
}
substitute([a, e, f, c, b, d]);


// Task 9
function getPastDay(date, pastDays) {
    const milisecInDay = 86400000;
    return new Date(date - milisecInDay * pastDays).getDate();
}
const date = new Date(f, 0, a);
getPastDay(date, a);


// Task 10
function formatDate(date) {
  let year = date.getFullYear(),
  month = date.getMonth() + 1,
  day = date.getDate(),
  hours = date.getHours() < e ? `0${date.getHours()}` : date.getHours(),
  minutes = date.getMinutes();
return `${year}/${month}/${day} ${hours}:${minutes}`;
}
formatDate(new Date('6/15/2018 09:15:00'));










