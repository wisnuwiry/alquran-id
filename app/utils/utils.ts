export  function convertToArabicNumber(num: number) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    return String(num).split('').map(digit => arabicDigits[Number.parseInt(digit)]).join('');
}
