<template>
  <q-dialog persistent v-model="app.errorMsgIsVisible">
    <q-card style="max-width: 600px">
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col col-shrink q-py-md">
            <q-icon name="report_gmailerrorred" color="negative" size="5rem" class="q-mr-sm"/>
          </div>
          <div class="col q-py-md q-col-gutter-sm">
            <div class="text-weight-bold">{{app.error.error}}</div>
            <div>{{app.error.message}}</div>
            <div>{{app.error.solution}}</div>
            <div v-if="app.error.showDefaultSolution">{{app.error.defaultSolution}}</div>
            <div v-if="app.error.showContact">{{app.error.contact}}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="accent" flat label="CERRAR" @click="app.hideError"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useAppStore } from 'stores/app'
const app = useAppStore()
</script>
