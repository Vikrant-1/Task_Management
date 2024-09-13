import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 300,
    },
    refType: {
      type: String,
      enum: ["Task", "Project", "Message"],
      required: true,
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "refType",
      required: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
CommentSchema.index({ refId: 1, refType: 1, commentedBy: 1 });

export { Comment };
