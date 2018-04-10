window.addEventListener('DOMContentLoaded', function() {
	let tab = document.getElementsByClassName('info-header-tab'),
			tabContent = document.getElementsByClassName('info-tabcontent'),
			info = document.getElementsByClassName('info-header')[0];
			

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');

		}
	}
	hideTabContent(1)

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
		let target = event.target;
		if(target.className == 'info-header-tab' ) {
				for (let i = 0; i < tab.length; i++) {
					if (target == tab[i]) {
						showTabContent(i);
						break;
					}
				}
		};
	});

	//timer
	let deadline = '2018-04-20'

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date());
		seconds = 0,
		minutes = 0,
		hours = 0;
			if(t > 0){
							seconds = Math.floor( (t/1000) % 60 ), 
							minutes = Math.floor( (t/1000/60) % 60),
							hours = Math.floor( (t/1000/60/60) );
							if(hours < 10) hours = '0'+hours;
			        if(minutes < 10) minutes = '0'+minutes;
			        if(seconds < 10) seconds = '0'+seconds;
						}


		return {
			'total' : t,
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};
	};

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
				hours = timer.querySelector('.hours'),
				minutes = timer.querySelector('.minutes'),
				seconds = timer.querySelector('.seconds');

				function updateClock() {
					let t = getTimeRemaining(endtime);
					hours.innerHTML = t.hours;
					minutes.innerHTML = t.minutes;
					seconds.innerHTML = t.seconds;

					if (t.total <= 0) {
						clearInterval(timeInterval);
					}
				};
				updateClock();
				let timeInterval = setInterval(updateClock, 1000);

	};

	setClock('timer', deadline)

	//Modal
	let more = document.querySelector('.more'),
	    description = document.querySelector('.description-btn'),
	    overlay = document.querySelector('.overlay'),
	    close = document.querySelector('.popup-close');
	    
	more.addEventListener('click', function() {
	    this.classList.add('more-splash');
	    overlay.style.display = "block";
	    document.body.style.overflow = 'hidden';
	});
	close.addEventListener('click', function() {
	    more.classList.remove('more-splash');
	    overlay.style.display = "none";
	    document.body.style.overflow = '';
	});
	description.addEventListener('click', function() {
	    this.classList.add('more-splash');
	    overlay.style.display = "block";
	    document.body.style.overflow = 'hidden';
	});
	close.addEventListener('click', function() {
	    description.classList.remove('more-splash');
	    overlay.style.display = "none";
	    document.body.style.overflow = '';
	});

	//Form
	let message = new Object();
	message.loading = 'Loading....';
	message.success = 'ok';
	message.failure = 'Error 500';

	let form = document.getElementsByClassName('main-form')[0];
	let form2 = document.getElementById('form');
	let input = form.getElementsByTagName('input');
	let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');

			//действие на отправку данных
		form.addEventListener('submit', sendForm);
		form2.addEventListener('submit', sendForm); 
		
		function sendForm(event) {
			event.preventDefault();
			this.appendChild(statusMessage);

			//AJAX
			let request = new XMLHttpRequest();
			request.open("POST", 'server.php');

			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			let formData = new FormData(form);

			request.send(formData);

			request.onreadystatechange = function() {
				if (request.readyState < 4) {
					statusMessage.innerHTML = message.loading;
				} else if (request.readyState === 4) {
						if (request.status == 200 && request.status < 300) {
							statusMessage.innerHTML = message.success;
							//Можно добавить любой контент на страницу
						}
						else {
							statusMessage.innerHTML = message.failure;
						}
				}
			}
			//Чистим инпуты
			for (let i = 0; i < input.length; i++) {
				input[i].value = '';
			}
		}
});

//scroll my

let linkNav = document.querySelectorAll('[href^="#"]'), 
    x = 0.5; 
	for (var i = 0; i < linkNav.length; i++) {
	    linkNav[i].addEventListener('click', function(e) { 
	        e.preventDefault();
	        var w = window.pageYOffset,  
	            hash = this.href.replace(/[^#]*(.*)/, '$1'); 
	        t = document.querySelector(hash).getBoundingClientRect().top, 
	            start = null;
	        requestAnimationFrame(step);  

        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/x, w + t) : Math.min(w + progress/x, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash
            }
        }
    }, false);
}
