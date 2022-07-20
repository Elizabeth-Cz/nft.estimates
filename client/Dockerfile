FROM node:16

WORKDIR /Users/benharan/Code/nft/client
COPY ./package*.json ./
RUN npm install --legacy-peer-deps
# If you are building your code for production
# RUN npm ci --only=production

COPY . .
EXPOSE 4000
CMD [ "npm", "run", "run-client" ]
