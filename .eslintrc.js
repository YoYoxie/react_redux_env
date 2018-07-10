module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "spaced-comment": [0],
        "no-unused-vars": [1],
        "no-mixed-spaces-and-tabs":[0],
        "no-useless-escape":[0],
        "no-console":[0],
        "no-extra-semi":[0],
        "no-class-assign":[0],
        "no-empty-pattern":[0],
        "no-undef":[0],
        "no-empty": [0],
        "react/wrap-multilines": [0],
        "react/no-multi-comp": [0],
        "no-constant-condition": [0],
        "react/jsx-no-bind": [0],
        "react/prop-types": [0],
        "arrow-body-style": [0],
        "react/prefer-stateless-function": [0],
        "semi": [0],
        'eqeqeq': "off"
    }
};