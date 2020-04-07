// Need to include this to use sass for react native

const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
    const {
        resolver: { sourceExts }
    } = await getDefaultConfig();
    return {
        transformer: {
            babelTransformerPath: require.resolve("react-native-sass-transformer")
        },
        resolver: {
            sourceExts: [...sourceExts, "scss", "sass"]
        }
    };
})();