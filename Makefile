MINIFY=minify

dist-all:
	@make dist-css
	@make dist-js

dist-css:
	$(MINIFY) -b -o dist/simple-carousel.min.css \
		src/simple-carousel.css

dist-js:
	$(MINIFY) -b -o dist/simple-carousel.min.js \
		src/simple-carousel.js
