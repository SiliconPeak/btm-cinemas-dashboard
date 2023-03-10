import React from "react";
export type ReactElement = React.ReactElement;
export type FC = React.FC;
export interface NavigateFunction {
    (
        to: string,
        options?: {
          replace?: boolean;
          state?: any;
          relative?: any;
        }
      ): void;
      (delta: number): void;
}
export interface ColumnDataType {
  key:React.Key;
  name:string,
  email:string,
  role:string
}