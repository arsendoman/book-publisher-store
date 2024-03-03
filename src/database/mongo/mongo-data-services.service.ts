import { OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data.source.abstract';
import {
  Role,
  Profile,
  ProfileDocumnent,
  RoleDocument,
  BookDocument,
  Book,
  BookComment,
  BookCommentDocument,
  CommentCompliance,
  CommentComplianceDocument,
} from './schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileRepository } from './repositories/profile.repository';
import { RoleRepository } from './repositories/role.repository';
import { BookRepository } from './repositories/books.repository';
import { BookCommentsRepository } from './repositories/book.comments.repository';
import { CommentComplianceRepository } from './repositories/commentCompliance.repository';

export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  roles: RoleRepository;
  profiles: ProfileRepository;
  books: BookRepository;
  bookComments: BookCommentsRepository;
  commentCompliance: CommentComplianceRepository;

  constructor(
    @InjectModel(Role.name)
    private RoleRepository: Model<RoleDocument>,
    @InjectModel(Profile.name)
    private ProfileRepository: Model<ProfileDocumnent>,
    @InjectModel(Book.name)
    private BookRepository: Model<BookDocument>,
    @InjectModel(BookComment.name)
    private BookCommentsRepository: Model<BookCommentDocument>,
    @InjectModel(CommentCompliance.name)
    private CommentComplianceRepository: Model<CommentComplianceDocument>,
  ) {}

  onApplicationBootstrap() {
    this.roles = new RoleRepository(this.RoleRepository);
    this.books = new BookRepository(this.BookRepository);
    this.profiles = new ProfileRepository(this.ProfileRepository, ['role']);
    this.bookComments = new BookCommentsRepository(this.BookCommentsRepository);
    this.commentCompliance = new CommentComplianceRepository(
      this.CommentComplianceRepository,
    );
  }
}
