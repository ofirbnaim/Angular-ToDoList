import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Interfaces/todo';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],

  //Animations
  animations:[
    //Array with 2 parameters
    //'fade' is the trigger name - cannot change it
    trigger('fade', [
      
      //Variable number 1 - - when the animation goes in
      transition(':enter', [ 
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(300, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      //Variable number 2 - when the animation goes out
      transition(':leave', [
        animate(300, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
]//End of animations   
})


export class TodoListComponent implements OnInit {
  
   //Initial empty array of 'Todo' - interface that i have created in folder app/Interfaces/todo
   //i imported that interface to this file - look up in the import section
   todos: Todo[] = [];
  
   todoTitle: string = '';  //Initial empty string   
   idForTodo: number = 1;   //Counter for id numbers - Initialize the Id to start from 1
   beforeEdit: string = ''; //Initial empty string
   filter: string = 'all'; //Initial empty string


  constructor() { }

  ngOnInit() {

    //Array of objects with template
    this.todos = [
      //First element in the array
      {
        'id': this.idForTodo++,
        'title': 'Finish Angular Screencast',
        'completed': false,
        'editing': false,
      },
      //Second element in the array
      {
        'id': this.idForTodo++,
        'title': 'Take over world',
        'completed': false,
        'editing': false,
      },
      //Third element in the array
      {
        'id': this.idForTodo++,
        'title': 'One more thing',
        'completed': false,
        'editing': false,
      },
    ] 
 }

  addTodo(): void
  {

    //The trim() method removes whitespace from both ends of a string
    if(this.todoTitle.trim().length == 0)
    {
       return;
    }

    //Push the object to the array
    this.todos.push({
      'id': this.idForTodo++,
      'title': this.todoTitle,
      'completed': false,
      'editing': false,
    });

    //Initialize the string after every 'push'
    this.todoTitle = '';
 }


 //Updating 'editing' variable to true & save the old title in 'beforeEdit'
 editTodo(todo: Todo): void
 {
   this.beforeEdit = todo.title;
   todo.editing = true;
  }
 
  //Updating 'editing' variable to false
  doneEdit(todo: Todo): void
  {
    //If i dont edditing anything i want the original text
    if(todo.title.trim().length == 0)
    {
      //todo.title = "insert data";  Just for example
      todo.title = this.beforeEdit;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void
  {
    //If i cancel the editing - i want the original text
    todo.title = this.beforeEdit;
      
    todo.editing = false;
  }
  
  removeTodo(id: number): void
  {
    //filter() method creates a new array with all elements that pass the test implemented by the provided function
    this.todos = this.todos.filter(t => t.id != id );
  }

  itemLeft(): number 
  {
    return this.todos.filter(t => t.completed == false).length;
    /*
    The same:
    this.todos = this.todos.filter(t => t.completed == false);
    return this.todos.length;
    */  
  }
  
  
  atLeastOneCompleted():boolean
  {
    //If there is more then one todo has been completed
    return this.todos.filter(t => t.completed == true).length > 0;
  }


  clearCompleted():void
  {
    //keep only the mission which are not completed yet
    this.todos = this.todos.filter(t=>t.completed == false);
  }


  checkAllTodos():void
  {
    /*
    The same:
    this.todos.forEach(t=>t.completed = true) 
    */
      this.todos.forEach(t=>t.completed = (<HTMLInputElement>event?.target).checked);
  }


  todosFiltered(): Todo[]
  {

    if(this.filter == 'all')
    {
      return this.todos;
    }
    if(this.filter == 'active')
    {
      return this.todos.filter(t => t.completed == false);
    }
    if(this.filter == 'completed')
    {
      return this.todos.filter(t => t.completed == true);
    }

    return this.todos;
  }

}






// animations: [
//   trigger('fade', [

//     transition(':enter', [
//       style({ opacity: 0, transform: 'translateY(30px)' }),
//       animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
//     ]),

//     transition(':leave', [
//       animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
//     ]),

//   ])
// ]
// })