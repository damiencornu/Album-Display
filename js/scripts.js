$(document).ready(function() {
	
	var username = 'FacebookDevGarage'; // Instead of a usrname you can put an ID
	
	$.ajax({
		'type':'GET',
		'url' : 'https://graph.facebook.com/'+username+'/albums',
		'dataType' : 'jsonp',
		success : function (datas) {
			var a=1,
				albums = [];
			$.each(datas.data, function(i,item) {
				$.ajax({
					'type':'GET',
					'url' : 'https://graph.facebook.com/'+item.id+'/photos',
					'dataType' : 'jsonp',
					success : function (otherdatas) {
						var photos = [];
						$.each(otherdatas.data, function(j,jtem) {
								if(jtem.name != undefined) {photos.push('<a class="fancybox" rel="album-'+i+'" title="'+jtem.name+'" href="'+jtem.source+'"><img src="'+jtem.picture+'" alt=""/></a>');}
								else { photos.push('<a class="fancybox" rel="album-'+i+'" href="'+jtem.source+'"><img src="'+jtem.picture+'" alt=""/></a>'); }
						});		
						albums.push('<div class="album">'+photos.join('')+'<h3>'+item.name+'</h3></div>');
						$("#albums").html(albums.join(''));
						$(".album a").fancybox({
								'transitionIn'	:	'elastic',
								'transitionOut'	:	'elastic',
								'speedIn'		:	600, 
								'speedOut'		:	200, 
								'overlayShow'	:	false
							});
					}
				});
			});
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