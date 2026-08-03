export interface ReferenceItem<TValue = number> {
  value: TValue;
  label: string;
  disabled?: boolean;
}
