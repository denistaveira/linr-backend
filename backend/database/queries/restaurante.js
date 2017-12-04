const knex = require('../connection')

// retornar filas e categorias
module.exports.getAllRestaurantes = () => {
  return knex
    .select('restaurante.*', knex.raw(
      `ARRAY(SELECT fila.id
               FROM fila
              WHERE fila.id_restaurante = restaurante.id) AS filas`))
    .from('restaurante')
    .catch(error => {
      logger.error(error)
    })
}

module.exports.getSingleRestaurante = id => {
  return knex
    .select('restaurante.*', knex.raw(
      `ARRAY(SELECT fila.id
               FROM fila
              WHERE fila.id_restaurante = restaurante.id) AS filas`))
    .from('restaurante')
    .where('restaurante.id', parseInt(id))
    .catch(error => {
      logger.error(error)
    })
}

module.exports.addRestaurante = restaurante => {
  return knex('restaurante')
    .insert(restaurante)
    .returning('*')
}

module.exports.updateRestaurante = (id, restaurante) => {
  return knex('restaurante')
    .update(restaurante)
    .where('id', parseInt(id))
    .returning('*')
}

//Avaliação

/**
 * Atualiza o valor de uma avaliação de um restaurante feita por um usuario. 
 * @param id_restaurante[int]
 * @param id_usuario_cadastrado[int]
 * @param valor[int]
 */
module.exports.updateAvaliacao = (id_restaurante, id_usuario_cadastrado, valor) => {
  return knex('avaliacao')
    .update({
      'valor': parseInt(valor),
    })
    .where({
      'id_restaurante': parseInt(id_restaurante),
      'id_usuario': parseInt(id_usuario_cadastrado),
    })
    .returning('*')
}

/**
 * Pega a média da avaliação de um restaurante. 
 * @param id_restaurante[int]
 * @param id_usuario_cadastrado[int]
 */
module.exports.getAvaliacao = (id_restaurante, id_usuario_cadastrado) => {
  return knex('avaliacao')
    .select('valor')
    .where({
      'id_restaurante': parseInt(id_restaurante),
      'id_usuario': parseInt(id_usuario_cadastrado),
    })
}

 /**
 * Pega a média da avaliação de um restaurante. 
 * @param id_restaurante 
 */
module.exports.getAverageAvaliacao = id_restaurante => {
  return knex('avaliacao')
    .avg('valor')
    .where({
      'id_restaurante': parseInt(id_restaurante),
    })
}

/**
 * Cria uma nova avaliacao com um objeto avaliacao.
 * @param id_restaurante[int]
 * @param id_usuario_cadastrado[int]
 * @param valor[int]
 */
module.exports.createAvaliacao = (id_restaurante, id_usuario_cadastrado, valor) => {
  return knex('avaliacao')
    .insert({
      id_restaurante: parseInt(id_restaurante),
      id_usuario: parseInt(id_usuario_cadastrado),
      valor: parseInt(valor),
    })
    .returning('*')
}
