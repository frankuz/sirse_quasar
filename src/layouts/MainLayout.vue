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
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          R.S.E. <span class="q-ml-lg">Alimentos al Consumidor</span>
        </q-toolbar-title>

        <div>usuario</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-grey-2"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item-label header class="text-weight-bold">
            NEGOCIOS
          </q-item-label>
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>Galletas</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-mt-md q-mb-xs" />
          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" name="school" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Gestionar permisos</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <FormInic />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FormInic from 'components/FormInic.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    FormInic
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
