-include config.mk

.PHONY: clean

NAME=flower
SRC=$(wildcard *.js) $(wildcard eventer/*.js)

dist/$(NAME).js: $(NAME).js $(NAME).moddef $(SRC)
	mkdir -p dist
	"$(RAINY_PATH)/rain" --moddef "$(BASEJS_PATH)/base.moddef" --moddef "$(NAME).moddef" --incpath "$(BASEJS_PATH)/.." --incpath ".." $< > $@

clean:
	rm -f dist/$(NAME).js
