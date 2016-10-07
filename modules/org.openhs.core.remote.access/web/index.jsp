<!DOCTYPE HTML>
<html>
<body>
	Time: <span id="foo"></span>
	
	<br><br>
	<button onclick="start()">Start</button>

	<script type="text/javascript">
	function start() {

		var eventSource = new EventSource("TestServlet");
		
		eventSource.onmessage = function(event) {
		
			document.getElementById('foo').innerHTML = event.data;
		
		};
		
	}
	</script>
</body>
</html>