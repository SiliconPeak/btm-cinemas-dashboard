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
  usrName:string,
  usrEmail:string,
  role:string,
  id:any
}

export interface GenreColumnType {
  name:string;
  status:string;
  id:string;
}
export interface MovieRoleColumnType {
  title:string;
  status:string;
  id:string;
}

export interface  GenreCreateType {
  name:string;
  status:string;
}

export interface MovieRoleCreateType {
  title:string;
  status:string;
}
export interface DepartmentCreateType extends MovieRoleCreateType{};
export interface DepartmentColumnType extends MovieRoleColumnType{};
export interface HOCFormProps {
  title:string;
  successMessage?:string;
  items:any;
  errorMessage?:string;
  navigateAfterSubmission:string;
}

export interface PersonCreateType {
  name:string;
  gender:string;
  email:string;
  contact:string;
  birthdate:string;
  deathdate:string;
  birthPlace:string;
  biography:string;
  status:string;
  roleId:string;
  departmentId:string;
}