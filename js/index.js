/*
 * @Author: 张驰阳
 * @Date:   2016-12-01 17:01:50
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-12-21 18:23:17
 */

'use strict';

function Dude() {
    this.domain = "https://infi000.wilddogio.com";
    this.url_bs = 'https://infi000.wilddogio.com/zhibodude.json';
    this.url_twitter = 'https://infi000.wilddogio.com/zhibodude-twitter.json';
    this.url_ins = 'https://infi000.wilddogio.com/zhibodude-ins.json';
    this.url_line = 'https://infi000.wilddogio.com/zhibodude-line.json';
    this.url_live = "";
    this.url_config = "http://jrstv.net/getSource/app/getjson.php";
    this.url_gamefile = "http://jrstv.net/getSource/app/getfile.php";
    this.invoke = function(_url, _callback) {
        $.ajax({
            url: _url,
            // dataType:"jsonp",
            success: _callback
        })
    };
    this.callback_bs = function(msg) {
        var data = msg;
        var obj = "";
        for (var keys in data) {
            var num = 1;
            var index = data[keys];
            var name = (index.name) ? index.name : "无";
            var msg = index.msg;
            var img = 'http://zhibodude.com/' + index.img;
            var weight = index.weight;
            // obj += "<tr><td>" + keys + "</td>";
            obj += "<tr data-Key='" + keys + "' data-type='bs'><td>" + num + "</td>";
            obj += "<td>" + name + "</td>";
            obj += "<td>" + weight + "</td>";
            obj += "<td>" + msg + "</td>";
            obj += "<td><a href='" + img + "'>" + img + "</a></td>";
            obj += '<td><div class="btn-group"><a class="btn btn-sm btn-default fix">修改</><a class="btn btn-sm btn-default delete">删除</a></div></tr>';
            num++;
        };
        $("#bsList").find("tbody").html(obj);
    };
    this.callback_config = function(msg) {
        var channelsOjb = "";
        var channelsNum = 1;
        for (var key in msg.channels) {
            var index = msg.channels[key];
            var title = index.title;
            var url = index.url;
            var pc_url = index.pc_url;
            channelsOjb += "<tr><td>" + channelsNum + "</td>";
            channelsOjb += "<td>" + title + "</td>";
            channelsOjb += "<td>" + url + "</td>";
            channelsOjb += "<td>" + pc_url + "</td></tr>";
            channelsNum++;
        };
        $("#data-channel").find("tbody").html(channelsOjb);
        var liveObj = "";
        //创建直播线路SELECT元素
        var lineObj="";
        var liveNum = 1;
        for (var key in msg.today) {
            var index = msg.today[key];
            var title = index.title;
            var _url;
            if (index.url !== undefined) {
                _url = "";
                for (var keys in index.url) {
                    _url += "<p><a class='f-break'>" + index.url[keys] + "</a></p>";
                }
            } else {
                _url = "<p>暂无</p>"
            }
            var pc_url = index.pc_url;
            liveObj += "<tr><td>" + liveNum + "</td>";
            liveObj += "<td>" + title + "</td>";
            liveObj += "<td>" + _url + "</td>";
            liveObj += "<td><a class='f-break'>" + pc_url + "</a></td></tr>";
            liveNum++;
            lineObj+='<option value="'+title+'">'+title+'</option>'
        };
        $("#line-title2").html(lineObj);
        $("#data-config").find("tbody").html(liveObj);
    };
    this.callback_twitter = function(msg) {
        var data = msg;
        var obj = "";
        var Num = 1;
        for (var keys in data) {
            var index = data[keys];
            var name = (index.name) ? index.name : "无";
            var msg = index.msg;
            var head = index.head;
            var img = index.img;
            var time = index.time;
            var weight = index.weight;
            // obj += "<tr><td>" + keys + "</td>";
            obj += "<tr data-Key='" + keys + "' data-type='twitter'><td>" + Num + "</td>";
            obj += "<td class='data-twitter-name'>" + name + "</td>";
            obj += "<td class='data-twitter-head' data-img='"+head+"'><img src='http://www.zhibodude.com/" + head + "' width='70'></td>";
            obj += "<td class='data-twitter-weight'>" + weight + "</td>";
            obj += "<td class='data-twitter-msg'>" + msg + "</td>";
            obj += "<td class='data-twitter-time'>" + time + "</td>";
            obj += "<td class='data-twitter-img' data-img='"+img+"'><a href='http://www.zhibodude.com/static/twitterImg/" + img + "'><img src='http://www.zhibodude.com/static/twitterImg/" + img + "' width='100' ></a></td>";
            obj += '<td><div class="btn-group"><a class="btn btn-sm btn-default choose">选中</><a class="btn btn-sm btn-default fix">修改</><a class="btn btn-sm btn-default delete">删除</a></div></tr>';
            Num++;
        };
        $("#twitterList").find("tbody").html(obj);
    };
    this.callback_ins = function(msg) {
        var data = msg;
        var obj = "";
        var Num = 1;
        for (var keys in data) {
            var index = data[keys];
            var name = (index.name) ? index.name : "无";
            var msg = index.msg;
            var img = index.img;
            var weight = index.weight;
            // obj += "<tr><td>" + keys + "</td>";
            obj += "<tr data-Key='" + keys + "' data-type='ins'><td>" + Num + "</td>";
            obj += "<td class='data-ins-name'>" + name + "</td>";
            obj += "<td class='data-ins-weight'>" + weight + "</td>";
            obj += "<td class='data-ins-msg'>" + msg + "</td>";
            obj += "<td class='data-ins-img' data-img='"+img+"'><a href='http://www.zhibodude.com/static/insImg/" + img + "'><img src='http://www.zhibodude.com/static/insImg/" + img + "' width='100' ></a></td>";
            obj += '<td><div class="btn-group"><a class="btn btn-sm btn-default choose">选择</><a class="btn btn-sm btn-default fix">修改</><a class="btn btn-sm btn-default delete">删除</a></div></tr>';
            Num++;
        };
        $("#insList").find("tbody").html(obj);
    };
    this.callback_line = function(msg) {
        var totleData = msg;
        var obj = "";
        var num = 0;
        for (var keys in totleData) {
            var data = totleData[keys];
            for (var key in data) {
                var index = data[key];
                var title = key;
                num++;
                for (var _key in index) {
                    var _index = index[_key];
                    var _name = _index.name;
                    var _type = _index.type;
                    var _weight = _index.weight;
                    var _url = _index.url;
                    obj += "<tr data-key='" + _key + "' data-type='line' data-title='" + title + "' data-date='" + keys + "' '><td>" + num + "</td>";
                    obj += "<td>" + keys + "</td>";
                    obj += "<td class='data-line-title'>" + title + "</td>";
                    obj += "<td class='data-line-name'>" + _name + "</td>";
                    obj += "<td class='data-line-type'>" + _type + "</td>";
                    obj += "<td class='data-line-weight'>" + _weight + "</td>";
                    obj += "<td><span class='f-break data-line-url'>" + _url + "</span></td>";
                    obj += '<td><div class="btn-group"><a class="btn btn-sm btn-default choose">选中</><a class="btn btn-sm btn-default fix">修改</><a class="btn btn-sm btn-default delete">删除</a></td></tr>';

                }
            };
        }
        $("#lineList").find("tbody").html(obj);
    }
};

