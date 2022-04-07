FROM alpine:latest
RUN apk add --update nodejs npm
RUN apk add git
WORKDIR /app
RUN cd /app
RUN git clone https://github.com/AlphaT7/hexAnimation.git .
RUN npm install snowpack
EXPOSE 8080