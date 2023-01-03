<template>
  <q-dialog v-model="app.dialogFiltrosIniciativasIsVisible">
    <q-card style="width:1200px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6">Filtrar iniciativas</div>
        <div>Haz clic en un criterio para activarlo o desactivarlo.</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md no-wrap">
          <div v-for="criterio in criterios" :key="criterio.campo" :class="criterio.class">
            <div class="text-overline text-primary text-center" v-html="criterio.titulo"></div>
            <q-btn
              v-for="opcion in criterio.opciones"
              :key="opcion"
              :outline="!criterioEstaActivo(criterio.campo,opcion)"
              :color="criterioEstaActivo(criterio.campo,opcion) ? 'primary' : 'grey-6'"
              class="full-width q-mt-sm"
              @click="handleClick(criterio.campo,opcion)"
            >{{ opcion }}</q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn color="accent" flat icon="filter_alt_off" label="QUITAR TODOS LOS FILTROS" @click="app.resetFiltrosIniciativas"/>
        <q-btn color="accent" flat label="CERRAR" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { useAppStore } from 'stores/app'
const app = useAppStore()
const criterios = ref([
  { class: 'col-2', titulo: 'COMPAÑÍA', campo: 'compania', opciones: toRef(app, 'companias') },
  { class: 'col-2', titulo: 'ESTADO', campo: 'estado', opciones: ['Borrador', 'Formulada', 'Activa', 'Cerrada'] },
  { class: 'col-2', titulo: 'GRUPO&nbsp;DE&nbsp;INTERÉS', campo: 'grupoInteres', opciones: ['Comunidad', 'Proveedores', 'Clientes'] },
  { class: 'col', titulo: 'PILAR', campo: 'pilar', opciones: app.listaPilares },
  { class: 'col', titulo: 'CATEGORÍA ESPECIAL', campo: 'categorias', opciones: app.listaCategorias.map(e => e.value) }
])
function criterioEstaActivo (campo, valor) {
  return app.filtrosIniciativas[campo] === valor
}
function handleClick (campo, valor) {
  app.filtrosIniciativas[campo] = criterioEstaActivo(campo, valor) ? '' : valor
  app.dialogFiltrosIniciativasIsVisible = false
}
</script>
