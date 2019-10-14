import { Component } from '@angular/core';

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
  }[] = JSON.parse(window.localStorage.getItem('todos') || '[]');
  // 注意这里的边界条件的判断


  public currentEditing: {
    id: number,
    title: string,
    done: boolean
  } = null;

 // 实现导航切换数据过滤的功能
  /*
    1. 提供一个属性，该属性会根据当前链接返回过滤之后的数据 filterTodos
    2. 提供一个属性，回来存储当前点击的链接标识 visibility -- all， active， completed
    3. 为链接添加点击事件，当点击导航链接时改变
   */

  // public filterTodos: {
  //   id: number,
  //   title: string,
  //   done: boolean
  // }[];

  public visibility = 'all';

  get filterTodos() {
    if (this.visibility === 'all') {
      return this.todos;
    } else if (this.visibility === 'active') {
      return this.todos.filter(t => !t.done);
    } else {
      return this.todos.filter(t => t.done);
    }

  }

  // Angular生命周期的钩子函数
  // 它会在Angular应用初始化的时候执行一次
  ngOnInit() {
    console.log('I am ngOnInit');
    this.hashChangeHandler();

    // 注意这里要bind(this)
    window.onhashchange = this.hashChangeHandler.bind(this);
  }

  // 当Angular组件数据发生改变时会被触发
  ngDoCheck() {
    // 持久化存储我们的数据
    console.log('I am ngDoCheck');
    window.localStorage.setItem('todos', JSON.stringify(this.todos));
  }

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

  removeTodo(index: number): void {
    this.todos.splice(index, 1);
    console.log(index);
  }

  saveEdit(todo, e): void {
    // 保存编辑
    todo.title = e.target.value;

    // 去除编辑样式
    this.currentEditing = null;
  }

  handleEditKeyup(e): void {
    const {keycode, target} = e;

    // 把文本框内容恢复为原来的值
    target.value = this.currentEditing.title;
    this.currentEditing = null;
  }

  get remainTodoCount(): number {
    return this.todos.filter(t => !t.done).length;
  }

  clearAllDone(): void {
    this.todos = this.todos.filter(t => !t.done);
  }

  hashChangeHandler(): void {
    const hash = window.location.hash.substr(1);
    console.log(this);
    switch (hash) {
      case '/':
        this.visibility = 'all';
        break;
      case '/active':
        this.visibility = 'active';
        break;
      case '/completed':
        this.visibility = 'completed';
        break;
    }
  }

}
