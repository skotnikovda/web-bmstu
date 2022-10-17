import Title from './title';
import Content from './content';
import PublicationDate from './publication.date';

export default interface PostProps {
  title: Title;
  content: Content;
  publicationDate: PublicationDate;
}
