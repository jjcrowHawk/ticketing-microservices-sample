import { Password } from './../services/password';
import mongoose from 'mongoose';

// interface that describes the params required to create a new User
interface UserAttrs{
  email: string;
  password: string;
}

// interface that describes the properties of a User Model
interface UserModel extends mongoose.Model<any>{
  build(attrs: UserAttrs): UserDoc;
}

// interface that describes  properties that User Document has
interface UserDoc extends mongoose.Document {
  email: string,
  password: string
}

//user Schema to Create
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})

userSchema.pre('save', async function(done) {
  console.log('On save invoke: ', this);
  if(this.isModified('password')){
    const hashed= await Password.toHash(this.get('password'));
    this.set('password', hashed);
  } 
  
  done();
});

// Builder function to create a User
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User }


