declare namespace NSimpleDate {
    interface ISettings {
        offset ?: number,
        locale ?: locales,
        timeZone ?: timeZones,
    }
}

type diffUnit = 'days' | 'day' | 'years' | 'year' | 'month' | 'months' | 'hour' | 'hours' | 'second' | 'seconds' | 'millisecond' | 'milliseconds';
type unitStartOf = 'year' | 'day' | 'month' | 'week';
type unitEndOf = 'year' | 'day' | 'month' | 'week';
type unitIsSame = 'year' | 'day' | 'month' | 'week' | 'date';
type unitIsAfter = 'year' | 'date' | 'month' | 'time';
type unitIsBefore = 'year' | 'date' | 'month' | 'time';
type unitIsBetween = 'year' | 'date' | 'month' | 'time';
type unitOperation = 'years' | 'year' | 'months' | 'month' | 'weeks' | 'week' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
type adoptUnit = 'year' | 'month' | 'date' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
type isWithinUnit = 'year' | 'day' | 'month' | 'week' | 'date';
type timeZones = 'Europe/Andorra' | 'Asia/Dubai' | 'Asia/Kabul' | 'Europe/Tirane' | 'Asia/Yerevan' | 'Antarctica/Casey' | 'Antarctica/Davis' | 'Antarctica/DumontDUrville' | 'Antarctica/Mawson' | 'Antarctica/Palmer' | 'Antarctica/Rothera' | 'Antarctica/Syowa' | 'Antarctica/Troll' | 'Antarctica/Vostok' | 'America/Argentina/Buenos_Aires' | 'America/Argentina/Cordoba' | 'America/Argentina/Salta' | 'America/Argentina/Jujuy' | 'America/Argentina/Tucuman' | 'America/Argentina/Catamarca' | 'America/Argentina/La_Rioja' | 'America/Argentina/San_Juan' | 'America/Argentina/Mendoza' | 'America/Argentina/San_Luis' | 'America/Argentina/Rio_Gallegos' | 'America/Argentina/Ushuaia' | 'Pacific/Pago_Pago' | 'Europe/Vienna' | 'Australia/Lord_Howe' | 'Antarctica/Macquarie' | 'Australia/Hobart' | 'Australia/Currie' | 'Australia/Melbourne' | 'Australia/Sydney' | 'Australia/Broken_Hill' | 'Australia/Brisbane' | 'Australia/Lindeman' | 'Australia/Adelaide' | 'Australia/Darwin' | 'Australia/Perth' | 'Australia/Eucla' | 'Asia/Baku' | 'America/Barbados' | 'Asia/Dhaka' | 'Europe/Brussels' | 'Europe/Sofia' | 'Atlantic/Bermuda' | 'Asia/Brunei' | 'America/La_Paz' | 'America/Noronha' | 'America/Belem' | 'America/Fortaleza' | 'America/Recife' | 'America/Araguaina' | 'America/Maceio' | 'America/Bahia' | 'America/Sao_Paulo' | 'America/Campo_Grande' | 'America/Cuiaba' | 'America/Santarem' | 'America/Porto_Velho' | 'America/Boa_Vista' | 'America/Manaus' | 'America/Eirunepe' | 'America/Rio_Branco' | 'America/Nassau' | 'Asia/Thimphu' | 'Europe/Minsk' | 'America/Belize' | 'America/St_Johns' | 'America/Halifax' | 'America/Glace_Bay' | 'America/Moncton' | 'America/Goose_Bay' | 'America/Blanc-Sablon' | 'America/Toronto' | 'America/Nipigon' | 'America/Thunder_Bay' | 'America/Iqaluit' | 'America/Pangnirtung' | 'America/Atikokan' | 'America/Winnipeg' | 'America/Rainy_River' | 'America/Resolute' | 'America/Rankin_Inlet' | 'America/Regina' | 'America/Swift_Current' | 'America/Edmonton' | 'America/Cambridge_Bay' | 'America/Yellowknife' | 'America/Inuvik' | 'America/Creston' | 'America/Dawson_Creek' | 'America/Fort_Nelson' | 'America/Vancouver' | 'America/Whitehorse' | 'America/Dawson' | 'Indian/Cocos' | 'Europe/Zurich' | 'Africa/Abidjan' | 'Pacific/Rarotonga' | 'America/Santiago' | 'America/Punta_Arenas' | 'Pacific/Easter' | 'Asia/Shanghai' | 'Asia/Urumqi' | 'America/Bogota' | 'America/Costa_Rica' | 'America/Havana' | 'Atlantic/Cape_Verde' | 'America/Curacao' | 'Indian/Christmas' | 'Asia/Nicosia' | 'Asia/Famagusta' | 'Europe/Prague' | 'Europe/Berlin' | 'Europe/Copenhagen' | 'America/Santo_Domingo' | 'Africa/Algiers' | 'America/Guayaquil' | 'Pacific/Galapagos' | 'Europe/Tallinn' | 'Africa/Cairo' | 'Africa/El_Aaiun' | 'Europe/Madrid' | 'Africa/Ceuta' | 'Atlantic/Canary' | 'Europe/Helsinki' | 'Pacific/Fiji' | 'Atlantic/Stanley' | 'Pacific/Chuuk' | 'Pacific/Pohnpei' | 'Pacific/Kosrae' | 'Atlantic/Faroe' | 'Europe/Paris' | 'Europe/London' | 'Asia/Tbilisi' | 'America/Cayenne' | 'Africa/Accra' | 'Europe/Gibraltar' | 'America/Godthab' | 'America/Danmarkshavn' | 'America/Scoresbysund' | 'America/Thule' | 'Europe/Athens' | 'Atlantic/South_Georgia' | 'America/Guatemala' | 'Pacific/Guam' | 'Africa/Bissau' | 'America/Guyana' | 'Asia/Hong_Kong' | 'America/Tegucigalpa' | 'America/Port-au-Prince' | 'Europe/Budapest' | 'Asia/Jakarta' | 'Asia/Pontianak' | 'Asia/Makassar' | 'Asia/Jayapura' | 'Europe/Dublin' | 'Asia/Jerusalem' | 'Asia/Kolkata' | 'Indian/Chagos' | 'Asia/Baghdad' | 'Asia/Tehran' | 'Atlantic/Reykjavik' | 'Europe/Rome' | 'America/Jamaica' | 'Asia/Amman' | 'Asia/Tokyo' | 'Africa/Nairobi' | 'Asia/Bishkek' | 'Pacific/Tarawa' | 'Pacific/Enderbury' | 'Pacific/Kiritimati' | 'Asia/Pyongyang' | 'Asia/Seoul' | 'Asia/Almaty' | 'Asia/Qyzylorda' | 'Asia/Qostanay' |  'Asia/Aqtobe' | 'Asia/Aqtau' | 'Asia/Atyrau' | 'Asia/Oral' | 'Asia/Beirut' | 'Asia/Colombo' | 'Africa/Monrovia' | 'Europe/Vilnius' | 'Europe/Luxembourg' | 'Europe/Riga' | 'Africa/Tripoli' | 'Africa/Casablanca' | 'Europe/Monaco' | 'Europe/Chisinau' | 'Pacific/Majuro' | 'Pacific/Kwajalein' | 'Asia/Yangon' | 'Asia/Ulaanbaatar' | 'Asia/Hovd' | 'Asia/Choibalsan' | 'Asia/Macau' | 'America/Martinique' | 'Europe/Malta' | 'Indian/Mauritius' | 'Indian/Maldives' | 'America/Mexico_City' | 'America/Cancun' | 'America/Merida' | 'America/Monterrey' | 'America/Matamoros' | 'America/Mazatlan' | 'America/Chihuahua' | 'America/Ojinaga' | 'America/Hermosillo' | 'America/Tijuana' | 'America/Bahia_Banderas' | 'Asia/Kuala_Lumpur' | 'Asia/Kuching' | 'Africa/Maputo' | 'Africa/Windhoek' | 'Pacific/Noumea' | 'Pacific/Norfolk' | 'Africa/Lagos' | 'America/Managua' | 'Europe/Amsterdam' | 'Europe/Oslo' | 'Asia/Kathmandu' | 'Pacific/Nauru' | 'Pacific/Niue' | 'Pacific/Auckland' | 'Pacific/Chatham' | 'America/Panama' | 'America/Lima' | 'Pacific/Tahiti' | 'Pacific/Marquesas' | 'Pacific/Gambier' | 'Pacific/Port_Moresby' | 'Pacific/Bougainville' | 'Asia/Manila' | 'Asia/Karachi' | 'Europe/Warsaw' | 'America/Miquelon' | 'Pacific/Pitcairn' | 'America/Puerto_Rico' | 'Asia/Gaza' | 'Asia/Hebron' | 'Europe/Lisbon' | 'Atlantic/Madeira' | 'Atlantic/Azores' | 'Pacific/Palau' | 'America/Asuncion' | 'Asia/Qatar' | 'Indian/Reunion' | 'Europe/Bucharest' | 'Europe/Belgrade' | 'Europe/Kaliningrad' | 'Europe/Moscow' | 'Europe/Simferopol' | 'Europe/Kirov' | 'Europe/Astrakhan' | 'Europe/Volgograd' | 'Europe/Saratov' | 'Europe/Ulyanovsk' | 'Europe/Samara' | 'Asia/Yekaterinburg' | 'Asia/Omsk' | 'Asia/Novosibirsk' | 'Asia/Barnaul' | 'Asia/Tomsk' | 'Asia/Novokuznetsk' | 'Asia/Krasnoyarsk' | 'Asia/Irkutsk' | 'Asia/Chita' | 'Asia/Yakutsk' | 'Asia/Khandyga' | 'Asia/Vladivostok' | 'Asia/Ust-Nera' | 'Asia/Magadan' | 'Asia/Sakhalin' | 'Asia/Srednekolymsk' | 'Asia/Kamchatka' | 'Asia/Anadyr' | 'Asia/Riyadh' | 'Pacific/Guadalcanal' | 'Indian/Mahe' | 'Africa/Khartoum' | 'Europe/Stockholm' | 'Asia/Singapore' | 'America/Paramaribo' | 'Africa/Juba' | 'Africa/Sao_Tome' | 'America/El_Salvador' | 'Asia/Damascus' | 'America/Grand_Turk' | 'Africa/Ndjamena' | 'Indian/Kerguelen' | 'Asia/Bangkok' | 'Asia/Dushanbe' | 'Pacific/Fakaofo' | 'Asia/Dili' | 'Asia/Ashgabat' | 'Africa/Tunis' | 'Pacific/Tongatapu' | 'Europe/Istanbul' | 'America/Port_of_Spain' | 'Pacific/Funafuti' | 'Asia/Taipei' | 'Europe/Kiev' | 'Europe/Uzhgorod' | 'Europe/Zaporozhye' | 'Pacific/Wake' | 'America/New_York' | 'America/Detroit' | 'America/Kentucky/Louisville' | 'America/Kentucky/Monticello' | 'America/Indiana/Indianapolis' | 'America/Indiana/Vincennes' | 'America/Indiana/Winamac' | 'America/Indiana/Marengo' | 'America/Indiana/Petersburg' | 'America/Indiana/Vevay' | 'America/Chicago' | 'America/Indiana/Tell_City' | 'America/Indiana/Knox' | 'America/Menominee' | 'America/North_Dakota/Center' | 'America/North_Dakota/New_Salem' | 'America/North_Dakota/Beulah' | 'America/Denver' | 'America/Boise' | 'America/Phoenix' | 'America/Los_Angeles' | 'America/Anchorage' | 'America/Juneau' | 'America/Sitka' | 'America/Metlakatla' | 'America/Yakutat' | 'America/Nome' | 'America/Adak' | 'Pacific/Honolulu' | 'America/Montevideo' | 'Asia/Samarkand' | 'Asia/Tashkent' | 'America/Caracas' | 'Asia/Ho_Chi_Minh' | 'Pacific/Efate' | 'Pacific/Wallis' | 'Pacific/Apia' | 'Africa/Johannesburg';
type locales = 'default' | 'ar-AE' | 'ar-BH' | 'ar-DJ' | 'ar-DZ' | 'ar-EG' | 'ar-EH' | 'ar-ER' | 'ar-IL' | 'ar-IQ' | 'ar-IQ' | 'ar-JO' | 'ar-JO' | 'ar-KM' | 'ar-KW' | 'ar-LB' | 'ar-LY' | 'ar-MA' | 'ar-MR' | 'ar-OM' | 'ar-PS' | 'ar-QA' | 'ar-SA' | 'ar-SD' | 'ar-SO' | 'ar-SS' | 'ar-SY' | 'ar-TD' | 'ar-TN' | 'ar-YE' | 'as' | 'as-IN' | 'asa' | 'asa-TZ' | 'az' | 'az-Cyrl' | 'az-Cyrl-AZ' | 'az-Latn' | 'az-Latn-AZ' | 'bas' | 'bas-CM' | 'be' | 'be-BY' | 'bem' | 'bem-ZM' | 'bez' | 'bez-TZ' | 'bg' | 'bg-BG' | 'bm' | 'bm-ML' | 'bn' | 'bn' | 'bn-BD' | 'bn-BD' | 'bn-IN' | 'bn-IN' | 'bo' | 'bo-CN' | 'bo-IN' | 'br' | 'br-FR' | 'brx' | 'brx-IN' | 'bs' | 'bs-Cyrl' | 'bs-Cyrl-BA' | 'bs-Latn' | 'bs-Latn-BA' | 'ca' | 'ca-AD' | 'ca-ES' | 'ca-FR' | 'ca-IT' | 'ce' | 'ce-RU' | 'cgg' | 'cgg-UG' | 'chr' | 'chr-US' | 'cs' | 'cs-CZ' | 'cy' | 'cy-GB' | 'da' | 'da-DK' | 'dav' | 'dav-KE' | 'de' | 'de-AT' | 'de-BE' | 'de-CH' | 'de-DE' | 'de-IT' | 'de-LI' | 'de-LU' | 'de-LU' | 'dje' | 'dje-NE' | 'dsb' | 'dsb-DE' | 'dua' | 'dua-CM' | 'dyo' | 'dyo-SN' | 'dz' | 'dz-BT' | 'ebu' | 'ebu-KE' | 'ee' | 'ee-GH' | 'ee-TG' | 'el' | 'el-CY' | 'el-GR' | 'en' | 'en-AG' | 'en-AI' | 'en-AI' | 'en-AS' | 'en-AT' | 'en-AU' | 'en-AU' | 'en-BB' | 'en-BE' | 'en-BI' | 'en-BM' | 'en-BS' | 'en-BW' | 'en-BZ' | 'en-CA' | 'en-CA' | 'en-CC' | 'en-CH' | 'en-CK' | 'en-CM' | 'en-CX' | 'en-CY' | 'en-DE' | 'en-DG' | 'en-DK' | 'en-DM' | 'en-ER' | 'en-FI' | 'en-FJ' | 'en-FK' | 'en-FM' | 'en-GB' | 'en-GB' | 'en-GD' | 'en-GG' | 'en-GH' | 'en-GI' | 'en-GM' | 'en-GU' | 'en-GY' | 'en-HK' | 'en-IE' | 'en-IE' | 'en-IL' | 'en-IM' | 'en-IN' | 'en-IN' | 'en-IO' | 'en-JE' | 'en-JM' | 'en-KE' | 'en-KI' | 'en-KN' | 'en-KY' | 'en-LC' | 'en-LR' | 'en-LS' | 'en-MG' | 'en-MH' | 'en-MO' | 'en-MP' | 'en-MS' | 'en-MT' | 'en-MT' | 'en-MU' | 'en-MW' | 'en-MY' | 'en-NA' | 'en-NF' | 'en-NG' | 'en-NL' | 'en-NR' | 'en-NU' | 'en-NZ' | 'en-NZ' | 'en-PG' | 'en-PH' | 'en-PH' | 'en-PK' | 'en-PN' | 'en-PR' | 'en-PW' | 'en-RW' | 'en-SB' | 'en-SC' | 'en-SD' | 'en-SE' | 'en-SG' | 'en-SG' | 'en-SH' | 'en-SI' | 'en-SL' | 'en-SS' | 'en-SX' | 'en-SZ' | 'en-TC' | 'en-TK' | 'en-TO' | 'en-TT' | 'en-TV' | 'en-TZ' | 'en-UG' | 'en-UM' | 'en-US' | 'en-US' | 'en-VC' | 'en-VG' | 'en-VI' | 'en-VU' | 'en-WS' | 'en-ZA' | 'en-ZA' | 'en-ZM' | 'en-ZW' | 'eo' | 'es' | 'es-AR' | 'es-BO' | 'es-BR' | 'es-BZ' | 'es-CL' | 'es-CO' | 'es-CR' | 'es-CU' | 'es-DO' | 'es-EA' | 'es-EC' | 'es-ES' | 'es-GQ' | 'es-GT' | 'es-HN' | 'es-IC' | 'es-MX' | 'es-NI' | 'es-PA' | 'es-PE' | 'es-PR' | 'es-PY' | 'es-SV' | 'es-US' | 'es-UY' | 'es-VE' | 'et' | 'et-EE' | 'eu' | 'eu-ES' | 'ewo' | 'ewo-CM' | 'fa' | 'fa-AF' | 'fa-IR' | 'ff-CM' | 'ps-AF' | 'ff' | 'ff-GN' | 'ff-MR' | 'ff-SN' | 'fi' | 'fi-FI' | 'fil' | 'fil-PH' | 'fo' | 'fo-DK' | 'fo-FO' | 'fr' | 'fr-BE' | 'fr-BF' | 'fr-BI' | 'fr-BJ' | 'fr-BL' | 'fr-CA' | 'fr-CD' | 'fr-CF' | 'fr-CG' | 'fr-CH' | 'fr-CI' | 'fr-CM' | 'fr-DJ' | 'fr-DZ' | 'fr-FR' | 'fr-GA' | 'fr-GF' | 'fr-GN' | 'fr-GP' | 'fr-GQ' | 'fr-HT' | 'fr-KM' | 'fr-LU' | 'fr-MA' | 'fr-MC' | 'fr-MF' | 'fr-MG' | 'fr-ML' | 'fr-MQ' | 'fr-MR' | 'fr-MU' | 'fr-NC' | 'fr-NE' | 'fr-PF' | 'fr-PM' | 'fr-RE' | 'fr-RW' | 'fr-SC' | 'fr-SN' | 'fr-SY' | 'fr-TD' | 'fr-TG' | 'fr-TN' | 'fr-VU' | 'fr-WF' | 'fr-YT' | 'fur' | 'fur-IT' | 'fy' | 'fy-NL' | 'ga' | 'ga' | 'ga-IE' | 'ga-IE' | 'gd' | 'gd-GB' | 'gl' | 'gl-ES' | 'gsw' | 'gsw-CH' | 'gsw-FR' | 'gsw-LI' | 'gu' | 'gu-IN' | 'guz' | 'guz-KE' | 'gv' | 'gv-IM' | 'ha' | 'ha-GH' | 'ha-NE' | 'ha-NG' | 'haw' | 'haw-US' | 'he' | 'he-IL' | 'hi' | 'hi-IN' | 'hr' | 'hr-BA' | 'hr-HR' | 'hsb' | 'hsb-DE' | 'hu' | 'hu-HU' | 'hy' | 'hy-AM' | 'ig' | 'ig-NG' | 'ii' | 'ii-CN' | 'in' | 'in-ID' | 'is' | 'is-IS' | 'it' | 'it-CH' | 'it-IT' | 'it-SM' | 'it-VA' | 'iw' | 'iw-IL' | 'ja' | 'ja-JP' | 'jgo' | 'jgo-CM' | 'jmc' | 'jmc-TZ' | 'ka' | 'ka-GE' | 'kab' | 'kab-DZ' | 'kam' | 'kam-KE' | 'kde' | 'kde-TZ' | 'kea' | 'kea-CV' | 'khq' | 'khq-ML' | 'ki' | 'ki-KE' | 'kk' | 'kk-KZ' | 'kkj' | 'kkj-CM' | 'kl' | 'kl-GL' | 'kln' | 'kln-KE' | 'km' | 'km-KH' | 'kn' | 'kn-IN' | 'ko' | 'ko' | 'ko-KP' | 'ko-KR' | 'ko-KR' | 'kok' | 'kok-IN' | 'ks' | 'ks-IN' | 'ksb' | 'ksb-TZ' | 'ksf' | 'ksf-CM' | 'ksh' | 'ksh-DE' | 'kw' | 'kw-GB' | 'ky' | 'ky-KG' | 'lag' | 'lag-TZ' | 'lt' | 'lt-LT' | 'lb' | 'lb-LU' | 'lv' | 'lv-LV' | 'lg' | 'lg-UG' | 'mk' | 'mk-MK' | 'ms' | 'ms-MY' | 'mt' | 'mt-MT' | 'nl' | 'nl-BE' | 'nl-NL' | 'no' | 'no-NO' | 'no-NO-NY' | 'pl' | 'pl-PL' | 'pt' | 'pt-AO' | 'pt-BR' | 'pt-CH' | 'pt-CV' | 'pt-GQ' | 'pt-GW' | 'pt-LU' | 'pt-MO' | 'pt-MZ' | 'pt-PT' | 'pt-ST' | 'pt-TL' | 'ro' | 'ro-RO' | 'ru' | 'ru-BY' | 'ru-KG' | 'ru-KZ' | 'ru-MD' | 'ru-RU' | 'ru-UA' | 'sk' | 'sk-SK' | 'sl' | 'prs-AF' | 'sl-SI' | 'sq' | 'sq-AL' | 'sr' | 'sr-BA' | 'sr-CS' | 'sr-ME' | 'sr-RS' | 'sv' | 'sv-SE' | 'th' | 'th-TH' | 'th-TH-TH' | 'tr' | 'tr-TR' | 'uk' | 'uk-UA' | 'vi' | 'vi-VN' | 'uz' | 'uz-UZ' | 'uz-UZ' | 'uz-AF' | 'zh' | 'zh-Hans' | 'zh-Hans-HK' | 'zh-Hans-MO' | 'zh-Hans-SG' | 'zh-Hant' | 'zh-Hant-HK' | 'zh-Hant-MO' | 'zh-Hant-TW' | 'zh-HK' | 'zu' | 'zu-ZA';

