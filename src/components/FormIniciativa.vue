<template>
  <div class="q-mt-md q-ml-md" style="padding-bottom:100px;">
    <div class="row q-col-gutter-md">
      <!-- inicio panel izquierda -->
      <div class="col-3">
        <q-select
          v-model="app.iniciativaEditable.estado"
          :options="['Borrador','Formulada','Activa','Cerrada']"
          filled
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.estado}"
          label="ESTADO"
        >
          <template v-slot:after>
            <q-btn round dense flat icon="help" @click="ayudaEstado"/>
          </template>
        </q-select>
        <q-select
          v-model="app.iniciativaEditable.compania"
          filled
          :options="app.companias"
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.compania}"
          label="COMPAÑÍA"
        />
        <q-input
          v-model="app.iniciativaEditable.fechaInicio"
          :rules="['date']"
          filled
          hide-bottom-space
          mask="date"
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.fechaInicio}"
          label="FECHA INICIO"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="app.iniciativaEditable.fechaInicio" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="app.iniciativaEditable.fechaFin"
          :rules="['date']"
          filled
          hide-bottom-space
          mask="date"
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.fechaFin}"
          label="FECHA FIN"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="app.iniciativaEditable.fechaFin" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          v-model="app.iniciativaEditable.tipoInversion"
          :options="['Actividades Caritativas','Iniciativas Comerciales','Inversión Comunitaria']"
          filled
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.tipoInversion}"
          label="TIPO DE INVERSIÓN"
        />
        <q-select
          v-model="app.iniciativaEditable.grupoInteres"
          :options="['Comunidad','Proveedores','Clientes']"
          filled
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.grupoInteres}"
          label="GRUPO DE INTERÉS"
        />
        <q-select
          filled
          v-model="app.iniciativaEditable.pilar"
          :options="app.listaPilares"
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.pilar}"
          label="PILAR"
        />
        <q-select
          filled
          v-model="app.iniciativaEditable.asuntoMaterial"
          :options="app.listaAsuntosMateriales"
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.asuntoMaterial}"
          label="ASUNTO MATERIAL"
        />
        <!-- <q-select
          filled
          v-model="app.iniciativaEditable.ods"
          :options="app.listaOds"
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.ods}"
          label="ODS"
        /> -->
        <q-select
          filled
          v-model="app.iniciativaEditable.zona"
          :options="['Urbana','Periurbana','Rural']"
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.zona}"
          label="ZONA"
        />
      </div>
      <!-- fin panel izquierda -->
      <!-- inicio panel centro -->
      <div class="col-7 q-gutter-md">
        <q-input
          filled
          hide-bottom-space
          v-model="app.iniciativaEditable.nombre"
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.nombre}"
          label="NOMBRE DE LA INICIATIVA"
        />
        <q-input
          filled
          hide-bottom-space
          v-model="app.iniciativaEditable.responsable"
          label-color="primary"
          :class="{'bg-yellow-3':!app.iniciativaEditable.responsable}"
          label="RESPONSABLE"
        />
        <div class="flex">
          <q-input
            filled
            autogrow
            v-model="app.iniciativaEditable.descripcion"
            label-color="primary"
            class="col-grow"
            :class="{'bg-yellow-3':!app.iniciativaEditable.descripcion}"
            label="DESCRIPCIÓN DE LA INICIATIVA"
          />
          <q-select
            v-if="app.iniciativaEditable.categorias.includes('Voluntariado')"
            filled
            v-model="app.iniciativaEditable.tipoVoluntariado"
            class="q-ml-sm"
            :options="['Dinero','Tiempo']"
            label-color="primary"
            :class="{'bg-yellow-3':!app.iniciativaEditable.tipoVoluntariado}"
            style="width: 200px;"
            label="TIPO VOLUNTARIADO"
          />
        </div>
        <div class="q-px-sm">
          <div class="row items-center">
            <span class="text-overline text-primary">CATEGORÍAS ESPECIALES</span>
            <q-btn round flat icon="help" color="grey-7" @click="(modal.seleccionarCategoria = true)"/>
          </div>
          <!-- <q-chip
            v-for="c in app.iniciativaEditable.categorias"
            :key="c"
            outline
            square
            color="primary"
            text-color="white"
            class="q-ma-xs"
            :label="c"
          /> -->
          <!-- <q-btn round size="sm" color="accent" icon="edit_note" @click="(modal.seleccionarCategoria = true)">
            <q-tooltip>Seleccionar categorías</q-tooltip>
          </q-btn> -->
          <q-option-group
              v-model="app.iniciativaEditable.categorias"
              :options="app.listaCategorias"
              color="accent"
              type="checkbox"
              class="text-grey-7"
              dense
          >
            <template v-slot:label="opt">
              <div class="row items-center">
                <span :class="{'text-primary text-weight-bold':app.iniciativaEditable.categorias.includes(opt.value)}">
                  {{ opt.label }}
                </span>
              </div>
            </template>
          </q-option-group>
        </div>
        <q-dialog v-model="modal.seleccionarCategoria" persistent>
          <q-card>
            <q-card-section>
              <div class="text-h6 text-primary q-mb-md">Categorías especiales</div>
              <p>
                Algunas iniciativas hacen parte de modelos y procesos más grandes<br>
                que aquí llamamos <b>categorías especiales</b>.
              </p>
              <p>
                Si esta iniciativa NO está relacionada con ninguna de las categorías <br>
                de abajo, NO marque ninguna opción.<br>
              </p>
              <p>
                Es posible que algunas iniciativas se clasifiquen en varias categorías.
              </p>
            </q-card-section>
            <!-- <q-option-group
              v-model="app.iniciativaEditable.categorias"
              :options="app.listaCategorias"
              color="accent"
              type="checkbox"
            /> -->
            <q-separator />
            <q-card-actions align="right">
              <q-btn color="accent" flat @click="(modal.seleccionarCategoria = false)">cerrar</q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <div v-if="app.iniciativaEditable.categorias.includes('Desarrollo de capacidades')">
          <div class="text-overline text-primary">FORMULACIÓN DE LA INICIATIVA DE DESARROLLO DE CAPACIDADES</div>
          <div
            v-for="soporte in app.soportesActivos.iniciativa"
            :key="soporte.uuid"
            class="text-weight-bold text-primary q-mb-sm"
            >
            <a target="_blank" :href="'https://drive.google.com/file/d/' + soporte.uuid + '/view'">{{ soporte.nombre }}</a>
          </div>
          <div v-if="!app.soportesActivos.iniciativa.length">
            Las iniciativas de Desarrollo de capacidades
            deben estar formuladas en una copia de
            <a href="https://docs.google.com/document/d/1WBQSrzKwEHA37Rr4Q6EZJBUSyAPqU3R-3IT36yrBzrE/copy" target="_blank">esta plantilla</a>.
            <q-file filled v-model="file" label="Seleccionar archivo con la formulación (máximo 50Mb)" max-file-size="52428800" class="q-my-md">
              <template v-slot:after>
                <q-btn  flat icon-right="upload" color="accent" @click="uploadFile('iniciativa')" label="SUBIR"/>
              </template>
            </q-file>
          </div>
        </div>
        <!-- {{ cambios }} -->
      </div>
      <!-- fin panel centro -->
      <!-- inicio panel derecha -->
      <div class="col-2">
        <q-card flat bordered>
          <q-card-section class="q-pa-none text-center">
            <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">INVERSIÓN</div>
            <div class="text-h6">$ {{app.iniciativaEditable.inversion}}</div>
            <div v-if="app.iniciativaEditable.categorias.includes('Voluntariado')">
              <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">VOLUNTARIOS</div>
              <div class="text-h6">{{ app.totalesPorInic[app.iniciativaEditable.Id]?.voluntarios || 0 }}</div>
            </div>
            <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">BENEFICIARIOS</div>
            <div class="text-h6">{{ app.numBenefPorInic[app.iniciativaEditable.Id] || 0 }}</div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="accent" @click="mostrarReporte('reporte')">REPORTE</q-btn>
          </q-card-actions>
        </q-card>
        <q-card flat bordered class="q-my-md">
          <q-card-section class="q-pa-xs text-center">
            <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">ALIADOS</div>
            <div class="text-h6">{{ app.totalesPorInic[app.iniciativaEditable.Id]?.aliados || 0 }}</div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="accent" @click="mostrarReporte('aliados')">REPORTE</q-btn>
          </q-card-actions>
        </q-card>
        <q-card flat bordered class="q-my-md" v-if="app.iniciativaEditable.categorias.includes('Desarrollo de capacidades')">
          <q-card-section class="q-pa-xs text-center">
            <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">PROYECTOS D.C.</div>
            <div class="text-h6">{{ app.totalesPorInic[app.iniciativaEditable.Id]?.proyectosdc || 0}}</div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="accent" @click="mostrarReporte('proyectosdc')">REPORTE</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <!-- fin panel derecha -->
    </div>
    <q-dialog persistant v-model="modal.reporte">
      <FormIniciativaReporte />
    </q-dialog>
    <q-dialog persistant v-model="modal.aliados">
      <FormIniciativaAliados />
    </q-dialog>
    <q-dialog persistant v-model="modal.proyectosdc">
      <FormIniciativaProyectosDC />
    </q-dialog>
    <div class="bg-grey-2 fixed-bottom">
      <q-separator />
      <div class="flex justify-end q-py-md">
        <q-btn v-if="cambiosSinGuardar && !someModalVisible" @click="guardar" label="GUARDAR CAMBIOS" color="negative" class="q-mr-sm" />
        <q-btn @click="app.activePage='listaIniciativas'" label="VOLVER A LA LISTA" color="accent" flat class="q-mr-sm" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import FormIniciativaReporte from 'src/components/FormIniciativaReporte.vue'
