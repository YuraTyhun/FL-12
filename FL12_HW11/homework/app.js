const structure = [
    {
        'folder': true,
        'title': 'Films',
        'children': [
            {
                'title': 'Iron Man.avi'
        },
            {
                'folder': true,
                'title': 'Fantasy',
                'children': [
                    {
                        'title': 'The Lord of the Rings.avi'
            },
                    {
                        'folder': true,
                        'title': 'New folder 1',
                        'children': false
            }
          ]
        }
      ]
    },
    {
        'folder': true,
        'title': 'Documents',
        'children': [
            {
                'folder': true,
                'title': 'EPAM Homework answers',
                'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

function toggleCallBack() {

    let icon = this.children[0].innerHTML;
    
    if (icon === 'folder_open') {
        this.children[0].innerHTML = 'folder'; 
    } else {
        this.children[0].innerHTML = 'folder_open'; 
    }
    
    let folderBlock = this.nextElementSibling.style.display;
    
    if (folderBlock === 'block') {
        this.nextElementSibling.style.display = 'none';
    } else {
        this.nextElementSibling.style.display = 'block';
    }

}


function drawTree(structure, parentElem) {
    
    structure.forEach(el => {

        let li = document.createElement('li');
        let h4 = document.createElement('h4');
        let span = document.createElement('span');
        let i = document.createElement('i');
        i.className = 'material-icons';
        i.innerHTML = !el.folder ? 'insert_drive_file' : 'folder';
        
        h4.className = el.folder ? 'folder' : '';
        
        el.folder ? h4.addEventListener('click', toggleCallBack) : null;
        
        span.innerHTML = el.title;
        h4.appendChild(i);
        h4.appendChild(span);
        li.appendChild(h4);
        parentElem.appendChild(li);
        
        if (!el.children && el.folder) {
            
            let emptyUl = document.createElement('ul');
            let emptyLi = document.createElement('li');
            let emptyH4 = document.createElement('h4');
            
            emptyH4.innerHTML = 'Folder is empty';
            emptyH4.style.fontStyle = 'italic';
            
            emptyLi.appendChild(emptyH4);
            emptyUl.appendChild(emptyLi);
            emptyUl.style.display = 'none';
            
            li.appendChild(emptyUl);
        }
        
        if (el.children) {
            
            let childUl = document.createElement('ul');
            childUl.style.display = 'none';
            li.appendChild(childUl);
            
            drawTree(el.children, childUl);
        }
    });  
}

let parentUl = document.createElement('ul');
drawTree(structure, parentUl);
rootNode.appendChild(parentUl);


