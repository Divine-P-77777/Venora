const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
    description: "Link to user profile for secure login"
  },
  org_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organizers',
    required: true,
    description: "The organizer managing this volunteer"
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },

  account_status: {
    type: String,
    enum: ["pending", "rejected", "active", "suspended"],
    required: true,
    default: "pending"
  },
  online_status: {
    type: Boolean,
    required: true,
    default: false
  },

  assigned_events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "events"
  }],

  assigned_gate: {
    type: String,
    description: "Specific gate or location the volunteer is assigned to (optional)"
  },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profiles' }
}, { timestamps: true });

const volunteerModel = mongoose.model("volunteer", VolunteerSchema)

module.exports = volunteerModel;