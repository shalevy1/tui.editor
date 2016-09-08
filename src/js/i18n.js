/**
 * @fileoverview Implements i18n
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

const util = tui.util;

let sharedInstance;

const DEFAULT_CODE = 'en_US';

/**
 * I18n
 * @exports I18n
 * @class
 */
class I18n {
    constructor() {
        this._code = DEFAULT_CODE;
        this._langs = new util.Map();
    }

    setCode(code) {
        this._code = code;
    }

    setLang(langCode, data) {
        if (!this._langs.has(langCode)) {
            this._langs.set(langCode, data);
        } else {
            const langData = this._langs.get(langCode);
            this._langs.set(langCode, Object.assign(langData, data));
        }
    }

    get(key, langCode) {
        if (!langCode) {
            langCode = this._code;
        }

        let langData = this._langs.get(langCode);

        if (!langData) {
            langData = this._langs.get(DEFAULT_CODE);
        }

        const text = langData[key];

        if (!text) {
            throw new Error(`There is no text key "${key}" in ${langCode}`);
        }

        return text;
    }

    static getSharedInstance() {
        if (!sharedInstance) {
            sharedInstance = new I18n();
        }

        return sharedInstance;
    }
}

module.exports = I18n;
