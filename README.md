# searchterms
build searchterms for object oriented search e.g. mongoose

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

```
$ npm i searchterms
```

## Build $and Statements

calling andStatements

```js
const searchterms = require('searchterms')
const instance = new searchterms()

const base = [
    { 'status.status': { $ne: 99 } },
    { supplier: { $ne: '' } }
]
const match = instance.andStatements({ base, fieldToSearch: 'index', searchTerm: 'Alles und (nichts) und !"§$ VIELES' })

```
will return

```js
{
  '$and':   [
    { 'status.status': { '$ne': 99 } },
    { supplier: { '$ne': '' } },
    { index: { '$regex': /alles/im } },
    { index: { '$regex': /und/im } },
    { index: { '$regex': /\(nichts\)/im } },
    { index: { '$regex': /und/im } },
    { index: { '$regex': /!"§$/im } },
    { index: { '$regex': /vieles/im } }
  ]
}
```