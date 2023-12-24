// @ts-nocheck

import { CSSProperties } from "react";
export interface Message {
  username: string;
  content: string;
}

export interface MovesKit extends Array<{ white: string; black: string }> {}

export interface OptionSquares {
  [key: string]: {
    background: string;
    borderRadius: string;
  };
}

export interface RightClickedSquares {
  [key: string]:
    | {
        backgroundColor: string;
      }
    | undefined;
}

export const convertCSSPropertiesToStringObject = (
  cssProperties: CSSProperties
): Record<string, string> => {
  const stringObject: Record<string, string> = {};
  for (const key in cssProperties) {
    if (typeof cssProperties[key] === "string") {
      stringObject[key] = cssProperties[key] as string;
    }
  }
  return stringObject;
};
