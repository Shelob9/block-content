import React, { createContext, FC } from 'react';
import { ComponetsMap } from './ComponetRender';

export type tagSettings = {
  [key: string]: string[];
};

export const ThemeContext = createContext<{
  components: ComponetsMap;
  tagSettings?: tagSettings;
}>(
  //@ts-ignore
  null
);

const ThemeProvider: FC<{
  children: any;
  components: ComponetsMap;
  tagSettings?: tagSettings;
}> = ({ children, components, tagSettings }) => {
  return (
    <ThemeContext.Provider value={{ components, tagSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
