const injectScript = (file, node) => {
  const th = document.getElementsByTagName(node)[0];
  const script = document.createElement("script");
  script.setAttribute("src", file);
  return th.appendChild(script);
};

injectScript(chrome.extension.getURL("/embeded-script.js"), "body");
