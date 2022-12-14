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
    leftDrawerOpen: false,
    activePage: 'listaIniciativas',
    listaPilares: [
      'Cadena de valor sostenible',
      'Comunidades saludables',
      'Educación para la sociedad',
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
      },
      {
        label: 'Entrega de productos a bancos de alimentos de Colombia',
        value: 'Entrega de productos a bancos de alimentos de Colombia'
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
    aliadosActivos: [],
    soportes: [],
    filtrosIniciativas: {
      compania: '',
      estado: '',
      grupoInteres: '',
      pilar: '',
      categorias: ''
    },
    dialogFiltrosIniciativasIsVisible: false
  }),
  getters: {
    waitingMsgIsVisible: (state) => !!state.waitingMessage,
    errorMsgIsVisible: (state) => !!state.error.error,
    companias: (state) => {
      if (!state.negocioActivo) return []
      return state.tablaCompanias.filter(row => row[0] === state.negocioActivo).map(row => row[1])
    },
    iniciativasFiltradas: (state) => {
      const filt = state.filtrosIniciativas
      return state.iniciativas.filter(iniciativa => {
        for (const camp in filt) {
          if (!filt[camp]) continue
          if (camp === 'categorias') {
            if (!iniciativa.categorias.includes(filt[camp])) return false
          } else if (iniciativa[camp] !== filt[camp]) return false
        }
        return true
      })
    },
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
    },
    numFiltrosIniciativas: (state) => Object.values(state.filtrosIniciativas).filter(v => v).length,
    soportesActivos: (state) => {
      const soportes = { reporte: [], proyectosdc: [], aliado: [], iniciativa: [], iniciativaURL: [] }
      const id = state.iniciativaActiva.Id
      if (id) {
        for (const tipo in soportes) soportes[tipo] = state.soportes.filter(s => s.iniciativaId === id && s.tipo === tipo)
      }
      return soportes
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
    resetFiltrosIniciativas () {
      for (const field in this.filtrosIniciativas) {
        this.filtrosIniciativas[field] = ''
      }
    },
    seleccionarNegocio (negocio) {
      this.leftDrawerOpen = false
      this.activePage = 'listaIniciativas'
      this.negocioActivo = negocio
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
          this.soportes = arrayToObjects(response.data.soportes)
          this.filtrosIniciativas.compania = ''
          this.hideWaiting()
        } else {
          this.showError({
            error: 'Ocurrió un error en la comunicación con el servidor',
            message: 'La respuesta del servidor no tiene la estructura esperada: ' + res
          })
        }
      }).obtenerDatosDelNegocio(negocio)
    },
    crearIniciativa () {
      this.iniciativaActiva = { negocio: this.negocioActivo, categorias: [] }
      this.iniciativaEditable = { ...this.iniciativaActiva }
      this.beneficiariosActivos = []
      this.proyectosdcActivos = []
      this.aliadosActivos = []
      this.activePage = 'formIniciativa'
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
          if (entity === 'aliados') {
            this.aliados = [...this.aliados, ...newRecords]
            this.aliadosActivos = this.aliados.filter(item => item.iniciativaId === this.iniciativaActiva.Id)
            this.aliadosActivos = this.aliadosActivos.map(item => ({
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
          if (entity === 'aliados') {
            editedRecords.forEach(editedRecord => {
              const id = editedRecord.id
              const record = this.aliadosActivos.find(item => item.editable.Id === id)
              record.actual = { ...record.editable }
              const index = this.aliados.findIndex(item => item.Id === id)
              this.aliados[index] = { ...record.editable }
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
    uploadFile (file, tipo) {
      this.showWaiting('Subiendo archivo')
      const reader = new FileReader()
      reader.onloadend = ev => {
        if (ev.target.error !== null) {
          this.showError({
            error: 'Ocurrió un error al leer el archivo',
            message: ev.target.error
          })
        } else {
          const registro = {
            negocio: this.negocioActivo,
            iniciativaId: this.iniciativaActiva.Id,
            iniciativaUuid: this.iniciativaActiva.uuid,
            nombre: file.name,
            tipo
          }
          runner.withSuccessHandler(this.uploadFileSuccess).uploadFileToGoogleDrive(ev.target.result, registro)
        }
      }
      reader.readAsDataURL(file)
    },
    uploadFileSuccess (res) {
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
          error: 'Ocurrió un error al subir el archivo',
          message: response.error.message
        })
      } else if (response.data) {
        const newRecord = response.data.values
        this.soportes.push(newRecord)
      } else {
        this.showError({
          error: 'Ocurrió un error en la comunicación con el servidor',
          message: 'La respuesta del servidor no tiene la estructura esperada: ' + res
        })
      }
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
