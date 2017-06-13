const bodyParser = require('body-parser');
const express = require("express");
const validate = require('express-jsonschema').validate;
const speedyjs = require("speedyjs-compiler");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.post("/compile", validate({ body: require("./schemas/compile-schema.json") }), function (req, res) {
    const output = [];

    for (let i = 0; i < req.body.files.length; ++i) {
        const file = req.body.files[i];

        const compiled = speedyjs.compileSourceCode(file.source, file.fileName, req.body.tsconfig);
        output.push({
            fileName: file.fileName,
            map: compiled.sourceMapText,
            js: compiled.js,
            wasm: compiled.wasm,
            wast: compiled.wast,
            exitStatus: compiled.exitStatus,
            diagnostics: compiled.diagnostics.map(diagnostic => speedyjs.formatDiagnostics([diagnostic]))
        });
    }

    res.json(output);
});

app.get("/version", function (req, res) {
    res.json(require("./package.json").version);
});


app.use(function(err, req, res, next) {
    let responseData;

    if (err.name === 'JsonSchemaValidation') {
        // Log the error however you please
        console.log(err.message);

        // Set a bad request http response status or whatever you want
        res.status(400);

        // Format the response body however you want
        responseData = {
            statusText: 'Bad Request',
            jsonSchemaValidation: true,
            validations: err.validations  // All of your validation information
        };

        res.json(responseData);
    } else {
        // pass error to next error middleware handler
        next(err);
    }
});

app.listen(PORT, function () {
    console.log("SaaS server running on port " + PORT);
});
