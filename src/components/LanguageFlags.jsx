
import Flag from "react-world-flags";

const languageCodes = {
    en: 'GB',
    it: 'IT',
    fr: 'FR',
    ja: 'JP',
    ko: 'KR',
    es: 'ES',
    de: 'DE',
    zh: 'CN',
    hi: 'IN',
}


export default function LanguageFlags({ language }) {

    if (!language) return null;

    const countryCode = languageCodes[language];

    return (
        <Flag
            code={countryCode}
            style={{ width: "24px", height: "auto", marginLeft: "8px", verticalAlign: "middle" }}
        />
    );
}


