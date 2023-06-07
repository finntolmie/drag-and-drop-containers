document.querySelectorAll(".bounds").forEach((item) => {
	item.ondragstart = function () {
		return false;
	};
});

document.querySelectorAll(".draggable").forEach((item) => {
	let placeholder = document.createElement("div");
	placeholder.classList.add("placeholder");
	item.ondragstart = function () {
		return false;
	};

	function createPlaceholder(element, mouseY = null) {
		let elementBounds = element.getBoundingClientRect();
		if (element.classList.contains("draggable")) {
			placeholder.getBoundingClientRect().top > elementBounds.top
				? element.insertAdjacentElement("beforebegin", placeholder)
				: element.insertAdjacentElement("afterend", placeholder);
		} else if (
			element.classList.contains("bounds") &&
			element != item.parentElement &&
			element.childElementCount == 0
		) {
			element.appendChild(placeholder);
		}
	}

	item.onmousedown = function (e) {
		item.classList.add("dragging");
		moveTo(e.pageX, e.pageY);

		function moveTo(x, y) {
			item.style.left = x - item.getBoundingClientRect().width / 2 + "px";
			item.style.top = y - item.getBoundingClientRect().height / 2 + "px";
		}

		function onDrag(e) {
			moveTo(e.pageX, e.pageY);
			let elementBelow = document.elementFromPoint(e.clientX, e.clientY);

			if (elementBelow && !elementBelow.classList.contains("placeholder")) {
				createPlaceholder(elementBelow, e.clientY);
			}
		}

		function onLetGo() {
			placeholder.insertAdjacentElement("beforebegin", item);
			placeholder.remove();
			item.classList.remove("dragging");
			document.removeEventListener("mousemove", onDrag);
			document.removeEventListener("mouseup", onLetGo);
		}

		document.addEventListener("mousemove", onDrag);
		document.addEventListener("mouseup", onLetGo);
		createPlaceholder(item);
	};
});
