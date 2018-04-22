module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['ie 6-8', '> 1%', 'last 2 versions', 'Firefox > 20', 'iOS 7']
        })
    ]
};
