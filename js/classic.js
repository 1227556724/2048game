//保存数据
let board;
//得分
let score;

function getScore(score) {
    $(".header .start-in .fen").html(score);
}

//开始新游戏
$(function () {
    board = new Array();
    score = 0;
    getScore(score);
    //新游戏页面设置
    newGame();
})
// 新游戏
function newGame() {
    //初始化页面
    init();
    //得到两个随机的数字
    getOneNum();
    getOneNum();
}
//初始化页面
function init() {
    // 初始化布局
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("#grid-pos-" + i + "-" + j).css({
                "left": toLeft(i, j),
                "top": toTop(i, j)
            })
        }
    }
    // 初始化数据
    // 在board中存入每一行的数据，每一行的数据需要保存在一个数组中，所以先通过一个循环将每一一个元素变成数组
    for (let i = 0; i < 4; i++) {
        board[i] = new Array();
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    //更新数据
    updateBoard();
}

function toLeft(i, j) {
    let zuo = 0.42 + 1.6 * j + "rem";
    return zuo;
}

function toTop(i, j) {
    let shang = 0.36 + 1.6 * i + "rem";
    return shang;
}

function updateBoard() {
    //在每一次进行页面重新渲染的时候将前面添加的num-cell元素都清除掉，防止重复的判断，重复循环
    $(".num-cell").remove();
    //通过for循环创建新的元素用来模拟grid的运动。创建的元素类名为num-cell 
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $(".gird-container").append(`<div class="num-cell" id="num-cell-${i}-${j}"></div>`);
            if (board[i][j] == 0) {
                $("#num-cell-" + i + "-" + j).css({
                    left: 0.42 + 1.6 * j + 0.64 + "rem",
                    top: 0.36 + 1.6 * i + 0.64 + "rem",
                    width: 0,
                    height: 0
                })
            } else {
                $("#num-cell-" + i + "-" + j).css({
                    left: toLeft(i, j),
                    top: toTop(i, j),
                    width: 1.28 + "rem",
                    height: 1.28 + "rem",
                    backgroundImage: "url(img/" + bgImg(board[i][j]) + ".png)",
                }).text(board[i][j])
            }
        }
    }
}
//不同的数据显示不同的背景颜色
function bgImg(num) {
    switch (num) {
        case 2:
            return "绿色_底";
            break;
        case 4:
            return "浅蓝色_底";
            break;
        case 8:
            return "红色_底";
            break;
        case 16:
            return "黄色_底";
            break;
        case 32:
            return "紫色_底";
            break;
        case 64:
            return "深蓝色_底";
            break;
        case 128:
            return "草绿色_底";
            break;
        case 256:
            return "橙色_底";
            break;
        case 512:
            return "深紫色_底";
            break;
        case 1024:
            return "浅黄色_底";
            break;
        case 2048:
            return "桃红色_底";
            break;
    }
    // return "#fff";
}

//生成一个随机位置的数字
// 先判断能不能生成数字
// 判断是否空间生成新的数字。只需要判断数据中是否还有0的数据，有返false
//需要判断生成的随机位置能不能放数据
function getOneNum() {
    if (noSpace()) {
        return false;
    }
    //判断
    let randI = parseInt(Math.floor(Math.random() * 4));
    let randJ = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randI][randJ] == 0) {
            break;
        } else {
            randI = parseInt(Math.floor(Math.random() * 4));
            randJ = parseInt(Math.floor(Math.random() * 4));
        }
    }
    //获取随机数2或4
    let num = Math.random() < 0.5 ? 2 : 4;
    //赋值
    board[randI][randJ] = num;
    initNum(randI, randJ, num);
    return true;
}

//判断是否有空间放数据，有返回false,没有返回true
function noSpace() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}


function initNum(i, j, num) {
    let ele = $("#num-cell-" + i + "-" + j);
    ele.css({
        backgroundImage: "url(img/" + bgImg(board[i][j]) + ".png)",
    }).text(num);
    ele.animate({
        width: "1.28rem",
        height: "1.28rem",
        left: toLeft(i, j),
        top: toTop(i, j),

    }, 200)
}


// // 监听键盘按下的事件， 监听整个文档
// $(document).keydown(function (e) {
//     //e.keyCode键盘码：左37  上38  右39  下40 
//     switch (e.keyCode) {
//         // 键盘按下  通过键盘点击上下左右按钮去做不同的响应
//         case 37:
//             if (moveLeft()) {     // 向左滑动

//                 setTimeout(getOneNum, 200);
//             };
//             break;
//         case 38:
//             if (moveUp()) {
//                 setTimeout(getOneNum, 200);
//             };
//             break;
//         case 39:
//             if (moveRight()) {
//                 setTimeout(getOneNum, 200);
//             };
//             break;
//         case 40:
//             if (moveDown()) {
//                 setTimeout(getOneNum, 200);
//             };
//             break;
//     }
// })

