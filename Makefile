.DEFAULT_GOAL := build
.PHONY: build run clean

build: clean
	mkdir build
	zip -r -9 -Z deflate build/startpage.xpi public/

run:
	xdg-open public/index.html

clean:
	rm -rf build
