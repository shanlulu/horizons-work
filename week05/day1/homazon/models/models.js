
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI);

var customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var productSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUri: String,
  price: Number
});

var Customer = mongoose.model('Customer', customerSchema);
var Product = mongoose.model('Product', productSchema);

export default {
  Customer: Customer,
  Product: Product
};
