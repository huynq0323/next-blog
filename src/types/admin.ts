export interface IMenuAdmin {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: IMenuAdmin[];
}