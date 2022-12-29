<template>
  <table>
    <tr>
      <td><pre>{{ app.iniciativaActiva }}</pre></td>
      <td><pre>{{ app.iniciativaEditable }}</pre></td>
    </tr>
  </table>
    <div v-for="reporte in reportes" :key="reporte">
      <div class="text-h6">{{ reporte }}</div>
      <table v-for="(item, i) in app[reporte]" :key="i">
        <tr>
          <td colspan="2"><pre>esNuevo: {{ item.esNuevo }}</pre></td>
        </tr>
        <tr>
          <td><pre>{{ item.actual }}</pre></td>
          <td><pre>{{ item.editable }}</pre></td>
        </tr>
      </table>
    </div>
</template>

<script setup>
// import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useAppStore } from 'stores/app'
const app = useAppStore()
const reportes = ref([
  'beneficiariosActivos',
  'proyectosActivos',
  'aliadosActivos'
])
</script>
