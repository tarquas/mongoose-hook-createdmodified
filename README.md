# mongoose-hook-createdmodified
Mongoose plugin, adding `createdAt` and `modifiedAt` timestamp fields to document. `modifiedAt` is changed on any type of update.

# Installation
```shell
git clone git@github.com:tarquas/mongoose-hook-createdmodified.git mongoose-hook-createdmodified
```

# Package
```js
{
  "mongoose-hook-createdmodified": "tarquas/mongoose-hook-createdmodified#8ab0591525"
}
```

# Usage

Example: enable 'createdAt' and 'modifiedAt' fields on a schema:

```js
var
  mongoose = require('mongoose'),
  createdModifiedPlugin = require('mongoose-hook-createdmodified'),
  PersonSchema;

PersonSchema = {
  name: String,
  email: String
};

PersonSchema.plugin(createdModifiedPlugin, {mongoose: mongoose});

mongoose.model('Person', PersonSchema);
```

# Notes

* This plugin must be provided with an exact instance of `mongoose`, where the processing models expected to be processed, in `opts` parameter.

* This plugin updates modification time of the document on its any update operation. It's based on `mongoose-hook` plugin, so every time, any of `insert`, `update`, or `findAndModify` database API wrapper is called, the creation/modification time is updated.
