<?

	$value="";
	
	if(!(empty($_POST['increment'])) ){
		$start= $_POST['num'] - ($_POST['increment']-1);
	
	}else{
		$start=1;
	}
	
	if(!(empty($_POST['num'])) ){
		$num = $_POST['num'];
	}else{
		$num = 10;
	}
	
	$content = "";
	
	
	for($i=$start;$i<=$num;$i++){
	
		$content .= "<p>this is content #".$i."</p><br/>";
	
	}
	
	$data['content']= $content;
	$data['num']= $num;
	echo json_encode($data);
?>