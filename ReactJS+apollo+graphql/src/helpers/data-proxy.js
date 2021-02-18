import * as _ from "lodash";

const snakeCase = _.memoize(_.snakeCase);
const camelCase = _.memoize(_.camelCase);
const dataProxy = (data) => {
    return new Proxy(data, {
        get(obj, prop) {
            if (prop in obj) {
                return obj[prop];
            }
            const name = snakeCase(prop);

            return obj[name];
        },
    });
};

const convert = (mapper, obj) => {
    const updated = {};
    _.each(obj, (value, key) => {
        updated[mapper(key)] = value;
    });
    return updated;
};
const toCamel = _.partial(convert, camelCase);
const toSnake = _.partial(convert, snakeCase);

export { dataProxy, toCamel, toSnake, camelCase, snakeCase };
