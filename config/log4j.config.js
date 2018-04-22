var path = require('path');

module.exports = {

    "appenders": {
        "console": {
            "type": "console",
            "layout": {
                "type": "pattern",
                "pattern": "%[[%d] [%p] [%c] [%z]%] - %m  "
            }
        },

        "multiError": {
            "type": "multiFile",
            "base": "logs/",
            "property": "categoryName",
            "extension": "-error.log",
            "layout": {
                "type": "pattern",
                "pattern": '[%d] [%p] [%c] [%z] - %m  '
            }
        },
        "multiInfo": {
            "type": "multiFile",
            "base": "logs/",
            "property": "categoryName",
            "extension": "-info.log",
            "layout": {
                "type": "pattern",
                "pattern": "[%d] [%p] [%c] [%z] - %m"
            }
        },
        "justError": {
            "type": "logLevelFilter",
            "appender": "multiError",
            "level": "error"
        },
        "justInfo": {
            "type": "logLevelFilter",
            "appender": "multiInfo",
            "level": "info"
        },
        "datefile": {
            "type": "dateFile",
            "layout": {
                "type": "pattern",
                "pattern": "[%d] [%p] [%c] [%z] - %m "
            },
            "filename": path.resolve("logs/custom_date_logs.log"),
            "pattern": ".yyyy-MM-dd"
        }
    },
    "categories": {
        "console": { "appenders": ["console"], "level": "info" },
        "default": { "appenders": ["datefile", "justError", "justInfo", "console"], "level": "info" }
    },
    "pm2": true
}
