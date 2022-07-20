FROM node:16
WORKDIR /Users/benharan/Code/nft/server
# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 9000

CMD [ "npm", "run", "start-server" ]