import FormIniciativaAliados from 'src/components/FormIniciativaAliados.vue'
import FormIniciativaProyectosDC from './FormIniciativaProyectosDC.vue'
import { objectsDiff } from 'assets/utilities'
import { useAppStore } from 'stores/app'

const app = useAppStore()
const $q = useQuasar()
const modal = ref({
  seleccionarCategoria: false,
  reporte: false,
  proyectosdc: false,
  aliados: false
})
const someModalVisible = computed(() => Object.values(modal.value).some(v => v))
const cambios = computed(() => {
  return objectsDiff(app.iniciativaEditable, app.iniciativaActiva)
})
const cambiosSinGuardar = computed(() => {
  return JSON.stringify(cambios.value) !== '{}'
})
function guardar () {
  const data = { ...cambios.value }
  data.negocio = app.negocioActivo
  data.userMail = app.userMail
  data.categorias = JSON.stringify(app.iniciativaEditable.categorias)
  if (app.iniciativaEditable.uuid) app.update('iniciativas', app.iniciativaEditable.Id, data)
  else app.create('iniciativas', data)
}
function mostrarReporte (tipoReporte) {
  if (!app.iniciativaEditable.uuid) {
    $q.dialog({
      title: 'Atención',
      message: 'Debe diligenciar y guardar la información de la iniciativa antes de continuar'
    })
  } else if (cambiosSinGuardar.value) {
    $q.dialog({
      title: 'Atención',
      message: 'Debe guardar los cambios de la iniciativa antes de continuar'
    })
  } else modal.value[tipoReporte] = true
}
function ayudaEstado () {
  $q.dialog({
    title: 'Estados de las iniciativas',
    message: `
      <span style="background:#B0BEC5;color:white;padding:0 7px;font-size:0.9em;border-radius:5px;">BORRADOR</span>
      Iniciativas con información preliminar. 
      La información de las iniciativas en estado BORRADOR no se tienen en cuenta para el reporte.<br><br>
      <span style="background:#FF9800;color:white;padding:0 7px;font-size:0.9em;border-radius:5px;">FORMULADA</span>
      Iniciativas que están planificadas y programadas pero que todavía no se han empezado a implementar.<br><br>
      <span style="background:#43B02A;color:white;padding:0 7px;font-size:0.9em;border-radius:5px;">ACTIVA</span>
      Iniciativas que se están desarrollando y que probablemente continúen en los años siguientes.<br><br>
      <span style="background:#2E6B89;color:white;padding:0 7px;font-size:0.9em;border-radius:5px;">CERRADA</span>
      Iniciativas que ya se desarrollaron por completo y ya no se realizarán más acciones en el futuro.<br><br>
    `,
    html: true,
    ok: 'CERRAR',
    style: 'width: 800px;'
  })
}
const file = ref(null)
function uploadFile (tipo) {
  if (!file.value) return
  app.uploadFile(file.value, tipo)
  file.value = null
}
// const iniciativa = ref({
//   id: 'blabla',
//   nombre: 'Buen Vecino - Barrio Las Margaritas',
//   responsable: 'Juan',
//   categorias: [],
//   descripcion: 'Fortalecimiento de líderes comunitarios para que puedan movilizar acciones que identifiquen y cierren las brechas sociales y ambientales del barrio.',
//   objetivo: 'Desarrollar habilidades de comunicación, coordinación y liderazgo en 14 líderes comunitarios durante 6 meses.',
//   descripcionBeneficiarios: '12 líderes de la comunidad, incluidos ediles, rectores, madres comunitarias y líderes de asociaciones juveniles. ',
//   estado: null,
//   fechaInicio: null,
//   fechaFin: null,
//   tipoInversion: null,
//   grupoInteres: null,
//   pilar: null,
//   asuntoMaterial: null,
//   ods: null,
//   zona: null,
//   tipoVoluntariado: null
// })
// app.iniciativaActiva = iniciativa
// const accept = ref(true)

// function onSubmit () {
//   if (accept.value !== true) {
//     $q.notify({
//       color: 'red-5',
//       textColor: 'white',
//       icon: 'warning',
//       message: 'You need to accept the license and terms first'
//     })
//   } else {
//     $q.notify({
//       color: 'green-4',
//       textColor: 'white',
//       icon: 'cloud_done',
//       message: 'Submitted'
//     })
//   }
// }

// function onReset () {
//   name.value = null
// }
</script>
