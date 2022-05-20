module.exports = {
    presets: [

        //convert (transpile) the code the current enviroment 
        '@babel/preset-env',

        //add the react functionalities on the tranpile
        '@babel/preset-react'
    ],

    plugins: [
        '@babel/plugin-transform-runtime'
    ]
}