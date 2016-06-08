    window.onload = function(){
    	var oDiv1 = document.getElementById('item1');
    	var oDiv2 = document.getElementById('item2');
    	var oDiv3 = document.getElementById('item3');
    	var oDiv4 = document.getElementById('item4');
    	var oDiv5 = document.getElementById('item5');
    	var oDiv = document.getElementById('section2');

    	oDiv.onmouseover=function(){
			startMove(oDiv1,{width:800});
			startMove(oDiv2,{width:700});
			startMove(oDiv3,{width:600});
			startMove(oDiv4,{width:500});
			startMove(oDiv5,{width:400});
		}
    }

    function getStyle(obj,attr){

		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj,false)[attr];
		}
	}

	function startMove(obj,json,fn){//fn 函数 json传多个值

		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var bStop = true;//这一次运动结束了，所以的值都到达了
			for (var attr in json) {
				//取当前值
				var iCur=0;

				if (attr=='opacity') {
				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//最大到100
			}
			else{
				iCur=parseInt(getStyle(obj,attr));//当前宽度 相当于offsetWidth
			}

			//算速度
			var iSpeed=(json[attr]-iCur)/10;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            
            //检测停止
			// if (iCur==json[attr]) {
			// 	clearInterval(obj.timer);

			// 	if (fn) {
			// 		fn();
			// 	}
				
			// }
			if (iCur!=json[attr]) {
				bStop=false;//不是所有的值都到达目标值
			}

			if (attr=='opacity') {
					obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
    			obj.style.opacity=(iCur+iSpeed)/100;//火狐下兼容
    		}
    		else{
    			obj.style[attr]=iCur+iSpeed+'px';
    		}
    	}

    	if (bStop) {//所以值都到达
    		clearInterval(obj.timer);

    		if (fn) {
				fn();
			}
    	}
			
		},30);
	}