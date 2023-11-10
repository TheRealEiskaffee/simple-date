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
type unitOperation = 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
type adoptUnit = 'year' | 'month' | 'date' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
type isWithinUnit = 'year' | 'day' | 'month' | 'week' | 'date';
type timeZones = 'Europe/Andorra' | 'Asia/Dubai' | 'Asia/Kabul' | 'Europe/Tirane' | 'Asia/Yerevan' | 'Antarctica/Casey' | 'Antarctica/Davis' | 'Antarctica/DumontDUrville' | 'Antarctica/Mawson' | 'Antarctica/Palmer' | 'Antarctica/Rothera' | 'Antarctica/Syowa' | 'Antarctica/Troll' | 'Antarctica/Vostok' | 'America/Argentina/Buenos_Aires' | 'America/Argentina/Cordoba' | 'America/Argentina/Salta' | 'America/Argentina/Jujuy' | 'America/Argentina/Tucuman' | 'America/Argentina/Catamarca' | 'America/Argentina/La_Rioja' | 'America/Argentina/San_Juan' | 'America/Argentina/Mendoza' | 'America/Argentina/San_Luis' | 'America/Argentina/Rio_Gallegos' | 'America/Argentina/Ushuaia' | 'Pacific/Pago_Pago' | 'Europe/Vienna' | 'Australia/Lord_Howe' | 'Antarctica/Macquarie' | 'Australia/Hobart' | 'Australia/Currie' | 'Australia/Melbourne' | 'Australia/Sydney' | 'Australia/Broken_Hill' | 'Australia/Brisbane' | 'Australia/Lindeman' | 'Australia/Adelaide' | 'Australia/Darwin' | 'Australia/Perth' | 'Australia/Eucla' | 'Asia/Baku' | 'America/Barbados' | 'Asia/Dhaka' | 'Europe/Brussels' | 'Europe/Sofia' | 'Atlantic/Bermuda' | 'Asia/Brunei' | 'America/La_Paz' | 'America/Noronha' | 'America/Belem' | 'America/Fortaleza' | 'America/Recife' | 'America/Araguaina' | 'America/Maceio' | 'America/Bahia' | 'America/Sao_Paulo' | 'America/Campo_Grande' | 'America/Cuiaba' | 'America/Santarem' | 'America/Porto_Velho' | 'America/Boa_Vista' | 'America/Manaus' | 'America/Eirunepe' | 'America/Rio_Branco' | 'America/Nassau' | 'Asia/Thimphu' | 'Europe/Minsk' | 'America/Belize' | 'America/St_Johns' | 'America/Halifax' | 'America/Glace_Bay' | 'America/Moncton' | 'America/Goose_Bay' | 'America/Blanc-Sablon' | 'America/Toronto' | 'America/Nipigon' | 'America/Thunder_Bay' | 'America/Iqaluit' | 'America/Pangnirtung' | 'America/Atikokan' | 'America/Winnipeg' | 'America/Rainy_River' | 'America/Resolute' | 'America/Rankin_Inlet' | 'America/Regina' | 'America/Swift_Current' | 'America/Edmonton' | 'America/Cambridge_Bay' | 'America/Yellowknife' | 'America/Inuvik' | 'America/Creston' | 'America/Dawson_Creek' | 'America/Fort_Nelson' | 'America/Vancouver' | 'America/Whitehorse' | 'America/Dawson' | 'Indian/Cocos' | 'Europe/Zurich' | 'Africa/Abidjan' | 'Pacific/Rarotonga' | 'America/Santiago' | 'America/Punta_Arenas' | 'Pacific/Easter' | 'Asia/Shanghai' | 'Asia/Urumqi' | 'America/Bogota' | 'America/Costa_Rica' | 'America/Havana' | 'Atlantic/Cape_Verde' | 'America/Curacao' | 'Indian/Christmas' | 'Asia/Nicosia' | 'Asia/Famagusta' | 'Europe/Prague' | 'Europe/Berlin' | 'Europe/Copenhagen' | 'America/Santo_Domingo' | 'Africa/Algiers' | 'America/Guayaquil' | 'Pacific/Galapagos' | 'Europe/Tallinn' | 'Africa/Cairo' | 'Africa/El_Aaiun' | 'Europe/Madrid' | 'Africa/Ceuta' | 'Atlantic/Canary' | 'Europe/Helsinki' | 'Pacific/Fiji' | 'Atlantic/Stanley' | 'Pacific/Chuuk' | 'Pacific/Pohnpei' | 'Pacific/Kosrae' | 'Atlantic/Faroe' | 'Europe/Paris' | 'Europe/London' | 'Asia/Tbilisi' | 'America/Cayenne' | 'Africa/Accra' | 'Europe/Gibraltar' | 'America/Godthab' | 'America/Danmarkshavn' | 'America/Scoresbysund' | 'America/Thule' | 'Europe/Athens' | 'Atlantic/South_Georgia' | 'America/Guatemala' | 'Pacific/Guam' | 'Africa/Bissau' | 'America/Guyana' | 'Asia/Hong_Kong' | 'America/Tegucigalpa' | 'America/Port-au-Prince' | 'Europe/Budapest' | 'Asia/Jakarta' | 'Asia/Pontianak' | 'Asia/Makassar' | 'Asia/Jayapura' | 'Europe/Dublin' | 'Asia/Jerusalem' | 'Asia/Kolkata' | 'Indian/Chagos' | 'Asia/Baghdad' | 'Asia/Tehran' | 'Atlantic/Reykjavik' | 'Europe/Rome' | 'America/Jamaica' | 'Asia/Amman' | 'Asia/Tokyo' | 'Africa/Nairobi' | 'Asia/Bishkek' | 'Pacific/Tarawa' | 'Pacific/Enderbury' | 'Pacific/Kiritimati' | 'Asia/Pyongyang' | 'Asia/Seoul' | 'Asia/Almaty' | 'Asia/Qyzylorda' | 'Asia/Qostanay' |  'Asia/Aqtobe' | 'Asia/Aqtau' | 'Asia/Atyrau' | 'Asia/Oral' | 'Asia/Beirut' | 'Asia/Colombo' | 'Africa/Monrovia' | 'Europe/Vilnius' | 'Europe/Luxembourg' | 'Europe/Riga' | 'Africa/Tripoli' | 'Africa/Casablanca' | 'Europe/Monaco' | 'Europe/Chisinau' | 'Pacific/Majuro' | 'Pacific/Kwajalein' | 'Asia/Yangon' | 'Asia/Ulaanbaatar' | 'Asia/Hovd' | 'Asia/Choibalsan' | 'Asia/Macau' | 'America/Martinique' | 'Europe/Malta' | 'Indian/Mauritius' | 'Indian/Maldives' | 'America/Mexico_City' | 'America/Cancun' | 'America/Merida' | 'America/Monterrey' | 'America/Matamoros' | 'America/Mazatlan' | 'America/Chihuahua' | 'America/Ojinaga' | 'America/Hermosillo' | 'America/Tijuana' | 'America/Bahia_Banderas' | 'Asia/Kuala_Lumpur' | 'Asia/Kuching' | 'Africa/Maputo' | 'Africa/Windhoek' | 'Pacific/Noumea' | 'Pacific/Norfolk' | 'Africa/Lagos' | 'America/Managua' | 'Europe/Amsterdam' | 'Europe/Oslo' | 'Asia/Kathmandu' | 'Pacific/Nauru' | 'Pacific/Niue' | 'Pacific/Auckland' | 'Pacific/Chatham' | 'America/Panama' | 'America/Lima' | 'Pacific/Tahiti' | 'Pacific/Marquesas' | 'Pacific/Gambier' | 'Pacific/Port_Moresby' | 'Pacific/Bougainville' | 'Asia/Manila' | 'Asia/Karachi' | 'Europe/Warsaw' | 'America/Miquelon' | 'Pacific/Pitcairn' | 'America/Puerto_Rico' | 'Asia/Gaza' | 'Asia/Hebron' | 'Europe/Lisbon' | 'Atlantic/Madeira' | 'Atlantic/Azores' | 'Pacific/Palau' | 'America/Asuncion' | 'Asia/Qatar' | 'Indian/Reunion' | 'Europe/Bucharest' | 'Europe/Belgrade' | 'Europe/Kaliningrad' | 'Europe/Moscow' | 'Europe/Simferopol' | 'Europe/Kirov' | 'Europe/Astrakhan' | 'Europe/Volgograd' | 'Europe/Saratov' | 'Europe/Ulyanovsk' | 'Europe/Samara' | 'Asia/Yekaterinburg' | 'Asia/Omsk' | 'Asia/Novosibirsk' | 'Asia/Barnaul' | 'Asia/Tomsk' | 'Asia/Novokuznetsk' | 'Asia/Krasnoyarsk' | 'Asia/Irkutsk' | 'Asia/Chita' | 'Asia/Yakutsk' | 'Asia/Khandyga' | 'Asia/Vladivostok' | 'Asia/Ust-Nera' | 'Asia/Magadan' | 'Asia/Sakhalin' | 'Asia/Srednekolymsk' | 'Asia/Kamchatka' | 'Asia/Anadyr' | 'Asia/Riyadh' | 'Pacific/Guadalcanal' | 'Indian/Mahe' | 'Africa/Khartoum' | 'Europe/Stockholm' | 'Asia/Singapore' | 'America/Paramaribo' | 'Africa/Juba' | 'Africa/Sao_Tome' | 'America/El_Salvador' | 'Asia/Damascus' | 'America/Grand_Turk' | 'Africa/Ndjamena' | 'Indian/Kerguelen' | 'Asia/Bangkok' | 'Asia/Dushanbe' | 'Pacific/Fakaofo' | 'Asia/Dili' | 'Asia/Ashgabat' | 'Africa/Tunis' | 'Pacific/Tongatapu' | 'Europe/Istanbul' | 'America/Port_of_Spain' | 'Pacific/Funafuti' | 'Asia/Taipei' | 'Europe/Kiev' | 'Europe/Uzhgorod' | 'Europe/Zaporozhye' | 'Pacific/Wake' | 'America/New_York' | 'America/Detroit' | 'America/Kentucky/Louisville' | 'America/Kentucky/Monticello' | 'America/Indiana/Indianapolis' | 'America/Indiana/Vincennes' | 'America/Indiana/Winamac' | 'America/Indiana/Marengo' | 'America/Indiana/Petersburg' | 'America/Indiana/Vevay' | 'America/Chicago' | 'America/Indiana/Tell_City' | 'America/Indiana/Knox' | 'America/Menominee' | 'America/North_Dakota/Center' | 'America/North_Dakota/New_Salem' | 'America/North_Dakota/Beulah' | 'America/Denver' | 'America/Boise' | 'America/Phoenix' | 'America/Los_Angeles' | 'America/Anchorage' | 'America/Juneau' | 'America/Sitka' | 'America/Metlakatla' | 'America/Yakutat' | 'America/Nome' | 'America/Adak' | 'Pacific/Honolulu' | 'America/Montevideo' | 'Asia/Samarkand' | 'Asia/Tashkent' | 'America/Caracas' | 'Asia/Ho_Chi_Minh' | 'Pacific/Efate' | 'Pacific/Wallis' | 'Pacific/Apia' | 'Africa/Johannesburg';
type locales = 'ar_AE' | 'ar_BH' | 'ar_DJ' | 'ar_DZ' | 'ar_EG' | 'ar_EH' | 'ar_ER' | 'ar_IL' | 'ar_IQ' | 'ar_IQ' | 'ar_JO' | 'ar_JO' | 'ar_KM' | 'ar_KW' | 'ar_LB' | 'ar_LY' | 'ar_MA' | 'ar_MR' | 'ar_OM' | 'ar_PS' | 'ar_QA' | 'ar_SA' | 'ar_SD' | 'ar_SO' | 'ar_SS' | 'ar_SY' | 'ar_TD' | 'ar_TN' | 'ar_YE' | 'as' | 'as_IN' | 'asa' | 'asa_TZ' | 'az' | 'az_Cyrl' | 'az_Cyrl_AZ' | 'az_Latn' | 'az_Latn_AZ' | 'bas' | 'bas_CM' | 'be' | 'be_BY' | 'bem' | 'bem_ZM' | 'bez' | 'bez_TZ' | 'bg' | 'bg_BG' | 'bm' | 'bm_ML' | 'bn' | 'bn' | 'bn_BD' | 'bn_BD' | 'bn_IN' | 'bn_IN' | 'bo' | 'bo_CN' | 'bo_IN' | 'br' | 'br_FR' | 'brx' | 'brx_IN' | 'bs' | 'bs_Cyrl' | 'bs_Cyrl_BA' | 'bs_Latn' | 'bs_Latn_BA' | 'ca' | 'ca_AD' | 'ca_ES' | 'ca_FR' | 'ca_IT' | 'ce' | 'ce_RU' | 'cgg' | 'cgg_UG' | 'chr' | 'chr_US' | 'cs' | 'cs_CZ' | 'cy' | 'cy_GB' | 'da' | 'da_DK' | 'dav' | 'dav_KE' | 'de' | 'de_AT' | 'de_BE' | 'de_CH' | 'de_DE' | 'de_IT' | 'de_LI' | 'de_LU' | 'de_LU' | 'dje' | 'dje_NE' | 'dsb' | 'dsb_DE' | 'dua' | 'dua_CM' | 'dyo' | 'dyo_SN' | 'dz' | 'dz_BT' | 'ebu' | 'ebu_KE' | 'ee' | 'ee_GH' | 'ee_TG' | 'el' | 'el_CY' | 'el_GR' | 'en' | 'en_AG' | 'en_AI' | 'en_AI' | 'en_AS' | 'en_AT' | 'en_AU' | 'en_AU' | 'en_BB' | 'en_BE' | 'en_BI' | 'en_BM' | 'en_BS' | 'en_BW' | 'en_BZ' | 'en_CA' | 'en_CA' | 'en_CC' | 'en_CH' | 'en_CK' | 'en_CM' | 'en_CX' | 'en_CY' | 'en_DE' | 'en_DG' | 'en_DK' | 'en_DM' | 'en_ER' | 'en_FI' | 'en_FJ' | 'en_FK' | 'en_FM' | 'en_GB' | 'en_GB' | 'en_GD' | 'en_GG' | 'en_GH' | 'en_GI' | 'en_GM' | 'en_GU' | 'en_GY' | 'en_HK' | 'en_IE' | 'en_IE' | 'en_IL' | 'en_IM' | 'en_IN' | 'en_IN' | 'en_IO' | 'en_JE' | 'en_JM' | 'en_KE' | 'en_KI' | 'en_KN' | 'en_KY' | 'en_LC' | 'en_LR' | 'en_LS' | 'en_MG' | 'en_MH' | 'en_MO' | 'en_MP' | 'en_MS' | 'en_MT' | 'en_MT' | 'en_MU' | 'en_MW' | 'en_MY' | 'en_NA' | 'en_NF' | 'en_NG' | 'en_NL' | 'en_NR' | 'en_NU' | 'en_NZ' | 'en_NZ' | 'en_PG' | 'en_PH' | 'en_PH' | 'en_PK' | 'en_PN' | 'en_PR' | 'en_PW' | 'en_RW' | 'en_SB' | 'en_SC' | 'en_SD' | 'en_SE' | 'en_SG' | 'en_SG' | 'en_SH' | 'en_SI' | 'en_SL' | 'en_SS' | 'en_SX' | 'en_SZ' | 'en_TC' | 'en_TK' | 'en_TO' | 'en_TT' | 'en_TV' | 'en_TZ' | 'en_UG' | 'en_UM' | 'en_US' | 'en_US' | 'en_VC' | 'en_VG' | 'en_VI' | 'en_VU' | 'en_WS' | 'en_ZA' | 'en_ZA' | 'en_ZM' | 'en_ZW' | 'eo' | 'es' | 'es_AR' | 'es_BO' | 'es_BR' | 'es_BZ' | 'es_CL' | 'es_CO' | 'es_CR' | 'es_CU' | 'es_DO' | 'es_EA' | 'es_EC' | 'es_ES' | 'es_GQ' | 'es_GT' | 'es_HN' | 'es_IC' | 'es_MX' | 'es_NI' | 'es_PA' | 'es_PE' | 'es_PR' | 'es_PY' | 'es_SV' | 'es_US' | 'es_UY' | 'es_VE' | 'et' | 'et_EE' | 'eu' | 'eu_ES' | 'ewo' | 'ewo_CM' | 'fa' | 'fa_AF' | 'fa_IR' | 'ff_CM' | 'ps_AF' | 'ff' | 'ff_GN' | 'ff_MR' | 'ff_SN' | 'fi' | 'fi_FI' | 'fil' | 'fil_PH' | 'fo' | 'fo_DK' | 'fo_FO' | 'fr' | 'fr_BE' | 'fr_BF' | 'fr_BI' | 'fr_BJ' | 'fr_BL' | 'fr_CA' | 'fr_CD' | 'fr_CF' | 'fr_CG' | 'fr_CH' | 'fr_CI' | 'fr_CM' | 'fr_DJ' | 'fr_DZ' | 'fr_FR' | 'fr_GA' | 'fr_GF' | 'fr_GN' | 'fr_GP' | 'fr_GQ' | 'fr_HT' | 'fr_KM' | 'fr_LU' | 'fr_MA' | 'fr_MC' | 'fr_MF' | 'fr_MG' | 'fr_ML' | 'fr_MQ' | 'fr_MR' | 'fr_MU' | 'fr_NC' | 'fr_NE' | 'fr_PF' | 'fr_PM' | 'fr_RE' | 'fr_RW' | 'fr_SC' | 'fr_SN' | 'fr_SY' | 'fr_TD' | 'fr_TG' | 'fr_TN' | 'fr_VU' | 'fr_WF' | 'fr_YT' | 'fur' | 'fur_IT' | 'fy' | 'fy_NL' | 'ga' | 'ga' | 'ga_IE' | 'ga_IE' | 'gd' | 'gd_GB' | 'gl' | 'gl_ES' | 'gsw' | 'gsw_CH' | 'gsw_FR' | 'gsw_LI' | 'gu' | 'gu_IN' | 'guz' | 'guz_KE' | 'gv' | 'gv_IM' | 'ha' | 'ha_GH' | 'ha_NE' | 'ha_NG' | 'haw' | 'haw_US' | 'he' | 'he_IL' | 'hi' | 'hi_IN' | 'hr' | 'hr_BA' | 'hr_HR' | 'hsb' | 'hsb_DE' | 'hu' | 'hu_HU' | 'hy' | 'hy_AM' | 'ig' | 'ig_NG' | 'ii' | 'ii_CN' | 'in' | 'in_ID' | 'is' | 'is_IS' | 'it' | 'it_CH' | 'it_IT' | 'it_SM' | 'it_VA' | 'iw' | 'iw_IL' | 'ja' | 'ja_JP' | 'jgo' | 'jgo_CM' | 'jmc' | 'jmc_TZ' | 'ka' | 'ka_GE' | 'kab' | 'kab_DZ' | 'kam' | 'kam_KE' | 'kde' | 'kde_TZ' | 'kea' | 'kea_CV' | 'khq' | 'khq_ML' | 'ki' | 'ki_KE' | 'kk' | 'kk_KZ' | 'kkj' | 'kkj_CM' | 'kl' | 'kl_GL' | 'kln' | 'kln_KE' | 'km' | 'km_KH' | 'kn' | 'kn_IN' | 'ko' | 'ko' | 'ko_KP' | 'ko_KR' | 'ko_KR' | 'kok' | 'kok_IN' | 'ks' | 'ks_IN' | 'ksb' | 'ksb_TZ' | 'ksf' | 'ksf_CM' | 'ksh' | 'ksh_DE' | 'kw' | 'kw_GB' | 'ky' | 'ky_KG' | 'lag' | 'lag_TZ' | 'lt' | 'lt_LT' | 'lb' | 'lb_LU' | 'lv' | 'lv_LV' | 'lg' | 'lg_UG' | 'mk' | 'mk_MK' | 'ms' | 'ms_MY' | 'mt' | 'mt_MT' | 'nl' | 'nl_BE' | 'nl_NL' | 'no' | 'no_NO' | 'no_NO_NY' | 'pl' | 'pl_PL' | 'pt' | 'pt_AO' | 'pt_BR' | 'pt_CH' | 'pt_CV' | 'pt_GQ' | 'pt_GW' | 'pt_LU' | 'pt_MO' | 'pt_MZ' | 'pt_PT' | 'pt_ST' | 'pt_TL' | 'ro' | 'ro_RO' | 'ru' | 'ru_BY' | 'ru_KG' | 'ru_KZ' | 'ru_MD' | 'ru_RU' | 'ru_UA' | 'sk' | 'sk_SK' | 'sl' | 'prs_AF' | 'sl_SI' | 'sq' | 'sq_AL' | 'sr' | 'sr_BA' | 'sr_CS' | 'sr_ME' | 'sr_RS' | 'sv' | 'sv_SE' | 'th' | 'th_TH' | 'th_TH_TH' | 'tr' | 'tr_TR' | 'uk' | 'uk_UA' | 'vi' | 'vi_VN' | 'uz' | 'uz_UZ' | 'uz_UZ' | 'uz_AF' | 'zh' | 'zh_Hans' | 'zh_Hans_HK' | 'zh_Hans_MO' | 'zh_Hans_SG' | 'zh_Hant' | 'zh_Hant_HK' | 'zh_Hant_MO' | 'zh_Hant_TW' | 'zh_HK' | 'zu' | 'zu_ZA';

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
        const resolvedTimeOptions = new Intl.DateTimeFormat().resolvedOptions();

        this.date = date ? new Date(date) : !strict ? new Date() : undefined;

        this.settings = {
            offset : settings?.offset ? settings?.offset : this.date?.getTimezoneOffset() || 0,
            locale : settings?.locale ? settings?.locale : resolvedTimeOptions.locale as locales,
            timeZone : settings?.timeZone ? settings?.timeZone : resolvedTimeOptions.timeZone as timeZones,
        }
    }

    private padTo2Digits(number : number) {
        return number?.toString()?.padStart(2, '0');
    }

    public diff(diffDate : Date, unitOfTime : diffUnit) : number {
        let result : number = undefined;

        if(diffDate && unitOfTime) {
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
        return new SimpleDate(this.date);
    }

    public isValid() : boolean {
        // return Object.prototype.toString.call(this.date) === '[object Date]';
        return this.date instanceof Date && !isNaN(this.date.getTime());
    }

    public getCalendarWeek() : number {
        const recrusiveFunction : any = (date : Date) => {
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
        
        return recrusiveFunction(this.date);
    }

    public getWeekNumber() : number {
        return this.date.getDay() === 0 ? 6 : this.date.getDay() - 1 ;
    }

    public startOf(unitOf ?: unitStartOf) : Date {
        let result : Date = undefined,
            newDate : Date = new Date(this.date);

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

        return result
    }

    public endOf(unitOf ?: unitEndOf) : Date {
        let result : Date = undefined,
            newDate : Date = new Date(this.date);

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

        return result
    }

    public getDates(toDate : Date) : Date[] {
        const result : Date[] = [],
              firstDate : Date = new Date(new SimpleDate(this.date).startOf('day')),
              lastDate : Date = new Date(new SimpleDate(toDate).endOf('day')),
              diffDays = Math.abs(Math.round((new Date(lastDate).getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))),
              days = new SimpleDate(firstDate).isSame(lastDate, 'date') ? 1 : diffDays >= 2 ? diffDays : 2,
              startDate = firstDate <= lastDate ? new Date(firstDate) : new Date(lastDate);
              
        for (let index = 0; index < days; index++) {
            const nextDate = new Date(startDate);

            startDate.setDate(startDate.getDate() + 1);
            
            nextDate.setHours(23, 59, 59, 59);
            
            result.push(nextDate);
        }

        return result;
    }

    public isSame(date : Date, unitIsSame : unitIsSame, sameYear : boolean = true) : boolean {
        let result = false;
        
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
                    result = `${ (this.padTo2Digits(date.getMonth() + 1)) }-${ this.padTo2Digits(date.getDate()) }` === `${ (this.padTo2Digits(this.date.getMonth() + 1)) }-${ this.padTo2Digits(this.date.getDate()) }`
                break;
            }          
        }

        return result;
    }
    
    public isAfter(date : Date, unit ?: unitIsAfter) {
        let response : boolean = false;

        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            if(date) {
                date = new Date(date);
            } else {
                date = new Date()
            }
        }

        switch (unit) {
            case 'date':
                //YYYY-MM-DD
                response = new Date(this.date.toISOString().substring(0, 10)) > new Date(date.toISOString().substring(0, 10));
            break;

            case 'month':
                //YYYY-MM
                response = new Date(this.date.toISOString().substring(0, 7)) > new Date(date.toISOString().substring(0, 7));
            break;

            case 'year':
                //YYYY

                response = new Date(this.date.toISOString().substring(0, 4)) > new Date(date.toISOString().substring(0, 4));
            break;

            case 'time':
                //HH:mm:ss
                response = this.date.toISOString().substring(11, 19) > date.toISOString().substring(11, 19)
            break;
        
            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date > date;
            break;
        }

        return response;
    }

    public isSameOrAfter(date : Date, unit ?: unitIsAfter) {
        let response : boolean = false;
        
        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            if(date) {
                date = new Date(date);
            } else {
                date = new Date()
            }
        }

        if(date) {
            switch (unit) {
                case 'date':
                    //YYYY-MM-DD
                    response = new Date(this.date.toISOString().substring(0, 10)) >= new Date(date.toISOString().substring(0, 10));
                break;
    
                case 'month':
                    //YYYY-MM
                    response = new Date(this.date.toISOString().substring(0, 7)) >= new Date(date.toISOString().substring(0, 7));
                break;
    
                case 'year':
                    //YYYY
    
                    response = new Date(this.date.toISOString().substring(0, 4)) >= new Date(date.toISOString().substring(0, 4));
                break;
    
                case 'time':
                    //HH:mm:ss
                    response = this.date.toISOString().substring(11, 19) >= date.toISOString().substring(11, 19)
                break;
            
                default:
                    //YYYY-MM-DD HH:mm:ss
                    response = this.date >= date;
                break;
            }
        }

        return response;
    }
    
    public isBefore(date : Date, unit ?: unitIsBefore) {
        let response : boolean = false;
        
        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            if(date) {
                date = new Date(date);
            } else {
                date = new Date()
            }
        }

        switch (unit) {
            case 'date':
                //YYYY-MM-DD
                response = new Date(this.date.toISOString().substring(0, 10)) < new Date(date.toISOString().substring(0, 10));
            break;

            case 'month':
                //YYYY-MM
                response = new Date(this.date.toISOString().substring(0, 7)) < new Date(date.toISOString().substring(0, 7));
            break;

            case 'year':
                //YYYY

                response = new Date(this.date.toISOString().substring(0, 4)) < new Date(date.toISOString().substring(0, 4));
            break;
        
            case 'time':
                //HH:mm:ss
                response = this.date.toISOString().substring(11, 19) < date.toISOString().substring(11, 19)
            break;

            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date < date;
            break;
        }

        return response;
    }

    public isSameOrBefore(date : Date, unit ?: unitIsBefore) {
        let response : boolean = false;

        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            if(date) {
                date = new Date(date);
            } else {
                date = new Date()
            }
        }
        
        switch (unit) {
            case 'date':
                //YYYY-MM-DD
                response = new Date(this.date.toISOString().substring(0, 10)) <= new Date(date.toISOString().substring(0, 10));
            break;

            case 'month':
                //YYYY-MM
                response = new Date(this.date.toISOString().substring(0, 7)) <= new Date(date.toISOString().substring(0, 7));
            break;

            case 'year':
                //YYYY

                response = new Date(this.date.toISOString().substring(0, 4)) <= new Date(date.toISOString().substring(0, 4));
            break;
        
            case 'time':
                //HH:mm:ss
                response = this.date.toISOString().substring(11, 19) <= date.toISOString().substring(11, 19)
            break;

            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date <= date;
            break;
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
    public isBetween(from : Date, to : Date, unit ?: unitIsBetween, equal : boolean = true) {
        let response : boolean = undefined,
            firstDate = new Date(this.date),
            secondDate = new Date(from),
            thirdDate = new Date(to);
        
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
        
        return response
    }

    /**
     * you can create your own format. This is the available formats in a string.
     * YYYY (2023),
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

        if(Math.sign(this.settings.offset) <= 0) {
            date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset))
        } else {
            date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset))
        }

        if(format) {
            const year = date.toISOString().substring(0, 4), //YYYY
                  month = date.toISOString().substring(5, 7), //MM
                  day = date.toISOString().substring(8, 10), //DD
                  hours = date.toISOString().substring(11, 13), //HH
                  minutes = date.toISOString().substring(14, 16), //mm
                  seconds = date.toISOString().substring(17, 19), //ss
                  longWeekday = date.toLocaleString(this.settings.locale, { weekday: 'long', timeZone : this.settings.timeZone }), //dddd named weekday
                  shortWeekday = date.toLocaleString(this.settings.locale, { weekday: 'short', timeZone : this.settings.timeZone }), //dd named weekday as short
                  longMonth = date.toLocaleString(this.settings.locale, { month: 'short', timeZone : this.settings.timeZone }), //dd named month
                  shortMonth = date.toLocaleString(this.settings.locale, { month: 'long', timeZone : this.settings.timeZone }); //dddd named month as short

            response = format;
            response = response.replace(/\bYYYY\b/g, year)
            response = response.replace(/\bMM\b/g, month);
            response = response.replace(/\bDD\b/g, day);
            response = response.replace(/\bHH\b/g, hours);
            response = response.replace(/\bmm\b/g, minutes);
            response = response.replace(/\bss\b/g, seconds);
            response = response.replace(/\bdddd\b/g, longWeekday);
            response = response.replace(/\bdd\b/g, shortWeekday);
            response = response.replace(/\bMMMM\b/g, longMonth);
            response = response.replace(/\bMMM\b/g, shortMonth);
        } else {
            if(this.date instanceof Date && !isNaN(this.date.getTime())) {
                response = date.toISOString().substring(0, 10);
            }
        }
        
        return response
    }

    /**
     * add the value that you select via the unit
     * @param value number
     * @param type 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
     * @returns 
     */
    public add(value : number, type : unitOperation) : SimpleDate {
        let newDate : SimpleDate = new SimpleDate(this.date)

        switch (type) {
            case 'years':
            case 'year':
                newDate.date.setFullYear(newDate.date.getFullYear() + value);
            break;

            case 'months':
            case 'month':
                newDate.date.setMonth(newDate.date.getMonth() + value);
            break;

            case 'days':
            case 'day':
                newDate.date.setDate(newDate.date.getDate() + value);
            break;

            case 'hours':
            case 'hour':
                newDate.date.setHours(newDate.date.getHours() + value);
            break;

            case 'minutes':
            case 'minute':
                newDate.date.setMinutes(newDate.date.getMinutes() + value);
            break;

            case 'seconds':
            case 'second':
                newDate.date.setSeconds(newDate.date.getSeconds() + value);
            break;

            case 'milliseconds':
            case 'millisecond':
                newDate.date.setMilliseconds(newDate.date.getMilliseconds() + value);
            break;
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

        switch (type) {
            case 'years':
            case 'year':
                newDate.date.setFullYear(newDate.date.getFullYear() - value);
            break;

            case 'months':
            case 'month':
                newDate.date.setMonth(newDate.date.getMonth() - value);
            break;

            case 'days':
            case 'day':
                newDate.date.setDate(newDate.date.getDate() - value);
            break;

            case 'hours':
            case 'hour':
                newDate.date.setHours(newDate.date.getHours() - value);
            break;

            case 'minutes':
            case 'minute':
                newDate.date.setMinutes(newDate.date.getMinutes() - value);
            break;

            case 'seconds':
            case 'second':
                newDate.date.setSeconds(newDate.date.getSeconds() - value);
            break;

            case 'milliseconds':
            case 'millisecond':
                newDate.date.setMilliseconds(newDate.date.getMilliseconds() - value);
            break;
        }

        return newDate;
    }

    public cronExpression() {
        let clonedDate = new Date(this.date),
            result : string = undefined;

        if(clonedDate) {
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

        return new SimpleDate(this.date);
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

        if(dates.length) {
            result = dates.some((date) => new SimpleDate(this.date).isSame(new Date(date), isWithinUnit));
        }

        return result;
    }
}

export = SimpleDate