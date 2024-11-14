import mongoose from 'mongoose';


const FieldSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'email', 'password', 'date'],
  },
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    required: true,
  },
});


const FormSchema = new mongoose.Schema({
  fields: [FieldSchema],
});


const Form = mongoose.model('Form', FormSchema);

export default Form;
