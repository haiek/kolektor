//RDP: kolektor.se (eller: 109.74.15.2)
//user: Administrator
//pass: k0l3kt0r

//********** OPEN JQUERY *********

$(document).ready( function(){

	//********** AJAX POST REQUESTS *********

	//********** HANDLER URL *********
	var url = "http://puertosur.com.ar/Martin/kolektor/handler.php";

	function getFourMostView() {
		//Send the name of the function to be called in the handler.php
		$.post( url, { fun: "getFourMostView" }, function( data ) {

			//Create array holder for all items info
			var arrayHolder = new Array();
			var key, count = 0;
			for(key in data) {

				//See what the PHP returns.
			  	console.log( data[key].id );
			  	console.log( data[key].title );
			  	console.log( data[key].author );
			  	console.log( data[key].category );
			  	console.log( data[key].mood );
			  	console.log( data[key].feeling );
			  	console.log( data[key].lenght );
			  	console.log( data[key].cover );
			  	console.log( data[key].audio );
			  	console.log( data[key].date );
			  	console.log( data[key].current_views );
			  	console.log( data[key].category_hex );
			  	console.log( data[key].feeling_hex );
			  	console.log( data[key].mood_hex );

			  	//What is gonna be send to the podcast player
			  	item = new Array();
			  	item['id'] = data[key].id;
			  	item['title'] = data[key].title;
			  	item['author'] = data[key].author;
			  	item['category'] = data[key].category;
			  	item['mood'] = data[key].mood;
			  	item['feeling'] = data[key].feeling;
			  	item['lenght'] = data[key].lenght;
			  	item['cover'] = data[key].cover;
			  	item['audio'] = data[key].audio;
			  	item['date'] = data[key].date;
			  	item['current_views'] = data[key].current_views;
			  	item['category_hex'] = data[key].category_hex;
			  	item['feeling_hex'] = data[key].feeling_hex;
			  	item['mood_hex'] = data[key].mood_hex;
			  	item['count'] = count;

			  	arrayHolder[count] = item;

			  	//Change the src path of the image and add the border with the color of the category
			  	$( "#featured" + count + " img" ).attr('src', data[key].cover ).css('border', '8px solid #' + data[key].category_hex);
				
			    count++;
			}
			
			//Sending the values to the player and overlay player when user press one podcast
		    $.each(arrayHolder, function(i, val) {

		    	//Fill the player when you click on the image
	      		$( "#featured" + val['count'] + " img" ).click(function() {
	      				//Filling player view
				  		$( ".Pauthor" ).html( val['author'] );
				  		$( ".Ptitle" ).html( val['title'] );
						$( ".Pimage img" ).attr('src', val['cover'] );
						$( ".Pplayer audio" ).attr('src', val['audio'] );

						//Filling overlay player
				  		$( ".OPtitle" ).html( val['title'] );
						$( ".OPimage img" ).attr('src', val['cover'] );

						//Show the player
						showPlayer();
	      		});

			});
			
		}, "json");
	}

	function getSearchByTitle(userImput) {
		//Delete previous results
		$( "#searchResults .resultsBoxes" ).empty();

		//Send the name of the function to be called in the handler.php
		$.post( url, { fun: "getSearchByTitle", imput: userImput}, function( data ) {

			//Create array holder for all items info
			var arrayHolder = new Array();
			var key, count = 0;
			for(key in data) {

				//See what the PHP returns.
			  	console.log( data[key].id );
			  	console.log( data[key].title );
			  	console.log( data[key].author );
			  	console.log( data[key].category );
			  	console.log( data[key].mood );
			  	console.log( data[key].feeling );
			  	console.log( data[key].lenght );
			  	console.log( data[key].cover );
			  	console.log( data[key].audio );
			  	console.log( data[key].date );
			  	console.log( data[key].current_views );
			  	console.log( data[key].category_hex );
			  	console.log( data[key].feeling_hex );
			  	console.log( data[key].mood_hex );

			  	//What is gonna be send to the podcast player
			  	item = new Array();
			  	item['id'] = data[key].id;
			  	item['title'] = data[key].title;
			  	item['author'] = data[key].author;
			  	item['category'] = data[key].category;
			  	item['mood'] = data[key].mood;
			  	item['feeling'] = data[key].feeling;
			  	item['lenght'] = data[key].lenght;
			  	item['cover'] = data[key].cover;
			  	item['audio'] = data[key].audio;
			  	item['date'] = data[key].date;
			  	item['current_views'] = data[key].current_views;
			  	item['category_hex'] = data[key].category_hex;
			  	item['feeling_hex'] = data[key].feeling_hex;
			  	item['mood_hex'] = data[key].mood_hex;
			  	item['count'] = count;

			  	arrayHolder[count] = item;

			  	//$( "#search2" ).attr( "placeholder" , userImput );
			  	$( "#search2" ).attr( "value" , userImput ).focus();
			  	//Append the results
			  	$( "#searchResults .resultsBoxes" ).append( '<div id="searchResults'+data[key].id+'" class="podSegment"><div class="PodSegImg"><img style="border: 5px solid #' + data[key].category_hex +'" src="'+data[key].cover+'" /></div><div class="PodSegTitle">'+data[key].title+'</div><div class="PodSegAuthor">'+data[key].author+'</div><ul><li class="feeling" style="background-color: #'+ data[key].feeling_hex +'">del</li><li class="mood" style="background-color: #'+ data[key].mood_hex +'">del</li><li class="lenght">'+data[key].lenght+'</li></ul></div>' );
				
			    count++;
			}
			
			//Sending the values to the player and overlay player when user press one podcast
		    $.each(arrayHolder, function(i, val) {

		    	//Fill the player when you click on the image
	      		$( "#searchResults" + val['id'] ).click(function() {
	      				//Filling player view
				  		$( ".Pauthor" ).html( val['author'] );
				  		$( ".Ptitle" ).html( val['title'] );
						$( ".Pimage img" ).attr('src', val['cover'] );
						$( ".Pplayer audio" ).attr('src', val['audio'] );

						//Filling overlay player
				  		$( ".OPtitle" ).html( val['title'] );
						$( ".OPimage img" ).attr('src', val['cover'] );

						//Show the player
						showPlayer();
	      		});

			});
			
		}, "json");
	}

	function getWizard() {
		//Delete previous results
		$( "#wizard .allMoods" ).empty();
		$( "#wizard .allFeelings" ).empty();

		// Declare and reset the variables
		var moodID = 0;
		var feelingID = 0;
		var lenght = 0;

		//Send the name of the function to be called in the handler.php
		//Fill in the moods list
		$.post( url, { fun: "getMoods" }, function( data ) {

			//Create array holder for all items info
			var arrayHolder = new Array();
			var key, count = 0;
			for(key in data) {

				//See what the PHP returns.
			  	console.log( data[key].id );
			  	console.log( data[key].name );
			  	console.log( data[key].hex_color );

			  	//Send the color for setting the background when pressed
			  	item = new Array();
			  	item['id'] = data[key].id;
			  	item['name'] = data[key].name;
			  	item['hex_color'] = data[key].hex_color;

			  	arrayHolder[count] = item;

			  	//Append the results
			  	$( "#wizard .allMoods" ).append( "<li id='allMoods" + data[key].id  + "' value='" + data[key].id + "'>" + data[key].name + "</li>" );
				
			    count++;
			}
			
			//Animating moods row of the wizard
		    $.each(arrayHolder, function(i, val) {

		    	//Asign click event
	      		$( "#allMoods" + val['id'] ).click(function() {
	      			//Asign value to the var moodID
	      			moodID = this.value;
	      			//Reset all background-colors
	      			$( "#wizard .allMoods li" ).css("background-color", "white");
	      			//Asign background-color to this element
	      			$( this ).css("background-color", "#" + val['hex_color']);

	      			//Check if the three var has values and call get the wizard results and show the view
	      			if(moodID != "" && feelingID != "" && lenght != "") {
						getWizardResults(moodID, feelingID,lenght);
						//Delay for showing the user what has been selected
						setTimeout(function() {
							showView("wizardResults");
						}, 600);
					}
	      		});

			});
			
		}, "json");

		//Send the name of the function to be called in the handler.php
		//Fill in the feelings list
		$.post( url, { fun: "getFeelings" }, function( data ) {

			//Create array holder for all items info
			var arrayHolder = new Array();
			var key, count = 0;
			for(key in data) {

				//See what the PHP returns.
			  	console.log( data[key].id );
			  	console.log( data[key].name );
			  	console.log( data[key].hex_color );

			  	//Send the color for setting the background when pressed
			  	item = new Array();
			  	item['id'] = data[key].id;
			  	item['name'] = data[key].name;
			  	item['hex_color'] = data[key].hex_color;

			  	arrayHolder[count] = item;

			  	//Append the results
			  	$( "#wizard .allFeelings" ).append( "<li id='allFeelings" + data[key].id  + "' value='" + data[key].id + "'>" + data[key].name + "</li>" );
				
			    count++;
			}
			
			//Animating feelings row of the wizard
		    $.each(arrayHolder, function(i, val) {

		    	//Asign click event
	      		$( "#allFeelings" + val['id'] ).click(function() {
	      			//Asign value to the var moodID
	      			feelingID = this.value;
	      			//Reset all background-colors
	      			$( "#wizard .allFeelings li" ).css("background-color", "white");
	      			//Asign background-color to this element
	      			$( this ).css("background-color", "#" + val['hex_color']);

	      			//Check if the three var has values and call get the wizard results and show the view
	      			if(moodID != "" && feelingID != "" && lenght != "") {
						getWizardResults(moodID, feelingID,lenght);
						//Delay for showing the user what has been selected
						setTimeout(function() {
							showView("wizardResults");
						}, 600);
					}
	      		});

			});
			
		}, "json");
		
		//Asign click event to lenght
		$( ".allLenght li" ).click(function() {
  			//Asign value to the var moodID
  			lenght = this.value;
  			//Reset all background-colors
  			$( ".allLenght li" ).css("background-color", "white");
  			//Asign background-color to this element
  			$( this ).css("background-color", "red");

  			//Check if the three var has values and call get the wizard results and show the view
  			if(moodID != "" && feelingID != "" && lenght != "") {
				getWizardResults(moodID, feelingID,lenght);
				//Delay for showing the user what has been selected
				setTimeout(function() {
					showView("wizardResults");
				}, 600);
			}
  		});
	}

	function getWizardResults(NewMoodID, NewFeelingID,NewLenght) {
		
		//Delete previous results
		$( "#wizardResults .resultsBoxes" ).empty();

		//Send the name of the function to be called in the handler.php
		$.post( url, { fun: "getWizardResults", moodID: NewMoodID, feelingID: NewFeelingID, lenght: NewLenght}, function( data ) {

			//Create array holder for all items info
			var arrayHolder = new Array();
			var key, count = 0;
			for(key in data) {

				//See what the PHP returns.
			  	console.log( data[key].id );
			  	console.log( data[key].title );
			  	console.log( data[key].author );
			  	console.log( data[key].category );
			  	console.log( data[key].mood );
			  	console.log( data[key].feeling );
			  	console.log( data[key].lenght );
			  	console.log( data[key].cover );
			  	console.log( data[key].audio );
			  	console.log( data[key].date );
			  	console.log( data[key].current_views );
			  	console.log( data[key].category_hex );
			  	console.log( data[key].feeling_hex );
			  	console.log( data[key].mood_hex );

			  	//What is gonna be send to the podcast player
			  	item = new Array();
			  	item['id'] = data[key].id;
			  	item['title'] = data[key].title;
			  	item['author'] = data[key].author;
			  	item['category'] = data[key].category;
			  	item['mood'] = data[key].mood;
			  	item['feeling'] = data[key].feeling;
			  	item['lenght'] = data[key].lenght;
			  	item['cover'] = data[key].cover;
			  	item['audio'] = data[key].audio;
			  	item['date'] = data[key].date;
			  	item['current_views'] = data[key].current_views;
			  	item['category_hex'] = data[key].category_hex;
			  	item['feeling_hex'] = data[key].feeling_hex;
			  	item['mood_hex'] = data[key].mood_hex;
			  	item['count'] = count;

			  	arrayHolder[count] = item;

			  	//Append the results
			  	$( "#wizardResults .resultsBoxes" ).append( '<div id="wizardResults'+data[key].id+'" class="podSegment"><div class="PodSegImg"><img style="border: 10px solid #' + data[key].category_hex +'" src="'+data[key].cover+'" /></div><div class="PodSegTitle">'+data[key].title+'</div><div class="PodSegAuthor">'+data[key].author+'</div><ul><li class="feeling" style="background-color: #'+ data[key].feeling_hex +'">del</li><li class="mood" style="background-color: #'+ data[key].mood_hex +'">del</li><li class="lenght">'+data[key].lenght+'</li></ul></div>' );
				
			    count++;
			}
			
			//Sending the values to the player and overlay player when user press one podcast
		    $.each(arrayHolder, function(i, val) {

		    	//Fill the player when you click on the image
	      		$( "#wizardResults" + val['id'] ).click(function() {
	      				//Filling player view
				  		$( ".Pauthor" ).html( val['author'] );
				  		$( ".Ptitle" ).html( val['title'] );
						$( ".Pimage img" ).attr('src', val['cover'] );
						$( ".Pplayer audio" ).attr('src', val['audio'] );

						//Filling overlay player
				  		$( ".OPtitle" ).html( val['title'] );
						$( ".OPimage img" ).attr('src', val['cover'] );

						//Show the player
						showPlayer();
	      		});

			});
			
		}, "json");
	}

	function getCategories() {
		//Delete previous results
		$( "#categories .allCategoires" ).empty();

		//Send the name of the function to be called in the handler.php
		//Fill in the categories list
		$.post( url, { fun: "getCategories" }, function( data ) {

			//Create array holder for all items info
			var arrayHolder = new Array();
			var key, count = 0;
			for(key in data) {

				//See what the PHP returns.
			  	console.log( data[key].id );
			  	console.log( data[key].name );
			  	console.log( data[key].hex_color );

			  	//Send the color for setting the background when pressed
			  	item = new Array();
			  	item['id'] = data[key].id;
			  	item['name'] = data[key].name;
			  	item['hex_color'] = data[key].hex_color;

			  	arrayHolder[count] = item;

			  	//Append the results
			  	$( "#categories .allCategoires" ).append( "<li id='allCategories" + data[key].id  + "' value='" + data[key].id + "' style='background-color: #" + data[key].hex_color + "'>" + data[key].name + "</li>" );
				
			    count++;
			}
			
			//Animating moods row of the wizard
		    $.each(arrayHolder, function(i, val) {

		    	//Asign click event
	      		$( "#allCategories" + val['id'] ).click(function() {
	      			//Fill in with content
	      			getCategoriesResults(val['id']);
	      			//Show the view
	      			showView("categoriesResults");
	      		});
			});
			
		}, "json");

	}

	function getCategoriesResults(NewCategoryID) {
		
		//Delete previous results
		$( "#categoriesResults .resultsBoxes" ).empty();

		//Send the name of the function to be called in the handler.php
		$.post( url, { fun: "getCategoriesResults", categoryID: NewCategoryID }, function( data ) {

			//Create array holder for all items info
			var arrayHolder = new Array();
			var key, count = 0;
			for(key in data) {

				//See what the PHP returns.
			  	console.log( data[key].id );
			  	console.log( data[key].title );
			  	console.log( data[key].author );
			  	console.log( data[key].category );
			  	console.log( data[key].mood );
			  	console.log( data[key].feeling );
			  	console.log( data[key].lenght );
			  	console.log( data[key].cover );
			  	console.log( data[key].audio );
			  	console.log( data[key].date );
			  	console.log( data[key].current_views );
			  	console.log( data[key].category_hex );
			  	console.log( data[key].feeling_hex );
			  	console.log( data[key].mood_hex );

			  	//What is gonna be send to the podcast player
			  	item = new Array();
			  	item['id'] = data[key].id;
			  	item['title'] = data[key].title;
			  	item['author'] = data[key].author;
			  	item['category'] = data[key].category;
			  	item['mood'] = data[key].mood;
			  	item['feeling'] = data[key].feeling;
			  	item['lenght'] = data[key].lenght;
			  	item['cover'] = data[key].cover;
			  	item['audio'] = data[key].audio;
			  	item['date'] = data[key].date;
			  	item['current_views'] = data[key].current_views;
			  	item['category_hex'] = data[key].category_hex;
			  	item['feeling_hex'] = data[key].feeling_hex;
			  	item['mood_hex'] = data[key].mood_hex;
			  	item['count'] = count;

			  	arrayHolder[count] = item;

			  	//Append the results
			  	$( "#categoriesResults .resultsBoxes" ).append( '<div id="categoriesResults'+data[key].id+'" class="podSegment"><div class="PodSegImg"><img style="border: 10px solid #' + data[key].category_hex +'" src="'+data[key].cover+'" /></div><div class="PodSegTitle">'+data[key].title+'</div><div class="PodSegAuthor">'+data[key].author+'</div><ul><li class="feeling" style="background-color: #'+ data[key].feeling_hex +'">del</li><li class="mood" style="background-color: #'+ data[key].mood_hex +'">del</li><li class="lenght">'+data[key].lenght+'</li></ul></div>' );
				
			    count++;
			}
			
			//Sending the values to the player and overlay player when user press one podcast
		    $.each(arrayHolder, function(i, val) {

		    	//Fill the player when you click on the image
	      		$( "#categoriesResults" + val['id'] ).click(function() {
	      				//Filling player view
				  		$( ".Pauthor" ).html( val['author'] );
				  		$( ".Ptitle" ).html( val['title'] );
						$( ".Pimage img" ).attr('src', val['cover'] );
						$( ".Pplayer audio" ).attr('src', val['audio'] );

						//Filling overlay player
				  		$( ".OPtitle" ).html( val['title'] );
						$( ".OPimage img" ).attr('src', val['cover'] );

						//Show the player
						showPlayer();
	      		});

			});
			
		}, "json");
	}

	function getFeed() {

		//Delete prevous results
		$( "#feed .resultsBoxes" ).empty();

		//Send the name of the function to be called in the handler.php
		$.post( url, { fun: "getFeed" }, function( data ) {

			//Create array holder for all items info
			var arrayHolder = new Array();
			var key, count = 0;
			for(key in data) {

				//See what the PHP returns.
			  	console.log( data[key].id );
			  	console.log( data[key].title );
			  	console.log( data[key].author );
			  	console.log( data[key].category );
			  	console.log( data[key].mood );
			  	console.log( data[key].feeling );
			  	console.log( data[key].lenght );
			  	console.log( data[key].cover );
			  	console.log( data[key].audio );
			  	console.log( data[key].date );
			  	console.log( data[key].current_views );
			  	console.log( data[key].category_hex );
			  	console.log( data[key].feeling_hex );
			  	console.log( data[key].mood_hex );

			  	//What is gonna be send to the podcast player
			  	item = new Array();
			  	item['id'] = data[key].id;
			  	item['title'] = data[key].title;
			  	item['author'] = data[key].author;
			  	item['category'] = data[key].category;
			  	item['mood'] = data[key].mood;
			  	item['feeling'] = data[key].feeling;
			  	item['lenght'] = data[key].lenght;
			  	item['cover'] = data[key].cover;
			  	item['audio'] = data[key].audio;
			  	item['date'] = data[key].date;
			  	item['current_views'] = data[key].current_views;
			  	item['category_hex'] = data[key].category_hex;
			  	item['feeling_hex'] = data[key].feeling_hex;
			  	item['mood_hex'] = data[key].mood_hex;
			  	item['count'] = count;

			  	arrayHolder[count] = item;

			  	//Change the src path of the image and add the border with the color of the category
			  	$( "#feed .resultsBoxes" ).append( "<div id='feedResults" + data[key].id + "' class='podSegment'><div class='PodSegImg'><img style='border: 10px solid #" + data[key].category_hex + "' src='" + data[key].cover + "'' /></div><div class='content'>" + data[key].current_views + " are listening to the " + data[key].title + " right now</div><div class='time'>posted 20 seconds ago</div></div>" );
				
			    count++;
			}
			
			//Sending the values to the player and overlay player when user press one podcast
		    $.each(arrayHolder, function(i, val) {

		    	//Fill the player when you click on the image
	      		$( "#feedResults" + val['id'] ).click(function() {
	      				//Filling player view
				  		$( ".Pauthor" ).html( val['author'] );
				  		$( ".Ptitle" ).html( val['title'] );
						$( ".Pimage img" ).attr('src', val['cover'] );
						$( ".Pplayer audio" ).attr('src', val['audio'] );

						//Filling overlay player
				  		$( ".OPtitle" ).html( val['title'] );
						$( ".OPimage img" ).attr('src', val['cover'] );

						//Show the player
						showPlayer();
	      		});

			});

		}, "json");
	}

	//********** EVENTS *********

	$( "#search1" ).keyup(function() {
		var value = $( this ).val();
		getSearchByTitle(value);
		//show the search results view
		showView("searchResults");

	});

	$( "#search2" ).keyup(function() {
		var value = $( this ).val();
		getSearchByTitle(value);
	});

	$( "#goToWizard" ).click(function() {
		showView("wizard");
	});

	$( "#goToAllCategories" ).click(function() {
		showView("categories");
	});

	$( "#goToRadio" ).click(function() {
		$( ".page" ).hide();
		$( "#radio" ).show();
	});

	$( "#goToPodcasts" ).click(function() {
		$( ".page" ).hide();
		$( "#podcasts" ).show();
		showView("browse");
	});

	$( "#goToFeed" ).click(function() {
		showView("feed");
	});

	$( "#goToBrowse" ).click(function() {
		showView("browse");
	});

	$( "#goToBackstage" ).click(function() {
		showView("backstage");
		$( ".topNavigation" ).hide();
	});

	//WORKING
	$( "#goToOPlayer" ).click(function() {
		$( "#overPlayer" ).fadeIn( "slow" );
	});

	//********** SHOW VIEW *********

	function showView(name) {
	    $('.wrapper').hide(); // Hide all the views.
	    $('#' + name).show(); // Show the startup view.
	    //Check for certain view functions:
	    
			switch (name){
				case "browse":
					getFourMostView();
					break;
		
				case "searchResults":
					break;
				
				case "wizard":
					getWizard();
					break;
				
				case "categories":
					getCategories();
					break;

				case "feed":
					getFeed();
					break;
			}
	}

	function showPlayer() {
		$( ".topNavigation" ).hide();
		$( ".page" ).hide();
		$( "#player" ).show();
	}

	//********** FIRST TO DO WHEN DOCUENT READY *********

	$( ".page" ).hide();
	$( "#radio" ).show();


//********** CLOSE JQUERY *********
});
