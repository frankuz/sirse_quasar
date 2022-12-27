<template>
  <q-dialog persistent v-model="app.waitingMsgIsVisible">
    <q-card style="width: 500px">
      <q-card-section class="q-pt-none text-center">
        <q-spinner-ios
          color="primary"
          size="5rem"
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
