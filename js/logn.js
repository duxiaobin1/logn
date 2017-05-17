$(function(){
		var url="js/logn.json"
		var Ostatus=[
			{"red":"用户名不能为空!","yellow":"用户名不存在!"},
			{"red":"密码不能为空！","yellow":"密码错误"},
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
		$(".password input").blur(blurss)
	    function blurss(){
			var value=$(this).val();
			var url='js/registered.json';
			var that=$(this).parents('.form_div').find('span')
			var eq=$(this).parents('.form_div').index();
			if(!value){
				that.css('display',"block");
				that.addClass('promptred');
				that.text(Ostatus[eq].red);
			}
		};
		$(".lognIn").on('click',{"url":url,"data":{"data":"data"}},askSubmit);
	 	function askSubmit(data){
	 		var  url=data.data.url;
	 		var  data=data.data.data;
	 		var username=$(".username input").val();
	 		var password=$(".password input").val();
	 		var usernames=$(".username span")
	 		var passwords=$(".password span")
	 		if(!username){
			    $(".username input").focus();
			    usernames.fadeIn(100,function(){
			    	 usernames.fadeOut(1000)
			    });
			    usernames.addClass('promptred');
			    usernames.text("用户名不能为空");
			    return false;
	 		}
	 		if(username){
			    $(".username input").focus();
			    usernames.fadeIn(100,function(){
			    	 usernames.fadeOut(1000)
			    });
			    usernames.addClass('promptyellow');
			    usernames.text("用户名不存在!");
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
	 		if(password){
			    $(".password input").focus();
			    passwords.fadeIn(100,function(){
			    	 passwords.fadeOut(1000)
			    });
			    passwords.addClass('promptyellow');
			    passwords.text("密码错误!");
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
	 			$(".form_submit").find('span').text("登陆成功");
	 		})
	 		ajax.fail(function(){
	 			console.log(22)
	 		})
	 		ajax.always(function(){
	 			Io=true;
	 		})
	 	}
	 	
})