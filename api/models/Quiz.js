module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true
    },
    content: {
      type: 'string',
      defaultsTo: 'Can you guess my location?'
    },
    hint: {
      type: 'string'
    },
    imageID: {
      type: 'string'
    },
    imageURL: {
      type: 'string'
    },
    imageDeletehash: {
      type: 'string'
    },
    locationLat: {
      type: 'string'
    },
    locationLon: {
      type: 'string'
    },
  }
};