class SimpleDate {
    public date : Date = undefined;
    public settings : NSimpleDate.ISettings = {
        offset : undefined,
        locale : undefined,
        timeZone : undefined
    }

    /**
     * you can pass a Date as Object, milliseconds, timestamps and more like date. The strict is used for faulty dates, so you get an undefined and not the actual time date. The offset in the settings must be written as minutes
     * @param date string or date
     * @param strict boolean
     * @param settings offset, locale, timeZone (object)
     */
    constructor(date ?: number | string | Date, strict ?: boolean, settings ?: NSimpleDate.ISettings) {
        this.date = date ? new Date(date) : !strict ? new Date() : undefined;

        this.settings = {
            offset : settings?.offset ? settings?.offset : this.date?.getTimezoneOffset() || 0,
            locale : settings?.locale ? settings?.locale : 'default' as locales,
            timeZone : settings?.timeZone ? settings?.timeZone : undefined as timeZones,
        }
    }

    private padTo2Digits(number : number) {
        return number?.toString()?.padStart(2, '0');
    }

    public diff(diffDate : Date, unitOfTime : diffUnit) : number {
        let result : number = undefined;

        if(diffDate && unitOfTime && this.date) {
            const differenceInMilliseconds = Math.abs(new Date(diffDate).getTime() - this.date.getTime()),
                  millisecondsInDay = 1000 * 60 * 60 * 24;
                  
            switch (unitOfTime) {
                case 'days':
                case 'day':
                    result = differenceInMilliseconds / millisecondsInDay;
                break;
                
                case 'years':
                case 'year':
                    result = differenceInMilliseconds / (millisecondsInDay * 365);
                break;

                case 'months':
                case 'month':
                    result = differenceInMilliseconds / (millisecondsInDay * 30);
                break;

                case 'seconds':
                case 'second':
                    result = differenceInMilliseconds / 1000;
                break;

                case 'hour':
                case 'hours':
                    result = (differenceInMilliseconds / 1000) / 3600;
                break;

                case 'millisecond':
                case 'milliseconds':
                    result = differenceInMilliseconds
                break;
            }
        }

        return result
    }

