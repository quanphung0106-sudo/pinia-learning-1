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
    async addTask(task) {
      this.tasks.push(task);

      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log("error", res.error);
      }
    },
    async deleteTask(id) {
      this.tasks.filter((task) => task.id !== id);

      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) this.getTasks();

      if (res.error) {
        console.log("error", res.error);
      }
    },
    async toggleFav(id) {
      const arr = this.tasks.find((task) => task.id === id);
      arr.isFav = !arr.isFav;

      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: arr.isFav }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log("error", res.error);
      }
    },
  },
});
