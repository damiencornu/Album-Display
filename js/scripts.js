$(document).ready(function() {
	
	var username = 'cocacola'; // Instead of a usrname you can put an ID
	
	$.ajax({
		'type':'GET',
		'url' : 'https://graph.facebook.com/'+username+'/albums',
		'dataType' : 'jsonp',
		success : function (datas) {
			var a=0, b=0,
				htmlTemp = '',
				albums = [];
			
			$.each(datas.data, function(i,item) {
				
				htmlTemp += '<div class="album album-'+item.id+'"><img src="img/ajax-loader.gif" alt="Loading..." style="margin-top:25px; margin-left:49px;"/><h3>'+item.name+'</h3></div>';
				$("#albums").html(htmlTemp);
				
				$.ajax({
					'type':'GET',
					'url' : 'https://graph.facebook.com/'+item.id+'/photos',
					'dataType' : 'jsonp',
					success : function (otherdatas) {
						albums=[];
						var photos = [];
						$.each(otherdatas.data, function(j,jtem) {
								if(jtem.name != undefined) {photos.push('<a class="fancybox" rel="album-'+i+'" title="'+jtem.name+'" href="'+jtem.source+'"><img src="'+jtem.picture+'" alt=""/></a>');}
								else { photos.push('<a class="fancybox" rel="album-'+i+'" href="'+jtem.source+'"><img src="'+jtem.picture+'" alt=""/></a>'); }
						});		
						albums.push(photos.join('')+'<h3>'+item.name+'</h3>');
						$(".album-"+item.id).html(albums.join(''));
						$(".album a").fancybox({
								'transitionIn'	:	'elastic',
								'transitionOut'	:	'elastic',
								'speedIn'		:	600, 
								'speedOut'		:	200, 
								'overlayShow'	:	false
							});
						a++;
					}
				}); //fin du second Ajax
				b++
			}); // Fin du premier each
		}
	});
	
	
	$(".album a").fancybox({
			'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200, 
			'overlayShow'	:	false
		});
	
});