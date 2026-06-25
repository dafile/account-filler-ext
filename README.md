# 账号填充器（二改版）

浏览器扩展，自动填充网页登录表单。基于原版「账号填充器」CRX 扩展修改。
<img width="626" height="434" alt="image" src="https://github.com/user-attachments/assets/f1cfe278-2969-49bd-a4f2-c3e296794b95" />
<img width="889" height="682" alt="image" src="https://github.com/user-attachments/assets/d2bd32ce-d541-42f2-a0ce-798dccf06fb7" />

## 改动说明

- **Manifest V3**：从 V2 升级到 V3，兼容 Chrome 112+
- **密码粘贴填充**：将 `$(input).val()` 改为模拟 `InputEvent(inputType: 'insertFromPaste')`，Vue 3 / Element Plus / React 等框架可正确识别
- **框架等待机制**：自动填充时轮询检测 Vue `_vei`、React `_valueTracker` 等标记，绑定完成后再填值
- **移除 UTF-8 BOM**：修复 Chrome 报错「无法为脚本加载重叠样式表」

详细修改记录见 [MODIFICATION.md](MODIFICATION.md)。

## 安装

1. 下载或 clone 本仓库
2. Chrome 打开 `chrome://extensions`
3. 开启右上角「开发者模式」
4. 点击「加载已解压的扩展程序」，选择 `extracted` 文件夹

需要 Chrome 112+。

## 使用

1. 点击扩展图标，进入「设置」页面添加账号、密码等信息
2. 打开任意登录页面，扩展会自动匹配并填充
3. 也可点击输入框，从下拉列表手动选择要填充的内容

## 兼容性

| 框架 | 支持 |
|------|------|
| Vue 3 / Element Plus | 支持 |
| Vue 2 | 支持 |
| React | 支持 |
| Angular | 支持 |
| 原生 jQuery / 无框架 | 支持 |
