.PHONY: install run clean service

install:
	asdf install
	npm install

run:
	npm start

service: clean install
	cp -r . ~/.cache/startpage
	cp startpage.service ~/.config/systemd/user/
	systemctl enable --user startpage.service
	systemctl start --user startpage.service
	systemctl restart --user startpage.service

clean:
	rm -rf node_modules
	rm -rf ~/.cache/startpage

static:
	xdg-open public/index.html
