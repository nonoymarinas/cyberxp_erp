export type CxpIconFill = 'filled' | 'outline';

export type CxpIconSize =
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
  | 'responsive';

export type CxpIconState =
  | 'default'
  | 'active'
  | 'selected'
  | 'disabled'
  | 'readonly'
  | 'muted'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface CxpChartDonutItem {
  label: string;
  alias: string;
  value: number;
  color: string;
}
export type CxpInputSize = 'sm' | 'md' | 'lg' | 'xl';
export type CxpInputType =
  'text' | 'date' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
