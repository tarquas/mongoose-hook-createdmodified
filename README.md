# mongoose-createdmodified-all
Mongoose plugin, adding `createdAt` and `modifiedAt` timestamp fields to document. `modifiedAt` is changed on any type of update.

# Installation
```shell
git clone git@github.com:tarquas/mongoose-createdmodified-all.git mongoose-revision-all
```

# Package
```js
{
  "mongoose-createdmodified-all": "tarquas/mongoose-createdmodified-all#d33a92af1f"
}
```

# Usage

Example: enable 'createdAt' and 'modifiedAt' fields on a schema:

```js
var
  mongoose = require('mongoose'),
  createdModifiedPlugin = require('mongoose-createdmodified-all'),
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
