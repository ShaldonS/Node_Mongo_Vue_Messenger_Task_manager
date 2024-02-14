<template>
 <div class="mainTodo">
  <button class="submit-button button" @click="this.showForm = !this.showForm;">Создать задачу</button>
  <form class="formTodo" v-if="showForm">
    
    <input class="input" v-model="name" type="text" id="task-name" placeholder="Название" name="name">
    <textarea class="input textareaTodo" type="text" v-model="description" id="task-descr" placeholder="Описание" style="height: 100px;"></textarea>
    <input class="input" v-model="executor" type="text" id="task-executor" placeholder="Исполнитель">

    <ul class="task-descr" style="list-style-type: none; display: flex;">
      <li>
        <p>Сложность:       
          <select name="complexity" v-model="complexity" class="task-complexity">
            <option value="Easy">Легко</option>
            <option value="Medium">Средне</option>
            <option value="Hard">Сложно</option>
          </select>
        </p>
      </li>
      <li>
        <p>Срочно: <input class="input" type="checkbox" v-model="emergency" id="task-emergency"></p>
      </li>
      <li>
        <p>Дата начала: <input class="input" type="datetime-local" v-model="start_date" id="task-start-date"></p>
      </li>
      <li>
        <p>Дата окончания: <input class="input" type="datetime-local" v-model="end_date" id="task-end-date"></p>
      </li>
    </ul>
    <button class="submit-button button" @click="addTodo">Добавить</button>
  </form>

  <div class="todo-container">
    <ul>
      <li v-for="(todo, i) in todos" :key="todo._id">
        <div class="todo">
            <ul class="task-descr" style="list-style-type: none; display: flex;">
            <li>
              <p>Сложность:       
                <select name="complexity" v-model="complexity" class="task-complexity" selected="{{ todo.complexity }}">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </p>
            </li>
            <li>
              <p>Срочно: <input class="input" type="checkbox" v-model="emergency" id="task-emergency"></p>
            </li>
            <li>
              <p>Дата начала: <input class="input" type="datetime-local" v-model="start_date" id="task-start-date"></p>
            </li>
            <li>
              <p>Дата окончания: <input class="input" type="datetime-local" v-model="end_date" id="task-end-date"></p>
            </li>
          </ul>

          <span class="todo-name">{{ todo.title }}</span>
          <span class="todo-description"><textarea class="todo-description-textarea textareaTodo" v-model=todo.description></textarea></span>
          <span class="todo-executor">{{ todo.executor }}</span>
          <span class="todo-complexity">{{ todo.complexity }}</span>
          <span class="todo-status">{{ todo.status }}</span>
          <span class="todo-emergency">{{ todo.emergency }}</span>
          <span class="todo-start_date">{{ todo.start_date }}</span>
          <span class="todo-end_date">{{ todo.end_date }}</span>

          <button class="update-btn button" @click="updateTodo(todo)">Обновить</button>
          <button class="delete-btn button" @click="removeTodo(todo, i)">Удалить</button>
        </div>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      todos: [],
      name: "",
      description: "",
      executor: "",
      complexity: "",
      status: "",
      emergency: "",
      start_date: "",
      end_date: "",
      showForm: false,
    };
  },
  async mounted() {
    const response = await axios.get("/api/todoList/");
    this.todos = response.data;
  },
  methods: {
    async addTodo(e) {
      e.preventDefault();
      const response = await axios.post("api/todoList/", {
                name: this.name,
                description: this.description,
                executor: this.executor,
                complexity: this.complexity,
                status: this.status,
                emergency: this.emergency,
                start_date: this.start_date,
                end_date: this.end_date,
      });

      this.todos.push(response.data);
      this.title = "";
      this.name = "";
      this.description = "";
      this.executor = "";
      this.complexity = "";
      this.status = "";
      this.emergency = "";
      this.start_date = "";
      this.end_date = "";

      this.showForm = false;
    },
    async updateTodo(item) {
      const data = {
                name: this.name,
                description: this.description,
                executor: this.executor,
                complexity: this.complexity,
                status: this.status,
                emergency: this.emergency,
                start_date: this.start_date,
                end_date: this.end_date,
            };
      await axios.post("api/todoList/update" + item._id, data);

      this.setTodosFromDB();
    },
    async removeTodo(item, i) {
      await axios.delete("api/todoList/" + item._id);
      this.todos.splice(i, 1);
    },
    async setTodosFromDB() {
      const response = await axios.get("/api/todoList/");
      this.todos = response.data;
    }
  }
};
</script>
  
<style>
.mainTodo {
  text-align: center;
}
.formTodo {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  padding: 5px;
  background: white;
}
.textareaTodo {
  border: 1px solid black !important;
  width: 100%
}
h3{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.input {
  width: 50% !important;
  padding: 10px;
  border-right: 1px solid !important;
  margin-bottom: 10px;
}

.button {
  width: 400px;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
  border-radius: 10px;
}

.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #b1b1b1;
  margin-top: 10px;
}

.todo-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.todo-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.todo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
}

.todo-name {
  font-size: 18px;
  font-weight: bold;
}

.todo-description {
  font-size: 14px;
}

.delete-btn {
  background-color: #f44336;
  border: 1px solid black !important;
}
</style>