<template>
  <q-card style="width:1200px;max-width:90vw">
    <q-card-section>
      <div class="text-h6 text-primary">{{iniciativa.nombre}}</div>
    </q-card-section>
    <q-card-section style="max-height: 70vh" class="scroll">
      <div class="text-weight-bold">REPORTE 2022</div>
      <div class="row q-mt-md">
        <div class="col-4">
          <q-input
            filled
            v-model.number="iniciativa.inversion"
            label="INVERSIÓN DE LA COMPAÑÍA (moneda local) *"
            label-color="primary"
            :class="{'bg-yellow-3':!iniciativa.inversion && tipoVoluntariado != 'Dinero'}"
            mask="### ### ### ###"
            unmasked-value
            reverse-fill-mask
          />
        </div>
        <div class="col-4 q-pl-md">
          <q-input
            filled
            autogrow
            v-model.number="iniciativa.numEntidades"
            label="NÚMERO DE ENTIDADES BENEFICIARIAS"
            label-color="primary"
            mask="### ### ### ###"
            unmasked-value
            reverse-fill-mask
            :class="{'bg-yellow-3':!iniciativa.numEntidades}"
          />
        </div>
        <div class="col-4 q-pl-md">
          <q-input
            filled
            autogrow
            v-model="iniciativa.entidades"
            label="ENTIDADES BENEFICIARIAS"
            label-color="primary"
            :class="{'bg-yellow-3':!iniciativa.entidades}"
          />
        </div>
      </div>
      <div v-if="tipoVoluntariado == 'Dinero'" class="row q-mt-md">
        <div class="col-4">
          <q-input
            filled
            autogrow
            v-model="iniciativa.numVoluntarios"
            label="NÚMERO DE VOLUNTARIOS"
            label-color="primary"
            mask="### ### ### ###"
            unmasked-value
            reverse-fill-mask
          />
        </div>
        <div class="col-4 q-pl-md">
          <q-input
            filled
            autogrow
            v-model.number="iniciativa.dineroDonado"
            label="APORTE DE COLABORADORES (moneda local)"
            label-color="primary"
            mask="### ### ### ###"
            unmasked-value
            reverse-fill-mask
          />
        </div>
      </div>
      <table v-if="tipoVoluntariado == 'Tiempo'">
        <tr class="text-center text-primary">
          <td>NIVEL</td>
          <td>PRESIDENTE DE NEGOCIO Y GERENTES GENERALES</td>
          <td>ALTOS DIRECTIVOS</td>
          <td>DIRECCIÓN MEDIA</td>
          <td>ADMINISTRATIVOS</td>
          <td>OPERATIVOS</td>
        </tr>
        <tr>
          <td>NÚMERO DE VOLUNTARIOS</td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numVolPresidentesGerentes" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numVolAltosDirectivos" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numVolDireccionMedia" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numVolAdministrativos" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numVolOperativos" /></td>
        </tr>
        <tr>
          <td>NÚMERO DE HORAS</td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numHorasPresidentesGerentes" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numHorasAltosDirectivos" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numHorasDireccionMedia" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numHorasAdministrativos" /></td>
          <td><q-input outlined dense input-class="text-right" mask="### ###" unmasked-value reverse-fill-mask v-model.number="iniciativa.numHorasOperativos" /></td>
        </tr>
      </table>
      <div class="text-weight-bold q-mt-xl">BENEFICIARIOS 2022</div>
      <div v-if="app.iniciativaEditable.categorias.includes('Entrega de productos a bancos de alimentos de Colombia')">
        Los beneficiarios de los bancos de alimentos de Colombia son reportados por Fundación Nutresa
        de manera centralizada para que los datos no queden duplicados.
      </div>
      <div v-else>
        <table>
          <tr class="text-center text-primary">
            <td style="width: 20%;">DPTO / EST / PROV</td>
            <td>NIÑAS</td>
            <td>MUJERES JÓVENES</td>
            <td>ADULTAS</td>
            <td>ADULTAS MAYORES</td>
            <td>NIÑOS</td>
            <td>HOMBRES JÓVENES</td>
            <td>ADULTOS</td>
            <td>ADULTOS MAYORES</td>
          </tr>
          <tr v-for="(region, i) in app.beneficiariosActivos" :key="i">
            <td><q-input outlined dense v-model.number="region.editable.region" /></td>
            <td><q-input outlined dense input-class="text-right" mask="### ### ###" unmasked-value reverse-fill-mask v-model.number="region.editable.mujeresNinas" /></td>
            <td><q-input outlined dense input-class="text-right" mask="### ### ###" unmasked-value reverse-fill-mask v-model.number="region.editable.mujeresJovenes" /></td>
            <td><q-input outlined dense input-class="text-right" mask="### ### ###" unmasked-value reverse-fill-mask v-model.number="region.editable.mujeresAdultas" /></td>
            <td><q-input outlined dense input-class="text-right" mask="### ### ###" unmasked-value reverse-fill-mask v-model.number="region.editable.mujeresMayores" /></td>
            <td><q-input outlined dense input-class="text-right" mask="### ### ###" unmasked-value reverse-fill-mask v-model.number="region.editable.hombresNinos" /></td>
            <td><q-input outlined dense input-class="text-right" mask="### ### ###" unmasked-value reverse-fill-mask v-model.number="region.editable.hombresJovenes" /></td>
            <td><q-input outlined dense input-class="text-right" mask="### ### ###" unmasked-value reverse-fill-mask v-model.number="region.editable.hombresAdultos" /></td>
            <td><q-input outlined dense input-class="text-right" mask="### ### ###" unmasked-value reverse-fill-mask v-model.number="region.editable.hombresMayores" /></td>
          </tr>
        </table>
        <div class="">
          <q-btn @click="agregarRegion" label="Agregar fila" color="primary" flat class="q-mr-sm q-mt-md" />
        </div>
      </div>
      <div class="text-weight-bold q-mt-xl">SOPORTES</div>
      <div
        v-for="soporte in app.soportesActivos.reporte"
        :key="soporte.uuid"
        class="text-weight-bold text-primary q-my-sm"
      >
        <a target="_blank" :href="'https://drive.google.com/file/d/' + soporte.uuid + '/view'">{{ soporte.nombre }}</a>
      </div>
      <q-file filled v-model="file" label="Seleccionar archivo de soporte (máximo 50Mb)" max-file-size="52428800" class="q-my-md" style="max-width: 70%">
        <template v-slot:after>
          <q-btn  flat icon-right="upload" color="accent" @click="uploadFile('reporte')" label="SUBIR"/>
        </template>
      </q-file>
      <!-- <pre>beneficiariosActivos {{ app.beneficiariosActivos }}</pre>
      <pre>cambiosIniciativa {{ cambiosIniciativa }}</pre>
      <pre>cambiosBeneficiariosPrevios {{ cambiosBeneficiariosPrevios }}</pre>
      <pre>cambiosBeneficiariosNuevos {{ cambiosBeneficiariosNuevos }}</pre>
      <pre>iniciativaEditable {{app.iniciativaEditable}}</pre> -->
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
const tipoVoluntariado = computed(() => {
  if (!iniciativa.categorias.includes('Voluntariado')) return null
  return iniciativa.tipoVoluntariado
})
const objBeneficiarios = {
  negocio: '',
  iniciativaId: '',
  iniciativaUuid: '',
  pais: '',
  region: '',
  total: '',
  userMail: ''
}
function agregarRegion () {
  const nuevaRegion = { ...objBeneficiarios }
  app.beneficiariosActivos.push({
    editable: nuevaRegion,
    esNuevo: true
  })
}
if (app.beneficiariosActivos.length === 0) agregarRegion()
const cambiosIniciativa = computed(() => {
  return objectsDiff(iniciativa, app.iniciativaActiva)
})
const cambiosBeneficiariosPrevios = computed(() => {
  const cambios = app.beneficiariosActivos.filter(reg => !reg.esNuevo)
    // .map(reg => ({ id: reg.editable.Id, editable: reg.editable, cambios: objectsDiff(reg.editable, reg.actual) }))
    .map(reg => {
      reg.editable.total = sumarBeneficiariosReg(reg.editable)
      return { id: reg.editable.Id, editable: reg.editable, cambios: objectsDiff(reg.editable, reg.actual) }
    })
  return cambios.filter(cambio => objectNotEmpty(cambio.cambios))
})
const cambiosBeneficiariosNuevos = computed(() => {
  const cambios = app.beneficiariosActivos.filter(reg => reg.esNuevo)
    // .map(reg => objectsDiff(reg.editable, { ...objBeneficiarios }))
    .map(reg => {
      reg.editable.total = sumarBeneficiariosReg(reg.editable)
      return objectsDiff(reg.editable, { ...objBeneficiarios })
    })
  return cambios.filter(cambio => objectNotEmpty(cambio))
})
const cambiosSinGuardar = computed(() => {
  return objectNotEmpty(cambiosIniciativa.value) ||
          cambiosBeneficiariosPrevios.value.length > 0 ||
          cambiosBeneficiariosNuevos.value.length > 0
})
function sumarBeneficiariosReg (reg) {
  let total = 0
  const keys = ['mujeresNinas', 'mujeresJovenes', 'mujeresAdultas', 'mujeresMayores', 'hombresNinos', 'hombresJovenes', 'hombresAdultos', 'hombresMayores']
  keys.forEach(key => {
    if (reg[key]) total += parseInt(reg[key])
  })
  return total
}
function guardar () {
  if (objectNotEmpty(cambiosIniciativa.value)) {
    const data = { ...cambiosIniciativa.value }
    data.userMail = app.userMail
    app.update('iniciativas', iniciativa.Id, data)
  }
  if (cambiosBeneficiariosPrevios.value.length > 0) {
    const data = [...cambiosBeneficiariosPrevios.value]
    data.forEach(item => {
      item.cambios.userMail = app.userMail
    })
    app.updateBatch('beneficiarios', data)
  }
  if (cambiosBeneficiariosNuevos.value.length > 0) {
    const data = [...cambiosBeneficiariosNuevos.value]
    data.forEach(item => {
      item.userMail = app.userMail
      item.negocio = app.negocioActivo
      item.iniciativaId = app.iniciativaEditable.Id
      item.iniciativaUuid = app.iniciativaEditable.uuid
    })
    app.createBatch('beneficiarios', data)
  }
}
const file = ref(null)
function uploadFile (tipo) {
  if (!file.value) return
  app.uploadFile(file.value, tipo)
  file.value = null
}
</script>
