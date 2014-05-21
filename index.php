<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>	
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset=”utf-8”>
	<title>scrollboy test</title>

	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="jquery.scrollboy.js"></script>
	
<style type="text/css">

#search-con{
	height: 450px; 
	/*overflow: hidden;*/
	overflow:hidden;
	border:0px solid #ccc;
	width:100%;
	max-width:1000px;
	/*padding:10px 0 10px 0;*/
}
#progress{
    display:    none;
    position:   fixed;
    z-index:    1000;
    top:        0;
    left:       0;
    height:     100%;
    width:      100%;
    background: rgba( 255, 255, 255, .8 ) 
                url('images/loader.gif') 
                50% 50% 
                no-repeat;
}

body.loading {
    overflow: hidden;   
}

/* Anytime the body has the loading class, our
   modal element will be visible */
body.loading #progress {
    display: block;
}
</style>	
<script type="text/javascript">

//should give option to auto generate container or name their own
$(document).ready(function(){
		$('#search-con').scrollboy({
       			//note it either auto loads or loads by button not both.
       	
       			
       			width: "100%",
       			height: "500px",
       			kill_session : 'kill_session.php',
       			scrollable: true,
				load_page	 : 'data.php',
				load_button : true,
				search_button : true,
				auto_load	:false,
				load_button_text: 'load more',
				search_button_text: 'search',
				search_button_id : "search_button",
				data_container  : 'data-con',
				search_container : 'search_box',
				increment : '10',
				border_width : '2px',
				border_style : 'solid',
				border_color : '#555555',
       			content_margin: '10px',
       			
       			fields : "first name:fname:last name:lname"
       		});
       		
       	});
       		
</script>
</head>
<body>
	<div id="search_box" style="max-width:700px;padding:0;margin:0 auto;">
		<!--give this box same id ad variable data-container variable-->
		<div class="data-box" id="data-con">
			<p id="warning">no content provided yet for onload check configuration file</p>
		
		</div>
	</div>
		<div id="progress"></div>
<div id="nothing"></div>
</body>

</html>