//VARIABLE PREDEFINED
  let story_data = "There is no data yet.";
  let storySave = 1;

  let timeline_data = "There is no data yet.";
  let timelineSave = 1;


//////////////////////////NAVBAR//////////////////////////
//MUltiple Tab Code
function openPage(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }

    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
  }
  document.getElementById("defaultOpen").click();


//////////////////////////STORY//////////////////////////
//STORY - GENERATE RESPONSE + DISPLAY
$('#story-submit-button').click(function() {
  document.getElementById('storyLoading').style.display = 'block';

  var question = $('#story-user-input').val();

  //ajax call to the server
  $.ajax({
    type: "POST",
    url: "/",
    data: {'prompt': question , 'type': 'story', 'previous_form': ''},
    success: function (data) {
      document.getElementById('storyLoading').style.display = 'none';
      
      story_data = data.answer;

      var json_data = [
        JSON.parse(story_data) 
        ];
      
        var col = [];
        for (var i = 0; i < json_data.length; i++) {
            for (var key in json_data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        
        var table = document.getElementById("storyJsonTable");
        var tr = table.insertRow(-1);                  
        
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        
        for (var i = 0; i < json_data.length; i++) {
        
            tr = table.insertRow(-1);
        
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json_data[i][col[j]];
                tabCell.contentEditable = true;
            }
        }

    }
  });
  });

//STORY - JSON FILE LOADING
$('#storyFileLoadButton').click(function() {

  const fileInput = document.getElementById('storyFileLoad');
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
      story_data = e.target.result;

      var json_data = JSON.parse(story_data);
      
      var col = [];
      for (var i = 0; i < json_data.length; i++) {
          for (var key in json_data[i]) {
              if (col.indexOf(key) === -1) {
                  col.push(key);
              }
          }
      }
              
      var table = document.getElementById("storyJsonTable");
      var tr = table.insertRow(-1);                  
              
      for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");      
          th.innerHTML = col[i];
          tr.appendChild(th);
      }
              
      for (var i = 0; i < json_data.length; i++) {
          tr = table.insertRow(-1);
          for (var j = 0; j < col.length; j++) {
              var tabCell = tr.insertCell(-1);
              tabCell.innerHTML = json_data[i][col[j]];
              tabCell.contentEditable = true;
          }
      }

  };
  reader.readAsText(file);
 });

//STORY - JSON TABLE UPDATE VARIABLE
document.getElementById("storyJsonTable").oninput = function() {
  var table = document.getElementById("storyJsonTable");
  var json_data = [];

  for (var i = 1, row; row = table.rows[i]; i++) {
      var row_data = {};

      for (var j = 0, col; col = row.cells[j]; j++) {
          row_data[table.rows[0].cells[j].innerText] = col.innerText;
      }

      json_data.push(row_data);
  }

  story_data = JSON.stringify(json_data, null, 2);
};

//STORY - history save
$('#story-history-button').click(function() {
    let headingVar = "storyHeading" + storySave;
    let collapseVar = "storyCollapse" + storySave;

    let story_data_json = JSON.parse(story_data);
    
    let html_data = '';
    for (let i = 0; i < story_data_json.length; i++) {
      let formattedStoryData = '';
      for (let key in story_data_json[i]) {
        formattedStoryData += `<strong>${key}:</strong> ${story_data_json[i][key]}<br/>`;
      }

      html_data += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="${headingVar + i}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseVar + i}" aria-expanded="false" aria-controls="${collapseVar + i}">
              Accordion Item #${storySave + i}
            </button>
          </h2>
          <div id="${collapseVar + i}" class="accordion-collapse collapse" aria-labelledby="${headingVar + i}" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              ${formattedStoryData}
            </div>
          </div>
        </div>
      `;
    }
  
    $('#storyHistoryContent').append(html_data);
  
    storySave = storySave + 1;
  
   });


//////////////////////////TIMELINE//////////////////////////
 //TIMELINE - generating reponse code
 $('#timeline-submit-button').click(function() {
  document.getElementById('timelineLoading').style.display = 'block';

  var question = $('#timeline-user-input').val();

  //ajax call to the server
  $.ajax({
    type: "POST",
    url: "/",
    data: {'prompt': question , 'type': 'timeline', 'previous_form': story_data},
    success: function (data) {
      document.getElementById('timelineLoading').style.display = 'none';
      
      timeline_data = data.answer;
      var json_data = JSON.parse(timeline_data);
      
      var col = [];
      for (var i = 0; i < json_data.length; i++) {
          for (var key in json_data[i]) {
              if (col.indexOf(key) === -1) {
                  col.push(key);
              }
          }
      }
      
      var table = document.getElementById("timelineJsonTable");
      var tr = table.insertRow(-1);                  
      
      for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");      
          th.innerHTML = col[i];
          tr.appendChild(th);
      }
      
      for (var i = 0; i < json_data.length; i++) {
      
          tr = table.insertRow(-1);
      
          for (var j = 0; j < col.length; j++) {
              var tabCell = tr.insertCell(-1);
              tabCell.innerHTML = json_data[i][col[j]];
              tabCell.contentEditable = true;
          }
      }
      }
  });

  });

//TIMELINE - JSON TABLE UPDATE
document.getElementById("timelineJsonTable").oninput = function() {
  var table = document.getElementById("timelineJsonTable");
  var json_data = [];

  for (var i = 1, row; row = table.rows[i]; i++) {
      var row_data = {};

      for (var j = 0, col; col = row.cells[j]; j++) {
          row_data[table.rows[0].cells[j].innerText] = col.innerText;
      }

      json_data.push(row_data);
  }

  timeline_data = JSON.stringify(json_data, null, 2);
};

 //TIMELINE - history save
 $('#timeline-history-button').click(function() {
  let headingVar = "timelineHeading" + timelineSave;
  let collapseVar = "timelineCollapse" + timelineSave;

  let timeline_data_json = JSON.parse(timeline_data);
    
  let formattedStoryData = '';
  for (let i = 0; i < timeline_data_json.length; i++) {
    formattedStoryData += `<strong>${timeline_data_json[i].DateTime}:</strong> ${timeline_data_json[i].Event}<br/>`;
  }

  let html_data = '';
  html_data += `
    
    <div class="accordion-item">
      <h2 class="accordion-header" id="${headingVar}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseVar}" aria-expanded="false" aria-controls="${collapseVar}">
          Accordion Item #${timelineSave}
        </button>
      </h2>
      <div id="${collapseVar}" class="accordion-collapse collapse" aria-labelledby="${headingVar}" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          ${formattedStoryData}
        </div>
      </div>
    </div>

  `;

  $('#timelineHistoryContent').append(html_data);

  timelineSave = timelineSave + 1;
 });
  
