# koa-chunks
Koa middleware to uploads large files in multiple chunks. 
A typical chunk is 4 MB. Using large chunks will mean fewer calls and faster overall throughput. If interrupted a chunck you will have to resume at the beginning of the last valid chunk.

## Status

[![npm version][npm-image]][npm-url] [![build status][travis-image]][travis-url]

## Installation

### Configuration

The middleware can be configured with the following parameters:

- `file_max`: Maximum file size (`1024` MB = 1G by default).
- `chunk_min`: Minimum chunk size (`2` MB by default).
- `chunk_max`: Maximum chunk size [-1 = no limit < file_max] (`150` MB by default).
- `expires`: waiting for next chunk in milliseconds (3600 = 1H by default).
- `tmp`: Temporary directory to storage de chunks (System Temporary Directory by default).

You can change the defaults by doing:

```javascript
chunks({
  file_max: 1024,
  chunk_min: 4,
  chunk_max: 150,
  expires: 3600,
  tmp: '/tmp'
});
```

## Usage

```javascript
const { chunks } = require('koa-chunks');
const Koa = require('koa');

const app = new Koa();

app.put('/chunk', chunks(), async ctx => {

});

app.listen(3000);
```

### Request start session

Required a body JSON with the file information:

```javascript
{
    "bytes": 230783,
    "name": "Getting_Started.pdf",
    "mime_type": "application/pdf"
}
```

### Response 

If session is created successfully the server response with Sample JSON:

```javascript
{
    "session_id": "0000-0000-0000-0000",
    "offset": 0,
    "expires": "3600"
}
```

### Request upload chunk

BODY: Required a chunk of data from the file being uploaded. If resuming, the chunk should begin at the number of bytes into the file that equals the offset

PARAMETERS : 

upload_id: The session ID of the in-progress upload on the server. If left blank, the server will create a new upload session.

offset: The byte offset of this chunk, relative to the beginning of the full file. The server will verify that this matches the offset it expects. If it does not, the server will return an error with the expected offset.


```javascript
'/chunk?session_id=&offset=23847'
```

### Response chunk uploaded successful

If chunk uploaded successfully the server response with Sample JSON:

```javascript
{
    "session_id": "0000-0000-0000-0000",
    "offset": 31337,
    "expires": "3600"
}
```

#### Codes

Code | Reason
---- | -------------------------------------------------------------------------
202  | Session created.
201  | Chunk Uploaded successful.
200  | All Chunks Uploaded successful.
404  | The session_id does not exist or has expired.
400  | The offset parameter does not match up with what the server expects.
409  | The call failed because a conflict occurred.
500  | Incorrect middleware configuration or unexpected value inside middleware.

## Tests


## Release

[npm-image]: https://img.shields.io/npm/v/koa-pagination.svg?style=flat-square