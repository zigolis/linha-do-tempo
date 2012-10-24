$(function(){
	var obj			= 0;
	var pObj		= 0;
	var largTripao	= (($(".emb-tripa").width() + 3) * $(".emb-tripa").length);
	var fatoTitulo	= $(".fato-titulo");
	var fatoTexto	= $(".fato-texto");

	//inlcui scroll
	$("#emb-linha-do-tempo .emb-fatos-tripa").each(function(item){
		if( $(this).children().height() > 300 ){
			$(this).addClass("emb-scroll-" + item);
			$(this).children().addClass("overview");
			
			var oi	= $(this).children().clone();
			var x	= $(this);
			
			$(this).children().remove();

			x.append("<div class='viewport'></div>");
			x.children().append(oi);
			
			$(this).prepend("<div class='scrollbar'><div class='track'><div class='thumb'><div class='end'></div></div></div></div>");
			
			$(".emb-scroll-" + item).tinyscrollbar({ sizethumb: 20 })
		}
	});
	
	//seta largura do tripao
	$("#emb-linha-do-tempo").width(largTripao + $(".emb-tripa").width());

	function zigolinhoNaVeia(){
		var posAtual = $("#contador").val();
		var posUlt	 = $("#totalFatos").val();
		
		if( posAtual == posUlt ){
			$("#f-proximo").addClass("nav-inativa");
		}
	}
	
	function bondeDosSmurfs(){
		var posAtual = $("#contador").val();
		
		if( posAtual == 4 ){
			$("#f-anterior").addClass("nav-inativa");
		}
	}
	
	//pagina para os fatos anteriores
	$("#f-anterior").bind('click', function(){
		if( $("#contador").val() > 4 ){
			objAtual--;
			
			$("#f-proximo").removeClass("nav-inativa");
			$("#contador").attr("value", objAtual);
			bondeDosSmurfs();
			
			obj = obj - ( $(".emb-tripa").width() + 3 );
			$("#emb-linha-do-tempo").animate({marginLeft: '-' +obj+ 'px'},  100);
		}
		else{
			$("#f-anterior").addClass("nav-inativa");
			return false;
		}
		return false;
	});
	
	//pagina para os proximos fatos
	$("#f-proximo").bind('click', function(){
		if( $("#contador").val() < 10 ){
			objAtual++;
			
			$("#f-anterior").removeClass("nav-inativa");
			$("#contador").attr("value", objAtual);
			zigolinhoNaVeia();
			
			obj = obj + ( $(".emb-tripa").width() + 3 );
			$("#emb-linha-do-tempo").animate({marginLeft: '-' +obj+ 'px'},  200);
		}
		else{
			$("#f-proximo").addClass("nav-inativa");
			return false;
		}
		return false;
	});
	
	//movimenta o box caso esteja no fim da view
	$(".emb-fatos-tripa li").each(function(item){
		$(this).bind('click', function(e){
			var pClick	= e.pageX;
			
			if( pClick > 890 && $(this).width() == 200 ){
				//pObj = pObj + 243;
				obj = obj + ( $(".emb-tripa").width() + 3 );

				if( $("#contador").val() < 10 ){
					objAtual++;
				}

				$("#contador").attr("value", objAtual);
				$("#f-anterior").removeClass("nav-inativa");
				$("#emb-linha-do-tempo").animate({marginLeft: '-' +obj+ 'px'},  500);
			}
		});
	});
	
	//exibe descricao do fato
	$(".emb-fatos-tripa li").bind('click', function(){
		removeClick($(this));
		
		if( $(this).hasClass('ativo') ){
			$(this).find(".fato-titulo").show();
			$(this).find(".fato-texto").hide();
			$(this).animate({
				width:		"200px",
				fontSize:	"11px"
			}, 100).removeClass("ativo");
		}
		else{
			$(this).find(".fato-titulo").hide();
			$(this).find(".fato-texto").show();
			$(this).animate({
				width:			"430px",
				fontSize:		"20px",
				marginRight:	"15px"
			}, 200).addClass("ativo");
		}
	});
	
	function removeClick(obj){
		$("#emb-linha-do-tempo li").each(function(item){
			if( $(this).attr('id') != obj.attr('id') ){
				$(this).find(".fato-titulo").show();
				$(this).find(".fato-texto").hide();
				$(this).animate({
					width:		"200px",
					fontSize:	"11px"
				}, 100).removeClass("ativo");
			}
		});
	}
	
	//navegacao mes/ano
	$(".emb-fatos-meses a").hover(
		function(){
			if( $(this).hasClass('emb-ma') ){
				return false;
			}
			
			$(this).stop().delay(50).animate({
				fontSize : "18px"
			}, 200);
		},
		function(){
			$(this).stop().animate({
				fontSize : "11px"
			}, 200);
		}
	);
	
	var pagX = $(window).width();
	var pagY = $(window).height();
	
	//menu principal
	$(".emb-menu p").click(function(){
		$(".emb-menu-itens").slideToggle(100);
		return false;
	});
	
	$(".emb-menu-itens a").click(function(){
		var link = $(this).attr("href");
		
		$("#emb-carregador").fadeIn(100);
		$("#emb-carregador iframe").attr("src", link);
		$("#emb-modal").fadeIn(100).css({"width" : pagX, "height" : pagY}).animate({"opacity" : "0.9"}, 500);
		return false;
	});
	
	$("#emb-carregador span").click(function(){
		$("#emb-modal").fadeOut(300);
		$("#emb-carregador").fadeOut(300, function(){
			location.reload();
		});
		return false;
	});
	
	//controle da paginacao
	var totalFatos = $(".emb-tripa").length;
	$("#totalFatos").attr("value", totalFatos);
	
	if( totalFatos > 4 ) {
		$("#contador").attr("value", "4");
	}else{
		$("#contador").attr("value", totalFatos)
		$("#f-proximo").addClass("nav-inativa");
	}
	
	$("#f-anterior").addClass("nav-inativa");
	
	var objAtual = $("#contador").val();
});