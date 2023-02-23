import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play Gloomhaven", isFav: true },
    ],
  }),
  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },
    favCount() {
      return this.tasks.reduce((task, current) => {
        if (current.isFav === true) {
          return (task += 1);
        } else {
          return task;
        }
      }, 0);
    },
    totalCount() {
      return this.tasks.length;
    },
  },
  actions: {
    addTask(task) {
      console.log(task);
      this.tasks.push(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    toggleFav(id) {
      const arr = this.tasks.find((task) => task.id === id);
      arr.isFav = !arr.isFav;
      console.log(arr.isFav);
    },
  },
});
