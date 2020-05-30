


var array=new Array();
	var c1=0;
	var e=0;
	var me=0;
	var h=0;
        function Upload() {
            //Reference the FileUpload element.
            var fileUpload = document.getElementById("fileUpload");

            //Validate whether File is valid Excel file.
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
            if (regex.test(fileUpload.value.toLowerCase())) {
                if (typeof (FileReader) != "undefined") {
                    var reader = new FileReader();

                    //For Browsers other than IE.
                    if (reader.readAsBinaryString) {
                        reader.onload = function (e) {
                            ProcessExcel(e.target.result);
                        };
                        reader.readAsBinaryString(fileUpload.files[0]);
                    } else {
                        //For IE Browser.
                        reader.onload = function (e) {
                            var data = "";
                            var bytes = new Uint8Array(e.target.result);
                            for (var i = 0; i < bytes.byteLength; i++) {
                                data += String.fromCharCode(bytes[i]);
                            }
                            ProcessExcel(data);
                        };
                        reader.readAsArrayBuffer(fileUpload.files[0]);
                    }
                } else {
                    alert("This browser does not support HTML5.");
                }
            } else {
                alert("Please upload a valid Excel file.");
            }
        };
        function ProcessExcel(data) {
            //Read the Excel File data.
            var workbook = XLSX.read(data, {
                type: 'binary'
            });

            //Fetch the name of First Sheet.
            var firstSheet = workbook.SheetNames[0];

            //Read all rows from First Sheet into an JSON array.
            var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

            //Create a HTML Table element.
            var table = document.createElement("table");
            table.border = "1";

            //Add the header row.
            var row = table.insertRow(-1);

            //Add the header cells.
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = "Qn";
            row.appendChild(headerCell);
			
			headerCell = document.createElement("TH");
            headerCell.innerHTML = "TYPE";
            row.appendChild(headerCell);
			
			headerCell = document.createElement("TH");
            headerCell.innerHTML = "NO.STUDENTS";
            row.appendChild(headerCell);

            headerCell = document.createElement("TH");
            headerCell.innerHTML = "DIFFICULTY(%)";
            row.appendChild(headerCell);

            headerCell = document.createElement("TH");
            headerCell.innerHTML = "LEVEL";
            row.appendChild(headerCell);
			
			headerCell = document.createElement("TH");
            headerCell.innerHTML = "GRAPHICAL REPRESENTATION";
            row.appendChild(headerCell);
			var c=0;
            //Add the data rows from Excel file.
            for (var i = 0; i < excelRows.length; i++) {
				var a=0;
				c=c+1;
				
				
                //Add the data row.
                var row = table.insertRow(-1);

                //Add the data cells.
                //var cell = row.insertCell(-1);
                var qn = Number(excelRows[i].Qn);
				//alert(qn);
				//Getting the question type
				var type=excelRows[i].Type;
				//Calculating percentage for N-Number student attended correctly
				var std = Number(excelRows[i].Std);
				var cor = Number(excelRows[i].Cor);
				var n=(cor/std)*40;
				a=a+n;
				//alert(a);
				//Calculating percentage for W-Number student attended wrongly
				var wr = Number(excelRows[i].Wr);
				var w=(wr/std)*10;
				a=a-w;
				//alert(a);
				//Calculating percentage for M-Difficulty for manually Entered
				var dif=excelRows[i].Dif;
				//alert(dif);
				var dif1="EASY";
				var dif2="MEDIUM";
				var dif3="HARD";
				var n1 = dif.localeCompare(dif1);
				var n2 = dif.localeCompare(dif2);
				var n3 = dif.localeCompare(dif3);
				if(n1==0)
				{
					var m=(30/30)*10;
				}
				if(n2==0)
				{
					var m=(20/30)*10;
				}
				if(n3==0)
				{
					var m=(10/30)*10;
				}
				a=a+m;
				//alert(a);
				//Calculating percentage for T-average time taken to solve the question
				var avgtime = Number(excelRows[i].Avgtime); 
				var av=avgtime-60;
				if(avgtime<=60)
				{
					a=a+10;
				}
				else if(av<20)
				{
					a=a+5;
				}
				else if(av>20)
				{
					a=a+3;
				}
				//alert(a);
				//Calculating percentage for C-Number of time answer changed or Compiled
				var noc = Number(excelRows[i].Noc);
				if(noc<3)
				{
					a=a+10;
				}
				else if(noc<6)
				{
					a=a+5;
				}
				else if(noc>5)
				{
					a=a+3;
				}
				//alert(a);
				//Calculating percentage for H-Average number of hint used
				var hint = Number(excelRows[i].Hint);
				if(hint<=(std/2))
				{
					a=a+10;
				}
				else if(hint<=std)
				{
					a=a+5;
				}
				else if(hint>std)
				{
					a=a+3;
				}
				//alert(a);
				//Calculating percentage for F-Feedback rating from a student
				var feedrt = Number(excelRows[i].Feedrt);
				a=a+feedrt;
				//alert(a);
				//Calculating percentage for U-number students un-attemted
				var ua = Number(excelRows[i].Ua);
				var u=((std-ua)/std)*10;
				a=a+u;
				var a1=Math.round(a);
				array.push(a1);
				c1=c1+1;
				if(a1<=50)
				{
					if(h==0)
					{
						h=h+a1;
					}
					else
					{
						h=(h+a1)/2;
					}
				}
				else if(a1<=75)
				{
					if(me==0)
					{
						me=me+a1;
					}
					else
					{
						me=(me+a1)/2;
					}
				}
				else if(a1>75)
				{
					if(e==0)
					{
						e=e+a1;
					}
					else
					{
						e=(e+a1)/2;
					}
				}
				//alert(a);
				if(a<=50)
				{
					var d="HARD";
				}
				else if(a<=75)
				{
					var d="MEDIUM";
				}
				else if(a>75)
				{
					var d="EASY";
				}
					
				var dvExcel = document.getElementById("dvExcel");
				dvExcel.innerHTML = "";
				dvExcel.appendChild(table);
                cell = row.insertCell(-1);
                cell.innerHTML = qn;
				
				cell = row.insertCell(-1);
                cell.innerHTML = type;
				
				cell = row.insertCell(-1);
                cell.innerHTML = std;

                cell = row.insertCell(-1);
                cell.innerHTML = a.toFixed(2);;
				
				cell = row.insertCell(-1);
                cell.innerHTML = d;
				
				cell = row.insertCell(-1);
				cell.id=qn;
				/*cell.height="100px";
				cell.width="300px";*/
				var k=document.getElementById(qn);
				k.innerHTML="<div id='Progress_Status'>"+
				"<div class='myprogressBar' id='myprogressBar"+qn+"'></div>"+
				"</div>";
				
				
            }
			for(i=1;i<=c1;i++)
			{
			var x=array[i-1];
            var element = document.getElementById("myprogressBar"+i+"");
			element.style.width = x+"%";
			}
			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(drawChart);

			// Draw the chart and set the chart values
			function drawChart() {
			var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Easy', e],
			['Hard', h],
			['Medium', me],

			]);

			// Optional; add a title and set the width and height of the chart
			var options = {'width':550, 'height':400};

			// Display the chart inside the <div> element with id="piechart"
			var chart = new google.visualization.PieChart(document.getElementById('piechart'));
			chart.draw(data, options);
			}
			//alert(e);
			//alert(me);
			//alert(h);
			var z1 = document.getElementById("h1");
			z1.innerHTML="Difficulty level of each question";
			var z2 = document.getElementById("h2");
			z2.innerHTML="Difficulty level of the test";
        };
    