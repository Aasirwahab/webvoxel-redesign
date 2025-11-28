export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  OUTLINE = 'outline'
}