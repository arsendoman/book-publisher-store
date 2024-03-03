import { PipelineStage } from 'mongoose';

export const addIsUserInInteractionsListPipeline = (
  profileId: string,
): PipelineStage => {
  return {
    $addFields: {
      isProfileInDislikeInteractions: {
        $in: [profileId, '$dislikeInteractions'],
      },
      isProfileInLikeInteractions: {
        $in: [profileId, '$likeInteractions'],
      },
    },
  };
};

export const addCommentLikePipeline = (profileId: string): PipelineStage => {
  return {
    $addFields: {
      likeInteractions: {
        $cond: [
          { $not: ['$isProfileInLikeInteractions'] },
          { $concatArrays: ['$likeInteractions', [profileId]] },
          '$likeInteractions',
        ],
      },
      dislikeInteractions: {
        $cond: [
          '$isProfileInDislikeInteractions',
          { $setDifference: ['$dislikeInteractions', [profileId]] },
          '$dislikeInteractions',
        ],
      },
    },
  };
};

export const addCommentDislikePipeline = (profileId: string): PipelineStage => {
  return {
    $addFields: {
      likeInteractions: {
        $cond: [
          '$isProfileInLikeInteractions',
          { $setDifference: ['$likeInteractions', [profileId]] },
          '$likeInteractions',
        ],
      },
      dislikeInteractions: {
        $cond: [
          { $not: ['$isProfileInDislikeInteractions'] },
          { $concatArrays: ['$dislikeInteractions', [profileId]] },
          '$dislikeInteractions',
        ],
      },
    },
  };
};

export const removeCommentLikePipeline = (profileId: string): PipelineStage => {
  return {
    $addFields: {
      likeInteractions: {
        $cond: [
          '$isProfileInLikeInteractions',
          { $setDifference: ['$likeInteractions', [profileId]] },
          '$dislikeInteractions',
        ],
      },
    },
  };
};

export const removeCommentDislikePipeline = (
  profileId: string,
): PipelineStage => {
  return {
    $addFields: {
      dislikeInteractions: {
        $cond: [
          '$isProfileInDislikeInteractions',
          { $setDifference: ['$dislikeInteractions', [profileId]] },
          '$dislikeInteractions',
        ],
      },
    },
  };
};

export const unsetIsUserInInteractionsListPipeline: PipelineStage = {
  $unset: ['isProfileInDislikeInteractions', 'isProfileInLikeInteractions'],
};
