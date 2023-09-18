document.addEventListener('DOMContentLoaded', function() {
    var injectButton = document.getElementById('injectButton');
    injectButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: `(${contentScript})();`}
            );
        });
    });
});

function contentScript() {
    'use strict';

    let body = document.getElementsByTagName('body')[0];
    body.innerHTML = body.innerHTML.replaceAll('blur', '');

    let style = document.createElement('style');
    style.innerHTML = '*, div, div *, .disable-blur, .disable-blur * { filter: blur(0) !important; -webkit-filter: blur(0) !important; }';

    let head = document.getElementsByTagName('head')[0];
    head.appendChild(style);

    let divs = document.getElementsByTagName('div');
    for (let i in divs) {
        if (divs[i].classList) {
            divs[i].classList.add('disable-blur');
            if (divs[i].className.includes('banner')) {
                divs[i].remove();
            }
        }
    }
}
