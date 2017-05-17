$(function(){
		var on_off=true,Io=true;
		var url="js/forget.json";		
		var timers=60;
		var reg=[/^[\u4e00-\u9fa5\w]{2,15}$/,/^(13|14|15|18|)[0-9]{9}$/,/^\S+$/,/^[A-Za-z0-9_-]+$/];
		var Ostatus=[
			{"red":"用户名不能为空!","yellow":"2-15位中文字母数字下划线!"},
			{"red":"手机号不能为空!","yellow":"请填写正确的手机号!"},
			{"red":"验证码不能为空！","yellow":"验证码错误!"},
			{"red":"密码不能为空！","yellow":"密码必须是数字字母子下划线组成!"},
		];
		// 验证框的验证
		$(".form_div input").focus(function(){
			$(this).css("border","1px solid yellow")
			$('.form_div span').removeClass('promptred');
			$('.form_div span').removeClass('promptyellow');
			$('.form_div span').css('display',"none");
		})
		$(".form_div input").blur(function(){
			$(this).css("border","")	
		})
		$(".username input").blur(blurss);
		$(".phone input").blur(blurss)
		$(".phone_code .sidecode").blur(blurss)
		$(".password input").blur(blurss)
	    function blurss(){
			var value=$(this).val();
			var url='js/forget.json';
			var that=$(this).parents('.form_div').find('span')
			var eq=$(this).parents('.form_div').index();
			if(!value){
				that.css('display',"block");
				that.addClass('promptred');
				that.text(Ostatus[eq].red);
			}
			if(value&&!reg[eq].test(value)){
				that.css('display',"block");
				that.addClass('promptyellow');
				that.text(Ostatus[eq].yellow);	
			}
		};
	    //获取验证码
		$(".getcode").on('click',{"url":url,"data":{"data":"data"}},askData);		
	 	function askData(data){
	 		var  url=data.data.url;
	 		var  data=data.data.data;
	 		console.log(data)
	 		if(!on_off) return false;
	 		on_off=false;
	 		$this=$(this)
	 		var ajax=$.ajax({
	 			url:url,
	 			type:"get",
	 			dataType:"json",
	 			async:true,
	 			data:data
	 		});
	 		ajax.done(function(data){
	 			console.log(111)
	 			$this.attr("disabled","disabled");
	 			var timer=setInterval(function(){
	 				timers -= 1;
	 				if(timers<=0){
	 					clearInterval(timer)
	 					$this.val("获取验证码")
	 					$this.removeAttr("disabled");
	 				}else{
	 					$this.val("请等待"+timers+"秒")
	 				}
	 			},1000)
	 		})
	 		ajax.fail(function(){
	 			console.log(22)
	 		})
	 		ajax.always(function(){
	 			on_off=true;
	 		})
	 	}
	 	//提交注册
	 	$(".sidePassword").on('click',{"url":url,"data":{"data":"data"}},askSubmit);
	 	function askSubmit(data){
	 		var  url=data.data.url;
	 		var  data=data.data.data;
	 		var username=$(".username input").val();
	 		var password=$(".password input").val();
	 		var phone=$(".phone input").val();
	 		var sidecode=$(".sidecode").val();
	 		var usernames=$(".username span")
	 		var passwords=$(".password span")
	 		var phones=$(".phone span")
	 		var sidecodes=$(".phone_code span")
	 	
	 		if(!username){
			    $(".username input").focus();
			    usernames.fadeIn(100,function(){
			    	 usernames.fadeOut(1000)
			    });
			    usernames.addClass('promptred');
			    usernames.text("用户名不能为空");
			    return false;
	 		}
	 		if(username&&!reg[0].test(username)){
			    $(".username input").focus();
			    usernames.fadeIn(100,function(){
			    	 usernames.fadeOut(1000)
			    });
			    usernames.addClass('promptyellow');
			    usernames.text("用户名不存在!");
			    return false;
	 		}
	 		if(!phone){
			    $(".phone input").focus();
			    phones.fadeIn(100,function(){
			    	 phones.fadeOut(1000)
			    });
			    phones.addClass('promptred');
			    phones.text("手机号不能为空");
			    return false;
	 		}
	 		if(phone&&!reg[1].test(phone)){
			    $(".phone input").focus();
			    phones.fadeIn(100,function(){
			    	 phones.fadeOut(1000)
			    });
			    phones.addClass('promptyellow');
			    phones.text("请填写正确的手机号!");
			    return false;
	 		}
	 		if(!sidecode){
			    $(".sidecode").focus();
			    sidecodes.fadeIn(100,function(){
			    	 sidecodes.fadeOut(1000)
			    });
			    sidecodes.addClass('promptred');
			    sidecodes.text("验证码不能为空");
			    return false;
	 		}
	 		if(sidecode&&!reg[1].test(phone)){
			    $(".sidecode").focus();
			    sidecodes.fadeIn(100,function(){
			    	 sidecodes.fadeOut(1000)
			    });
			    sidecodes.addClass('promptyellow');
			    sidecodes.text("验证码错误!");
			    return false;
	 		}
	 		if(!password){
			    $(".password input").focus();
			    passwords.fadeIn(100,function(){
			    	 passwords.fadeOut(1000)
			    });
			    passwords.addClass('promptred');
			    passwords.text("密码不能为空");
			    return false;
	 		}
	 		if(password&&!reg[3].test(password)){
			    $(".password input").focus();
			    passwords.fadeIn(100,function(){
			    	 passwords.fadeOut(1000)
			    });
			    passwords.addClass('promptyellow');
			    passwords.text("密码必须是数字字母子下划线组成!");
			    return false;
	 		}
	 		if(!Io) return false;
	 		Io=false;
	 		$this=$(this)
	 		var ajax=$.ajax({
	 			url:url,
	 			type:"get",
	 			dataType:"json",
	 			async:true,
	 			data:data
	 		});
	 		ajax.done(function(data){
	 			console.log(111)
	 			$(".registered").attr("disabled","disabled")
	 			$(".form_submit").find('span').fadeIn(500,function(){
	 				$(".form_submit").find('span').fadeOut(2000,function(){
	 					$('.registered').removeAttr("disabled");
	 					window.location.href="logn.html";
	 				})	
	 			});	 			
	 			$(".form_submit").find('span').addClass("promptyellow");
	 			$(".form_submit").find('span').text("注册成功");
	 		})
	 		ajax.fail(function(){
	 			console.log(22)
	 		})
	 		ajax.always(function(){
	 			Io=true;
	 		})
	 	}
	 	
})