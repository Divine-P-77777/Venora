const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  description: { type: String },
  

  permissions: {
    products: { read: Boolean, write: Boolean, delete: Boolean },
    users:    { read: Boolean, write: Boolean, delete: Boolean },
    billing:  { read: Boolean, write: Boolean, delete: Boolean },
    analytics:{ read: Boolean, write: Boolean, delete: Boolean }
  },
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profiles' }
}, { timestamps: true });

const roleModel = mongoose.model("roles", RoleSchema)

module.exports = roleModel;