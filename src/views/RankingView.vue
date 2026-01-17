<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const API = '/tin'
const students = ref<any[]>([])
const tasksGeneral = ref<Record<string, any> | null>(null)
const sortBy = ref<string>('score')
const sortOrder = ref<'asc' | 'desc'>('desc')
const selectedStudent = ref<string | null>(null)

async function fetchData() {
  try {
    const responseTasks = await fetch(`${API}/tasks`)
    if (!responseTasks.ok) throw new Error('Failed to fetch tasks')
    tasksGeneral.value = await responseTasks.json()

    const responseResults = await fetch(`${API}/results`)
    if (!responseResults.ok) throw new Error('Failed to fetch results')
    const results = await responseResults.json()
    console.log('Fetched results:', results)
    if (Array.isArray(results)) {
      students.value = results
    } else {
      students.value = Object.entries(results).map(([id, data]: [string, any]) => ({ id, ...data }))
    }
    console.log('Students:', students.value)
  } catch (error) {
    console.error(error)
  }
}

function sortStudents(by: string) {
  if (sortBy.value === by) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = by
    sortOrder.value = 'desc'
  }
  students.value.sort((a, b) => {
    let aVal, bVal
    if (by === 'id') {
      aVal = a.id
      bVal = b.id
    } else if (by === 'score') {
      aVal = a.score
      bVal = b.score
    } else {
      // sort by task score
      aVal = a.tasks[by]?.score || 0
      bVal = b.tasks[by]?.score || 0
    }
    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
}

function getTaskStatus(student: any, taskId: string) {
  const task = student.tasks[taskId]
  if (!task) return 'nie zrealizowane'
  const deadline = tasksGeneral.value?.[taskId]?.Deadline
  if (!deadline) return 'brak terminu'
  const timeDate = new Date(task.time)
  const deadlineDate = new Date(deadline)
  return timeDate <= deadlineDate ? 'w terminie' : 'po terminie'
}

function goToStudent(studentId: string) {
  router.push(`/student/${studentId}`)
}

// Fetch data on mount and whenever needed
onMounted(fetchData)
</script>

<template>
  <main>
    <button @click="$router.push('/')">Powrót do strony głównej</button>
    <h2>Ranking wszystkich studentów</h2>
    <button @click="fetchData">Odśwież dane</button>

    <table v-if="students.length && tasksGeneral">
      <thead>
        <tr>
          <th @click="sortStudents('id')" style="cursor: pointer;">Numer indeksu {{ sortBy === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}</th>
          <th @click="sortStudents('score')" style="cursor: pointer;">Suma punktów {{ sortBy === 'score' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}</th>
          <th v-for="[taskId] in Object.entries(tasksGeneral)" :key="taskId" @click="sortStudents(taskId)" style="cursor: pointer;">
            Zadanie {{ taskId }} {{ sortBy === taskId ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          :key="student.id"
          :class="{ selected: selectedStudent === student.id }"
          @click="selectedStudent = student.id; goToStudent(student.id)"
          style="cursor: pointer;"
        >
          <td>{{ student.id }}</td>
          <td>{{ student.score }}</td>
          <td v-for="[taskId] in Object.entries(tasksGeneral)" :key="taskId">
            <div>Punkty: {{ student.tasks[taskId]?.score || 0 }}</div>
            <div>Status: {{ getTaskStatus(student, taskId) }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
main {
  max-width: 1800px;
  margin: 10px;
  font-family: Arial, sans-serif;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-left: -8rem;
  background-color: white;
  text-align: left; /* WAŻNE */
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f0f0f0;
}

.selected {
  background-color: #e0e0e0;
}

button {
  margin-bottom: 20px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
