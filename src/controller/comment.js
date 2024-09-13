import { Comment } from "../schema/Comment.schema";

const createComment = async ({ refType, commentedBy, refId, content }) => {
  const comment = await Comment.create({
    refId: refId,
    refType,
    commentedBy,
    content,
  });
  if (!comment) {
    return {
      error: true,
      message: "Failed to create comment",
      statusCode: 404,
    };
  }
  return {
    success: true,
    message: "Succesfully create the comment",
    statusCode: 201,
    data: comment,
  };
};

const editComment = async ({ commentId, userId, content }) => {
  const comment = await Comment.findById(commentId);
  if (userId !== comment.commentedBy) {
    return {
      error: true,
      message: "You can't edit this comment.",
      statusCode: 403,
    };
  }
  if (content === comment.content) {
    return {
      success: true,
      message: "Succesfully update the comment",
      statusCode: 200,
      data: comment,
    };
  }
  const updatedComment = await Comment.updateOne(
    { _id: commentId },
    { content: content }
  );
  if (!updatedComment) {
    return {
      error: true,
      message: "Failed to update the comment",
      statusCode: 404,
    };
  }
  return {
    success: true,
    message: "Succesfully update the comment",
    statusCode: 200,
    data: updatedComment,
  };
};

const deleteComment = async ({ commentId, userId }) => {
  const comment = await Comment.findById(commentId);
  if (userId !== comment.commentedBy) {
    return {
      error: true,
      message: "You can't delete this comment.",
      statusCode: 403,
    };
  }
  await Comment.findByIdAndDelete(commentId);
  return {
    success: true,
    message: "Successfully delete the comment",
    statusCode: 204,
  };
};

export { createComment, editComment, deleteComment };
