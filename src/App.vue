<template>
  <!-- <router-view /> -->
  <MainLayout />
</template>

<script setup>
import { onMounted } from 'vue'
import MainLayout from 'layouts/MainLayout.vue'
import { useAppStore } from 'stores/app'
const app = useAppStore()

onMounted(() => {
  if (app.negocios.length === 1) app.seleccionarNegocio(app.negocios[0])
  else app.leftDrawerOpen = true
})
</script>

/*
ToDo

Ajustar ancho con nombres de asuntos largos
Guardar iniciativa antes de ver reporte
agregar soportes en FormIniciativa
agregar número de instituciones
al cerrar form preguntar si desea guardar los cambios

Preguntas
tendremos un consolidado de entregas a bancos de alimentos
cuando tendremos cambios de moneda

*/
