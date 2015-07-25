// hulkinatr


//----------------------- HELPER FUNCTIONS 

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//eventually scrape Hulks from the web and beyond
function generateHulkUrl(int) {
    return chrome.extension.getURL('images/' + int + '.jpg');
}

//----------------------- INITIALIZE

var lazy = document.querySelector('.main-column'),
    observer = new MutationObserver(function(mutation) {
        for (var i in mutation) {
            if (mutation[i].target.className === 'lazy-loaded' && mutation[i].target.tagName === 'IMG') {
                // Prevent infinite looping by making sure the same image doesn't get revisited
                mutation[i].target.classList.remove('lazy-loaded');
                mutation[i].target.classList.add('hogan-loaded');
                mutation[i].target.src = generateHulkUrl(getRandomInt(1, 9));
            }
            
            // do something with MediaCard here - remove all subnodes and set a bg?
        };
    });

//----------------------- STUFF THAT HAPPENS

// get around lazy loading
observer.observe(lazy, {
    attributes: true,
    subtree: true
});

// hoganize all imgs NOT lazy-loaded on initial pageload
chrome.extension.sendMessage({}, function(response) {

	var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") { 
            var elements = document.querySelectorAll('.marquee-asset img, .leftrail-image');
            for (var img in elements) {
                // elements[img].classList.add('hogan-loaded');
                elements[img].src = generateHulkUrl(getRandomInt(1, 9));
//                if (elements[img].classList && !(elements[img].classList.contains('.hulk-loaded')) ) {
//                    elements[img].classList.add('hogan-loaded');
//                }
            }
            clearInterval(readyStateCheckInterval);
        }
	}, 10);
});