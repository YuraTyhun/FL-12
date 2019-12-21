let a = prompt('Please, input a');
console.log('a = ' + a);
let b = prompt('Please, input b');
console.log('b = ' + b);
let c = prompt('Please, input c');
console.log('c = ' + c);

let d, x, x1, x2;

if (isNaN(a) || isNaN(b) || isNaN(c) || !a || !b || !c || a === 0) {
    console.log('Invalid input data');
} else {
    console.log(a + 'x^2 + ' + b + 'x + ' + c + ' = 0' );
    d = b * b - 4 * a * c;

    if (d < 0) {
        console.log('No solution, Discriminant < 0');
    } else if (d === 0) {
        x = -b / (2 * a);
        console.log('Discriminant = 0, x = ' + Math.round(x));
    } else {
        x1 = (-b + Math.sqrt(d))/ 2 * a;
        x2 = (-b - Math.sqrt(d))/ 2 * a;
        console.log('Discriminant > 0: x1 = ' + Math.round(x1), 'x2 = ' + Math.round(x2));
    }
}

