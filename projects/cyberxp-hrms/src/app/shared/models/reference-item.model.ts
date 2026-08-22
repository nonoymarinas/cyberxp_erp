export interface ReferenceItem<TValue = number> {
  id: TValue;
  name: string;
  code:string |null
  disabled?: boolean;
}
