class SimpleCarousel extends HTMLElement {
  constructor() {
    super();

      this.attachShadow({ mode: 'open' });

      this.container = document.createElement('div');
      this.container.classList.add('carousel-container');
      
      this.slideContainer = document.createElement('div');
      this.slideContainer.classList.add('slide-container');

      this.buttonWrapper = document.createElement("div");
      this.buttonWrapper.classList.add("carousel-button-wrapper");
      
      this.prevButton = document.createElement('button');
      this.prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/></svg>';
      this.prevButton.classList.add('btn', 'btn-primary', 'carousel-button', 'prev-button');
      
      this.nextButton = document.createElement('button');
      this.nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg>';
      this.nextButton.classList.add('btn', 'btn-primary', 'carousel-button', 'next-button');

      this.buttonWrapper.appendChild(this.prevButton);
      this.buttonWrapper.appendChild(this.nextButton);
      
      var tpl = document.querySelector("#simple-carousel-template");
      
      if (tpl){
	  let tpl_content = tpl.content;
	  this.shadowRoot.appendChild(tpl_content.cloneNode(true));
      }
      
      this.shadowRoot.appendChild(this.container);
      this.container.appendChild(this.slideContainer);
      this.container.appendChild(this.buttonWrapper);      
      
      this.currentIndex = 0;
      this.items = [];
      
      this.updateCarousel();
      
      this.prevButton.addEventListener('click', () => {
	  this.showPrevItem();
      });
      
      this.nextButton.addEventListener('click', () => {
	  this.showNextItem();
      });
  }

    connectedCallback() {
	// Observe the child list of the <ul> element to dynamically update items
	const observer = new MutationObserver(() => {
	    this.updateItems();
	});
	
	observer.observe(this, { childList: true, subtree: true });
    }
    
    updateItems() {

	const ulElement = this.querySelector('ul');
	
	if (ulElement) {
	    this.items = Array.from(ulElement.children);
	    this.currentIndex = 0;
	    this.updateCarousel();
	}
    }
    
    updateCarousel() {

	this.slideContainer.innerHTML = '';
	
	this.items.forEach((item, index) => {
	    const slideElement = document.createElement('div');
	    slideElement.classList.add('carousel-slide');
	    
	    if (index === this.currentIndex) {
		slideElement.style.display = 'block';
	    } else {
		slideElement.style.display = 'none';
	    }
	    
	    slideElement.appendChild(item.cloneNode(true));
	    this.slideContainer.appendChild(slideElement);
	});

	if (this.items.length < 2){
	    this.buttonWrapper.style.display = "none";
	} else {
	    this.buttonWrapper.style.display = "flex";
	}
	
    }
    
    showNextItem() {
	const nextIndex = (this.currentIndex + 1) % this.items.length;
	this.showItem(nextIndex);
    }
    
    showPrevItem() {
	const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
	this.showItem(prevIndex);
    }
    
    showItem(index) {
	this.slideContainer.children[this.currentIndex].style.display = 'none';
	this.slideContainer.children[index].style.display = 'block';
	this.currentIndex = index;
    }
}

// Define the new element
customElements.define('simple-carousel', SimpleCarousel);

