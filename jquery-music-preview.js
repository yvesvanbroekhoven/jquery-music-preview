/*
 * Author: Yves Van Broekhoven
 * Created at: 2012-02-01
 * Version: 0.0.1
 */
(function($){
  
  var _onSuccess
  ,   _onError
  ,   _initPlayer
  ;
  
  $.musicPreview = function(artist, title){

    if (artist === undefined || artist == '') {
      console.log('Artist name required');
      return;
    }

    if (title === undefined || title == '') {
      console.log('Song title required');
      return;
    }
    
    if ($.jPlayer === undefined) {
      console.log('This plugin requires jPlayer: http://www.jplayer.org');
    }

    var api_key = 'QNR9YFKVAPUN3PGLL'
    ,   url     = 'http://developer.echonest.com/api/v4/song/search?api_key={{api_key}}&format=json&results=1&artist={{artist}}&title={{title}}&bucket=id:7digital-US&bucket=audio_summary&bucket=tracks'
    ;

    url = url.replace('{{api_key}}', api_key)
             .replace('{{artist}}', artist)
             .replace('{{title}}', title);

    var jxhr = $.getJSON(url);
    
    jxhr.success(_onSuccess);
    jxhr.error(_onError);

  };
  
  _onSuccess = function(data){
    console.log(data);
    
    if (data.response.songs.length <= 0) {
      console.log("No songs found");
      return;
    }
    
    if (data.response.songs[0].tracks === undefined) {
      console.log("No preview found");
      return;
    }
    
    var preview_url = data.response.songs[0].tracks[0].preview_url
    ,   $jplayer    = $('#jplayer.ready');
    ;
    
    if ($jplayer.length <= 0) {
      console.log("Player not ready");
      return;
    }
    
    $jplayer.jPlayer('setMedia', {
      mp3: preview_url
    });

    $jplayer.jPlayer('play');
    
  };
  
  _onError = function(data){
    console.log(data);
  }
  
  _initPlayer = function(preview_url){
    
    
  }
  
}(jQuery));
