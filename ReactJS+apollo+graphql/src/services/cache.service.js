import LRU from "lru-cache";

export const CACHE_SEXUALITY_KEY = "sexuality";
export const CACHE_GENDER_KEY = "gender";
const options = {
    max: 500,
    length: function (n, key) {
        return n * 2 + key.length;
    },
    maxAge: 1000 * 60 * 60,
};

const configCache = new LRU({});

export const CONFIG_CACHE = {
    get SEXUALITY() {
        return configCache.get(CACHE_SEXUALITY_KEY) || [];
    },
    set SEXUALITY(value) {
        configCache.set(CACHE_SEXUALITY_KEY, value);
    },
    /**
     *
     * @param value
     * @constructor
     */
    set GENDER(value) {
        configCache.set(CACHE_GENDER_KEY, value);
    },
    /**
     *
     * @return {Gender[]}
     * @constructor
     */
    get GENDER() {
        return configCache.get(CACHE_GENDER_KEY) || [];
    },
};

export const cache = new LRU(options);
export const dataFetcher = async (key, fetcher) => {
    if (cache.has(key)) {
        return cache.get(key);
    }
    const data = await fetcher();
    if (data) {
        cache.set(key, data);
    }
    return data;
};
export const multiDataFetcher = async (keys, fetcher, keyMapper) => {
    const missedHits = keys.filter((key) => !cache.has(keyMapper(key)));
    if (missedHits.length) {
        const items = await fetcher(missedHits);
        items.forEach((item) => {
            cache.set(keyMapper(item), item);
        });
    }
    return keys.map((key) => cache.get(keyMapper(key))).filter((v) => !!v);
};
export const updateCache = (key, updater) => {
    cache.set(key, updater(cache.get(key)));
};
