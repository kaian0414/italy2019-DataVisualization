

var LESSON = [ ]


function clickInfo(x,y) {
  elmnt.style.color = clr;
}

$.ajax({
			type: 'GET',
			url: './data.xml',
			contentType: 'text/xml',
			dataType: 'xml',

			success: function(data){
			
			// Get data
			$(data).find("Evento").each(function(i){ 
				var NameOfLesson = $(this).children("Descrizione").text(); 
				var ModuleCode = $(this).children("CodiceModulo").text();
				var LessonCode = $(this).children("CodiceAttivita").text(); 
				var CourseCode = $(this).children("Cdl").text(); 
				var Data = $(this).children("Data").text(); 
				var StartTime = $(this).children("OraInizio").text();
				var EndTime = $(this).children("OraFine").text(); 
				var PrpInfo = $(this).children("Docenti").text();
				$(this).find("Aula").each(function(j){
					var ClasssroomCode = $(this).find('Codice').text(); 
					var ClassroomName = $(this).find("Descrizione").text();
					var BuildingCode = $(this).find("Edificio").text(); 
					var Floor = $(this).find("Piano").text(); 
					var BuildingAddress = $(this).find("Ubicazione").text();

				var lesson = {lessonName: NameOfLesson, classroom: ClassroomName, stTime: StartTime, edTime: EndTime };
					var checkDifferent = true;
					for (var i = LESSON.length - 1; i >= 0; i--) {
						if (LESSON[i].lessonName == NameOfLesson && LESSON[i].classroom == ClassroomName && LESSON[i].stTime == StartTime) {
							checkDifferent = false;
					   } 
					}
					if (checkDifferent){
						LESSON.push(lesson);
					}
				});	
			});

			LESSON.sort((a, b) => (a.lessonName > b.lessonName)?1:((b.lessonName > a.lessonName)? -1:0));
			
			for(var i = 0 ; i < LESSON.length -1 ; i++) {
				var newTextBoxRow = $(document.createElement('div')).attr("class", 'gantt__row');
				var NameOfLessonCell = $(document.createElement('div')).attr("class", 'gantt__row-first');
				NameOfLessonCell.html(LESSON[i].lessonName)
				var line = $(document.createElement('ul')).attr("class", "gantt__row-bars");
				
				var st, ed;
				// start time
				st = LESSON[i].stTime.substring(0, 2) - 8;
				// end time + 1
				ed = LESSON[i].edTime.substring(0, 2) - 8 + 1;
				var bar = $(document.createElement('li')).css("grid-column", ""+st+"/"+ed+"");

				bar.html(LESSON[i].classroom);
				line.append(bar);
				
				newTextBoxRow.append(NameOfLessonCell, line);
				$(".gantt").append(newTextBoxRow);
			}
			},
			error: function(e) {
				console.log(e);
			}
});


