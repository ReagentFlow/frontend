# pull official base image
FROM node:21-alpine

ARG CACHEBUST

# set work directory
ENV APP_HOME=/home/app/web
RUN mkdir -p $APP_HOME
RUN mkdir -p $APP_HOME/Discret/static
RUN mkdir -p $APP_HOME/Discret/data
WORKDIR $APP_HOME

# copy project
COPY build/* ./Discret/
RUN npm install -g serve
