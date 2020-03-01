const spinnerElem = '<img src="img/spinner.gif" />';
class UserInfo {
    constructor (obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.username = obj.username;
        this.email = obj.email;
        this.street = obj.address.street;
        this.suite = obj.address.suite;
        this.city = obj.address.city;
        this.zipcode = obj.address.zipcode;
        this.phone = obj.phone;
        this.website = obj.website;
        this.companyName = obj.company.name;
        this.catchPhrase = obj.company.catchPhrase;
        this.bs = obj.company.bs;
        
        this.mainNode = document.createElement('div');
        this.mainNode.classList = 'container pb-5 mt-3 bg-light';

        this.nameElem = document.createElement('a');
        this.nameElem.classList = 'display-4';
        this.nameElem.href = '#' + this.id;
        this.usernameElem = document.createElement('p');
        this.emailElem = document.createElement('p');
        this.addressElem = document.createElement('p');
        this.phoneElem = document.createElement('p');
        this.websiteElem = document.createElement('p');
        this.companyElem = document.createElement('p');

        // add an image for each user
        this.image = document.createElement('img');
        this.image.classList = 'image';

        fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(result => { 
            this.image.src = result[0].url; 
        });

        //create edit btn
        this.editBtn = document.createElement('button');
        this.editBtn.classList = 'btn btn-success';
        this.editBtn.innerHTML = 'Edit';
        this.editBtn.addEventListener('click', this.editInfo);
        
        //create delete btn
        this.deleteBtn = document.createElement('button');
        this.deleteBtn.classList = 'btn btn-danger ml-1';
        this.deleteBtn.innerHTML = 'Delete';
        this.deleteBtn.addEventListener('click', this.deleteUser);

        //add spinner
        this.spinner = document.createElement('div');
        this.spinner.innerHTML = spinnerElem;
        this.spinner.classList = 'spinner';

        return this.displayUserInfo();
    }

    // create edit form
    editInfo = () => {
        const html = `<div class="edit text-info font-weight-bold"> 
            <p class="text-center text-dark mt-2">Modify User Info</p>
            <label>Name</label> <input type="text" id="name" value="${this.name}">
            <label>User Name</label> <input type="text" id="username" value="${this.username}">
            <label>E-Mail</label> <input type="text" id="email" value="${this.email}">
            <label>Street</label> <input type="text" id="street" value="${this.street}">
            <label>Suite</label> <input type="text" id="suite" value="${this.suite}">
            <label>City</label> <input type="text" id="city" value="${this.city}">
            <label>ZipCode</label> <input type="text" id="zipcode" value="${this.zipcode}">
            <label>Phone Number</label> <input type="text" id="phone" value="${this.phone}">
            <label>Website</label> <input type="text" id="website" value="${this.website}">
            <label>Company Name</label> <input type="text" id="compname" value="${this.companyName}">
            <label>Catch Phrase</label> <input type="text" id="phrase" value="${this.catchPhrase}">
            <label>BS</label> <input type="text" id="bs" value="${this.bs}">
        <button class="btn btn-success mt-3 save">Save</button>
        <button class="btn btn-danger mt-3 cancel">Cancel</button>
        </div>`;
        document.querySelector('.edit-wrapper').insertAdjacentHTML('afterbegin', html);
        document.querySelector('.edit-wrapper').style.display = 'block';

        document.querySelector('.save').addEventListener('click', this.saveBtn);
        document.querySelector('.cancel').addEventListener('click', this.cancelBtn);
        
        this.removeSpinner();
        this.displayUserInfo();

    }

    // save changes after edit
    saveBtn = async () => {
        this.name = document.getElementById('name').value;
        this.username = document.getElementById('username').value;
        this.email = document.getElementById('email').value;
        this.street = document.getElementById('street').value;
        this.suite = document.getElementById('suite').value;
        this.city = document.getElementById('city').value;
        this.zipcode = document.getElementById('zipcode').value;
        this.phone = document.getElementById('phone').value;
        this.website = document.getElementById('website').value;
        this.companyName = document.getElementById('compname').value;
        this.catchPhrase = document.getElementById('phrase').value;
        this.bs = document.getElementById('bs').value;

        this.displaySpinner();
        document.querySelector('.edit-wrapper').style.display = 'none';
        document.querySelector('.edit').remove();
        
        await fetch('https://jsonplaceholder.typicode.com/users/' + this.id, {
        method: 'PUT',
        body: JSON.stringify({
            name: this.name,
            username: this.username,
            email: this.email,
            address: {
                street: this.street,
                suite: this.suite,
                city: this.city,
                zipcode: this.zipcode
            },
            phone: this.phone,
            website: this.website,
            company: {
                name: this.companyName,
                catchPhrase: this.catchPhrase,
                bs: this.bs
            }
            })
        });
        
        this.removeSpinner();
        this.displayUserInfo();
    }

