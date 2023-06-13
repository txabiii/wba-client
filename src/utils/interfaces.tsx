export interface ObjectInterface {
  properties: PropertyInterface[],
  name?: ObjectOrPropetyValueInterface,
  type?: ObjectOrPropetyValueInterface,
  description?: ObjectOrPropetyValueInterface,
  color?: string,
}

export interface PropertyInterface {
  name?: ObjectOrPropetyValueInterface,
  description?: ObjectOrPropetyValueInterface,
}

export interface ObjectOrPropetyValueInterface {
  value?: string;
  locked?: boolean;
}