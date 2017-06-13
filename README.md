# Speedy.js as a Service

Heroku Service for compiling TypeScript files to WebAssembly.

## Compile Request

Post your files to `https://speedyjs-saas.herokuapp.com/compile`

```json
{
  "files": [
    {
      "fileName": "fib.ts",
      "source": "async function test(value: int) { \"use speedyjs\";\n return value; }"
    }
  ],
  "tsconfig": {
    "saveWast": true
  }
}

```

The output differs depending on the specified tsconfig and speedy.js options.

```json
[
  {
    "fileName": "fib.ts",
    "sourceMapText": "...",
    "wasm": [23, 45 ],
    "wast": "(module\n (type $0 ...",
    "js": "var __awaiter = ...\n",
    "exitStatus": 0,
    "diagnostics": []
  }
]
```

The schema for the request is located [here](./schemas/compile-schema.json).

## Publish to Heroku

Run `git push heroku master` to push the local version to heroku. 