    public clone() : SimpleDate {
        return this.date ? new SimpleDate(this.date) : undefined;
    }

    public isValid() : boolean {
        // return Object.prototype.toString.call(this.date) === '[object Date]';
        return this.date instanceof Date && !isNaN(this.date.getTime());
    }

    public getCalendarWeek() : number {
        const recrusiveFunction = (date : Date) : number => {
            // Kopiere das Datum, um die ursprüngliche Variable nicht zu ändern
            const copiedDate : Date = new Date(date.getTime());
            
            // Stelle sicher, dass wir am Anfang der Woche sind (Montag)
            copiedDate.setHours(0, 0, 0, 0);
            copiedDate.setDate(copiedDate.getDate() + 4 - (copiedDate.getDay() || 7));
            
            // Stelle sicher, dass das Jahr mindestens vier Tage hat, um in die aktuelle Kalenderwoche zu fallen
            const yearStart = new Date(copiedDate.getFullYear(), 0, 1);
            if (copiedDate < yearStart) {
                return recrusiveFunction(yearStart);
            }
            
            // Berechne die Kalenderwoche 86400000 (Millisekunden pro Tag)
            const weekNumber : number = Math.ceil((((copiedDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
            
            return weekNumber;
        }
        
        return this.date ? recrusiveFunction(this.date) : undefined;
    }

    public getWeekNumber() : number {
        return this.date ? this.date.getDay() === 0 ? 6 : this.date.getDay() - 1 : undefined;
    }

    public startOf(unitOf ?: unitStartOf) : Date {
        let result : Date = undefined,
            newDate : Date = new Date(this.date);

        if(this.date) {
            switch (unitOf) {
                case 'day':
                    newDate.setHours(0, 0, 0, 0);
                    
                    result = newDate;
                break;
                
                case 'year':
                    result = new Date(newDate.getFullYear(), 0, 1);
                break;
    
                case 'month':
                    newDate.setHours(0, 0, 0, 0);
                    newDate.setDate(1);
    
                    result = newDate
                break;
    
                case 'week':
                    let startDate = new Date(newDate.setDate(newDate.getDay() > 1 ? newDate.getDate() - (newDate.getDay()-1) : newDate.getDate()));
    
                    startDate.setHours(0, 0, 0, 0);
    
                    result = startDate;
                break;
            }
        }

        return result
    }

    public endOf(unitOf ?: unitEndOf) : Date {
        let result : Date = undefined,
            newDate : Date = new Date(this.date);

        if(this.date) {
            switch (unitOf) {
                case 'day':
                    newDate.setHours(23, 59, 59, 999);
    
                    result = newDate;
                break;
                
                case 'year':
                    // newDate.setHours(23, 59, 59, 999);
                    // newDate.setDate(0);
                    // newDate.setMonth(11);
                
                    // result = newDate;
                    result = new Date(newDate.getFullYear(), 12, 1);
                break;
    
                case 'month':
                    newDate.setHours(23, 59, 59, 999);
                    newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());
    
                    result = newDate;
                break;
    
                case 'week':
                    let endDate = new Date(newDate.setDate(newDate.getDay() < 7 ? newDate.getDate() + (7-newDate.getDay()) : newDate.getDate()));
                    endDate.setHours(23, 59, 59, 999);
    
                    result = endDate;
                break;
            }
        }

        return result
    }

    public getDates(toDate : Date) : Date[] {
        const result : Date[] = [];

        if(this.date) {
            const firstDate : Date = new Date(new SimpleDate(this.date).startOf('day')),
                  lastDate : Date = new Date(new SimpleDate(toDate).endOf('day')),
                  diffDays = Math.abs(Math.round((new Date(lastDate).getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))),
                  days = new SimpleDate(firstDate).isSame(lastDate, 'date') ? 1 : diffDays >= 2 ? diffDays : 2,
                  startDate = firstDate <= lastDate ? new Date(firstDate) : new Date(lastDate);
            
            for (let index = 0; index < days; index++) {
                const nextDate = new Date(startDate);

                startDate.setDate(startDate.getDate() + 1);
                
                nextDate.setHours(0, 0, 0, 0);
                
                result.push(nextDate);
            }
        }

        return result;
    }

    public isSame(date : Date, unitIsSame : unitIsSame, sameYear : boolean = true) : boolean {
        let result = false;
        
        if(this.date) {
            if(!(date instanceof Date && !isNaN(date.getTime()))) {
                if(date) {
                    date = new Date(date);
                } else {
                    date = new Date()
                }
            }
            
            if(!sameYear || this.date?.getFullYear() === date?.getFullYear()) {
                switch (unitIsSame) {
                    case 'day':
                        result = this.date.getDate() === date.getDate();
                    break;
    
                    case 'month':
                        result = this.date.getMonth() === date.getMonth()
                    break;
    
                    case 'year':
                        result = this.date?.getFullYear() === date?.getFullYear();
                    break;
    
                    case 'week':
                        if(this.date.getMonth() === date.getMonth()) {
                            let weekday1 = this.date.getUTCDay(),
                                weekday2 = date.getUTCDay(),
                                millisecondsInWeek = 7 * 24 * 60 * 60 * 1000,
                                millisecondsInDay = 24 * 60 * 60 * 1000,
                                daysToMonday1 = (weekday1 + 6) % 7 + 1,
                                daysToMonday2 = (weekday2 + 6) % 7 + 1,
                                weekNumber1 = Math.floor((this.date.getTime() - daysToMonday1 * millisecondsInDay) / millisecondsInWeek),
                                weekNumber2 = Math.floor((date.getTime() - daysToMonday2 * millisecondsInDay) / millisecondsInWeek);
                            
                            result = weekNumber1 === weekNumber2;
                        }
                    break;
                    case 'date':
                    default:
                        result = `${ (this.padTo2Digits(date.getMonth() + 1)) }-${ this.padTo2Digits(date.getDate()) }` === `${ (this.padTo2Digits(this.date.getMonth() + 1)) }-${ this.padTo2Digits(this.date.getDate()) }`
                    break;
                }          
            }
        }

        return result;
    }
    
    /**
     * Checks if one date is after another date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is after the specified date, false otherwise.
     */
    public isAfter(date : Date, unit ?: unitIsAfter) {
        let response : boolean = false;

        if(this.date) {
            if(!(date instanceof Date && !isNaN(date.getTime()))) {
                if(date) {
                    date = new Date(date);
                } else {
                    date = new Date()
                }
            }
    
            const fromYear = this.date.getFullYear(),
                      fromMonth = this.padTo2Digits(this.date.getMonth() + 1),
                      fromDate = this.padTo2Digits(this.date.getDate()),
                      toYear = date.getFullYear(),
                      toMonth = this.padTo2Digits(date.getMonth() + 1),
                      toDate = this.padTo2Digits(date.getDate());
    
            switch (unit) {
                case 'date':
                    //YYYY-MM-DD
                    response = new Date(`${fromYear}-${fromMonth}-${fromDate}`) > new Date(`${toYear}-${toMonth}-${toDate}`)
                    break;
                case 'month':
                    //YYYY-MM
                    response = new Date(`${fromYear}-${fromMonth}`) > new Date(`${toYear}-${toMonth}`)
                    break;
                case 'year':
                    //YYYY
                    response = fromYear > toYear
                    break;
                case 'time':
                    //HH:mm:ss
                    response = this.date.toISOString().substring(11, 19) > date.toISOString().substring(11, 19);
                    break;
                default:
                    //YYYY-MM-DD HH:mm:ss
                    response = this.date > date;
                    break;
            }
        }

        return response;
    }

    /**
     * Checks if the current date is the same as or after the specified date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is the same as or after the specified date, false otherwise.
     */
    public isSameOrAfter(date : Date, unit ?: unitIsAfter) {
        let response : boolean = false;
        
        if(this.date) {
            if(!(date instanceof Date && !isNaN(date.getTime()))) {
                if(date) {
                    date = new Date(date);
                } else {
                    date = new Date()
                }
            }
    
            if(date) {
                const fromYear = this.date.getFullYear(),
                      fromMonth = this.padTo2Digits(this.date.getMonth() + 1),
                      fromDate = this.padTo2Digits(this.date.getDate()),
                      toYear = date.getFullYear(),
                      toMonth = this.padTo2Digits(date.getMonth() + 1),
                      toDate = this.padTo2Digits(date.getDate());
    
                switch (unit) {
                    case 'date':
                        //YYYY-MM-DD
                        response = new Date(`${fromYear}-${fromMonth}-${fromDate}`) >= new Date(`${toYear}-${toMonth}-${toDate}`)
                        break;
                    case 'month':
                        //YYYY-MM
                        response = new Date(`${fromYear}-${fromMonth}`) >= new Date(`${toYear}-${toMonth}`)
                        break;
                    case 'year':
                        //YYYY
                        response = fromYear >= toYear
                        break;
                    case 'time':
                        //HH:mm:ss
                        response = this.date.toISOString().substring(11, 19) >= date.toISOString().substring(11, 19);
                        break;
                    default:
                        //YYYY-MM-DD HH:mm:ss
                        response = this.date >= date;
                        break;
                }
            }
        }

        return response;
    }
    
    /**
     * Checks if the current date is before the specified date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is before the specified date, false otherwise.
     */
    public isBefore(date : Date, unit ?: unitIsBefore) {
        let response : boolean = false;
        
        if(date && this.date) {
            if(!(date instanceof Date && !isNaN(date.getTime()))) {
                if(date) {
                    date = new Date(date);
                } else {
                    date = new Date()
                }
            }

            const fromYear = this.date.getFullYear(),
                  fromMonth = this.padTo2Digits(this.date.getMonth() + 1),
                  fromDate = this.padTo2Digits(this.date.getDate()),
                  toYear = date.getFullYear(),
                  toMonth = this.padTo2Digits(date.getMonth() + 1),
                  toDate = this.padTo2Digits(date.getDate());

            switch (unit) {
                case 'date':
                    //YYYY-MM-DD
                    response = new Date(`${fromYear}-${fromMonth}-${fromDate}`) < new Date(`${toYear}-${toMonth}-${toDate}`)
                    break;
                case 'month':
                    //YYYY-MM
                    response = new Date(`${fromYear}-${fromMonth}`) < new Date(`${toYear}-${toMonth}`)
                    break;
                case 'year':
                    //YYYY
                    response = fromYear < toYear
                    break;
                case 'time':
                    //HH:mm:ss
                    response = this.date.toISOString().substring(11, 19) < date.toISOString().substring(11, 19);
                    break;
                default:
                    //YYYY-MM-DD HH:mm:ss
                    response = this.date < date;
                    break;
            }
        }

        return response;
    }

    /**
     * Checks if the current date is the same as or before the specified date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is the same as or before the specified date, false otherwise.
     */
    public isSameOrBefore(date : Date, unit ?: unitIsBefore) {
        let response : boolean = false;

        if(this.date) {
            if(!(date instanceof Date && !isNaN(date.getTime()))) {
                if(date) {
                    date = new Date(date);
                } else {
                    date = new Date()
                }
            }
            
            const fromYear = this.date.getFullYear(),
                      fromMonth = this.padTo2Digits(this.date.getMonth() + 1),
                      fromDate = this.padTo2Digits(this.date.getDate()),
                      toYear = date.getFullYear(),
                      toMonth = this.padTo2Digits(date.getMonth() + 1),
                      toDate = this.padTo2Digits(date.getDate());
    
            switch (unit) {
                case 'date':
                    //YYYY-MM-DD
                    response = new Date(`${fromYear}-${fromMonth}-${fromDate}`) <= new Date(`${toYear}-${toMonth}-${toDate}`)
                    break;
                case 'month':
                    //YYYY-MM
                    response = new Date(`${fromYear}-${fromMonth}`) <= new Date(`${toYear}-${toMonth}`)
                    break;
                case 'year':
                    //YYYY
                    response = fromYear <= toYear
                    break;
                case 'time':
                    //HH:mm:ss
                    response = this.date.toISOString().substring(11, 19) <= date.toISOString().substring(11, 19);
                    break;
                default:
                    //YYYY-MM-DD HH:mm:ss
                    response = this.date <= date;
                    break;
            }
        }

        return response;
    }

    /**
     * checks if the passed date into the constructor is between the passed (from, to) date. If you set equal to false (default is true) then it will ignore the first and last date (from, to)
     * @param from Date
     * @param to Date
     * @param unit 'year' | 'date' | 'month' | 'time';
     * @param equal boolean (default is true)
     * @returns 
     */
    /**
     * Checks if the current date is between two specified dates, based on the specified unit of comparison.
     * @param from The start date.
     * @param to The end date.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @param equal (Optional) Specifies whether the comparison includes equality with the start and end dates.
     * @returns true if the current date is between the start and end dates, false otherwise.
     */
    public isBetween(from : Date, to : Date, unit ?: unitIsBetween, equal : boolean = true) {
        let response : boolean = undefined,
            firstDate = new Date(this.date),
            secondDate = new Date(from),
            thirdDate = new Date(to);

        if(this.date) {
            switch (unit) {
                case 'date':
                    firstDate.setHours(0, 0, 0, 0);
                    secondDate.setHours(0, 0, 0, 0);
                    thirdDate.setHours(0, 0, 0, 0);
    
                    if(equal) {
                        response = firstDate >= secondDate && firstDate <= thirdDate;
                    } else {
                        response = firstDate > secondDate && firstDate < thirdDate;
                    }
                break;
    
                case 'month':
                    if(equal) {
                        response = firstDate.getMonth() + 1 >= secondDate.getMonth() + 1 && firstDate.getMonth() + 1 <= thirdDate.getMonth() + 1;
                    } else {
                        response = firstDate.getMonth() + 1 > secondDate.getMonth() + 1 && firstDate.getMonth() + 1 < thirdDate.getMonth() + 1;
                    }
                break;
    
                case 'year':
                    if(equal) {
                        response = firstDate.getFullYear() >= secondDate.getFullYear() && firstDate.getFullYear() <= thirdDate.getFullYear();
                    } else {
                        response = firstDate.getFullYear() > secondDate.getFullYear() && firstDate.getFullYear() < thirdDate.getFullYear();
                    }
                break;
    
                case 'time':
                default:
                    if(equal) {
                        response = firstDate >= secondDate && firstDate <= thirdDate;
                    } else {
                        response = firstDate > secondDate && firstDate < thirdDate;
                    }
                break;
            }
        }
        
        return response
    }

    /**
     * you can create your own format. This is the available formats in a string.
     * YYYY (2023)
     * MM (05)
     * DD (15)
     * HH (23)
     * mm (14)
     * ss (42)
     * dddd (Saturday)
     * dd (Sa)
     * MMMM (January)
     * MMM (Jan)
     * @param format 
     * @returns 
     */
    public format(format ?: string) {
        let response : string = undefined,
            date = new Date(this.date);

        if(this.date) {
            if(this.settings.offset !== undefined) {
                if(Math.sign(this.settings.offset) <= 0) {
                    date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset))
                } else {
                    date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset))
                }
            }
    
            if(format) {
                response = format;
                //first, the long regex and then the short regex
                if(new RegExp(/YYYY/).test(response)) {
                    response = response.replace(/YYYY/g, date.toISOString().substring(0, 4)); //YYYY (2023)
                }
    
                if(new RegExp(/dddd/).test(response)) {
                    response = response.replace(/dddd/g, date.toLocaleString(this.settings.locale, { weekday: 'long', timeZone: this.settings.timeZone })); //dddd (Saturday)
                }
    
                if(new RegExp(/MMMM/).test(response)) {
                    response = response.replace(/MMMM/g, date.toLocaleString(this.settings.locale, { month: 'long', timeZone: this.settings.timeZone })); //MMMM (January)
                }
    
                if(new RegExp(/MMM/).test(response)) {
                    response = response.replace(/MMM/g, date.toLocaleString(this.settings.locale, { month: 'short', timeZone: this.settings.timeZone })); //MMM (Jan)
                }
                
                if(new RegExp(/MM/).test(response)) {
                    response = response.replace(/MM/g, date.toISOString().substring(5, 7)); //MM (05)
                }
    
                if(new RegExp(/dd/).test(response)) {
                    response = response.replace(/dd/g, date.toLocaleString(this.settings.locale, { weekday: 'short', timeZone: this.settings.timeZone })); //dd (Sa)
                }
    
                if(new RegExp(/DD/).test(response)) {
                    response = response.replace(/DD/g, date.toISOString().substring(8, 10)); //DD (15)
                }
                
                if(new RegExp(/HH/).test(response)) {
                    response = response.replace(/HH/g, date.toISOString().substring(11, 13)); //HH (23)
                }
    
                if(new RegExp(/mm/).test(response)) {
                    response = response.replace(/mm/g, date.toISOString().substring(14, 16)); //mm (14)
                }
    
                if(new RegExp(/ss/).test(response)) {
                    response = response.replace(/ss/g, date.toISOString().substring(17, 19)); //ss (42)
                }
            } else {
                if(this.date instanceof Date && !isNaN(this.date.getTime())) {
                    response = date.toISOString().substring(0, 10);
                }
            }
        }
        
