FROM node:latest

# Set working directory   
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .
EXPOSE 3000
# run the application
CMD ["npm", "run", "dev", "--", "--host"]

#***********************************************************************************************************************************************
