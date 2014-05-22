<? session_start();
	print_r($_SESSION);
?>

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
       			/****************configuration******************/
       	
       			auto_load	         : true,								//defines if it will pull in data when the scroll reaches the nd
       			border_color         : '#555555',							//border-color of the scroll window, takes in css values
       			border_style         : 'solid',								//border-style css setting
       			border_width         : '2px',
       			content_margin       : '10px',
       			data_container       : 'data-con',							//pass the id of the container you want to append the data to
       			fields               : "first name:fname:last name:lname",	//pass fields in that you want to attach to you search, follow format label text:id
       			height               : "500px",
       			increment            : '10',								//pass how many values you want returned upon completion
       			kill_session         : 'kill_session.php',					//
				load_button          : true,
				load_button_text     : 'load more',
				load_page	         : 'data.php',
				scrollable           : true,
				search_button        : true,
				search_button_text   : 'search',
				search_button_id     : "search_button",
				search_container_id  : 'search_box',
       			width: "100%"
       			
       			
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