[ascii-ui API documentation](../README.md) > ["Terminal"](../modules/_terminal_.md)

# External module: "Terminal"

## Index

### Classes

* [Terminal](../classes/_terminal_.terminal.md)

### Interfaces

* [CharStyle](../interfaces/_terminal_.charstyle.md)
* [EscapeCommandParams](../interfaces/_terminal_.escapecommandparams.md)
* [ImageCropParams](../interfaces/_terminal_.imagecropparams.md)
* [ImageOffset](../interfaces/_terminal_.imageoffset.md)
* [ImageSize](../interfaces/_terminal_.imagesize.md)
* [ImageTile](../interfaces/_terminal_.imagetile.md)
* [TerminalOptions](../interfaces/_terminal_.terminaloptions.md)
* [TextTile](../interfaces/_terminal_.texttile.md)
* [TilePosition](../interfaces/_terminal_.tileposition.md)
* [TileSize](../interfaces/_terminal_.tilesize.md)
* [ViewPortOptions](../interfaces/_terminal_.viewportoptions.md)

### Type aliases

* [AcceptedImage](_terminal_.md#acceptedimage)
* [EscapeCallback](_terminal_.md#escapecallback)

---

## Type aliases

<a id="acceptedimage"></a>

###  AcceptedImage

**Ƭ AcceptedImage**: * `HTMLImageElement` &#124; `HTMLCanvasElement`
*

*Defined in [Terminal.ts:16](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L16)*

___
<a id="escapecallback"></a>

###  EscapeCallback

**Ƭ EscapeCallback**: *`function`*

*Defined in [Terminal.ts:24](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L24)*

Function called when the matching command is found
*__param__*: The whole text

*__param__*: Position of the matching commmand in the text

*__returns__*: index where the text processing should be continued

#### Type declaration
▸(params: *[EscapeCommandParams](../interfaces/_terminal_.escapecommandparams.md)*): `number`

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | [EscapeCommandParams](../interfaces/_terminal_.escapecommandparams.md) |

**Returns:** `number`

___

