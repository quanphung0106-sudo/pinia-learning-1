<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = !filter">{{ filter ? 'All tasks' : 'Fav tasks' }}</button>
    </nav>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- loading -->
    <div class="loading" v-if="taskStore.isLoading === true">
      Loading...
    </div>
    <!-- task list -->
    <div v-if="filter === true && taskStore.isLoading === false" class="task-list">
      <p>You have: {{ taskStore.totalCount }} tasks</p>
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" :id="task.id" />
      </div>
    </div>
    <div v-if="filter === false && taskStore.isLoading === false" class="task-list">
      <p>You have: {{ taskStore.favCount }} fav tasks</p>
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" :id="task.id" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { useTaskStore } from './stores/TaskStore'
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore()

    //fetch Data
    taskStore.getTasks()

    const filter = ref(true)

    return { taskStore, filter }
  }
}
</script>