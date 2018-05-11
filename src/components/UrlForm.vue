<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
    @update:returnValue="closeDialog()">
    <v-card>
      <v-toolbar flat dark color="green">
        <v-toolbar-title> Url </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container grid-lis-md>
          <v-layout wrap>
            <v-form v-model="valid" lazy-validation>
              <v-flex xs12>
              <v-text-field :readonly="lectura" :rules="rules" v-model="entrada.url" label="Url" color="green" required></v-text-field>
            </v-flex>
            </v-form>
          </v-layout>
          <v-flex xs12>
            <v-btn v-if="!editar && lectura !== true " :disabled="!valid" dark block color="green" @click="enviarUrl(url)">Acortar Url</v-btn>
          </v-flex>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {urlService} from '@/services/Url.service'
export default {
  data () {
    return {
      valid: false,
      entrada: {},
      rules: [
        v => !!v || 'Campo es requerido'
      ],
      editar: false,
      lectura: false
    }
  },
  props: ['dialog'],
  created () {
    let vm = this
    vm.$parent.$on('editar', url => {
      vm.url = url
      vm.editar = true
    })

    vm.$parent.$on('ver', url => {
      vm.url = url
      vm.lectura = true
    })
  },
  methods: {
    enviarUrl (url) {
      let vm = this
      urlService.save(url).then(data => {
        vm.$emit('nuevaUrl', url)
        vm.closeDialog()
      }, err => {
        alert('error')
        console.log(err)
      })
    },
    closeDialog () {
      let vm = this
      vm.$emit('closeDialog')
      vm.propiedad = {}
      vm.editar = false
    }
  }
}
</script>

