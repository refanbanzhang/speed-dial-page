(function(){
    $(function(){
        const STORAGE_KEY = 'bookmark';

        function MyMark(){
            this.items = [];
            this.$mark = $('.mark');

            this.init();
        }

        MyMark.prototype = {
            init: function(){
                this.events();
                this.fetch();
            }, events: function(){
                var that = this;

                onfire.on('reset', function(items){
                    for(var i = 0; i < items.length; i++){
                        that.render(items[i]);
                    }
                });

                onfire.on('addOne', function(item){
                    that.render(item);
                });

                onfire.on('change', function(items){
                    that.save(items);
                });

                onfire.on('removeOne', function(id){
                    var $elem = that.$mark.find('.mark__item[data-id='+ id +']');
                    $elem.fadeOut(500);
                    setTimeout(function(){
                        $elem.remove();
                    }, 500);
                }); 
            }, fetch: function(){
                var that = this;
                onfire.on('initPage', function(item){
                    that.items.push(item);

                });

                onfire.on('initComplete', function(){
                    onfire.fire('reset', that.items);
                });
   
                
            }, save: function(items){
                localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            }, addNewItem: function(item){
                item.id = this.items.length + 1;

                this.items.push(item);
                onfire.fire('change', this.items);
                onfire.fire('addOne', item);
            }, removeItem: function(id){
                var that = this;
        
                //  从数据中找出需要删除的项目
                $.each(this.items, function(index, item) {
                    if(item.id === id){
                        var _index = that.items.indexOf(item);

                        that.items.splice(_index, 1);
                        return false;
                    }
                });

                onfire.fire('removeOne', id);
                onfire.fire('change', this.items);
            }, editItem: function(id){
                var that = this;

                //  从数据中找出需要删除的项目
                $.each(this.items, function(index, item) {
                    if(item.id === id){
                        var _index = that.items.indexOf(item);

                        that.items.splice(_index, 1);
                        return false;
                    }
                });
            }, render: function(item){
                var itemStr = `<a href="` + item.url + `"><div class="mark__item" data-id="` + item.id + `">
                                    <div class="mark__content">
                                        <div class="mark__photo"><img src="` + item.photo + `"></div>
                                        <div class="mark__title">` + item.title + `</div>
                                        <!-- <div class="mark__detail">detail</div> -->
                                    </div>
                               </div></a>`;

                this.$mark.append(itemStr);
            }
        };

        var myMark = new MyMark();

    

        function displayItemMenu(id, pos){
            var winWidth = $(window).width();
            var leftX    = $('#mousemenu').width() + pos.x;

            //  溢出右边界
            if(leftX > winWidth){
                $('#mousemenu').css({
                    left: 'auto',
                    right: winWidth - pos.x,
                    top: pos.y
                });
            }else{
                $('#mousemenu').css({
                    left: pos.x,
                    top: pos.y + 1
                });
            }

            $('#mousemenu').hide().fadeIn(80);
        }

        //  阻止其他位置的右键事件
        $(document).contextmenu(function(){
            return false;
        });

        $(document).delegate('.mark__item', 'contextmenu', function(event){
            var id, pos, $targetElem;

            $targetElem = ($(event.target).parents('.mark__item'));
            if(!$targetElem.length){return;}

            id  = parseInt($targetElem.attr('data-id'));
            pos = {x: event.pageX, y: event.pageY};

            displayItemMenu(id, pos);

            //  右键单个项目弹出菜单的事件绑定
            $('#mousemenu').delegate('.mousemenu__item--destroy', 'click', function(event){
                myMark.removeItem(id);
                $('#mousemenu').off('click');
            });

            $('#mousemenu').delegate('.mousemenu__item--edit', 'click', function(event){
                myMark.editItem(id);
                $('#mask').fadeIn();
                $('#mousemenu').off('click');
            });

            $('#mousemenu').delegate('.mousemenu__item--refresh', 'click', function(event){
                $('#mousemenu').off('click');
                
                console.log(id);
            });
            
            return false;
        });

        //  点击非项目区域隐藏菜单
        $(document).click(function(event){
            var $target = $(event.target);

            var $mousemenu = $target.parents('#mousemenu');
            var $markItem = $target.parents('.mark__item')
            
            if($mousemenu.length){
                //  如果点击的是菜单项
                $('#mousemenu').hide();
                return;
            }else if($markItem.length){
                //  如果点击的是书签项
                $('#mousemenu').hide();
                return;
            }

            $('#mousemenu').hide();
            return false;
        });

        $('.mask__close').click(function(){
            $('#mask').fadeOut();
        });
    });
})();





// var b;
// chrome.runtime.getBackgroundPage(function(a) {
//     b = a;
//     b.getGroups(function(e) {
//         groups = e;
//         if (groups && groups.length > 0) {
//             var h = $("body").find(".add-to-group");
//             for (var f = 0; f < groups.length; f++) {
//                 var d = $("<li />");
//                 var g = $("<a />");
//                 g.data("group", groups[f].id);
//                 g.html(groups[f].title);
//                 g.appendTo(d);
//                 d.appendTo(h)
//             }
//             var c = $("body").height();
//             $("html").css("min-height", c);
//             $("body").css("min-height", c)
//         } else {
//             addCurrentPage(0)
//         }
//     })
// });
// function addCurrentPage(a) {
//     $(".add-to-group").remove();
//     $(".create-new-group").remove();
//     $("body").removeClass("is-create-new-group");
//     $("html").css("min-height", "46px");
//     $("body").css("min-height", "46px");
//     $("html").css("height", "46px");
//     $("body").css("height", "46px");
//     $("h1").text("Saving to Speed Dial...").addClass("loading");
//     setTimeout(function() {
//         b.addCurrentPage(a, function() {
//             $("h1").text("Page saved!").addClass("success");
//             setTimeout(function() {
//                 self.close()
//             }, 1000)
//         })
//     }, 600)
// }
// $(function() {

    
//     $(document).on("click", ".add-to-group a", function() {
//         addCurrentPage($(this).data("group"))
//     });
//     $(document).on("click", "h1 a", function() {
//         chrome.tabs.create({
//             url: chrome.extension.getURL("options.html"),
//             selected: true
//         })
//     });
//     $(document).on("click", ".js-create-group", function() {
//         $("html").css("min-height", "166px");
//         $("body").css("min-height", "16px");
//         $("html").css("height", "166px");
//         $("body").css("height", "166px");
//         $("body").addClass("is-create-new-group");
//         $("form input").focus()
//     });
//     $(document).on("submit", "form", function(a) {
//         a.preventDefault();
//         a.stopPropagation();
//         group = {
//             title: $("form input[type=text]").val(),
//             color: "FFFFFF"
//         };
//         if (!group.title) {
//             return
//         }
//         b.create_group(group, function(c, d) {
//             if (d.insertId) {
//                 addCurrentPage(d.insertId)
//             }
//         })
//     })
// });
