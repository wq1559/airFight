let path = require('path');
let glob =  require('glob');


const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "dev"
});

module.exports = {
    modules: {
        rules: [
            {test: '/\.vue$/', use: 'vue-loader'},
            {   
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, 
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '10000',
                        }
                    }
                ]
                
            },{
                test: /\.less$/,
                use: extractLess.extract({
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        { loader: "less-loader"},
                    ]
                })
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin(),
        extractLess,
    ]
}