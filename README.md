自动补全插件尝试
- 以bootstrap样式为基础
- 使用方法：
```javascript
autoCompletion.init({
        triggerBtn: $(''),//触发按钮
        targetEle: $(''),//加载选择列表目标dom
        ajaxLink: '',//请求url
        method: ''//请求方法
});
```
- 目前只适用于我做的那个，请求的参数判断需要进一步完善