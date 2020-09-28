import { Item } from '../../interfaces/Item';
import { Component, OnInit } from '@angular/core';

// import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
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
})
export class TodoListComponent implements OnInit {
  todo: Item[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  anyRemainingModel: boolean;
id = 1;

  constructor() { }

  ngOnInit() {
  //   this.anyRemainingModel = true;
  //   this.filter = 'all';
  //   this.beforeEditCache = '';
  //   this.idForTodo = 4;
  //   this.todoTitle = '';
  //   this.todo = [
  //     {
  //       'id': 1,
  //       'title': 'Finish Angular Screencast',
  //       'completed': false,
  //       'editing': false,
  //     },
  //     {
  //       'id': 2,
  //       'title': 'Take over world',
  //       'completed': false,
  //       'editing': false,
  //     },
  //     {
  //       'id': 3,
  //       'title': 'One more thing',
  //       'completed': false,
  //       'editing': false,
  //     },
  //   ];
  }

//   addTodo(): void {
//     if (this.todoTitle.trim().length === 0) {
//       return;
//     }

//     this.todo.push({
//       id: this.idForTodo,
//       title: this.todoTitle,
//       completed: false,
//       editing: false
//     })

//     this.todoTitle = '';
//     this.idForTodo++;
//   }

//   editTodo(todo: IToDo): void {
//     this.beforeEditCache = todo.title;
//     todo.editing = true;
//   }

//   doneEdit(todo: IToDo): void {
//     if (todo.title.trim().length === 0) {
//       todo.title = this.beforeEditCache;
//     }

//     this.anyRemainingModel = this.anyRemaining();
//     todo.editing = false;
//   }

//   cancelEdit(todo: IToDo): void {
//     todo.title = this.beforeEditCache;
//     todo.editing = false;
//   }

//   deleteTodo(id: number): void {
//     this.todo = this.todo.filter(todo => todo.id !== id);
//   }

//   remaining(): number {
//     return this.todo.filter(todo => !todo.completed).length;
//   }

//   atLeastOneCompleted(): boolean {
//     return this.todo.filter(todo => todo.completed).length > 0;
//   }

//   clearCompleted(): void {
//     this.todo = this.todo.filter(todo => !todo.completed);
//   }

//   checkAllTodos(): void {
//     this.todo.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
//     this.anyRemainingModel = this.anyRemaining();
//   }

//   anyRemaining(): boolean {
//     return this.remaining() !== 0;
//   }

//   todosFiltered(): IToDo[] {
//     if (this.filter === 'all') {
//       return this.todo;
//     } else if (this.filter === 'active') {
//       return this.todo.filter(todo => !todo.completed);
//     } else if (this.filter === 'completed') {
//       return this.todo.filter(todo => todo.completed);
//     }

//     return this.todo;
//   }
}
