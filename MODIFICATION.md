# 账号填充器 浏览器扩展 - 二改文档

## 基本信息

- **原扩展名称**：账号填充器（prod-lghcckjapchfkblnapbndlkkoecpakfh）
- **原扩展版本**：Manifest V2, v1.0
- **修改日期**：2026-06-25
- **修改后版本**：Manifest V3, v1.0

---

## 一、修改原由

### 1.1 密码填充不被识别

原扩展使用 jQuery 的 `$(input).val(value)` 直接设置 DOM 元素的 value 属性来填充表单。这种方式在视觉上可以看到输入框有值，但存在以下问题：

- **现代前端框架无法检测值变化**：Vue 3、React、Angular 等框架通过自己的事件系统监听 `input` 事件来同步数据，直接修改 DOM value 不会触发这些事件
- **Element Plus 等 UI 库有额外校验**：Element Plus 的 `el-input` 组件通过 Vue 3 的 `_vei`（Vue Event Invokers）系统管理事件，对事件的 `timeStamp` 有检查逻辑
- **实际影响**：在 Lenovo XCC 等使用 Vue 3 + Element Plus 的页面上，密码虽然视觉上已填入，但点击登录时框架读取的仍是空值，导致登录失败

### 1.2 Manifest V2 已废弃

Chrome 149+ 已不再支持 Manifest V2 扩展，原扩展无法安装。

### 1.3 UTF-8 BOM 导致加载失败

原扩展的多个文件（manifest.json、JS、CSS、HTML）包含 UTF-8 BOM（Byte Order Mark），Chrome 在某些版本中会因此报错「无法为脚本加载重叠样式表」。

---

## 二、修改方法

### 2.1 修复 UTF-8 BOM

遍历扩展目录下所有 `.json`、`.js`、`.css`、`.html` 文件，移除 UTF-8 BOM 头（`\xef\xbb\xbf`）。

**涉及文件**：manifest.json、background.html、options.html、popup.html、xiaoGuo.html、JavaScript.js、background.js、options.js、popup.js、css.css、css2.css、options.css、popup.css

### 2.2 升级 Manifest V2 到 V3

| 项目 | V2 | V3 |
|------|----|----|
| manifest_version | 2 | 3 |
| background | `"scripts": ["js/background.js"]` | `"service_worker": "js/background.js"` |
| browser_action | `"browser_action": {...}` | `"action": {...}` |
| permissions/host | `"permissions": ["storage", "http://*/*", "https://*/*"]` | `"permissions": ["storage"]` + `"host_permissions": [...]` |
| API | `chrome.browserAction.onClicked` | `chrome.action.onClicked` |

### 2.3 密码填充方式改造

新增两个核心函数：

#### `pasteFill(input, value)`

模拟用户粘贴操作，用于下拉列表点击选择密码等用户交互场景（此时框架已就绪）：

```javascript
function pasteFill(input, value) {
    var el = $(input)[0];
    el.focus();
    el.dispatchEvent(new Event('focus', { bubbles: true }));
    var nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, 'value'
    ).set;
    nativeSetter.call(el, value);
    el.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        inputType: 'insertFromPaste',
        data: value
    }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
}
```

**关键点**：
- 使用 `HTMLInputElement.prototype.value` 的原生 setter 设值，绕过 React 等框架的合成事件拦截
- 使用 `InputEvent` 而非普通 `Event('input')`，并指定 `inputType: 'insertFromPaste'`，这是 Vue 3 事件系统能正确处理的事件格式
- Vue 3 的 `_vei` handler 会检查事件的 `timeStamp`，`InputEvent` 能通过这个检查

#### `waitForFrameworkAndFill(input, value, maxWait)`

用于页面加载时的自动填充场景，轮询等待前端框架绑定事件处理器后再填值：

```javascript
function waitForFrameworkAndFill(input, value, maxWait) {
    maxWait = maxWait || 5000;
    var el = $(input)[0];
    var start = Date.now();
    var timer = setInterval(function () {
        var hasFramework = el._vei || el.__vue || el._valueTracker || el.__reactFiber$;
        if (hasFramework || Date.now() - start > maxWait) {
            clearInterval(timer);
            pasteFill(input, value);
        }
    }, 100);
}
```

**关键点**：
- 检测 Vue 3（`_vei`）、Vue 2（`__vue`）、React（`_valueTracker`、`__reactFiber$`）的绑定标记
- 每 100ms 轮询一次，最多等待 5 秒
- 超时后仍会执行填充（兜底，兼容无框架的普通页面）

### 2.4 填充点改动汇总

| 位置 | 场景 | 原代码 | 改为 |
|------|------|--------|------|
| 密码下拉列表点击 | 用户点击选择密码 | `$(input).val(items.keyPwd[index])` | `pasteFill(input, ...)` |
| 自动填充密码（登录页分支1） | 页面加载自动填密码 | `$(this).val(items.keyPwd[0])` | `waitForFrameworkAndFill(this, ...)` |
| 自动填充密码（登录页分支2） | 页面加载自动填密码 | `$(this).val(items.keyPwd[0])` | `waitForFrameworkAndFill(this, ...)` |
| insertLogin 函数 | 自动匹配填用户名等 | `$(input).val(items.keyXxx[0])` | `waitForFrameworkAndFill(input, ...)` |
| insert 函数 | 自动匹配填用户名等 | `$(input).val(items.keyXxx[0])` | `waitForFrameworkAndFill(input, ...)` |

---

## 三、修改结果

### 3.1 测试环境

- **测试页面**：`https://<BMC_IP>/#/login`（Lenovo XClarity Controller，Vue 3 + Element Plus）
- **测试账号**：****** / ******
- **Chrome 版本**：149.0.7827.156

### 3.2 测试结果

| 测试项 | 修改前 | 修改后 |
|--------|--------|--------|
| 密码框视觉填充 | 有值显示 | 有值显示 |
| 框架识别值变化 | 不识别，登录失败 | 正确识别 |
| 自动登录 | 失败 | 成功，自动跳转到 #/home |
| 普通网页（jQuery） | 正常 | 正常（向后兼容） |

### 3.3 兼容性

- **Chrome 112+**：支持 Manifest V3
- **Vue 2 / Vue 3 / React / Angular / jQuery**：通过检测框架标记自适应
- **无框架页面**：超时兜底，5 秒后强制填充

---

## 四、文件清单

```
extracted/
  manifest.json              # MV3 清单
  background.html
  options.html
  popup.html
  xiaoGuo.html
  icon/
    icon.png
    icon128.png
  css/
    css.css
    css2.css
    options.css
    popup.css
  js/
    jquery-1.7.1.min.js
    JavaScript.js            # 核心改动文件
    background.js            # browserAction -> action
    options.js
    popup.js
  images/
    ...
```

核心改动仅 `js/JavaScript.js` 和 `js/background.js`，其余文件仅移除 BOM。
