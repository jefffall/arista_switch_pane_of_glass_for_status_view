

$(document).ready(function ($) {
    
$("#textinput").text("Type in EOS command here");
    
    // ****** Audio Recorder *****
    
  //    let audioRecorder;
   //   let audioChunks = [];
  //    navigator.mediaDevices.getUserMedia({ audio: true })
  //       .then(stream => {
         
            // Initialize the media recorder object
   //         audioRecorder = new MediaRecorder(stream);
            
            // dataavailable event is fired when the recording is stopped
      //      audioRecorder.addEventListener('dataavailable', e => {
      //         audioChunks.push(e.data);
     //       });
            
            // start recording when the start button is clicked
    //        startButton.addEventListener('click', () => {
     //          audioChunks = [];
    //           audioRecorder.start();
               //output.innerHTML = 'Recording started! Speak now.';
        //    });
            
            // stop recording when the stop button is clicked
    //       stopButton.addEventListener('click', () => {
      //         audioRecorder.stop();
               //output.innerHTML = 'Recording stopped! Click on the play button to play the recorded audio.';
              
            
            // play the recorded audio when the play button is clicked
      //      playButton.addEventListener('click', () => {
     //          const blobObj = new Blob(audioChunks, { type: 'audio/webm' });
     //          const audioUrl = URL.createObjectURL(blobObj);
    //           const audio = new Audio(audioUrl);
        
               //console.log(audioURL);
               //send_audio_blob(audio);
        //       audio.play();
               //output.innerHTML = 'Playing the recorded audio!';
     //       });
    //     }).catch(err => {
         
            // If the user denies permission to record audio, then display an error.
  //          console.log('Error: ' + err);
 //        });
          
 //     });
          
          //chunks = [];
          //let blob = new Blob(chunks, { type: audioRecorder.mimeType }); 
                //chunks = [];
         //startButton.disabled = false;

        //  Create form data that contain the recording.
          //let formData = new FormData();
         //formData.append("audio_file", blob);

          // Send the form data to the server.
     //     fetch(voice_to_text, {
       //     method: "POST",
       //     cache: "no-cache",
       //     body: formData
      //    }).then(resp => {
      //      if (resp.status === 200) {
      //        window.location.reload(true);
      //      } else {
      //        console.error("Error:", resp);
      //      }
      //    }).catch(err => {
     //      console.error(err);
     //    });
      
        
    
    // *******END audio recorder
    
    //$("#eos_command").text("- type EOS command here -");
    $("#eos_command_response").text("EOS command response appears here...");
    
    
    
    
  
    function send_audio_blob(e) {
        
    audioBlob = e.data;
    f = new FormData();
    f.append("file",audioBlob,"audio_filename");
    $.ajax({
         url: "uploadAudio",
         type: "POST",
         data: f,
         processData: false,
         contentData: false });
    }
    
    
    
    
    
      
    var alerts_received = 0;
    var suspend_registered_refresh = 0;
    
    get_arista_switch_status();
    get_eos_log();
	
	setInterval(function () {

		get_arista_switch_status();
        get_eos_log();

		//$("#tbl_unregistered").load("registered_alerts #tbl_unregistered",
			//function () {});
	}, 10000);
    
    $("#voice_command").click(function () {
        capture_voice();
        
        //$("#eos_command_response").text(response);
    });
    
    
    
    $("#send_to_eos").click(function () {
     let x = $(this).text();
     let y = $("#eos_command").val();
        //console.log(y);
        $("#eos_command_response").text(y);
        response = send_to_eos(y);
        //$("#eos_command_response").text(response);
    });
    
    //suspend_registered_refresh = 1;
    
    
    
    //setInterval(function () {

		
            //if (suspend_registered_refresh == 0) {
           // process_regtable();
            //} 
	//}, 60000);
    
 
    
    function audio_recorder() {
        
        let audioRecorder;
      let audioChunks = [];
      navigator.mediaDevices.getUserMedia({ audio: true })
         .then(stream => {
         
            // Initialize the media recorder object
            audioRecorder = new MediaRecorder(stream);
            
            // dataavailable event is fired when the recording is stopped
            audioRecorder.addEventListener('dataavailable', e => {
               audioChunks.push(e.data);
            });
            
            // start recording when the start button is clicked
            startButton.addEventListener('click', () => {
               audioChunks = [];
               audioRecorder.start();
               output.innerHTML = 'Recording started! Speak now.';
            });
            
            // stop recording when the stop button is clicked
            stopButton.addEventListener('click', () => {
               audioRecorder.stop();
               output.innerHTML = 'Recording stopped! Click on the play button to play the recorded audio.';
            });
            
            // play the recorded audio when the play button is clicked
            playButton.addEventListener('click', () => {
               const blobObj = new Blob(audioChunks, { type: 'audio/webm' });
               const audioUrl = URL.createObjectURL(blobObj);
               const audio = new Audio(audioUrl);
               audio.play();
               output.innerHTML = 'Playing the recorded audio!';
            });
         }).catch(err => {
         
            // If the user denies permission to record audio, then display an error.
            console.log('Error: ' + err);
         });
        
        
    }
  
    
    
    
       function capture_voice() {
           
           if (navigator.getUserMedia) {
    console.log('getUserMedia supported.');
    navigator.getUserMedia (
       // constraints: audio and video for this app
       {
          audio: true,
          video: true
       },
    
       // Success callback
       function(stream) {
          video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
          video.onloadedmetadata = function(e) {
             video.play();
             video.muted = 'true';
          };
    
          // Create a MediaStreamAudioSourceNode
          // Feed the HTMLMediaElement into it
          var source = audioCtx.createMediaStreamSource(stream);
    
       },
    
       // Error callback
       function(err) {
          console.log('The following gUM error occured: ' + err);
       }
    );
 } else {
    console.log('getUserMedia not supported on your browser!');
 }
           
       }
    
    
        function display_switch_status(data) {
            
           
            $("#version").text("Version: "+data[0].version);
            $("#uptime").text("Uptime: "+data[0].uptime.uptime);
            $("#boottime").text("Boot time: "+data[0].boot_time);
            
            $("#fqdn").text("FQDN: "+data[1].fqdn);
            $("#hostname").text("hostname: "+data[1].hostname);
            $("#timezone").text("timezone: "+data[2].timezone);
            $("#localtime").text("localtime: "+data[2].localTime.hour+":"+data[2].localTime.min+":"+data[2].localTime.sec+"     "+data[2].localTime.year+"/"+data[2].localTime.month+"/"+data[2].localTime.dayOfMonth+" ");
            
            $("#local").text("clock source: "+data[2].clockSource.local);
            $("#status").text("NTP status: "+data[3].status);
            
            $("#ipv4_nameservers").text("IPV4 nameservers: "+data[4].v4NameServers);
            $("#ipv6_nameservers").text("IPV6 nameservers: "+data[4].v6NameServers);
                              
            $("#ipv4_dhcp_servers").text("IPV4 DHCP servers: "+data[6].vrfs.default.ipv4Server.ipv4ServerActive);
            $("#ipv4_active_leases").text("IPV4 Active Leases: "+data[6].vrfs.default.ipv4Server.ipv4ActiveLeases);
            $("#ipv4_lease_duration").text("IPV4 Lease Duration: "+data[6].vrfs.default.ipv4Server.ipv4LeaseDuration);
                              
            $("#ipv6_dhcp_servers").text("IPV6 DHCP servers: "+data[6].vrfs.default.ipv6Server.ipv6ServerActive);
            $("#ipv6_active_leases").text("IPV6 Active Leases: "+data[6].vrfs.default.ipv6Server.ipv6ActiveLeases);
            $("#ipv6_lease_duration").text("IPV6 Lease Duration: "+data[6].vrfs.default.ipv6Server.ipv6LeaseDuration);
                              
                
             
        }
    
    
    	function get_arista_switch_status()

	{
		$.getJSON("get_arista_switch_status", function () {
			})
			.done(function (data) {
                //console.log(data);
				//var local_data = JSON.stringify(data.data);
                var local_data = JSON.stringify(data);
                var my_json = JSON.parse(local_data);
                try {
                var host = my_json[0].host;
                    }
                catch {
                    host = "no-unregistered-alerts-in-list";
                    }
                    
                //console.log(host);
                if (host != "N/A") {
                    alerts_received = 1;
                }
                //convert(data);
                display_switch_status(data);
              	//process_unregtable(data.data);
			})
			.fail(function () {})
			.always(function () {});
	}
            function get_eos_log()
            {
	    	$.getJSON("get_eos_log", function () {
			})
			.done(function (data) {
                //console.log(data);
				//var local_data = JSON.stringify(data.data);
                var local_data = JSON.stringify(data);
                var my_json = JSON.parse(local_data);
                try {
                var host = my_json[0].host;
                    }
                catch {
                    host = "no-unregistered-alerts-in-list";
                    }
                    
                //console.log(host);
                if (host != "N/A") {
                    alerts_received = 1;
                }
                //convert(data);
                $("#eos_log").html(data.eos); 
               
			})
			.fail(function () {})
			.always(function () {});
	}

	
    
    	function send_to_eos(command)

	{
        my_command =  $("#eos_command").val();
        $.getJSON('run_eos_command', {'command' : command}, function (data, textStatus, jqXHR){
        console.log(data);
        $('#eos_command_response').text(data.command_response);
        });
    }
        
   
	function post_unreg_table(your_table)
	{
		var table = table_to_json(your_table);

		$.each(table, function (index, value) {
			delete table[index]['Options'];
		});
		$.ajax({
			type: 'POST',
			url: "post_unregistered_alerts",
			data: JSON.stringify(table),
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		});
	}
    
	function post_row_offset(row_that_was_clicked)
	{
		var string_thing = {
			"row_clicked": parseInt(row_that_was_clicked, 10)
		}
		var stringify = JSON.stringify(string_thing)
		$.ajax({
			type: 'POST',
			url: "post_row_number_clicked",
			data: JSON.stringify(stringify),
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		});
	}

	function table_to_json(a_table) {
		return $(a_table).tableToJSON();
	}

	function process_unregtable(ajax_data)
	{

	

		var random_id = function () {
			var id_num = Math.random().toString(9).substr(2, 3);
			var id_str = Math.random().toString(36).substr(2);

			return id_num + id_str;
		};


		//--->create data table > start
		var tbl = '';
		tbl += '<table id="unregistered_alerts_table"';
		tbl += '<table class="table table-hover">';

		//--->create table header > start
		tbl += '<thead>';
		tbl += '<tr>';
		tbl += '<th>Splunk Alert Name</th>';
		tbl += '<th>host</th>';
		tbl += '<th>Options</th>';
		tbl += '</tr>';
		tbl += '</thead>';
		//--->create table header > end


		//--->create table body > start
		tbl += '<tbody>';

		//--->create table body rows > start
		$.each(ajax_data, function (index, val) {
			//you can replace with your database row id
			var row_id = random_id();

			//loop through ajax row data
			tbl += '<tr row_id="' + row_id + '">';
			tbl += '<td ><div class="row_data" edit_type="click" col_name="Splunk Alert Name">' + val['Splunk Alert Name'] + '</div></td>';
			tbl += '<td ><div class="row_data" edit_type="click" col_name="host">' + val['host'] + '</div></td>';

			//--->edit options > start
			tbl += '<td>';
			if (alerts_received == 1) {
               
				tbl += '<span class="btn_register" > <a href="#" class="btn btn-primary " row_id="'+row_id+'" >Register</a> | </span>';
              
            } else {
            
				tbl += '<span class="btn_default" > <a href="#" class="btn btn-default " row_id="' + row_id + '" >Wait for Alert</a> </span>';
			}


			tbl += '</td>';
			//--->edit options > end

			tbl += '</tr>';
        });

		//--->create table body rows > end

		tbl += '</tbody>';
		//--->create table body > end

		tbl += '</table>';
		//--->create data table > end

		//out put table data
		$(document).find('.tbl_unregistered').html(tbl);
		//$('td:nth-child(3)').hide();
		//$('td:nth-child(3),th:nth-child(3)').hide();
        
		//--->button > register > start	
		$(document).on('click', '.btn_register', function (event) {
			event.preventDefault();
			var row_index = $(this).closest("tr").index();
			var tbl_row = $(this).closest('tr');
			post_unreg_table('#unregistered_alerts_table');
			post_row_offset(row_index);
			tbl_row.remove();
           
            alerts_received = 1;
           
            setTimeout(function () {
                
                 location.reload();
              
	        }, 1000); 
            
           
            
		   });
       	};
  
  

    function table_to_json(a_table)
    {
     return $(a_table).tableToJSON();
    }


    function post_table(your_table)

    {
         var table = table_to_json(your_table);

        $.each(table, function( index, value ) {
         delete table[index]['Options'];
          });


        $.ajax({
          type : 'POST',
           url : "post_registered_alerts",
            data : JSON.stringify(table),
             contentType: "application/json; charset=utf-8",
            dataType: "json"
            });



    }

function process_table (ajax_data)
    {

        var random_id = function  ()
        {
                var id_num = Math.random().toString(9).substr(2,3);
                var id_str = Math.random().toString(36).substr(2);

                return id_num + id_str;
       }


        //--->create data table > start
        var tbl = '';
    tbl +='<table id="registered_alerts_table"'
        tbl +='<table class="table table-hover">'

                //--->create table header > start
                tbl +='<thead>';
                        tbl +='<tr>';
                        tbl +='<th>Splunk Alert Name</th>';
                        tbl +='<th>Alert Last Seen</th>';
                        tbl +='<th>Automation url</th>';
                        tbl +='<th>Script</th>';
                        tbl +='<th>Options</th>';
                        tbl +='</tr>';
                tbl +='</thead>';
                //--->create table header > end


                //--->create table body > start
                tbl +='<tbody>';

                        //--->create table body rows > start
                        $.each(ajax_data, function(index, val)
                        {
                            //console.log(val['Splunk Alert Name']);
                          
                                //you can replace with your database row id
                                var row_id = random_id();

                                //loop through ajax row data
                                tbl +='<tr row_id="'+row_id+'">';
                                tbl +='<td><div class="row_data" col_name="Splunk Alert Name">'+val['Splunk Alert Name']+'</div></td>';
                                tbl +='<td ><div class="row_data" edit_type="click" col_name="Alert Last Seen">'+val['Alert Last Seen']+'</div></td>';
                                tbl +='<td ><div class="row_data" edit_type="click" col_name="Automation url">'+val['Automation url']+'</div></td>';
                                tbl +='<td ><div class="row_data" edit_type="click" col_name="Script">'+val['Script']+'</div></td>';

                                //--->edit options > start
                                tbl +='<td>';

                                tbl +='<span class="btn_edit" > <a href="#" class="btn btn-secondary " row_id="'+row_id+'" > Edit</a> </span>';

                                 //only show this button if edit button is clicked
                                tbl +='<span class="btn_save"> <a href="#" class="btn btn-success"  row_id="'+row_id+'"> Save</a> | </span>';
                                tbl +='<span class="btn_cancel"> <a href="#" class="btn btn-info" row_id="'+row_id+'"> Cancel</a> | </span>';
                                tbl +='<span class="btn_delete"> <a href="#" class="btn btn-danger" row_id="'+row_id+'"> Delete</a> | </span>';

                                tbl +='</td>';
                                        //--->edit options > end

                                tbl +='</tr>';
                        });

                        //--->create table body rows > end

                tbl +='</tbody>';
                //--->create table body > end

        tbl +='</table>'
        //--->create data table > end

        //out put table data
        $(document).find('.tbl_user_data').html(tbl);

        $(document).find('.btn_save').hide();
        $(document).find('.btn_cancel').hide();


        //--->make div editable > start
        $(document).on('click', '.row_data', function(event)
        {
                event.preventDefault();

                if($(this).attr('edit_type') == 'button')
                {
                        return false;
                }

                //make div editable
                $(this).closest('div').attr('contenteditable', 'true');
                //add bg css
                $(this).addClass('bg-warning').css('padding','20px');

                $(this).focus();
        })
        //--->make div editable > end


        //--->save single field data > start
        $(document).on('focusout', '.row_data', function(event)
        {
                event.preventDefault();

                if($(this).attr('edit_type') == 'button')
                {
                        return false;
                }

                var row_id = $(this).closest('tr').attr('row_id');

                var row_div = $(this)
                .removeClass('bg-warning') //add bg css
                .css('padding','')

                var col_name = row_div.attr('col_name');
                var col_val = row_div.html();

                var arr = {};
                arr[col_name] = col_val;

                //use the "arr" object for your ajax call
                $.extend(arr, {row_id:row_id});

                //out put to show
               $('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');


        })
        //--->save single field data > end


        //--->button > edit > start
        $(document).on('click', '.btn_edit', function(event)
        {
                suspend_registered_refresh = 1;
                event.preventDefault();
                var tbl_row = $(this).closest('tr');

                var row_id = tbl_row.attr('row_id');

                tbl_row.find('.btn_save').show();
                tbl_row.find('.btn_cancel').show();

                //hide edit button
                tbl_row.find('.btn_edit').hide();

                //make the whole row editable
                tbl_row.find('.row_data')
                .attr('contenteditable', 'true')
                .attr('edit_type', 'button')
                .addClass('bg-warning')
                .css('padding','25px')

                //--->add the original entry > start
                tbl_row.find('.row_data').each(function(index, val)
                {
                        //this will help in case user decided to click on cancel button
                        $(this).attr('original_entry', $(this).html());
                });
                //--->add the original entry > end

        });
        //--->button > edit > end


        //--->button > cancel > start
        $(document).on('click', '.btn_cancel', function(event)
        {
                suspend_registered_refresh = 0;
                event.preventDefault();

                var tbl_row = $(this).closest('tr');

                var row_id = tbl_row.attr('row_id');

                //hide save and cacel buttons
                tbl_row.find('.btn_save').hide();
                tbl_row.find('.btn_cancel').hide();

                //show edit button
                tbl_row.find('.btn_edit').show();

                //make the whole row editable
                tbl_row.find('.row_data')
                .attr('edit_type', 'click')
                .removeClass('bg-warning')
            .css('padding','')

                tbl_row.find('.row_data').each(function(index, val)
                {
                        $(this).html( $(this).attr('original_entry') );
                });
        });
        //--->button > cancel > end



    //--->button > delete > start
        $(document).on('click', '.btn_delete', function(event)
        {
                suspend_registered_refresh = 0;
                event.preventDefault();

                var tbl_row = $(this).closest('tr');

        tbl_row.remove();
        post_table('#registered_alerts_table');

        });
        //--->button > delete > end


        //--->save whole row entery > start
        $(document).on('click', '.btn_save', function(event)
        {
                suspend_registered_refresh = 0;
                event.preventDefault();
                var tbl_row = $(this).closest('tr');

                var row_id = tbl_row.attr('row_id');


                //hide save and cacel buttons
                tbl_row.find('.btn_save').hide();
                tbl_row.find('.btn_cancel').hide();

                //show edit button
                tbl_row.find('.btn_edit').show();


                //make the whole row editable
                tbl_row.find('.row_data')
                .attr('edit_type', 'click')
                .removeClass('bg-warning')
                .css('padding','')


                //--->get row data > start
                var arr = {};
                tbl_row.find('.row_data').each(function(index, val)
                {
                        var col_name = $(this).attr('col_name');
                        var col_val  =  $(this).html();
                        arr[col_name] = col_val;
                });
                //--->get row data > end

                //use the "arr" object for your ajax call
                $.extend(arr, {row_id:row_id});



                //out put to show
                $('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');

      post_table('#registered_alerts_table');


        });


        //--->save whole row entery > end

        console.log("end end end end");
    };
        
    })    
    //===============================================================
    //});
