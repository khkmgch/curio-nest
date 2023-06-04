import { Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendedCustomColors =
  | 'bright-yellow'
  | 'deep-red'
  | 'bright-blue'
  | 'grayish-brown'
  | 'dark-cyan'
  | 'grayish-yellow'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}
