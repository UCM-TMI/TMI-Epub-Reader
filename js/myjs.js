 $(function() {
    	$( "#effect" ).hide( "blind", {}, 1000, callback );
    
    	function callback() {
    	      setTimeout(function() {
    	        $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
    	      }, 1000 );
    	    };
    	
    });