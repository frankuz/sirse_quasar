<template>
  <q-card style="width:1200px;max-width:90vw">
    <q-card-section>
      <div class="text-h6 text-primary">{{iniciativa.nombre}}</div>
    </q-card-section>
    <q-card-section style="max-height: 70vh" class="scroll">
      <div class="row">
        <div class="col-3">
          <q-select
            filled
            v-model="iniciativa.tipoCapacidades"
            :options="['Individuales','Organizacionales']"
            label="TIPO DE CAPACIDADES"
            label-color="primary"
            :class="{'bg-yellow-3':!iniciativa.tipoCapacidades}"
          />
        </div>
        <div class="col-4 q-pl-md">
          <q-input
            filled
            autogrow
            v-model="iniciativa.vulnerabilidad"
            label="CONDICIONES DE VULNERABILIDAD"
            label-color="primary"
            :class="{'bg-yellow-3':!iniciativa.vulnerabilidad}"
          />
        </div>
        <div class="col-5 q-pl-md">
          <q-input
            filled
            autogrow
            v-model="iniciativa.listaCapacidades"
            :label="iniciativa.tipoCapacidades == 'Individuales' ? 'LISTA DE COMPETENCIAS DESARROLLADAS':'LISTA DE CAPACIDADES DESARROLLADAS'"
            label-color="primary"
            :class="{'bg-yellow-3':!iniciativa.listaCapacidades}"
          />
        </div>
      </div>
      <div class="text-weight-bold q-mt-xl">PROYECTOS DE DESARROLLO DE CAPACIDADES</div>
      <table>
        <tr class="text-center text-primary">
          <td>NOMBRE</td>
          <td v-if="iniciativa.tipoCapacidades == 'Organizacionales'">IDENTIFICACIÓN</td>
          <td v-if="iniciativa.tipoCapacidades == 'Individuales'">NÚMERO DE MIEMBROS</td>
          <td>FECHA INICIO</td>
          <td>FECHA FIN</td>
          <td>NIVEL INICIAL</td>
          <td>NIVEL FINAL</td>
          <td>ARCHIVOS DE SOPORTE</td>
        </tr>
        <tr v-for="(proyecto, i) in app.proyectosdcActivos" :key="i">
          <td><q-input outlined dense v-model="proyecto.editable.nombre" /></td>
          <td v-if="iniciativa.tipoCapacidades == 'Organizacionales'"><q-input outlined dense v-model="proyecto.editable.identificacion" /></td>
          <td v-if="iniciativa.tipoCapacidades == 'Individuales'"><q-input outlined dense v-model="proyecto.editable.numMiembros" /></td>
          <td><q-input outlined dense v-model="proyecto.editable.fechaInicio" /></td>
          <td><q-input outlined dense v-model="proyecto.editable.fechaFin" /></td>
          <td><q-input outlined dense v-model="proyecto.editable.nivelInicial" /></td>
          <td><q-input outlined dense v-model="proyecto.editable.nivelFinal" /></td>
          <td><q-input outlined dense v-model="proyecto.editable.adjuntos" /></td>
        </tr>
      </table>
      <div class="">
        <q-btn @click="agregarProyecto" label="Agregar proyecto" color="primary" flat class="q-mr-sm q-mt-md" />
      </div>
      <!-- <pre>{{ cambiosIniciativa }}</pre>
      <pre>{{ cambiosProyectosPrevios }}</pre>
      <pre>{{ cambiosProyectosNuevos }}</pre> -->
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn v-if="cambiosSinGuardar" @click="guardar" label="GUARDAR CAMBIOS" color="negative" class="q-mr-sm" />
      <q-btn flat color="accent" v-close-popup>Cerrar</q-btn>
    </q-card-actions>
  </q-card>>
</template>

<script setup>
// import { useQuasar } from 'quasar'
// const $q = useQuasar()
import { objectsDiff, objectNotEmpty } from 'assets/utilities'
import { computed } from 'vue'
import { useAppStore } from 'stores/app'

const app = useAppStore()
const iniciativa = app.iniciativaEditable
const objProyectoDC = {
  negocio: '',
  iniciativaId: '',
  iniciativaUuid: '',
  userMail: ''
}
function agregarProyecto () {
  const nuevoProyecto = { ...objProyectoDC }
  app.proyectosdcActivos.push({
    editable: nuevoProyecto,
    esNuevo: true
  })
}
if (app.proyectosdcActivos.length === 0) agregarProyecto()
const cambiosIniciativa = computed(() => {
  return objectsDiff(iniciativa, app.iniciativaActiva)
})
const cambiosProyectosPrevios = computed(() => {
  const cambios = app.proyectosdcActivos.filter(reg => !reg.esNuevo)
    .map(reg => ({ id: reg.editable.Id, cambios: objectsDiff(reg.editable, reg.actual) }))
  return cambios.filter(cambio => objectNotEmpty(cambio.cambios))
})
const cambiosProyectosNuevos = computed(() => {
  const cambios = app.proyectosdcActivos.filter(reg => reg.esNuevo)
    .map(reg => objectsDiff(reg.editable, { ...objProyectoDC }))
  return cambios.filter(cambio => objectNotEmpty(cambio))
})
const cambiosSinGuardar = computed(() => {
  return objectNotEmpty(cambiosIniciativa.value) ||
          cambiosProyectosPrevios.value.length > 0 ||
          cambiosProyectosNuevos.value.length > 0
})
function guardar () {
  if (objectNotEmpty(cambiosIniciativa.value)) {
    const data = { ...cambiosIniciativa.value }
    data.userMail = app.userMail
    app.update('iniciativas', iniciativa.Id, data)
  }
  if (cambiosProyectosPrevios.value.length > 0) {
    const data = [...cambiosProyectosPrevios.value]
    data.forEach(item => { item.cambios.userMail = app.userMail })
    app.updateBatch('proyectosdc', data)
  }
  if (cambiosProyectosNuevos.value.length > 0) {
    const data = [...cambiosProyectosNuevos.value]
    data.forEach(item => {
      item.userMail = app.userMail
      item.negocio = app.negocioActivo
      item.iniciativaId = app.iniciativaEditable.Id
      item.iniciativaUuid = app.iniciativaEditable.uuid
    })
    app.createBatch('proyectosdc', data)
  }
}
</script>
