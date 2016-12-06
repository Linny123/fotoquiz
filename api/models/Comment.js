// A model represents a collection of structured data
// Comment = represent a single comment made by a user.


module.exports = {
    attributes: {
        author: { // userame
            type: 'string',
            required: true
        },
        content: {
            type: 'string',
            required: true
        },
        CID: { // comment ID
            type: 'string'
        },
        quizID: {
            type: 'string'
        }
    }
};
