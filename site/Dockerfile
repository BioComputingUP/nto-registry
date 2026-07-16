# Dev-mode image for local live-reloading of the NTO Registry site.
# Not used for production — GitHub Actions builds the static site directly
# with `npm run build` (see ../.github/workflows/deploy-site.yml).
FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 4321

CMD ["npm", "run", "dev"]
