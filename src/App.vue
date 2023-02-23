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
    <div class="loading" v-if="isLoading === true">
      Loading...
    </div>
    <!-- task list -->
    <div v-if="filter === true && isLoading === false" class="task-list">
      <p>You have: {{ totalCount }} tasks</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" :id="task.id" />
      </div>
    </div>
    <div v-if="filter === false && isLoading === false" class="task-list">
      <p>You have: {{ favCount }} fav tasks</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" :id="task.id" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset State</button>
  </main>
</template>

<script>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { useTaskStore } from './stores/TaskStore'
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore()

    const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore)

    //fetch Data
    taskStore.getTasks()

    const filter = ref(true)

    return { taskStore, filter, tasks, isLoading, favs, totalCount, favCount }
  }
}
</script>