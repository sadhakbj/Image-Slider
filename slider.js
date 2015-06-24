;(function() {
	'use strict';

	function Slider(options) {
        var start;
		var className = 'slider';
		var duration = 1000;
		
		if (options && options.className) {
			className = options.className;
		}
		
		var animator = new Animator();
		var sliderElement = document.getElementsByClassName(className)[0];
		
		var totalSlides = sliderElement.children[0].childElementCount;
		var slides = sliderElement.children[0].children;
		var slidesHolder = sliderElement.children[0];
		var currentPosition = 0;
		var slideWidth = 960;
		
		var btnNext = document.createElement('div');
		btnNext.className ="btn-next";
		btnNext.onclick = next;
		
		var btnPrev= document.createElement('div');
		btnPrev.className ="btn-previous";
		btnPrev.onclick = prev;
		
		sliderElement.appendChild(btnPrev);
		sliderElement.appendChild(btnNext);

        for(var i=1; i <= totalSlides; i++)
        {
            var change = document.createElement('div');
            change.className = "changer";
            change.style.bottom = 20 + 'px';
            change.style.left = 350 + i*30+'px';
            change.style.float = "left";
            sliderElement.appendChild(change);
            change.id = i;
            change.onclick = function()
            {
                
            };
        }

        //this function will glow for current slide
        function checkCurrent()
        {   // console.log('current slide is'+currentPosition);
            for (var i= 0; i < totalSlides; i++){
                if (i == currentPosition){
                    var get = document.getElementsByClassName('changer')[currentPosition];
                    get.style.background = "#036";
                    get.style.opacity = 0.8;
                                            }
                else {
                    var get = document.getElementsByClassName('changer')[i];
                    get.style.background = 'cyan';
                    get.style.opacity = 0.6;

                        }
                }
            
         };

         



		
		
        function next() {
            stopSlide();
            currentPosition++;
            if (currentPosition >= totalSlides) {
                currentPosition = 0;
            }
            var ml = currentPosition * slideWidth * -1;

            console.log(currentPosition, ml);
            animator.animate(slidesHolder, {marginLeft: ml}, duration);
            autoSlide();
        };

        function prev() {
            stopSlide();
             currentPosition--;
            if (currentPosition < 0) {
                currentPosition = slides.length - 1;
            }
            var ml = currentPosition * slideWidth * -1;

            console.log(currentPosition, ml);
            animator.animate(slidesHolder, {marginLeft: ml}, duration);
            autoSlide();

        };
        
         function changeSlide(){
            //get which element is that circle
           
        };
                
        function autoSlide() {
         start = setInterval(next , duration*3);
         checkCurrent();
                     };

        function stopSlide(){
            clearInterval(start);
        }

        autoSlide();
    };


    

    function Animator() {
        var fps = 50;

        this.animate = function (element, props, duration) {
            var intervalDuration = duration / fps;
            var initialPosition = element.style.marginLeft === '' ? 0 : parseInt(element.style.marginLeft);

            var endPosition = props.marginLeft;
            var difference = endPosition - initialPosition;
            var counter = 0;

            var interval = setInterval(function () {

                counter++;
                var step = difference / intervalDuration;

                var noOfIteration = duration/fps;

                console.log('no_of_iteration' ,noOfIteration);

                var current = initialPosition + (step * counter);

                if(counter >= noOfIteration)
                {
                    current = endPosition;
                    clearInterval(interval);
                }


                // if (difference <= 0) {
                //     if (Math.abs(current) >= Math.abs(endPosition)) {
                //         current = endPosition;
                //         clearInterval(interval);
                //     }
                // } else {
                //     if (Math.abs(current) <= Math.abs(endPosition)) {
                //         current = endPosition;
                //         clearInterval(interval);
                //     }
                // }


                element.style.marginLeft = current + 'px';
            }, intervalDuration);
        };
    }

    window.Slider = Slider;
})();