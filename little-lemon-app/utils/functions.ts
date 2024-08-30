export function boolToTinyInt(value: any) {
  return value ? 1 : 0;
}

export function tinyIntToBool(value: any) {
  return value === 1 ? true : false;
}
