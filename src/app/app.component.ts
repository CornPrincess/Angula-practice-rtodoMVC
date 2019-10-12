import { Component } from '@angular/core';

const todos = [
  // {
  //   id: 1,
  //   title: 'finish todo mvc',
  //   done: false
  // }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: {
    id: number,
    title: string,
    done: boolean
  }[] = todos;

  addTodo(e): void {
    const titleText = e.target.value;
    if (!titleText.length) {
      return;
    }

    // const lastId = this.todos[this.todos.length - 1].id;
    const last = this.todos[this.todos.length - 1];
    // console.log(last); // undefined
    this.todos.push({
      id: last ? last.id + 1 : 1,
      title: titleText,
      done: false
    });

    // 清除文本框
    e.target.value = '';
    console.log(e.keyCode);
  }

  print(): void {
    console.log('The current todos: ', this.todos);
  }

  get toggleAll() {
    return this.todos.every(t => t.done);
  }

  set toggleAll(val) {
    this.todos.forEach(t => t.done = val);
  }

}
