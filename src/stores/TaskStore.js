import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
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
    async getTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      if (data) {
        this.tasks = data;
        this.isLoading = false;
      }
    },
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
