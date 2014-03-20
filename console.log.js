(function (window) {		
	window.CL = {
		wrapper: (function(){
			var wrapper = document.createElement('div');
			wrapper.setAttribute('id', 'console-log-wrapper');
			var style = 'position: fixed; top: 2%; left: 10%; right: 10%; border: 1px solid rgb(218, 201, 201);';
			style += ' background-color:rgba(250, 250, 250, 0.5); height: 50%; z-index: 999999';
			wrapper.setAttribute('style', style);
			return wrapper;
		})(),
		header: (function() {
			var header = document.createElement('div');
			var title = document.createElement('h1');
			var titleTextContent = document.createTextNode('console.log');

			var titleStyle = 'margin: 0px; padding: 0px!important; font-size: 1em;'
			title.setAttribute('style', titleStyle);

			title.appendChild(titleTextContent);
			header.appendChild(title);
			header.setAttribute('id', 'console-log-wrapper-header');
			
			var headerStyle = 'text-align: center; border-bottom: 1px inset #0f4568;';
			headerStyle += ' background-color: rgba(6, 29, 44, 0.5);';
			header.setAttribute('style', headerStyle);
			return header;
		})(),
		content: (function() {
			var content = document.createElement('section');
			content.setAttribute('id', 'console-log-wrapper-content');
			var style = 'height: 100%; overflow: auto;';
			content.setAttribute('style', style);
			return content;
		})(),
		ol: (function(){
			var ol = document.createElement('ol');
			ol.setAttribute('id', 'console-log-wrapper-content-list');
			var style = 'float: left; margin-left: 3%'
			ol.setAttribute('style', style);
			return ol;
		})(),
		list: (function(){
			var list = document.createElement('li');
			return list;
		})(),
		init: function() {			
			this.wrapper.appendChild(this.header);
			this.content.appendChild(this.ol);
			this.wrapper.appendChild(this.content);			
			return this.wrapper;
		}
	};

    var gOldConsoleLog = window.console.log;//backup

    if(DEBUG_MODE) {
		window.console.log = console.log = function() {
			for(var key in arguments){
				var item = arguments[key];
				var out = item;
				if(typeof item === "object") {
					out = JSON.stringify(item);
				}else if(typeof item === "function") {
					out = item.toString();
				}
				
				out = document.createTextNode(out);
				var li = document.createElement('li');
				li.appendChild(out);
				var list = CL.ol.appendChild(li);
			}
		}
	}

	window.onerror = function (msg, url, lineNumber, column){
		console.log({
			msg: msg,
			url: url,
			lineNumber: lineNumber,
			column: column
		});
	}

	window.onload = function() {
		if(DEBUG_MODE) {
			document.body.appendChild(CL.wrapper);
		}
	}

	CL.init();
})(window);