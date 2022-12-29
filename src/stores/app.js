import { defineStore } from 'pinia'
import { localRunner } from 'src/assets/utilities'

const runner = window?.google?.script?.run || localRunner
const datosFromServer = JSON.parse(window.datosFromServer)

function arrayToObjects ({ values, fields }) {
  const output = []
  values.forEach(record => {
    const newObj = {}
    for (const field in fields) {
      newObj[field] = record[fields[field]]
    }
    output.push(newObj)
  })
  return output
}

function parseElement (array, key) {
  array.forEach(item => {
    let newValue
    try { newValue = JSON.parse(item[key]) } catch { newValue = [] } finally { item[key] = newValue }
  })
}

export const useAppStore = defineStore('app', {
  state: () => ({
    waitingMessage: '',
    error: {
      error: '',
      message: '',
      solution: '',
      showDefaultSolution: true,
      defaultSolution: 'Intenta actualizar la pestaña del navegador y repetir la última acción que realizaste.',
      showContact: true,
      contact: 'Si el problema persiste, por favor toma una captura de pantalla y comunícate con furibe@fundacionnutresa.'
    },
    userMail: datosFromServer.userMail,
    negocios: datosFromServer.negocios,
    tablaCompanias: datosFromServer.tablaCompanias,
    negocioActivo: '',
    companias: [],
    leftDrawerOpen: false,
    activePage: 'listaIniciativas',
    listaPilares: [
      'Cadena de valor sostenible',
      'Comunidades saludables',
      'Educación para la sociedad',
      'Voluntariado',
      'Otros proyectos sociales'
    ],
    listaAsuntosMateriales: [
      'Crecimiento rentable en los mercados',
      'Disponibilidad y volatilidad de las materias primas e insumos',
      'Entorno económico y sociopolítico',
      'Integridad y gobierno corporativo',
      'Marketing y ventas responsables',
      'Transformación digital',
      'Desarrollo territorial e inclusión social',
      'Gestión e inclusión del talento humano',
      'Innovación',
      'Nutrición y vida saludable',
      'Seguridad alimentaria',
      'Trazabilidad, calidad y seguridad de los productos',
      'Adaptación al cambio climático',
      'Biodiversidad y servicios ecosistémicos',
      'Circularidad',
      'Emisiones y mitigación del cambio climático',
      'Manejo del recurso hídrico',
      'Pérdida y desperdicio de alimentos'
    ],
    listaOds: [
      '1. Fin de la pobreza',
      '2. Hambre cero',
      '3. Salud y bienestar',
      '4. Educación de calidad',
      '5. Igualdad de género',
      '6. Agua limpia y saneamiento',
      '7. Energía asequible y no contaminante',
      '8. Trabajo decente y crecimiento económico',
      '9. Industria, innovación e infraestructura',
      '10. Reducción de las desigualdades',
      '11. Ciudades y comunidades sostenibles',
      '12. Producción y consumos responsables',
      '13. Acción por el clima',
      '14. Vida submarina',
      '15. Vida de ecosistemas terrestres',
      '16. Paz, justicia e instituciones solidas',
      '17. Alianzas para lograr los objetivos'
    ],
    listaCategorias: [
      {
        label: 'Voluntariado',
        value: 'Voluntariado'
      },
      {
        label: 'Desarrollo de capacidades',
        value: 'Desarrollo de capacidades'
      },
      {
        label: 'Modelo de relacionamiento',
        value: 'Modelo de relacionamiento'
      },
      {
        label: 'Marcas con propósito',
        value: 'Marcas con propósito'
      },
      {
        label: 'Negocios inclusivos',
        value: 'Negocios inclusivos'
      }
    ],
    iniciativas: [],
    iniciativaActiva: {},
    iniciativaEditable: {},
    beneficiarios: [],
    beneficiariosActivos: [],
    proyectosdc: [],
    proyectosdcActivos: [],
    aliados: [],
    aliadosActivos: []
  }),
  getters: {
    waitingMsgIsVisible: (state) => !!state.waitingMessage,
    errorMsgIsVisible: (state) => !!state.error.error,
    numBenefPorInic: (state) => {
      const totales = {}
      state.iniciativas.forEach(iniciativa => {
        const beneficiarios = state.beneficiarios.filter(b => b.iniciativaId === iniciativa.Id)
        const totalInic = beneficiarios.reduce((suma, elem) => {
          if (elem.total) { return suma + elem.total } else { return suma + 0 }
        }, 0)
        totales[iniciativa.Id] = totalInic
      })
      return totales
    },
    totalesPorInic: (state) => {
      const totales = {}
      state.iniciativas.forEach(iniciativa => {
        let voluntarios = 0
        const keys = ['numVolPresidentesGerentes', 'numVolAltosDirectivos', 'numVolDireccionMedia', 'numVolAdministrativos', 'numVolOperativos']
        if (iniciativa.tipoVoluntariado === 'Dinero') voluntarios = iniciativa.numVoluntarios
        else if (iniciativa.tipoVoluntariado === 'Tiempo') {
          keys.forEach(key => {
            if (iniciativa[key]) voluntarios += parseInt(iniciativa[key])
          })
        } else voluntarios = 0

        totales[iniciativa.Id] = {
          voluntarios,
          proyectosdc: state.proyectosdc.filter(i => i.iniciativaId === iniciativa.Id && i.nombre).length,
          aliados: state.aliados.filter(i => i.iniciativaId === iniciativa.Id && i.nombre).length
        }
      })
      return totales
    }
  },
  actions: {
    showError (options) {
      this.error.error = options.error || ''
      this.error.message = options.message || ''
      this.error.solution = options.solution || ''
      if (options.showDefaultSolution === false) this.error.showDefaultSolution = false
      if (options.showContact === false) this.error.showContact = false
    },
    hideError () {
      this.error.error = ''
      this.error.message = ''
      this.error.solution = ''
      this.error.showDefaultSolution = true
      this.error.showContact = true
    },
    showWaiting (message) {
      this.waitingMessage = message
    },
    hideWaiting () {
      this.waitingMessage = ''
    },
    seleccionarNegocio (negocio) {
      this.leftDrawerOpen = false
      this.activePage = 'listaIniciativas'
      this.negocioActivo = negocio
      this.companias = this.tablaCompanias.filter(comp => comp[0] === negocio).map(comp => comp[1])
      this.showWaiting('Obteniendo datos del negocio ' + negocio)
      runner.withSuccessHandler(res => {
        this.hideWaiting()
        let response
        try { response = JSON.parse(res) } catch (e) { response = false }
        if (!response) {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no es un JSON válido: ' + res
          })
        } else if (response.error) {
          this.showError({
            error: 'Ocurrió un error al obtener los datos del negocio ' + negocio,
            message: response.error.message
          })
        } else if (response.data) {
          this.showWaiting('Preparando datos...')
          this.iniciativas = arrayToObjects(response.data.iniciativas)
          parseElement(this.iniciativas, 'categorias')
          this.beneficiarios = arrayToObjects(response.data.beneficiarios)
          this.proyectosdc = arrayToObjects(response.data.proyectosdc)
          this.aliados = arrayToObjects(response.data.aliados)
          this.hideWaiting()
        } else {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no tiene la estructura esperada: ' + res
          })
        }
      }).obtenerDatosDelNegocio(negocio)
    },
    create (entity, data) {
      this.showWaiting('Guardando datos de ' + entity.toUpperCase())
      runner.withSuccessHandler(res => {
        this.hideWaiting()
        let response
        try { response = JSON.parse(res) } catch (e) { response = false }
        if (!response) {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no es un JSON válido: ' + res
          })
        } else if (response.error) {
          this.showError({
            error: 'Ocurrió un error al guardar datos de ' + entity.toUpperCase(),
            message: response.error.message
          })
        } else if (response.data) {
          const newRecord = response.data.values
          if (entity === 'iniciativas') {
            newRecord.categorias = JSON.parse(newRecord.categorias)
            this.iniciativas.push(newRecord)
            this.iniciativaActiva = this.iniciativas[this.iniciativas.length - 1]
            this.iniciativaEditable = { ...newRecord }
          }
        } else {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no tiene la estructura esperada: ' + res
          })
        }
      }).create(entity, JSON.stringify(data))
    },
    createBatch (entity, data) {
      this.showWaiting('Guardando datos de ' + entity.toUpperCase())
      runner.withSuccessHandler(res => {
        this.hideWaiting()
        let response
        try { response = JSON.parse(res) } catch (e) { response = false }
        if (!response) {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no es un JSON válido: ' + res
          })
        } else if (response.error) {
          this.showError({
            error: 'Ocurrió un error al guardar datos de ' + entity.toUpperCase(),
            message: response.error.message
          })
        } else if (response.data) {
          const newRecords = response.data.values
          if (entity === 'beneficiarios') {
            this.beneficiarios = [...this.beneficiarios, ...newRecords]
            this.beneficiariosActivos = this.beneficiarios.filter(item => item.iniciativaId === this.iniciativaActiva.Id)
            this.beneficiariosActivos = this.beneficiariosActivos.map(item => ({
              actual: { ...item },
              editable: { ...item },
              esNuevo: false
            }))
          }
          if (entity === 'proyectosdc') {
            this.proyectosdc = [...this.proyectosdc, ...newRecords]
            this.proyectosdcActivos = this.proyectosdc.filter(item => item.iniciativaId === this.iniciativaActiva.Id)
            this.proyectosdcActivos = this.proyectosdcActivos.map(item => ({
              actual: { ...item },
              editable: { ...item },
              esNuevo: false
            }))
          }
        } else {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no tiene la estructura esperada: ' + res
          })
        }
      }).createBatch(entity, JSON.stringify(data))
    },
    update (entity, id, data) {
      this.showWaiting('Actualizando datos de ' + entity.toUpperCase())
      runner.withSuccessHandler(res => {
        this.hideWaiting()
        let response
        try { response = JSON.parse(res) } catch (e) { response = false }
        if (!response) {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no es un JSON válido: ' + res
          })
        } else if (response.error) {
          this.showError({
            error: 'Ocurrió un error al guardar datos de ' + entity.toUpperCase(),
            message: response.error.message
          })
        } else if (response.data) {
          if (entity === 'iniciativas') {
            const index = this.iniciativas.findIndex(item => item.Id === id)
            this.iniciativas[index] = { ...this.iniciativaEditable }
            this.iniciativaActiva = this.iniciativas[index]
          }
        } else {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no tiene la estructura esperada: ' + res
          })
        }
      }).update(entity, id, JSON.stringify(data))
    },
    updateBatch (entity, data) {
      this.showWaiting('Actualizando datos de ' + entity.toUpperCase())
      runner.withSuccessHandler(res => {
        this.hideWaiting()
        let response
        try { response = JSON.parse(res) } catch (e) { response = false }
        if (!response) {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no es un JSON válido: ' + res
          })
        } else if (response.error) {
          this.showError({
            error: 'Ocurrió un error al guardar datos de ' + entity.toUpperCase(),
            message: response.error.message
          })
        } else if (response.data) {
          const editedRecords = response.data.values
          if (entity === 'beneficiarios') {
            editedRecords.forEach(editedRecord => {
              const id = editedRecord.id
              const record = this.beneficiariosActivos.find(item => item.editable.Id === id)
              record.actual = { ...record.editable }
              const index = this.beneficiarios.findIndex(item => item.Id === id)
              this.beneficiarios[index] = { ...record.editable }
            })
          }
          if (entity === 'proyectosdc') {
            editedRecords.forEach(editedRecord => {
              const id = editedRecord.id
              const record = this.proyectosdcActivos.find(item => item.editable.Id === id)
              record.actual = { ...record.editable }
              const index = this.proyectosdc.findIndex(item => item.Id === id)
              this.proyectosdc[index] = { ...record.editable }
            })
          }
        } else {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no tiene la estructura esperada: ' + res
          })
        }
      }).updateBatch(entity, JSON.stringify(data))
    },
    readDB (options) {
      runner.withSuccessHandler((response) => {
        this.hideWaiting()
        this.showError({
          error: 'Ocurrió un error al guardar',
          message: 'chanfle:' + response,
          solution: 'ni idea'
        })
      }).create(options)
    }
  }
})
