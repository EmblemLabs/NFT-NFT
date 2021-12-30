export function addressAbbr(address, start = 14, end = 4) {
  if (!address) {
    return null;
  }
  return address.substring(0, start) + '...' + address.substring(address.length - end - 1, address.length - 1);
}
