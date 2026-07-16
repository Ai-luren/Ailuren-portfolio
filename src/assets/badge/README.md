# 工牌可替换素材

工牌正反面通过 `card.glb` 的 UV 图集贴入；替换后运行 `npm run build`，浏览器会得到带新哈希的素材地址。

| 文件 | 用途 | 当前尺寸 |
| --- | --- | --- |
| `badge-front-black-card.jpg` | 工牌正面贴图 | 946 × 1320 px |
| `badge-back-black-card.jpg` | 工牌背面贴图 | 946 × 1320 px |
| `lanyard.jpg` | 挂绳循环纹理 | 1025 × 250 px |

正反面应保持相同竖版比例。组件使用 `contain` 保留图片比例，并用近黑底填充模型图集中的余量，避免白边和拉伸。

`src/components/Lanyard/card.glb` 是卡体、圆环与夹扣模型。除非要整体更换工牌形状，否则不要替换它。
