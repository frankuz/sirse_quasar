<template>
  <div v-if="!app.negocioActivo" class="fixed-center">
    Selecciona un negocio en el menú
  </div>
  <div v-else class="row q-pa-md q-col-gutter-md" style="background-color: #CEE3EE">
    <div class="col-12 flex justify-between">
      <div class="text-h6">Lista de iniciativas</div>
      <q-btn label="AGREGAR INICIATIVA" color="accent" @click="crearIniciativa" />
    </div>
    <div
      class="col-3"
      v-for="iniciativa in app.iniciativas"
      :key="iniciativa.Id"
    >
      <q-card flat bordered @click="mostrarIniciativa(iniciativa)" style="cursor: pointer;height: 100%;">
        <q-card-section class="q-pa-sm" style="height:100%">
          <div class="column justify-between" style="height:100%;">
            <div class="col">
              <q-chip square size="sm" class="float-right q-ma-none q-pa-xs text-white" :color="getStateColor(iniciativa.estado)">
                {{ iniciativa.estado }}
              </q-chip>
              <div class="text-weight-bold text-primary ellipsis-2-lines" style="height: 2.5em;overflow: hidden;">
                {{ iniciativa.nombre }}
              </div>
              <div class="text-caption">
                {{ iniciativa.grupoInteres }} de {{ iniciativa.compania || iniciativa.negocio }}
              </div>
              <div>
                <q-chip v-for="categoria in iniciativa.categorias" :key="categoria" outline square size="sm" class="q-pa-xs" color="primary">
                  {{ categoria }}
                </q-chip>
              </div>
              <div class="q-my-sm">{{ iniciativa.descripcion }}</div>
            </div>
            <div class="col col-shrink">
              <div class="row no-wrap items-center">
                <div class="col col-shrink"><q-icon name="diversity_3" color="blue-grey-6" size="2rem" /></div>
                <div class="col-1 col-grow q-ml-sm">890</div>
                <div class="col col-shrink"><q-icon name="paid" color="blue-grey-6" size="2rem" /></div>
                <div class="col-1 col-grow q-ml-sm">{{ iniciativa.inversion }}</div>
              </div>
              <q-separator class="q-my-sm" />
              <div class="text-caption text-primary">PILAR / ASUNTO MATERIAL</div>
              <div class="text-caption">{{ iniciativa.pilar }}</div>
              <div class="text-caption ellipsis">{{ iniciativa.asuntoMaterial }}&nbsp;</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from 'stores/app'
const app = useAppStore()

function getStateColor (state) {
  let color = 'blue-grey-3'
  switch (state) {
    case 'Formulada':
      color = 'orange'
      break
    case 'Activa':
      color = 'positive'
      break
    case 'Cerrada':
      color = 'primary'
  }
  return color
}
function mostrarIniciativa (iniciativa) {
  app.iniciativaActiva = iniciativa
  app.iniciativaEditable = { ...iniciativa }
  app.beneficiariosActivos = app.beneficiarios.filter(item => item.iniciativaId === iniciativa.Id)
  app.beneficiariosActivos = app.beneficiariosActivos.map(region => ({
    actual: { ...region },
    editable: { ...region },
    esNuevo: false
  }))
  app.proyectosdcActivos = app.proyectosdc.filter(item => item.iniciativaId === iniciativa.Id)
  app.proyectosdcActivos = app.proyectosdcActivos.map(region => ({
    actual: { ...region },
    editable: { ...region },
    esNuevo: false
  }))
  app.aliadosActivos = app.aliados.filter(item => item.iniciativaId === iniciativa.Id)
  app.aliadosActivos = app.aliadosActivos.map(region => ({
    actual: { ...region },
    editable: { ...region },
    esNuevo: false
  }))
  app.activePage = 'formIniciativa'
}
function crearIniciativa () {
  app.iniciativaActiva = {}
  app.iniciativaEditable = {}
  app.iniciativaEditable.negocio = app.negocioActivo
  app.iniciativaEditable.categorias = []
  app.iniciativaEditable.userMail = app.userMail
  app.activePage = 'formIniciativa'
}
</script>
