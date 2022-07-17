export function validateEmptyField(val, message) {
  return (val && val.length > 0) || "";
}
