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
