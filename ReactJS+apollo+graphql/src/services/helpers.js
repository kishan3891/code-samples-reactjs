export const withContextToken = (token) => {
    return {
        context: token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : {},
    };
};
