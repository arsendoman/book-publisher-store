import { IProfileRepository } from 'src/core/abstracts/repository/profile.repository.abstract';
import { IRoleRepository } from './repository/role.repository.abstract';
import { IBooksRepository } from './repository/books.repository.abstract';
import { IBookCommentsRepository } from './repository/comments.repository.abstract';
import { ICommentComplianceRepository } from './repository/commentComplicance.repository.abstract';

export abstract class IDataServices {
  abstract roles: IRoleRepository;
  abstract profiles: IProfileRepository;
  abstract books: IBooksRepository;
  abstract bookComments: IBookCommentsRepository;
  abstract commentCompliance: ICommentComplianceRepository;
}
