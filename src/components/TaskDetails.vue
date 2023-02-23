<template>
    <div class="task">
        <p> {{ id }}</p>
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <i class="material-icons" @click="handleDelete(id)">delete</i>
            <i class="material-icons" :class="{ active: task.isFav }" @click="handleToggleFav(id)">favorite</i>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore'

export default {
    props: ['task', 'id'],
    setup() {
        const taskStore = useTaskStore()

        const handleDelete = (id) => taskStore.deleteTask(id)
        const handleToggleFav = (id) => taskStore.toggleFav(id)

        return { taskStore, handleDelete, handleToggleFav }
    }
}
</script>