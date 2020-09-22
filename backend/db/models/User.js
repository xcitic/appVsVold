import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = mongoose.Schema({
  username: String,
  password: String,
  firstTimeVisit: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose);

export default mongoose.model('Users', User);
