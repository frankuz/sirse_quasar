<template>
  <table>
    <tr>
      <td><pre>{{ app.iniciativaActiva }}</pre></td>
      <td><pre>{{ app.iniciativaEditable }}</pre></td>
    </tr>
    <tr>
      <td colspan="2"><pre>{{ app.beneficiariosActivos }}</pre></td>
    </tr>
    <tr>
      <td colspan="2"><pre>{{ app.proyectosdcActivos }}</pre></td>
    </tr>
    <tr>
      <td colspan="2"><pre>{{ app.aliadosActivos }}</pre></td>
    </tr>
  </table>
</template>

<script setup>
// import { useQuasar } from 'quasar'
import { useAppStore } from 'stores/app'

const app = useAppStore()
</script>
