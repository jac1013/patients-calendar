import mongoose from 'mongoose';
const schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);

class User {
  COLLECTION_NAME = 'User';

  constructor(schemaGenerator, modelGenerator) {
    this.schemaGenerator = schemaGenerator;
    this.modelGenerator = modelGenerator;
    return this.generate();
  }

  generate() {
    const schema = new this.schemaGenerator(this.getSchema());
    return this.modelGenerator(this.COLLECTION_NAME, schema);
  }

  getSchema() {
    return {
      name: String,
      lastName: String,
      username: String,
      email: { type: String, required: true },
      password: {type: String, required: true}
    }
  }
}

const UserModel = new User(schema, model);
export default UserModel;
