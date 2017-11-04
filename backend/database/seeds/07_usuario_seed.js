exports.seed = (knex, Promise) => {
  return knex('usuario').del()
    .then(() => {
      return knex('usuario').insert([
        {
          id: 1,
          nome: 'Usuario 1',
          telefone: '111111111',
        },
        {
          id: 2,
          nome: 'Usuario 2',
          telefone: '222222222',
        },
        {
          id: 3,
          nome: 'Usuario 3',
          telefone: '333333333',
        },
      ])
    })
}
