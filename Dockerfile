# Loading base image from node
FROM node:17 

# Setting up working directory for our application 
WORKDIR /usr/share/app

# Copying node packages & lock files 
COPY package.json yarn.lock ./
RUN yarn install

# Copy prisma schema & generate prisma client
COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

# COPY Everything from our application to image app
COPY . .

# Building our image
RUN yarn build

# Expose default port and run the main script
EXPOSE 8000
CMD [ "yarn", "start" ]