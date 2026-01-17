
<script setup lang="ts">
/*
Vue to framework, który:

łączy HTML + JavaScript + dane,

sam aktualizuje stronę, gdy dane się zmienią,

pozwala pisać aplikacje jak „żywe strony”.

CORS to zabezpieczenie przeglądarki, nie serwera.

Nie możemy bezpośrednio pytać API TIN, bo nie zezwala na CORS.

Proxy to pośrednik, który obchodzi ograniczenia przeglądarki.

Vite w trybie dev działa jak mini-serwer proxy.

/api/dtin to lokalny adres, który Vite przekazuje dalej.
*/

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
/*
  - "ref" pozwala tworzyć reaktywne zmienne
  - reaktywna zmienna = Vue automatycznie aktualizuje widok(html),
    gdy jej wartość się zmieni
*/

/*
  Tworzymy reaktywną zmienną studentId
  początkowa wartość pusty string 
*/
const studentId = ref<string>(route.params.id as string || '')
 

/*
  Adres API.
  korzystamy z proxy Vite (omijamy CORS) - wytlumaczone w plikach txt w folderze
   "/tin" → właściwy endpoint aplikacji TIN
*/
const API = '/tin'

const studentScore = ref<number | null>(null)
const studentTasks = ref<Record<string, any> | null>(null)
const tasksGeneral = ref<Record<string, any> | null>(null)


/*
  Funkcja testApi():
  - jest asynchroniczna (async)
  - pobiera listę zadań z API
*/
async function testApi() {
  /*
    fetch() wysyła zapytanie HTTP GET
    - `${API}/tasks` np. /api/dtin/tasks
  */
  const response_ogolne = await fetch(`${API}/tasks`)
  if (!response_ogolne.ok) {
    console.error('Błąd HTTP:', response_ogolne.status)
    return}

  const response_ucznia = await fetch(`${API}/results/${studentId.value}`)
  if (!response_ucznia.ok) {
    console.error('Błąd HTTP:', response_ucznia.status)
    return}
  /*
    response_ogolne.json():
    zamienia odpowiedź HTTP na obiekt JavaScript
  */
  const data_ogolne = await response_ogolne.json()
  const data_ucznia = await response_ucznia.json()

  /*

     wypisuje dane w konsoli przeglądarki, do testów i debugowania
  */
  console.log(data_ogolne)
  console.log(data_ucznia)

  studentScore.value = Number(data_ucznia.score)
  studentTasks.value = data_ucznia.tasks
  tasksGeneral.value = data_ogolne

}

function porownajDaty(taskTime: string, deadline: string) {
  if (!taskTime || !deadline) {
    return 'brak danych'
  }

  const timeDate = new Date(taskTime)
  const deadlineDate = new Date(deadline)

  if (isNaN(timeDate.getTime()) || isNaN(deadlineDate.getTime())) {
    return 'brak danych'
  }

  return timeDate <= deadlineDate
    ? 'w terminie'
    : 'po terminie'
}

onMounted(() => {
  if (studentId.value) {
    testApi()
  }
})

</script>

<template>
  <!-- 
     opisuje HTML widoku
     Vue wstrzykuje tu dane z <script>
  -->

  <main>
    
    <button @click="$router.push('/')" > Powrót do strony głównej </button>
    <h1>Indywidualny interfejs sprawdzarki TIN</h1>

    <!-- 
     
      v-model:
       łączy input z zmienną studentId
       gdy wpisujesz tekst to studentId się zmienia
       gdy studentId się zmieni to input się aktualizuje
    -->
    <label>
      ID studenta:
      <input
        v-model="studentId"
        placeholder="np. 12345"
      />
    </label>

    <!-- element wyświetli się TYLKO, gdy studentId nie jest pusty -->
    <p v-if="studentId">
      Wybrany student:
      <strong>{{ studentId }}</strong>
    </p>

    <!-- 
       po kliknięciu wywołuje funkcję testApi()
    -->
    <button @click="testApi">
      Pobierz zadania
    </button>

    <p v-if="studentScore !== null">
  Suma punktów (score): <strong>{{ studentScore }}</strong>
</p>

<table v-if="studentTasks && tasksGeneral">
  <thead>
    <tr>
      <th>Zadanie</th>
      <th>Punkty zdobyte</th>
      <th>Maks. punkty</th>
      <th>Termin oddania</th>
      <th>Data zaliczenia</th>
      <th>Status</th>
      <th>Info</th>
    </tr>
  </thead>

  <tbody>
    <tr
      v-for="[taskId, task] in Object.entries(studentTasks)"
      :key="taskId"
    >
      <!-- ID zadania -->
      <td>{{ taskId }}</td>

      <!-- punkty zdobyte przez studenta -->
      <td>{{ task.score }}</td>

      <!-- maksymalna liczba punktów -->
      <td>{{ tasksGeneral[taskId]?.Score ?? '—' }}</td>

      <!-- termin oddania -->
      <td>{{ tasksGeneral[taskId]?.Deadline ?? '—' }}</td>

      <!-- data zaliczenia -->
      <td>{{ task.time }}</td>

      <!-- status: w terminie / po terminie -->
      <td>
        <span
          :class="
            porownajDaty(task.time, tasksGeneral[taskId]?.Deadline) === 'w terminie'
              ? 'status-w'
              : 'status-p'
          "
        >
          {{
            porownajDaty(
              task.time,
              tasksGeneral[taskId]?.Deadline
            )
          }}
        </span>
      </td>

      <!-- dodatkowe informacje -->
      <td>{{ task.info || '—' }}</td>
    </tr>
  </tbody>
</table>


  </main>
</template>

<style scoped>
/*
  <style scoped>
  - CSS tylko dla tego komponentu
  - nie wpływa na inne elementy strony
*/

main {
  max-width: 1000px;   /* maksymalna szerokość */
  margin: 40px auto;  /* wyśrodkowanie */
  font-family: Arial, sans-serif;
  text-align: center;
}

input {
  margin-left: 8px;
  padding: 4px;
}

button {
  margin-top: 12px;
  margin-left: 20px;
  padding: 6px 10px;
  cursor: pointer;
}

table {
  width: 80%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: white;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

p {
  margin: 10px 0;
}
</style>
