# es-mime-types

[![Twitter](https://img.shields.io/twitter/follow/v1rtl.svg?label=twitter&style=flat-square)](https://twitter.com/v1rtl)
![Top lang](https://img.shields.io/github/languages/top/talentlessguy/es-mime-types.svg?style=flat-square)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/es-mime-types.svg?style=flat-square)
[![Version](https://img.shields.io/npm/v/es-mime-types.svg?style=flat-square)](https://www.npmjs.com/package/es-mime-types)
![Last commit](https://img.shields.io/github/last-commit/talentlessguy/es-mime-types.svg?style=flat-square)

> [`mime-types`](https://github.com/jshttp/mime-types) rewrite in TypeScript with ESM and CommonJS targets

The ultimate javascript content-type utility.

Similar to [the `mime@1.x` module](https://www.npmjs.com/package/mime), except:

- **No fallbacks.** Instead of naively returning the first available type,
  `mime-types` simply returns `false`, so do
  `const type = mime.lookup('unrecognized') || 'application/octet-stream'`.
- No `new Mime()` business, so you could do `var lookup = require('mime-types').lookup`.
- No `.define()` functionality
- Bug fixes for `.lookup(path)`

Otherwise, the API is compatible with `mime` 1.x.

## Install

```sh
pnpm i es-mime-types
```

## Adding Types

All mime types are based on [mime-db](https://www.npmjs.com/package/mime-db),
so open a PR there if you'd like to add mime types.

## API

```ts
import { lookup, contentType, extension, charset, types } from 'es-mime-types'
```

All functions return `false` if input is invalid or not found.

### `lookup(path)`

Lookup the content-type associated with a file.

```ts
lookup('json') // 'application/json'
lookup('.md') // 'text/markdown'
lookup('file.html') // 'text/html'
lookup('folder/file.js') // 'application/javascript'
lookup('folder/.htaccess') // false
lookup('cats') // false
```

### `contentType(type)`

Create a full content-type header given a content-type or extension.
When given an extension, `lookup` is used to get the matching
content-type, otherwise the given content-type is used. Then if the
content-type does not already have a `charset` parameter, `charset`
is used to get the default charset and add to the returned content-type.

```ts
contentType('markdown') // 'text/x-markdown; charset=utf-8'
contentType('file.json') // 'application/json; charset=utf-8'
contentType('text/html') // 'text/html; charset=utf-8'
contentType('text/html; charset=iso-8859-1') // 'text/html; charset=iso-8859-1'

// from a full path
contentType(path.extname('/path/to/file.json')) // 'application/json; charset=utf-8'
```

### `extension(type)`

Get the default extension for a content-type.

```ts
extension('application/octet-stream') // 'bin'
```

### `charset(type)`

Lookup the implied default charset of a content-type.

```ts
charset('text/markdown') // 'UTF-8'
```

### `types[extension]`

A map of extensions by content-type.

## License

MIT © [v1rtl](https://v1rtl.site)
