import "@emotion/react";
import { theme } from "custard-ui";
type ThemeType = typeof theme;
declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
