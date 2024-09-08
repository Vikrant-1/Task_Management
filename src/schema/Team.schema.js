import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  teamname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
});
