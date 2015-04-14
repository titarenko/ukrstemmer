# Ukrstemmer

Stemmer for Ukrainian language (works good enough for Russian language as well). Ported from [https://www.drupal.org/project/ukstemmer](https://www.drupal.org/project/ukstemmer).

## Usage

```bash
npm install ukrstemmer --save
```

```js
var stemmer = require('ukrstemmer');

console.log(stemmer('картопля')); // will output 'картопл'
```

## License

[GPLv2](http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
