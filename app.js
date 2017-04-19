//this is my state object - I think I only need one. It's in global scope.
var state = {
	items: []
};
// this is what gives me the code that I need for the HTML - it's in global scope.
var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);
//State modification functions
var addItem = function(state, item) {
	state.items.push({
		displayName: item,
		checked: false
	});
};
function deleteItem(state, itemIndex) { 
	state.items.splice(itemIndex, 1);
}
function checkItem(state, index){
	state.items[index].checked = true;
}

//Render functions - these tell the html what to do

var renderItem = function(state, item, index) {
	var element = $(listItemTemplate);
	element.attr('index', index);
  	element.find('.js-shopping-item').text(item.displayName);
  	if (item.checked === true) {
  		element.find('.js-shopping-item').addClass('shopping-item__checked');
  	}
  	//add the class here if checked has a true value
	return element;
};
var renderList = function(state, element) {
	//[1,2,3]
	//(1, 0),(2, 1),(3, 2)
	var itemsHTML = state.items.map(
		function(item, index) { //<- why is index in there?
			return renderItem(state, item, index);
		});
	element.html(itemsHTML);
}
//Event listeners
function handleFormSubmit() {
$('form').submit(function(event) {
    event.preventDefault();
   	addItem(state, $("#shopping-list-entry").val());
    renderList(state, $(".shopping-list"));
    this.reset();
  });
} 
function handleDeletes() {
	$('.shopping-list').on('click', '.js-shopping-item-delete', function(event) {
		var index = $(this).closest('li').attr('index');
		deleteItem(state, index);
		renderList(state, $(".shopping-list"));
	});
}
function handleChecks() {
	$('.shopping-list').on('click', '.js-shopping-item-toggle', function(event) {
		var index = $(this).closest('li').attr('index');
		checkItem(state, index);
		console.log(state.items[index].checked);
		renderList(state, $(".shopping-list"));
	});
}
//this is my ready code.
 $(function() {
 	handleFormSubmit();
 	handleDeletes();
 	handleChecks();
 });