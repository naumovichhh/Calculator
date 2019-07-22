class Calculator {
	constructor() {
		this.reset();
	}
	
	reset(e = false) {
		this.operation = null;
		this.firstOperand = null;
		this.evaluated = e;
	}
	
	registerOperation(operand, operation) {
		this.firstOperand = operand;
		this.operation = operation;
	}
	
	evaluate(secondOperand) {
		let rt = new Function("a", "b", "return a"+this.operation+"b")(this.firstOperand, secondOperand);
		this.reset(true);
		return rt;
	}
}

function writeDigit(k) {	
	if (calculator.evaluated) {
		document.getElementById("textbox").value = "0";
		calculator.reset(false);
	}
	var textBox = document.getElementById("textbox");
	if (textBox.value.length <= 8) {
		if (textBox.value === "0")
			textBox.value = k;
		else
			textBox.value = textBox.value + k;
	}
}

function writeDot() {
	var textBox = document.getElementById("textbox");
	if (textBox.value.length <= 20) {
		if (!textBox.value.includes("."))
			textBox.value += ".";
	}
}

function backspace() {
	var textBox = document.getElementById("textbox");
	if (textBox.value != "0") {
		textBox.value = textBox.value.substring(0, textBox.value.length-1);
		if (isNaN(textBox.value)) {
			textBox.value = "0";
		}
		if (textBox.value === "") {
			textBox.value = "0";
		}
	}
}

function registerOperation(o) {
	calculator.reset(false);
	calculator.registerOperation(+document.getElementById("textbox").value, o);
	document.getElementById("textbox").value = "0";
}

function getResult() {
	try	{
		let rlt = calculator.evaluate(+document.getElementById("textbox").value);
		
		document.getElementById("textbox").value = rlt;
	}
	catch {		
	}
}

function resetAll() {
	document.getElementById("textbox").value = "0";
	calculator.reset();
}

function resetTimeout() {
	clearTimeout(timeout);
	timeout = setTimeout(resetAll, 50000);
}

var calculator = new Calculator();
var timeout = setTimeout(resetAll, 50000);
document.body.addEventListener("keypress", e => {
	if (!isNaN(e.key)) {
		writeDigit(e.key);
	}
	else if (e.key === ".") {
		writeDot();
	}
	else if ("/*+-".includes(e.key)) {
		registerOperation(e.key);
	}
	else if (e.key === "=") {
		getResult();
	}
});
document.body.addEventListener("keydown", e => {
	if (e.key === "Backspace")
		backspace();
});
Array.from(document.getElementsByTagName("button")).forEach(b => {
	b.setAttribute("type", "button");
	if (!isNaN(b.id))
		b.className = "digit";
	else if (["plus", "minus", "multiply", "divide"].includes(b.id))
		b.className = "operation";
});
Array.from(document.getElementsByClassName("digit")).forEach(b => {
	b.addEventListener("click", function(e) {
		writeDigit(this.innerText);
	});
});
document.getElementById("backspace").addEventListener("click", function(e) {
	backspace();
});
document.getElementById("dot").addEventListener("click", function() {
	writeDot();
});
document.getElementById("C").addEventListener("click", function() {
	resetAll();
});
document.getElementById("CE").addEventListener("click", function() {
	document.getElementById("textbox").value = "0";
});
document.getElementById("result").addEventListener("click", function() {
	getResult();
});
Array.from(document.getElementsByClassName("operation")).forEach(function(b) {
	b.addEventListener("click", function() {
		registerOperation(this.innerText);
	});
});
document.getElementById("plusminus").addEventListener("click", function() {
	let textBox = document.getElementById("textbox");
	if (textBox.value[0] === "-")
		textBox.value = textBox.value.substring(1);
	else
		if (textBox.value !== "0")
			textBox.value = "-"+textBox.value;
});
document.body.addEventListener("click", resetTimeout);
document.body.addEventListener("keydown", resetTimeout);