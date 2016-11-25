var b;
chrome.runtime.getBackgroundPage(function(a) {
    b = a;
    b.getGroups(function(e) {
        groups = e;
        if (groups && groups.length > 0) {
            var h = $("body").find(".add-to-group");
            for (var f = 0; f < groups.length; f++) {
                var d = $("<li />");
                var g = $("<a />");
                g.data("group", groups[f].id);
                g.html(groups[f].title);
                g.appendTo(d);
                d.appendTo(h)
            }
            var c = $("body").height();
            $("html").css("min-height", c);
            $("body").css("min-height", c)
        } else {
            addCurrentPage(0)
        }
    })
});
function addCurrentPage(a) {
    $(".add-to-group").remove();
    $(".create-new-group").remove();

    $("body").removeClass("is-create-new-group");
    $("html").css("min-height", "46px");
    $("body").css("min-height", "46px");
    $("html").css("height", "46px");
    $("body").css("height", "46px");
    $("h1").text("Saving to Speed Dial...").addClass("loading");
    
    setTimeout(function() {
        b.addCurrentPage(a, function() {
            $("h1").text("Page saved!").addClass("success");
            setTimeout(function() {
                self.close()
            }, 1000)
        })
    }, 600)
}
$(function() {

    $(document).on("click", ".add-to-group a", function() {
        addCurrentPage($(this).data("group"))
    });

    //  打开选项页面
    $(document).on("click", "h1 a", function() {
        chrome.tabs.create({
            url: chrome.extension.getURL("options.html"),
            selected: true
        })
    });

    //  增加新的分类
    $(document).on("click", ".js-create-group", function() {
        $("html").css("min-height", "166px");
        $("body").css("min-height", "16px");
        $("html").css("height", "166px");
        $("body").css("height", "166px");

        $("body").addClass("is-create-new-group");
        $("form input").focus()
    });

    //  提交用户输入的新分组
    $(document).on("submit", "form", function(a) {
        a.preventDefault();
        a.stopPropagation();

        group = {
            title: $("form input[type=text]").val(),
            color: "FFFFFF"
        };
        if (!group.title) {
            return
        }

        b.create_group(group, function(c, d) {
            if (d.insertId) {
                addCurrentPage(d.insertId)
            }
        })
    })
});
