<template>
  <div class="q-mt-md q-ml-md" style="padding-bottom:100px;">
    <div class="row q-col-gutter-md">
      <div class="col-7 offset-3 text-primary text-subtitle1 text-weight-bold q-mb-md">{{ app.iniciativaEditable.nombre }}</div>
    </div>
    <div class="row q-col-gutter-md">
      <!-- inicio panel izquierda -->
      <div class="col-3">
        <q-input
          v-model="app.iniciativaEditable.estado"
          filled
          readonly
          label-color="primary"
          label="ESTADO"
        >
        </q-input>
        <q-input
          v-model="app.iniciativaEditable.compania"
          filled
          readonly
          label-color="primary"
          label="COMPAÑÍA"
        />
      </div>
      <!-- fin panel izquierda -->
      <!-- inicio panel centro -->
      <div class="col-7">
        <q-input
          filled
          hide-bottom-space
          v-model.number="app.iniciativaEditable.volUnicosHombres"
          label-color="primary"
          mask="### ###"
          unmasked-value
          reverse-fill-mask
          label="Número de voluntarios sin repetir (HOMBRES)"
        >
          <template v-slot:prepend>
            <q-icon name="man" />
          </template>
        </q-input>
        <q-input
          filled
          hide-bottom-space
          v-model.number="app.iniciativaEditable.volUnicosMujeres"
          label-color="primary"
          mask="### ###"
          unmasked-value
          reverse-fill-mask
          class="q-mb-md"
          label="Número de voluntarias sin repetir (MUJERES)"
        >
          <template v-slot:prepend>
            <q-icon name="woman" />
          </template>
        </q-input>
        <q-input
          filled
          hide-bottom-space
          v-model.number="app.iniciativaEditable.volUnicosDinero"
          label-color="primary"
          mask="### ###"
          unmasked-value
          reverse-fill-mask
          label="Voluntarios sin repetir que participaron en acciones de DINERO"
        >
          <template v-slot:prepend>
            <q-icon name="paid" />
          </template>
        </q-input>
        <q-input
          filled
          hide-bottom-space
          v-model.number="app.iniciativaEditable.volUnicosTiempo"
          label-color="primary"
          mask="### ###"
          unmasked-value
          reverse-fill-mask
          label="Voluntarios sin repetir que participaron en acciones de TIEMPO"
        >
          <template v-slot:prepend>
            <q-icon name="watch_later" />
          </template>
        </q-input>
        <!-- {{ cambios }} -->
      </div>
      <!-- fin panel centro -->
      <!-- inicio panel derecha -->
      <div class="col-2">
        <q-card flat bordered>
          <q-card-section class="q-pa-none text-center">
            <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">VOLUNTARIOS</div>
            <div class="text-h6">{{totalVoluntarios}}</div>
          </q-card-section>
        </q-card>
      </div>
      <!-- fin panel derecha -->
    </div>
    <div class="bg-grey-2 fixed-bottom">
      <q-separator />
      <div class="flex justify-end q-py-md">
        <q-btn v-if="cambiosSinGuardar" @click="guardar" label="GUARDAR CAMBIOS" color="negative" class="q-mr-sm" />
        <q-btn @click="app.activePage='listaIniciativas'" label="VOLVER A LA LISTA" color="accent" flat class="q-mr-sm" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { objectsDiff } from 'assets/utilities'
import { useAppStore } from 'stores/app'

const app = useAppStore()
const cambios = computed(() => {
  return objectsDiff(app.iniciativaEditable, app.iniciativaActiva)
})
const cambiosSinGuardar = computed(() => {
  return JSON.stringify(cambios.value) !== '{}'
})
const totalVoluntarios = computed(() => app.iniciativaEditable.volUnicosHombres + app.iniciativaEditable.volUnicosMujeres)
function guardar () {
  const data = { ...cambios.value }
  data.numVoluntarios = totalVoluntarios.value
  data.userMail = app.userMail
  data.categorias = JSON.stringify(app.iniciativaEditable.categorias)
  app.update('iniciativas', app.iniciativaEditable.Id, data)
}
</script>
