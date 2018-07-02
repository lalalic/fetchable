# fetchable
It converts data as fetchable uri  like URL.createObjectURL/revokeObjectURL
## install
```sh
>npm install fetchable
```

## example
```js
import Fetchable from "fetchable"
let fetchable=new Fetchable("test")
let url=fetchable.createObjectURL([1,2,3,4])
fetch(url)
	.then(res=>res.arrayBuffer())
	.then()
fetchable.revokeObjectURL(url)
```