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
		*
		*
		*
		*
		****************************************/
		
		var settings =$.extend({
			//records		 : '10',
			//increment  	 : '10',
			width		 : '100%',
			height		 : '635px',
			//scrollable	 : true,
			kill_session : null,
			load_page	 : null
		}, options);
		
		
			$kill_session=null;
			$load_page=null;
			var height=0;
			var maxheight=0;
		 this.each(function(){
		 	$('div#search-con').css('width',settings.width);
		 	$('div#search-con').css('height',settings.height);
			/*$(this).(settings.records);
			
			$(this).(settings.increment);*/
		/*	
			$(this).width(settings.width);
			
			$(this).height(settings.height);*/
			
			//$(this).(settings.scrollable);
			
			if(settings.kill_session){
				$kill_session= settings.kill_session;
			}
			if(settings.load_page){
				$load_page= settings.load_page;
			}
			
		});
		
		
		//initializes the search pane
		var search_pane = $('div#search-con');
		/*increment keeps track of where in the query to pull the data from*******/
		var increment =10;
		
		var api;
		$('div.scroll-pane').load($load_page,function () {
		
			search_pane.jScrollPane(
			{
				showArrows: true,
				animateScroll: true,
				autoReinitialise: true,
				//autoReinitialise: false,
				
			});
			api = search_pane.data('jsp');
			height = api.getContentHeight();
			maxheight = height*(.95);
			width = api.getContentWidth();
		
			
		});
		
        /********this part appends thwe load button onto the table*********/
		$('#search_box').append("<div class='bar'></div>");
		$('#search_box').append("<div class='row'><div class='twelve columns'><input type='button' class='button' value='load more' id='append_button' style='margin:20px 0 0 0;'></div></div>");

		//kill session values when new pane is initialized
		$.post($kill_session,function(data) { 
		
		});
			
		
		
		
			
	/****this loads more data and appends the the table from sheets2.php**********/	
	$('#append_button').click( function(){
		$('#progress').show();
		setTimeout(function(){
			increment= increment+10;
			
			$.post($load_page+'?num='+increment+"&old_query=yes",function(data) { 	
       					$('.jspPane').append(data);
       					api.reinitialise();
       					
    		})
		}, 800);
			
	});
	
	
	
	$('#search_button').click(function(){
		/*********cleared stored values in the session for lname and last name
		*a new search so kill old session values.
		*****/
		$.post($kill_session,function(data) { 
		
		});
		increment =10;
		$fname = $('#fname').val();
		$lname = $('#lname').val();
		//load new results into the page but keep in mind current restraints
		$.post($load_page+'?num='+increment+"&new_search=yes", { fname:$fname,lname:$lname},function(data) { 	
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

