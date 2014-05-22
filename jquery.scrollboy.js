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
		    add_search 		      : false,
			auto_load		      : false,
			border_width	      : null,
			border_style	      : null,
			border_color	      : null,
			content_margin        : null,
			data_container        : null,
			fields			      : null,
			height		          : '635px',
			kill_session          : null,
			increment		      : 10,
			load_button           : true,
			load_button_text      : "load more",
			load_page	          : null,
			scrollable	          : null,
			search_button         : null,
			search_button_text    : null,
			search_button_id      : "search_button",
			search_container_id   : null,
			width		          : '100%'
			
			
			
		}, options);
		
		/*************************************************************************
		* Setups all variables
		*
		**************************************************************************/
			
			$auto_load = settings.auto_load;
			
			$border_color = settings.border_color;
			$border_style = settings.border_style;
			$border_width = settings.border_width;
			$content_margin = settings.content_margin;
			$data_container = settings.data_container;
			var $fields = new Array();
			$fields =validate_fields(settings.fields);
			$height = settings.height;
			$increment = (settings.increment*1);
			$increment2 = $increment *1;
			$kill_session=settings.kill_session;
			$load_button = settings.load_button;
			$load_button_text = settings.load_button_text;
			$load_page=settings.load_page;
			$scrollable = settings.scrollable;
			$search_container = settings.search_container_id;
			$search_button = settings.search_button;
			$search_button_text = settings.search_button_text;
			$search_button_id = settings.search_button_id;
			
			
			$old_query="";
			addFields($fields);
	
		
		
		
		/*************************************************************************
		* Setups the pane
		*
		**************************************************************************/
		
		$.post($load_page,function (data) {
			initialize(data);
			
		});
		
		
		
		$("#"+$data_container).scroll(function(){
    	
    		if($auto_load){
    			if($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight())
    			{
        			load_data();
   			 	}
   			 }
		});
		
		/**************************************************************
		* Clear Data  
		* clears out all data contained in current container
		* variables:none
		****************************************************************/
		function clear_data(){
			$("#"+$data_container).html(" ");	
		}
		/**************************************************************
		* Initialize  
		* sets up container and adds the data to it
		* variables: array data
		****************************************************************/
		function initialize(data){
			
			$("div#"+$data_container).css('max-width',settings.width);
			if($scrollable){
				$("div#"+$data_container).css('max-height',$height);
			}else{
				$("div#"+$data_container).css('max-height','100%');
				$("div#"+$data_container).css('min-height','500');
			}
			$("div#"+$data_container).css('border-width',$border_width);
			$("div#"+$data_container).css('border-color',$border_color);
			$("div#"+$data_container).css('border-style',$border_style);
			$("div#"+$data_container).css('padding',$content_margin);
			if($scrollable){
				$("#"+$data_container).css("overflow","scroll");
				$("#"+$data_container).scrollTop(0);
				
			}else{
				$("#"+$data_container).css("overflow","visible");
			}					
			$("#warning").replaceWith("");
			var $data = JSON.parse(data);
       		
       		$($data.content).appendTo($("#"+$data_container));			
		}
		
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
					
					
				}
				
			}else{
			
				return false;
			}
			
			return $temp_arr;
		
		}
		function addFields($arr){
			for(var $i=0; $i< $arr.length;$i++){
				//console.log($temp_arr[$i]);
				$('#'+$search_container).append($arr[$i]+" <input type='text' id='"+$arr[$i+1]+"' > ");
				$i++;
				
			}
			
			
		}
		
		
        /********this part appends thwe load button onto the table*********/
        //***************append other things here to customize the form*************/
        
		if($search_button){
			$('#'+$search_container).append("<div class='row'><div class='twelve columns'><input type='button' class='button' value='"+$search_button_text+"' id='"+$search_button_id+"' style='margin:20px 0 0 0;'></div></div>");
	
		}
		if($load_button && !($auto_load)){
			$('#'+$search_container).append("<div class='row'><div class='twelve columns'><input type='button' class='button' value='"+$load_button_text+"' id='append_button' style='margin:20px 0 0 0;'></div></div>");
		}else if(!($scrollable) && $auto_load){
			$('#'+$search_container).append("<div class='row'><div class='twelve columns'><input type='button' class='button' value='"+$load_button_text+"' id='append_button' style='margin:20px 0 0 0;'></div></div>");

		}
	
		//kill session values when new pane is initialized
		$.post($kill_session,function(data) { 
		
		});
			
		
	/**************************************************************
	* Append button function  
	* appends data to the data container based on load criteria
	* variables:none
	****************************************************************/
	$('#append_button').click( function(){
		
			load_data();
	});
	
	function load_data(){
	
		$('#progress').show();
		setTimeout(function(){
		
			$increment2 = ($increment2*1)+ $increment;
			
			$.post($load_page,{
							num:$increment2,
							increment:$increment,
							old_query:encodeURIComponent($old_query),
							new_search:'0'
							},function(data) { 	
							
							if($("#"+$data_container).height() >$height && $scrollable ){
								
									$("#"+$data_container).css("overflow","scroll");
									console.log("should be scrolling");
							}
						var $data = JSON.parse(data);
       				
       					$($data.content).appendTo($("#"+$data_container));
       					console.log(JSON.stringify(data));
       					$old_query= $($data.old_query);
       					console.log($old_query +" here is old query");
       					if($old_query.is(Object)){
       						$old_query=null;
       					}
       					console.log($old_query +" here is old query");
    		})
		}, 800);
	
		
	}
	/**************************************************************
	* Search button function  
	* will reformat results based on search criteria 
	* variables:none
	****************************************************************/
	
	$('#'+$search_button_id).click(function(){
		
		$.post($kill_session,function(data) { 
		
		});
		var $post_variables= new Array();
		for(var $i=0; $i< $fields.length;$i++){
		
				$post_variables[$i]=$fields[$i+1];		
				$i++;
				$post_variables[$i]= $('#'+$fields[$i]).val();
		}
				
		$increment2 =  $increment;
		console.log($post_variables);
		//load new results into the page but keep in mind current restraints
		/***********send over as an array***********************/
		$.post($load_page, { 
			post_variables:$post_variables,
			increment:$increment,
			num:$increment2,
			new_search:"1"
		}
		,function(data) { 	
       					clear_data();
       					initialize(data);
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

