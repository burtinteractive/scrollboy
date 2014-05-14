<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>	
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset=”utf-8”>
	<title>scrollboy test</title>

	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="jquery.scrollboy.js"></script>
	
	
<script type="text/javascript">
$(document).ready(function(){
		$('#search-con').scrollboy({
       		
       			width: "100%",
       			height: "500px",
       			kill_session : 'kill_sess.php',
       			<? 
       			$is_dept_admin = real_check_dept_admin( $db_conn );
       			if($_GET['blue_view']=="5" ){ ?>
       			load_page	 : 'sheets_dept.php'
				<?}else if($_GET['blue_view']== "" && $is_dept_admin){?>
				load_page	 : 'sheets_dept.php'

				<?}else if($_GET['blue_view']== "3"){?>
				load_page	 : 'sheets_completed.php'
				<?}else{ ?>
				load_page	 : 'sheets_completed.php'
				
				<?}?>
				
       		
       		});
       		
       	});
       		
</script>
</head>
<body>
		
		
</body>

</html>