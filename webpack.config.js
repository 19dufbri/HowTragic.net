const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = env => {
    const isDev = env.dev ?? false;

    return {
        mode: isDev ? 'development' : 'production',
        entry: './src/index.tsx',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 8080,
            watchContentBase: true
        },
        plugins: [
            new CopyPlugin({
                patterns: [{ from: "static", to: "." }]
            })
        ],
        externals: {
            // Use external version of Preact
            "preact": "preact"
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        '@teamsupercell/typings-for-css-modules-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            }
                        }
                    ],
                    exclude: /node_modules/,
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'applet.js',
            path: path.resolve(__dirname, 'dist'),
        }
    }
}