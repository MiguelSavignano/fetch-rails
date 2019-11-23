[fetch-rails](../README.md) › [Globals](../globals.md) › ["fetch-rails"](_fetch_rails_.md)

# External module: "fetch-rails"

## Index

### Interfaces

* [IDefaultOptions](../interfaces/_fetch_rails_.idefaultoptions.md)
* [IJSONOptions](../interfaces/_fetch_rails_.ijsonoptions.md)

### Functions

* [encodeParams](_fetch_rails_.md#const-encodeparams)
* [mergeParameters](_fetch_rails_.md#const-mergeparameters)
* [parseJSON](_fetch_rails_.md#const-parsejson)
* [parseText](_fetch_rails_.md#const-parsetext)

### Object literals

* [Fetch](_fetch_rails_.md#const-fetch)

## Functions

### `Const` encodeParams

▸ **encodeParams**(`a`: any): *any*

*Defined in [fetch-rails.ts:133](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |

**Returns:** *any*

___

### `Const` mergeParameters

▸ **mergeParameters**(`url`: string, `params`: object): *string*

*Defined in [fetch-rails.ts:121](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L121)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | "" |
`params` | object |  {} |

**Returns:** *string*

___

### `Const` parseJSON

▸ **parseJSON**(`response`: any): *any*

*Defined in [fetch-rails.ts:129](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L129)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | any |

**Returns:** *any*

___

### `Const` parseText

▸ **parseText**(`response`: any): *any*

*Defined in [fetch-rails.ts:131](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | any |

**Returns:** *any*

## Object literals

### `Const` Fetch

### ▪ **Fetch**: *object*

*Defined in [fetch-rails.ts:12](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L12)*

###  checkStatus

▸ **checkStatus**(`response`: any): *Promise‹object›*

*Defined in [fetch-rails.ts:41](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | any |

**Returns:** *Promise‹object›*

###  defaultCredentials

▸ **defaultCredentials**(`options`: object): *any*

*Defined in [fetch-rails.ts:39](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L39)*

**Parameters:**

▪`Default value`  **options**: *object*=  { credentials: null }

Name | Type | Default |
------ | ------ | ------ |
`credentials` | null |  null |

**Returns:** *any*

###  defaultHeaders

▸ **defaultHeaders**(`options`: object): *any*

*Defined in [fetch-rails.ts:31](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L31)*

**Parameters:**

▪`Default value`  **options**: *object*=  { headers: null }

Name | Type | Default |
------ | ------ | ------ |
`headers` | null |  null |

**Returns:** *any*

###  defaultHeadersJSON

▸ **defaultHeadersJSON**(`options`: any): *any*

*Defined in [fetch-rails.ts:21](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *any*

###  deleteJSON

▸ **deleteJSON**(`url`: string, `body`: object, `options`: [IJSONOptions](../interfaces/_fetch_rails_.ijsonoptions.md)): *any*

*Defined in [fetch-rails.ts:84](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`body` | object |
`options` | [IJSONOptions](../interfaces/_fetch_rails_.ijsonoptions.md) |

**Returns:** *any*

###  getCSRF

▸ **getCSRF**(): *string*

*Defined in [fetch-rails.ts:13](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L13)*

**Returns:** *string*

###  html

▸ **html**(`url`: string, `params`: object, `options`: [IDefaultOptions](../interfaces/_fetch_rails_.idefaultoptions.md)): *Promise‹Response›*

*Defined in [fetch-rails.ts:87](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`params` | object |
`options` | [IDefaultOptions](../interfaces/_fetch_rails_.idefaultoptions.md) |

**Returns:** *Promise‹Response›*

###  json

▸ **json**(`url`: string, `params`: object, `options`: [IDefaultOptions](../interfaces/_fetch_rails_.idefaultoptions.md)): *Promise‹any›*

*Defined in [fetch-rails.ts:52](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`params` | object |
`options` | [IDefaultOptions](../interfaces/_fetch_rails_.idefaultoptions.md) |

**Returns:** *Promise‹any›*

###  postForm

▸ **postForm**(`url`: string, `form`: any, `options`: object): *Promise‹Response›*

*Defined in [fetch-rails.ts:105](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L105)*

**Parameters:**

▪ **url**: *string*

▪ **form**: *any*

▪ **options**: *object*

Name | Type |
------ | ------ |
`body` | FormData |
`credentials` | any |
`headers` | any |
`method` | any |

**Returns:** *Promise‹Response›*

###  postJSON

▸ **postJSON**(`url`: string, `body`: object, `options`: [IJSONOptions](../interfaces/_fetch_rails_.ijsonoptions.md)): *any*

*Defined in [fetch-rails.ts:78](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`body` | object |
`options` | [IJSONOptions](../interfaces/_fetch_rails_.ijsonoptions.md) |

**Returns:** *any*

###  putJSON

▸ **putJSON**(`url`: string, `body`: object, `options`: [IJSONOptions](../interfaces/_fetch_rails_.ijsonoptions.md)): *any*

*Defined in [fetch-rails.ts:81](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`body` | object |
`options` | [IJSONOptions](../interfaces/_fetch_rails_.ijsonoptions.md) |

**Returns:** *any*

###  requestDataJSON

▸ **requestDataJSON**(`method`: string, `url`: string, `body`: object, `options`: [IJSONOptions](../interfaces/_fetch_rails_.ijsonoptions.md)): *Promise‹any›*

*Defined in [fetch-rails.ts:62](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`url` | string |
`body` | object |
`options` | [IJSONOptions](../interfaces/_fetch_rails_.ijsonoptions.md) |

**Returns:** *Promise‹any›*

###  text

▸ **text**(`url`: string, `options`: [IDefaultOptions](../interfaces/_fetch_rails_.idefaultoptions.md)): *Promise‹any›*

*Defined in [fetch-rails.ts:95](https://github.com/MiguelSavignano/fetch-rails/blob/1184093/src/fetch-rails.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`options` | [IDefaultOptions](../interfaces/_fetch_rails_.idefaultoptions.md) |

**Returns:** *Promise‹any›*
