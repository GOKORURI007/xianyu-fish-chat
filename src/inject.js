const {invoke} = window.__TAURI__.core;

const notify = async (title, body) => {
  await invoke('send_notification', {
    params: {
      title: title,
      body: body
    }
  });
};

const rust_print = (msg) => {
  invoke('rust_print', {msg: `✅ ${msg}`})
}

const flash_window = () => {
  invoke("flash_window")
}

rust_print("✅ 前端收到页面加载事件");

// 1. 获取要监听的目标节点
let convList = document.querySelector("#conv-list-scrollable");
let msgList = document.querySelector("#msg-list-container");

// 2. 定义回调函数，接收 mutation 记录列表
const callback_conv = (mutationsList, _observer) => {
  if (document.hasFocus()) return;
  for (const mutation of mutationsList) {
    // 只关注子节点列表的变动
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log('新增元素：', node);
          // 最外层的 conv 元素
          if (node.classList[0]) {
            if (node.classList[0].match("conversation-item--.+") || node.tagName === "SUP") {
              node.click();
            }
          }
        }
      });
    }
  }
};

const callback_msg = (mutationsList, _observer) => {
  if (document.hasFocus()) return;
  for (const mutation of mutationsList) {
    // 只关注子节点列表的变动
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log('新增元素：', node);
          // notify(`${node.class}`)
          // 在这里可以做更进一步的处理，比如绑定事件、样式调整等

          if (node.parentElement.classList[0]?.match("ant-list-items")) {
            console.log("parent match(ant-list-items)");
            let msg = node.querySelector("span")?.textContent;
            let id = document.querySelector("#content span[class^='text1--']")?.textContent
            notify(` 来自 ${id} 的新消息 `, msg).then();
            rust_print(` 来自 ${id} 的新消息 ${msg}`)
          } else if (node.classList[0]?.match("ant-list-items")) {
            console.log("match(ant-list-items)");
            let new_msg_block = node.lastChild;
            let msg = new_msg_block.querySelector("span")?.textContent;
            let id = document.querySelector("#content span[class^='text1--']")?.textContent
            notify(` 来自 ${id} 的新消息 `, msg).then();
            rust_print(` 来自 ${id} 的新消息 ${msg}`)
          }
        }
      });
    }
  }
};

// 判断全局变量是否已存在
function hasGlobalVar(name) {
  return Object.prototype.hasOwnProperty.call(window, name);
}

// 创建并挂载业务级 Observer
function initObservers(element) {
  console.log(`initObservers ${element.id}`);

  // 构建动态全局属性名
  const observerKey = `${element.id}_observer`;
  if (hasGlobalVar(observerKey)) return;

  // 在 window 上创建新的 MutationObserver
  window[observerKey] = new MutationObserver(element.id === "conv-list-scrollable" ? callback_conv : callback_msg);

  // 挂载 DOM 变动监听
  window[observerKey].observe(element, {
    childList: true,
    subtree: true
  });
}


// 轮询：监控整个文档子树变化
const intervalId = setInterval(() => {
  console.log("轮询...")
  convList = document.querySelector('#conv-list-scrollable');
  msgList = document.querySelector('#msg-list-container');

  if (convList) {
    initObservers(convList)
    convList.querySelector(".rc-virtual-list-holder-inner").firstChild.click()
  }
  if (msgList) initObservers(msgList);

  // 两个都初始化完毕后停止轮询
  if (convList && msgList) {
    rust_print('Elements found, clearing poll');
    clearInterval(intervalId);
  }
}, 1000);


(function () {
  // 1. 统一日志
  function handleMediaEvent(type, el) {
    rust_print(`[BeepDetected] ${type}`)
    if (!document.hasFocus()) {
      flash_window();
    }
    console.log(`[BeepDetected] ${type}`, {
      tag: el.tagName.toLowerCase(),
      src: el.currentSrc || el.src,
      volume: el.volume
    });
  }

  // 6. 核心：拦截 play()
  const origPlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...args) {
    handleMediaEvent('play', this);
    return origPlay.apply(this, args);
  };
})();