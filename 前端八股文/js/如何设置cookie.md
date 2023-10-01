通过控制台（Console）修改：

在开发者工具中转到“Console”选项卡，您可以运行JavaScript代码来修改cookie和localStorage。例如：

修改或添加cookie：
`document.cookie = 'key=value; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/';`

删除cookie：
`document.cookie = 'key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';`

修改或添加localStorage条目：
`localStorage.setItem('key', 'value');`

删除localStorage条目：
`localStorage.removeItem('key');`
