/*
* @Author: Marte
* @Date:   2018-03-21 17:52:09
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-21 22:25:09
*/

$.fn.extend({
    waterfall: function() {
        //定义 $_this 为this，以免误以为this是js对象
        var $_this = this;
        //获取父盒子的宽度，获取子盒子的宽度
        var faWidth = $_this.width();
        var sonWidth = $_this.children('.item').width();
        //计算每行放置几个子盒子
        var column = Math.floor(faWidth/sonWidth);
        //计算盒子之间的间距----n个盒子，需要n-1个间距
        var autoMargin = (faWidth-sonWidth*column)/(column-1);
        //瀑布思路：
        //  1.定义一个数组，用来装每列的top+height值
        //  2.在数组中找出值最小的那个，用来放置下一个盒子
        var columnHeight = [];
        for(var a=0;a<column;a++) {
            //给一个默认上间距
            columnHeight[a] = autoMargin;
        }
        $_this.children(".item").each(function(index, ele) {
             //先设index=0的间距是最小的
            var minHeightIndex = 0;
            var maxHeightIndex = 0;
            var minHeight = columnHeight[0];
            //获取当前元素的高度
            var currentHeight = $(this).height();
            //每次要先判断最小的高度，得到它的索引值
            for(var j=0;j<columnHeight.length;j++) {
                if(minHeight>columnHeight[j]) {
                    minHeightIndex = j;
                    minHeight = columnHeight[j];
                }
                // if(columnHeight[maxHeightIndex]<columnHeight[j]) {
                //     maxHeightIndex = j;
                // }
            }
            //给该元素的top值和left值
            $(this).css({
                "top":minHeight,
                "left":minHeightIndex*sonWidth+minHeightIndex*autoMargin
            });
            //每列所占高度更新,不仅要加高度，还要加margin，美观
            minHeight += currentHeight;
            minHeight += autoMargin;
            columnHeight[minHeightIndex] = minHeight;
            //比较每列的最高的高度赋值给父盒子
            for(var j=0;j<columnHeight.length;j++) {
                if(columnHeight[maxHeightIndex]<columnHeight[j]) {
                    maxHeightIndex = j;
                }
            }
            $_this.height(columnHeight[maxHeightIndex]);
        });
    }
});
// 注意点：
//   bug： 要给模板里的图片加一个高度
//          如果不加高度，图片可能等文件加载完毕再出现 ，
//          这样就会导致算出的子盒子的高度出现差错
//          以至于出现盒子覆盖事情
