var path = require('path');

module.exports = {
    alias: {
        '@': path.resolve('assets/public'),
        'jquery': 'lib/jquery.min'
    },
    vendors: ['jquery'],
    externals: {
        '$': 'window.$',
        'jQuery': 'window.$'
    },
    noParse: [/jquery/],
    cleanDirector: ['dist/js', 'dist/css', 'dist/img', 'dist/font', 'dist/media', 'dist/views/*.html']
}