        return response
    }

    public year() {
        let date = new Date(this.date);
        
        if(this.settings.offset !== undefined) {
            if(Math.sign(this.settings.offset) <= 0) {
                date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset))
            } else {
                date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset))
            }
        }

        return this.date ? new Date(date).getFullYear() : undefined;
    }

    public month() {
        let date = new Date(this.date);
        
        if(this.settings.offset !== undefined) {
            if(Math.sign(this.settings.offset) <= 0) {
                date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset))
            } else {
                date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset))
            }
        }

        return this.date ? new Date(date).toISOString().substring(5, 7) : undefined;
    }

    public day() {
        let date = new Date(this.date);
        
        if(this.settings.offset !== undefined) {
            if(Math.sign(this.settings.offset) <= 0) {
                date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset))
            } else {
                date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset))
            }
        }

        return this.date ? new Date(date).toISOString().substring(8, 10) : undefined;
    }

    public shortMonth() {
        return this.date ? new Date(this.date).toLocaleString(this.settings.locale, { month: 'short', timeZone: this.settings.timeZone }) : undefined;
    }

    public longMonth() {
        return this.date ? new Date(this.date).toLocaleString(this.settings.locale, { month: 'long', timeZone: this.settings.timeZone }) : undefined;
    }

    /**
     * add the value that you select via the unit
     * @param value number
     * @param type 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
     * @returns 
     */
    public add(value : number, type : unitOperation) : SimpleDate {
        let newDate : SimpleDate = new SimpleDate(this.date)

        if(this.date) {
            switch (type) {
                case 'years':
                case 'year':
                    newDate.date.setFullYear(newDate.date.getFullYear() + Math.abs(value));
                break;
    
                case 'months':
                case 'month':
                    newDate.date.setMonth(newDate.date.getMonth() + Math.abs(value));
                break;
    
                case 'weeks':
                case 'week':
                    newDate.date.setDate(newDate.date.getDate() + (7 * Math.abs(value)));
                break;
    
                case 'days':
                case 'day':
                    newDate.date.setDate(newDate.date.getDate() + Math.abs(value));
                break;
    
                case 'hours':
                case 'hour':
                    newDate.date.setHours(newDate.date.getHours() + Math.abs(value));
                break;
    
                case 'minutes':
                case 'minute':
                    newDate.date.setMinutes(newDate.date.getMinutes() + Math.abs(value));
                break;
    
                case 'seconds':
                case 'second':
                    newDate.date.setSeconds(newDate.date.getSeconds() + Math.abs(value));
                break;
    
                case 'milliseconds':
                case 'millisecond':
                    newDate.date.setMilliseconds(newDate.date.getMilliseconds() + Math.abs(value));
                break;
            }
        }

        return newDate;
    }

    /**
     * subtracts the value that you select via the unit
     * @param value number
     * @param type 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
     * @returns 
     */
    public subtract(value : number, type : unitOperation) : SimpleDate {
        let newDate : SimpleDate = new SimpleDate(this.date)

        if(this.date) {
            switch (type) {
                case 'years':
                case 'year':
                    newDate.date.setFullYear(newDate.date.getFullYear() - Math.abs(value));
                break;
    
                case 'months':
                case 'month':
                    newDate.date.setMonth(newDate.date.getMonth() - Math.abs(value));
                break;

                case 'weeks':
                case 'week':
                    newDate.date.setDate(newDate.date.getDate() - (7 * Math.abs(value)));
                break;
    
                case 'days':
                case 'day':
                    newDate.date.setDate(newDate.date.getDate() - Math.abs(value));
                break;
    
                case 'hours':
                case 'hour':
                    newDate.date.setHours(newDate.date.getHours() - Math.abs(value));
                break;
    
                case 'minutes':
                case 'minute':
                    newDate.date.setMinutes(newDate.date.getMinutes() - Math.abs(value));
                break;
    
                case 'seconds':
                case 'second':
                    newDate.date.setSeconds(newDate.date.getSeconds() - Math.abs(value));
                break;
    
                case 'milliseconds':
                case 'millisecond':
                    newDate.date.setMilliseconds(newDate.date.getMilliseconds() - Math.abs(value));
                break;
            }
        }

        return newDate;
    }

    public cronExpression() {
        let clonedDate = new Date(this.date),
            result : string = undefined;

        if(clonedDate && this.date) {
            result = `${clonedDate.getMinutes()} ${clonedDate.getHours()} ${clonedDate.getDate()} ${clonedDate.getMonth() + 1} ${clonedDate.getDay()}`
        }

        return result;
    }

    /**
     * with this function you can adopt the data (wich you want) like ['hours', 'minutes', 'year' '...'] of the passed date into the first date
     * @param from Date
     * @param values 'year' | 'month' | 'date' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond'
     * @returns 
     */
    public adopt(from : Date, values ?: adoptUnit[]) : SimpleDate {
        const fromDate = new Date(from);

        if(this.date) {
            if(!(from instanceof Date && !isNaN(from.getTime()))) {
                from = new Date(from);
            }
    
            if(from) {
                if(values?.length) {
                    values.forEach((value) => {
                        switch (value) {
                            case 'year':
                                this.date.setFullYear(fromDate.getFullYear());
                                break;
                            case 'month':
                                this.date.setMonth(fromDate.getMonth());
                                break;
                            case 'date':
                                this.date.setDate(fromDate.getDate());
                                break;
                            case 'hours':
                            case 'hour':
                                this.date.setHours(fromDate.getHours());
                                break;
                            case 'minutes':
                            case 'minute':
                                
                                this.date.setMinutes(fromDate.getMinutes());
                                break;
                            case 'seconds':
                            case 'second':
                                this.date.setSeconds(fromDate.getSeconds());
                                
                                break;
                            case 'milliseconds':
                            case 'millisecond':
                                this.date.setMilliseconds(fromDate.getMilliseconds());
                                break;
                        }
                    });
                }
            }
        }

        return new SimpleDate(this.date, true);
    }

    /**
     * shows you how much days has the date of the year 
     * @returns number
     */
    public daysInYear() : number {
        return (this.date instanceof Date && !isNaN(this.date.getTime())) ? 
                    ((this.date.getFullYear() % 4 === 0 && this.date.getFullYear() % 100 > 0) || this.date.getFullYear() % 400 == 0) ?
                        366 : 
                        365 : 
                    undefined;
    }

    /**
     * shows you if the date that you hand over (in the constructor) is a leap year or not
     * @returns boolean
     */
    public isLeapYear() : boolean {
        return (this.date instanceof Date && !isNaN(this.date.getTime())) ? 
                    ((this.date.getFullYear() % 4 === 0 && this.date.getFullYear() % 100 > 0) || this.date.getFullYear() % 400 == 0) ?
                        true : 
                        false : 
                    undefined;
    }

    /**
     * you can check if the date that you passed in the constructor is in the dates array
     * @param dates Array<Date>
     * @param isWithinUnit 'year' | 'day' | 'month' | 'week' | 'date';
     * @returns 
     */
    public isWithin(dates : Date[], isWithinUnit : isWithinUnit = 'date') {
        let result = false;

        if(dates.length && this.date) {
            result = dates.some((date) => new SimpleDate(this.date).isSame(new Date(date), isWithinUnit));
        }

        return result;
    }
}

export = SimpleDate