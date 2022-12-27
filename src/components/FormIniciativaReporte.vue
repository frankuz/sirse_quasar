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
            label="INVERSIÓN (moneda local) *"
            label-color="primary"
            :class="{'bg-yellow-3':!iniciativa.inversion && tipoVoluntariado != 'Dinero'}"
            mask="### ### ### ###"
            unmasked-value
            reverse-fill-mask
            :disable="tipoVoluntariado == 'Dinero'"
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
            label="APORTE EN DINERO (moneda local)"
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
      <!-- <pre>{{ cambiosIniciativa }}</pre>
      <pre>{{ cambiosBeneficiariosPrevios }}</pre>
      <pre>{{ cambiosBeneficiariosNuevos }}</pre> -->
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
    .map(reg => ({ id: reg.editable.Id, cambios: objectsDiff(reg.editable, reg.actual) }))
  return cambios.filter(cambio => objectNotEmpty(cambio.cambios))
})
const cambiosBeneficiariosNuevos = computed(() => {
  const cambios = app.beneficiariosActivos.filter(reg => reg.esNuevo)
    .map(reg => objectsDiff(reg.editable, { ...objBeneficiarios }))
  return cambios.filter(cambio => objectNotEmpty(cambio))
})
const cambiosSinGuardar = computed(() => {
  return objectNotEmpty(cambiosIniciativa.value) ||
          cambiosBeneficiariosPrevios.value.length > 0 ||
          cambiosBeneficiariosNuevos.value.length > 0
})
function guardar () {
  if (objectNotEmpty(cambiosIniciativa.value)) {
    const data = { ...cambiosIniciativa.value }
    data.userMail = app.userMail
    app.update('iniciativas', iniciativa.Id, data)
  }
  if (cambiosBeneficiariosPrevios.value.length > 0) {
    const data = [...cambiosBeneficiariosPrevios.value]
    data.forEach(item => { item.cambios.userMail = app.userMail })
    console.log(data)
    app.updateBatch('beneficiarios', data)
  }
  if (cambiosBeneficiariosNuevos.value.length > 0) {
    const data = [...cambiosBeneficiariosNuevos.value]
    data.forEach(item => {
      item.userMail = app.userMail
      item.negocio = app.negocioActivo
      item.iniciativaId = app.iniciativaEditable.Id
      item.iniciativaUuid = app.iniciativaEditable.Uuid
    })
    app.createBatch('beneficiarios', data)
  }
}
</script>
