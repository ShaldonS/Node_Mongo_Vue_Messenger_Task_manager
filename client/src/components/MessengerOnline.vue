<template>
 <div class="mainMessenger">
  <button @click="showDock = !showDock; showdocUsersBtnVal = showdocUsersBtnVal == '>' ? '<' : '>' " id="showdocUsersBtn">{{showdocUsersBtnVal}}</button>
  <div v-if="showDock" id="docUsers">Vue is awesome!</div>
  <form class="form" >
    <div id="message-field">
      <textarea class="inputMessenger" v-model="description" @keydown.enter.exact.prevent="onEnterMessage" @keydown.enter.shift.exact.prevent="description += '\n'" type="text" name="description" placeholder="Введите сообщение" />
      <button class="submit-button-mes" @click="addMessage">></button>
    </div>
  </form>
  <div class="messages-container">
    <ul>
      <li v-for="(message) in messages.slice().reverse()" :key="message._id">
        <div class="message">
          <span class="message-author"><b>{{ message.author }}</b></span>
          <span class="message-description"><textarea disabled class="message-description-textarea" :rows="message.description.split('\n').length" v-model=message.description></textarea></span>
          <span class="message-date">{{ message.date }}</span>
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
      messages: [],
      description: "",
      date: "",
      showDock: false,
      showdocUsersBtnVal: '>',
    };
  },
  async mounted() {
    const response = await axios.get("/api/messenger/");
    this.messages = response.data;
  },
  methods: {
    async addMessage(e) {
      e.preventDefault();
      const response = await axios.post("api/messenger/", {
        author: "",
        description: this.description,
        date: this.currentDateTime(),
      });
      this.messages.push(response.data);
      this.author = "";
      this.description = "";
      this.date = "";
    },

    onEnterShift(e) {
      console.log(e)
      //this.addMessage(e);
    },

    onEnterMessage(e) {
      this.addMessage(e);
    },

    currentDateTime() {
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      const dateTime = date +' '+ time;

      return dateTime;
    }
  }
};
</script>
  
<style>
body {
  background: url(@/assets/back_main.jpg);
  color: black;
}
.mainMessenger {
  background: url(@/assets/back_main.jpg);
  color: black;
  margin: auto;
  border-radius: 10px;
}

textarea {
  width: 100%;
  background-color: white;
  color: black;
  padding: 10px;
  border: none;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: dimgrey;
}

 h3{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.inputMessenger {
  width: 100%;
  padding: 10px;
  background-color: white;
  color: black;
  border-right: none;
  border-radius: 10px;
}

.submit-button-mes {
  padding: 15px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

#message-field {
  display: flex;
  width: 100%;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-left: 1px solid black;
  border-radius: 13px;
  background-color: #c7c3a4;
}

.messages-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border-radius: 10px; */
  background: #b1b1b1;
}

.messages-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.messages-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: black;
  margin-bottom: 1%;
  margin-left: 1%;
  margin-right: 1%;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding-right: 1%;
}

.message-author {
  font-size: 18px;
  font-weight: bold;
}

.message-description {
  /*max-width: 70%;*/
  font-size: 14px;
  display: contents;
}

.message-date {
  color: black;
  font-size: 14px;
  margin-left: 1%;
  width: max-content;
}

.delete-btn {
  background-color: #f44336;
  color: black;
  padding: 10px;
  cursor: pointer;
  border: none;
}
#docUsers {
  width: 20%;
  border: 1px solid black;
  height: 80%;
  display: flex;
  background-color: white;
  position: absolute;
  overflow-y: scroll;
}
#showdocUsersBtn {
  width: 20px;
  height: 40px;
  position: absolute;
  display: flex;
  align-items: center;
  margin-top: 25%;
  z-index: 2;
  background: #1976d2;
  border: 1px solid black;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  color: white;
}
</style>