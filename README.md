# 鱼聊 Fish-chat

![](src-tauri/icons/icon.png)

这是一个闲鱼网页 IM 套壳软件，用来提供操作系统的原生通知功能，并且避免把闲鱼挂在浏览器后台。

## 安装说明

### Windows

下载安装后使用即可

### Linux & MacOS

> 要有 rust 和 nodejs 环境

1. 克隆仓库

```shell
git clone https://github.com/GOKORURI007/xianyu-fish-chat.git --depth 1
```

2. 进入仓库目录

```shell
cd xianyu-fish-chat
npm tauri build
```

3. 从 `src-tauri/target/release` 中获取构建好的软件包

## 使用说明

- 默认呼出 / 隐藏的快捷键为 Ctrl+Alt+Q
- 关闭窗口后自动缩小为系统图标，右键系统图标可彻底退出