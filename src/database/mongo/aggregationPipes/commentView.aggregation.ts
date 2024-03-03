import { PipelineStage } from 'mongoose';

export const addLikesAmountFieldPipeline: PipelineStage = {
  $addFields: {
    likesAmount: {
      $size: { $ifNull: ['$likeInteractions', []] },
    },
  },
};

export const viewCommentPipeline: PipelineStage = {
  $project: {
    _id: 0,
    id: '$_id',
    bookId: 1,
    username: 1,
    text: 1,
    likeInteractions: 1,
    dislikeInteractions: 1,
    createdAt: 1,
    updatedAt: 1,
    likesAmount: 1,
  },
};
