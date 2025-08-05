export interface IPost {}

export interface IParamsGetPost extends IParamsGet {
  title?: string;
  content?: string;
  authorId?: string;
  published?: string;
  slug?: string;
}
