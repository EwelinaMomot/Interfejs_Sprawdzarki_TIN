<template>
  <main style="max-width: 400px; margin: 40px auto; text-align: center;">
    <h1>Sprawdzarka TIN</h1>

    <button @click="$router.push('/student')" style="margin: 10px;">
      Indywidualny interfejs TIN
    </button>

    <br />

    <button @click="$router.push('/ranking')" style="margin: 10px;">
      Ranking wszystkich studentów
    </button>
  </main>
</template>
