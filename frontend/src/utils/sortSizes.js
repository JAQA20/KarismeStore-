const SIZE_ORDER = [
  'ÚNICA',
  'UNICA',
  'ONE SIZE',
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  'XXL',
  '3XL',
  'XXXL',
  '4XL',
  '5XL',
];

export const sortSizes = (sizesList = []) => {
  if (!Array.isArray(sizesList)) return [];
  
  return [...sizesList].sort((a, b) => {
    const strA = String(a || '').trim().toUpperCase();
    const strB = String(b || '').trim().toUpperCase();

    if (strA === strB) return 0;

    // Check index in standard text sizes
    const idxA = SIZE_ORDER.indexOf(strA);
    const idxB = SIZE_ORDER.indexOf(strB);

    if (idxA !== -1 && idxB !== -1) {
      return idxA - idxB;
    }
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;

    // Extract numeric portions for numeric sizes (e.g. 28, 30, 32, 34B, 36B)
    const numA = parseFloat(strA);
    const numB = parseFloat(strB);

    if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
      return numA - numB;
    }

    return strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' });
  });
};
