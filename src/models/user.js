import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);

class User {
  COLLECTION_NAME = 'User';

  constructor(schemaGenerator, modelGenerator) {
    this.SchemaGenerator = schemaGenerator;
    this.modelGenerator = modelGenerator;
    return this.generate();
  }

  generate() {
    const schema = new this.SchemaGenerator(this.getSchema());
    return this.modelGenerator(this.COLLECTION_NAME, schema);
  }

  getSchema() {
    return {
      name: String,
      lastName: String,
      username: String,
      email: { type: String, required: true },
      password: { type: String, required: true }
    };
  }
}

const UserModel = new User(Schema, model);
export default UserModel;
