FROM node:16
WORKDIR /Users/benharan/Code/nft.estimates/client

COPY .npmrc .npmrc
COPY package.json package.json
RUN npm install --legacy-peer-deps
RUN rm -f .npmrc

# If you are building your code for production
# RUN npm ci --only=production

COPY . .
EXPOSE 4000
CMD [ "npm", "run", "run-client" ]