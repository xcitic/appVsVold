import mongoose from 'mongoose';

const LogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String
  },
  description: {
      type: String
  },
  files: [
      {
          name: {
              type: String
          },
          url: {
              type: String
          },
          fileType: {
              type: String
          }
      }
  ],
  location: {
      latitude: {
          type: Number
      },
      longitude: {
          type: Number
      },
      address: {
          type: String
      }
  },
  date: {
      type: String
  },
  hide: {
      type: Boolean,
      default: false
  }
}, {
  timestamps: true
});


export default mongoose.model('Logs', LogSchema);
