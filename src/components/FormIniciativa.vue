<template>
  <div class="q-mt-md q-ml-md" style="padding-bottom:100px;">
    <div class="row q-col-gutter-md">
      <!-- inicio panel izquierda -->
      <div class="col-3">
        <q-select
          v-model="iniciativa.estado"
          :options="['Borrador','Formulada','Activa','Cerrada']"
          filled
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.estado}"
          label="ESTADO"
        />
        <q-select
          v-model="iniciativa.compania"
          filled
          :options="app.companias"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.compania}"
          label="COMPAÑÍA"
        />
        <q-input
          v-model="iniciativa.fechaInicio"
          :rules="['date']"
          filled
          hide-bottom-space
          mask="date"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.fechaInicio}"
          label="FECHA INICIO"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="iniciativa.fechaInicio" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="iniciativa.fechaFin"
          :rules="['date']"
          filled
          hide-bottom-space
          mask="date"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.fechaFin}"
          label="FECHA FIN"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="iniciativa.fechaFin" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          v-model="iniciativa.tipoInversion"
          :options="['Actividades Caritativas','Iniciativas Comerciales','Inversión Comunitaria']"
          filled
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.tipoInversion}"
          label="TIPO DE INVERSIÓN"
        />
        <q-select
          v-model="iniciativa.grupoInteres"
          :options="['Comunidad','Proveedores','Clientes']"
          filled
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.grupoInteres}"
          label="GRUPO DE INTERÉS"
        />
        <q-select
          filled
          v-model="iniciativa.pilar"
          :options="app.listaPilares"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.pilar}"
          label="PILAR"
        />
        <q-select
          filled
          v-model="iniciativa.asunto"
          :options="app.listaAsuntosMateriales"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.asunto}"
          label="ASUNTO MATERIAL"
        />
        <!-- <q-select
          filled
          v-model="iniciativa.ods"
          :options="app.listaOds"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.ods}"
          label="ODS"
        /> -->
        <q-select
          filled
          v-model="iniciativa.zona"
          :options="['Urbana','Periurbana','Rural']"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.zona}"
          label="ZONA"
        />
        <!-- <q-input
          filled
          autogrow
          label="Documento con la formulación de la iniciativa"
          hint=""
        /> -->
      </div>
      <!-- fin panel izquierda -->
      <!-- inicio panel centro -->
      <div class="col-7 q-gutter-md">
        <q-input
          filled
          hide-bottom-space
          v-model="iniciativa.nombre"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.nombre}"
          label="NOMBRE DE LA INICIATIVA"
        />
        <q-input
          filled
          hide-bottom-space
          v-model="iniciativa.responsable"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.responsable}"
          label="RESPONSABLE"
        />
        <div class="q-px-sm">
          <div class="text-overline text-primary">CATEGORÍAS ESPECIALES</div>
          <q-chip
            v-for="c in iniciativa.categorias"
            :key="c"
            outline
            square
            color="primary"
            text-color="white"
            class="q-ma-xs"
            :label="c"
          />
          <q-btn round size="sm" color="accent" icon="edit_note" @click="(modal.seleccionarCategoria = true)">
            <q-tooltip>Seleccionar categorías</q-tooltip>
          </q-btn>
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
            <q-option-group
              v-model="iniciativa.categorias"
              :options="app.listaCategorias"
              color="accent"
              type="checkbox"
            />
            <q-separator />
            <q-card-actions align="right">
              <q-btn color="accent" flat @click="(modal.seleccionarCategoria = false)">cerrar</q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <div class="flex">
          <q-input
            filled
            autogrow
            v-model="iniciativa.descripcion"
            label-color="primary"
            class="col-grow"
            :class="{'bg-yellow-3':!iniciativa.descripcion}"
            label="DESCRIPCIÓN DE LA INICIATIVA"
          />
          <q-select
            v-if="iniciativa.categorias.includes('Voluntariado')"
            filled
            v-model="iniciativa.tipoVoluntariado"
            class="q-ml-sm"
            :options="['Dinero','Tiempo']"
            label-color="primary"
            :class="{'bg-yellow-3':!iniciativa.tipoVoluntariado}"
            style="width: 200px;"
            label="TIPO VOLUNTARIADO"
          />
        </div>
        <q-input
          filled
          autogrow
          v-model="iniciativa.objetivo"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.objetivo}"
          label="OBJETIVO DE LA INICIATIVA"
        />
        <q-input
          filled
          autogrow
          v-model="iniciativa.descripcionBeneficiarios"
          label-color="primary"
          :class="{'bg-yellow-3':!iniciativa.descripcionBeneficiarios}"
          label="DESCRIPCIÓN DE LOS BENEFICIARIOS"
        />
        {{ cambios }}
      </div>
      <!-- fin panel centro -->
      <!-- inicio panel derecha -->
      <div class="col-2">
        <q-card flat bordered>
          <q-card-section class="q-pa-none text-center">
            <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">INVERSIÓN</div>
            <div class="text-h6">$ 1 020 000 000</div>
            <div v-if="iniciativa.categorias.includes('Voluntariado')">
              <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">VOLUNTARIOS</div>
              <div class="text-h6">200</div>
            </div>
            <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">BENEFICIARIOS</div>
            <div class="text-h6">200</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center">
            <q-btn color="accent" @click="(modal.reporte = true)">REPORTE</q-btn>
          </q-card-actions>
        </q-card>
        <q-card flat bordered class="q-my-md" style="display: none;">
          <q-card-section class="q-pa-xs text-center">
            <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">ALIADOS</div>
            <div class="text-h6">0</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center">
            <q-btn flat color="accent">REPORTE</q-btn>
          </q-card-actions>
        </q-card>
        <q-card flat bordered class="q-my-md" v-if="iniciativa.categorias.includes('Desarrollo de capacidades')">
          <q-card-section class="q-pa-xs text-center">
            <div class="text-overline text-primary q-mt-md" style="line-height: 0.5rem;">PROYECTOS D.C.</div>
            <div class="text-h6">0</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center">
            <q-btn color="accent" @click="(modal.proyectosDC=true)">REPORTE</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <!-- fin panel derecha -->
    </div>
    <q-dialog persistant v-model="modal.reporte">
      <FormIniciativaReporte />
    </q-dialog>
    <q-dialog persistant v-model="modal.proyectosDC">
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
// import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import FormIniciativaReporte from 'src/components/FormIniciativaReporte.vue'
import FormIniciativaProyectosDC from './FormIniciativaProyectosDC.vue'
import { objectsDiff } from 'assets/utilities'
import { useAppStore } from 'stores/app'

const app = useAppStore()
// const $q = useQuasar()
const modal = ref({
  seleccionarCategoria: false,
  reporte: false,
  proyectosDC: false,
  aliados: false
})
const someModalVisible = computed(() => Object.values(modal.value).some(v => v))
const iniciativa = app.iniciativaEditable
const cambios = computed(() => {
  return objectsDiff(iniciativa, app.iniciativaActiva)
})
const cambiosSinGuardar = computed(() => {
  return JSON.stringify(cambios.value) !== '{}'
})
function guardar () {
  const data = { ...cambios.value }
  data.userMail = app.userMail
  if (!data.categorias) data.categorias = []
  data.categorias = JSON.stringify(data.categorias)
  if (iniciativa.uuid) app.update('iniciativas', iniciativa.Id, data)
  else app.create('iniciativas', data)
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
