export type TCountry = 'br';

class Formatter {
    public sanitize(value: string) {
        const regex = /[\WA-Z]/g;
        return value.replace(regex, '');
    }

    /**
     * Fomatter Cel with DDD.
     * @param {string} value - cep Ex: 00000000000
     * @return {string} Ex: (00) 00000-0000
    */
    public tel(value: string): string {
        if (!value) { return ''; }

        return value.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d)(\d{4})$/, '$1-$2')
            .substring(0, 15);
    }

    public currency(value = 0, country: TCountry = 'br'): string {
        const MAP = {
            br: { locale: 'pt-BR', currency: 'BRL', },
        };
        const mapped = MAP[country];

        return new Intl
            .NumberFormat(mapped.locale, { style: 'currency', currency: mapped.currency, maximumSignificantDigits: 7 })
            .format(value)
            .replace(/\s/, ' ');
    }
}

export default new Formatter();