document.querySelectorAll(".bounds").forEach((item) => {
	item.ondragstart = function () {
		return false;
	};
});

document.querySelectorAll(".draggable").forEach((item) => {
	item.ondragstart = function () {
		return false;
	};
	item.onmousedown = function (e) {
		item.classList.add("dragging");
		moveTo(e.pageX, e.pageY);

		function moveTo(x, y) {
			item.style.left = x - item.getBoundingClientRect().width / 2 + "px";
			item.style.top = y - item.getBoundingClientRect().height / 2 + "px";
		}

		function onDrag(e) {
			moveTo(e.pageX, e.pageY);
		}

		function onLetGo(e) {
			let elementBelow = document.elementFromPoint(e.clientX, e.clientY);
			console.log(elementBelow);
			if (elementBelow.classList.contains("draggable")) {
				elementBelow.insertAdjacentElement("beforebegin", item);
			} else if (elementBelow.classList.contains("bounds")) {
				elementBelow.appendChild(item);
			}
			item.classList.remove("dragging");
			document.removeEventListener("mousemove", onDrag);
			document.removeEventListener("mouseup", onLetGo);
		}

		document.addEventListener("mousemove", onDrag);
		document.addEventListener("mouseup", onLetGo);
	};
});
