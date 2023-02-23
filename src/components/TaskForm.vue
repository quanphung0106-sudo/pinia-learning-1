<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="newTask" type="text" placeholder="I need to...">
        <button :disabled="disabled" type="submit">Add new Task</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from '../stores/TaskStore'

export default {
    setup() {
        const taskStore = useTaskStore()
        const newTask = ref('')
        let disabled = ref(true)

        const handleSubmit = () => {
            if (newTask.value.length === 0) {
            } else {
                taskStore.addTask({
                    id: Math.floor(Math.random() * 10000),
                    title: newTask.value,
                    isFav: false
                })
                newTask.value = ''
            }
        }

        return { newTask, taskStore, handleSubmit, disabled }
    },
    watch: {
        newTask(value) {
            if (!value) {
                this.disabled = true
            } else {
                this.disabled = false;
            };
        }
    }
}
</script>