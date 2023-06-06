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

			if (!elementBelow.classList.contains("placeholder")) {
				if (elementBelow.classList.contains("draggable")) {
					if (
						elementBelow.getBoundingClientRect().left >
						item.getBoundingClientRect().left
					) {
						elementBelow.insertAdjacentElement("beforebegin", placeholder);
					} else {
						elementBelow.insertAdjacentElement("afterend", placeholder);
					}
				} else if (elementBelow.classList.contains("bounds")) {
					elementBelow.appendChild(placeholder);
				}
			}
		}

		function onLetGo(e) {
			let elementBelow = document.elementFromPoint(e.clientX, e.clientY);
			if (elementBelow.classList.contains("placeholder")) {
				elementBelow.insertAdjacentElement("beforebegin", item);
				placeholder.remove();
			}
			if (elementBelow.classList.contains("draggable")) {
				if (
					elementBelow.getBoundingClientRect().left >
					item.getBoundingClientRect().left
				) {
					elementBelow.insertAdjacentElement("beforebegin", item);
				} else {
					elementBelow.insertAdjacentElement("afterend", item);
				}
			} else if (elementBelow.classList.contains("bounds")) {
				elementBelow.appendChild(item);
			}
			placeholder.remove();
			item.classList.remove("dragging");
			document.removeEventListener("mousemove", onDrag);
			document.removeEventListener("mouseup", onLetGo);
		}

		document.addEventListener("mousemove", onDrag);
		document.addEventListener("mouseup", onLetGo);
	};
});
