$(".sandbox").hide();
$(".sandbox:first").show();
$("section").on("click", "h5", function() {
    $(this).closest("section").siblings().find(".sandbox").slideUp(200);
    $(this).next().slideToggle(200);
});

/* vanilla js */

function addEvent(node, type, handler) {
    if (!node) return false;
    if (node.addEventListener) {
        node.addEventListener(type, handler, false);
        return true;
    } else if (node.attachEvent) {
        node.attachEvent('on' + type, handler);
        return true;
    }
    return false;
}

function findItemInArray(array, item) {
    if (arguments.length < 2 || !(array instanceof Array)) {
        console.log("An array and an item is needed.");
        return -1;
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return i;
        }
    }
    return -1;
}

function addClass(el, cls) {
    var str = el.className;
    if (str.search(cls) !== -1) {
        return false;
    } else {
        if (str === "") {
            el.className = str.concat(cls);
        } else {
            var tmp = el.className.split(" ");
            tmp.push(cls);
            el.className = tmp.join(" ");
        }
    }
}

function removeClass(el, cls) {
    var str = el.className;
    if (str.search(cls) === -1) {
        return false;
    } else {
        var tmp = el.className.split(" ");
        var location = findItemInArray(tmp, cls);
        tmp.splice(location, 1);
        el.className = tmp.join(" ");
    }
}

/* Tab 切换 */

var tabList = document.getElementById("tabs");
var tabListItem = tabList.getElementsByTagName("li");

var contentArea = document.getElementById("tab-content");
var contentAreaItem = contentArea.getElementsByTagName("p");

for (var i = 0; i < tabListItem.length; i++) {
    addEvent(tabListItem[i], "click", function() {
        var children = this.parentNode.children;
        var index;
        for (var j = 0; j < children.length; j++) {
            removeClass(children[j], "active");
            removeClass(contentAreaItem[j], "active");
            //获取当前节点在“数组”中的下标，以备contentArea中添加"active"用
            if (children[j] === this){
                index = j;
            }
        }
        addClass(this, "active");
        //对应项加"active"
        addClass(contentAreaItem[index], "active");
    });
}

/* Modal Box */

function showPanel() {
    panel.style.display = "block";
}
function hidePanel() {
    panel.style.display = "none";
}

var modal = document.getElementById("modal");
var controller = modal.getElementsByTagName("input")[0];
var panel = modal.querySelector(".panel");
var close = panel.querySelector(".close");
var cover = panel.querySelector(".cover");
var cancel = panel.querySelector(".cancel");
var submit = panel.querySelector(".submit");

submit.onclick = function (e) {
    e.preventDefault();
};

addEvent(controller, "click", showPanel);
addEvent(cover, "click", hidePanel);
addEvent(close, "click", hidePanel);
addEvent(cancel, "click", function(e) {
    e.preventDefault();
    hidePanel();
});