    cancelBtn () {
        document.querySelector('.edit-wrapper').style.display = 'none';
        document.querySelector('.edit').remove();
    }

    deleteUser = async () => {
        this.displaySpinner();
        await fetch('https://jsonplaceholder.typicode.com/users/' + this.id, {
            method: 'DELETE'
        });
       this.mainNode.remove();
    }

    displayUserInfo() {
        this.nameElem.innerHTML = this.name;
        this.usernameElem.innerHTML = `User Name: ${this.username}`;
        this.emailElem.innerHTML = `E-Mail: ${this.email}`;
        this.addressElem.innerHTML = `Address Info: ${this.street}, ${this.suite}, ${this.city}, ${this.zipcode}`
        this.phoneElem.innerHTML = `Phone Number: ${this.phone}`;
        this.websiteElem.innerHTML = `Website: ${this.website}`;
        this.companyElem.innerHTML = `Company info: ${this.companyName}, ${this.catchPhrase}, ${this.bs}`;
    
        this.mainNode.append(this.image, this.nameElem, this.usernameElem, this.emailElem, this.addressElem, 
            this.phoneElem, this.websiteElem, this.companyElem, this.editBtn, this.deleteBtn);
        return this.mainNode;
    }

    displaySpinner() {
        this.mainNode.append(this.spinner);
    }

    removeSpinner() {
        this.spinner.remove();
    }
}

class CreateUsersList {
    constructor () {
        this.list = document.createElement('div');
        this.getUsers();
        return this.displayUsers();
    }

    async getUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
        this.displayUsers();

    }

    displayUsers() {
        if(this.users) {
            this.list.innerHTML = '';
            this.users.forEach(elem => this.list.append(new UserInfo(elem)));
        } else {
            this.list.innerHTML = spinnerElem;
        }
        return this.list;
    }

}

class UserPosts {
    constructor () {
        this.getPosts();
        this.postsList = document.createElement('div');
        this.backBtn = document.createElement('button');
        this.postsList.classList = 'container pt-3';

        this.backBtn.innerHTML = 'Back';
        this.backBtn.classList = 'btn btn-warning mb-2';
        this.backBtn.addEventListener('click', () => window.location.hash = '');

        return this.displayPost();
    }

    async getPosts() {
        const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${location.hash.substring(1)}`);
        this.posts = await responsePosts.json();
        this.posts.forEach(async post => {
            const responseComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
            post.comments = await responseComments.json();
            this.displayPost();
        });
    }

    displayComments(comments) {
        const list = document.createElement('div');
        if(comments) {
            comments.forEach(comment => {
                const commentElem = document.createElement('div');
                commentElem.innerHTML = comment.body;
                commentElem.classList = 'pl-5 comment';
                list.append(commentElem);
            });
        } else {
            list.innerHTML = spinnerElem;
        }
        return list;
    }

    displayPost() {
        this.postsList.innerHTML = '';
        this.postsList.append(this.backBtn);
        if(this.posts) {
            this.posts.forEach(post => {
                const postElem = document.createElement('div');
                postElem.innerHTML = post.body;
                postElem.classList = 'mb-4 post';
                postElem.append(this.displayComments(post.comments));
                this.postsList.append(postElem);
            });
        } else {
            this.postsList.innerHTML = spinnerElem;
        }
        return this.postsList;
    }
}

class InitApp {
    constructor () {
        this.root = document.getElementById('root');
        this.display();

        window.onhashchange = () => this.display();
    }

    display() {
        this.root.innerHTML = '';
        if(window.location.hash) {
            this.root.append(new UserPosts);
        } else {
            this.root.append(usersList);
        }
    }

}

const usersList = new CreateUsersList;
const app = new InitApp;

