import * as _ from "lodash";

export const defaultErrorReducer = (state, action) => {
    return {
        ...state,
        error: action.error,
    };
};

export const recordUpdate = (value, toUpdate, updates, idProp = "id") => {
    if (Array.isArray(value)) {
        return value.map((v) =>
            v[idProp] === toUpdate
                ? {
                      ...v,
                      ...updates,
                  }
                : v
        );
    }
    return value && value[idProp] === toUpdate
        ? {
              ...value,
              ...updates,
          }
        : value;
};

export const createDataReducers = (
    type,
    loader,
    succeeded = null,
    hooks = {}
) => {
    const TYPE_START = `${type}_STARTED`;
    const TYPE_SUCCEEDED = `${type}_SUCCEEDED`;
    const TYPE_FAILED = `${type}_FAILED`;
    const TYPE_ENDED = `${type}_ENDED`;

    const compose = (reducers) => {
        return (state, action) => {
            return _.reduce(
                reducers,
                (acc, reducer) => {
                    return reducer(acc, action);
                },
                state
            );
        };
    };

    if (_.isString(succeeded)) {
        succeeded = [succeeded];
    }
    if (_.isArray(succeeded)) {
        const fields = succeeded;
        succeeded = (state, { payload }) => {
            return fields.reduce((acc, field) => {
                return {
                    ...state,
                    [field]: payload[field],
                };
            }, state);
        };
    }
    if (!succeeded) {
        succeeded = (state) => state;
    }
    return {
        [TYPE_START]: compose([
            loaderReducer(loader),
            hooks.start || _.identity,
        ]),
        [TYPE_SUCCEEDED]: succeeded,
        [TYPE_FAILED]: defaultErrorReducer,
        [TYPE_ENDED]: compose([
            loaderReducer(loader, false),
            hooks.end || _.identity,
        ]),
    };
};
export const loaderReducer = (name, loading = true) => {
    return (state, action) => {
        return {
            ...state,
            loaders: {
                ...state.loaders,
                [name]: loading,
            },
        };
    };
};
