/**
 *
 *  前端埋点实现
 * 
 */

document.body.addEventListener('click',  (event) => {
    debugger;
    const eventFix = getDomPath(event.target);
    // if (!eventFix) {
    //     return;
    // }
    // this._handleEvent(eventFix);
}, false)



const getDomPath = (element, useClass = false) => {
    if (!(element instanceof HTMLElement)) {
        console.warn('input is not a HTML element!');
        return '';
    }
    let domPath = [];
    let elem = element;
    while (elem) {
        let domDesc = getDomDesc(elem, useClass);
        if (!domDesc) {
            break;
        }
        domPath.unshift(domDesc);
        if (querySelector(domPath.join('>')) === element || domDesc.indexOf('body') >= 0) {
            break;
        }
        domPath.shift();
        const children = elem.parentNode.children;
        if (children.length > 1) {
            for (let i = 0; i < children.length; i++) {
                if (children[i] === elem) {
                    domDesc += `:nth-child(${i + 1})`;
                    break;
                }
            }
        }
        domPath.unshift(domDesc);
        if (querySelector(domPath.join('>')) === element) {
            break;
        }
        elem = elem.parentNode;
    }
    return domPath.join('>');
}

_handleEvent(event) {
    const domPath = getDomPath(event.target);
    const rect = getBoundingClientRect(event.target);
    if (rect.width == 0 || rect.height == 0) {
        return;
    }
    let t = document.documentElement || document.body.parentNode;
    const scrollX = (t && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft;
    const scrollY = (t && typeof t.scrollTop == 'number' ? t : document.body).scrollTop;
    const pageX = event.pageX || event.clientX + scrollX;
    const pageY = event.pageY || event.clientY + scrollY;
    const data = {
        domPath: encodeURIComponent(domPath),
        trackingType: event.type,
        offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
        offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6),
    };
    this.send(data);
}


