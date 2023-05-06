export interface ObjectPropertyInterface {
  name: string,
  description: string,
}

export interface DemoObjectInterface {
  name: string,
  properties: ObjectPropertyInterface[],
  type: string,
  description: string,
  color: string,
}