//触摸事件
let startX, startY, endX, endY;
$(".gird-container").on("touchstart", function (e) {
    // console.log(e);
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;
})
$(".gird-container").on("touchend", function (e) {
    // console.log(e)
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    let level = endX - startX;
    let vertical = endY - startY;
    // console.log(vertical)
    console.log(level);
    console.log(vertical)
    if (Math.abs(level) > Math.abs(vertical) && level < 0 && Math.abs(level) > 20) {
        if (moveLeft()) { // 向左滑动
            getScore(score);
            setTimeout(getOneNum, 200);
        };
    } else if (Math.abs(level) > Math.abs(vertical) && level > 0 && Math.abs(level) > 20) {
        if (moveRight()) {
            getScore(score);
            setTimeout(getOneNum, 200);
        };
    } else if (Math.abs(level) < Math.abs(vertical) && vertical < 0 && Math.abs(vertical) > 20) {
        if (moveUp()) {
            getScore(score);
            setTimeout(getOneNum, 200);
        };
    } else if (Math.abs(level) < Math.abs(vertical) && vertical > 0 && Math.abs(vertical) > 20) {
        if (moveDown()) {
            getScore(score);
            setTimeout(getOneNum, 200);
        };
    }
})

// 1. 向左移动
function moveLeft() {
    // 判断能不能向左移动
    if (!canMoveLeft(board)) {
        return false;
    }
    //向左移动，通过循环遍历将每一个数字都向左移动

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            //找到当前位置i,j   只要数字不为零，就可能向左移动 
            if (board[i][j] != 0) {
                for (let k = 0; k < j; k++) {
                    //找目标位置i,k
                    if (board[i][k] == 0 && noBlockX(i, k, j, board)) {
                        //动画 数据的更新  完成之后跳出本次循环
                        // 移位置
                        moveAnimation(i, j, i, k);
                        // 更新数据
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockX(i, k, j, board)) {
                        // 移位置
                        moveAnimation(i, j, i, k);
                        // 更新数据
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoard, 200)
    return true;
}
// 判断能不能向左移动
function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                return true;
            }
        }
    }
    return false;
}
//判断当前位置与目标位置之间是否有阻碍。有返回false，没有返回true
function noBlockX(row, col1, col2, board) {
    for (let a = col1 + 1; a < col2; a++) {
        if (board[row][a] != 0)
            return false;
    }
    return true;
}
//移动时的动画效果
function moveAnimation(fromI, fromJ, toI, toJ) {
    $("#num-cell-" + fromI + "-" + fromJ).animate({
        left: toLeft(toI, toJ),
        top: toTop(toI, toJ)
    }, 200)
}
// 3. 向右移动
function moveRight() {
    //判断是否可以向右移动
    if (!canMoveRight(board))
        return false;
    //如果可以向右移动，要循环遍历每一个元素进行移动
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            //找到当前位置
            if (board[i][j] != 0) {
                for (let k = 3; k > j; k--) {
                    //找到目标位置（为空），俩位置之间没有阻碍
                    if (board[i][k] == 0 && noBlockX(i, j, k, board)) {
                        moveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //找到目标位置（值相等），俩位置之间没有阻碍
                    else if (board[i][k] == board[i][j] && noBlockX(i, j, k, board)) {
                        moveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoard, 200);
    return true;
}

function canMoveRight(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
                return true;
        }
    }
    return false;
}

//2. 向上移动
function moveUp() {
    //判断是否可以向上移动
    if (!canMoveUp(board))
        return false;
    //如果可以向上移动，要循环遍历每一个元素进行移动
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            //找到当前位置
            if (board[i][j] != 0) {
                for (let k = 0; k < i; k++) {
                    //找到目标位置（为空），俩位置之间没有阻碍
                    if (board[k][j] == 0 && noBlockY(k, i, j, board)) {
                        moveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //找到目标位置（值相等），俩位置之间没有阻碍
                    else if (board[k][j] == board[i][j] && noBlockY(k, i, j, board)) {
                        moveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoard, 200);
    return true;
}

function canMoveUp(board) {
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                return true;
        }
    }
    return false;
}

function noBlockY(row1, row2, col, board) {
    for (let a = row1 + 1; a < row2; a++) {
        if (board[a][col] != 0)
            return false;
    }
    return true;
}



// 4. 向下移动
function moveDown() {
    //判断是否可以向下移动
    if (!canMoveDown(board))
        return false;
    //如果可以向下移动，要循环遍历每一个元素进行移动
    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            //找到当前位置
            if (board[i][j] != 0) {
                for (let k = 3; k > i; k--) {
                    //找到目标位置（为空），俩位置之间没有阻碍
                    if (board[k][j] == 0 && noBlockY(i, k, j, board)) {
                        moveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //找到目标位置（值相等），俩位置之间没有阻碍
                    else if (board[k][j] == board[i][j] && noBlockY(i, k, j, board)) {
                        moveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoard, 200);
    return true;
}

function canMoveDown(board) {
    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                return true;
        }
    }
    return false;
}

//初始化最高分
let scoreMax = 0;
$(".zuigao").text(scoreMax);
localStorage.setItem("gaofen", scoreMax)

$(".newgame").on("click", function () {
    let fenshu = localStorage.getItem("gaofen");
    if (fenshu < score) {
        $(".zuigao").text(score);
        localStorage.setItem("gaofen", score)
    } else {
        $(".zuigao").text(fenshu);
    }
    board = new Array();
    score = 0;
    getScore(score);
    //新游戏页面设置
    newGame();
})