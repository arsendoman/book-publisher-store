import { Module } from '@nestjs/common';
import { DataServiceModule } from 'src/dataservices/data-service.module';
import { CommentComplianceController } from './comment.compliance.controller';
import { CommentComplianceService } from '../../application/services/books/comments/comment-compliance.service';
import { CommentComplianceMapperService } from '../../application/mapping/commentCompliance.mapper.service';

@Module({
  imports: [DataServiceModule],
  controllers: [CommentComplianceController],
  providers: [CommentComplianceService, CommentComplianceMapperService],
})
export class CommentComplianceModule {}
