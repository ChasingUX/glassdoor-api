$(function () {
    var clickedObject, value;

    var clickedResult = false,
      partnerID = '60913',
      key = 'iyyZ4VGoW5e',
      action = 'employers',
      location= '';

  function glassDoor(query) {
    var glassDoorCall = 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=' + partnerID + '&t.k=' + key + '&action=' + action + '&q=' + query + '&l=' + location;

    $.ajax({
      url: glassDoorCall,
      dataType: "jsonp",
    })
    .done(function(response){
      var employers = response.response.employers,
      name = employers[0].name,
      count = employers.length;

      // if list has not yet been clicked on, show list, otherwise show details
      if (clickedResult == false) {
        showList()

        if(count == 1) {
          showDetails();
          $('#results li').addClass('expanded');
        }
      } else {
        showDetails();
      }

      function showList() {
        $('#results ul').empty();

        $.each(employers, function( index, value ) {
          var name = value.name,
            spaceless = name.replace(/ /g, '_');

          $('#results ul').append("<li data-name=" + spaceless + "><header><h2>" + value.name + "</h2><span class='industry'>" + value.industry + "</span><span class='right'><img src=" + value.squareLogo + "></header>");
        });
      }

      function showDetails() {
        $('.resultsWrap div').empty();
        $('.resultsWrap').addClass('show');
        $('.expanded').removeClass('expanded');
        $(clickedObject).addClass('expanded');

        var overallRating = employers[0].overallRating,
        satisfaction = employers[0].ratingDescription,
        compRating = employers[0].compensationAndBenefitsRating,
        careerOppRating = employers[0].careerOpportunitiesRating,
        cultureRating = employers[0].cultureAndValuesRating,
        leadershipRating = employers[0].seniorLeadershipRating;

        $('.resultsWrap div').append("<h1>" + employers[0].name + "</h1>" +
          "<span class='right'><a href='" + value.website + "'><img src=" + employers[0].squareLogo + "></a></span>" + 
          "<h3>Average " + name + " Rating - <span>" + satisfaction + "</span></h3>" +
          "<table class='ratings'><thead><tr><th>Comp</th><th>Career</th><th>Culture</th><th>Leadership</th><th class='overall'>Overall</th></tr></thead><tbody><tr>" +
          "<th>" + compRating + "</th>" +
          "<th>" + careerOppRating + "</th>" +
          "<th>" + cultureRating + "</th>" +
          "<th>" + leadershipRating + "</th>" +
          "<th class='overall'>" + overallRating + "</th></tr></tbody></table>");
          
          if(employers[0].featuredReview != undefined){
            var pros = employers[0].featuredReview.pros,
            cons = employers[0].featuredReview.cons,
            reviewRating = employers[0].featuredReview.overall,
            headline = employers[0].featuredReview.headline,
            moreReviews = employers[0].featuredReview.attributionURL;

            $('.resultsWrap div').append("<h3>Highlighted Review - <span>Rating: " + reviewRating + "/5</span> - <span class='headline'>" + headline + "</span></h3>" +
              "<table class='proscons'><thead><tr><th>Pros</th><th>Cons</th></tr></thead><tbody><tr>" +
              "<th>" + pros + "</th>" +
              "<th>" + cons + "</th>" +
              "</tr></tbody></table>" + 
              "<a class='more' target='_blank' href='" + moreReviews + "'>View More Reviews</h4>");
          }
      }
    })
    .fail(function() {
      $('.resultsWrap div').append("<h1>Looks like the API has failed. Probably a throttling issue. Try again in 10 minutes!</h1>");
    });
  }

  $(document).on('submit','#input form',function(){
    var value = $('#input input').val();
    clickedResult = false;
    $('.resultsWrap').removeClass('show');
    glassDoor(value);
  });

  $(document).on('click','li',function(){
    clickedResult = true;
    clickedObject = $(this);

    value = $(this).attr('data-name'),
    spaces = value.replace('_', ' ');

    //prevent loading same data
    if(!$(clickedObject).hasClass('expanded')){
      glassDoor(value);
    }

  });
});