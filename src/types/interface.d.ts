interface IResponseGetDataDto<T> {
  data: T[];
  total?: number;
  pageSize?: number;
  page?: number;
}
interface IBlog {
  id?: number;
  title: string;
  author: string;
  content: string;
}

interface IParamsGet {
  pageSize?: number;
  page?: number;
  keyword?: string;
  name?: string;
}

interface IPaginationTable {
  current?: number;
  page?: number;
  pageSize?: number;
  total?: number;
}
