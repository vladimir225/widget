(function() {
  document.body.style.position = "relative";

  let widget = document.createElement("div");

  widget.style.padding = "15px 10px";
  widget.style.position = "fixed";
  widget.style.left = "10px";
  widget.style.top = "10px";
  widget.style.backgroundColor = "#d3d3d3";
  widget.style.width = "400px";
  widget.style.cursor = "pointer";
  widget.style.display = "flex";
  widget.style.flexDirection = "column";
  widget.style.zIndex = 1000;
  widget.id = "widget";
  widget.draggable = "true";

  document.body.append(widget);

  widget.insertAdjacentHTML(
    "beforeend",
    `
      <div class="widget-section">
        <span class="widget-section__title">Search DOM elements</span>
        <input id="closeBtn" class="widget-section__btn--close" type="submit" value="&times" >
      </div>
      <div class="widget-section">
        <input id="widget__input" class="widget-section__input" type="search" placeholder="print here"  onFocus="searchBtn.disabled=0">
        <input id="searchBtn" class="widget-section__search-btn" type="submit" value="Search"  disabled="disabled">
      </div>
      <div class="widget-section">
        <input id="prevBtn" class="widget-section__btn" type="submit" value="Prev" disabled="disabled">
        <input id="parentBtn" class="widget-section__btn" type="submit" value="Parent" disabled="disabled">
        <input id="childBtn" class="widget-section__btn" type="submit" value="Child" disabled="disabled">
        <input id="nextBtn" class="widget-section__btn" type="submit" value="Next" disabled="disabled" >
      </div>`
  );

  document.head.insertAdjacentHTML(
    "beforeend",
    `
    <style>
        .widget-section {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
        }

        .widget-section__title {
            font-size: 20px;
            font-weight:bold;
        }

        .widget-section__btn--close {
            border: none;
            background-color: #d3d3d3;
            font-weight:bold;
        }

        .widget-section__search-btn {
            border-radius: 5px;
            border: 1px solid gray;
            background-color: white;
        }

        .widget-section__btn {
            border-radius: 5px;
            border: 1px solid gray;
            background-color: white;
            padding: 0 30px;
            color: black;
        }

        .widget-section__input {
            width: 82%;
        }

        .widget-section__btn:disabled {
            opacity: 0.3;
            background-color: grey;
        }

        .border-red {
            border: 3px solid red;
        }
    </style>
    `
  );

  closeBtn.onclick = function() {
    widget.remove();
  };

  let currentElement = null;

  function elementInfo(element) {
    element.firstElementChild !== null
      ? childBtn.removeAttribute("disabled")
      : childBtn.setAttribute("disabled", "disabled");

    element.parentElement !== null
      ? parentBtn.removeAttribute("disabled")
      : parentBtn.setAttribute("disabled", "disabled");

    element.previousElementSibling !== null
      ? prevBtn.removeAttribute("disabled")
      : prevBtn.setAttribute("disabled", "disabled");

    element.nextElementSibling !== null
      ? nextBtn.removeAttribute("disabled")
      : nextBtn.setAttribute("disabled", "disabled");
  }

  searchBtn.onclick = function() {
    currentElement = document.body.querySelector(`${widget__input.value}`);
    currentElement.classList.add("border-red");
    widget__input.value = "";
    elementInfo(currentElement);
  };

  prevBtn.onclick = function() {
    currentElement.classList.remove("border-red");
    currentElement = currentElement.previousElementSibling;
    currentElement.classList.add("border-red");
    elementInfo(currentElement);
  };

  nextBtn.onclick = function() {
    currentElement.classList.remove("border-red");
    currentElement = currentElement.nextElementSibling;
    currentElement.classList.add("border-red");
    elementInfo(currentElement);
  };

  childBtn.onclick = function() {
    currentElement.classList.remove("border-red");
    currentElement = currentElement.firstElementChild;
    currentElement.classList.add("border-red");
    elementInfo(currentElement);
  };

  parentBtn.onclick = function() {
    currentElement.classList.remove("border-red");
    currentElement = currentElement.parentElement;
    currentElement.classList.add("border-red");
    elementInfo(currentElement);
  };

  widget.addEventListener("dragstart", function dragStart(event) {
    let clientX = event.clientX - widget.getBoundingClientRect().left;
    let clientY = event.clientY - widget.getBoundingClientRect().top;
    event.dataTransfer.setData("text/plain", `${clientX},${clientY}`);
  });

  document.body.addEventListener("dragover", function dragOver(event) {
    event.preventDefault();
  });

  document.body.addEventListener("drop", function drop(event) {
    let client = event.dataTransfer.getData("text/plain").split(",");
    widget.style.left = event.clientX - +client[0] + "px";
    widget.style.top = event.clientY - +client[1] + "px";
    event.preventDefault();
  });
})();
