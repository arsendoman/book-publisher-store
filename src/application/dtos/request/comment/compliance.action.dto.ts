import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ComplianceActionEnum } from '../../../../core/enums/compliance.action.enum';

export class CommentComplianceActionDto {
  @ApiProperty()
  @IsNotEmpty()
  complianceAction: ComplianceActionEnum;
}
