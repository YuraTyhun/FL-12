//task2
class Employee {
    constructor({id,firstName,lastName,birthday,salary,position,department}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.salary = salary;
        this.position = position;
        this.department = department;
        Employee.EMPLOYEES.push(this);
    }

    static EMPLOYEES = [];

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get age() {
        let todayDate = new Date();
        let bDayDate = new Date(this.birthday);
        return todayDate.getFullYear() - bDayDate.getFullYear();
    }

    quit() {
        if (Employee.EMPLOYEES.includes(this)) {
            Employee.EMPLOYEES.splice(Employee.EMPLOYEES.indexOf(this), 1);
        }
    }

    retire() {
        this.quit();
        console.log('It was such a pleasure to work with you!');
    }

    getFired() {
        this.quit();
        console.log('Not a big deal!');
    }

    changeDepartment(newDepartment) {
        this.department = newDepartment;
    }

    changePosition(newPosition) {
        this.position = newPosition;
    }

    changeSalary(newSalary) {
        this.salary = newSalary;
    }

    getPromoted(benefits) {
        if (benefits.salary) {
            this.salary += benefits.salary;
        } else if (benefits.position) {
            this.position = benefits.position;
        } else if (benefits.department) {
            this.department = benefits.department;
        }
        console.log('Yoohooo!');
    }

    getDemoted(punishment) {
        if (punishment.salary) {
            this.salary -= punishment.salary;
        } else if (punishment.position) {
            this.position = punishment.position;
        } else if (punishment.department) {
            this.department = punishment.department;
        }
        console.log('Damn!');
    }

}

class Manager extends Employee {

    constructor(id,firstName,lastName,birthday,salary,department){
        super(id,firstName,lastName,birthday,salary,department);
        this.position = 'manager';
    }
    
    
    get managedEmployees() {

        return Employee.EMPLOYEES.filter(employee => {
           return employee.position !== 'manager' && employee.department === this.department;
        });
    }
}

class BlueCollarWorker extends Employee {}

class HRManager extends Manager {
    
    constructor(id,firstName,lastName,birthday,salary){
        super(id,firstName,lastName,birthday,salary);
    }
    department = 'hr';
}

class SalesManager extends Manager {
    constructor(id,firstName,lastName,birthday,salary){
        super(id,firstName,lastName,birthday,salary);
    }
    department = 'sales';
}

//task3
const promoter = (managerPro) => ({
    promote: (index, benefit) => {
        managerPro.managedEmployees.find((employee) => employee.id === index).getPromoted({salary:benefit});
    }
});

function ManagerPro(managerPro) {
    return Object.assign(managerPro, promoter(managerPro));
}

//test cases
const salesManager = new SalesManager({
    id:1,
    firstName:'John',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000
});

const hrManager = new HRManager({
    id:2,
    firstName:'Bob',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000
});

const blueCollarWorkerOne = new BlueCollarWorker({
    id:3,
    firstName:'Mary',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000,
    position: 'office worker',
    department: 'sales'
});

const blueCollarWorkerTwo = new BlueCollarWorker({
    id:4,
    firstName:'Jane',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000,
    position: 'office worker',
    department: 'hr'
});

console.log(Employee.EMPLOYEES);

console.log(salesManager.getPromoted({salary:7500}));
console.log(salesManager);

console.log(blueCollarWorkerTwo.birthday);
console.log(blueCollarWorkerTwo.fullName);
console.log(blueCollarWorkerTwo.age);

const managerPro = ManagerPro(salesManager);
console.log(managerPro.promote(3, 6000));
console.log(blueCollarWorkerTwo);
console.log(blueCollarWorkerOne);
console.log(blueCollarWorkerOne.getFired());

console.log(Employee.EMPLOYEES);
