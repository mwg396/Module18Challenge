const { Thoughts, User } = require('../models')

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
          } catch (err) {
            res.status(500).json(err);
          }
        },
        async getSingleThought(req, res) {
            try {
              const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
          
              if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }
        
              res.json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
          },
          async createThought(req, res) {
            try {
              const thought = await Thoughts.create(req.body);
              res.json(thought);
            } catch (err) {
              console.log(err);
              return res.status(500).json(err);
            }
          },

          async deleteThought(req, res) {
            try {
              const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
        
              if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
              }
        
            } catch (err) {
              res.status(500).json(err);
            }
          },

          async updateThought(req, res) {
            try {
              const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
              );
        
              if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
              }
        
              res.json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
          },
          async createReaction(req, res) {
            console.log('You are adding an reaction');
            console.log(req.body);
        
            try {
              const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
              );
        
              if (!thought) {
                return res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' });
              }
        
              res.json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
          },
     
          async deleteReaction(req, res) {
            try {
              const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { reaction: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
              );
        
              if (!thought) {
                return res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' });
              }
        
              res.json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
        },
        };
