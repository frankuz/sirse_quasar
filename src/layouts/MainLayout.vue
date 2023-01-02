<template>
  <q-layout view="hHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <svg version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <circle cx="100" cy="100" r="91.91" fill="#fff" stop-color="#000000" stroke="#1f485e" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
              <path d="m102.97 168.09c-1.7237 0.1184-3.4671 0.16566-5.1907 0.12626-0.46543 0.0157-1.0571-0.0197-1.6408-0.10653-1.3923-0.21693-2.7453-0.77703-3.9009-1.6093-4.0824-2.9346-5.0093-8.642-2.0747-12.717 1.7749-2.4652 4.7095-3.8891 7.7743-3.7787 1.3174 0.0473 2.6506 0.0197 3.964-0.0709 11.202-0.77704 21.39-6.4529 27.953-15.568 5.8652-8.1569 8.2121-18.108 6.5949-28.024-1.6132-9.92-6.9933-18.613-15.154-24.475-4.5439-3.2777-9.6163-5.4511-15.063-6.4608-0.0355-4e-3 -0.067-0.01973-0.0947-0.01973-1.3371-0.23271-2.623-0.77308-3.7353-1.5698-4.0469-2.9188-4.9777-8.575-2.0629-12.622 1.5856-2.197 4.0272-3.5538 6.733-3.7432 0.75337-0.05133 1.5225-0.012 2.2719 0.13013 0.0237 4e-3 0.0473 4e-3 0.075 0.012 8.074 1.5107 15.584 4.7253 22.309 9.561 24.964 17.97 30.655 52.897 12.689 77.869-9.7188 13.505-24.83 21.915-41.447 23.066" fill="#2c698a" stroke="#1f485e" stroke-width="2.5"/>
              <path d="m117.56 101.94c-3.3093 0.22878-6.3149 1.9091-8.2515 4.5951-3.5696 4.962-2.4415 11.908 2.5283 15.489 2.0984 1.5107 4.6661 2.2404 7.2378 2.0589 3.3053-0.22877 6.3149-1.8972 8.2515-4.5833 3.5775-4.9699 2.4455-11.924-2.5244-15.497-2.0984-1.5067-4.6661-2.2404-7.2418-2.0629m1.7671 25.737c-3.404 0.23667-6.8118-0.73364-9.5887-2.7334-6.5791-4.7371-8.0819-13.935-3.3487-20.514 2.5559-3.5578 6.5397-5.7745 10.922-6.0782 3.4118-0.23667 6.8158 0.73364 9.5965 2.7334 6.5712 4.7293 8.074 13.935 3.3369 20.514-2.5599 3.5578-6.5397 5.7745-10.918 6.0782" fill="#1f485e"/>
              <path d="m80.736 74.792c-3.6012 0.24849-6.8631 2.2404-8.7248 5.3248-3.1831 5.2223-1.5107 12.07 3.7274 15.237 1.9643 1.1951 4.2204 1.7513 6.5121 1.5896 3.5933-0.24849 6.8631-2.2364 8.7288-5.3169 1.5383-2.5323 1.9998-5.5142 1.2937-8.3975-0.69814-2.8715-2.4849-5.313-5.0211-6.8473-1.9722-1.1912-4.2244-1.7513-6.516-1.5896m1.7631 25.737c-3.0371 0.21694-6.023-0.50882-8.6302-2.0984-6.9262-4.2047-9.139-13.257-4.9344-20.183 2.4691-4.0784 6.7882-6.7093 11.549-7.0406 3.0411-0.213 6.0269 0.51276 8.6341 2.0984 3.3606 2.0313 5.7272 5.2617 6.6501 9.0719 0.93481 3.8142 0.32738 7.7624-1.7118 11.115-2.4731 4.0863-6.7961 6.7093-11.557 7.0367" fill="#1f485e"/>
              <path d="m96.568 143.05c-0.51276 0.0395-1.0295 0.0276-1.5343-0.0236-0.04339 0-0.08283-4e-3 -0.12227-8e-3 -8.1726-0.87564-15.904-3.4986-22.988-7.7861-26.297-15.963-34.706-50.341-18.743-76.642 9.3914-15.474 25.796-25.457 43.877-26.711l0.71787-0.04333c0.57193-0.06307 1.1636-0.07893 1.7276-0.03547 1.4318 0.1104 2.7768 0.54827 4.0193 1.3016 2.0787 1.2582 3.542 3.258 4.1218 5.6207 0.57587 2.3627 0.2051 4.8081-1.065 6.8947-1.5343 2.5244-4.2244 4.1573-7.1944 4.3624l-0.25638 0.012c-0.33527 0.01573-0.67448 0.03547-1.0097 0.0592-12.188 0.84408-23.248 7.581-29.586 18.033-10.76 17.726-5.0921 40.907 12.638 51.671 4.7845 2.907 10.015 4.6701 15.537 5.2538 1.3726 0.1104 2.7098 0.54825 3.9285 1.2898 4.2678 2.5875 5.6325 8.1569 3.045 12.417-1.5264 2.5126-4.181 4.1336-7.1116 4.3348" fill="#2c698a" stroke="#1f485e" stroke-width="2.5"/>
            </svg>
          </q-avatar>
          R.S.E.
          <span class="q-ml-lg">{{app.negocioActivo}}</span>
          <span v-if="app.activePage==='listaIniciativas' && app.negocioActivo" class="text-subtitle1"> - Lista de iniciativas</span>
        </q-toolbar-title>
        <div v-if="app.activePage==='listaIniciativas' && app.negocioActivo">
          <q-btn label="AGREGAR INICIATIVA" icon="add" color="accent" class="on-left" @click="app.crearIniciativa" />
        </div>
        <div @dblclick="loggerStoreIsVisible = true">{{app.userMail}}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="app.leftDrawerOpen"
      bordered
      class="bg-grey-2"
    >
      <q-scroll-area class="fit">
        <q-list v-if="(app.negocios.length > 1)">
          <q-item-label header class="text-weight-bold">
            NEGOCIOS
          </q-item-label>
          <q-item v-ripple clickable v-for="negocio in app.negocios" :key="negocio" @click="app.seleccionarNegocio(negocio)">
            <q-item-section>
              <q-item-label >{{negocio}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-mt-md q-mb-xs" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <ListaIniciativas v-if="app.activePage =='listaIniciativas'" />
      <FormIniciativa v-if="app.activePage=='formIniciativa'"/>
      <DialogWaiting />
      <DialogError />
    </q-page-container>
    <q-dialog maximized v-model="loggerStoreIsVisible">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <LoggerStore />
        </q-card-section>

        <q-card-section class="q-pt-none">
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import DialogError from 'src/components/DialogError.vue'
import DialogWaiting from 'src/components/DialogWaiting.vue'
import FormIniciativa from 'src/components/FormIniciativa.vue'
import ListaIniciativas from 'src/components/ListaIniciativas.vue'
import LoggerStore from 'src/components/LoggerStore.vue'
import { useAppStore } from 'stores/app'

// const $q = useQuasar()
const app = useAppStore()

const loggerStoreIsVisible = ref(false)

function toggleLeftDrawer () {
  app.leftDrawerOpen = !app.leftDrawerOpen
}

</script>
