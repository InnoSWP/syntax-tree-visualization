FROM archlinux

WORKDIR /app

# COPY . .

EXPOSE 8080

# VOLUME ["/app"]
ADD . .

RUN  pacman -Suy --noconfirm arm-none-eabi-newlib nodejs-lts-gallium npm make gcc

RUN node -v; npm -v

RUN npm install --global yarn

CMD yarn && yarn start
