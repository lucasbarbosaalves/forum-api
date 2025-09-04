import { Attachment } from '@/domain/forum/enterprise/entities/attachment';

export class AttachmetnPresenter {
  static toHTTP(attachment: Attachment) {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.link,
    };
  }
}
