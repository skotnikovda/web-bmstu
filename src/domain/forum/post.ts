import Entity from 'core/entity';
import ID from './post/id';
import Title from './post/title';
import PublicationDate from './post/publication.date';
import Content from './post/content';
import Props from './post/props';

export default class Post extends Entity<ID, Props> {
  constructor(props: Props, id?: ID) {
    super(props, id);
  }

  get title(): Title {
    return this._props.title;
  }

  get content(): Content {
    return this._props.content;
  }

  get publicationDate(): PublicationDate {
    return this._props.publicationDate;
  }
}
