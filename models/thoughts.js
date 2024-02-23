const { Schema, model } = require('mongoose');
const Reaction = require('./Reactionschema');

const thoughtSchema = new Schema(
  {
   
    createdAt: {
      type: Date,
      default: Date.now,
    //   Use a getter method to format the timestamp on query
    },
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema
  .virtual('getReactions')

  .get(function () {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);


module.exports = Thought;