export interface ISXField {
  name: string;
  type: string;
  size: number;
  decimals: number;
  description: string;
  context: string;
}

export interface ISXParam {
  param: string;
  type: string;
  description: string;
  defaultVal: string;
}

export interface ISXTable {
  id: string;
  name: string;
  module: string;
  description: string;
  fields: ISXField[];
  params?: ISXParam[];
}
