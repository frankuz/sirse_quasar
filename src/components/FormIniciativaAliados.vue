<template>
  <q-card style="width:1200px;max-width:90vw">
    <q-card-section>
      <div class="text-h6 text-primary">{{iniciativa.nombre}}</div>
    </q-card-section>
    <q-card-section style="max-height: 70vh" class="scroll">
      <div class="text-weight-bold q-mt-xl">LISTA DE ALIADOS</div>
      <table>
        <tr class="text-center text-primary">
          <td width="15%">NOMBRE</td>
          <td width="12%">IDENTIFICACIÓN</td>
          <td>TIPO</td>
          <td width="12%">VALOR APORTE DINERO</td>
          <td width="12%">VALOR APORTE ESPECIE</td>
          <td width="12%">VALOR APORTE TRANSFERENCIA DE CONOCIMIENTO</td>
          <td>DESCRIPCIÓN DE LOS APORTES</td>
        </tr>
        <tr v-for="(aliado, i) in app.aliadosActivos" :key="i">
          <td><q-input outlined dense v-model="aliado.editable.nombre" /></td>
          <td><q-input outlined dense v-model="aliado.editable.identificacion" /></td>
          <td><q-select outlined dense v-model="aliado.editable.tipo" :options="['Privado','Público','Mixto','Comunidad']"></q-select></td>
          <td><q-input outlined dense input-class="text-right" mask="### ### ### ###" unmasked-value reverse-fill-mask v-model.number="aliado.editable.dinero" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ### ### ###" unmasked-value reverse-fill-mask v-model.number="aliado.editable.especie" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ### ### ###" unmasked-value reverse-fill-mask v-model.number="aliado.editable.transferenciaConocimiento" /></td>
          <td><q-input outlined dense autogrow v-model="aliado.editable.notas" /></td>
        </tr>
      </table>
      <div class="">
        <q-btn @click="agregarAliado" label="Agregar Aliado" color="primary" flat class="q-mr-sm q-mt-md" />
      </div>
      <div class="text-weight-bold q-mt-xl">SOPORTES</div>
      <div
        v-for="soporte in app.soportesActivos.aliado"
        :key="soporte.uuid"
        class="text-weight-bold text-primary q-my-sm"
      >
        <a target="_blank" :href="'https://drive.google.com/file/d/' + soporte.uuid + '/view'">{{ soporte.nombre }}</a>
      </div>
      <q-file filled v-model="file" label="Seleccionar archivo de soporte (máximo 50Mb)" max-file-size="52428800" class="q-my-md" style="max-width: 70%">
        <template v-slot:after>
          <q-btn  flat icon-right="upload" color="accent" @click="uploadFile('aliado')" label="SUBIR"/>
        </template>
      </q-file>
      <!-- <pre>{{ cambiosIniciativa }}</pre>
      <pre>{{ cambiosAliadosPrevios }}</pre>
      <pre>{{ cambiosAliadosNuevos }}</pre> -->
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
import { computed, ref } from 'vue'
import { useAppStore } from 'stores/app'

const app = useAppStore()
const iniciativa = app.iniciativaEditable
const objAliado = {
  negocio: '',
  iniciativaId: '',
  iniciativaUuid: '',
  userMail: ''
}
function agregarAliado () {
  const nuevoAliado = { ...objAliado }
  app.aliadosActivos.push({
    editable: nuevoAliado,
    esNuevo: true
  })
}
if (app.aliadosActivos.length === 0) agregarAliado()
const cambiosIniciativa = computed(() => {
  return objectsDiff(iniciativa, app.iniciativaActiva)
})
const cambiosAliadosPrevios = computed(() => {
  const cambios = app.aliadosActivos.filter(reg => !reg.esNuevo)
    .map(reg => ({ id: reg.editable.Id, cambios: objectsDiff(reg.editable, reg.actual) }))
  return cambios.filter(cambio => objectNotEmpty(cambio.cambios))
})
const cambiosAliadosNuevos = computed(() => {
  const cambios = app.aliadosActivos.filter(reg => reg.esNuevo)
    .map(reg => objectsDiff(reg.editable, { ...objAliado }))
  return cambios.filter(cambio => objectNotEmpty(cambio))
})
const cambiosSinGuardar = computed(() => {
  return objectNotEmpty(cambiosIniciativa.value) ||
          cambiosAliadosPrevios.value.length > 0 ||
          cambiosAliadosNuevos.value.length > 0
})
function guardar () {
  if (objectNotEmpty(cambiosIniciativa.value)) {
    const data = { ...cambiosIniciativa.value }
    data.userMail = app.userMail
    app.update('iniciativas', iniciativa.Id, data)
  }
  if (cambiosAliadosPrevios.value.length > 0) {
    const data = [...cambiosAliadosPrevios.value]
    data.forEach(item => { item.cambios.userMail = app.userMail })
    app.updateBatch('aliados', data)
  }
  if (cambiosAliadosNuevos.value.length > 0) {
    const data = [...cambiosAliadosNuevos.value]
    data.forEach(item => {
      item.userMail = app.userMail
      item.negocio = app.negocioActivo
      item.iniciativaId = app.iniciativaEditable.Id
      item.iniciativaUuid = app.iniciativaEditable.uuid
    })
    app.createBatch('aliados', data)
  }
}
const file = ref(null)
function uploadFile (tipo) {
  if (!file.value) return
  app.uploadFile(file.value, tipo)
  file.value = null
}
</script>
