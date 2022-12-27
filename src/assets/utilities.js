function compareObj (a, b) {
  const aKeys = Object.keys(a).sort()
  const bKeys = Object.keys(b).sort()
  if (aKeys.length !== bKeys.length) return false
  if (aKeys.join('') !== bKeys.join('')) return false
  for (let i = 0; i < aKeys.length; i++) {
    if (typeof a[aKeys[i]] === 'object') {
      if (JSON.stringify(a[aKeys[i]]) !== JSON.stringify(b[bKeys[i]])) return false
    } else if (a[aKeys[i]] !== b[bKeys[i]]) return false
  }
  return true
}
function objectsDiff (newO, oldO) {
  const diff = {}
  for (const key in newO) {
    if (typeof newO[key] === 'object') {
      if (JSON.stringify(newO[key]) !== JSON.stringify(oldO[key])) diff[key] = JSON.stringify(newO[key])
    } else if (newO[key] !== oldO[key]) diff[key] = newO[key]
  }
  return diff
}
function objectNotEmpty (object) {
  return Object.keys(object).length > 0 && object.constructor === Object
}
const localRunner = {
  withSuccessHandler: function (callback) {
    return {
      template: function () {
        const res = JSON.stringify({ data: { values: [] } })
        setTimeout(() => callback(res), 3000)
      },
      obtenerDatosDelNegocio: function (negocio) {
        const res = JSON.stringify({
          data: {
            iniciativas: {
              values: [
                ['2', 'FALSE', 'Servicios', 'fasdf', 'Líderes Siglo XXI', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', ['Desarrollo de capacidades', 'Voluntariado'], 'Franklin Uribe', 'una descripción muy importante que podría incluso pasar de renglón', '', '', '12000000', 'bastantes', '3', 'una, dos y tres', 'Tiempo', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['3', 'FALSE', 'Servicios', 'fasdf', 'Formación de personas privadas de la con el nombre más largo del mundo libertad en varios asuntos', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['4', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', '', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['5', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Formulada', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['6', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Activa', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['7', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo aque mola', 'Servicios (COL)', 'Cerrada', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['8', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['9', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['10', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', 'Disponibilidad y volatilidad de las materias primas e insumos', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['11', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['12', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['13', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['14', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['15', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['16', 'FALSE', 'Servicios', 'fasdf', 'iniciativa de ejemplo', 'Servicios (COL)', 'Borrador', '', '', '', 'Comunidad', 'Educación para la sociedad', '', '', '', '', '', 'Franklin Uribe', '', 'qué super objetivo', '', '1000000', '', '', '', 'Dinero', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
              ],
              fields: ['Id', 'Activo', 'negocio', 'uuid', 'nombre', 'compania', 'estado', 'fechaInicio', 'fechaFin', 'tipoInversion', 'grupoInteres', 'pilar', 'dimension', 'asuntoMaterial', 'ods', 'zona', 'categorias', 'responsable', 'descripcion', 'objetivo', 'descripcionBeneficiarios', 'inversion', 'logros', 'numEntidades', 'entidades', 'tipoVoluntariado', 'numVolPresidentesGerentes', 'numVolAltosDirectivos', 'numVolDireccionMedia', 'numVolAdministrativos', 'numVolOperativos', 'numVoluntarios', 'numVoluntarios', 'numHorasPresidentesGerentes', 'numHorasAltosDirectivos', 'numHorasDireccionMedia', 'numHorasAdministrativos', 'numHorasOperativos', 'numHoras', 'dineroDonado', 'tipoCapacidades', 'vulnerabilidad', 'listaCapacidades', 'userMail']
            },
            beneficiarios: { values: [], fields: [] },
            proyectosdc: { values: [], fields: [] },
            aliados: { values: [], fields: [] }
          }
        })
        setTimeout(() => callback(res), 15)
      },
      getDataProject: function (project) {
        const res = JSON.stringify({ data: { values: 'uu' } })
        setTimeout(() => callback(res), 3)
      },

      getPermissions: function () {
        const res = JSON.stringify({ data: { values: [{ permission: 'EDITOR', business: 'CAFÉS' }, { permission: 'EDITOR', business: 'CARNICOS' }], userEmail: 'user@email.com' } })
        setTimeout(() => callback(res), 1)
      },
      create: function () {
        // console.info('read',tbl,val)
        const res = JSON.stringify({ data: { values: { negocio: 'Galletas', nombre: 'Sin nombre', categorias: '[]', uuid: 89 }, Id: Math.round(Math.random() * 10000) } })
        setTimeout(() => callback(res), 500)
      },
      createBatch: function (entity, data) {
        // console.info('read',tbl,val)
        data = JSON.parse(data)
        data.forEach(element => {
          element.Id = Math.round(Math.random() * 10000)
        })
        const res = JSON.stringify({ data: { values: data } })
        setTimeout(() => callback(res), 500)
      },
      update: function () {
        // console.info('update:',tbl,id)
        // console.table(val)
        const res = JSON.stringify({ data: { ok: true } })
        setTimeout(() => callback(res), 500)
      },
      updateBatch: function (entity, data) {
        // console.info('update:',tbl,id)
        // console.table(val)
        data = JSON.parse(data)
        // data.forEach(item => { item.id = item.id })
        const res = JSON.stringify({ data: { ok: true, values: data } })
        setTimeout(() => callback(res), 500)
      },
      softDelete: function (tbl, id) {
        console.info('delete:', tbl, id)
        const res = JSON.stringify({ data: { ok: true } })
        setTimeout(() => callback(res), 20)
      }
    }
  }
}

export {
  compareObj,
  objectsDiff,
  objectNotEmpty,
  localRunner
}
