const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@images', resolve('src/assets/images'))
            .set('@css', resolve('src/assets/css'))
            .set('@js', resolve('src/assets/js'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@request', resolve('src/request'))
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8010',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}
