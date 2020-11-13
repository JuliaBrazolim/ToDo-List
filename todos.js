Vue.component('todo-item', {
    props: ['item'],
    template: '<li class="list-group-item">{{ item.text }}\
    <button class="btn btn-sm btn-danger ml-3" v-on:click="$emit(\'remove\')"><i class="fas fa-trash-alt"></i></button>\
    </li>'
})

const TODO_LIST = 'todo_list'
var todoListLocalStorage = window.localStorage.getItem(TODO_LIST)
var savedTodoList = []
var nextItemId = 1;
if (todoListLocalStorage != null) {
    savedTodoList = JSON.parse(todoListLocalStorage)
    nextItemId = savedTodoList + 1;
}

var todos = new Vue({ //cria uma nova instancia
    el: '#todos', //faz referencia ao id no html
    data: {
      newTodoText: '',
      todoList: savedTodoList,
      nextTodoId: nextItemId
    },
    methods: {
      addNovaMeta: function() {
        this.todoList.push({
            id: this.nextTodoId++,
            text: this.newTodoText
        })
        this.salvarLista()
        this.newTodoText = ''
      },

      salvarLista: function() {
        var todoListData = JSON.stringify(this.todoList)
        window.localStorage.setItem(TODO_LIST, todoListData)
      },

      removeItem: function(index) {
          this.todoList.splice(index,1)

          this.salvarLista()
          this.newTodoText = ''
      },

    }
  })