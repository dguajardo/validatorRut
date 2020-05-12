const RUT_REGEX = /(\d{1,2})\.?(\d{3})\.?(\d{3})-?(\d|K)/i;
const calculateCheckDigit = rut => {
  const stringRut = `${rut}`;
  let count = 0;
  let multiple = 2;

  for (let i = 1; i <= stringRut.length; i += 1) {
    const index = multiple * stringRut.charAt(stringRut.length - i);
    count += index;

    multiple = multiple < 7 ? multiple + 1 : 2;
  }

  const expectedCheckDigit = 11 - (count % 11);
  if (expectedCheckDigit === 10) return 'K';
  if (expectedCheckDigit === 11) return '0';
  return `${expectedCheckDigit}`;
};

const isValidRut = rut => {
  if (!rut || rut.trim().length < 3) return false;
  const cleanRut = rut.replace(/[^0-9kK-]/g, '');

  if (cleanRut.length < 3 || cleanRut.length > 10) return false;

  const split = cleanRut.split('-');
  if (split.length !== 2) return false;

  const numericRut = parseInt(split[0], 10);
  const checkDigit = split[1];

  const expectedCheckDigit = calculateCheckDigit(numericRut);
  return checkDigit === expectedCheckDigit && RUT_REGEX.test(rut);
};
const rutFormatter = rut =>
  !!rut && rut.replace(/[^0-9k]/i, '').replace(/(\d{1,2})(\d{3})(\d{3})(\d|k)/i, '$1.$2.$3-$4');

const rutMatchRule = rut => isValidRut(rutFormatter(rut));