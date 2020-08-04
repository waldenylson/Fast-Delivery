const get = ({ db }) => async(req, res) => {
    const { user } = res.locals
    const deliveries = await db.select('*').from('deliveries').where('user_id', user.id)
    res.send({
      data: deliveries,
      pagination: {
        message: 'soon :)'
      }
    })
  
}

const create = ({ db }) => async(req, res) => {
  const { user } = res.locals
  const newDelivery = req.body
  const deliveryToInsert = {
    name_client: newDelivery.name_client,
    starting_point: newDelivery.starting_point,
    destination_point: newDelivery.destination_point,
    date: newDelivery.date,
    user_id: user.id
  }

  await db.insert(deliveryToInsert).into('deliveries')
  res.send(deliveryToInsert)
}

module.exports = {
  get,
  create
}
