/*William Tan
CSE 154 AD 
This program will write the books from the database
and allow the users to get more information by
clicking on the book picture or title.
*/
(function(){
	"use strict";

	//refreshes the page and generates the books
	window.onload = function(){
		document.getElementById("back").onclick = home;

		//createst the books on the page
		createBook();
	};

	//calls for the creation of the book and hides the single book
	function createBook(){
		var singlebook = document.getElementById("singlebook");
		singlebook.style.display = "none";
		XmlRequest("books");
	}

	//creates books
	function books(){
		var bookPage = this.responseXML;
		var book = bookPage.getElementsByTagName("title");
		var folder = bookPage.getElementsByTagName("folder");
		var num = 0;
		while(book[num]){
			var div = document.createElement("div");
			var img = document.createElement("img");
			var name = document.createElement("p");

			img.src = "books/" + folder[num].innerHTML + "/cover.jpg";
			var text = document.createTextNode(book[num].innerHTML);
			name.appendChild(text);
			div.id = folder[num].innerHTML;
			img.onclick = onebook;
			name.onclick = onebook;
			div.appendChild(img);
			div.appendChild(name);
			document.getElementById("allbooks").appendChild(div);

			num++;
		}
	}

	//The home button will bring the site to the original page
	function home(){
		location.reload();
	}

	//simplified the xml request when it is called
	function XmlRequest(request){
		var xhr = new XMLHttpRequest();
		if(request == "books"){
			xhr.open("GET", "bestreads.php?mode=book", true);
			xhr.onload = books;
		} else {
			xhr.open("GET", "bestreads.php?mode=info&title=" + request, true);
			xhr.onload = single;
			xhr.send();
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "bestreads.php?mode=description&title=" + request, true);
			xhr.onload = description;
			xhr.send();
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "bestreads.php?mode=reviews&title=" + request, true);
			xhr.onload = reviews;
		}
		xhr.send();
	}

	//event for when the book is clicked on, creates the content of clicked book
	function onebook(){
		document.getElementById("allbooks").innerHTML = "";
		document.getElementById("singlebook").style.display = "";
		var path = this.parentNode.id;
		var img = "books/" + path + "/cover.jpg";
		document.getElementById("cover").src = img;
		XmlRequest(path);

	}

	//produces the basic info of the book
	function single(){
		var info = JSON.parse(this.responseText);
		var title = document.getElementById("title");
		var author = document.getElementById("author");
		var stars = document.getElementById("stars");
		var image = document.createElement("img");

		var infoTitle = document.createTextNode(info.title);
		var infoAuthor = document.createTextNode(info.description);
		var infoStar = document.createTextNode(info.star);

		title.appendChild(infoTitle);
		author.appendChild(infoAuthor);
		stars.appendChild(infoStar);
	}

	//writes the description of the book
	function description(){
		var descrip = document.getElementById("description");
		var text = this.responseText;
		text = document.createTextNode(text);
		descrip.appendChild(text);
	}

	//writes the review of the book
	function reviews(){
		var review = document.getElementById("reviews");
		review.innerHTML = this.responseText;
	}

})();