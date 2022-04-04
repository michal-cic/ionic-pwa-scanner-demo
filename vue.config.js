module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /zbar.wasm.bin/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ],
        }
    },
}