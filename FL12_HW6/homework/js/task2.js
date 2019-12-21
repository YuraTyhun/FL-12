let a = +prompt('Please, enter the first side:');
let b = +prompt('Please, enter the second side:');
let c = +prompt('Please, enter the third side:');

if (a <= 0 || b <= 0 || c <= 0 || parseInt(a) !== a || parseInt(b) !== b || parseInt(c) !== c) {
    alert('A triangle must have 3 sides with a positive definite length');
    alert('Input values should be ONLY numbers');
} else if (a + b < c || a + c < b || b + c < a) {
    alert('Triangle doesn’t exist');
} else if (a === b && b === c) {
    console.log('Equilateral triangle: a = ' + a + '; b = ' + b + '; c = ' + c);
} else if (a === b || b === c || a === c) {
    console.log('Isosceles triangle: a = ' + a + '; b = ' + b + '; c = ' + c);
} else if (a !== b && a !== c && b !== c) {
    console.log('Scalene triangle: a = ' + a + '; b = ' + b + '; c = ' + c);
}
