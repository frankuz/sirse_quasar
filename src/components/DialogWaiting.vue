<template>
  <q-dialog v-model="app.waitingMsgIsVisible">
    <q-card style="max-width: 500px">
      <q-card-section class="q-pt-none text-center">
        <q-spinner-ios
          color="primary"
          size="5em"
          :thickness="3"
          class="q-my-lg"
        />
        <div>{{app.waitingMessage}}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useAppStore } from 'stores/app'
const app = useAppStore()
</script>
