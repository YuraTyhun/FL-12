const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");
const $item = $(".item");

let todos = [];

(function ($) {
  $.fn.getFromStorage = () => {
    if(localStorage.getItem("todoList")) {
      todos = JSON.parse(localStorage.getItem("todoList"));
      $(todos).each((i,elem) => {
        let done = elem.done ? 'done' : '';
        let listItem = `<li class="item"><span class="item-text ${done}">${elem.text}</span>
          <button class="item-remove">Remove</button></li>`;
        $(".list").append(listItem);
      })
    }
  }
})(jQuery);

$(document).ready().getFromStorage();

// add new item
$add.click(function(e) {
  e.preventDefault();
  let getInput = $input.val();
  if(!getInput) {
    alert('Field is empty. Please, enter new task');
  } else {
    let todoItem = {text:getInput, done: false};
    todos.push(todoItem);
    let listItem = `<li class="item"><span class="item-text">${getInput}</span>
      <button class="item-remove">Remove</button></li>`;
    $(".list").append(listItem);
    $input.val("");
    localStorage.setItem("todoList", JSON.stringify(todos));
  }
});

// remove item from the list
$list.on("click", ".item-remove", function(e) {
  e.preventDefault();
  let i = $list.children().index($(this).parent());
  $(this).parent().remove();
  todos.splice(i, 1);
  localStorage.setItem("todoList", JSON.stringify(todos));
});

// mark tasks as "done" or "undone"
$(document).on("click", ".item-text", function() {
  $(this).toggleClass("done");
  let i = $list.children().index($(this).parent());
  if(todos[i].done) {
    todos[i].done = false;
  } else {
    todos[i].done = true;
  }
  localStorage.setItem("todoList", JSON.stringify(todos));
});

// search task
$("#search").click(e => {
  let value = $("#search-input").val();
  e.preventDefault();
  if(!value) {
    alert('Field is empty. Please, enter smth for search');
  } else {
    $(todos).each(() => {
        $(`.item-text:contains(${value})`).animate({fontSize: "2em"}, 1000,  () => {
          $(`.item-text:contains(${value})`).animate({fontSize: "1em"}, 2000);
        });
    });
  }
});


