<? 
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
	
	
	$value="";
	
	$array=$_POST['post_variables'];
	
	
	
	$new_search= $_POST['new_search'];

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
	
	$old_query =$_POST['old_query'];
	
	
	for($i=$start;$i<=$num;$i++){
	
		$content .= "<p>this is content #".$i."</p><br/>";
	
	}
	
	
	/********************examples of using with a query and how you can pass it back as an string in the array**********/
	//this examples show how to use the ranges to pull queries of last name and first name out with data posted with javascript
	/****************/

	$fname=$array[1];
	$lname=$array[3];
	$query_addon ="limit $start, $num ";
	
	if($new_search =="1"){	
		if($lname !="" && $fname !=""){
			$query = "select * from members where lname LIKE '%".$array[1]."%' and fname LIKE '%".$array[3]."%' ";
	
		}else if($lname !=""){
			$query = "select * from members where lname LIKE '%".$array[3]."%' ";
		}else if($fname !="" ){
		
			$query = "select * from members where fname LIKE '%".$array[1]."%' ";
		}else{
			//default query here
			$query = "select * from members ";
		}
	}else{
		$query = $old_query;
	}

	//call this before you do the addon that way if query is reloaded then it will take new values
	$data['old_query']=$query;
	//complete query here
	$query = $query."".$query_addon;
	
	
	
	
	$data['content']= $content;
	$data['num']= $num;
	echo json_encode($data);
?>