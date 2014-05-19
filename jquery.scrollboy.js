/*********************************************************************
*Copyright 2014 Adam Burt www.burtinteractive.com
*
*Permission is hereby granted, free of charge, to any person obtaining
*a copy of this software and associated documentation files (the
*"Software"), to deal in the Software without restriction, including
*without limitation the rights to use, copy, modify, merge, publish,
*distribute, sublicense, and/or sell copies of the Software, and to
*permit persons to whom the Software is furnished to do so, subject to
*the following conditions:
*
*The above copyright notice and this permission notice shall be
*included in all copies or substantial portions of the Software.
*
*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
*EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
*MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
*NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
*LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
*OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
*WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**********************************************************************/
(function($){

	$.fn.scrollboy= function(options){
		/**************variables****************
		* records =   how many records you want returned 
		* increment = how many records to return on scroll or load
		* width     = set height of returned div area. Default 100%
		* scrolling	= allows scrolling or not.
		*
		*
		*
		****************************************/
		
		var settings =$.extend({
			//records		 : '10',
			increment  	     : '10',
			width		     : '100%',
			height		     : '635px',
			scrollable	     : true,
			kill_session     : null,
			increment		 : 10,
			load_page	     : null,
			load_button      : true,
			load_button_text : "load more",
			data_container   : null,
			border_width	 : null,
			border_style	 : null,
			border_color	 : null,
			content_margin   : null,
			add_search 		 : false,
			fields			 : null
		}, options);
		
		
			$kill_session=settings.kill_session;
			$load_page=settings.load_page;
			var height=0;
			var maxheight=0;
			$height = settings.height;
			$scrollable = settings.scrollable;
			$load_button = settings.load_button;
			$load_button_text = settings.load_button_text;
			$data_container = settings.data_container;
			$increment = (settings.increment*1);
			$increment2 = $increment *1;
			$border_width = settings.border_width;
			$border_color = settings.border_color;
			$border_style = settings.border_style;
			$content_margin = settings.content_margin;
			var $fields = new Array();
			$fields =validate_fields(settings.fields);
			
			
			
		 this.each(function(){
		 //	$("div#"+$data_container).css('width',settings.width);
		 	//$("div#"+$data_container).css('max-height',settings.height);
		 	
			
		});
	
		//initializes the search pane
		var search_pane = $('div#data-con');
		/*increment keeps track of where in the query to pull the data from*******/
		var increment =10;
		
		var api;
		//$("#"+$data_container).load($load_page,function () {
		$.post($load_page,function (data) {
			$("div#"+$data_container).css('max-width',settings.width);
			$("div#"+$data_container).css('max-height',settings.height);
			$("div#"+$data_container).css('border-width',settings.border_width);
			$("div#"+$data_container).css('border-color',settings.border_color);
			$("div#"+$data_container).css('border-style',settings.border_style);
			$("div#"+$data_container).css('padding',$content_margin);
			console.log($("#"+$data_container).height() );
			//if($("#"+$data_container).height() > $height && $scrollable ){
								
									$("#"+$data_container).css("overflow","scroll");
									console.log("should be scrolling");
			$("#warning").replaceWith("");
			var $data = JSON.parse(data);
       		
       		$($data.content).appendTo($("#"+$data_container));						
										
			
			
			/*search_pane.jScrollPane(
			{
				showArrows: true,
				animateScroll: true,
				autoReinitialise: true,
				//autoReinitialise: false,
				
			});
			api = search_pane.data('jsp');
			height = api.getContentHeight();
			maxheight = height*(.95);
			width = api.getContentWidth();*/
			
				
			
		});
		
		function validate_fields($string){
			
			$temp_arr= $string.split(":");
			//alert($temp_arr.length); 
			var all_letters = /[A-Z a-z]/; 
			var not_compliant=/[!@#$%^&*()+=<>?,|\[\]\\{}\/]/
			if($temp_arr.length % 2 == 0){
				
				//now clean up id's and make sure they do not start with anything but a [A-Z][a-z]
				for(var $i in $temp_arr){
					
					
					//check first character is a letter
					if(((($i*1)+1) % 2) == 0){
					
						
						if(all_letters.test($temp_arr[$i].substring(0,1))){
							console.log("it does have all letters");
						}else{
							
							//replace first digit with random letter
							$temp_arr[$i] =	$temp_arr[$i].substring(1,($temp_arr[$i].length));
							$temp_arr[$i]= Math.random().toString(16).replace(/[^a-z]+/g, '')+ $temp_arr[$i];
							
						}
						
						//check if it contains anything besides a [0-9]-_:. anything else remove
						
						if(not_compliant.test($temp_arr[$i])){
							
							
							$temp_arr[$i]= $temp_arr[$i].replace(not_compliant,Math.random().toString(16));
							 
						}
					}
					
					
					
					console.log($temp_arr[$i]);
					
					
				}
				
			}else{
			
				return false;
			}
			
			return $temp_arr;
		
		}
		
		
        /********this part appends thwe load button onto the table*********/
        //***************append other things here to customize the form*************/
        
		//$('#search_box').append("<div class='bar'></div>");
		
		if($load_button){
			$('#search_box').append("<div class='row'><div class='twelve columns'><input type='button' class='button' value='"+$load_button_text+"' id='append_button' style='margin:20px 0 0 0;'></div></div>");
		}
		//kill session values when new pane is initialized
		$.post($kill_session,function(data) { 
		
		});
			
		
		
		
			
	/****this loads more data and appends the the table from sheets2.php**********/	
	$('#append_button').click( function(){
		$('#progress').show();
		setTimeout(function(){
		
			$increment2 = ($increment2*1)+ $increment;
			
			
			$.post($load_page,{num:$increment2,increment:$increment,old_query:'yes'},function(data) { 	
							
							if($("#"+$data_container).height() >$height && $scrollable ){
								
									$("#"+$data_container).css("overflow","scroll");
									console.log("should be scrolling");
							}
						var $data = JSON.parse(data);
       				
       					$($data.content).appendTo($("#"+$data_container));
       					
       					
       					
    		})
		}, 800);
			
	});
	
	
	
	$('#search_button').click(function(){
		/*********cleared stored values in the session for lname and last name
		*a new search so kill old session values.
		*****/
		$.post($kill_session,function(data) { 
		
		});
		$increment =$increment;
		$fname = $('#fname').val();
		$lname = $('#lname').val();
		//load new results into the page but keep in mind current restraints
		$.post($load_page+'?num='+$increment+"&new_search=yes", { fname:$fname,lname:$lname},function(data) { 	
       					$('.jspPane').empty();
       					$('.jspPane').append(data);
       					$('.jspPane').css('width','100%');
       					$('.jspPane').width('100%');
       					api.reinitialise();
       					
    		})
	
	
	
	});
	
	
	$( document ).ajaxStart(function() {
	/*******keeps track of fired ajax function currently not using******/
	
	});
	$( document ).ajaxStop(function() {
			/***************hides progress bar after timer function goes off*****/
			$('#progress').hide();
	});


 	 
      }  
 }(jQuery));

