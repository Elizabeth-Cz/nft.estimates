FROM node:16
WORKDIR /Users/benharan/Code/nft.estimates/server

COPY .npmrc .npmrc
COPY package.json package.json
RUN npm install
RUN rm -f .npmrc

# If you are building your code for production
# RUN npm ci --only=production

COPY . .
EXPOSE 9000
CMD [ "npm", "run", "start-server" ]
