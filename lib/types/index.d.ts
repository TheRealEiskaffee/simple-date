declare namespace NSimpleDate {
    interface ISettings {
        offset?: number;
        locale?: locales;
        timeZone?: timeZones;
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
type timeZones = 'Europe/Andorra' | 'Asia/Dubai' | 'Asia/Kabul' | 'Europe/Tirane' | 'Asia/Yerevan' | 'Antarctica/Casey' | 'Antarctica/Davis' | 'Antarctica/DumontDUrville' | 'Antarctica/Mawson' | 'Antarctica/Palmer' | 'Antarctica/Rothera' | 'Antarctica/Syowa' | 'Antarctica/Troll' | 'Antarctica/Vostok' | 'America/Argentina/Buenos_Aires' | 'America/Argentina/Cordoba' | 'America/Argentina/Salta' | 'America/Argentina/Jujuy' | 'America/Argentina/Tucuman' | 'America/Argentina/Catamarca' | 'America/Argentina/La_Rioja' | 'America/Argentina/San_Juan' | 'America/Argentina/Mendoza' | 'America/Argentina/San_Luis' | 'America/Argentina/Rio_Gallegos' | 'America/Argentina/Ushuaia' | 'Pacific/Pago_Pago' | 'Europe/Vienna' | 'Australia/Lord_Howe' | 'Antarctica/Macquarie' | 'Australia/Hobart' | 'Australia/Currie' | 'Australia/Melbourne' | 'Australia/Sydney' | 'Australia/Broken_Hill' | 'Australia/Brisbane' | 'Australia/Lindeman' | 'Australia/Adelaide' | 'Australia/Darwin' | 'Australia/Perth' | 'Australia/Eucla' | 'Asia/Baku' | 'America/Barbados' | 'Asia/Dhaka' | 'Europe/Brussels' | 'Europe/Sofia' | 'Atlantic/Bermuda' | 'Asia/Brunei' | 'America/La_Paz' | 'America/Noronha' | 'America/Belem' | 'America/Fortaleza' | 'America/Recife' | 'America/Araguaina' | 'America/Maceio' | 'America/Bahia' | 'America/Sao_Paulo' | 'America/Campo_Grande' | 'America/Cuiaba' | 'America/Santarem' | 'America/Porto_Velho' | 'America/Boa_Vista' | 'America/Manaus' | 'America/Eirunepe' | 'America/Rio_Branco' | 'America/Nassau' | 'Asia/Thimphu' | 'Europe/Minsk' | 'America/Belize' | 'America/St_Johns' | 'America/Halifax' | 'America/Glace_Bay' | 'America/Moncton' | 'America/Goose_Bay' | 'America/Blanc-Sablon' | 'America/Toronto' | 'America/Nipigon' | 'America/Thunder_Bay' | 'America/Iqaluit' | 'America/Pangnirtung' | 'America/Atikokan' | 'America/Winnipeg' | 'America/Rainy_River' | 'America/Resolute' | 'America/Rankin_Inlet' | 'America/Regina' | 'America/Swift_Current' | 'America/Edmonton' | 'America/Cambridge_Bay' | 'America/Yellowknife' | 'America/Inuvik' | 'America/Creston' | 'America/Dawson_Creek' | 'America/Fort_Nelson' | 'America/Vancouver' | 'America/Whitehorse' | 'America/Dawson' | 'Indian/Cocos' | 'Europe/Zurich' | 'Africa/Abidjan' | 'Pacific/Rarotonga' | 'America/Santiago' | 'America/Punta_Arenas' | 'Pacific/Easter' | 'Asia/Shanghai' | 'Asia/Urumqi' | 'America/Bogota' | 'America/Costa_Rica' | 'America/Havana' | 'Atlantic/Cape_Verde' | 'America/Curacao' | 'Indian/Christmas' | 'Asia/Nicosia' | 'Asia/Famagusta' | 'Europe/Prague' | 'Europe/Berlin' | 'Europe/Copenhagen' | 'America/Santo_Domingo' | 'Africa/Algiers' | 'America/Guayaquil' | 'Pacific/Galapagos' | 'Europe/Tallinn' | 'Africa/Cairo' | 'Africa/El_Aaiun' | 'Europe/Madrid' | 'Africa/Ceuta' | 'Atlantic/Canary' | 'Europe/Helsinki' | 'Pacific/Fiji' | 'Atlantic/Stanley' | 'Pacific/Chuuk' | 'Pacific/Pohnpei' | 'Pacific/Kosrae' | 'Atlantic/Faroe' | 'Europe/Paris' | 'Europe/London' | 'Asia/Tbilisi' | 'America/Cayenne' | 'Africa/Accra' | 'Europe/Gibraltar' | 'America/Godthab' | 'America/Danmarkshavn' | 'America/Scoresbysund' | 'America/Thule' | 'Europe/Athens' | 'Atlantic/South_Georgia' | 'America/Guatemala' | 'Pacific/Guam' | 'Africa/Bissau' | 'America/Guyana' | 'Asia/Hong_Kong' | 'America/Tegucigalpa' | 'America/Port-au-Prince' | 'Europe/Budapest' | 'Asia/Jakarta' | 'Asia/Pontianak' | 'Asia/Makassar' | 'Asia/Jayapura' | 'Europe/Dublin' | 'Asia/Jerusalem' | 'Asia/Kolkata' | 'Indian/Chagos' | 'Asia/Baghdad' | 'Asia/Tehran' | 'Atlantic/Reykjavik' | 'Europe/Rome' | 'America/Jamaica' | 'Asia/Amman' | 'Asia/Tokyo' | 'Africa/Nairobi' | 'Asia/Bishkek' | 'Pacific/Tarawa' | 'Pacific/Enderbury' | 'Pacific/Kiritimati' | 'Asia/Pyongyang' | 'Asia/Seoul' | 'Asia/Almaty' | 'Asia/Qyzylorda' | 'Asia/Qostanay' | 'Asia/Aqtobe' | 'Asia/Aqtau' | 'Asia/Atyrau' | 'Asia/Oral' | 'Asia/Beirut' | 'Asia/Colombo' | 'Africa/Monrovia' | 'Europe/Vilnius' | 'Europe/Luxembourg' | 'Europe/Riga' | 'Africa/Tripoli' | 'Africa/Casablanca' | 'Europe/Monaco' | 'Europe/Chisinau' | 'Pacific/Majuro' | 'Pacific/Kwajalein' | 'Asia/Yangon' | 'Asia/Ulaanbaatar' | 'Asia/Hovd' | 'Asia/Choibalsan' | 'Asia/Macau' | 'America/Martinique' | 'Europe/Malta' | 'Indian/Mauritius' | 'Indian/Maldives' | 'America/Mexico_City' | 'America/Cancun' | 'America/Merida' | 'America/Monterrey' | 'America/Matamoros' | 'America/Mazatlan' | 'America/Chihuahua' | 'America/Ojinaga' | 'America/Hermosillo' | 'America/Tijuana' | 'America/Bahia_Banderas' | 'Asia/Kuala_Lumpur' | 'Asia/Kuching' | 'Africa/Maputo' | 'Africa/Windhoek' | 'Pacific/Noumea' | 'Pacific/Norfolk' | 'Africa/Lagos' | 'America/Managua' | 'Europe/Amsterdam' | 'Europe/Oslo' | 'Asia/Kathmandu' | 'Pacific/Nauru' | 'Pacific/Niue' | 'Pacific/Auckland' | 'Pacific/Chatham' | 'America/Panama' | 'America/Lima' | 'Pacific/Tahiti' | 'Pacific/Marquesas' | 'Pacific/Gambier' | 'Pacific/Port_Moresby' | 'Pacific/Bougainville' | 'Asia/Manila' | 'Asia/Karachi' | 'Europe/Warsaw' | 'America/Miquelon' | 'Pacific/Pitcairn' | 'America/Puerto_Rico' | 'Asia/Gaza' | 'Asia/Hebron' | 'Europe/Lisbon' | 'Atlantic/Madeira' | 'Atlantic/Azores' | 'Pacific/Palau' | 'America/Asuncion' | 'Asia/Qatar' | 'Indian/Reunion' | 'Europe/Bucharest' | 'Europe/Belgrade' | 'Europe/Kaliningrad' | 'Europe/Moscow' | 'Europe/Simferopol' | 'Europe/Kirov' | 'Europe/Astrakhan' | 'Europe/Volgograd' | 'Europe/Saratov' | 'Europe/Ulyanovsk' | 'Europe/Samara' | 'Asia/Yekaterinburg' | 'Asia/Omsk' | 'Asia/Novosibirsk' | 'Asia/Barnaul' | 'Asia/Tomsk' | 'Asia/Novokuznetsk' | 'Asia/Krasnoyarsk' | 'Asia/Irkutsk' | 'Asia/Chita' | 'Asia/Yakutsk' | 'Asia/Khandyga' | 'Asia/Vladivostok' | 'Asia/Ust-Nera' | 'Asia/Magadan' | 'Asia/Sakhalin' | 'Asia/Srednekolymsk' | 'Asia/Kamchatka' | 'Asia/Anadyr' | 'Asia/Riyadh' | 'Pacific/Guadalcanal' | 'Indian/Mahe' | 'Africa/Khartoum' | 'Europe/Stockholm' | 'Asia/Singapore' | 'America/Paramaribo' | 'Africa/Juba' | 'Africa/Sao_Tome' | 'America/El_Salvador' | 'Asia/Damascus' | 'America/Grand_Turk' | 'Africa/Ndjamena' | 'Indian/Kerguelen' | 'Asia/Bangkok' | 'Asia/Dushanbe' | 'Pacific/Fakaofo' | 'Asia/Dili' | 'Asia/Ashgabat' | 'Africa/Tunis' | 'Pacific/Tongatapu' | 'Europe/Istanbul' | 'America/Port_of_Spain' | 'Pacific/Funafuti' | 'Asia/Taipei' | 'Europe/Kiev' | 'Europe/Uzhgorod' | 'Europe/Zaporozhye' | 'Pacific/Wake' | 'America/New_York' | 'America/Detroit' | 'America/Kentucky/Louisville' | 'America/Kentucky/Monticello' | 'America/Indiana/Indianapolis' | 'America/Indiana/Vincennes' | 'America/Indiana/Winamac' | 'America/Indiana/Marengo' | 'America/Indiana/Petersburg' | 'America/Indiana/Vevay' | 'America/Chicago' | 'America/Indiana/Tell_City' | 'America/Indiana/Knox' | 'America/Menominee' | 'America/North_Dakota/Center' | 'America/North_Dakota/New_Salem' | 'America/North_Dakota/Beulah' | 'America/Denver' | 'America/Boise' | 'America/Phoenix' | 'America/Los_Angeles' | 'America/Anchorage' | 'America/Juneau' | 'America/Sitka' | 'America/Metlakatla' | 'America/Yakutat' | 'America/Nome' | 'America/Adak' | 'Pacific/Honolulu' | 'America/Montevideo' | 'Asia/Samarkand' | 'Asia/Tashkent' | 'America/Caracas' | 'Asia/Ho_Chi_Minh' | 'Pacific/Efate' | 'Pacific/Wallis' | 'Pacific/Apia' | 'Africa/Johannesburg';
type locales = 'default' | 'ar-AE' | 'ar-BH' | 'ar-DJ' | 'ar-DZ' | 'ar-EG' | 'ar-EH' | 'ar-ER' | 'ar-IL' | 'ar-IQ' | 'ar-IQ' | 'ar-JO' | 'ar-JO' | 'ar-KM' | 'ar-KW' | 'ar-LB' | 'ar-LY' | 'ar-MA' | 'ar-MR' | 'ar-OM' | 'ar-PS' | 'ar-QA' | 'ar-SA' | 'ar-SD' | 'ar-SO' | 'ar-SS' | 'ar-SY' | 'ar-TD' | 'ar-TN' | 'ar-YE' | 'as' | 'as-IN' | 'asa' | 'asa-TZ' | 'az' | 'az-Cyrl' | 'az-Cyrl-AZ' | 'az-Latn' | 'az-Latn-AZ' | 'bas' | 'bas-CM' | 'be' | 'be-BY' | 'bem' | 'bem-ZM' | 'bez' | 'bez-TZ' | 'bg' | 'bg-BG' | 'bm' | 'bm-ML' | 'bn' | 'bn' | 'bn-BD' | 'bn-BD' | 'bn-IN' | 'bn-IN' | 'bo' | 'bo-CN' | 'bo-IN' | 'br' | 'br-FR' | 'brx' | 'brx-IN' | 'bs' | 'bs-Cyrl' | 'bs-Cyrl-BA' | 'bs-Latn' | 'bs-Latn-BA' | 'ca' | 'ca-AD' | 'ca-ES' | 'ca-FR' | 'ca-IT' | 'ce' | 'ce-RU' | 'cgg' | 'cgg-UG' | 'chr' | 'chr-US' | 'cs' | 'cs-CZ' | 'cy' | 'cy-GB' | 'da' | 'da-DK' | 'dav' | 'dav-KE' | 'de' | 'de-AT' | 'de-BE' | 'de-CH' | 'de-DE' | 'de-IT' | 'de-LI' | 'de-LU' | 'de-LU' | 'dje' | 'dje-NE' | 'dsb' | 'dsb-DE' | 'dua' | 'dua-CM' | 'dyo' | 'dyo-SN' | 'dz' | 'dz-BT' | 'ebu' | 'ebu-KE' | 'ee' | 'ee-GH' | 'ee-TG' | 'el' | 'el-CY' | 'el-GR' | 'en' | 'en-AG' | 'en-AI' | 'en-AI' | 'en-AS' | 'en-AT' | 'en-AU' | 'en-AU' | 'en-BB' | 'en-BE' | 'en-BI' | 'en-BM' | 'en-BS' | 'en-BW' | 'en-BZ' | 'en-CA' | 'en-CA' | 'en-CC' | 'en-CH' | 'en-CK' | 'en-CM' | 'en-CX' | 'en-CY' | 'en-DE' | 'en-DG' | 'en-DK' | 'en-DM' | 'en-ER' | 'en-FI' | 'en-FJ' | 'en-FK' | 'en-FM' | 'en-GB' | 'en-GB' | 'en-GD' | 'en-GG' | 'en-GH' | 'en-GI' | 'en-GM' | 'en-GU' | 'en-GY' | 'en-HK' | 'en-IE' | 'en-IE' | 'en-IL' | 'en-IM' | 'en-IN' | 'en-IN' | 'en-IO' | 'en-JE' | 'en-JM' | 'en-KE' | 'en-KI' | 'en-KN' | 'en-KY' | 'en-LC' | 'en-LR' | 'en-LS' | 'en-MG' | 'en-MH' | 'en-MO' | 'en-MP' | 'en-MS' | 'en-MT' | 'en-MT' | 'en-MU' | 'en-MW' | 'en-MY' | 'en-NA' | 'en-NF' | 'en-NG' | 'en-NL' | 'en-NR' | 'en-NU' | 'en-NZ' | 'en-NZ' | 'en-PG' | 'en-PH' | 'en-PH' | 'en-PK' | 'en-PN' | 'en-PR' | 'en-PW' | 'en-RW' | 'en-SB' | 'en-SC' | 'en-SD' | 'en-SE' | 'en-SG' | 'en-SG' | 'en-SH' | 'en-SI' | 'en-SL' | 'en-SS' | 'en-SX' | 'en-SZ' | 'en-TC' | 'en-TK' | 'en-TO' | 'en-TT' | 'en-TV' | 'en-TZ' | 'en-UG' | 'en-UM' | 'en-US' | 'en-US' | 'en-VC' | 'en-VG' | 'en-VI' | 'en-VU' | 'en-WS' | 'en-ZA' | 'en-ZA' | 'en-ZM' | 'en-ZW' | 'eo' | 'es' | 'es-AR' | 'es-BO' | 'es-BR' | 'es-BZ' | 'es-CL' | 'es-CO' | 'es-CR' | 'es-CU' | 'es-DO' | 'es-EA' | 'es-EC' | 'es-ES' | 'es-GQ' | 'es-GT' | 'es-HN' | 'es-IC' | 'es-MX' | 'es-NI' | 'es-PA' | 'es-PE' | 'es-PR' | 'es-PY' | 'es-SV' | 'es-US' | 'es-UY' | 'es-VE' | 'et' | 'et-EE' | 'eu' | 'eu-ES' | 'ewo' | 'ewo-CM' | 'fa' | 'fa-AF' | 'fa-IR' | 'ff-CM' | 'ps-AF' | 'ff' | 'ff-GN' | 'ff-MR' | 'ff-SN' | 'fi' | 'fi-FI' | 'fil' | 'fil-PH' | 'fo' | 'fo-DK' | 'fo-FO' | 'fr' | 'fr-BE' | 'fr-BF' | 'fr-BI' | 'fr-BJ' | 'fr-BL' | 'fr-CA' | 'fr-CD' | 'fr-CF' | 'fr-CG' | 'fr-CH' | 'fr-CI' | 'fr-CM' | 'fr-DJ' | 'fr-DZ' | 'fr-FR' | 'fr-GA' | 'fr-GF' | 'fr-GN' | 'fr-GP' | 'fr-GQ' | 'fr-HT' | 'fr-KM' | 'fr-LU' | 'fr-MA' | 'fr-MC' | 'fr-MF' | 'fr-MG' | 'fr-ML' | 'fr-MQ' | 'fr-MR' | 'fr-MU' | 'fr-NC' | 'fr-NE' | 'fr-PF' | 'fr-PM' | 'fr-RE' | 'fr-RW' | 'fr-SC' | 'fr-SN' | 'fr-SY' | 'fr-TD' | 'fr-TG' | 'fr-TN' | 'fr-VU' | 'fr-WF' | 'fr-YT' | 'fur' | 'fur-IT' | 'fy' | 'fy-NL' | 'ga' | 'ga' | 'ga-IE' | 'ga-IE' | 'gd' | 'gd-GB' | 'gl' | 'gl-ES' | 'gsw' | 'gsw-CH' | 'gsw-FR' | 'gsw-LI' | 'gu' | 'gu-IN' | 'guz' | 'guz-KE' | 'gv' | 'gv-IM' | 'ha' | 'ha-GH' | 'ha-NE' | 'ha-NG' | 'haw' | 'haw-US' | 'he' | 'he-IL' | 'hi' | 'hi-IN' | 'hr' | 'hr-BA' | 'hr-HR' | 'hsb' | 'hsb-DE' | 'hu' | 'hu-HU' | 'hy' | 'hy-AM' | 'ig' | 'ig-NG' | 'ii' | 'ii-CN' | 'in' | 'in-ID' | 'is' | 'is-IS' | 'it' | 'it-CH' | 'it-IT' | 'it-SM' | 'it-VA' | 'iw' | 'iw-IL' | 'ja' | 'ja-JP' | 'jgo' | 'jgo-CM' | 'jmc' | 'jmc-TZ' | 'ka' | 'ka-GE' | 'kab' | 'kab-DZ' | 'kam' | 'kam-KE' | 'kde' | 'kde-TZ' | 'kea' | 'kea-CV' | 'khq' | 'khq-ML' | 'ki' | 'ki-KE' | 'kk' | 'kk-KZ' | 'kkj' | 'kkj-CM' | 'kl' | 'kl-GL' | 'kln' | 'kln-KE' | 'km' | 'km-KH' | 'kn' | 'kn-IN' | 'ko' | 'ko' | 'ko-KP' | 'ko-KR' | 'ko-KR' | 'kok' | 'kok-IN' | 'ks' | 'ks-IN' | 'ksb' | 'ksb-TZ' | 'ksf' | 'ksf-CM' | 'ksh' | 'ksh-DE' | 'kw' | 'kw-GB' | 'ky' | 'ky-KG' | 'lag' | 'lag-TZ' | 'lt' | 'lt-LT' | 'lb' | 'lb-LU' | 'lv' | 'lv-LV' | 'lg' | 'lg-UG' | 'mk' | 'mk-MK' | 'ms' | 'ms-MY' | 'mt' | 'mt-MT' | 'nl' | 'nl-BE' | 'nl-NL' | 'no' | 'no-NO' | 'no-NO-NY' | 'pl' | 'pl-PL' | 'pt' | 'pt-AO' | 'pt-BR' | 'pt-CH' | 'pt-CV' | 'pt-GQ' | 'pt-GW' | 'pt-LU' | 'pt-MO' | 'pt-MZ' | 'pt-PT' | 'pt-ST' | 'pt-TL' | 'ro' | 'ro-RO' | 'ru' | 'ru-BY' | 'ru-KG' | 'ru-KZ' | 'ru-MD' | 'ru-RU' | 'ru-UA' | 'sk' | 'sk-SK' | 'sl' | 'prs-AF' | 'sl-SI' | 'sq' | 'sq-AL' | 'sr' | 'sr-BA' | 'sr-CS' | 'sr-ME' | 'sr-RS' | 'sv' | 'sv-SE' | 'th' | 'th-TH' | 'th-TH-TH' | 'tr' | 'tr-TR' | 'uk' | 'uk-UA' | 'vi' | 'vi-VN' | 'uz' | 'uz-UZ' | 'uz-UZ' | 'uz-AF' | 'zh' | 'zh-Hans' | 'zh-Hans-HK' | 'zh-Hans-MO' | 'zh-Hans-SG' | 'zh-Hant' | 'zh-Hant-HK' | 'zh-Hant-MO' | 'zh-Hant-TW' | 'zh-HK' | 'zu' | 'zu-ZA';
declare class SimpleDate {
    date: Date;
    settings: NSimpleDate.ISettings;
    /**
     * you can pass a Date as Object, milliseconds, timestamps and more like date. The strict is used for faulty dates, so you get an undefined and not the actual time date. The offset in the settings must be written as minutes
     * @param date string or date
     * @param strict boolean
     * @param settings offset, locale, timeZone (object)
     */
    constructor(date?: number | string | Date, strict?: boolean, settings?: NSimpleDate.ISettings);
    private padTo2Digits;
    diff(diffDate: Date, unitOfTime: diffUnit): number;
    clone(): SimpleDate;
    isValid(): boolean;
    getCalendarWeek(): number;
    getWeekNumber(): number;
    startOf(unitOf?: unitStartOf): Date;
    endOf(unitOf?: unitEndOf): Date;
    getDates(toDate: Date): Date[];
    isSame(date: Date, unitIsSame: unitIsSame, sameYear?: boolean): boolean;
    /**
     * Checks if one date is after another date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is after the specified date, false otherwise.
     */
    isAfter(date: Date, unit?: unitIsAfter): boolean;
    /**
     * Checks if the current date is the same as or after the specified date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is the same as or after the specified date, false otherwise.
     */
    isSameOrAfter(date: Date, unit?: unitIsAfter): boolean;
    /**
     * Checks if the current date is before the specified date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is before the specified date, false otherwise.
     */
    isBefore(date: Date, unit?: unitIsBefore): boolean;
    /**
     * Checks if the current date is the same as or before the specified date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is the same as or before the specified date, false otherwise.
     */
    isSameOrBefore(date: Date, unit?: unitIsBefore): boolean;
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
    isBetween(from: Date, to: Date, unit?: unitIsBetween, equal?: boolean): boolean;
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
    format(format?: string): string;
    year(): number;
    month(): string;
    day(): string;
    shortMonth(): string;
    longMonth(): string;
    /**
     * add the value that you select via the unit
     * @param value number
     * @param type 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
     * @returns
     */
    add(value: number, type: unitOperation): SimpleDate;
    /**
     * subtracts the value that you select via the unit
     * @param value number
     * @param type 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
     * @returns
     */
    subtract(value: number, type: unitOperation): SimpleDate;
    cronExpression(): string;
    /**
     * with this function you can adopt the data (wich you want) like ['hours', 'minutes', 'year' '...'] of the passed date into the first date
     * @param from Date
     * @param values 'year' | 'month' | 'date' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond'
     * @returns
     */
    adopt(from: Date, values?: adoptUnit[]): SimpleDate;
    /**
     * shows you how much days has the date of the year
     * @returns number
     */
    daysInYear(): number;
    /**
     * shows you if the date that you hand over (in the constructor) is a leap year or not
     * @returns boolean
     */
    isLeapYear(): boolean;
    /**
     * you can check if the date that you passed in the constructor is in the dates array
     * @param dates Array<Date>
     * @param isWithinUnit 'year' | 'day' | 'month' | 'week' | 'date';
     * @returns
     */
    isWithin(dates: Date[], isWithinUnit?: isWithinUnit): boolean;
}
export = SimpleDate;
