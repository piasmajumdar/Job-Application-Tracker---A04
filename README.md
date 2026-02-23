## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

We use getElementId when we need the element by using their ID.
We use getElementsByClassName when we access the element by Class Name.
We can use querySelector for accessing the element by their class name, id as well as their tag name but it'll give only first one element which has been matched first.
And querySelectorAll is almost same like querySelector for accessing elements by their class name, id and their tag name, but it gives all the matched elements according to className or tag name. 

Example- 
 1. document.getElementById('main-container'); //gives one element where id is 'main-container'
 2. document.getElementsByClassName('card'); // gives HTMLCollection of all elements where class name is 'card'
 3. document.querySelector('.card'); // gives the first card of the document where class name is 'card'
 4. document.querySelectorAll('.card'); // gives NodeList of all the card of the document where class name is 'card'


### 2. How do you create and insert a new element into the DOM?

We can create element by document.createElement('div'), and to insert this new element into the DOM we use  appendChild(newElement).

Example- 
const newDiv = document.createElement('div'); // create new div
const main = document.querySelector('main'); // select the parent
main.appendChild(newDiv); // append the new div to its parent node

### 3. What is Event Bubbling? And how does it work?

It is a mechanism in the DOM, where an event starts from the target element and then bubbles up to its parent elements one by one. It stops when it reaches the root element. 

When we click a child element of li. 
 - li-> ul -> div -> body -> document

The event moves upward. This is called bubbling.

### 4. What is Event Delegation in JavaScript? Why is it useful?
Event Delegation is almost same but here we attach event listener to a parent element instead of attaching event listeners to child elements. And if we clicked a child element , the event bubbles up to its parent and we get that element. 

Example - document.getElementById("parent").addEventListener("click", function(e) { })

### 5. What is the difference between preventDefault() and stopPropagation() methods?

event.preventDefault() stops the default behavior of an element but it does not stop event bubbling. 
On the other hand, event.stopPropagation() stops the event from bubbling going up but it does not stop default behavior.

Example of preventDefault():
- If we click the link it opens page but with preventDefault(), clicking the link does not open page . Because default action stopped but event still bubbles.

Example of stopPropagation(): 
- If we click the link, child event will run only but parent event will not run.
