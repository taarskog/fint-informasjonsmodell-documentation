FROM node

MAINTAINER Øystein Amundsen <oystein@fintprosjektet.no>

# Create app user
RUN useradd --user-group --create-home --shell /bin/false app

# Create app directory
ENV HOME=/usr/src/app
RUN mkdir -p $HOME
WORKDIR $HOME

# Install app dependencies
COPY package.json $HOME
RUN npm install --production

# Bundle pre-built app
COPY ./dist $HOME/dist
RUN chown -R app:app $HOME/*

# Set
USER app

EXPOSE 4200
ENTRYPOINT npm start