var wdog = {
    config: {
        authDomain: "infi000.wilddog.com",
        syncURL: "https://infi000.wilddogio.com"
    },
    date: function() {
        var oDate = new Date();
        var year = oDate.getFullYear(); //获取系统的年；
        var month = oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
        var day = oDate.getDate(); // 获取系统日，
        return year + "-" + month + "-" + day
    },
    afterDate: function() {
        var oDate = new Date();
        var year = oDate.getFullYear(); //获取系统的年；
        var month = oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
        var day = oDate.getDate() + 1; // 获取系统日，
        return year + "-" + month + "-" + day
    }
};

wilddog.initializeApp(wdog.config);
wdog.ref = wilddog.sync().ref("/jrstv/");
wdog.ref_bs = wilddog.sync().ref("/zhibodude/");
wdog.ref_twitter = wilddog.sync().ref("/zhibodude-twitter/");
wdog.ref_ins = wilddog.sync().ref("/zhibodude-ins/");
wdog.ref_line = wilddog.sync().ref("/zhibodude-line/");

$(document).ready(function($) {
    //实例化
    var myDude = new Dude();
    // 获取bs数据
    myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)

    // 提交bs数据
    $("#bs-submit").on("click", function() {
        var data = {
            name: $("#bs-name").val(),
            weight: $("#bs-weight").val(),
            img: $("#bs-img").val(),
            msg: $("#bs-msg").val(),
        };
        wdog.ref_bs.push(data, function(err) {
            if (err == null) {
                alert("提交成功");
                myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)
            }
        });
    });

    //更新直播数据至野狗后台
    $("#update-config").on("click", function() {
        myDude.invoke(myDude.url_config, function(msg) {
            wdog.ref.child("config").set(msg, function(err) {
                if (err == null) {
                    alert("伤传成功")
                }
            })
        });
        myDude.invoke(myDude.domain + "/jrstv/config.json", myDude.callback_config);
    });
    $("#update-gamefile").on("click", function() {
        myDude.invoke(myDude.url_gamefile, function(msg) {
            wdog.ref.child("gamefile").set(msg, function(err) {
                if (err == null) {
                    alert("伤传成功")
                }
            })
        });
        myDude.invoke(myDude.domain + "/jrstv/gamefile/data.json", myDude.callback_config);
    });
    // 提交twitter数据
    $("#twitter-submit").on("click", function() {
        var data = {
            name: $("#twitter-name").val(),
            weight: $("#twitter-weight").val(),
            img: $("#twitter-img").val(),
            head: $("#twitter-head").val(),
            time: $("#twitter-time").val(),
            msg: $("#twitter-msg").val(),
        };
        for (var key in data) {
            var index = data[key];
            if (index == "") {
                console.log(key)
                alert("填写完整内容");
                return;
            }
        };
        wdog.ref_twitter.push(data, function(err) {
            if (err == null) {
                alert("提交成功");
                myDude.invoke(myDude.url_twitter + '?orderBy="weight"&limitToLast=1000', myDude.callback_twitter)
            }
        });
    });
    // 提交ins数据
    $("#ins-submit").on("click", function() {
        var data = {
            name: $("#ins-name").val(),
            weight: $("#ins-weight").val(),
            img: $("#ins-img").val(),
            msg: $("#ins-msg").val(),
        };
        for (var key in data) {
            var index = data[key];
            if (index == "") {
                alert("填写完整内容");
                return;
            }
        };
        wdog.ref_ins.push(data, function(err) {
            if (err == null) {
                alert("提交成功");
                myDude.invoke(myDude.url_ins + '?orderBy="weight"&limitToLast=1000', myDude.callback_ins)
            }
        });
    });
    // 提交line数据
    $("#line-submit").on("click", function() {
        var title = $("#line-title").val();
        var date = ($("#line-date").val() == "date") ? wdog.date() : wdog.afterDate();
        var data = {
            name: $("#line-name").val(),
            weight: $("#line-weight").val(),
            url: $("#line-url").val(),
            type: $("#line-type").val(),
        };
        for (var key in data) {
            var index = data[key];
            if (index == "") {
                alert("填写完整内容");
                return;
            }
        };
        wdog.ref_line.child("/" + date + "/" + title).push(data, function(err) {
            if (err == null) {
                alert("提交成功");
                myDude.invoke(myDude.url_line, myDude.callback_line)
            }
        });
    });
    // 切换展示界面
    $("#getData").on("click", function() {
        $(".mainBox").hide();
        $("#data-main").show();
        $(this).closest('ul').find("li").removeClass();
        $(this).closest('li').addClass('active');
        myDude.invoke(myDude.domain + "/jrstv/gamefile/data.json", myDude.callback_config);
    });
    $("#getBs").on("click", function() {
        $(".mainBox").hide();
        $("#bs-main").show();
        $(this).closest('ul').find("li").removeClass();
        $(this).closest('li').addClass('active');
        myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)
    });
    $("#getTwitter").on("click", function() {
        $(".mainBox").hide();
        $("#twitter-main").show();
        $(this).closest('ul').find("li").removeClass();
        $(this).closest('li').addClass('active');
        myDude.invoke(myDude.url_twitter + '?orderBy="weight"&limitToLast=1000', myDude.callback_twitter)
    });
    $("#getIns").on("click", function() {
        $(".mainBox").hide();
        $("#ins-main").show();
        $(this).closest('ul').find("li").removeClass();
        $(this).closest('li').addClass('active');
        myDude.invoke(myDude.url_ins + '?orderBy="weight"&limitToLast=1000', myDude.callback_ins)

    });
    $("#getLine").on("click", function() {
            $(".mainBox").hide();
            $("#line-main").show();
            $(this).closest('ul').find("li").removeClass();
            $(this).closest('li').addClass('active');
            myDude.invoke(myDude.url_line, myDude.callback_line)

        })
        //删除数据
    $(document).on("click", ".delete", function() {
        var type = $(this).closest('tr').attr("data-type");
        var node = $(this).closest('tr').attr("data-Key");
        var cf = confirm("确认删除？");
        if (cf == true) {
            if (type == "bs") {
                wdog.ref_bs.child("/" + node).set(null, function(err) {
                    if (err == null) {
                        alert("删除成功");
                        myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)
                    }
                })
            } else if (type == "twitter") {
                wdog.ref_twitter.child("/" + node).set(null, function(err) {
                    if (err == null) {
                        alert("删除成功");
                        myDude.invoke(myDude.url_twitter + '?orderBy="weight"&limitToLast=1000', myDude.callback_twitter)
                    }
                })
            } else if (type == "ins") {
                wdog.ref_ins.child("/" + node).set(null, function(err) {
                    if (err == null) {
                        alert("删除成功");
                        myDude.invoke(myDude.url_ins + '?orderBy="weight"&limitToLast=1000', myDude.callback_ins)
                    }
                })
            } else if (type == "line") {
                var title = $(this).closest('tr').attr("data-title");
                var date = $(this).closest('tr').attr("data-date");
                wdog.ref_line.child("/" + date + "/" + title + "/" + node).set(null, function(err) {
                    if (err == null) {
                        alert("删除成功");
                        myDude.invoke(myDude.url_line, myDude.callback_line)
                    }
                })
            }
        } else {
            return;
        }

    });
    //修改数据
    $(document).on("click", ".fix", function() {
        var type = $(this).closest('tr').attr("data-type");
        var node = $(this).closest('tr').attr("data-Key");
        var cf = confirm("确认修改？");
        if (cf == true) {
            if (type == "bs") {
                var data = {
                    name: $("#bs-name").val(),
                    weight: $("#bs-weight").val(),
                    img: $("#bs-img").val(),
                    msg: $("#bs-msg").val(),
                };
                wdog.ref_bs.child("/" + node).set(data, function(err) {
                    if (err == null) {
                        alert("修改成功");
                        myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)
                    }
                });
            } else if (type == "twitter") {
                var data = {
                    name: $("#twitter-name").val(),
                    weight: $("#twitter-weight").val(),
                    img: $("#twitter-img").val(),
                    head: $("#twitter-head").val(),
                    time: $("#twitter-time").val(),
                    msg: $("#twitter-msg").val(),
                };
                for (var key in data) {
                    var index = data[key];
                    if (index == "") {
                        console.log(key)
                        alert("填写完整内容");
                        return;
                    }
                };
                wdog.ref_twitter.child("/" + node).set(data, function(err) {
                    if (err == null) {
                        alert("修改成功");
                        myDude.invoke(myDude.url_twitter + '?orderBy="weight"&limitToLast=1000', myDude.callback_twitter)
                    }
                });
            } else if (type == "ins") {
                var data = {
                    name: $("#ins-name").val(),
                    weight: $("#ins-weight").val(),
                    img: $("#ins-img").val(),
                    msg: $("#ins-msg").val(),
                };
                for (var key in data) {
                    var index = data[key];
                    if (index == "") {
                        console.log(key)
                        alert("填写完整内容");
                        return;
                    }
                };
                wdog.ref_ins.child("/" + node).set(data, function(err) {
                    if (err == null) {
                        alert("修改成功");
                        myDude.invoke(myDude.url_ins + '?orderBy="weight"&limitToLast=1000', myDude.callback_ins)
                    }
                });
            } else if (type == "line") {
                var _date = ($("#line-date").val() == "date") ? wdog.date() : wdog.afterDate();
                var data = {
                    name: $("#line-name").val(),
                    weight: $("#line-weight").val(),
                    title: $("#line-title").val(),
                    url: $("#line-url").val(),
                    type: $("#line-type").val(),
                    date: _date
                };
                for (var key in data) {
                    var index = data[key];
                    if (index == "") {
                        console.log(key)
                        alert("填写完整内容");
                        return;
                    }
                };
                wdog.ref_line.child("/" + data.date + "/" + data.title + "/" + node).set(data, function(err) {
                    if (err == null) {
                        alert("修改成功");
                        myDude.invoke(myDude.url_line, myDude.callback_line)
                    }
                });
            }
        } else {
            return;
        }
    });
    //选中条目
    $(document).on("click", ".choose", function() {
        var type = $(this).closest('tr').attr("data-type");
        var node = $(this).closest('tr').attr("data-Key");
        var title = $(this).closest('tr').attr("data-title")
        if (type == "line") {
            var tr = $(this).closest('tr');
            $("#line-title").val(title);
            $("#line-name").val(tr.find(".data-line-name").html());
            $("#line-type").val(tr.find(".data-line-type").html());
            $("#line-weight").val(tr.find(".data-line-weight").html());
            $("#line-url").val(tr.find(".data-line-url").html());
        }else if(type=="twitter"){
            var tr=$(this).closest('tr');
            $("#twitter-name").val(tr.find(".data-twitter-name").html());
            $("#twitter-head").val(tr.find(".data-twitter-head").attr("data-img"));
            $("#twitter-weight").val(tr.find(".data-twitter-weight").html());
            $("#twitter-time").val(tr.find(".data-twitter-time").html());
            $("#twitter-msg").val(tr.find(".data-twitter-msg").html());
            $("#twitter-img").val(tr.find(".data-twitter-img").attr("data-img"));
        }else if(type=="ins"){
             var tr=$(this).closest('tr');
               $("#ins-name").val(tr.find(".data-ins-name").html());
               $("#ins-weight").val(tr.find(".data-ins-weight").html());
               $("#ins-msg").val(tr.find(".data-ins-msg").html());
               $("#ins-img").val(tr.find(".data-ins-img").attr("data-img"));
        }
    });
    //选择对阵队伍
    $(document).on("change","#line-title2",function(){
        var title=$(this).val();
        $("#line-title").val(title);
    });

});
