/**
 Capitalise first letter of string or each word in a sentence
 @param {string} str - sentence or word to be separated
 @param {string} strSeparator - sentence or word separator (default = ' ' [empty string])
 @return string
 */
export function capitalizeFirstLetter(str: string, strSeparator = ' ') {
    const sentenceParts = str.split(strSeparator);
    if (sentenceParts.length > 0) {
        const newSentence = sentenceParts.map(
            (phrase) => phrase.charAt(0).toUpperCase() + phrase.slice(1).toLowerCase(),
        );
        return newSentence.join(strSeparator);
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 Format number to n decimal places
 @param {number} num - number to be formatted
 @param {number} decimalPlaces - number of decimal places (default = 2)
 @return string
 */
export function formatNumber(num: number, decimalPlaces = 2) {
    if (!num || Number.isNaN(num) || num === 0) {
        return '0.00';
    }

    return typeof num.toFixed === 'function' ? num.toFixed(decimalPlaces) : `${num}`;
}

/**
 Format number to currency format
 @param {number} price - number to be formatted
 @param {string} currencySymbol - number of decimal places (default = 2)
 @return string
 */
export function formatPrice(price: number, currencySymbol = 'R') {
    const strPrice = formatNumber(price, 2).toString();
    const a = strPrice.split('');

    if (price > 1000000000) a.splice(a.length - 12, 0, ',');

    if (price > 1000000) a.splice(a.length - 9, 0, ',');

    if (price > 1000) a.splice(a.length - 6, 0, ',');

    if (price < 0) {
        return `(${currencySymbol}${a.slice(1, a.length).join('')})`;
    }

    return currencySymbol + a.join('');
}

const SI_SYMBOL = ['', 'k', 'M', 'B', 'T'];

/**
 Abbreviate number to n decimal places
 @param {number} number - number to be formatted
 @param {number} decimalPlaces - number of decimal places (default = 2)
 @return string
 */
export function abbreviateNumber(number: number, decimalPlaces = 2) {
    const i = number === 0 ? 0 : Math.floor(Math.log(number) / Math.log(1024));

    // eslint-disable-next-line no-restricted-properties
    return `${(number / Math.pow(1024, i)).toFixed(decimalPlaces)}${SI_SYMBOL[i]}`;
}
